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
    <section id="home" className="relative pt-6 pb-16 sm:pt-10 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Grid — image anchored top-right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-start">

          {/* Left Column: Headlines & Bio */}
          <div className="lg:col-span-7 space-y-5 text-center sm:text-left order-2 lg:order-1">

            {/* Availability Badge */}
            <div className="flex items-center justify-center sm:justify-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-medium">{profileData.status}</span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {profileData.location}
                </span>
              </div>
            </div>

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

            {/* Action Buttons — moved up, before the badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-blue-700/30 transition-all"
              >
                <span>View Featured Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 hover:bg-slate-800/60 transition-all"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Get in Touch</span>
              </a>

              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 hover:bg-slate-800/60 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>

              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-blue-400 border border-slate-700 hover:border-blue-800 hover:bg-blue-950/40 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>

            {/* Quick Strengths Badges */}
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

          </div>

          {/* Right Column — portrait pinned to top, highlights card below */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-5 order-1 lg:order-2 lg:pt-0">

            {/* Framed Portrait — top-right anchor */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-[#121827] border-2 border-slate-700 p-1.5 shadow-xl ring-1 ring-blue-900/30">
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

            {/* Executive Highlights Card */}
            <div className="w-full max-w-sm p-5 rounded-2xl bg-[#121827] border border-slate-800 space-y-3 shadow-md text-left">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Developer Snapshot
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/40 font-medium">
                  Active Apprentice
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-[13px] text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Core Skills:</strong> Python, Django, PostgreSQL & REST APIs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Key Project:</strong> Uganda Exim backend workflows</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Education:</strong> Refactory Academy SE Certificate</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Expanding:</strong> Ruby, TypeScript & Modern Web Dev</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
