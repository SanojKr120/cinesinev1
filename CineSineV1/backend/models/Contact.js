import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    weddingDates: { type: String },
    venue: { type: String },
    eventDetails: { type: String },
    referral: [{ type: String }],
    emailSent: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Contact', ContactSchema);
