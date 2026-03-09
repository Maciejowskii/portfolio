"use client";

import AnimateOnScroll from "./AnimateOnScroll";

const steps = [
  {
    number: "01",
    title: "Understand the business goal",
    description:
      "Every project starts with understanding the real objective. Not just features, but the outcome you need: revenue, leads, efficiency, growth.",
  },
  {
    number: "02",
    title: "Design the technical approach",
    description:
      "Selecting the right stack, architecture, and infrastructure based on project scope, scalability needs, and long-term maintainability.",
  },
  {
    number: "03",
    title: "Build fast and scalable",
    description:
      "Clean, modular development with modern tooling. Every component, API endpoint, and database query built for performance and reliability.",
  },
  {
    number: "04",
    title: "Optimize performance & conversions",
    description:
      "Core Web Vitals, load times, UX flows, and conversion paths. Optimized through data, testing, and continuous improvement.",
  },
  {
    number: "05",
    title: "Deploy and iterate intelligently",
    description:
      "Production-ready deployments with monitoring, analytics, and a clear path for iteration based on real user behavior.",
  },
];

export default function Experience() {
  return (
    <section id="process" className="section-pad" style={{ padding: "128px 24px", position: "relative" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <AnimateOnScroll>
          <p className="label-mono" style={{ marginBottom: "16px", textAlign: "center", color: "#a78bfa" }}>
            Process
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <h2
            className="heading-serif"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", textAlign: "center", marginBottom: "16px", color: "#f5f5f5" }}
          >
            How I deliver <span style={{ color: "#a3a3a3" }}>real value</span>
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <p style={{ maxWidth: "560px", margin: "0 auto 64px", textAlign: "center", fontSize: "1.05rem", lineHeight: 1.7, color: "#737373", fontWeight: 300 }}>
            Not just a coder. I combine product thinking, performance engineering,
            search visibility, and measurable outcomes into every project.
          </p>
        </AnimateOnScroll>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.number} delay={0.2 + i * 0.08}>
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  padding: "32px 0",
                  borderBottom: i < steps.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = "8px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = "0px";
                }}
              >
                <span
                  className="heading-serif"
                  style={{
                    fontSize: "2rem",
                    color: "rgba(139,92,246,0.2)",
                    transition: "color 0.5s",
                    flexShrink: 0,
                    width: "48px",
                    lineHeight: 1.3,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(139,92,246,0.5)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(139,92,246,0.2)")}
                >
                  {step.number}
                </span>
                <div>
                  <h3
                    className="heading-serif"
                    style={{ fontSize: "1.3rem", marginBottom: "8px", color: "#e5e5e5", lineHeight: 1.3 }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#737373", fontWeight: 300, maxWidth: "520px" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
