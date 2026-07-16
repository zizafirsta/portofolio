/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  linkedinUrl: string;
}

export default function Header({ linkedinUrl }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'education', 'projects', 'experience'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' }
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-header py-4 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Monogram */}
          <button
            id="logo-button"
            onClick={() => scrollToSection('home')}
            className="group flex items-center gap-2 cursor-pointer"
          >
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tighter text-white group-hover:text-[#800020] transition-colors duration-500">
              ZF.
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative font-sans text-xs font-medium tracking-widest uppercase cursor-pointer py-2 transition-colors duration-300 ${
                    activeSection === item.id ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#800020]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* LinkedIn Action Button */}
            <a
              id="header-contact-btn"
              href={linkedinUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-[#800020]/70 text-white font-sans text-[10px] font-semibold uppercase tracking-[0.2em] px-6 py-2.5 rounded-none overflow-hidden relative group transition-all duration-500 hover:border-[#800020]"
            >
              <span className="absolute inset-0 bg-[#800020] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10 flex items-center gap-2 group-hover:tracking-[0.25em] transition-all duration-300">
                Contact <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white cursor-pointer transition-colors p-1"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-40 flex flex-col justify-center px-12"
          >
            <div className="flex flex-col gap-6 text-left">
              {navItems.map((item, index) => (
                <motion.button
                  id={`mobile-nav-link-${item.id}`}
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-serif text-3xl font-medium tracking-wide text-left cursor-pointer transition-colors duration-300 ${
                    activeSection === item.id ? 'text-[#800020]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navItems.length * 0.08, duration: 0.5 }}
                className="mt-8 pt-8 border-t border-white/5"
              >
                <a
                  id="mobile-drawer-contact-btn"
                  href={linkedinUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center border border-[#800020] text-white font-sans text-xs uppercase tracking-[0.2em] py-4 hover:bg-[#800020] transition-colors duration-300"
                >
                  Let's Connect
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
