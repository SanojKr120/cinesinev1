import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaVolumeMute, FaVolumeUp, FaExpand } from 'react-icons/fa';
import { fetchFilms } from '../api';
import Loader from '../components/Loader';
import { fadeInUp, staggerContainer } from '../components/AnimationUtils';

// Helper: Extract Video ID
const extractVideoId = (url) => {
    if (!url) return null;
    const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) return watchMatch[1];
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];
    const liveMatch = url.match(/live\/([a-zA-Z0-9_-]{11})/);
    if (liveMatch) return liveMatch[1];
    return null;
};

const Films = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [interactiveId, setInteractiveId] = useState(null); // Track which video is currently "active" (with controls)

    useEffect(() => {
        fetchFilms()
            .then(res => {
                setFilms(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <Loader />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[#fafafa]"
        >
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="pt-32 pb-16 text-center"
            >
                <h1 className="text-lg md:text-xl font-sans uppercase tracking-[0.4em] text-[#707070] mb-4">
                    Films
                </h1>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-12 h-[1px] bg-[#c9c9c9] mx-auto"
                />
            </motion.div>

            {/* Films Container */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="flex flex-col gap-20 md:gap-32 max-w-6xl mx-auto px-4 md:px-8 pb-24"
            >
                {films.map((film, index) => {
                    const videoId = extractVideoId(film.videoUrl);
                    const isInteractive = interactiveId === film._id;

                    return (
                        <motion.div
                            key={film._id}
                            variants={fadeInUp}
                            className="flex flex-col items-center w-full"
                        >
                            {/* Video Container */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full aspect-video bg-black relative group overflow-hidden shadow-2xl"
                            >
                                {videoId ? (
                                    <div className={`w-full h-full relative ${isInteractive ? '' : 'pointer-events-none'}`}>
                                        {/* 
                                            IFRAME LOGIC:
                                            - Interactive: Controls=1, Autoplay=1 (User Clicked), Scale=1 (Fit all UI)
                                            - Ambient: Controls=0, Mute=1, Loop=1, Scale=1.5 (Zoom/Crop Black Bars)
                                         */}
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={isInteractive
                                                ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&color=white`
                                                : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`
                                            }
                                            title={film.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                            allowFullScreen
                                            className={`w-full h-full object-cover transition-transform duration-700 ${isInteractive ? 'scale-100' : 'scale-[1.50]'}`}
                                        ></iframe>

                                        {!isInteractive && (
                                            <div className="absolute inset-0 bg-transparent"></div>
                                        )}
                                    </div>
                                ) : (
                                    <img
                                        src='https://via.placeholder.com/1280x720?text=Invalid+Video+URL'
                                        alt="Placeholder"
                                        className="w-full h-full object-cover"
                                    />
                                )}

                                {/* Overlay Content - Hidden when Interactive Mode is active */}
                                <AnimatePresence>
                                    {!isInteractive && (
                                        <motion.div
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 pointer-events-none"
                                        >
                                            {/* Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                                            {/* Play / Unmute Button (Center) - POINTER EVENTS AUTO */}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                                                <button
                                                    onClick={() => setInteractiveId(film._id)}
                                                    className="group/btn flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-black text-white transition-all duration-300 transform hover:scale-105"
                                                >
                                                    <FaVolumeUp className="text-sm" />
                                                    <span className="text-xs font-sans uppercase tracking-widest font-bold">Watch Film</span>
                                                </button>
                                            </div>

                                            {/* Text Content */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-center pointer-events-auto">
                                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white uppercase tracking-[0.15em] drop-shadow-lg mb-2">
                                                    {film.coupleName}
                                                </h2>
                                                {film.tagline && (
                                                    <p className="text-base md:text-lg text-white/90 italic font-serif drop-shadow-md">
                                                        {film.tagline}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Film Title Below Video */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-center mt-8 md:mt-12"
                            >
                                <h3 className="text-sm md:text-base font-sans uppercase tracking-[0.3em] text-[#525252] mb-3">
                                    {film.title || 'Wedding Film'}
                                </h3>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="w-8 h-[1px] bg-[#c9c9c9] mx-auto"
                                />
                            </motion.div>
                        </motion.div>
                    );
                })}

                {films.length === 0 && (
                    <div className="text-center py-20 text-gray-400 font-serif italic">No films available. check back soon.</div>
                )}
            </motion.div>

            {/* Bottom Separator */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="py-16 text-center"
            >
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9c9c9] to-transparent mx-auto" />
            </motion.div>
        </motion.div>
    );
};

export default Films;
