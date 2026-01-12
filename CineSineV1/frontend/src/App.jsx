import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingActionButtons from './components/FloatingActionButtons';
import Loader from './components/Loader';

// Lazy Load Pages for Performance Code Splitting
const Home = lazy(() => import('./pages/Home'));
const Stories = lazy(() => import('./pages/Stories'));
const StoryDetail = lazy(() => import('./pages/StoryDetail'));
const Photobooks = lazy(() => import('./pages/Photobooks'));
const Images = lazy(() => import('./pages/Images'));
const Films = lazy(() => import('./pages/Films'));
const PreWeddings = lazy(() => import('./pages/PreWeddings'));
const PreWeddingDetail = lazy(() => import('./pages/PreWeddingDetail'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Profile = lazy(() => import('./pages/Profile'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

import { Toaster } from 'react-hot-toast';

// Animated Routes wrapper
function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader /></div>}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/stories" element={<Stories />} />
                    <Route path="/stories/:id" element={<StoryDetail />} />
                    <Route path="/photobooks" element={<Photobooks />} />
                    <Route path="/images" element={<Images />} />
                    <Route path="/films" element={<Films />} />
                    <Route path="/pre-weddings" element={<PreWeddings />} />
                    <Route path="/pre-wedding/:id" element={<PreWeddingDetail />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
}

// Layout wrapper to handle conditional rendering of Navbar/Footer
function MainLayout() {
    const location = useLocation();
    const isDashboard = location.pathname.toLowerCase().startsWith('/dashboard');

    return (
        <div className="bg-[#f8f4ed] min-h-screen font-serif text-gray-800 flex flex-col">
            <Toaster
                position="top-center"
                toastOptions={{
                    className: '',
                    style: {
                        background: '#1a1a1a',
                        color: '#f8f4ed',
                        fontFamily: '"Lato", sans-serif',
                        letterSpacing: '0.1em',
                        borderRadius: '0px',
                        padding: '16px 24px',
                    },
                }}
            />
            {!isDashboard && <Navbar />}
            <main className="flex-grow">
                <AnimatedRoutes />
            </main>
            {!isDashboard && <Footer />}
            {!isDashboard && <FloatingActionButtons />}
        </div>
    );
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <MainLayout />
        </Router>
    )
}

export default App
