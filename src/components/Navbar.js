import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/company', label: 'Company' },
    { to: '/services', label: 'Services' },
    { to: '/case-studies', label: 'Case Studies' }
];

const Navbar = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const toggleOverlay = () => {
        setIsOverlayOpen((prev) => !prev);
    };

    const closeOverlay = () => setIsOverlayOpen(false);

    const handleLinkClick = () => {
        closeOverlay();
        window.scrollTo(0, 0);
    };

    const isActive = (path) => (location.pathname === path ? 'active' : '');

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-left">
                    <Link to="/" onClick={handleLinkClick} className={`navbar-link ${isActive('/')}`}>
                        Home
                    </Link>
                </div>

                <div className="nav-right">
                    <nav className="navbar-menu-desktop">
                        <Link to="/company" onClick={handleLinkClick} className={`navbar-link ${isActive('/company')}`}>
                            Company
                        </Link>
                        <Link to="/case-studies" onClick={handleLinkClick} className={`navbar-link ${isActive('/case-studies')}`}>
                            Case Studies
                        </Link>
                        <Link to="/services" onClick={handleLinkClick} className={`navbar-link ${isActive('/services')}`}>
                            Services
                        </Link>
                    </nav>

                    <button 
                        className="theme-toggle" 
                        onClick={toggleTheme} 
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>

                    <button className="hamburger-card mobile-only" onClick={toggleOverlay} aria-label="Open menu">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </div>

            <div className={`nav-overlay ${isOverlayOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!isOverlayOpen}>
                <div className="overlay-content">
                    <button className="overlay-close" onClick={closeOverlay} aria-label="Close menu">
                        &times;
                    </button>
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.to}
                                onMouseEnter={() => setHoveredLink(link.to)}
                                onMouseLeave={() => setHoveredLink(null)}
                                data-hovered={hoveredLink === link.to ? "true" : "false"}
                                data-has-hover={hoveredLink !== null && hoveredLink !== link.to ? "true" : "false"}
                            >
                                <Link to={link.to} onClick={handleLinkClick} className={isActive(link.to)}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li className="mobile-theme-toggle">
                            <button onClick={toggleTheme} className="theme-toggle-btn-mobile">
                                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
