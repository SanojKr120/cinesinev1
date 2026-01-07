import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for scroll-triggered animations
export const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

// Animated wrapper component for scroll-triggered animations
export const AnimatedSection = ({ children, variants = fadeInUp, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={variants}
            className={className}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
};

// Animated image with lazy loading effect
export const AnimatedImage = ({ src, alt, className = "", ...props }) => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Skeleton placeholder */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <motion.img
                src={src}
                alt={alt}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.1
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                onLoad={() => setIsLoaded(true)}
                className="w-full h-full object-cover"
                {...props}
            />
        </div>
    );
};
