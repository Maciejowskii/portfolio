"use client";

import AnimateOnScroll from "./AnimateOnScroll";

const categories = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
    color: "#8B5CF6",
  },
  {
    label: "Backend / Infrastructure",
    items: ["Node.js", "PostgreSQL", "Docker", "REST APIs", "Linux / VPS"],
    color: "#06B6D4",
  },
  {
    label: "CMS / Web Platforms",
    items: ["WordPress", "Custom Themes", "Headless CMS", "Component Architecture"],
    color: "#a78bfa",
  },
  {
    label: "Analytics / Marketing Tech",
    items: ["Google Tag Manager", "Google Analytics", "Meta Ads", "Google Ads", "Technical SEO"],
    color: "#22d3ee",
  },
  {
    label: "Workflow / Delivery",
    items: ["Git", "VPS Deployment", "Performance Optimization", "CI/CD", "Technical SEO Audits"],
    color: "#10B981",
  },
];

export default function TechStack() {
  return (
    <section id="stack" style={{ padding: "128px 24px", position: "relative" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <AnimateOnScroll>
          <p className="label-mono" style={{ marginBottom: "16px", textAlign: "center", color: "#a78bfa" }}>
            Technology
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <h2
            className="heading-serif"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", textAlign: "center", marginBottom: "64px", color: "#f5f5f5" }}
          >
            Tools I work <span style={{ color: "#a3a3a3" }}>with daily</span>
          </h2>
        </AnimateOnScroll>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {categories.map((cat, ci) => (
            <AnimateOnScroll key={cat.label} delay={0.15 + ci * 0.08}>
              <div
                className="glass-card"
                style={{
                  borderRadius: "20px",
                  padding: "32px",
                  transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                }}
              >
                <p className="label-mono" style={{ marginBottom: "20px", color: cat.color }}>
                  {cat.label}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "9999px",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: cat.color,
                        border: `1px solid ${cat.color}25`,
                        background: `${cat.color}08`,
                        transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${cat.color}15`;
                        e.currentTarget.style.borderColor = `${cat.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${cat.color}08`;
                        e.currentTarget.style.borderColor = `${cat.color}25`;
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
