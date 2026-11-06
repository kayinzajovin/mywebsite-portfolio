import React, { useEffect, useState, useRef } from 'react';
import { 
  Search, 
  Github, 
  Linkedin, 
  Mail, 
  Layers, 
  Code2, 
  Briefcase, 
  Award, 
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  X,
} from 'lucide-react';
import { profileData } from '../data/profile';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Actions' | 'Socials';
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-home',
      title: 'Home / Hero',
      subtitle: 'Overview, introduction, and quick links',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-blue-400" />,
      action: () => scrollToSection('home'),
    },
    {
      id: 'nav-about',
      title: 'About Jovin Kayinza',
      subtitle: 'Background, values, and engineering approach',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-blue-400" />,
      action: () => scrollToSection('about'),
    },
    {
      id: 'nav-projects',
      title: 'Featured Projects',
      subtitle: 'Uganda Exim platform and Nyondo inventory system',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-blue-400" />,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'nav-skills',
      title: 'Skills & Tooling',
      subtitle: 'Python, PostgreSQL, and ongoing learning roadmap',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-blue-400" />,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'nav-experience',
      title: 'Experience Timeline',
      subtitle: 'Refactory Academy training and software apprenticeship',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-blue-400" />,
      action: () => scrollToSection('experience'),
    },
    {
      id: 'nav-certifications',
      title: 'Certifications & Education',
      subtitle: 'Software engineering credentials and academic history',
      category: 'Navigation',
      icon: <Award className="w-4 h-4 text-blue-400" />,
      action: () => scrollToSection('certifications'),
    },
    {
      id: 'nav-contact',
      title: 'Contact Form',
      subtitle: 'Send a direct message or inquiry',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-blue-400" />,
      action: () => scrollToSection('contact'),
    },
    {
      id: 'act-copy-email',
      title: copiedEmail ? 'Email Copied!' : 'Copy Email Address',
      subtitle: profileData.email,
      category: 'Actions',
      icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />,
      action: copyEmail,
    },
    {
      id: 'soc-github',
      title: 'Open GitHub Profile',
      subtitle: profileData.socials.github,
      category: 'Socials',
      icon: <Github className="w-4 h-4 text-slate-300" />,
      action: () => {
        onClose();
        window.open(profileData.socials.github, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'soc-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: profileData.socials.linkedin,
      category: 'Socials',
      icon: <Linkedin className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        window.open(profileData.socials.linkedin, '_blank', 'noopener,noreferrer');
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-xl bg-[#121827] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#0e1422]">
          <Search className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a section or action..."
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-400 focus:outline-none text-sm font-calibri"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs bg-slate-800 text-slate-300 border border-slate-700 rounded font-mono">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No results found for "{query}"
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-600/20 text-white border border-blue-500/40'
                      : 'text-slate-300 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-[#0b0f19] border border-slate-800 flex-shrink-0">
                      {cmd.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">
                        {cmd.title}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {cmd.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    {cmd.category === 'Socials' && (
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    {isSelected && (
                      <kbd className="hidden sm:inline-block text-[11px] font-mono text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                        Enter
                      </kbd>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#0e1422] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Use ↑ ↓ to navigate, Enter to select</span>
          <span>Jovin Kayinza</span>
        </div>
      </div>
    </div>
  );
};
