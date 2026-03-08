"use client";

import AnimateOnScroll from "./AnimateOnScroll";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "160px 24px 80px" }}
    >
      {/* Subtle top vignette for depth */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: "40vh",
          background: "linear-gradient(to bottom, rgba(3,3,3,0.6) 0%, transparent 100%)",
        }}
      />

      <div className="relative" style={{ zIndex: 10, maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <AnimateOnScroll>
          <p className="label-mono" style={{ marginBottom: "20px", color: "#a78bfa", letterSpacing: "0.25em" }}>
            Maciej Tyra
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.08}>
          <p style={{ fontSize: "14px", color: "#737373", fontWeight: 300, marginBottom: "32px", letterSpacing: "0.04em" }}>
            Full-Stack Developer &middot; CTO & Co-Founder at{" "}
            <a
              href="https://digitay.pl"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#a78bfa", textDecoration: "none", borderBottom: "1px solid rgba(167,139,250,0.3)", paddingBottom: "1px" }}
            >
              Digitay.pl
            </a>
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <h1
            className="heading-serif"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 7rem)",
              lineHeight: 0.95,
              marginBottom: "32px",
              color: "#f5f5f5",
            }}
          >
            I build fast, scalable
            <br />
            digital experiences that
            <br />
            <span className="text-shimmer">perform with purpose</span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <p
            style={{
              maxWidth: "560px",
              margin: "0 auto 40px",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "#a3a3a3",
              fontWeight: 300,
            }}
          >
            Crafting premium web products, modern applications, and technical
            systems that merge engineering quality with measurable business outcomes.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "48px", flexWrap: "wrap" }}>
            <a href="#projects" className="shiny-btn">
              <span className="shiny-btn-inner">View projects</span>
            </a>
            <a
              href="#contact"
              style={{
                color: "#a3a3a3",
                fontSize: "14px",
                textDecoration: "none",
                borderBottom: "1px solid #404040",
                paddingBottom: "2px",
                transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
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
              Contact me
            </a>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.4}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px" }}>
              <span
                className="animate-ping"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#10B981",
                  opacity: 0.75,
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10B981",
                }}
              />
            </span>
            <span style={{ fontSize: "12px", color: "#737373", fontWeight: 300 }}>
              Available for freelance, product builds & technical partnerships
            </span>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
