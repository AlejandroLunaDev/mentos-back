import mongoose from 'mongoose';
import config from './config.js';

export const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...', config.MONGO_URL);
        await mongoose.connect(config.MONGO_URL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); 
    }
};