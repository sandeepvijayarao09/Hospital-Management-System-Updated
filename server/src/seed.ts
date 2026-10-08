import bcrypt from 'bcryptjs';
import User from './models/User';
import Doctor from './models/Doctor';
import Patient from './models/Patient';
import Appointment from './models/Appointment';
import Billing from './models/Billing';

// Demo accounts for local development only. Never seeded when NODE_ENV=production.
export const DEMO_USERS = [
    { name: 'admin', email: 'admin@hospital.com', password: 'admin', role: 'admin' },
    { name: 'Dr. Priya Raman', email: 'doctor@hospital.com', password: 'doctor', role: 'doctor' },
    { name: 'Alex Morgan', email: 'patient@hospital.com', password: 'patient', role: 'patient' },
] as const;

const createUserIfMissing = async (u: (typeof DEMO_USERS)[number]) => {
    if (await User.findOne({ email: u.email })) return false;
    const hashedPassword = await bcrypt.hash(u.password, await bcrypt.genSalt(10));
    await User.create({ name: u.name, email: u.email, password: hashedPassword, role: u.role });
    return true;
};

export const seedDemoUsers = async () => {
    try {
        for (const u of DEMO_USERS) {
            if (await createUserIfMissing(u)) console.log(`Demo ${u.role} created: ${u.email} / ${u.password}`);
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Sample records so a fresh in-memory database has something to show.
export const seedDemoData = async () => {
    if (await Patient.countDocuments() > 0) {
        console.log('Demo data already present');
        return;
    }

    const doctors = await Doctor.insertMany([
        { name: 'Dr. Priya Raman', specialization: 'Cardiology', email: 'doctor@hospital.com', phone: '555-0101' },
        { name: 'Dr. Marcus Lee', specialization: 'Pediatrics', email: 'marcus.lee@hospital.com', phone: '555-0102' },
        { name: 'Dr. Elena Ortiz', specialization: 'Orthopedics', email: 'elena.ortiz@hospital.com', phone: '555-0103' },
    ]);

    const patients = await Patient.insertMany([
        { name: 'Alex Morgan', age: 34, gender: 'Female', contact: '555-0201', address: '12 Beacon St, Boston', medicalHistory: ['Asthma'] },
        { name: 'Jordan Patel', age: 52, gender: 'Male', contact: '555-0202', address: '48 Elm Ave, Cambridge', medicalHistory: ['Hypertension'] },
        { name: 'Sam Chen', age: 8, gender: 'Male', contact: '555-0203', address: '7 Maple Rd, Somerville', medicalHistory: [] },
        { name: 'Maria Gonzalez', age: 67, gender: 'Female', contact: '555-0204', address: '230 Harbor Way, Quincy', medicalHistory: ['Type 2 diabetes', 'Knee replacement'] },
        { name: 'Chris Okafor', age: 29, gender: 'Male', contact: '555-0205', address: '91 River St, Brookline', medicalHistory: [] },
    ]);

    const day = (offset: number, hour: number) => {
        const d = new Date();
        d.setDate(d.getDate() + offset);
        d.setHours(hour, 0, 0, 0);
        return d;
    };

    const appointments = await Appointment.insertMany([
        { patientId: patients[1]._id, doctorId: doctors[0]._id, date: day(0, 9), status: 'confirmed', notes: 'BP follow-up' },
        { patientId: patients[2]._id, doctorId: doctors[1]._id, date: day(0, 11), status: 'confirmed', notes: 'Annual checkup' },
        { patientId: patients[3]._id, doctorId: doctors[2]._id, date: day(1, 14), status: 'pending', notes: 'Post-op review' },
        { patientId: patients[0]._id, doctorId: doctors[0]._id, date: day(2, 10), status: 'pending' },
        { patientId: patients[4]._id, doctorId: doctors[2]._id, date: day(-3, 15), status: 'cancelled' },
    ]);

    await Billing.insertMany([
        { patientId: patients[1]._id, appointmentId: appointments[0]._id, amount: 180, status: 'paid', paymentDate: new Date() },
        { patientId: patients[2]._id, appointmentId: appointments[1]._id, amount: 120, status: 'pending' },
        { patientId: patients[3]._id, appointmentId: appointments[2]._id, amount: 450, status: 'pending' },
        { patientId: patients[4]._id, amount: 75, status: 'overdue' },
    ]);

    console.log('Demo data seeded (3 doctors, 5 patients, 5 appointments, 4 invoices)');
};
