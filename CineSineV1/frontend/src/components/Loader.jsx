import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-[50vh] w-full bg-transparent">
            <div className="relative flex flex-col items-center">
                {/* Cinematic Spinning Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-16 h-16 border-[1px] border-gray-200 border-t-[#d4af37] rounded-full mb-4"
                ></motion.div>

                {/* Logo Fade In/Out */}
                <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="text-[#d4af37] font-serif tracking-[0.3em] text-xs uppercase"
                >
                    Loading
                </motion.span>
            </div>
        </div>
    );
};

export default Loader;
