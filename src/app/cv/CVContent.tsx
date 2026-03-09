"use client";

import AnimateOnScroll from "@/components/AnimateOnScroll";

/* ─── DATA ─── */

const experience = [
  {
    role: "CTO & Co-Founder",
    company: "Digitay.pl",
    url: "https://digitay.pl",
    period: "2023 to Present",
    description:
      "Leading technical strategy, team management, and hands-on development for a digital agency serving 30+ active clients. Responsible for full-stack development, client consulting, SEO strategy, Google Business management, and end-to-end project delivery across web development, e-commerce, and digital marketing.",
    highlights: [
      "Build and deliver custom websites and online stores for clients using Next.js, Django, and CMS platforms (WordPress, Sellstick)",
      "Optimize and fix existing WordPress and CMS-based e-commerce stores: page speed improvements, technical debt resolution, conversion-oriented UX",
      "Plan and execute SEO strategies: technical audits, on-page optimization, keyword research, SEO-friendly blog content writing",
      "Create and manage Google Business Profiles: optimizing local visibility, review management, accurate business information",
      "Direct client consulting: translating business goals into technical requirements, maintaining long-term relationships",
      "Team management: code reviews, task delegation, sprint planning, quality assurance, and mentoring developers",
      "Implemented analytics stacks (GTM, GA4), conversion tracking pipelines, and Google/Meta Ads campaigns",
      "Managed end-to-end project delivery from discovery to deployment on VPS infrastructure with Nginx",
    ],
  },
];

const keyProjects = [
  {
    name: "Katalogo.pl",
    url: "https://www.katalogo.pl",
    role: "Lead Developer & Architect",
    description:
      "Full-stack business directory platform and the largest verified business database in Poland with 71,000+ listed companies and 250K to 300K monthly visitors.",
    highlights: [
      "Architected the entire platform from scratch: database schema, API layer, SSR/SSG rendering, component system",
      "Built a multi-tenant data pipeline with automated deduplication and category mapping across 4,900+ industry categories",
      "Implemented SEO-first architecture: dynamic sitemaps, JSON-LD structured data, semantic HTML, optimized meta tags",
      "Designed scalable search with PostgreSQL full-text search, city + category compound filtering, server component rendering",
      "Created the 'Strefa Partnera': business self-registration, profile editing, photo uploads, promoted listings",
      "Performance-optimized for Core Web Vitals: lazy loading, image optimization, Prisma query tuning",
    ],
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Python", "Tailwind CSS", "Docker"],
  },
  {
    name: "AI Trainer",
    url: "https://github.com/Maciejowskii/AI-TRAINER",
    role: "Developer & ML Engineer",
    description:
      "Custom AI model for image recognition and object detection. Built as a vision backbone for automation bots and intelligent agents.",
    highlights: [
      "Developed a cascade classifier training pipeline using OpenCV: dataset collection, labeling, supervised learning",
      "Built HSV color-space filtering and edge detection modules for real-time object detection",
      "Created a real-time window capture system for live screen analysis, frame-by-frame processing",
      "Modular architecture: separate vision, filtering, and capture layers pluggable into any automation framework",
    ],
    tech: ["Python", "OpenCV", "Cascade Classifiers", "Computer Vision", "NumPy"],
  },
  {
    name: "C++ Algorithms & Data Structures",
    url: "https://github.com/Maciejowskii",
    role: "Developer",
    description:
      "A collection of 7 standalone C++ projects exploring core CS fundamentals: sorting algorithms, queue data structures, file processing, and time logic.",
    highlights: [
      "Implemented Bubble Sort, Bucket Sort, and general-purpose sorting toolkits with manual memory handling",
      "Built custom queue (FIFO) data structures: standalone and integrated with sorting for priority-based processing",
      "Developed a Linux file sorting utility using C++ I/O streams and POSIX interfaces",
      "All raw implementations (no STL sort, no external dependencies) focused on algorithmic internals",
    ],
    tech: ["C++", "Algorithms", "Data Structures", "Memory Management", "POSIX", "Linux"],
  },
];

const technicalSkills = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 / CSS3"],
  },
  {
    category: "Backend & Infrastructure",
    items: ["Node.js", "Django", "PostgreSQL", "Prisma", "Docker", "REST APIs", "Linux / VPS", "Nginx"],
  },
  {
    category: "CMS & E-commerce",
    items: ["WordPress", "Sellstick", "Custom Themes & Plugins", "Headless CMS", "WooCommerce"],
  },
  {
    category: "AI & Data",
    items: ["Python", "OpenCV", "Computer Vision", "Cascade Classifiers", "NumPy", "Data Pipelines"],
  },
  {
    category: "Analytics & Marketing Tech",
    items: ["Google Tag Manager", "Google Analytics (GA4)", "Google Ads", "Meta Ads", "Google Business", "Technical SEO"],
  },
  {
    category: "Workflow & DevOps",
    items: ["Git / GitHub", "CI/CD Pipelines", "VPS Deployment", "Performance Optimization", "Technical SEO Audits"],
  },
  {
    category: "Languages (Programming)",
    items: ["TypeScript", "JavaScript", "Python", "C++"],
  },
];

const competencies = [
  "Full-stack application architecture & development",
  "Custom website & e-commerce store delivery",
  "CMS optimization & technical debt resolution",
  "SEO strategy, audits & content writing",
  "Google Business Profile management",
  "Client consulting & relationship management",
  "Team leadership, code review & mentoring",
  "API design, integration & third-party connectivity",
  "Analytics implementation & conversion tracking",
  "Machine learning & computer vision prototyping",
  "Performance optimization (Core Web Vitals, UX)",
  "Business requirements analysis & solution design",
];

const education = [
  {
    degree: "Self-taught & Continuous Learning",
    description:
      "Practical expertise built through real-world project delivery for 30+ clients, open-source contributions, technical documentation study, and structured online learning across full-stack development, machine learning, DevOps, and digital marketing.",
  },
];

const languages = [
  { lang: "Polish", level: "Native" },
  { lang: "English", level: "Professional" },
];

/* ─── COMPONENTS ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="label-mono"
      style={{ marginBottom: "24px", color: "#a78bfa", letterSpacing: "0.2em" }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: "1px",
        background: "rgba(255,255,255,0.04)",
        margin: "56px 0",
      }}
    />
  );
}

/* ─── PAGE ─── */

export default function CVContent() {
  return (
    <div style={{ minHeight: "100vh", background: "#030303", color: "#f5f5f5" }}>
      {/* Top bar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(3,3,3,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <a
          href="/"
          style={{
            color: "#a3a3a3",
            textDecoration: "none",
            fontSize: "13px",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a3a3a3")}
        >
          ← Back to portfolio
        </a>
        <button
          onClick={() => window.print()}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "9999px",
            padding: "8px 20px",
            fontSize: "12px",
            color: "#a3a3a3",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f5f5f5";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#a3a3a3";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          Print / Save PDF
        </button>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px 128px" }}>
        {/* ── Header ── */}
        <AnimateOnScroll>
          <div style={{ marginBottom: "16px" }}>
            <h1
              className="heading-serif"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#f5f5f5", marginBottom: "12px" }}
            >
              Maciej Tyra
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#a78bfa", fontWeight: 400, marginBottom: "20px" }}>
              Full-Stack Developer · CTO & Co-Founder at Digitay.pl
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", fontSize: "13px", color: "#737373" }}>
              <span>Poland</span>
              <a
                href="mailto:m.tyra@digitay.pl"
                style={{ color: "#737373", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d4d4d4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#737373")}
              >
                m.tyra@digitay.pl
              </a>
              <a
                href="https://digitay.pl"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#737373", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d4d4d4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#737373")}
              >
                digitay.pl
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        <Divider />

        {/* ── Summary ── */}
        <AnimateOnScroll delay={0.05}>
          <SectionLabel>Profile</SectionLabel>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#d4d4d4", fontWeight: 300, marginBottom: "16px" }}>
            Full-stack developer and technical leader with hands-on experience
            building modern web applications, e-commerce stores, business
            websites, AI/ML prototypes, and marketing tech systems. As CTO &
            Co-Founder of Digitay.pl, I lead a team serving 30+ active clients
            and manage everything from architecture and development to SEO
            strategy, client consulting, and team coordination.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#a3a3a3", fontWeight: 300 }}>
            I merge clean engineering with product thinking, performance
            awareness, and business understanding. I deliver solutions across
            Next.js, Django, WordPress, and Python that are technically sound
            and designed to produce real, measurable outcomes.
          </p>
        </AnimateOnScroll>

        <Divider />

        {/* ── Experience ── */}
        <AnimateOnScroll delay={0.1}>
          <SectionLabel>Experience</SectionLabel>
          {experience.map((exp) => (
            <div key={exp.company} style={{ marginBottom: "40px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#f5f5f5" }}>
                  {exp.role}
                </h3>
                <span className="label-mono" style={{ color: "#525252" }}>
                  {exp.period}
                </span>
              </div>
              <a
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "14px",
                  color: "#a78bfa",
                  textDecoration: "none",
                  display: "inline-block",
                  marginBottom: "16px",
                }}
              >
                {exp.company} ↗
              </a>
              <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#a3a3a3", fontWeight: 300, marginBottom: "20px" }}>
                {exp.description}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {exp.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "13px",
                      lineHeight: 1.7,
                      color: "#a3a3a3",
                      fontWeight: 300,
                      paddingLeft: "20px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "8px",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#8B5CF6",
                        opacity: 0.5,
                      }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </AnimateOnScroll>

        <Divider />

        {/* ── Key Projects ── */}
        <AnimateOnScroll delay={0.12}>
          <SectionLabel>Key Projects</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {keyProjects.map((proj) => (
              <div
                key={proj.name}
                style={{
                  padding: "28px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f5f5f5" }}>
                    {proj.name}
                  </h3>
                  <span style={{ fontSize: "12px", color: "#525252", fontFamily: "var(--font-jetbrains), monospace" }}>
                    {proj.role}
                  </span>
                </div>
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "13px", color: "#a78bfa", textDecoration: "none", display: "inline-block", marginBottom: "12px" }}
                >
                  {proj.url.replace("https://", "").replace("www.", "")} ↗
                </a>
                <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#a3a3a3", fontWeight: 300, marginBottom: "16px" }}>
                  {proj.description}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                  {proj.highlights.map((h, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: "12px",
                        lineHeight: 1.65,
                        color: "#737373",
                        fontWeight: 300,
                        paddingLeft: "16px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "6px",
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: "#06B6D4",
                          opacity: 0.4,
                        }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "10px",
                        fontFamily: "var(--font-jetbrains), monospace",
                        color: "#525252",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <Divider />

        {/* ── Technical Skills ── */}
        <AnimateOnScroll delay={0.15}>
          <SectionLabel>Technical Skills</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {technicalSkills.map((group) => (
              <div key={group.category}>
                <p style={{ fontSize: "13px", color: "#737373", fontWeight: 500, marginBottom: "10px" }}>
                  {group.category}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: "6px 16px",
                        borderRadius: "9999px",
                        fontSize: "12px",
                        color: "#d4d4d4",
                        border: "1px solid rgba(255,255,255,0.06)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <Divider />

        {/* ── Core Competencies ── */}
        <AnimateOnScroll delay={0.2}>
          <SectionLabel>Core Competencies</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {competencies.map((c, i) => (
              <div
                key={i}
                style={{
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "#a3a3a3",
                  fontWeight: 300,
                  paddingLeft: "16px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "7px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#06B6D4",
                    opacity: 0.5,
                  }}
                />
                {c}
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <Divider />

        {/* ── Education ── */}
        <AnimateOnScroll delay={0.25}>
          <SectionLabel>Education</SectionLabel>
          {education.map((edu) => (
            <div key={edu.degree}>
              <h3 style={{ fontSize: "1rem", fontWeight: 500, color: "#f5f5f5", marginBottom: "8px" }}>
                {edu.degree}
              </h3>
              <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#a3a3a3", fontWeight: 300 }}>
                {edu.description}
              </p>
            </div>
          ))}
        </AnimateOnScroll>

        <Divider />

        {/* ── Languages ── */}
        <AnimateOnScroll delay={0.3}>
          <SectionLabel>Languages</SectionLabel>
          <div style={{ display: "flex", gap: "32px" }}>
            {languages.map((l) => (
              <div key={l.lang}>
                <p style={{ fontSize: "15px", color: "#f5f5f5", fontWeight: 500, marginBottom: "2px" }}>
                  {l.lang}
                </p>
                <p style={{ fontSize: "13px", color: "#737373", fontWeight: 300 }}>
                  {l.level}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <Divider />

        {/* ── Contact ── */}
        <AnimateOnScroll delay={0.35}>
          <SectionLabel>Contact</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
            {[
              { label: "Email", value: "m.tyra@digitay.pl", href: "mailto:m.tyra@digitay.pl" },
              { label: "Website", value: "digitay.pl", href: "https://digitay.pl" },
              { label: "LinkedIn", value: "linkedin.com/in/maciejtyra", href: "https://www.linkedin.com/in/maciejtyra/" },
              { label: "GitHub", value: "github.com/Maciejowskii", href: "https://github.com/Maciejowskii" },
            ].map((c) => (
              <div key={c.label}>
                <p className="label-mono" style={{ color: "#404040", marginBottom: "4px" }}>
                  {c.label}
                </p>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontSize: "13px",
                    color: "#a3a3a3",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#a3a3a3")}
                >
                  {c.value}
                </a>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </main>
    </div>
  );
}
