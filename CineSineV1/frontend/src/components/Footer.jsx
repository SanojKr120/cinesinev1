import React, { useEffect, useState } from 'react';
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaLink } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../logos/cinesinelogo.png';
import { Link } from 'react-router-dom';
import { fetchSocialLinks } from '../api';

const Footer = () => {
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        const getLinks = async () => {
            try {
                const res = await fetchSocialLinks();
                if (res.data && res.data.length > 0) {
                    setSocialLinks(res.data);
                } else {
                    // Fallback to defaults if no dynamic links exist yet
                    setSocialLinks([
                        { platform: 'Instagram', url: 'https://www.instagram.com/cinesine_?igsh=bWRzaDRtdmpyc2lu' },
                        { platform: 'YouTube', url: 'https://youtube.com/@cinesineproduction?si=Wp3O16J2v1vNKhsA' },
                        { platform: 'Facebook', url: 'https://www.facebook.com/share/15hyk3TY1s/?mibextid=wwXIfr' }
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch social links", error);
                // Fallback on error
                setSocialLinks([
                    { platform: 'Instagram', url: 'https://www.instagram.com/cinesine_?igsh=bWRzaDRtdmpyc2lu' },
                    { platform: 'YouTube', url: 'https://youtube.com/@cinesineproduction?si=Wp3O16J2v1vNKhsA' },
                    { platform: 'Facebook', url: 'https://www.facebook.com/share/15hyk3TY1s/?mibextid=wwXIfr' }
                ]);
            }
        };
        getLinks();
    }, []);

    const getIcon = (platform) => {
        switch (platform?.toLowerCase()) {
            case 'instagram': return <FaInstagram />;
            case 'youtube': return <FaYoutube />;
            case 'facebook': return <FaFacebook />;
            case 'twitter': return <FaTwitter />;
            case 'linkedin': return <FaLinkedin />;
            case 'pinterest': return <FaPinterest />;
            default: return <FaLink />;
        }
    };

    const getColorClass = (platform) => {
        switch (platform?.toLowerCase()) {
            case 'instagram': return "text-[#E4405F] hover:text-[#ff6b8a]";
            case 'youtube': return "text-[#FF0000] hover:text-[#ff4d4d]";
            case 'facebook': return "text-[#1877F2] hover:text-[#4a9fff]";
            case 'twitter': return "text-[#1DA1F2] hover:text-[#4ab3ff]";
            case 'linkedin': return "text-[#0077b5] hover:text-[#3399cc]";
            case 'pinterest': return "text-[#E60023] hover:text-[#ff3350]";
            default: return "text-gray-400 hover:text-white";
        }
    };

    return (
        <footer className="bg-[#1a1a1a] text-[#f8f4ed] py-16 mt-4 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Brand */}
                <div className="text-center md:text-left">
                    <Link to="/" className="inline-block mb-4">
                        <img src={logo} alt="CineSine" className="w-48 mx-auto md:mx-0" />
                    </Link>
                    <p className="font-sans text-gray-400 text-sm leading-relaxed">
                        Capturing the timeless moments of your life with cinematic excellence.
                        Wedding Videography, Photography, and Event storytelling.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="text-center">
                    <h4 className="font-serif text-sm uppercase tracking-[0.2em] mb-6 text-gray-400">Quick Links</h4>
                    <ul className="space-y-3 font-sans text-sm">
                        <li><Link to="/stories" className="hover:text-white transition">Stories</Link></li>
                        <li><Link to="/films" className="hover:text-white transition">Films</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                        <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                    </ul>
                </div>

                {/* Social */}
                <div className="text-center md:text-right">
                    <h4 className="font-serif text-sm uppercase tracking-[0.2em] mb-6 text-gray-400">Follow Us</h4>
                    <div className="flex justify-center md:justify-end gap-6 text-2xl">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.platform}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className={`${getColorClass(link.platform)} transition-colors duration-300`}
                            >
                                {getIcon(link.platform)}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                <p className="text-xs text-gray-500 font-sans tracking-widest">
                    &copy; {new Date().getFullYear()} CINESINE PRODUCTION. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
