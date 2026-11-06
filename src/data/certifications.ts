export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  status: "Verified & Earned" | "In Progress / Targeted";
  description: string;
  badgeColor: "blue" | "emerald" | "amber" | "purple";
  skillsLearned: string[];
  verificationUrl?: string;
}

export const certificationsData: Certification[] = [
  {
    id: "cert-refactory-python",
    title: "Certificate in Software Engineering with Python",
    issuer: "Refactory Academy",
    issueDate: "Completed",
    credentialId: "Placeholder credential ID",
    status: "Verified & Earned",
    badgeColor: "amber",
    description:
      "Certificate earned through a focused software engineering program covering Python, backend development, practical application building, and supporting team-based engineering workflows.",
    skillsLearned: [
      "Python development",
      "Django backend fundamentals",
      "PostgreSQL and database work",
      "Testing and quality practices",
      "Collaborative software engineering",
    ],
    verificationUrl: "",
  },
  {
    id: "cert-apprenticeship",
    title: "Software Engineering Apprenticeship",
    issuer: "Refactory Academy",
    issueDate: "Completed",
    credentialId: "Placeholder credential ID",
    status: "Verified & Earned",
    badgeColor: "blue",
    description:
      "Completed a structured software engineering apprenticeship focused on backend development, collaborative work, secure system thinking, and practical problem-solving.",
    skillsLearned: [
      "Backend development",
      "Application workflow design",
      "Secure access patterns",
      "Collaborative engineering practice",
    ],
    verificationUrl: "",
  },
  {
    id: "cert-wordpress",
    title: "WordPress Certificate",
    issuer: "ICT Hub Open Code Source",
    issueDate: "2026",
    status: "Verified & Earned",
    badgeColor: "blue",
    description:
      "Certificate earned for WordPress training through ICT Hub Open Code Source at the Groundbreaker Talents premises.",
    skillsLearned: ["WordPress"],
  },
  {
    id: "cert-ode-open-source",
    title: "ODE (Open Source Code Event)",
    issuer: "ICT Hub Open Code Source",
    issueDate: "2026",
    status: "Verified & Earned",
    badgeColor: "emerald",
    description:
      "Certificate earned for participating in the ODE open-source code event hosted by ICT Hub Open Code Source.",
    skillsLearned: ["Open source", "Collaborative coding"],
  },
];
