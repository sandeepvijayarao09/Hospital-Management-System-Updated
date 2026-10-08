import dotenv from 'dotenv';
import connectDB from './db';
import { createApp } from './app';
import { getJwtSecret } from './config';
import { seedDemoUsers, seedDemoData } from './seed';

dotenv.config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    // Fail fast on missing configuration before touching the database.
    getJwtSecret();

    await connectDB();
    if (process.env.NODE_ENV !== 'production') {
        await seedDemoUsers();
    }
    if (process.env.SEED_DEMO === 'true') {
        await seedDemoData();
    }

    createApp().listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
});
