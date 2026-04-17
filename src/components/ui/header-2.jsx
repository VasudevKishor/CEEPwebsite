"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';
import { useTheme } from 'contexts/ThemeContext';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Our Company', path: '/company', color: 'var(--color-blue)' },
    { name: 'Our Work', path: '/case-studies', color: 'var(--color-red)' },
    { name: 'Services', path: '/services', color: 'var(--color-green)' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed z-[9999] transition-all duration-500 ease-in-out px-4 md:px-12 left-0 right-0 border-none',
          scrolled 
            ? 'top-0 py-0.5 md:py-1' 
            : 'top-0 py-1.5 md:py-2.5'
        )}
      >
        {/* Dynamic Background with fade effect */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500 -z-10",
          (scrolled || location.pathname !== '/') ? "opacity-100" : "opacity-0"
        )}>
          <div 
            className="absolute inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-2xl"
            style={{ 
              maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)'
            }}
          />
        </div>

        <nav className="flex items-center justify-between w-full mx-auto">
          {/* Logo Section */}
          <Link 
            to="/" 
            className={cn(
              "relative flex items-center gap-3 group transition-all duration-500",
              scrolled ? "scale-90" : "scale-100"
            )}
          >
            <img 
              src={(theme === 'light' && (scrolled || location.pathname !== '/')) ? '/videos/ceep.png' : '/videos/logo.png'} 
              alt="CEEP" 
              className={cn(
                "w-auto object-contain transition-all duration-500",
                scrolled ? "h-12 md:h-14" : "h-20 md:h-24"
              )} 
            />
            <div className="flex flex-col justify-center">
              <span className={cn(
                "font-black tracking-tight uppercase leading-[1.1] transition-all duration-500",
                scrolled ? "text-[0.6rem] md:text-[0.75rem]" : "text-[0.9rem] md:text-[1.1rem]",
                (scrolled || location.pathname !== '/') ? "text-[var(--text-primary)]" : "text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              )}>
                Centre for Energy,<br />Environment and Productivity
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{ '--active-color': link.color }}
                  className={cn(
                    'relative px-4 py-2 text-[0.8rem] lg:text-[0.9rem] font-black tracking-widest transition-all duration-300 rounded-lg uppercase',
                    isActive 
                      ? 'text-[var(--active-color)]' 
                      : (scrolled || location.pathname !== '/')
                        ? 'text-[var(--text-primary)] hover:text-[var(--active-color)]'
                        : 'text-white hover:text-[var(--active-color)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                  )}
                >
                  {link.name}
                  <span className={cn(
                    'absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-300 transform scale-x-0 origin-center',
                    isActive && 'scale-x-100'
                  )} style={{ backgroundColor: link.color }} />
                </Link>
              );
            })}
            
            <div className="ml-2 pl-2 border-l border-[var(--text-primary)]/10">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme} 
                className={cn(
                  "rounded-full transition-all duration-300",
                  (scrolled || location.pathname !== '/')
                    ? "hover:bg-[var(--bg-placeholder)]/30 text-[var(--text-primary)]" 
                    : "text-white hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                )}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme} 
              className={cn(
                "rounded-full transition-all duration-300",
                scrolled 
                  ? "text-[var(--text-primary)]" 
                  : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              )}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className={cn(
                "transition-all duration-300",
                scrolled 
                  ? "text-[var(--text-primary)]" 
                  : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              )}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </nav>
        
      </header>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={cn(
          'fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          'fixed right-0 top-0 bottom-0 z-[10001] w-[85%] max-w-sm bg-[var(--bg-primary)] shadow-2xl md:hidden flex flex-col p-8 transition-transform duration-500 ease-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between mb-12">
          <span className="text-xl font-black tracking-tighter text-[var(--text-primary)]">CEEP</span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X size={24} />
          </Button>
        </div>

        <div className="flex flex-col gap-y-2">
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center justify-between p-4 rounded-xl text-lg font-black transition-all duration-300 transform',
                  isActive 
                    ? 'bg-slate-50 dark:bg-white/5 translate-x-1' 
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 hover:translate-x-1',
                  open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ 
                  transitionDelay: `${i * 50}ms`,
                  color: isActive ? link.color : undefined
                }}
              >
                {link.name}
                <ChevronRight className={cn('size-5 opacity-0 -translate-x-2 transition-all', isActive && 'opacity-100 translate-x-0')} />
              </Link>
            );
          })}
        </div>

        <div className={cn(
          'mt-auto pt-8 border-t border-slate-100 dark:border-white/5 transition-all duration-500 delay-300',
          open ? 'opacity-100' : 'opacity-0'
        )}>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6 font-medium">
            Engineering Sustainability with Precision
          </p>
          <Link to="/company" onClick={() => setOpen(false)}>
            <Button className="w-full relative overflow-hidden group bg-[var(--color-blue)] hover:bg-[var(--color-blue-hover)] text-white rounded-xl py-7 font-black tracking-widest uppercase shadow-xl transition-all duration-300">
              <span className="relative z-10">Meet the Team</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
