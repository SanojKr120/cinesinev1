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
  process.env.FRONTEND_URL // Production URL from Vercel Env
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
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('CineSine API is running...');
});

// Database Connection (Cached for Serverless)
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cinesine');
        isConnected = !!conn.connections[0].readyState;
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};
// Connect on load
connectDB();


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
