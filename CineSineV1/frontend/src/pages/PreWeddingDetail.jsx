import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { fetchPreWeddingById } from '../api';
import { FaArrowLeft } from 'react-icons/fa';
import Loader from '../components/Loader';
import { staggerContainer, fadeInUp } from '../components/AnimationUtils';

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

const PreWeddingDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPreWeddingById(id)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Loader />;
    if (!data) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center pt-24 min-h-screen bg-[#f8f4ed]"
        >
            <p className="text-2xl font-serif text-gray-500">Story not found.</p>
            <Link to="/pre-weddings" className="inline-block mt-6 text-sm uppercase tracking-widest text-[#d4af37] hover:underline">
                &larr; Back to Pre-Weddings
            </Link>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 px-0 md:px-6 min-h-screen bg-[#f8f4ed]"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/pre-weddings" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8 px-4 md:px-20 transition">
                    <FaArrowLeft /> Back to Pre-Weddings
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-5xl mx-auto text-center mb-12"
            >
                <h1 className="text-3xl md:text-5xl font-serif mb-4 text-[#333]">{data.coupleName}</h1>
                <p className="text-xl font-sans text-gray-500 uppercase tracking-widest">{data.city}</p>
            </motion.div>

            <div className="max-w-6xl mx-auto pb-20">
                {/* Main Image */}
                <motion.img
                    src={data.mainImage}
                    alt={data.coupleName}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-auto shadow-lg mb-12"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/1200x600'}
                />

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center font-serif text-lg leading-loose text-gray-700 max-w-3xl mx-auto mb-16 whitespace-pre-wrap"
                >
                    {data.description}
                </motion.p>

                {/* Sub Videos Section */}
                {data.subVideos && data.subVideos.length > 0 && (
                    <div className="mb-16">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center font-serif text-2xl mb-8 tracking-widest uppercase text-gray-800"
                        >
                            Feature Films
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {data.subVideos.map((url, index) => {
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
                                            title={`Video ${index}`}
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

                {/* Gallery Images */}
                {data.galleryImages && data.galleryImages.length > 0 && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {data.galleryImages.map((img, index) => (
                            <motion.img
                                key={index}
                                variants={fadeInUp}
                                src={img}
                                alt={`Gallery ${index}`}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-cover shadow-sm hover:shadow-lg"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/600x800'}
                            />
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default PreWeddingDetail;
