import mongoose from 'mongoose';

const preWeddingSchema = new mongoose.Schema({
  coupleName: { type: String, required: true },
  city: { type: String, required: true },
  videoId: { type: String, required: true }, // YouTube Video ID
  mainImage: { type: String, required: true }, // Cloudinary URL
  galleryImages: [{ type: String }], // Array of Cloudinary URLs
  subVideos: [{ type: String }], // Array of YouTube Video URLs
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('PreWedding', preWeddingSchema);
