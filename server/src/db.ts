import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectMemory = async () => {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('MongoDB Connected (in-memory, data is lost on restart)');
};

const connectDB = async () => {
    if (process.env.USE_MEMORY_DB === 'true') {
        await connectMemory();
        return;
    }

    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/hospital-management';
        await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            console.error(`Fatal Error: Could not connect to MongoDB. ${error}`);
            process.exit(1);
        }
        console.log('Local MongoDB connection failed. Falling back to an in-memory database...');
        try {
            await connectMemory();
        } catch (innerError) {
            console.error(`Fatal Error: Could not connect to any database. ${innerError}`);
            process.exit(1);
        }
    }
};

export default connectDB;
