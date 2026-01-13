import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchStoryById } from '../api';
import Loader from '../components/Loader';
import { fadeInUp, staggerContainer } from '../components/AnimationUtils';
import { FaHeart, FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';

// Helper to extract video ID
const extractVideoId = (url) => {
    if (!url) return null;
    const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) return watchMatch[1];
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];
    return null;
};

const StoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStoryById(id)
            .then(res => {
                setStory(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Loader />;

    if (!story) return (
        <div className="h-screen flex flex-col items-center justify-center text-[#333]">
            <h2 className="text-3xl font-serif mb-4">Story Not Found</h2>
            <button onClick={() => navigate('/stories')} className="text-sm uppercase tracking-[0.2em] border-b border-[#333]">Back to Stories</button>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-[#f8f4ed] overflow-x-hidden"
        >
            {/* Hero Section */}
            <div className="relative pt-32 pb-16 px-0 md:px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-serif text-[#333] mb-4"
                >
                    {story.title}
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl font-serif text-[#555] uppercase tracking-[0.2em] mb-4"
                >
                    {story.coupleNames}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xs md:text-sm font-sans uppercase tracking-[0.2em] text-gray-500 mb-12"
                >
                    {story.location}
                </motion.p>

                {/* Main Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-full max-w-7xl mx-auto h-[50vh] md:h-[80vh] overflow-hidden shadow-xl"
                >
                    <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
                </motion.div>
            </div>

            {/* Content & Gallery */}
            <div className="max-w-5xl mx-auto px-6 pb-24">
                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center md:text-lg font-serif italic text-gray-600 leading-relaxed mb-16 max-w-3xl mx-auto whitespace-pre-wrap"
                >
                    <p>{story.description}</p>
                </motion.div>

                {/* Main Video (if exists) */}
                {story.videoUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full aspect-video mb-16 shadow-2xl"
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube-nocookie.com/embed/${extractVideoId(story.videoUrl)}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&fs=1&color=white`}
                            title="Main Story Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </motion.div>
                )}

                {/* Sub Videos Section */}
                {story.subVideos && story.subVideos.length > 0 && (
                    <div className="mb-24">
                        <motion.h3
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-center font-serif text-2xl mb-12 tracking-widest uppercase text-gray-800"
                        >
                            Feature Films
                        </motion.h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {story.subVideos.map((url, index) => {
                                const vId = extractVideoId(url);
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="aspect-video bg-black shadow-lg"
                                    >
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube-nocookie.com/embed/${vId}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&fs=1&color=white`}
                                            title={`Sub Video ${index}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}


                {/* Image Gallery */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 gap-12"
                >
                    {story.images && story.images.map((img, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="w-full"
                        >
                            <img src={img} alt={`Story detail ${index + 1}`} className="w-full h-auto shadow-sm" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Social Share & Interaction */}
                <div className="mt-24 border-t border-gray-300 pt-12 flex flex-col items-center">
                    <div className="flex gap-8 mb-8 text-gray-400">
                        <FaFacebookF className="hover:text-[#333] cursor-pointer transition-colors" />
                        <FaTwitter className="hover:text-[#333] cursor-pointer transition-colors" />
                        <FaPinterestP className="hover:text-[#333] cursor-pointer transition-colors" />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full hover:border-red-500 hover:text-red-500 transition-all group">
                        <FaHeart className="text-gray-300 group-hover:text-red-500 transition-colors" />
                        <span className="text-xs uppercase tracking-widest">Love This Story</span>
                    </button>
                </div>

                {/* "Next" Navigation Mockup (Static for now, could be dynamic) */}
                <div className="mt-24 text-center">
                    <Link to="/stories" className="text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-[#333] transition-colors">Back to All Stories</Link>
                </div>

            </div>
        </motion.div>
    );
};

export default StoryDetail;
