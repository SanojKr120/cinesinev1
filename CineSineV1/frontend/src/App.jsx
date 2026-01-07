import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import Photobooks from './pages/Photobooks';
import Images from './pages/Images';
import Films from './pages/Films';
import PreWeddings from './pages/PreWeddings';
import PreWeddingDetail from './pages/PreWeddingDetail';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

import { Toaster } from 'react-hot-toast';

// Animated Routes wrapper
function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
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
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <ScrollToTop />
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
                <Navbar />
                <main className="flex-grow">
                    <AnimatedRoutes />
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
