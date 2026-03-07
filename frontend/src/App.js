import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
// Navbar removed — header is handled directly in pages where needed
import Footer from './components/Footer';
import FixedNav from './components/FixedNav';
import Home from './pages/Home';
import Company from './pages/Company';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import './App.css';

function AppContent() {
    const location = useLocation();
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


