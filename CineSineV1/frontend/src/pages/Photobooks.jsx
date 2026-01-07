import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPhotobooks } from '../api';
import Loader from '../components/Loader';
import { staggerContainer, fadeInUp } from '../components/AnimationUtils';

const Photobooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPhotobooks()
            .then(res => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const getVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*)/);
        return match ? match[1] : null;
    };

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
                <h1 className="text-4xl font-serif tracking-[0.2em] mb-4 text-[#333]">PHOTOBOOKS</h1>
                <div className="w-16 h-[1px] bg-gray-400 mx-auto"></div>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto"
            >
                {books.map((book, index) => {
                    const videoId = getVideoId(book.videoUrl);

                    return (
                        <motion.div
                            key={book._id}
                            variants={fadeInUp}
                            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-4 shadow-sm cursor-pointer group relative"
                        >
                            <div className="h-64 md:h-96 bg-gray-200 overflow-hidden mb-4 relative">
                                {videoId ? (
                                    <div className="w-full h-full relative pointer-events-none">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`}
                                            title={book.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            className="w-full h-full object-cover scale-[1.50]" // Scale up to remove black bars
                                            style={{ pointerEvents: 'none' }}
                                        ></iframe>
                                        {/* Transparent Overlay to ensure no interaction catches */}
                                        <div className="absolute inset-0 bg-transparent"></div>
                                    </div>
                                ) : (
                                    <motion.img
                                        src={book.coverImage}
                                        alt={book.title}
                                        initial={{ scale: 1.1, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.7, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="w-full h-full object-cover transition-transform duration-700"
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/600x800?text=Photobook'}
                                    />
                                )}
                            </div>
                            <h3 className="text-xl font-serif text-center uppercase tracking-wide">{book.title}</h3>
                            <p className="text-center text-gray-500 text-sm mt-1">{book.personName}</p>
                        </motion.div>
                    );
                })}
                {books.length === 0 && <div className="col-span-full text-center text-gray-400">No photobooks available.</div>}
            </motion.div>
        </motion.div>
    );
};

export default Photobooks;
