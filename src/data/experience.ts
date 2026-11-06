export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  type: "Apprenticeship" | "Intensive Training" | "Education & Foundations" | "Hackathon";
  description: string;
  achievements: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "refactory-apprenticeship",
    role: "Software Engineering Apprentice",
    organization: "Refactory Academy",
    period: "Completed apprenticeship",
    location: "Kampala, Uganda",
    type: "Apprenticeship",
    description:
      "Completed a software engineering apprenticeship focused on Python backend development, Django, database design, and practical software engineering workflows.",
    achievements: [
      "Built backend logic and application workflows using Python and Django.",
      "Worked with PostgreSQL and database-backed application development.",
      "Practiced secure and maintainable coding patterns for real business problems.",
      "Contributed to collaborative team development with a strong focus on quality and reliability.",
    ],
    technologies: ["Python", "Django", "PostgreSQL", "Git", "REST APIs", "Team Collaboration"],
  },
  {
    id: "refactory-certification",
    role: "Certificate in Software Engineering with Python",
    organization: "Refactory Academy",
    period: "Certification completed",
    location: "Kampala, Uganda",
    type: "Intensive Training",
    description:
      "Completed a structured training program centered on Python software engineering, backend development, database management, and practical testing practices.",
    achievements: [
      "Strengthened backend development fundamentals with Python and Django.",
      "Learned database work and data modeling with PostgreSQL.",
      "Applied testing and code quality practices in development workflows.",
      "Built a practical understanding of secure, maintainable software systems.",
    ],
    technologies: ["Python", "Django", "PostgreSQL", "Testing", "Software Engineering"],
  },
  {
    id: "sukalife-hackathon",
    role: "Backend Contributor",
    organization: "Girl Code Hackathon",
    period: "Project-based collaboration",
    type: "Hackathon",
    description:
      "Contributed to a team project focused on providing a practical digital solution for people with diabetes.",
    achievements: [
      "Worked with a team to support project delivery in a time-bound development environment.",
      "Contributed backend support within a collaborative product-building workflow.",
    ],
    technologies: ["Python", "Django", "Team Collaboration"],
  },
];
