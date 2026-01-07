import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPreWeddings } from '../api';
import { FaArrowRight, FaArrowLeft, FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

// Helper function to extract YouTube video ID from various URL formats or return as-is if already an ID
// Supports: embed URLs, watch URLs, short URLs, and URLs with additional parameters (like si=)
const extractVideoId = (input) => {
    if (!input) return null;

    // If it's already just a video ID (11 characters, alphanumeric with - and _)
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
        return input;
    }

    // Handle embed URLs: https://www.youtube.com/embed/VIDEO_ID
    const embedMatch = input.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];

    // Handle watch URLs: https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = input.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) return watchMatch[1];

    // Handle short URLs: https://youtu.be/VIDEO_ID
    const shortMatch = input.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];

    // Handle live URLs: https://www.youtube.com/live/VIDEO_ID
    const liveMatch = input.match(/live\/([a-zA-Z0-9_-]{11})/);
    if (liveMatch) return liveMatch[1];

    return input; // Return as-is if no pattern matches (might be a valid ID)
};

// Helper function to get the proper YouTube embed URL
const getEmbedUrl = (input) => {
    const videoId = extractVideoId(input);
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}`;
};

const PreWeddings = () => {
    const [preWeddings, setPreWeddings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false); // Track if video is playing

    useEffect(() => {
        fetchPreWeddings()
            .then(res => {
                setPreWeddings(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % preWeddings.length);
        setIsVideoPlaying(false); // Reset video playing state when navigating
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + preWeddings.length) % preWeddings.length);
        setIsVideoPlaying(false); // Reset video playing state when navigating
    };

    const handlePlayVideo = () => {
        setIsVideoPlaying(true);
    };

    if (loading) return <Loader />;
    if (preWeddings.length === 0) return <div className="text-center pt-24 min-h-screen bg-[#f8f4ed]">No Pre-Wedding stories found.</div>;

    const currentItem = preWeddings[currentIndex];
    const videoId = extractVideoId(currentItem.videoId);
    const thumbnailUrl = videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : currentItem.mainImage || 'https://via.placeholder.com/1280x720?text=Video';

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

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
                <h1 className="text-4xl font-serif tracking-[0.2em] mb-4 text-[#333]">PRE-WEDDINGS</h1>
                <div className="w-16 h-[1px] bg-gray-400 mx-auto"></div>
            </motion.div>

            <div className="max-w-5xl mx-auto relative">
                {/* Navigation Arrows */}
                <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 md:p-4 shadow-lg transition-all"
                >
                    <FaArrowLeft className="text-[#333]" />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 md:p-4 shadow-lg transition-all"
                >
                    <FaArrowRight className="text-[#333]" />
                </motion.button>

                {/* Content with Slide Animation */}
                <div className="overflow-hidden">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.3 }
                            }}
                            className="flex flex-col items-center"
                        >
                            {/* Video Section - Click to Play */}
                            <div className="w-full aspect-video bg-black mb-8 shadow-2xl relative overflow-hidden group">
                                {isVideoPlaying ? (
                                    // Show YouTube iframe when user clicks to play
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`${getEmbedUrl(currentItem.videoId)}?modestbranding=1&rel=0&autoplay=1`}
                                        title={currentItem.coupleName}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                ) : (
                                    // Show thumbnail with play button overlay
                                    <div
                                        className="w-full h-full cursor-pointer relative"
                                        onClick={handlePlayVideo}
                                    >
                                        <img
                                            src={thumbnailUrl}
                                            alt={currentItem.coupleName}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                // Fallback to standard quality thumbnail if maxres fails
                                                e.target.src = videoId
                                                    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                                                    : currentItem.mainImage || 'https://via.placeholder.com/1280x720?text=Video';
                                            }}
                                        />
                                        {/* Dark overlay */}
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                                        {/* Play button */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-20 h-20 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:bg-white transition-all duration-300"
                                            >
                                                <FaPlay className="text-[#d4af37] text-2xl md:text-3xl ml-1" />
                                            </motion.div>
                                        </div>
                                        {/* Watch text */}
                                        <div className="absolute bottom-6 left-0 right-0 text-center">
                                            <span className="text-white text-sm uppercase tracking-[0.2em] font-sans bg-black/50 px-4 py-2 rounded-full">
                                                Click to Watch
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Couple Info */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl font-serif text-center mb-2"
                            >
                                {currentItem.coupleName}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-gray-500 uppercase tracking-[0.2em] text-sm mb-6"
                            >
                                {currentItem.city}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link
                                    to={`/pre-wedding/${currentItem._id}`}
                                    className="inline-block border border-[#333] px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-[#333] hover:text-white transition-all duration-300"
                                >
                                    Read More
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-12">
                    {preWeddings.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                                setIsVideoPlaying(false); // Reset video playing state when navigating
                            }}
                            whileHover={{ scale: 1.2 }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-[#333] w-6' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default PreWeddings;
