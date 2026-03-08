"use client";

import AnimateOnScroll from "./AnimateOnScroll";

const projects = [
  {
    title: "Nexus Dashboard",
    category: "SaaS Dashboard",
    description:
      "Real-time analytics dashboard for a fintech startup. Built with performance-first architecture, handling high-volume data with sub-100ms response times.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    metric: "50K+ daily users",
    accent: "#8B5CF6",
  },
  {
    title: "Meridian Group",
    category: "Company Website",
    description:
      "Premium corporate website for a consulting firm. Conversion-optimized landing architecture with integrated lead capture, CRM sync, and analytics tracking.",
    tech: ["Next.js", "Tailwind CSS", "Headless CMS", "GTM"],
    metric: "3.2x conversion lift",
    accent: "#06B6D4",
  },
  {
    title: "LeadFlow Engine",
    category: "Lead Generation Platform",
    description:
      "Multi-funnel lead generation system with dynamic form logic, A/B testing infrastructure, and automated qualification workflows.",
    tech: ["React", "Node.js", "REST API", "Google Ads"],
    metric: "12K leads/month",
    accent: "#8B5CF6",
  },
  {
    title: "Artisan Commerce",
    category: "Headless E-commerce",
    description:
      "Headless e-commerce platform with custom product configurator, real-time inventory sync, and SSG for 2000+ product pages.",
    tech: ["Next.js", "TypeScript", "GraphQL", "Vercel"],
    metric: "98 Lighthouse score",
    accent: "#06B6D4",
  },
  {
    title: "Vertex Solutions",
    category: "Custom WordPress",
    description:
      "Custom WordPress ecosystem with component-based theme architecture, advanced ACF layouts, and marketing tech integration.",
    tech: ["WordPress", "PHP", "Custom Theme", "SEO"],
    metric: "Top 3 local rankings",
    accent: "#10B981",
  },
  {
    title: "OpsPilot",
    category: "Internal Business Tool",
    description:
      "Internal operations platform streamlining project management, time tracking, and client invoicing with role-based dashboards.",
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    metric: "40% faster ops",
    accent: "#8B5CF6",
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "128px 24px", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <AnimateOnScroll>
          <p className="label-mono" style={{ marginBottom: "16px", textAlign: "center", color: "#a78bfa" }}>
            Selected Work
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <h2
            className="heading-serif"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", textAlign: "center", marginBottom: "64px", color: "#f5f5f5" }}
          >
            Projects that <span style={{ color: "#a3a3a3" }}>deliver results</span>
          </h2>
        </AnimateOnScroll>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "20px" }}>
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.title} delay={0.12 + i * 0.07}>
              <article
                className="glass-card"
                style={{
                  borderRadius: "24px",
                  padding: "36px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = `0 0 60px -15px ${project.accent}25`;
                  e.currentTarget.style.borderColor = `${project.accent}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "8px" }}>
                  <span className="label-mono" style={{ color: project.accent }}>
                    {project.category}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "var(--font-jetbrains), monospace",
                      color: "#10B981",
                      background: "rgba(16,185,129,0.08)",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(16,185,129,0.15)",
                    }}
                  >
                    {project.metric}
                  </span>
                </div>

                <h3
                  className="heading-serif"
                  style={{ fontSize: "1.6rem", marginBottom: "16px", color: "#f5f5f5" }}
                >
                  {project.title}
                </h3>

                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#a3a3a3", fontWeight: 300, marginBottom: "24px", flex: 1 }}>
                  {project.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "11px",
                        fontFamily: "var(--font-jetbrains), monospace",
                        color: "#737373",
                        background: "rgba(255,255,255,0.04)",
                        padding: "6px 14px",
                        borderRadius: "9999px",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span
                  style={{
                    alignSelf: "flex-start",
                    fontSize: "13px",
                    color: "#a3a3a3",
                    borderBottom: "1px solid #404040",
                    paddingBottom: "2px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f5f5f5";
                    e.currentTarget.style.borderColor = "#a3a3a3";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#a3a3a3";
                    e.currentTarget.style.borderColor = "#404040";
                  }}
                >
                  View case study →
                </span>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
