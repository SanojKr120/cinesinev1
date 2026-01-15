import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, fadeInUp, staggerContainer, scaleIn } from '../components/AnimationUtils';
import homehero from '../images/homehero.jpg';
import heroimg1 from '../images/homeimg1.jpg';
import heroimg2 from '../images/homeimg2.jpg';
import heroimg3 from '../images/homeimg3.jpg';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
        >
            {/* Hero Section with Video/Image Background */}
            <section className="h-[100dvh] relative overflow-hidden flex items-center justify-center bg-black">
                {/* Cinematic Background Gradient (Subtle) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 z-10 pointer-events-none"></div>

                {/* Using high-quality wedding image as fallback since demo video is unavailable */}
                {/* Mobile Background Image (Existing) */}
                <img
                    src={homehero}
                    alt="Wedding Background Mobile"
                    className="absolute inset-0 w-full h-full object-cover object-center md:hidden brightness-110"
                />

                {/* Desktop Background Image (New - Wide Cinematic) */}
                <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
                    alt="Wedding Background Desktop"
                    className="absolute inset-0 w-full h-full object-cover hidden md:block"
                />

                <div className="relative z-20 text-center text-white px-4 mt-44 selection:bg-pink-500 selection:text-white">
                    {/* <motion.h1
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-8xl font-serif font-bold mb-6 tracking-[0.1em] drop-shadow-2xl"
                    >
                        WEDDINGS WORLD
                    </motion.h1> */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center mt-24"
                    >
                        <p className="text-sm md:text-lg font-serif tracking-[0.3em] uppercase mb-1 text-white drop-shadow-md">
                            CRAFTING YOUR STORY IN MOTION
                        </p>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="w-16 h-[1px] bg-white/80"
                        ></motion.div>
                    </motion.div>

                </div>

                {/* Scroll indicator - Positioned at bottom of Hero Section */}
                <div className="absolute bottom-10 left-0 right-0 mx-auto w-6 z-30">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
                    >
                        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1 h-2 bg-white/70 rounded-full"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="py-24 text-center px-6 bg-[#f8f4ed]">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-serif tracking-[0.2em] mb-8 text-[#333]">WELCOME</h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-20 h-[2px] bg-[#d4af37] mx-auto mb-12 origin-center"
                    />

                    <p className="max-w-4xl mx-auto text-gray-600 font-serif leading-loose text-xl italic mb-8">
                        "Where every frame captures the soul of your story, turning fleeting moments into cinematic eternity."
                    </p>
                    <p className="max-w-3xl mx-auto text-gray-500 font-sans tracking-wide leading-relaxed text-sm uppercase">
                        {/* A world populated with a billion heartfelt feelings and stories etched ceremoniously in magic, love and joie de vivre. */}

                        Immerse in a realm of cinematic videography and photography, weaving emotions, light, and motion into timeless masterpieces filled with passion, elegance, and boundless creativity
                    </p>
                </AnimatedSection>
            </section>

            {/* What We Love Section */}
            <section className="py-20 px-6 bg-white overflow-hidden">
                <AnimatedSection className="text-center mb-16">
                    <h3 className="text-2xl font-serif tracking-[0.2em] text-[#333] uppercase">What We Love</h3>
                    <div className="w-16 h-[1px] bg-gray-300 mx-auto mt-4"></div>
                </AnimatedSection>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
                >
                    <motion.div variants={fadeInUp} className="text-center group cursor-pointer">
                        <div className="overflow-hidden h-[350px] md:h-[500px] mb-6 relative">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.7 }}
                                src={heroimg1}
                                alt="Emotions"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-500"></div>
                        </div>
                        <h4 className="font-serif tracking-[0.2em] uppercase text-sm">Raw Emotions</h4>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="text-center group cursor-pointer">
                        <div className="overflow-hidden h-[350px] md:h-[500px] mb-6 relative">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.7 }}
                                src={heroimg2}
                                alt="Portraits"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-500"></div>
                        </div>
                        <h4 className="font-serif tracking-[0.2em] uppercase text-sm">Timeless Portraits</h4>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="text-center group cursor-pointer">
                        <div className="overflow-hidden h-[350px] md:h-[500px] mb-6 relative">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.7 }}
                                src={heroimg3}
                                alt="Details"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-500"></div>
                        </div>
                        <h4 className="font-serif tracking-[0.2em] uppercase text-sm">Intricate Details</h4>
                    </motion.div>
                </motion.div>
            </section>
        </motion.div>
    );
};

export default Home;
