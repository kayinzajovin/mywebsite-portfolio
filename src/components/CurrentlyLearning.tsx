import React from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { currentlyLearning } from '../data/skills';

export const CurrentlyLearning: React.FC = () => {
  return (
    <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#121827] border border-slate-800 shadow-md">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Continuous Apprenticeship Growth</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-calibri">
            Currently Expanding Technical Skills
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Beyond Python and PostgreSQL, I am systematically learning complementary languages and modern technologies to build end-to-end software solutions.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs text-slate-400">
          <Compass className="w-4 h-4 text-blue-400" />
          <span>Active Apprenticeship Roadmap</span>
        </div>
      </div>

      {/* Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentlyLearning.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-[#0e1422] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-white">
                  {item.language}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {item.status}
                </span>
              </div>

              <p className="text-xs font-medium text-slate-300 mb-2">
                {item.focus}
              </p>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {item.details}
              </p>
            </div>

            <div>
              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Learning Progress</span>
                  <span className="text-blue-400 font-semibold">{item.progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#121827] text-slate-300 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
