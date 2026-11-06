import React, { useState } from 'react';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ShieldCheck,
  CheckCircle2,
  Server,
  Database,
  Code2,
  Briefcase
} from 'lucide-react';
import { profileData } from '../data/profile';

export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Availability Badge */}
        <div className="flex items-center justify-center sm:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium">{profileData.status}</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              {profileData.location}
            </span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Human-friendly Bio */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
            <div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
                Software Engineering Apprentice
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-calibri leading-tight">
                Jovin Kayinza
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-medium text-slate-200 max-w-2xl leading-snug">
                Python Backend Developer & Database Specialist
              </p>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Hello! I'm a software engineering apprentice passionate about backend development, database design, and building reliable systems that solve real-world problems. I build secure digital backbones for businesses—ensuring client data is protected, approvals run smoothly, and services scale efficiently.
            </p>

            {/* Quick Strengths Badges (In plain, non-coder English) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-[#121827] border border-slate-800 text-left">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold mb-1">
                  <Server className="w-4 h-4" />
                  <span>Backend Systems</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  Python, Django & secure web service logic
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#121827] border border-slate-800 text-left">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold mb-1">
                  <Database className="w-4 h-4" />
                  <span>Reliable Databases</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  PostgreSQL design, queries & zero-loss data safety
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#121827] border border-slate-800 text-left">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span>Practical Experience</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  Uganda Exim client & loan operations platform
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
              >
                <span>View Featured Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-transparent hover:bg-slate-800/60 transition-all"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Social channels */}
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-slate-400 text-sm">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Connect:</span>
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[#121827] hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[#121827] hover:bg-slate-800 hover:text-blue-400 transition-colors border border-slate-800"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="p-2 rounded-xl bg-[#121827] hover:bg-slate-800 hover:text-blue-400 transition-colors border border-slate-800"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Professional Portrait & Highlights Summary */}
          <div className="lg:col-span-5 flex flex-col items-center gap-5">
            {/* Framed Portrait */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-[#121827] border-2 border-slate-700 p-1.5 shadow-xl">
              {!imgError ? (
                <img
                  src={profileData.photoUrl}
                  alt={profileData.photoAlt}
                  onError={() => setImgError(true)}
                  loading="eager"
                  className="w-full h-full object-cover object-top rounded-xl filter contrast-[1.01]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 rounded-xl text-blue-400">
                  <span className="text-5xl font-black">{profileData.initials}</span>
                  <span className="text-xs text-slate-400 mt-2 font-medium">{profileData.name}</span>
                </div>
              )}

              {/* Verified Badge */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#0b0f19]/90 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Refactory Certified</span>
              </div>
            </div>

            {/* Executive Highlights Card (Clean, Human-Friendly, No Raw Code) */}
            <div className="w-full max-w-md p-5 rounded-2xl bg-[#121827] border border-slate-800 space-y-3 shadow-md text-left">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Developer Profile Snapshot
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/40 font-medium">
                  Active Apprentice
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-[13px] text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Core Skills:</strong> Python, Django, PostgreSQL & REST API Development</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Key Project:</strong> Built backend workflows for Uganda Exim Limited</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Education:</strong> Certificate in Software Engineering from Refactory Academy</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Expanding Focus:</strong> Learning Ruby, TypeScript & Modern Web Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
