import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

const checkDB = async () => {
    console.log("Attempting to connect to MongoDB...");
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital-management');
        console.log("MongoDB Connection: SUCCESS");

        const users = await User.find({});
        console.log(`Found ${users.length} users in the database.`);

        users.forEach(u => {
            console.log(`- Name: ${u.name}, Email: ${u.email}, Role: ${u.role}`);
        });

        if (users.length === 0) {
            console.log("WARNING: No users found. You must run the seed script.");
        }

        process.exit(0);
    } catch (error) {
        console.error("MongoDB Connection: FAILED");
        console.error(error);
        process.exit(1);
    }
};

checkDB();
