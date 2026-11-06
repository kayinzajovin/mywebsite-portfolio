import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Home,
  Link2,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { certificationsData } from '../data/certifications';
import { experienceData } from '../data/experience';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { skillCategories } from '../data/skills';

const pages = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Technical Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'ugexim', label: 'UGExim Case Study' },
  { id: 'education', label: 'Education & Certifications' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact Me' },
] as const;

const navItems = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'about', label: 'About', icon: UserRound },
  { key: 'skills', label: 'Skills', icon: Code2 },
  { key: 'projects', label: 'Projects', icon: Briefcase },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'contact', label: 'Contact', icon: Mail },
] as const;

const panelClass = 'rounded-3xl border border-white/10 bg-[#111111] shadow-[0_16px_50px_rgba(0,0,0,0.2)]';
type ContactField = 'name' | 'email' | 'message';
type ContactErrors = Partial<Record<ContactField, string>>;

function getPageIndexFromHash() {
  const index = pages.findIndex((page) => page.id === window.location.hash.slice(1));
  return index < 0 ? 0 : index;
}

export const PaginatedPortfolio: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(getPageIndexFromHash);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<ContactErrors>({});

  useEffect(() => {
    const handleHistoryChange = () => setPageIndex(getPageIndexFromHash());
    window.addEventListener('popstate', handleHistoryChange);
    window.addEventListener('hashchange', handleHistoryChange);
    return () => {
      window.removeEventListener('popstate', handleHistoryChange);
      window.removeEventListener('hashchange', handleHistoryChange);
    };
  }, []);

  useEffect(() => {
    const handleArrowKeys = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === 'ArrowRight') setPageIndex((index) => Math.min(index + 1, pages.length - 1));
      if (event.key === 'ArrowLeft') setPageIndex((index) => Math.max(index - 1, 0));
    };
    window.addEventListener('keydown', handleArrowKeys);
    return () => window.removeEventListener('keydown', handleArrowKeys);
  }, []);

  const navigateToPage = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, pages.length - 1));
    setPageIndex(nextIndex);
    window.history.pushState(null, '', `#${pages[nextIndex].id}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name !== 'name' && name !== 'email' && name !== 'message') return;

    const field: ContactField = name;
    setFormData((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const errors: ContactErrors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errors.message = 'Please enter a message.';

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name || 'Recruiter'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`;
  };

  const ugeximProject = projectsData.find((project) => project.id === 'uganda-exim') ?? projectsData[0];

  return (
    <div className={`portfolio-shell relative flex flex-col overflow-hidden bg-[#050505] text-white xl:h-dvh xl:min-h-0 ${pageIndex === 0 ? 'home-page' : 'inner-page'}`} style={{ minHeight: '100dvh' }}>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-subtle-grid opacity-20" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.045),_transparent_38%)]" />

      <header className="portfolio-header z-10 flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-white/10 bg-[#090909]/90 px-4 py-2 backdrop-blur-sm sm:px-6 lg:flex-nowrap lg:px-8">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            navigateToPage(0);
          }}
          className="flex items-center gap-3"
        >
          <span className="flex h-10 items-center justify-center border-r border-white/20 pr-3 font-mono text-xl font-bold text-white">
            {profileData.initials}
          </span>
          <div className="text-sm font-bold tracking-wide text-white">{profileData.name}</div>
        </a>

        <nav aria-label="Portfolio pages" className="order-3 flex w-full min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:order-none lg:w-auto lg:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const pageIndexForItem = pages.findIndex((page) => page.id === item.key);
            const isCurrentPage = item.key === 'projects'
              ? pageIndex === pageIndexForItem || pages[pageIndex]?.id === 'ugexim'
              : pageIndex === pageIndexForItem;
            return (
              <button
                key={item.key}
                type="button"
                aria-current={isCurrentPage ? 'page' : undefined}
                onClick={() => navigateToPage(pageIndexForItem)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-medium transition ${
                  isCurrentPage
                    ? 'border-[#facc15]/30 bg-[#facc15]/12 text-[#facc15]'
                    : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/15 hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <a
          href="/cv/jovin-kayinza-cv.pdf"
          download
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-4 py-2 text-xs font-semibold text-white transition hover:border-[#facc15]/40 hover:text-[#facc15]"
        >
          <Download className="h-4 w-4" />
          Download CV
        </a>
      </header>

      <main className={`portfolio-main relative z-10 min-h-0 flex-1 px-4 sm:px-6 lg:px-8 ${pageIndex === 0 ? 'home-main py-3 xl:py-1' : 'py-4 xl:py-3'}`}>
        <div className={`mx-auto w-full max-w-[1500px] flex-col ${pageIndex === 0 ? 'flex h-full' : 'block'}`}>
          {pageIndex === 0 && (
            <section aria-labelledby="home-title" className="home-content flex min-h-0 flex-1 items-center">
              <div className="w-full">
                <div className="home-hero-grid grid w-full items-center gap-4 md:grid-cols-[1.15fr_0.85fr] lg:gap-6">
                  <div className="home-copy space-y-5 md:space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                      {profileData.status}
                      <span className="text-zinc-500">•</span>
                      <MapPin className="h-3.5 w-3.5" />
                      {profileData.location}
                    </div>

                    <div>
                      <h1 id="home-title" className="home-title max-w-[920px] text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white">
                        Building Reliable Backend Systems.
                        <span className="mt-2 block text-[#a1a1aa]">Turning Ideas Into Working Software.</span>
                      </h1>
                    </div>

                    <p className="home-description max-w-[700px] text-base leading-7 text-zinc-300 sm:text-lg">
                      I am a Python backend developer and software engineering graduate with practical experience building REST APIs, working with databases, and contributing to collaborative software projects.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => navigateToPage(3)}
                        className="inline-flex items-center gap-2 rounded-full border border-transparent bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[var(--accent)]"
                      >
                        View Projects <ArrowRight className="h-4 w-4" />
                      </button>
                      <a
                        href="/cv/jovin-kayinza-cv.pdf"
                        download
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-transparent px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:text-[var(--accent)]"
                      >
                        <Download className="h-4 w-4" />
                        Download CV
                      </a>
                      <a
                        href={profileData.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-transparent bg-transparent px-5 py-3 text-sm font-semibold text-zinc-400 transition hover:text-[var(--accent)]"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </div>

                  </div>

                  <div className="relative flex justify-center md:justify-end">
                    <div className="absolute inset-0 -z-10 rounded-[30px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1),_transparent_52%)] blur-2xl" />
                    <div className="relative w-full max-w-[520px]">
                      <div className="overflow-hidden rounded-[28px]">
                        <img
                          src={profileData.photoUrl}
                          alt={profileData.photoAlt}
                          className="home-photo h-[340px] w-full object-cover object-top sm:h-[420px] md:h-[min(50dvh,400px)]"
                        />
                      </div>

                      <div className="absolute right-4 top-7 hidden rounded-2xl border border-white/10 bg-[#0d0d0f]/80 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.28)] lg:block">
                        <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-zinc-400">Code</div>
                        <div className="space-y-1 font-mono text-[10px] text-zinc-300">
                          <div>const api = createApi();</div>
                          <div>await handleRequest();</div>
                          <div>return response;</div>
                        </div>
                      </div>

                      <div className="absolute -left-6 bottom-14 hidden h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d0f]/85 text-2xl font-bold text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] lg:flex">
                        {'</>'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="home-cards mt-4 grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-3 lg:grid-cols-5">
                  <button type="button" onClick={() => navigateToPage(1)} className="home-card group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#191919] to-[#101010] p-4 text-left transition hover:border-white/20">
                    <div className="home-card-icon mb-4 flex w-full items-center justify-between"><UserRound className="h-6 w-6 text-[var(--accent)]"/><ArrowRight className="h-4 w-4 text-zinc-500 transition group-hover:translate-x-1"/></div>
                    <h2 className="font-semibold text-white">About Me</h2><p className="mt-2 text-sm leading-5 text-[#b4b4bd]">A software engineer focused on Python and dependable backend systems.</p>
                  </button>
                  <button type="button" onClick={() => navigateToPage(2)} className="home-card group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#191919] to-[#101010] p-4 text-left transition hover:border-white/20">
                    <div className="home-card-icon mb-4 flex w-full items-center justify-between"><Code2 className="h-6 w-6 text-[var(--accent)]"/><ArrowRight className="h-4 w-4 text-zinc-500 transition group-hover:translate-x-1"/></div>
                    <h2 className="font-semibold text-white">Technical Skills</h2><p className="mt-2 text-sm leading-5 text-[#b4b4bd]">Python, Django, REST APIs, PostgreSQL, Git and testing.</p>
                  </button>
                  <button type="button" onClick={() => navigateToPage(3)} className="home-card group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#191919] to-[#101010] p-4 text-left transition hover:border-white/20">
                    <div className="home-card-icon mb-4 flex w-full items-center justify-between"><Briefcase className="h-6 w-6 text-[var(--accent)]"/><ArrowRight className="h-4 w-4 text-zinc-500 transition group-hover:translate-x-1"/></div>
                    <h2 className="font-semibold text-white">Featured Project</h2><p className="mt-2 text-sm leading-5 text-[#b4b4bd]">UGExim Loan Operations Platform</p>
                  </button>
                  <button type="button" onClick={() => navigateToPage(5)} className="home-card group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#191919] to-[#101010] p-4 text-left transition hover:border-white/20">
                    <div className="home-card-icon mb-4 flex w-full items-center justify-between"><GraduationCap className="h-6 w-6 text-[var(--accent)]"/><ArrowRight className="h-4 w-4 text-zinc-500 transition group-hover:translate-x-1"/></div>
                    <h2 className="font-semibold text-white">Education</h2><p className="mt-2 text-sm leading-5 text-[#b4b4bd]">Software Engineering with Python · Refactory Academy</p>
                  </button>
                  <button type="button" onClick={() => navigateToPage(7)} className="home-card group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#191919] to-[#101010] p-4 text-left transition hover:border-white/20">
                    <div className="home-card-icon mb-4 flex w-full items-center justify-between"><Mail className="h-6 w-6 text-[var(--accent)]"/><ArrowRight className="h-4 w-4 text-zinc-500 transition group-hover:translate-x-1"/></div>
                    <h2 className="font-semibold text-white">Contact</h2><p className="mt-2 text-sm leading-5 text-[#b4b4bd]">Let’s build something great together.</p>
                  </button>
                </div>
              </div>
            </section>
          )}

          {pageIndex === 1 && (
            <section aria-labelledby="about-title" className="flex min-h-0 flex-1 flex-col justify-start">
              <PageHeading
                id="about-title"
                eyebrow="About me"
                title="Backend-minded software engineer with practical product experience"
                description="Focused on reliable systems, secure access, and clean application logic for business operations."
              />

              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className={`${panelClass} p-5 sm:p-6`}>
                  <div className="space-y-4 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                    {profileData.aboutStory.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {profileData.aboutStory.coreValues.map((value) => {
                    const Icon =
                      value.icon === 'Code2'
                        ? Code2
                        : value.icon === 'Database'
                          ? Database
                          : value.icon === 'ShieldCheck'
                            ? ShieldCheck
                            : Sparkles;

                    return (
                      <div key={value.title} className={`${panelClass} p-4`}>
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#facc15]/12 text-[#facc15]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">{value.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-zinc-300">{value.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {pageIndex === 2 && (
            <section aria-labelledby="skills-title" className="flex min-h-0 flex-1 flex-col justify-start">
              <PageHeading
                id="skills-title"
                eyebrow="Technical skills"
                title="Core skills for backend-driven product work"
                description="Practical experience in Python, Django, PostgreSQL, API development, access control, testing, and collaboration."
              />

              <div className="grid gap-4 md:grid-cols-2">
                {skillCategories.map((category) => (
                  <article key={category.id} className={`${panelClass} p-5`}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#facc15]/10 text-[#facc15]">
                        {category.icon === 'Server' ? <Briefcase className="h-5 w-5" /> : category.icon === 'Database' ? <Database className="h-5 w-5" /> : category.icon === 'ShieldCheck' ? <ShieldCheck className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">{category.title}</h2>
                        <p className="text-xs text-zinc-400">{category.subtitle}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="rounded-2xl border border-white/8 bg-white/[0.02] p-3">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium text-white">{skill.name}</span>
                            <span className="rounded-full border border-[#facc15]/35 bg-[#facc15]/8 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#facc15]">
                              {skill.level}
                            </span>
                          </div>
                          {skill.description && <p className="mt-2 text-xs leading-6 text-zinc-400">{skill.description}</p>}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {pageIndex === 3 && (
            <section aria-labelledby="projects-title" className="flex min-h-0 flex-1 flex-col justify-start">
              <PageHeading
                id="projects-title"
                eyebrow="Featured projects"
                title="Selected work and collaborative product experience"
                description="A focused view of backend contributions and practical project work."
              />

              <div className="grid gap-4 lg:grid-cols-2">
                {projectsData.filter((project) => !project.isPlaceholder).map((project) => (
                  <article key={project.id} className={`${panelClass} flex flex-col gap-4 p-5`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#facc15]">{project.category}</p>
                        <h2 className="mt-2 text-2xl font-bold text-white">{project.title}</h2>
                        <p className="mt-2 text-sm text-zinc-400">{project.subtitle}</p>
                      </div>
                      {project.statusBadge && (
                        <span className="rounded-full border border-[#facc15]/30 bg-[#facc15]/8 px-2.5 py-1 text-[10px] font-medium text-[#facc15]">
                          {project.statusBadge}
                        </span>
                      )}
                    </div>

                    <p className="text-sm leading-7 text-zinc-300">{project.description}</p>

                    {project.myRole && (
                      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-3 text-sm text-zinc-300">
                        <span className="font-semibold text-white">My role:</span> {project.myRole}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span key={technology} className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-300">
                          {technology}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {project.id === 'uganda-exim' && (
                        <button
                          type="button"
                          onClick={() => navigateToPage(pages.findIndex((page) => page.id === 'ugexim'))}
                          className="inline-flex items-center gap-2 rounded-xl border border-[#facc15]/30 bg-[#facc15]/8 px-3 py-2 text-xs text-[#facc15] hover:bg-[#facc15]/15"
                        >
                          <FileText className="h-4 w-4" />
                          UGExim case study
                        </button>
                      )}

                      {project.githubUrl ? (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white hover:bg-white/6">
                          <Github className="h-4 w-4 text-[#facc15]" />
                          GitHub
                        </a>
                      ) : (
                        <button type="button" disabled className="cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-zinc-500">
                          GitHub · Private
                        </button>
                      )}

                      {project.demoUrl ? (
                        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white hover:bg-white/6">
                          <ExternalLink className="h-4 w-4 text-[#facc15]" />
                          Live demo
                        </a>
                      ) : (
                        <button type="button" disabled className="cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-zinc-500">
                          Demo · Coming soon
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {pageIndex === 4 && (
            <section aria-labelledby="case-study-title" className="flex min-h-0 flex-1 flex-col justify-start">
              <PageHeading
                id="case-study-title"
                eyebrow="Case study"
                title="UGExim Loan Operations Platform"
                description="A collaborative backend contribution supporting secure workflows, structured data, and operational accountability."
              />

              <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                <div className={`${panelClass} p-5 sm:p-6`}>
                  <p className="text-sm leading-7 text-zinc-300">{ugeximProject.longDescription}</p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {ugeximProject.keyFeatures.map((feature) => (
                      <div key={feature} className="rounded-2xl border border-white/8 bg-white/[0.02] p-3 text-sm text-zinc-300">
                        <div className="mb-2 flex items-center gap-2 text-[#facc15]">
                          <BadgeCheck className="h-4 w-4" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`${panelClass} p-4`}>
                    <h2 className="text-lg font-semibold text-white">Platform focus</h2>
                    <div className="mt-4 space-y-3 text-sm text-zinc-300">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-3">
                        <div className="mb-1 font-medium text-[#facc15]">Authentication & permissions</div>
                        Secure access patterns and role-based control for operational users.
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-3">
                        <div className="mb-1 font-medium text-[#facc15]">Document validation</div>
                        Structured checks to support application accuracy and business controls.
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-3">
                        <div className="mb-1 font-medium text-[#facc15]">Loan workflows</div>
                        Operational support for application and review-based processes.
                      </div>
                    </div>
                  </div>

                  <div className={`${panelClass} p-4`}>
                    <h2 className="text-lg font-semibold text-white">Collaborative contribution</h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-300">
                      This was a collaborative engineering project, and my contribution focused on backend work supporting secure, reliable operations rather than claiming sole ownership of the entire platform.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {pageIndex === 5 && (
            <section aria-labelledby="education-title" className="flex min-h-0 flex-1 flex-col justify-start">
              <PageHeading
                id="education-title"
                eyebrow="Education & certifications"
                title="Training, certification, and continuing growth"
                description="Relevant education and certifications that support my software engineering foundation."
              />

              <div>
                <div className="mb-4 flex items-center gap-2 text-[#facc15]">
                  <GraduationCap className="h-5 w-5" />
                  <span className="font-medium uppercase tracking-[0.16em] text-xs">Certificates & training</span>
                </div>

                <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {experienceData.filter((item) => item.id !== 'refactory-apprenticeship' && item.id !== 'refactory-certification').map((item) => (
                    <article key={item.id} className={`${panelClass} flex h-full min-h-[15rem] flex-col p-5`}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full border border-[#facc15]/30 bg-[#facc15]/8 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#facc15]">
                          {item.type}
                        </span>
                        <span className="text-[11px] text-zinc-400">{item.period}</span>
                      </div>

                      <h2 className="mt-4 text-xl font-semibold text-white">{item.role}</h2>
                      <p className="mt-1 text-sm text-zinc-400">{item.organization}</p>

                      <p className="mt-3 text-sm leading-7 text-zinc-300">{item.description}</p>

                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        {item.technologies.map((tech) => (
                          <span key={tech} className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}

                  {certificationsData.map((cert) => (
                    <article key={cert.id} className={`${panelClass} flex h-full min-h-[15rem] flex-col p-5`}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-base font-semibold text-white">{cert.title}</h2>
                          <p className="mt-1 text-xs text-zinc-400">{cert.issuer}</p>
                        </div>
                        <span className="shrink-0 rounded-full border border-[#facc15]/30 bg-[#facc15]/8 px-2 py-1 text-[10px] text-[#facc15]">
                          {cert.status}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-zinc-300">{cert.description}</p>

                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        {cert.skillsLearned.map((skill) => (
                          <span key={skill} className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] text-zinc-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {pageIndex === 6 && (
            <section aria-labelledby="github-title" className="flex min-h-0 flex-1 items-start justify-start pt-4">
              <div className={`${panelClass} w-full max-w-3xl p-6 sm:p-8`}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#facc15]">GitHub profile</p>
                    <h1 id="github-title" className="mt-2 text-3xl font-bold text-white sm:text-4xl">{profileData.name}</h1>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-300">
                      Backend-focused projects, code samples, and software engineering exploration shared on GitHub.
                    </p>
                  </div>
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#facc15] px-4 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#fbbf24]"
                  >
                    <Github className="h-4 w-4" />
                    Open GitHub
                  </a>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    'Python Backend Development',
                    'Django & REST APIs',
                    'PostgreSQL & Data Work',
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-sm text-zinc-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {pageIndex === 7 && (
            <section aria-labelledby="contact-title" className="flex min-h-0 flex-1 items-start justify-start pt-4">
              <div className="grid w-full max-w-5xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className={`${panelClass} p-6 sm:p-8`}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#facc15]">Contact me</p>
                  <h1 id="contact-title" className="mt-2 text-3xl font-bold text-white sm:text-4xl">Let’s talk about backend engineering</h1>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-zinc-300">
                    I’m available for backend engineering opportunities, project collaboration, and technical discussions. Reach out and I’ll be happy to connect.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.12em] text-zinc-400">Name</label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={Boolean(formErrors.name)}
                        aria-describedby={formErrors.name ? 'name-error' : undefined}
                        placeholder="Your name"
                        className={`w-full rounded-2xl border bg-[#181818] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none ${formErrors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#facc15]/60'}`}
                      />
                      {formErrors.name && <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.12em] text-zinc-400">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(formErrors.email)}
                        aria-describedby={formErrors.email ? 'email-error' : undefined}
                        placeholder="you@example.com"
                        className={`w-full rounded-2xl border bg-[#181818] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#facc15]/60'}`}
                      />
                      {formErrors.email && <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">{formErrors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.12em] text-zinc-400">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your opportunity or project..."
                        rows={5}
                        aria-invalid={Boolean(formErrors.message)}
                        aria-describedby={formErrors.message ? 'message-error' : undefined}
                        className={`w-full rounded-2xl border bg-[#181818] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none ${formErrors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#facc15]/60'}`}
                      />
                      {formErrors.message && <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">{formErrors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#facc15] px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#fbbf24]"
                    >
                      Send inquiry <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </div>

                <div className="space-y-4">
                  <div className={`${panelClass} p-5`}>
                    <div className="mb-3 flex items-center gap-2 text-[#facc15]">
                      <Mail className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.12em]">Email</span>
                    </div>
                    <a href={`mailto:${profileData.email}`} className="text-base text-white break-all">{profileData.email}</a>
                  </div>

                  <div className={`${panelClass} p-5`}>
                    <div className="mb-3 flex items-center gap-2 text-[#facc15]">
                      <Github className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.12em]">GitHub</span>
                    </div>
                    <a href={profileData.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-base text-white hover:text-[#facc15]">
                      {profileData.socials.github}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className={`${panelClass} p-5`}>
                    <div className="mb-3 flex items-center gap-2 text-[#facc15]">
                      <Link2 className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.12em]">LinkedIn</span>
                    </div>
                    <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-base text-white hover:text-[#facc15]">
                      LinkedIn placeholder
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className={`${panelClass} p-5`}>
                    <div className="mb-3 flex items-center gap-2 text-[#facc15]">
                      <MapPin className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.12em]">Location</span>
                    </div>
                    <p className="text-base text-white">{profileData.location}</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="portfolio-footer z-10 flex h-16 shrink-0 items-center justify-between border-t border-white/10 bg-[#090909]/90 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigateToPage(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/6 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>

        <div className="flex items-center gap-2" aria-label={`Page ${pageIndex + 1} of ${pages.length}`}>
          {pages.map((page, index) => (
            <button
              key={page.id}
              type="button"
              onClick={() => navigateToPage(index)}
              aria-label={`Go to ${page.label} page`}
              aria-current={pageIndex === index ? 'step' : undefined}
              className={`h-2.5 rounded-full transition-all ${pageIndex === index ? 'w-8 bg-[#facc15]' : 'w-2.5 bg-zinc-700 hover:bg-zinc-500'}`}
            />
          ))}
          <span className="ml-1 text-[10px] uppercase tracking-[0.12em] text-zinc-400">{pageIndex + 1}/{pages.length}</span>
        </div>

        <button
          type="button"
          onClick={() => navigateToPage(pageIndex + 1)}
          disabled={pageIndex === pages.length - 1}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/6 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:text-sm"
        >
          Next <ArrowRight className="h-4 w-4" />
        </button>
      </footer>
    </div>
  );
};

interface PageHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ id, eyebrow, title, description }) => (
  <div className="shrink-0 pb-5">
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#facc15]">{eyebrow}</p>
    <h1 id={id} className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{title}</h1>
    <p className="mt-2 max-w-2xl text-sm text-zinc-400">{description}</p>
  </div>
);
