import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Command
} from 'lucide-react';
import { profileData } from '../data/profile';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Featured Work', href: '#projects', id: 'projects' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-800 shadow-md py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-sm tracking-wider font-mono shadow-sm">
              JK
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                {profileData.name}
              </span>
              <span className="text-[11px] text-slate-400 tracking-tight -mt-0.5 hidden sm:block">
                Software Engineering Apprentice
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#121827] px-2 py-1.5 rounded-full border border-slate-800 shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    isActive
                      ? 'text-white bg-blue-600 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick jump command palette */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-[#121827] hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
              title="Search and Quick Jump"
            >
              <Command className="w-3.5 h-3.5 text-blue-400" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-[#0b0f19] border border-slate-700 rounded text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white bg-[#121827] border border-slate-800 rounded-xl transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-blue-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 p-4 bg-[#121827] border border-slate-800 rounded-2xl shadow-xl">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#0b0f19] text-slate-300 text-xs rounded-xl border border-slate-800"
            >
              <Command className="w-4 h-4 text-blue-400" />
              <span>Search / Quick Jump (Cmd+K)</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
