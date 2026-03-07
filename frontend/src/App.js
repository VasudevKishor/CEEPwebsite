import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
// Navbar removed — header is handled directly in pages where needed
import Footer from './components/Footer';
import FixedNav from './components/FixedNav';
import Home from './pages/Home';
import Company from './pages/Company';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
    const location = useLocation();

    // Initialize Lenis smooth scrolling + sync with GSAP ScrollTrigger
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        // Connect Lenis to ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="App">
            <FixedNav />
            <main className={`main-content ${location.pathname === '/' ? 'home-main' : ''}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/case-studies" element={<CaseStudies />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    );
}

export default App;
