import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../logos/cinesineNavLogo_4.png';


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const isHome = location.pathname === '/';

    // Logic: 
    // - If Home and NOT scrolled: Text is White (over video).
    // - If Home and Scrolled: Text is Black (over cream bg).
    // - If Not Home: Text is Black (always cream/white bg).
    // - If Mobile Menu is Open: Text is Black (on cream overlay).
    const textColorClass = (isHome && !isScrolled && !isMobileMenuOpen) ? 'text-white' : 'text-[#333]';
    const hamburgerColorClass = (isHome && !isScrolled && !isMobileMenuOpen) ? 'bg-white' : 'bg-[#333]';

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
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled || !isHome ? 'bg-[#f8f4ed] py-4 shadow-sm' : 'bg-transparent py-6 md:py-8'} px-6 md:px-16 flex justify-between items-center`}>

            {/* Logo */}
            
            <div className={`relative z-50 text-2xl md:text-3xl font-bold tracking-[0.2em] font-serif ${textColorClass} transition-colors duration-300`}>
                <Link to="/"><img src={logo} alt="Logo" className="w-[180px]" /></Link>
            </div>

            {/* Desktop Menu */}
            <ul className={`hidden lg:flex flex-wrap justify-center gap-8 font-serif text-xs tracking-[0.2em] uppercase font-semibold ${textColorClass}`}>
                {links.map(link => (
                    <li key={link.path}><Link to={link.path} className="hover:opacity-70 transition">{link.label}</Link></li>
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 bg-[#f8f4ed] z-40 flex flex-col items-center justify-center"
                    >
                        <ul className="flex flex-col gap-4 text-center">
                            {links.map((link, index) => (
                                <motion.li
                                    key={link.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                >
                                    <Link
                                        to={link.path}
                                        className="font-serif text-lg text-[#333] uppercase tracking-[0.2em] hover:text-[#d4af37] transition"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

        </nav>
    );
};

export default Navbar;
