import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import type { Express } from 'express';

process.env.JWT_SECRET = 'test-only-secret';

let mongod: MongoMemoryServer;
let app: Express;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    const { createApp } = await import('../src/app');
    app = createApp();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

beforeEach(async () => {
    const collections = await mongoose.connection.db!.collections();
    await Promise.all(collections.map((c) => c.deleteMany({})));
});

const registerAndGetToken = async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Test User', email: 'test@example.com', password: 'pa55word' });
    return res.body.token as string;
};

describe('config', () => {
    it('throws when JWT_SECRET is missing instead of using a default', async () => {
        const { getJwtSecret } = await import('../src/config');
        const saved = process.env.JWT_SECRET;
        delete process.env.JWT_SECRET;
        try {
            expect(() => getJwtSecret()).toThrow(/JWT_SECRET/);
        } finally {
            process.env.JWT_SECRET = saved;
        }
    });
});

describe('auth', () => {
    it('registers a user, hashes the password and returns a token', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test User', email: 'test@example.com', password: 'pa55word' });

        expect(res.status).toBe(201);
        expect(res.body.token).toEqual(expect.any(String));
        expect(res.body.password).toBeUndefined();

        const stored = await mongoose.connection.db!.collection('users').findOne({ email: 'test@example.com' });
        expect(stored?.password).not.toBe('pa55word');
    });

    it('ignores a role sent by the client on self-registration', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Sneaky', email: 'sneaky@example.com', password: 'x', role: 'admin' });
        expect(res.status).toBe(201);
        expect(res.body.role).toBe('patient');
    });

    it('rejects a duplicate email', async () => {
        await registerAndGetToken();
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Again', email: 'test@example.com', password: 'other' });
        expect(res.status).toBe(400);
    });

    it('rejects registration with missing fields', async () => {
        const res = await request(app).post('/api/auth/register').send({ email: 'a@b.com' });
        expect(res.status).toBe(400);
    });

    it('logs in with the right password and rejects the wrong one', async () => {
        await registerAndGetToken();

        const ok = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'pa55word' });
        expect(ok.status).toBe(200);
        expect(ok.body.token).toEqual(expect.any(String));

        const bad = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'wrong' });
        expect(bad.status).toBe(401);
    });
});

describe('protected routes', () => {
    it.each(['/api/patients', '/api/doctors', '/api/appointments', '/api/billing'])(
        'GET %s returns 401 without a token',
        async (path) => {
            const res = await request(app).get(path);
            expect(res.status).toBe(401);
        },
    );

    it('returns 401 for a forged token', async () => {
        const res = await request(app).get('/api/patients').set('Authorization', 'Bearer not-a-real-token');
        expect(res.status).toBe(401);
    });
});

describe('patients CRUD', () => {
    it('creates, reads, updates and deletes a patient', async () => {
        const token = await registerAndGetToken();
        const auth = { Authorization: `Bearer ${token}` };

        const created = await request(app)
            .post('/api/patients')
            .set(auth)
            .send({ name: 'Jane Doe', age: 40, gender: 'Female', contact: '555-0000', address: '1 Main St' });
        expect(created.status).toBe(201);
        const id = created.body._id;

        const list = await request(app).get('/api/patients').set(auth);
        expect(list.body).toHaveLength(1);

        const updated = await request(app).put(`/api/patients/${id}`).set(auth).send({ age: 41 });
        expect(updated.status).toBe(200);
        expect(updated.body.age).toBe(41);

        const removed = await request(app).delete(`/api/patients/${id}`).set(auth);
        expect(removed.status).toBe(200);

        const gone = await request(app).get(`/api/patients/${id}`).set(auth);
        expect(gone.status).toBe(404);
    });

    it('rejects a patient missing required fields', async () => {
        const token = await registerAndGetToken();
        const res = await request(app)
            .post('/api/patients')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'No Age' });
        expect(res.status).toBe(400);
    });
});

describe('doctors, appointments and billing', () => {
    it('books an appointment with a doctor and returns populated names', async () => {
        const token = await registerAndGetToken();
        const auth = { Authorization: `Bearer ${token}` };

        const doctor = await request(app)
            .post('/api/doctors')
            .set(auth)
            .send({ name: 'Dr. Test', specialization: 'Cardiology' });
        expect(doctor.status).toBe(201);

        const patient = await request(app)
            .post('/api/patients')
            .set(auth)
            .send({ name: 'Jane Doe', age: 40, gender: 'Female', contact: '555-0000', address: '1 Main St' });

        const appt = await request(app)
            .post('/api/appointments')
            .set(auth)
            .send({ patientId: patient.body._id, doctorId: doctor.body._id, date: '2030-01-01T10:00' });
        expect(appt.status).toBe(201);
        expect(appt.body.status).toBe('pending');

        const status = await request(app)
            .put(`/api/appointments/${appt.body._id}/status`)
            .set(auth)
            .send({ status: 'confirmed' });
        expect(status.status).toBe(200);
        expect(status.body.status).toBe('confirmed');

        const list = await request(app).get('/api/appointments').set(auth);
        expect(list.body[0].patientId.name).toBe('Jane Doe');
        expect(list.body[0].doctorId.name).toBe('Dr. Test');
        expect(list.body[0].doctorId.specialization).toBe('Cardiology');

        const invoice = await request(app)
            .post('/api/billing')
            .set(auth)
            .send({ patientId: patient.body._id, amount: 150 });
        expect(invoice.status).toBe(201);
        expect(invoice.body.status).toBe('pending');

        const invoices = await request(app).get('/api/billing').set(auth);
        expect(invoices.body[0].patientId.name).toBe('Jane Doe');
    });

    it('rejects an appointment without a doctor', async () => {
        const token = await registerAndGetToken();
        const res = await request(app)
            .post('/api/appointments')
            .set('Authorization', `Bearer ${token}`)
            .send({ patientId: new mongoose.Types.ObjectId().toString(), date: '2030-01-01' });
        expect(res.status).toBe(400);
    });
});
