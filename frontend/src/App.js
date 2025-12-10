import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
// Navbar removed — header is handled directly in pages where needed
import Footer from './components/Footer';
import FixedNav from './components/FixedNav';
import Home from './pages/Home';
import OurTeam from './pages/OurTeam';
import Services from './pages/Services';
import Clients from './pages/Clients';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact';
import './App.css';

function AppContent() {
    const location = useLocation();
    return (
        <div className="App">
            <FixedNav />
            <main className={`main-content ${location.pathname === '/' ? 'home-main' : ''}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/our-team" element={<OurTeam />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/case-studies" element={<CaseStudies />} />
                    <Route path="/contact" element={<Contact />} />
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


