import mongoose from 'mongoose';

const photobookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  personName: { type: String, required: true },
  coverImage: { type: String, required: true },
  videoUrl: { type: String },
  images: [{ type: String }],
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Photobook', photobookSchema);
