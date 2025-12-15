import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/our-team', label: 'Our Team' },
    { to: '/services', label: 'Services' },
    { to: '/clients', label: 'Clients' },
    { to: '/case-studies', label: 'Case Studies' },
    { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const location = useLocation();

    const toggleOverlay = () => {
        setIsOverlayOpen((prev) => !prev);
    };

    const closeOverlay = () => setIsOverlayOpen(false);

    const handleLinkClick = () => {
        closeOverlay();
        // Scroll to top when navigating
        window.scrollTo(0, 0);
    };

    const isActive = (path) => (location.pathname === path ? 'active' : '');

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Small circular hamburger card (no logo or visible navbar strip) */}
                <button className="hamburger-card" onClick={toggleOverlay} aria-label="Open menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>

            {/* overlay menu remains accessible via the hamburger */}
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
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


