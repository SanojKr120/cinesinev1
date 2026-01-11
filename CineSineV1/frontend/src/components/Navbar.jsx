import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import logo from '../logos/cinesinelogo.png';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    // Unified navbar style for all routes
    const textColorClass = 'text-[#f8f4ed]';
    const hamburgerColorClass = 'bg-[#f8f4ed]';

    const links = [
        { path: '/stories', label: 'Stories' },
        { path: '/photobooks', label: 'Photobooks' },
        { path: '/images', label: 'Images' },
        { path: '/films', label: 'Films' },
        { path: '/pre-weddings', label: 'Pre-Weddings' },
        { path: '/faq', label: 'FAQ' },
        { path: '/contact', label: 'Contact' },
        { path: '/profile', label: 'Profile' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out bg-[#1a1a1a]/80 backdrop-blur-md py-4 shadow-sm px-6 md:px-16 flex justify-between items-center`}>

            {/* Logo */}

            <div className={`relative z-50 text-2xl md:text-3xl font-bold tracking-[0.2em] font-serif ${textColorClass} transition-colors duration-300`}>
                <Link to="/"><img src={logo} alt="Logo" className="w-[180px] m-0 p-0" /></Link>
            </div>

            {/* Desktop Menu */}
            <ul className={`hidden lg:flex flex-wrap justify-center gap-8 font-serif text-xs tracking-[0.2em] uppercase font-semibold ${textColorClass}`}>
                {links.map(link => (
                    <li key={link.path}>
                        <Link
                            to={link.path}
                            className={`hover:opacity-70 transition ${location.pathname === link.path ? 'text-[#f58631]' : ''}`}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Mobile/Tablet Menu Button (Hamburger - 2 Lines style like TWS) */}
            <button
                className="lg:hidden relative z-50 p-2 focus:outline-none group"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
            >
                <div className="flex flex-col gap-2 items-end w-8">
                    <motion.div
                        animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                        className={`w-full h-[1px] ${hamburgerColorClass} transition-colors duration-300`}
                    />
                    <motion.div
                        animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                        className={`w-full h-[1px] ${hamburgerColorClass} transition-colors duration-300`}
                    />
                </div>
            </button>

            {/* Mobile Full Screen Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 top-0 left-0 w-full bg-[#0a0a0a] z-40 flex flex-col items-center justify-center overflow-hidden"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#f58631]/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#f8f4ed]/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="flex-grow flex flex-col justify-center w-full">
                            <ul className="flex flex-col gap-3 text-center">
                                {links.map((link, index) => (
                                    <motion.li
                                        key={link.path}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={`font-serif text-xl md:text-5xl font-light uppercase tracking-[0.15em] transition-all duration-500
                                                ${location.pathname === link.path ? 'text-[#f58631]' : 'text-[#e0e0e0] hover:text-[#d4af37] hover:tracking-[0.25em]'}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Icons at Bottom */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="mb-12 flex gap-8 text-2xl z-10"
                        >
                            <a
                                href="https://www.instagram.com/cinesineproduction/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#f8f4ed] hover:text-[#E4405F] hover:scale-110 transition-all duration-300"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://youtube.com/@cinesineproduction?si=Wp3O16J2v1vNKhsA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#f8f4ed] hover:text-[#FF0000] hover:scale-110 transition-all duration-300"
                            >
                                <FaYoutube />
                            </a>
                            <a
                                href="https://www.facebook.com/share/15hyk3TY1s/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#f8f4ed] hover:text-[#1877F2] hover:scale-110 transition-all duration-300"
                            >
                                <FaFacebook />
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </nav>
    );
};

export default Navbar;
