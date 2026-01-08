import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://cinesinev1f.vercel.app",
  process.env.FRONTEND_URL // Additional Production URL from Vercel Env (if set)
].filter(Boolean);

// Socket.io Setup
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/', apiRoutes);

app.get('/', (req, res) => {
  res.send('CineSine API is running...');
});

// Database Connection (Cached for Serverless)
// Database Connection (Cached for Serverless)
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
            bufferCommands: false, // Disable buffering to fail fast if no connection
        };

        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cinesine';

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

// Middleware to ensure DB connection on every request (critical for serverless)
app.use(async (req, res, next) => {
    // Skip DB connection for basic root route if preferred, but general API needs it
    if (req.path === '/') { 
        return next();
    }
    
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed during request:", error);
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});


// Socket.io Events
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

// Only listen if not imported as a module (i.e., running directly)
// OR if in dev mode. Vercel loads this file and uses the export.
if (process.env.NODE_ENV !== 'production') {
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} else {
    // In production (Vercel), we might still need to listen if using a custom server pattern?
    // Actually Vercel automatically handles the listening if we export the app.
    // BUT we attached socket.io to httpServer. 
    // To support Socket.io on Vercel, we often need to export httpServer or app.
    // Exporting app works for HTTP routes. Socket.io might fail silently.
    // We will export app as default.
}

export default app;
