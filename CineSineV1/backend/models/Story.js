import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  coupleNames: { type: String, required: true },
  date: { type: Date },
  location: { type: String },
  coverImage: { type: String }, // URL from Cloudinary
  videoUrl: { type: String }, // Main YouTube Video
  type: { type: String, enum: ['Wedding', 'Engagement', 'Haldi', 'Reception'], default: 'Wedding' },
  images: [{ type: String }], // Array of image URLs
  subVideos: [{ type: String }], // Array of YouTube Video URLs
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Story', storySchema);
