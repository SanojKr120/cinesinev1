import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCog, FaLock, FaCamera, FaTimes, FaSave, FaUndo } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { fetchUserProfile, updateUserProfile } from '../api';
imp
const DEFAULT_PROFILE = {
    name: 'Guest',
    role: 'User',
    email: 'guest@cinesine.com',
    contact: '+91 00000 00000',
    address: 'India',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400'
};

const Profile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Modal States
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [password, setPassword] = useState('');

    // Profile Data State
    const [userProfile, setUserProfile] = useState(DEFAULT_PROFILE);
    const [editForm, setEditForm] = useState(DEFAULT_PROFILE);

    // Initial Load from Backend
    useEffect(() => {
        fetchUserProfile()
            .then(res => {
                if (res.data) {
                    setUserProfile(res.data);
                }
            })
            .catch(err => {
                console.error("Failed to fetch profile", err);
                toast.error("Could not load profile data.");
            });
    }, []);

    // Handlers
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'sanoj4120') {
            sessionStorage.setItem('isAdmin', 'true');
            toast.success('Access Granted');
            navigate('/dashboard');
        } else {
            toast.error('Invalid Password');
        }
    };

    const handleEditOpen = () => {
        setEditForm(userProfile);
        setShowEditModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Limit size to ~2MB for MongoDB safety (doc limit 16MB)
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Image size too large. Please use an image under 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setEditForm(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        const promise = updateUserProfile(editForm);

        toast.promise(promise, {
            loading: 'Updating profile...',
            success: 'Profile updated successfully!',
            error: 'Failed to update profile.'
        });

        try {
            const res = await promise;
            setUserProfile(res.data);
            setShowEditModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleResetProfile = async () => {
        if (window.confirm('Are you sure you want to reset your profile to default?')) {
            const promise = updateUserProfile(DEFAULT_PROFILE);
            toast.promise(promise, {
                loading: 'Resetting profile...',
                success: 'Profile reset to default.',
                error: 'Failed to reset profile.'
            });

            try {
                const res = await promise;
                setUserProfile(res.data);
                setShowEditModal(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 px-6 min-h-screen bg-[#f8f4ed]"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif tracking-[0.2em] mb-4 text-[#333]">PROFILE</h1>
                    <div className="w-16 h-[1px] bg-gray-400 mx-auto"></div>
                </div>

                <div className="bg-white shadow-xl rounded-sm overflow-hidden flex flex-col md:flex-row relative">

                    {/* Action Buttons (Absolute) */}
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                        <button
                            onClick={handleEditOpen}
                            className="bg-white/90 p-2 rounded-full shadow-md text-gray-500 hover:text-[#d4af37] transition"
                            title="Edit Profile"
                        >
                            <FaUserCircle size={20} />
                        </button>
                        <button
                            onClick={() => setShowSettingsModal(true)}
                            className="bg-white/90 p-2 rounded-full shadow-md text-gray-500 hover:text-[#333] transition"
                            title="Admin Dashboard"
                        >
                            <FaCog size={20} />
                        </button>
                    </div>

                    {/* Left: Image & Main Info */}
                    <div className="md:w-1/3 bg-[#1a1a1a] p-10 flex flex-col items-center justify-center text-white relative">
                        <div className="w-48 h-48 rounded-full border-4 border-[#d4af37] overflow-hidden mb-6 bg-gray-900 shadow-2xl relative group">
                            <img
                                src={userProfile.image}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/400?text=User'}
                            />
                        </div>
                        <h2 className="text-2xl font-serif tracking-widest mb-2 text-center">{userProfile.name}</h2>
                        <p className="text-[#d4af37] text-xs tracking-[0.2em] uppercase">{userProfile.role}</p>
                    </div>

                    {/* Right: Detailed Info */}
                    <div className="md:w-2/3 p-10 flex flex-col justify-center">
                        <div className="space-y-8">
                            <InfoItem icon={<FaEnvelope />} label="Email" value={userProfile.email} />
                            <InfoItem icon={<FaPhone />} label="Contact" value={userProfile.contact} />
                            <InfoItem icon={<FaMapMarkerAlt />} label="Address" value={userProfile.address} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {showEditModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowEditModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-[#1a1a1a] text-white p-6 flex justify-between items-center">
                                <h3 className="text-xl font-serif tracking-widest uppercase">Edit Profile</h3>
                                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white transition">
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar">
                                <form onSubmit={handleSaveProfile} className="space-y-6">

                                    {/* Image Upload */}
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 mb-4 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                            <img src={editForm.image} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <FaCamera className="text-white text-2xl" />
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="text-xs uppercase tracking-widest text-[#d4af37] font-bold hover:text-[#b39023] transition"
                                        >
                                            Change Photo
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputGroup label="Full Name" name="name" value={editForm.name} onChange={handleInputChange} required />
                                        <InputGroup label="Role / Title" name="role" value={editForm.role} onChange={handleInputChange} />
                                        <InputGroup label="Email" name="email" value={editForm.email} onChange={handleInputChange} type="email" required />
                                        <InputGroup label="Contact Number" name="contact" value={editForm.contact} onChange={handleInputChange} required />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Address</label>
                                        <textarea
                                            name="address"
                                            value={editForm.address}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full border border-gray-300 p-3 focus:border-[#d4af37] outline-none rounded-sm font-serif resize-none transition"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={handleResetProfile}
                                            className="flex items-center gap-2 text-red-500 text-xs uppercase tracking-widest hover:text-red-700 transition"
                                        >
                                            <FaUndo /> Reset to Default
                                        </button>
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowEditModal(false)}
                                                className="px-6 py-3 border border-gray-300 text-gray-600 uppercase text-xs tracking-widest hover:bg-gray-50 transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-8 py-3 bg-[#1a1a1a] text-white uppercase text-xs tracking-widest hover:bg-[#333] transition flex items-center gap-2 shadow-lg"
                                            >
                                                <FaSave /> Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dashboard Access Modal (Unchanged) */}
            <AnimatePresence>
                {showSettingsModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowSettingsModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-white p-8 rounded-sm max-w-sm w-full shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-serif text-center mb-6 tracking-widest uppercase">Admin Access</h3>
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter Password"
                                        className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-3 focus:outline-none focus:border-[#d4af37] transition font-sans"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#1a1a1a] text-white py-3 font-serif uppercase tracking-[0.2em] text-xs hover:bg-[#333] transition-colors"
                                >
                                    Go to Dashboard
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Helper Components for Cleaner JSX
const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-6 group">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-300 shadow-sm">
            {icon}
        </div>
        <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="font-serif text-lg text-[#333] leading-relaxed">{value}</p>
        </div>
    </div>
);

const InputGroup = ({ label, name, value, onChange, type = "text", required = false }) => (
    <div className="space-y-1">
        <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">{label}</label>
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full border-b-2 border-gray-200 py-2 focus:border-[#d4af37] outline-none transition-colors font-serif bg-transparent"
            />
        </div>
    </div>
);

export default Profile;
