import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';

import { sendContactForm } from '../api';

const Contact = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            weddingDates: '',
            eventDetails: '',
            venue: '',
            contactNumber: '',
            email: '',
            referral: []
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            weddingDates: Yup.string().required('Dates are required'),
            eventDetails: Yup.string().required('Event details are required'),
            venue: Yup.string().required('Venue is required'),
            contactNumber: Yup.string()
                .matches(/^[0-9+ ]*$/, 'Invalid phone number format')
                .min(10, 'Phone number must be at least 10 digits')
                .required('Contact number is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const promise = sendContactForm(values);

            toast.promise(promise, {
                loading: 'Sending details to our team...',
                success: 'Message sent successfully!',
                error: (err) => `Failed to send: ${err.response?.data?.message || 'Something went wrong.'}`,
            });

            try {
                await promise;
                resetForm();
                setShowSuccessModal(true);
            } catch (error) {
                console.error(error);
            }
        },
    });

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        let newReferral = [...formik.values.referral];
        if (checked) {
            newReferral.push(value);
        } else {
            newReferral = newReferral.filter(item => item !== value);
        }
        formik.setFieldValue('referral', newReferral);
    };

    const inputVariants = {
        focus: { borderColor: "#333", transition: { duration: 0.2 } },
        blur: { borderColor: "#d1d5db", transition: { duration: 0.2 } }
    };

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
                className="max-w-4xl mx-auto mb-16 text-center"
            >
                <h1 className="text-4xl font-serif tracking-[0.2em] mb-4 text-[#333]">CONTACT</h1>
                <div className="w-16 h-[1px] bg-gray-400 mx-auto"></div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-3xl mx-auto"
            >
                <form onSubmit={formik.handleSubmit} className="space-y-8">

                    {/* Name */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-2"
                    >
                        <label htmlFor="name" className="block font-serif text-xs md:text-sm tracking-[0.2em] text-gray-800 uppercase">
                            Your Name (required)
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...formik.getFieldProps('name')}
                            className="w-full bg-transparent border-b border-gray-400 px-0 py-3 focus:border-black outline-none transition-all duration-300 rounded-none placeholder-gray-400 font-serif"
                            placeholder="Type here..."
                        />
                        {formik.touched.name && formik.errors.name && <div className="text-red-800 text-xs mt-1 font-serif">{formik.errors.name}</div>}
                    </motion.div>

                    {/* Wedding Dates */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="space-y-2"
                    >
                        <label htmlFor="weddingDates" className="block font-serif text-xs md:text-sm tracking-[0.2em] text-gray-800 uppercase">
                            Your Wedding Dates (required)
                        </label>
                        <input
                            id="weddingDates"
                            type="text"
                            placeholder="e.g. 24th - 26th Dec 2025"
                            {...formik.getFieldProps('weddingDates')}
                            className="w-full bg-transparent border-b border-gray-400 px-0 py-3 focus:border-black outline-none transition-all duration-300 rounded-none placeholder-gray-400 font-serif"
                        />
                        {formik.touched.weddingDates && formik.errors.weddingDates && <div className="text-red-800 text-xs mt-1 font-serif">{formik.errors.weddingDates}</div>}
                    </motion.div>

                    {/* Event Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                    >
                        <label htmlFor="eventDetails" className="block font-serif text-xs md:text-sm tracking-[0.2em] text-gray-800 uppercase">
                            Event Details (required)
                        </label>
                        <p className="text-[10px] md:text-xs text-gray-500 font-serif italic mb-2">What are the tentative events / functions / timings per day</p>
                        <textarea
                            id="eventDetails"
                            rows="4"
                            {...formik.getFieldProps('eventDetails')}
                            className="w-full bg-transparent border-b border-gray-400 px-0 py-3 focus:border-black outline-none transition-all duration-300 resize-none rounded-none placeholder-gray-400 font-serif"
                            placeholder="Type here..."
                        ></textarea>
                        {formik.touched.eventDetails && formik.errors.eventDetails && <div className="text-red-800 text-xs mt-1 font-serif">{formik.errors.eventDetails}</div>}
                    </motion.div>

                    {/* Venue */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="space-y-2"
                    >
                        <label htmlFor="venue" className="block font-serif text-xs md:text-sm tracking-[0.2em] text-gray-800 uppercase">
                            Venue (required)
                        </label>
                        <p className="text-[10px] md:text-xs text-gray-500 font-serif italic mb-2">Please mention the hotel, city & the country</p>
                        <input
                            id="venue"
                            type="text"
                            {...formik.getFieldProps('venue')}
                            className="w-full bg-transparent border-b border-gray-400 px-0 py-3 focus:border-black outline-none transition-all duration-300 rounded-none placeholder-gray-400 font-serif"
                            placeholder="Type here..."
                        />
                        {formik.touched.venue && formik.errors.venue && <div className="text-red-800 text-xs mt-1 font-serif">{formik.errors.venue}</div>}
                    </motion.div>

                    {/* Contact Number */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                    >
                        <label htmlFor="contactNumber" className="block font-serif text-xs md:text-sm tracking-[0.2em] text-gray-800 uppercase">
                            Contact Number (required)
                        </label>
                        <input
                            id="contactNumber"
                            type="text"
                            {...formik.getFieldProps('contactNumber')}
                            className="w-full bg-transparent border-b border-gray-400 px-0 py-3 focus:border-black outline-none transition-all duration-300 rounded-none placeholder-gray-400 font-serif"
                            placeholder="+91 XXXXX XXXXX"
                        />
                        {formik.touched.contactNumber && formik.errors.contactNumber && <div className="text-red-800 text-xs mt-1 font-serif">{formik.errors.contactNumber}</div>}
                    </motion.div>

                    {/* Email */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                        className="space-y-2"
                    >
                        <label htmlFor="email" className="block font-serif text-xs md:text-sm tracking-[0.2em] text-gray-800 uppercase">
                            Your Email (required)
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...formik.getFieldProps('email')}
                            className="w-full bg-transparent border-b border-gray-400 px-0 py-3 focus:border-black outline-none transition-all duration-300 rounded-none placeholder-gray-400 font-serif"
                            placeholder="you@example.com"
                        />
                        {formik.touched.email && formik.errors.email && <div className="text-red-800 text-xs mt-1 font-serif">{formik.errors.email}</div>}
                    </motion.div>

                    {/* Referral */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4 pt-4"
                    >
                        <label className="block font-serif text-sm tracking-[0.1em] text-gray-600 uppercase">
                            How did you hear about us?
                        </label>
                        <div className="space-y-2 font-serif text-gray-700">
                            {['Instagram', 'Friends Wedding', 'Magazine', 'Facebook', 'Google', 'Other'].map((item) => (
                                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="referral"
                                        value={item}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 accent-black"
                                    />
                                    <span className="group-hover:text-black transition">{item}</span>
                                </label>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="pt-8 text-center"
                    >
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02, backgroundColor: "#000" }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-[#333] text-white px-12 py-4 font-serif uppercase tracking-[0.2em] transition-all text-sm"
                        >
                            Submit Message
                        </motion.button>
                    </motion.div>

                </form>
            </motion.div>

            {/* Direct Details Footer */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto mt-20 mb-10 border-t border-gray-300 pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <FaMapMarkerAlt className="mx-auto text-gray-400 mb-4" />
                    <p className="font-serif text-sm text-gray-600">Mumbai, India</p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <FaPhone className="mx-auto text-gray-400 mb-4" />
                    <p className="font-serif text-sm text-gray-600">+91 98765 43210</p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <FaEnvelope className="mx-auto text-gray-400 mb-4" />
                    <p className="font-serif text-sm text-gray-600">hello@cinesine.com</p>
                </motion.div>
            </motion.div>
            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-[#f8f4ed] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl relative border border-[#d4af37]/30"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#d4af37]"></div>
                            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#d4af37]"></div>
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#d4af37]"></div>
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#d4af37]"></div>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>

                            <h2 className="text-2xl md:text-3xl font-serif text-[#333] tracking-widest uppercase mb-4">
                                Thank You
                            </h2>
                            <div className="w-12 h-[1px] bg-gray-300 mx-auto mb-6"></div>

                            <p className="text-gray-600 font-serif text-lg mb-8 leading-relaxed">
                                We have received your inquiry. <br />
                                <span className="text-[#d4af37] font-semibold">Our team will contact you soon</span> to discuss your beautiful journey.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowSuccessModal(false)}
                                className="bg-[#1a1a1a] text-white px-8 py-3 font-serif uppercase tracking-[0.2em] text-xs hover:bg-[#333] transition-colors"
                            >
                                Close
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Contact;
