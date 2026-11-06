export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Enterprise Backend" | "Web System" | "Upcoming Architecture" | "Hackathon Project";
  statusBadge?: string;
  badges?: string[];
  myRole?: string;
  description: string;
  longDescription?: string;
  keyFeatures: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  githubUrl?: string;
  demoUrl?: string;
  isPlaceholder?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "uganda-exim",
    title: "UGExim Loan Operations Platform",
    subtitle: "Collaborative project supporting client and loan operations",
    category: "Enterprise Backend",
    statusBadge: "Collaborative project",
    description:
      "A collaborative backend effort supporting client onboarding, document validation, loan workflows, permissions, and auditability for UGExim operations.",
    longDescription:
      "I contributed to the backend development of the UGExim loan operations platform as part of a collaborative engineering team. The work covered authentication and role-based access, document validation, loan application workflows, approval processes, and audit logging to support secure business operations.",
    keyFeatures: [
      "Authentication and role-based access control for different user groups",
      "Loan application and operational workflow support",
      "Document validation and structured business processing",
      "Audit logging for accountability and traceability",
      "Team-based backend development aligned to real product requirements",
    ],
    technologies: ["Python", "Django", "Django REST Framework", "PostgreSQL", "RBAC", "Audit Logging"],
    metrics: [
      { label: "Focus", value: "Backend contribution" },
      { label: "Core stack", value: "Python + Django" },
      { label: "Security", value: "Permissions & auditability" },
    ],
    githubUrl: "",
    demoUrl: "",
    isPlaceholder: false,
  },
  {
    id: "sukalife",
    title: "SukaLife",
    subtitle: "Hackathon project for people with diabetes",
    category: "Hackathon Project",
    badges: ["Team project", "Backend support"],
    myRole: "Backend contribution",
    description:
      "A team-built project focused on supporting people with diabetes, where I contributed to backend work during a hackathon.",
    keyFeatures: [
      "Backend contribution to a user-focused product",
      "Collaborative development in a time-bound environment",
      "Support for a practical health-focused web experience",
    ],
    technologies: ["Python", "Django", "Team Collaboration"],
    githubUrl: "",
    demoUrl: "",
    isPlaceholder: false,
  },
];
