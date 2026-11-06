export interface SkillItem {
  name: string;
  level: "Advanced" | "Proficient" | "Working Knowledge" | "Familiar";
  description?: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  skills: SkillItem[];
}

export interface LearningItem {
  language: string;
  focus: string;
  progressPercent: number;
  status: "Active Study" | "Building Projects" | "Target Milestone";
  details: string;
  tags: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend Development",
    subtitle: "Python, Django, and logic for reliable business systems",
    icon: "Server",
    skills: [
      { name: "Python", level: "Proficient", description: "Core programming language for backend logic and automation" },
      { name: "Django", level: "Proficient", description: "Secure web application development and business workflows" },
      { name: "Django REST Framework", level: "Proficient", description: "REST API design and backend services for applications" },
      { name: "Authentication & RBAC", level: "Proficient", description: "Secure user access and role-based permission handling" },
    ],
  },
  {
    id: "database",
    title: "Database Engineering",
    subtitle: "PostgreSQL design, querying, and structured data management",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", level: "Proficient", description: "Relational database management for application data" },
      { name: "Database Design", level: "Proficient", description: "Designing structured schemas for real business domains" },
      { name: "SQL & Query Writing", level: "Proficient", description: "Managing records, relationships, and reporting logic" },
      { name: "Data Integrity", level: "Working Knowledge", description: "Maintaining clean, consistent, and reliable data records" },
    ],
  },
  {
    id: "api-security",
    title: "API & Security",
    subtitle: "Building and protecting services that handle business data",
    icon: "ShieldCheck",
    skills: [
      { name: "REST API Development", level: "Proficient", description: "Designing endpoints for client and server communication" },
      { name: "Role-Based Access Control", level: "Proficient", description: "Controlling access to sensitive records and actions" },
      { name: "Audit Logging", level: "Working Knowledge", description: "Tracking changes and maintaining accountability" },
      { name: "Document Validation", level: "Working Knowledge", description: "Supporting business validation and workflow checks" },
    ],
  },
  {
    id: "quality",
    title: "Testing & Collaboration",
    subtitle: "Writing reliable code and working effectively with teams",
    icon: "CheckCircle2",
    skills: [
      { name: "Automated Testing", level: "Proficient", description: "Ensuring reliability through test-driven and repeatable validation" },
      { name: "Git & GitHub", level: "Proficient", description: "Version control, collaboration, and code review workflows" },
      { name: "Code Quality", level: "Proficient", description: "Readable logic, maintainable structure, and practical engineering discipline" },
      { name: "Team-based Development", level: "Working Knowledge", description: "Supporting collaborative backend work in a shared product environment" },
    ],
  },
];

export const currentlyLearning: LearningItem[] = [
  {
    language: "Ruby",
    focus: "Backend fundamentals and alternative application patterns",
    progressPercent: 35,
    status: "Active Study",
    details: "Expanding backend knowledge beyond Python to explore broader software patterns.",
    tags: ["Backend", "Learning"],
  },
  {
    language: "TypeScript",
    focus: "Type-safe web and application development",
    progressPercent: 45,
    status: "Building Projects",
    details: "Developing a stronger understanding of typed frontend and shared-system communication.",
    tags: ["Frontend", "Type Safety"],
  },
  {
    language: "JavaScript",
    focus: "Modern web interactivity and application logic",
    progressPercent: 50,
    status: "Building Projects",
    details: "Improving practical web development understanding for modern product building.",
    tags: ["Web", "Interactivity"],
  },
  {
    language: "Modern Backend Tools",
    focus: "Scaling engineering knowledge across services and teams",
    progressPercent: 55,
    status: "Target Milestone",
    details: "Growing in professional software engineering practices used in team-driven product work.",
    tags: ["Engineering", "Product"],
  },
];
