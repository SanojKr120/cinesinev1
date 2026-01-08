import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Cached connection for Serverless environment (Vercel)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable buffering to fail fast
        };

        const uri = process.env.MONGODB_URI;

        if (!uri) {
             throw new Error("MONGODB_URI is not defined in environment variables");
        }

        cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
            console.log('MongoDB Connected');
            return mongoose;
        }).catch(err => {
             console.error("MongoDB Initial Connection Error:", err);
             throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error("MongoDB Connection Await Error:", e);
        throw e;
    }

    return cached.conn;
};

export default connectDB;
