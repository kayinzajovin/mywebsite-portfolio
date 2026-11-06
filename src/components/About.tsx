import React from 'react';
import { 
  Code2, 
  Database, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  Users2,
  Workflow
} from 'lucide-react';
import { profileData } from '../data/profile';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-blue-400" />,
  Database: <Database className="w-5 h-5 text-blue-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-blue-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-blue-400" />,
};

export const About: React.FC = () => {
  const { aboutStory } = profileData;

  return (
    <section id="about" className="py-16 sm:py-24 relative border-t border-slate-800/80 bg-[#090d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
            <Users2 className="w-3.5 h-3.5" />
            <span>Background & Engineering Approach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-calibri">
            About Jovin Kayinza
          </h2>
          <p className="mt-2 text-base text-slate-300">
            {aboutStory.greeting}
          </p>
        </div>

        {/* Narrative & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {aboutStory.paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="p-5 rounded-2xl bg-[#121827] border border-slate-800 text-slate-300 leading-relaxed"
              >
                {para}
              </p>
            ))}

            {/* Mindset Callout */}
            <div className="p-5 rounded-2xl bg-[#101726] border-l-4 border-l-blue-500 border border-slate-800 flex items-start gap-3.5 mt-6">
              <Workflow className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-sm sm:text-base">
                  My Engineering Principle
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  "Software isn't just about syntax; it's about building trustworthy systems that protect business records, eliminate repetitive manual delays, and scale with verifiable integrity."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Core Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {aboutStory.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#121827] border border-slate-800 hover:border-slate-700 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-[#0b0f19] border border-slate-800">
                    {iconMap[val.icon] || <CheckCircle2 className="w-5 h-5 text-blue-400" />}
                  </div>
                  <h3 className="font-bold text-white text-base">
                    {val.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
