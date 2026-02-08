import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/hospital-management';
        await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.log('Local MongoDB connection failed. Attempting to start in-memory database...');
        try {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            await mongoose.connect(uri);
            console.log(`MongoDB Connected (In-Memory): ${uri}`);
        } catch (innerError) {
            console.error(`Fatal Error: Could not connect to any database. ${innerError}`);
            process.exit(1);
        }
    }
};

export default connectDB;
