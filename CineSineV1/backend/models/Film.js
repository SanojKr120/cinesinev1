import mongoose from 'mongoose';

const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  coupleName: { type: String, required: true },
  videoUrl: { type: String, required: true }, // YouTube Embed URL or similar
  tagline: { type: String },
  description: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Film', filmSchema);
