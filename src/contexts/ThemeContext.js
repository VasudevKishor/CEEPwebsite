import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

const getStoredMotionPreference = () => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('motion');
    if (stored) return stored === 'enabled';
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
        const initialTheme = savedTheme || 'dark';
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', initialTheme);
        }
        return initialTheme;
    });

    const [motionEnabled, setMotionEnabled] = useState(getStoredMotionPreference);

    useEffect(() => {
        // Save theme to localStorage whenever it changes
        localStorage.setItem('theme', theme);
        // Apply theme data attribute
        document.documentElement.setAttribute('data-theme', theme);
        // Sync with Tailwind CSS class-based dark mode
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        localStorage.setItem('motion', motionEnabled ? 'enabled' : 'disabled');
        document.documentElement.setAttribute('data-motion', motionEnabled ? 'enabled' : 'disabled');
    }, [motionEnabled]);

    const toggleMotion = () => {
        setMotionEnabled(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, motionEnabled, toggleMotion }}>
            {children}
        </ThemeContext.Provider>
    );
};

