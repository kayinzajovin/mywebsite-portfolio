export interface ProfileData {
  name: string;
  initials: string;
  headline: string;
  subheadline: string;
  intro: string;
  location: string;
  country: string;
  status: string;
  photoUrl: string;
  photoAlt: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  aboutStory: {
    greeting: string;
    paragraphs: string[];
    coreValues: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

export const profileData: ProfileData = {
  name: "Jovin Kayinza",
  initials: "JK",
  headline: "Junior Python Backend Developer | Software Engineering Graduate",
  subheadline: "Building secure backend systems, practical APIs, and reliable PostgreSQL-backed solutions.",
  intro: "I am Jovin Kayinza, a junior Python backend developer and software engineering graduate focused on backend development, API design, database management, and secure business workflows.",
  location: "Kampala, Uganda",
  country: "Uganda",
  status: "Open to backend engineering opportunities",
  photoUrl: "/images/profile.jpg",
  photoAlt: "Portrait of Jovin Kayinza",
  email: "kayinzajovin1@gmail.com",
  socials: {
    github: "https://github.com/kayinzajovin",
    linkedin: "https://www.linkedin.com/in/your-profile",
    email: "kayinzajovin1@gmail.com",
  },
  aboutStory: {
    greeting: "Building dependable digital systems for real business workflows.",
    paragraphs: [
      "I completed a Certificate in Software Engineering with Python and a Software Engineering Apprenticeship at Refactory Academy, where I built a strong foundation in backend development, Django, PostgreSQL, and secure application design.",
      "My focus is on Python backend engineering, REST API development, database design, and role-based access control. I enjoy turning practical business requirements into clean, dependable systems that support teams and users.",
      "On the UGExim Loan Operations Platform, I contributed to a collaborative backend effort covering authentication, permissions, document validation, loan workflows, audit logging, and quality-focused development practices.",
      "I am motivated by teamwork, structured coding practices, and continuous learning as I grow as a software engineer in real-world product environments.",
    ],
    coreValues: [
      {
        title: "Backend Reliability",
        description: "Well-structured logic, stable APIs, and maintainable systems that support working business processes.",
        icon: "Code2",
      },
      {
        title: "Database Integrity",
        description: "Thoughtful PostgreSQL design, consistent data modeling, and dependable record management.",
        icon: "Database",
      },
      {
        title: "Security & Access",
        description: "Role-based permissions and secure workflows that protect sensitive operations and user data.",
        icon: "ShieldCheck",
      },
      {
        title: "Continuous Growth",
        description: "Learning modern tools and engineering practices to keep improving as a backend developer.",
        icon: "Sparkles",
      },
    ],
  },
};
