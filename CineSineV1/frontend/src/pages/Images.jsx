import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchStories, fetchImages } from '../api';
import Loader from '../components/Loader';

const Images = () => {
    const [allImages, setAllImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([fetchStories(), fetchImages()])
            .then(([storiesRes, imagesRes]) => {
                // Process Story Images (Previous Layout Source)
                const storyImages = storiesRes.data.flatMap((story, sIndex) =>
                    story.images.map((imgUrl, iIndex) => ({
                        _id: `story-${story._id}-${iIndex}`, // Unique ID
                        url: imgUrl,
                        category: story.type, // Map 'type' to category
                        title: story.title,
                        source: 'story'
                    }))
                );

                // Process Dashboard Images (New Dynamic Source)
                const manualImages = imagesRes.data.map(img => ({
                    _id: img._id,
                    url: img.imageUrl,
                    category: img.category,
                    title: img.title,
                    source: 'manual'
                }));

                // Combine and Shuffle/Sort (Newest first effectively)
                const combined = [...manualImages, ...storyImages];

                setAllImages(combined);
                setFilteredImages(combined);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredImages(allImages);
        } else {
            setFilteredImages(allImages.filter(img => img.category === filter));
        }
    }, [filter, allImages]);

    // Dynamic Categories
    const categories = ['All', ...new Set(allImages.map(img => img.category))];

    if (loading) return <Loader />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 px-6 min-h-screen bg-[#f8f4ed]"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-serif tracking-[0.2em] mb-4 text-[#333]">GALLERY</h1>
                <div className="w-16 h-[1px] bg-gray-400 mx-auto mb-8"></div>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-wrap justify-center gap-4 mb-12"
            >
                {categories.map((category) => (
                    <motion.button
                        key={category}
                        onClick={() => setFilter(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-2 font-sans text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${filter === category
                            ? 'bg-[#333] text-white border-[#333]'
                            : 'bg-transparent text-gray-600 border-gray-300 hover:border-[#333]'
                            }`}
                    >
                        {category}
                    </motion.button>
                ))}
            </motion.div>

            {/* Masonry Grid (Restored Structure) */}
            <motion.div
                layout
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 max-w-7xl mx-auto"
            >
                <AnimatePresence mode="popLayout">
                    {filteredImages.map((img, index) => (
                        <motion.div
                            key={img._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: index * 0.03 }}
                            className="break-inside-avoid mb-4 overflow-hidden group cursor-pointer relative"
                        >
                            <motion.img
                                src={img.url}
                                alt={img.title}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-auto object-cover shadow-sm"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/400x600?text=Image'}
                            />
                            {/* Optional Overlay for Title - Kept from enhancement */}
                            <div className="hidden group-hover:flex absolute inset-0 bg-black/40 items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                                <p className="text-white font-serif tracking-widest uppercase text-sm text-center px-2">
                                    {img.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredImages.length === 0 && (
                <div className="text-center text-gray-400 italic py-20">No images available in this category.</div>
            )}
        </motion.div>
    );
};

export default Images;
