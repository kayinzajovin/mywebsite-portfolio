import React from 'react';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail
} from 'lucide-react';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-[#080c16] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs font-mono">
              JK
            </div>
            <div>
              <div className="font-bold text-white text-sm font-calibri">
                {profileData.name}
              </div>
              <div className="text-[11px] text-slate-400">
                Software Engineering Apprentice • Python Backend
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#121827] border border-slate-800 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#121827] border border-slate-800 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="p-2 rounded-lg bg-[#121827] border border-slate-800 hover:text-blue-400 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121827] hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors text-xs"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-center sm:text-left text-xs">
          <div>
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </div>
          <div>
            <span>Kampala, Uganda • Typography: Calibri</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
