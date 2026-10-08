import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import patientRoutes from './routes/patients';
import doctorRoutes from './routes/doctors';
import appointmentRoutes from './routes/appointments';
import billingRoutes from './routes/billing';
import { protect } from './middleware/auth';

// Builds the Express app without connecting to a database or listening,
// so tests can import it directly.
export const createApp = () => {
    const app = express();

    app.use(cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/patients', protect, patientRoutes);
    app.use('/api/doctors', protect, doctorRoutes);
    app.use('/api/appointments', protect, appointmentRoutes);
    app.use('/api/billing', protect, billingRoutes);

    app.get('/', (req, res) => {
        res.send('Hospital Management System API is running');
    });

    return app;
};
