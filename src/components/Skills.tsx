import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  CheckCircle2, 
  Wrench, 
  Layers, 
  Code2, 
  Check
} from 'lucide-react';
import { skillCategories } from '../data/skills';
import { CurrentlyLearning } from './CurrentlyLearning';

const iconLookup: Record<string, React.ReactNode> = {
  Server: <Server className="w-5 h-5 text-blue-400" />,
  Database: <Database className="w-5 h-5 text-blue-400" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-blue-400" />,
  Wrench: <Wrench className="w-5 h-5 text-blue-400" />,
  Layers: <Layers className="w-5 h-5 text-blue-400" />,
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories = selectedCategory === 'all'
    ? skillCategories
    : skillCategories.filter((cat) => cat.id === selectedCategory);

  return (
    <section id="skills" className="py-16 sm:py-24 relative border-t border-slate-800/80 bg-[#090d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>Core Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-calibri">
              Technical Skills & Tooling
            </h2>
            <p className="mt-2 text-base text-slate-300 max-w-2xl">
              Specialized in Python backend services, relational database engineering with PostgreSQL, and building reliable digital workflows.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-1.5 bg-[#121827] p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Skills
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl bg-[#121827] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-[#0b0f19] border border-slate-800">
                    {iconLookup[cat.icon] || <Code2 className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-2 mt-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg bg-[#0e1422] border border-slate-800/80"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-semibold text-slate-200">
                          {skill.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700">
                          {skill.level}
                        </span>
                      </div>
                      {skill.description && (
                        <p className="text-xs text-slate-400 leading-snug">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{cat.skills.length} competencies</span>
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  Verified in Projects
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning Roadmap Strip */}
        <CurrentlyLearning />
      </div>
    </section>
  );
};
