import React from 'react';
import { 
  Award, 
  Calendar
} from 'lucide-react';
import { certificationsData } from '../data/certifications';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-16 sm:py-24 relative border-t border-slate-800/80 bg-[#090d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Formal Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-calibri">
            Education & Certifications
          </h2>
          <p className="mt-2 text-base text-slate-300">
            Official qualifications from Refactory Academy, ongoing apprenticeship credentials, and academic background.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert) => {
            const isTarget = cert.status.includes('Targeted');

            return (
              <div
                key={cert.id}
                className={`p-6 rounded-2xl bg-[#121827] border transition-all flex flex-col justify-between ${
                  isTarget
                    ? 'border-dashed border-slate-700 bg-[#0e1320] opacity-85'
                    : 'border-slate-800 hover:border-slate-700 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs text-slate-400 font-medium">
                      {cert.issuer}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${
                        cert.status.includes('Verified')
                          ? 'bg-blue-950 text-blue-300 border-blue-800/40'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {cert.status}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-calibri">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {cert.issueDate}
                    </span>
                    {cert.credentialId && (
                      <>
                        <span>•</span>
                        <span>ID: {cert.credentialId}</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                    Key Topics Validated:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cert.skillsLearned.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#0b0f19] text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
