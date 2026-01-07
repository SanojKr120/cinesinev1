import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoThemeUrl: { type: String }, // Background video/image for the theme
  audioUrl: { type: String },
  duration: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Music', musicSchema);
