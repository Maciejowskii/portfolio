"use client";

import { Wrench, Zap, Link2, Globe, TrendingUp, BarChart3 } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const features = [
  {
    icon: Wrench,
    title: "Full-Stack Development",
    description:
      "End-to-end application architecture: database schema, API design, polished responsive interfaces. Building complete systems that scale with your business.",
    color: "#8B5CF6",
  },
  {
    icon: Zap,
    title: "High-Performance Frontend",
    description:
      "Pixel-perfect interfaces built with React, Next.js, and TypeScript. Optimized for Core Web Vitals, accessibility, and fluid user experience across all devices.",
    color: "#06B6D4",
  },
  {
    icon: Link2,
    title: "Backend & Integrations",
    description:
      "Robust server-side logic with Node.js, REST APIs, PostgreSQL, and Docker. Connecting systems, automating workflows, and building reliable data pipelines.",
    color: "#8B5CF6",
  },
  {
    icon: Globe,
    title: "WordPress & Custom Websites",
    description:
      "Professional business websites with custom themes, component-driven development, and conversion-focused design. Reliable, fast, and easy to manage.",
    color: "#06B6D4",
  },
  {
    icon: TrendingUp,
    title: "SEO-Conscious Architecture",
    description:
      "Technical foundations built for organic visibility. Proper meta structure, semantic HTML, performance optimization, and search-friendly architecture from day one.",
    color: "#10B981",
  },
  {
    icon: BarChart3,
    title: "Analytics & Tracking",
    description:
      "Implementation of Google Tag Manager, Google Analytics, conversion tracking, and marketing tech stack integration. Data-driven decisions from proper measurement.",
    color: "#8B5CF6",
  },
];

export default function FeatureGrid() {
  return (
    <section className="section-pad" style={{ padding: "128px 24px", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <AnimateOnScroll>
          <p className="label-mono" style={{ marginBottom: "16px", textAlign: "center", color: "#a78bfa" }}>
            Core Strengths
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <h2
            className="heading-serif"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", textAlign: "center", marginBottom: "64px", color: "#f5f5f5" }}
          >
            What I bring to <span style={{ color: "#a3a3a3" }}>every project</span>
          </h2>
        </AnimateOnScroll>

        <div
          className="grid-features-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "20px",
          }}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
            <AnimateOnScroll key={feature.title} delay={0.15 + i * 0.08}>
              <div
                className="glass-card"
                style={{
                  borderRadius: "24px",
                  padding: "40px",
                  height: "100%",
                  transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 0 60px -15px ${feature.color}30`;
                  e.currentTarget.style.borderColor = `${feature.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `${feature.color}12`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                    transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  <Icon size={24} color={feature.color} strokeWidth={1.5} />
                </div>
                <h3
                  className="heading-serif"
                  style={{ fontSize: "1.25rem", marginBottom: "12px", color: "#f5f5f5", lineHeight: 1.2 }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#a3a3a3", fontWeight: 300 }}>
                  {feature.description}
                </p>
              </div>
            </AnimateOnScroll>
          );
          })}
        </div>
      </div>
    </section>
  );
}
