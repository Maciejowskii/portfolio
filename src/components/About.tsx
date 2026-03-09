"use client";

import AnimateOnScroll from "./AnimateOnScroll";

const highlights = [
  { value: "CTO", label: "at Digitay.pl" },
  { value: "Full-Stack", label: "Developer" },
  { value: "5+", label: "Technologies" },
  { value: "SEO", label: "& Analytics" },
];

const skills = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker",
  "WordPress", "Tailwind CSS", "REST APIs", "Git", "Linux / VPS",
];

export default function About() {
  return (
    <section id="about" className="section-pad" style={{ padding: "128px 24px", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <AnimateOnScroll>
          <p className="label-mono" style={{ marginBottom: "16px", color: "#a78bfa" }}>
            About me
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <h2
            className="heading-serif"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", marginBottom: "56px", color: "#f5f5f5" }}
          >
            Maciej Tyra <span style={{ color: "#a3a3a3" }}>developer,<br />builder, strategist</span>
          </h2>
        </AnimateOnScroll>

        {/* Two-column layout */}
        <div className="grid-about-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", marginBottom: "64px" }}>
          {/* Left: story */}
          <div>
            <AnimateOnScroll delay={0.15}>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.85, color: "#d4d4d4", fontWeight: 300, marginBottom: "24px" }}>
                I&apos;m a full-stack developer and <strong style={{ color: "#f5f5f5", fontWeight: 500 }}>CTO & Co-Founder
                at{" "}
                <a
                  href="https://digitay.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#a78bfa", textDecoration: "none", borderBottom: "1px solid rgba(167,139,250,0.3)", paddingBottom: "1px" }}
                >
                  Digitay.pl
                </a>
                </strong>
                , where we deliver web development, SEO, and marketing
                solutions for businesses across Poland and beyond.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#a3a3a3", fontWeight: 300, marginBottom: "24px" }}>
                I work at the intersection of technology, performance, UX, and
                business goals. My approach combines clean engineering with
                product thinking. I create solutions that don&apos;t just look
                good, but deliver measurable results.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.25}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#737373", fontWeight: 300 }}>
                From architecture to deployment, from frontend polish to
                analytics implementation. I cover the full spectrum of modern
                web development with a focus on speed, scalability, and business
                impact.
              </p>
            </AnimateOnScroll>
          </div>

          {/* Right: info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <AnimateOnScroll delay={0.15}>
              <div
                className="glass-card"
                style={{ borderRadius: "16px", padding: "28px" }}
              >
                <p className="label-mono" style={{ marginBottom: "8px", color: "#525252" }}>Current Role</p>
                <p style={{ fontSize: "15px", color: "#f5f5f5", fontWeight: 500, marginBottom: "6px" }}>
                  CTO & Co-Founder
                </p>
                <p style={{ fontSize: "14px", color: "#a3a3a3", fontWeight: 300, lineHeight: 1.5 }}>
                  Digitay.pl, a digital agency specializing in web development,
                  SEO, Google Ads, and marketing automation for businesses.
                </p>
                <a
                  href="https://digitay.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "12px",
                    fontSize: "12px",
                    color: "#a78bfa",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(167,139,250,0.25)",
                    paddingBottom: "1px",
                    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#c4b5fd";
                    e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#a78bfa";
                    e.currentTarget.style.borderColor = "rgba(167,139,250,0.25)";
                  }}
                >
                  digitay.pl →
                </a>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <div
                className="glass-card"
                style={{ borderRadius: "16px", padding: "28px" }}
              >
                <p className="label-mono" style={{ marginBottom: "8px", color: "#525252" }}>Location</p>
                <p style={{ fontSize: "15px", color: "#d4d4d4", fontWeight: 400 }}>Poland</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.25}>
              <div
                className="glass-card"
                style={{ borderRadius: "16px", padding: "28px" }}
              >
                <p className="label-mono" style={{ marginBottom: "8px", color: "#525252" }}>Focus</p>
                <p style={{ fontSize: "14px", color: "#a3a3a3", fontWeight: 300, lineHeight: 1.5 }}>
                  Full-stack web apps, premium business websites, dashboards,
                  API integrations, analytics, and SEO-oriented architecture.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.3}>
              <a
                href="/cv"
                className="shiny-btn"
                style={{ alignSelf: "flex-start", marginTop: "8px" }}
              >
                <span className="shiny-btn-inner" style={{ fontSize: "13px", padding: "12px 28px" }}>
                  View full CV →
                </span>
              </a>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Stats row */}
        <AnimateOnScroll delay={0.3}>
          <div
            className="glass-card grid-stats-cols"
            style={{
              borderRadius: "20px",
              padding: "40px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px",
              textAlign: "center",
              marginBottom: "48px",
            }}
          >
            {highlights.map((h) => (
              <div key={h.label}>
                <p
                  className="heading-serif"
                  style={{ fontSize: "2rem", color: "#f5f5f5", marginBottom: "4px" }}
                >
                  {h.value}
                </p>
                <p style={{ fontSize: "12px", color: "#737373", fontWeight: 300 }}>{h.label}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Quick skills */}
        <AnimateOnScroll delay={0.35}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {skills.map((s) => (
              <span
                key={s}
                style={{
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#a3a3a3",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
                  e.currentTarget.style.color = "#d4d4d4";
                  e.currentTarget.style.background = "rgba(139,92,246,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "#a3a3a3";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
