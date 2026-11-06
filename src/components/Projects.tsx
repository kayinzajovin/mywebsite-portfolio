import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  CheckCircle2, 
  ArrowUpRight
} from 'lucide-react';
import { projectsData } from '../data/projects';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-16 sm:py-24 relative border-t border-slate-800/80 bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Real-World Backend Platforms</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-calibri">
              Featured Projects
            </h2>
            <p className="mt-2 text-base text-slate-300 max-w-2xl">
              Production backend services, inventory ledgers, and operational tools designed for real business requirements.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-1.5 bg-[#121827] p-1.5 rounded-xl border border-slate-800">
            {['all', 'Enterprise Backend', 'Web System', 'Upcoming Architecture', 'Hackathon Project'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === cat
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Systems' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`p-6 sm:p-8 rounded-2xl bg-[#121827] border transition-all flex flex-col justify-between ${
                project.isPlaceholder
                  ? 'border-dashed border-slate-700/80 bg-[#0e1320] opacity-90'
                  : 'border-slate-800 hover:border-slate-700 hover:shadow-lg'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.statusBadge && (
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${
                        project.isPlaceholder
                          ? 'bg-slate-800 text-slate-400 border-slate-700'
                          : 'bg-blue-950 text-blue-300 border-blue-800/50'
                      }`}
                    >
                      {project.statusBadge}
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold text-white font-calibri">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-slate-300 mt-1 mb-3">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                {project.badges && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.badges.map((badge) => (
                      <span key={badge} className="px-2.5 py-1 text-xs rounded-full bg-blue-950/50 text-blue-200 border border-blue-800/40">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {project.myRole && (
                  <p className="text-sm font-semibold text-slate-200 mb-5">
                    My Role: <span className="text-blue-300">{project.myRole}</span>
                  </p>
                )}

                {/* Key Metrics */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0b0f19] border border-slate-800 mb-5 text-center">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-[11px] text-slate-400 font-medium">{m.label}</div>
                        <div className="text-xs font-bold text-slate-200 mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Features Bullet List */}
                {project.keyFeatures.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Core Capabilities Delivered:
                    </h4>
                    <ul className="space-y-2">
                      {project.keyFeatures.map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs sm:text-[13px] text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                {/* Tech Tags */}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800 mb-5">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-xs rounded-md bg-[#0b0f19] text-slate-300 border border-slate-800 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      <FolderGit2 className="w-4 h-4" />
                      <span>View GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-400 bg-[#0b0f19] border border-slate-800 cursor-not-allowed"
                    >
                      <span>GitHub · Coming soon</span>
                    </button>
                  )}
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-400 bg-[#0b0f19] border border-slate-800 cursor-not-allowed"
                    >
                      <span>Live Demo · Coming soon</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
