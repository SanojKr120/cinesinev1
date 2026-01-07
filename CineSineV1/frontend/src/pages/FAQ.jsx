import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Do you travel for destination weddings?",
            answer: "Yes, we love traveling! We document weddings across the globe and bring our cinematic expertise to your dream destination."
        },
        {
            question: "What is your photography style?",
            answer: "Our style is a blend of candids and editorial portraiture. We focus on capturing genuine emotions while ensuring you look your absolute best."
        },
        {
            question: "How long does it take to receive the deliverables?",
            answer: "Typically, photos are delivered within 4-6 weeks, and cinematic films take about 8-12 weeks, depending on the season's workload."
        },
        {
            question: "Do you provide raw footage?",
            answer: "We believe in delivering a finished masterpiece. However, raw footage can be purchased separately as an add-on service."
        },
        {
            question: "What equipment do you use?",
            answer: "We use top-of-the-line cinema cameras and lenses, including RED and Sony professional series, to ensure your memories are captured in stunning 4K quality."
        },
        {
            question: "What is included in your packages?",
            answer: "Our packages are custom-tailored to your needs. Typically, they include full-day coverage, a highlight film, a full feature film, and a curated collection of high-resolution photographs."
        }
    ];

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
                className="text-center mb-16"
            >
                <h1 className="text-4xl font-serif tracking-[0.2em] mb-4 text-[#333]">FAQ</h1>
                <div className="w-16 h-[1px] bg-gray-400 mx-auto mb-6"></div>
                <p className="text-gray-500 font-sans tracking-widest uppercase text-sm">Everything you need to know</p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="border border-gray-200 bg-white overflow-hidden"
                    >
                        <motion.button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            className="w-full text-left p-6 flex justify-between items-center transition"
                        >
                            <span className="font-serif text-lg">{faq.question}</span>
                            <motion.span
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-gray-400 text-sm"
                            >
                                {openIndex === index ? <FaMinus /> : <FaPlus />}
                            </motion.span>
                        </motion.button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 pt-0 text-gray-600 font-sans leading-relaxed border-t border-gray-100">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default FAQ;
