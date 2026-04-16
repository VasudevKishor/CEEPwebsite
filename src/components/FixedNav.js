import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './FixedNav.css';

const menuLinks = [
  { to: '/', label: 'Home' },
  { to: '/company', label: 'Company' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/services', label: 'Services' }
];

const FixedNav = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className="fixed-nav-controls">
      <div className="fixed-nav-inner">
        <Link to="/" className="persistent-logo" aria-label="CEEP Home">
          <img src="/videos/logo.png" alt="CEEP Logo" />
        </Link>

        <nav className="fixed-nav-menu" aria-label="Primary">
          {menuLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`fixed-nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-buttons-right">
          <button
            className="fixed-nav-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixedNav;

