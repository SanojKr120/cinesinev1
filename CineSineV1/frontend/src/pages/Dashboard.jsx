import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    FaBookOpen, FaFilm, FaHeart, FaImages, FaSignOutAlt, FaTrash, FaPlus, FaTimes, FaEdit, FaCamera, FaSave, FaYoutube, FaLink, FaMinusCircle
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import {
    fetchStories, fetchFilms, fetchPreWeddings, fetchPhotobooks, fetchImages,
    deleteStory, deleteFilm, deletePreWedding, deletePhotobook, deleteImage,
    createPhotobook, updatePhotobook, createImage, createFilm, updateFilm,
    createPreWedding, updatePreWedding, createStory, updateStory
} from '../api';
import logo from '../logos/cinesineNavLogo_4.png';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('stories');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    // Refs
    const fileInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    // Check Auth
    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (!isAdmin) {
            toast.error('Unauthorized Access');
            navigate('/profile');
        }
    }, [navigate]);

    // Fetch Data on Tab Change
    useEffect(() => {
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            let res;
            if (activeTab === 'stories') res = await fetchStories();
            else if (activeTab === 'films') res = await fetchFilms();
            else if (activeTab === 'preWeddings') res = await fetchPreWeddings();
            else if (activeTab === 'photobooks') res = await fetchPhotobooks();
            else if (activeTab === 'images') res = await fetchImages();

            setItems(res.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            if (activeTab === 'stories') await deleteStory(id);
            else if (activeTab === 'films') await deleteFilm(id);
            else if (activeTab === 'preWeddings') await deletePreWedding(id);
            else if (activeTab === 'photobooks') await deletePhotobook(id);
            else if (activeTab === 'images') await deleteImage(id);

            toast.success('Item Deleted');
            loadData(); // Refresh
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        navigate('/');
    };

    const openModal = (item = null) => {
        if (item) {
            setIsEditing(true);
            setCurrentItem(item);
        } else {
            setIsEditing(false);
            // Init arrays based on tab
            const initial = { subVideos: [] };
            if (activeTab === 'preWeddings') initial.galleryImages = [];
            if (activeTab === 'stories') initial.images = [];
            setCurrentItem(initial);
        }
        setShowModal(true);
    };

    // Generic Image Upload (Cover/Main)
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) return toast.error('Image is too large. Max 5MB.');
            const reader = new FileReader();
            reader.onloadend = () => {
                const key = activeTab === 'images' ? 'imageUrl' : (activeTab === 'preWeddings' ? 'mainImage' : 'coverImage');
                setCurrentItem(prev => ({ ...prev, [key]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Video URL for Main Video
    const handleVideoUrlChange = (e) => {
        const url = e.target.value;
        const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*)/)?.[1];

        let updates = { videoUrl: url, videoId: videoId || url };

        // Auto-generate cover only if not already set (mostly for films/photobooks)
        if (videoId) {
            if (activeTab === 'films' || activeTab === 'photobooks') {
                updates.coverImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            }
            if (activeTab === 'preWeddings' && !currentItem.mainImage) {
                updates.mainImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            }
            if (activeTab === 'stories' && !currentItem.coverImage) {
                updates.coverImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            }
        }

        setCurrentItem(prev => ({ ...prev, ...updates }));
    };

    // --- Array Handlers (Generic) ---

    // Add Image to Array (galleryImages or images)
    const handleAddArrayImage = (targetKey, src) => {
        if (!src) return;
        setCurrentItem(prev => ({
            ...prev,
            [targetKey]: [...(prev[targetKey] || []), src]
        }));
    };

    // Remove from Array
    const handleRemoveArrayItem = (targetKey, index) => {
        setCurrentItem(prev => ({
            ...prev,
            [targetKey]: prev[targetKey].filter((_, i) => i !== index)
        }));
    };

    // Upload Handler mainly for the gallery input
    const handleGalleryUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) return toast.error('Image is too large. Max 5MB.');
            const reader = new FileReader();
            // Determine target array key based on tab
            const key = activeTab === 'preWeddings' ? 'galleryImages' : 'images';
            reader.onloadend = () => handleAddArrayImage(key, reader.result);
            reader.readAsDataURL(file);
        }
    };


    const [tempSubVideo, setTempSubVideo] = useState('');
    const [tempGalleryUrl, setTempGalleryUrl] = useState('');

    const addSubVideo = () => {
        if (!tempSubVideo) return;
        setCurrentItem(prev => ({ ...prev, subVideos: [...(prev.subVideos || []), tempSubVideo] }));
        setTempSubVideo('');
    };
    const addGalleryUrl = () => {
        if (!tempGalleryUrl) return;
        const key = activeTab === 'preWeddings' ? 'galleryImages' : 'images';
        handleAddArrayImage(key, tempGalleryUrl);
        setTempGalleryUrl('');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let promise;

        if (activeTab === 'photobooks') {
            if (!currentItem.title || !currentItem.personName) return toast.error('Title and Person Name Required');
            promise = isEditing ? updatePhotobook(currentItem._id, currentItem) : createPhotobook(currentItem);

        } else if (activeTab === 'images') {
            if (!currentItem.title || !currentItem.imageUrl) return toast.error('Title and Image Required');
            promise = isEditing ? Promise.reject('Edit not implemented') : createImage(currentItem);

        } else if (activeTab === 'films') {
            if (!currentItem.title || !currentItem.coupleName || !currentItem.videoUrl) return toast.error('Fields Required');
            promise = isEditing ? updateFilm(currentItem._id, currentItem) : createFilm(currentItem);

        } else if (activeTab === 'preWeddings') {
            if (!currentItem.coupleName || !currentItem.city || !currentItem.videoId || !currentItem.mainImage) return toast.error('Fields Required');
            promise = isEditing ? updatePreWedding(currentItem._id, currentItem) : createPreWedding(currentItem);

        } else if (activeTab === 'stories') {
            if (!currentItem.title || !currentItem.coupleNames || !currentItem.coverImage) return toast.error('Title, Couple Names, Cover Image Required');
            promise = isEditing ? updateStory(currentItem._id, currentItem) : createStory(currentItem);

        } else {
            promise = Promise.reject('Action not implemented for this type yet');
        }

        toast.promise(promise, {
            loading: isEditing ? 'Updating...' : 'Creating...',
            success: isEditing ? 'Updated Successfully!' : 'Created Successfully!',
            error: isEditing ? 'Failed to update' : 'Failed to create'
        });

        try {
            await promise;
            setShowModal(false);
            loadData();
        } catch (error) {
            console.error(error);
        }
    };

    const tabConfig = [
        { id: 'stories', label: 'Stories', icon: <FaBookOpen /> },
        { id: 'films', label: 'Films', icon: <FaFilm /> },
        { id: 'preWeddings', label: 'Pre-Weddings', icon: <FaHeart /> },
        { id: 'photobooks', label: 'Photobooks', icon: <FaBookOpen /> },
        { id: 'images', label: 'Gallery Images', icon: <FaImages /> },
    ];

    return (
        <div className="flex h-screen pt-24 bg-[#f8f4ed] overflow-hidden font-serif">
            {/* Sidebar */}
            <motion.div
                initial={{ x: -100 }} animate={{ x: 0 }}
                className="w-64 bg-[#1a1a1a] text-white flex flex-col p-6 shadow-2xl z-10"
            >
                <div className="mb-10 text-center">
                    <img src={logo} alt="CineSine" className="w-32 mx-auto mb-2" />
                    <p className="text-[#d4af37] text-xs uppercase tracking-widest mt-2">Dashboard</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {tabConfig.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 text-sm uppercase tracking-wider ${activeTab === tab.id
                                ? 'bg-[#d4af37] text-black font-bold shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 transition uppercase text-xs tracking-wider"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-10 relative">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl text-[#333] uppercase tracking-[0.1em]">
                        Manage {tabConfig.find(t => t.id === activeTab)?.label}
                    </h1>
                    <button
                        onClick={() => openModal()}
                        className={`bg-[#1a1a1a] text-white px-6 py-3 flex items-center gap-2 hover:bg-[#333] transition uppercase text-xs tracking-widest shadow-lg`}
                        title="Add New Item"
                    >
                        <FaPlus /> Add New
                    </button>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {items.map(item => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white p-4 shadow-sm hover:shadow-md transition border border-gray-100 relative group"
                                >
                                    {/* Action Buttons */}
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition z-10">
                                        <button onClick={() => openModal(item)} className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition" title="Edit">
                                            <FaEdit size={12} />
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition" title="Delete">
                                            <FaTrash size={12} />
                                        </button>
                                    </div>

                                    {/* Thumbnail */}
                                    <div className="h-40 bg-gray-100 mb-4 overflow-hidden relative">
                                        <img
                                            src={
                                                item.coverImage ||
                                                item.mainImage ||
                                                item.imageUrl ||
                                                (item.images && item.images[0]) ||
                                                (item.videoUrl ? `https://img.youtube.com/vi/${item.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*)/)?.[1]}/hqdefault.jpg` : '') ||
                                                (item.videoId ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg` : '') ||
                                                'https://via.placeholder.com/300'
                                            }
                                            alt={item.title || item.coupleName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=No+Preview'}
                                        />
                                    </div>

                                    {/* Info */}
                                    <h3 className="font-bold text-[#333] uppercase tracking-wider text-sm mb-1 truncate">
                                        {item.title || item.coupleName || item.coupleNames}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2 truncate">
                                        {item.location || item.city || item.category || item.tagline || item.personName}
                                    </p>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-widest bg-gray-100 inline-block px-2 py-1 rounded-sm">
                                        {activeTab === 'stories' ? item.type : (activeTab === 'images' ? item.category : activeTab.slice(0, -1))}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && items.length === 0 && (
                    <div className="text-center text-gray-400 py-20 italic">No items found. Click "Add New" to create one.</div>
                )}
            </div>

            {/* Modal for Add/Edit */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-[#1a1a1a] text-white p-6 flex justify-between items-center">
                                <h3 className="text-xl font-serif tracking-widest uppercase">
                                    {isEditing ? 'Edit Item' : 'Add New Item'}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition">
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar">
                                <form onSubmit={handleSubmit} className="space-y-6">

                                    {/* --- PRE-WEDDINGS AND STORIES SHARE SIMILAR ARRAY LOGIC --- */}

                                    {(activeTab === 'preWeddings' || activeTab === 'stories') && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                                                        {activeTab === 'stories' ? 'Couple Names' : 'Couple Name'}
                                                    </label>
                                                    <input type="text" value={activeTab === 'stories' ? (currentItem.coupleNames || '') : (currentItem.coupleName || '')} onChange={e => setCurrentItem({ ...currentItem, [activeTab === 'stories' ? 'coupleNames' : 'coupleName']: e.target.value })} className="w-full border-b border-gray-300 py-2 focus:border-[#d4af37] outline-none font-serif" placeholder="e.g. John & Jane" required />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                                                        {activeTab === 'stories' ? 'Location' : 'City / Location'}
                                                    </label>
                                                    <input type="text" value={activeTab === 'stories' ? (currentItem.location || '') : (currentItem.city || '')} onChange={e => setCurrentItem({ ...currentItem, [activeTab === 'stories' ? 'location' : 'city']: e.target.value })} className="w-full border-b border-gray-300 py-2 focus:border-[#d4af37] outline-none font-serif" placeholder="e.g. Paris" required />
                                                </div>
                                            </div>

                                            {activeTab === 'stories' && (
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Title</label>
                                                        <input type="text" value={currentItem.title || ''} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} className="w-full border-b border-gray-300 py-2 focus:border-[#d4af37] outline-none font-serif" placeholder="e.g. The Royal Wedding" required />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Type</label>
                                                        <select value={currentItem.type || 'Wedding'} onChange={e => setCurrentItem({ ...currentItem, type: e.target.value })} className="w-full border-b border-gray-300 py-2 focus:border-[#d4af37] outline-none font-serif bg-transparent">
                                                            <option value="Wedding">Wedding</option>
                                                            <option value="Engagement">Engagement</option>
                                                            <option value="Haldi">Haldi</option>
                                                            <option value="Reception">Reception</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Main Video (YouTube)</label>
                                                <input type="text" value={activeTab === 'stories' ? (currentItem.videoUrl || '') : (currentItem.videoId || currentItem.videoUrl || '')} onChange={handleVideoUrlChange} className="w-full border border-gray-200 p-3 rounded-sm focus:border-[#d4af37] outline-none font-serif text-sm transition" placeholder="https://youtube.com/watch?v=..." />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Cover / Main Image</label>
                                                <div className="flex gap-4 items-center">
                                                    <div onClick={() => fileInputRef.current?.click()} className="w-24 h-24 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[#d4af37] flex-shrink-0">
                                                        {currentItem[activeTab === 'stories' ? 'coverImage' : 'mainImage'] ? <img src={currentItem[activeTab === 'stories' ? 'coverImage' : 'mainImage']} alt="Main" className="w-full h-full object-cover" /> : <FaCamera className="text-gray-400" />}
                                                    </div>
                                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                                                    <div className="flex-1">
                                                        <input type="text" value={currentItem[activeTab === 'stories' ? 'coverImage' : 'mainImage']?.startsWith('data:') ? '' : currentItem[activeTab === 'stories' ? 'coverImage' : 'mainImage'] || ''} onChange={e => setCurrentItem({ ...currentItem, [activeTab === 'stories' ? 'coverImage' : 'mainImage']: e.target.value })} className="w-full border-b border-gray-300 py-2 text-sm" placeholder="Or Paste Image URL" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Description</label>
                                                <textarea value={currentItem.description || ''} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} className="w-full border border-gray-300 p-3 rounded-sm focus:border-[#d4af37] outline-none font-serif h-20 resize-none" placeholder="Description..."></textarea>
                                            </div>

                                            {/* Sub Videos */}
                                            <div className="space-y-2 border-t pt-4">
                                                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold flex items-center gap-2"><FaYoutube /> Sub Videos (YouTube URLs)</label>
                                                <div className="flex gap-2">
                                                    <input type="text" value={tempSubVideo} onChange={e => setTempSubVideo(e.target.value)} className="flex-1 border border-gray-200 p-2 text-sm" placeholder="https://youtube.com..." />
                                                    <button type="button" onClick={addSubVideo} className="bg-[#333] text-white px-4 text-xs uppercase">Add</button>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {currentItem.subVideos?.map((vid, idx) => (
                                                        <div key={idx} className="relative bg-gray-100 px-3 py-1 text-xs flex items-center gap-2 rounded-sm border">
                                                            <span className="truncate max-w-[150px]">{vid}</span>
                                                            <button type="button" onClick={() => handleRemoveArrayItem('subVideos', idx)} className="text-red-500"><FaMinusCircle /></button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Sub Images / Gallery */}
                                            <div className="space-y-2 border-t pt-4">
                                                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold flex items-center gap-2"><FaImages /> Gallery Images</label>
                                                <div className="flex gap-2">
                                                    <input type="text" value={tempGalleryUrl} onChange={e => setTempGalleryUrl(e.target.value)} className="flex-1 border border-gray-200 p-2 text-sm" placeholder="Image URL..." />
                                                    <button type="button" onClick={addGalleryUrl} className="bg-[#333] text-white px-4 text-xs uppercase">Add URL</button>
                                                    <button type="button" onClick={() => galleryInputRef.current?.click()} className="bg-gray-200 text-gray-700 px-4 text-xs uppercase">Upload</button>
                                                    <input type="file" ref={galleryInputRef} onChange={handleGalleryUpload} accept="image/*" className="hidden" />
                                                </div>
                                                <div className="grid grid-cols-4 gap-2 mt-2">
                                                    {/* Stories use 'images', PreWeddings use 'galleryImages' */}
                                                    {(currentItem[activeTab === 'stories' ? 'images' : 'galleryImages'] || []).map((img, idx) => (
                                                        <div key={idx} className="relative h-16 w-full bg-gray-100 group">
                                                            <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                                                            <button type="button" onClick={() => handleRemoveArrayItem(activeTab === 'stories' ? 'images' : 'galleryImages', idx)} className="absolute top-0 right-0 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition"><FaTimes size={10} /></button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* (Existing Forms for Other Tabs) */}
                                    {(activeTab === 'photobooks' || activeTab === 'films' || activeTab === 'images') && (
                                        <>
                                            {activeTab === 'photobooks' && (
                                                <div className="space-y-4">
                                                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Media</label>
                                                    <div onClick={() => fileInputRef.current?.click()} className="w-full h-32 bg-gray-100 border border-dashed flex items-center justify-center cursor-pointer">
                                                        {currentItem.coverImage ? <img src={currentItem.coverImage} className="w-full h-full object-cover" /> : <FaCamera />}
                                                    </div>
                                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                                                    <input type="text" value={currentItem.coverImage?.startsWith('data:') ? '' : currentItem.coverImage || ''} onChange={e => setCurrentItem({ ...currentItem, coverImage: e.target.value })} className="w-full border-b p-2" placeholder="Image URL" />
                                                    <input type="text" value={currentItem.videoUrl || ''} onChange={handleVideoUrlChange} className="w-full border-b p-2" placeholder="YouTube URL" />
                                                    <input type="text" value={currentItem.title || ''} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} className="w-full border-b p-2" placeholder="Title" required />
                                                    <input type="text" value={currentItem.personName || ''} onChange={e => setCurrentItem({ ...currentItem, personName: e.target.value })} className="w-full border-b p-2" placeholder="Person Name" required />
                                                </div>
                                            )}
                                            {activeTab === 'films' && (
                                                <div className="space-y-4">
                                                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Video</label>
                                                    <input type="text" value={currentItem.videoUrl || ''} onChange={handleVideoUrlChange} className="w-full border p-2" placeholder="YouTube URL" required />
                                                    <input type="text" value={currentItem.title || ''} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} className="w-full border-b p-2" placeholder="Title" required />
                                                    <input type="text" value={currentItem.coupleName || ''} onChange={e => setCurrentItem({ ...currentItem, coupleName: e.target.value })} className="w-full border-b p-2" placeholder="Couple Name" required />
                                                    <input type="text" value={currentItem.tagline || ''} onChange={e => setCurrentItem({ ...currentItem, tagline: e.target.value })} className="w-full border-b p-2" placeholder="Tagline" />
                                                </div>
                                            )}
                                            {activeTab === 'images' && (
                                                <div className="space-y-4">
                                                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Image</label>
                                                    <div onClick={() => fileInputRef.current?.click()} className="w-full h-32 bg-gray-100 border border-dashed flex items-center justify-center cursor-pointer">
                                                        {currentItem.imageUrl ? <img src={currentItem.imageUrl} className="w-full h-full object-cover" /> : <FaCamera />}
                                                    </div>
                                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                                                    <input type="text" value={currentItem.imageUrl?.startsWith('data:') ? '' : currentItem.imageUrl || ''} onChange={e => setCurrentItem({ ...currentItem, imageUrl: e.target.value })} className="w-full border-b p-2" placeholder="Image URL" />
                                                    <input type="text" value={currentItem.title || ''} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} className="w-full border-b p-2" placeholder="Title" required />
                                                    <input type="text" value={currentItem.category || ''} onChange={e => setCurrentItem({ ...currentItem, category: e.target.value })} className="w-full border-b p-2" placeholder="Category" required />
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className="pt-4 flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="flex-1 border border-gray-300 text-gray-600 py-3 uppercase tracking-widest text-xs hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-[#1a1a1a] text-white py-3 uppercase tracking-widest text-xs hover:bg-[#333] transition flex items-center justify-center gap-2"
                                        >
                                            <FaSave /> {isEditing ? 'Update Item' : 'Create Item'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
