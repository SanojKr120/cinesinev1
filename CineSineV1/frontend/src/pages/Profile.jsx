import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCog, FaLock, FaCamera, FaTimes, FaSave, FaUndo } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { fetchUserProfile, updateUserProfile } from '../api';
import defaultImage from '../logos/cinesineprofile.png';

const DEFAULT_PROFILE = {
    name: 'Guest',
    role: 'User',
    email: 'guest@cinesine.com',
    contact: '+91 00000 00000',
    address: 'India',
    image: defaultImage,
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
            <motion.div
                className="max-w-5xl mx-auto backdrop-blur-3xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="text-center mb-16 relative">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-6xl font-serif tracking-[0.2em] mb-4 text-[#1a1a1a] uppercase"
                    >
                        Profile
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-[2px] bg-[#d4af37] mx-auto"
                    ></motion.div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row relative border border-[#d4af37]/20 min-h-[500px]">

                    {/* Action Buttons (Absolute) */}
                    <div className="absolute top-6 right-6 flex gap-3 z-10">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEditOpen}
                            className="bg-[#1a1a1a] text-[#d4af37] p-3 rounded-full shadow-lg hover:shadow-gold transition-all duration-300 group"
                            title="Edit Profile"
                        >
                            <FaUserCircle size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowSettingsModal(true)}
                            className="bg-white text-[#1a1a1a] p-3 rounded-full shadow-lg border border-gray-200 hover:border-[#1a1a1a] transition-all duration-300"
                            title="Admin Dashboard"
                        >
                            <FaCog size={22} className="hover:animate-spin-slow" />
                        </motion.button>
                    </div>

                    {/* Left: Image & Main Info (Premium Dark Side) */}
                    <div className="md:w-2/5 bg-[#0f0f0f] relative overflow-hidden flex flex-col items-center justify-center p-12 text-center group">
                        {/* Abstract Background Design */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#d4af37]/20 rounded-full blur-[80px]"></div>
                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-900/10 rounded-full blur-[80px]"></div>

                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                            className="relative z-10 mb-8"
                        >
                            <div className="w-56 h-56 rounded-full border-[3px] border-[#d4af37] p-2 shadow-2xl shadow-black/50">
                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                    <img
                                        src={userProfile.image}
                                        alt="Profile"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => e.target.src = defaultImage}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-serif text-[#f8f4ed] tracking-wider mb-2">{userProfile.name}</h2>
                            <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mb-4"></div>
                            <p className="text-[#d4af37] text-sm tracking-[0.3em] uppercase font-light">{userProfile.role}</p>
                        </div>
                    </div>

                    {/* Right: Detailed Info (Clean Editorial Side) */}
                    <div className="md:w-3/5 p-12 md:p-16 bg-white relative flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-[#d4af37] to-transparent opacity-50 md:hidden"></div>
                        <h3 className="text-[#d4af37] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-12">Personal Details</h3>

                        <div className="space-y-10">
                            <div className="grid grid-cols-1 gap-10">
                                <InfoItem icon={<FaEnvelope />} label="Email Address" value={userProfile.email} delay={0.4} />
                                <InfoItem icon={<FaPhone />} label="Phone Number" value={userProfile.contact} delay={0.5} />
                                <InfoItem icon={<FaMapMarkerAlt />} label="Location" value={userProfile.address} delay={0.6} />
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center text-gray-400 text-xs tracking-wider">
                            <span>Member since 2024</span>
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

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
                                            <img src={editForm.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src = defaultImage} />
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
                            <h3 className="text-xl font-serif text-center mb-6 tracking-widest uppercase"> Office Use Only </h3>
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
                                    Next
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
const InfoItem = ({ icon, label, value, delay = 0 }) => (
    <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: delay, duration: 0.5 }}
        className="flex items-center gap-6 group cursor-default"
    >
        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-[#1a1a1a] group-hover:text-[#d4af37] transition-all duration-500 shadow-sm border border-gray-100 group-hover:border-[#d4af37]/50">
            <div className="text-xl group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
        </div>
        <div className="flex-1 border-b border-gray-100 pb-2 group-hover:border-[#d4af37]/30 transition-colors duration-500">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">{label}</p>
            <p className="font-serif text-xl text-[#333] leading-relaxed group-hover:text-[#1a1a1a] transition-colors">{value}</p>
        </div>
    </motion.div>
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
