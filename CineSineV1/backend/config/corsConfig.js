import dotenv from 'dotenv';
dotenv.config();

// Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://cinesinev1f.vercel.app",
  process.env.FRONTEND_URL 
].filter(Boolean);

// Dynamic CORS Origin Check helper
export const corsOriginCheck = (origin, callback) => {
  // Allow requests with no origin (like mobile apps or curl requests)
  if (!origin) return callback(null, true);
  
  // Check against allowed static list
  if (allowedOrigins.includes(origin)) return callback(null, true);

  // Dynamic check for Vercel previews (allow specific frontend project previews)
  if (origin.startsWith('https://cinesinev1f') && origin.endsWith('.vercel.app')) {
    return callback(null, true);
  }

  console.warn(`Blocked by CORS: ${origin}`);
  callback(new Error('Not allowed by CORS'));
};
