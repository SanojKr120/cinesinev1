import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

const FloatingActionButtons = () => {
    const phoneNumber = "9939394120"; // User provided number
    const whatsappMessage = encodeURIComponent("Hello CineSine, I would like to inquire about your services.");

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            {/* Phone Call Button */}
            <motion.a
                href={`tel:${phoneNumber}`}
                className="bg-blue-600 text-white p-2 rounded-full shadow-lg flex items-center justify-center relative group overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, scale: [1, 1.1, 1] }}
                transition={{
                    duration: 0.5,
                    delay: 0.1,
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                title="Call Us"
            >
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 origin-center"></div>
                <FaPhone className="text-lg relative z-10" />
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a
                href={`https://wa.me/91${phoneNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white p-2 rounded-full shadow-lg flex items-center justify-center relative group overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, scale: [1, 1.1, 1] }}
                transition={{
                    duration: 0.5,
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                title="Chat on WhatsApp"
            >
                {/* Ripple effect ring */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>

                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 origin-center"></div>
                <FaWhatsapp className="text-xl relative z-10" />
            </motion.a>
        </div>
    );
};

export default FloatingActionButtons;
