import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose'; // Needed for health check readystate
import nodemailer from 'nodemailer';
import apiRoutes from './routes/apiRoutes.js';
import connectDB from './config/db.js';
import { corsOriginCheck } from './config/corsConfig.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.io Setup
const io = new Server(httpServer, {
  cors: {
    origin: corsOriginCheck,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: corsOriginCheck,
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection Middleware (Ensure connection on every request)
app.use(async (req, res, next) => {
    // Skip DB connection for basic health checks to avoid overhead if DB is down
    if (req.path === '/health') {
       // We still want to try connecting inside the health route logic, 
       // but we won't block the request here if it fails, so we can return "down" status.
       // Actually, for consistency let's just connect.
    }
    
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed during request:", error);
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});

// Routes
// MOUNTED AT ROOT as requested (Removing /api prefix)
app.use('/', apiRoutes);

app.get('/', (req, res) => {
  res.send('CineSine API is running...');
});

// Health Check Endpoint
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    const statusCodes = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };
    res.json({
        status: 'active',
        database: statusCodes[dbStatus] || 'unknown',
        timestamp: new Date().toISOString()
    });
});

// Test SMTP Connection (for debugging)
app.get('/test-smtp', async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.in',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: { rejectUnauthorized: false }
    });

    try {
        await transporter.verify();
        res.json({ 
            message: 'SMTP Connected Successfully!',
            user: process.env.EMAIL_USERNAME 
        });
    } catch (error) {
        console.error('SMTP Verification Error:', error);
        res.status(500).json({ 
            error: error.message,
            user: process.env.EMAIL_USERNAME 
        });
    }
});

// Socket.io Events
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// --- Industry Standard Error Handling ---

// 404 Handler (for unmatched routes)
app.use((req, res, next) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? null : err.message
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Vercel
export default app;
