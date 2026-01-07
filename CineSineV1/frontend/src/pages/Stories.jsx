import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchStories } from '../api';
import Loader from '../components/Loader';
import { staggerContainer, fadeInUp } from '../components/AnimationUtils';

const Stories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStories()
            .then(res => {
                setStories(res.data);
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
            className="pt-24 px-6 min-h-screen bg-[#f8f4ed]"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-serif tracking-[0.2em] mb-4 text-[#333]">STORIES</h1>
                <div className="w-16 h-[1px] bg-gray-400 mx-auto"></div>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
                {stories.map((story, index) => (
                    <motion.div
                        key={story._id}
                        variants={fadeInUp}
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="group cursor-pointer"
                    >
                        <div className="h-[350px] md:h-[450px] overflow-hidden bg-gray-200 mb-6 relative">
                            <motion.img
                                src={story.coverImage}
                                alt={story.title}
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="w-full h-full object-cover transition-transform duration-700"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/400x600?text=Story'}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-500"></div>
                        </div>
                        <h3 className="text-lg md:text-xl font-serif text-center uppercase tracking-[0.2em] text-[#333] mb-2">{story.title}</h3>
                        <p className="text-sm text-center text-gray-500 font-serif italic mb-4">{story.type}  &mdash;  {story.location || 'India'}</p>
                        <div className="text-center">
                            <Link to={`/stories/${story._id}`} className="inline-block text-[10px] uppercase tracking-[0.2em] border-b border-[#333] pb-1 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors">Read Story</Link>
                        </div>
                    </motion.div>
                ))}
                {stories.length === 0 && (
                    <div className="col-span-full text-center text-gray-400 italic">No stories available.</div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Stories;
