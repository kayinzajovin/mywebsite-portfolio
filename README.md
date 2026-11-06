# Jovin Kayinza — Personal Portfolio Website

A premium, production-ready personal portfolio website for **Jovin Kayinza**, Software Engineering Apprentice and Python Backend Developer based in Kampala, Uganda.

Built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. Designed from the ground up to reflect senior-level software engineering craftsmanship, relational database precision, and clean API architecture.

---

## ⚡ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom glassmorphism and electric-blue glow palettes
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Calibri primary font stack with self-hosted metric-compatible Carlito fallback
- **Monospace Font**: JetBrains Mono for terminals, API playgrounds, and code blocks
- **Design Standard**: WCAG AA contrast compliance, keyboard accessible, prefers-reduced-motion support

---

## 🌟 Unique Engineering Features

1. **Terminal-Style Hero Intro**: Interactive animated shell typing sequence (`$ whoami`, `$ show_urls`, `$ curl /healthz`) running alongside the real profile photo with electric-blue glow.
2. **Command Palette (`Ctrl+K` / `Cmd+K`)**: Keyboard-driven quick-launcher to navigate to any section, download the CV, or trigger actions with full keyboard arrow navigation.
3. **Interactive API Playground**: Simulated Django REST Framework request/response explorer featuring real endpoints (`GET /api/v1/clients/`, `POST /api/v1/loans/apply/`, `GET /api/v1/loans/<ref>/status/`, `GET /api/v1/audit-logs/`) with realistic response latencies, HTTP status pills, and copyable JSON.
4. **Uganda Exim Architecture View**: Deep interactive architectural diagram modeling the 5-stage platform pipeline:
   `Clients / Field Officers → Auth & RBAC Guards → Loan Workflow State-Machine → PostgreSQL Core → Immutable Audit Log`.
   Includes a live step-by-step pipeline simulation.
5. **Scroll Progress & Dynamic Navbar**: Real-time gradient progress bar and active section highlighting.
6. **Skills & Currently Learning Roadmap**: Categorized competencies plus an active progression strip tracking Ruby, TypeScript, JavaScript, and Frontend Tooling.
7. **Vertical Timeline**: Chronological learning journey from foundational academics to Refactory Academy and software development apprenticeship.
8. **Working Contact Form**: Full validation, loading spinner states, success/error feedback, wired to optional environment variables.

---

## 📁 Project Directory Structure

```text
jovin-portfolio/
├── public/
│   ├── cv/
│   │   └── Jovin-Kayinza-CV.pdf       # Real downloadable CV (A4 300DPI)
│   ├── fonts/
│   │   ├── calibri.ttf               # Self-hosted Calibri Regular
│   │   ├── calibrib.ttf              # Self-hosted Calibri Bold
│   │   ├── calibrii.ttf              # Self-hosted Calibri Italic
│   │   └── calibriz.ttf              # Self-hosted Calibri Bold Italic
│   └── images/
│       ├── profile.jpg               # High-res portrait of Jovin Kayinza
│       └── profile-thumb.jpg         # Compressed avatar thumbnail
├── src/
│   ├── data/                         # 💡 ALL EDITABLE CONTENT LIVES HERE
│   │   ├── profile.ts                # Bio, headlines, socials, contact info, photo & CV URLs
│   │   ├── skills.ts                 # Categorized skills & Currently Learning roadmap
│   │   ├── projects.ts               # Project cards, technologies, features & repo links
│   │   ├── experience.ts             # Learning journey & apprenticeship timeline items
│   │   ├── certifications.ts         # Refactory Academy cert, education, & future targets
│   │   └── apiPlayground.ts          # Mock DRF endpoints & sample JSON payloads
│   ├── components/
│   │   ├── Navbar.tsx                # Sticky navbar, CV download, mobile drawer
│   │   ├── CommandPalette.tsx        # Ctrl+K modal quick jump & shortcuts
│   │   ├── Hero.tsx                  # Name, role, framed portrait & CTA buttons
│   │   ├── TerminalIntro.tsx         # Interactive shell typing sequence
│   │   ├── About.tsx                 # Engineering story, philosophy & core values
│   │   ├── Skills.tsx                # Grouped skills with filter pills
│   │   ├── CurrentlyLearning.tsx     # Roadmap strip with progress indicators
│   │   ├── Projects.tsx              # Featured project cards with disabled link guards
│   │   ├── UgandaEximArchitecture.tsx# Interactive 5-stage system architecture diagram
│   │   ├── ApiPlayground.tsx         # Live DRF API explorer
│   │   ├── ExperienceTimeline.tsx    # Vertical learning timeline
│   │   ├── Certifications.tsx        # Formal qualifications & target credentials
│   │   ├── ContactSection.tsx        # Working contact form with validation & copy email
│   │   ├── ScrollProgress.tsx        # Top scroll progress bar
│   │   ├── CursorGlow.tsx            # Subtle cursor-follow light (disabled on touch)
│   │   └── Footer.tsx                # Bottom credits & quick links
│   ├── styles/
│   │   └── index.css                 # Typography font-faces, grid texture, glassmorphism
│   ├── App.tsx                       # Master layout & global key listeners
│   └── main.tsx                      # React root entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **npm** (or pnpm / yarn)

### 2. Start Development Server
```bash
# Navigate to project directory
cd jovin-portfolio

# Start the local Vite dev server
npm run dev
```
Open your browser at `http://localhost:3000` (or the port displayed in your terminal).

### 3. Production Build & Preview
```bash
# Type check and build optimized bundle into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## ✏️ How to Edit Content (Without Touching Components)

All editable content is organized into `/src/data/`. You never need to modify UI component code to update your portfolio:

### 1. Update Profile, Bio & Socials (`/src/data/profile.ts`)
- `name`: Change your name.
- `headline`: Update your headline/title.
- `intro`: Edit your introductory statement.
- `location`: Change city or country.
- `socials`: Update your GitHub URL, LinkedIn URL, or email address.
- `aboutStory`: Update your journey paragraphs or core values.

### 2. Update Skills & Roadmap (`/src/data/skills.ts`)
- Add or remove skills under categories: Backend Development, Database Engineering, Testing & QA, DevOps & Tools, or Software Design.
- Update `currentlyLearning` items: change languages, progress percentages (`progressPercent: 85`), or roadmap tags.

### 3. Update Projects & Case Studies (`/src/data/projects.ts`)
- Add a new project by appending an object to `projectsData`.
- Set `githubUrl: "https://github.com/..."` when a repository is ready to be public.
- Set `demoUrl: "https://..."` when a live deployment is accessible.
- **Rules applied**: If `githubUrl` or `demoUrl` is empty (`""`), the button automatically displays a locked `"Private Enterprise Repo"` or `"Coming Soon"` badge.

### 4. Update Experience Timeline (`/src/data/experience.ts`)
- Append or edit apprenticeship milestones, roles, companies, dates, and bullet-point achievements.

### 5. Update Certifications (`/src/data/certifications.ts`)
- Add newly earned credentials, certificate IDs, verification links, or update targeted certifications.

---

## 📸 How to Swap Photo and CV

### Swapping the Profile Photo
1. Place your new photo in `/public/images/` (e.g. `public/images/profile.jpg`).
2. If using a different filename, open `/src/data/profile.ts` and update:
   ```ts
   photoUrl: "/images/your-new-photo.jpg",
   ```
3. *Fallback Note*: If the image ever fails to load, the site automatically renders a fallback avatar badge with your initials (`JK`).

### Swapping the CV File
1. Place your updated PDF in `/public/cv/` (e.g. `public/cv/Jovin-Kayinza-CV.pdf`).
2. If using a different filename, open `/src/data/profile.ts` and update:
   ```ts
   cvUrl: "/cv/Your-New-CV.pdf",
   cvFilename: "Your-New-CV.pdf",
   ```
3. Every "Download CV" button in the Navbar, Hero, and Command Palette will instantly download the new file.

---

## ✉️ Configuring the Contact Form

The contact form in `ContactSection.tsx` is production-ready with client-side validation, loading states, and error handling.

### Option A: Formspree (Recommended, Free & Fast)
1. Go to [https://formspree.io/](https://formspree.io/) and create a free account.
2. Click **Create Form** and name it (e.g. "Portfolio Contact").
3. Copy your unique Form ID endpoint URL (e.g. `https://formspree.io/f/mqkenvba`).
4. In the root directory, create a `.env` file:
   ```env
   VITE_CONTACT_ENDPOINT=https://formspree.io/f/your_form_id
   ```
5. Restart your dev server. Submissions will now be emailed directly to your inbox!

### Option B: Custom Serverless Endpoint or Webhook
Set `VITE_CONTACT_ENDPOINT` to any POST endpoint accepting JSON with `{ name, email, subject, message }`.

*Note*: If `VITE_CONTACT_ENDPOINT` is not defined, the form runs in simulation mode: validating input, showing the loading spinner, and displaying a success confirmation.

---

## 🌐 How to Deploy

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub (`github.com/jovinkayinza/portfolio`).
2. Go to [https://vercel.com/](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. (Optional) In **Environment Variables**, add `VITE_CONTACT_ENDPOINT`.
6. Click **Deploy**. Your site will be live with free SSL and edge CDN in ~45 seconds.

### Deploy to Netlify
1. Go to [https://www.netlify.com/](https://www.netlify.com/) and click **Add new site** → **Import an existing project**.
2. Connect your GitHub repository.
3. Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**.

---

## 🛡️ Privacy & Compliance Note
Personal phone numbers and physical addresses are strictly excluded from website markup per privacy standards. Contact information is centered on direct secure email communication and professional GitHub/LinkedIn profiles.
