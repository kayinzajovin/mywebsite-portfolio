import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  Award,
  Code2
} from 'lucide-react';
import { experienceData } from '../data/experience';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-24 relative border-t border-slate-800/80 bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Learning Journey & Apprenticeship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-calibri">
            Experience & Training Timeline
          </h2>
          <p className="mt-2 text-base text-slate-300">
            A chronological timeline of hands-on software development training, Refactory Academy certification, and real-world backend engineering.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-700 space-y-10 max-w-4xl">
          {experienceData.map((item) => (
            <div key={item.id} className="relative">
              {/* Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0b0f19] border-2 border-blue-500 flex items-center justify-center text-blue-400 shadow-sm">
                {item.type === 'Apprenticeship' ? (
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                ) : item.type === 'Intensive Training' ? (
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                ) : item.type === 'Hackathon' ? (
                  <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                ) : (
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 rounded-2xl bg-[#121827] border border-slate-800 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/40 font-semibold">
                    {item.period}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      {item.location && (
                        <>
                          <MapPin className="w-3.5 h-3.5 text-blue-400" />
                          {item.location}
                        </>
                      )}
                    </span>
                    {item.location && <span>•</span>}
                    <span className="text-slate-300 font-medium">{item.type}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-calibri">
                  {item.role}
                </h3>
                <h4 className="text-sm sm:text-base font-semibold text-slate-300 mb-3">
                  {item.organization}
                </h4>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Achievements List */}
                {item.achievements.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      Key Outcomes & Responsibilities:
                    </span>
                    <ul className="space-y-1.5">
                      {item.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Pills */}
                {item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                    {item.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-xs rounded bg-[#0b0f19] text-slate-300 border border-slate-800 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
