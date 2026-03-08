"use client";

import AnimateOnScroll from "@/components/AnimateOnScroll";

/* ─── DATA ─── */

const experience = [
  {
    role: "CTO & Co-Founder",
    company: "Digitay.pl",
    url: "https://digitay.pl",
    period: "2023 — Present",
    description:
      "Leading technical strategy and development for a digital agency specializing in web development, SEO, Google Ads, and marketing automation. Responsible for architecture decisions, team coordination, client-facing technical consulting, and hands-on engineering across all projects.",
    highlights: [
      "Built and shipped production web apps, business websites, and lead-generation platforms for diverse clients",
      "Implemented SEO strategies, analytics stacks (GTM, GA4), and conversion tracking pipelines",
      "Managed end-to-end project delivery from discovery to deployment on VPS infrastructure",
      "Established technical standards, code review workflows, and CI/CD processes",
    ],
  },
];

const education = [
  {
    degree: "Self-taught & Continuous Learning",
    description:
      "Practical expertise built through real-world project delivery, technical documentation, open-source contributions, and structured online learning across full-stack development, DevOps, and digital marketing.",
  },
];

const technicalSkills = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 / CSS3"],
  },
  {
    category: "Backend & Infrastructure",
    items: ["Node.js", "PostgreSQL", "Docker", "REST APIs", "Linux / VPS", "Nginx"],
  },
  {
    category: "CMS & Web Platforms",
    items: ["WordPress", "Custom Themes & Plugins", "Headless CMS", "Component-driven Architecture"],
  },
  {
    category: "Analytics & Marketing Tech",
    items: ["Google Tag Manager", "Google Analytics (GA4)", "Google Ads", "Meta Ads", "Technical SEO"],
  },
  {
    category: "Workflow & DevOps",
    items: ["Git / GitHub", "CI/CD Pipelines", "VPS Deployment", "Performance Optimization", "Technical SEO Audits"],
  },
];

const competencies = [
  "Full-stack application architecture & development",
  "SEO-conscious web development & technical audits",
  "Conversion-focused website design & implementation",
  "API design, integration & third-party system connectivity",
  "Analytics implementation & data-driven optimization",
  "Team technical leadership & project delivery management",
  "Business requirements analysis & solution design",
  "Performance optimization (Core Web Vitals, load times, UX)",
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
              <span>📍 Poland</span>
              <a
                href="mailto:m.tyra@digitay.pl"
                style={{ color: "#737373", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d4d4d4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#737373")}
              >
                ✉ m.tyra@digitay.pl
              </a>
              <a
                href="https://digitay.pl"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#737373", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d4d4d4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#737373")}
              >
                🌐 digitay.pl
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        <Divider />

        {/* ── Summary ── */}
        <AnimateOnScroll delay={0.05}>
          <SectionLabel>Profile</SectionLabel>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#d4d4d4", fontWeight: 300, marginBottom: "16px" }}>
            Full-stack developer with hands-on experience building modern web
            applications, premium business websites, dashboards, and marketing
            tech systems. As CTO & Co-Founder of Digitay.pl, I lead technical
            strategy, architecture decisions, and end-to-end project delivery
            for a digital agency serving clients in web development, SEO, and
            paid advertising.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#a3a3a3", fontWeight: 300 }}>
            I merge clean engineering with product thinking, performance awareness,
            and business understanding — delivering solutions that are not only
            technically sound but designed to produce real outcomes.
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
