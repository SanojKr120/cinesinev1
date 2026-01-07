import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, default: 'Admin User' },
    role: { type: String, default: 'Administrator' },
    email: { type: String, default: 'admin@cinesine.com' },
    contact: { type: String, default: '+91 98765 43210' },
    address: { type: String, default: 'Mumbai, India' },
    image: { type: String, default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400' }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
