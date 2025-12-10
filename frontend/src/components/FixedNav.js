import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import './FixedNav.css';

const menuLinks = [
  { to: '/', label: 'Home' },
  { to: '/our-team', label: 'Our Team' },
  { to: '/clients', label: 'Clients' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' }
];

const FixedNav = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    // Add/remove class to body for blur effect
    if (newState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  const handleMenuLinkClick = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <>
      {/* Fixed Control Buttons - Top Right */}
      <div className="fixed-nav-controls">
        <button 
          className="fixed-nav-btn theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        <button 
          className={`fixed-nav-btn menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Overlay */}
      <div 
        className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
      >
        <div 
          className="menu-overlay-content"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="menu-nav">
            <ul>
              {menuLinks.map((link) => (
                <li key={link.to}>
                  <button
                    onClick={() => handleMenuLinkClick(link.to)}
                    className={location.pathname === link.to ? 'active' : ''}
                  >
                    {link.label.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default FixedNav;

