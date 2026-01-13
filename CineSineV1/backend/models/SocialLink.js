import mongoose from 'mongoose';

const SocialLinkSchema = new mongoose.Schema({
    platform: { type: String, required: true }, // e.g., 'Instagram', 'YouTube', 'Facebook'
    url: { type: String, required: true },
    icon: { type: String } // Optional: Store icon name if we want to be more dynamic, but platform name is usually enough to map
}, { timestamps: true });

export default mongoose.model('SocialLink', SocialLinkSchema);
