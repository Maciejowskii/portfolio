"use client";

import AnimateOnScroll from "./AnimateOnScroll";

interface Project {
  title: string;
  category: string;
  description: string;
  longDescription?: string[];
  subProjects?: { name: string; label: string; url: string }[];
  tech: string[];
  metrics?: { value: string; label: string }[];
  accent: string;
  url?: string;
  github?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    title: "Katalogo.pl",
    category: "Business Directory Platform",
    description:
      "Full-stack business directory platform and the largest verified business database in Poland with 71,000+ listed companies. Serves 250K to 300K unique visitors monthly with real-time search, category filtering, city-based geolocation, and individual business profile pages. Includes a partner zone, business self-registration, promoted listings, and an admin panel for content management.",
    longDescription: [
      "Architected the entire platform from scratch: database schema design, API layer, SSR/SSG rendering strategy, and frontend component system.",
      "Built a multi-tenant data pipeline ingesting and normalizing business data from multiple sources, with automated deduplication and category mapping across 4,900+ industry categories.",
      "Implemented SEO-first architecture with dynamic sitemap generation, structured data (JSON-LD), semantic HTML, and optimized meta tags. Result: strong organic visibility across thousands of long-tail local search queries.",
      "Designed a scalable search system with full-text PostgreSQL search, city + category compound filtering, and instant results rendering via server components.",
      "Created the 'Strefa Partnera' (Partner Zone) with business self-service: company registration, profile editing, photo uploads, and promoted listing management.",
      "Performance-optimized for Core Web Vitals: lazy loading, image optimization, efficient database queries with Prisma, and edge-ready deployment.",
    ],
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Python", "Tailwind CSS", "Docker"],
    metrics: [
      { value: "71K+", label: "Listed businesses" },
      { value: "250-300K", label: "Monthly visitors" },
      { value: "290+", label: "Git commits" },
      { value: "4,900+", label: "Industry categories" },
    ],
    accent: "#8B5CF6",
    url: "https://www.katalogo.pl",
    github: "https://github.com/Maciejowskii/projectLookUp",
    featured: true,
  },
  {
    title: "AI Trainer",
    category: "Machine Learning / Computer Vision",
    description:
      "Custom AI model development project focused on image recognition and object detection. Built and iteratively trained a machine learning model from scratch, with a pipeline for data preparation, cascade training, and HSV/edge filtering. Designed as the vision backbone for future automation bots and intelligent agents.",
    longDescription: [
      "Developed a custom cascade classifier training pipeline using OpenCV: collecting, labeling, and processing positive/negative image datasets for supervised learning.",
      "Built an HSV color-space filtering system (hsvfilter.py) enabling precise color-range isolation for real-time object detection in dynamic visual environments.",
      "Implemented an edge detection module (edgefilter.py) for contour-based feature extraction, improving model accuracy on complex backgrounds.",
      "Created a real-time window capture system (windowcapture.py) for live screen analysis. Enables the vision model to process active application windows frame by frame.",
      "Designed the architecture with modularity in mind: separate vision, filtering, and capture layers that can be plugged into any automation or bot framework.",
      "Iterated on model accuracy through multiple training rounds, tuning cascade parameters, dataset balancing, and filter thresholds to reduce false positives.",
    ],
    tech: ["Python", "OpenCV", "Cascade Classifiers", "Computer Vision", "NumPy", "Image Processing"],
    metrics: [
      { value: "100%", label: "Python codebase" },
      { value: "6", label: "Core modules" },
      { value: "Custom", label: "Trained model" },
    ],
    accent: "#10B981",
    github: "https://github.com/Maciejowskii/AI-TRAINER",
    featured: false,
  },
  {
    title: "C++ Algorithms & Data Structures",
    category: "Algorithms / Logic Engineering",
    description:
      "A collection of standalone C++ projects exploring core computer science fundamentals: sorting algorithms, queue-based data structures, file processing, and time logic. Each repo is a focused implementation of a specific algorithmic concept, built from scratch with emphasis on understanding complexity, memory management, and low-level control flow.",
    longDescription: [
      "Implemented classic sorting algorithms including Bubble Sort and Bucket Sort with manual memory handling and performance benchmarking.",
      "Built custom queue (FIFO) data structures from scratch, both standalone and integrated with sorting mechanisms for priority-based processing.",
      "Developed a Linux-targeted file sorting utility for filesystem-level data organization using C++ I/O streams and POSIX interfaces.",
      "Created a general-purpose sorting toolkit (sortcpp) consolidating multiple sorting strategies with configurable comparison functions.",
      "Designed a time-logic module handling temporal calculations, conversions, and scheduling-related operations.",
      "All projects prioritize raw implementation over library abstractions (no STL sort, no external dependencies) to deepen understanding of algorithmic internals.",
    ],
    subProjects: [
      { name: "bubbleSort", label: "Bubble Sort", url: "https://github.com/Maciejowskii/bubbleSort" },
      { name: "bucketSort", label: "Bucket Sort", url: "https://github.com/Maciejowskii/bucketSort" },
      { name: "kolejka-Cpp", label: "Queue (FIFO)", url: "https://github.com/Maciejowskii/kolejka-Cpp" },
      { name: "kolejkaSortowanie", label: "Queue + Sorting", url: "https://github.com/Maciejowskii/kolejkaSortowanie" },
      { name: "linuxSortFile", label: "Linux File Sort", url: "https://github.com/Maciejowskii/linuxSortFile" },
      { name: "sortcpp", label: "Sorting Toolkit", url: "https://github.com/Maciejowskii/sortcpp" },
      { name: "time", label: "Time Logic", url: "https://github.com/Maciejowskii/time" },
    ],
    tech: ["C++", "Algorithms", "Data Structures", "Memory Management", "POSIX", "Linux"],
    metrics: [
      { value: "7", label: "Repositories" },
      { value: "100%", label: "C++ codebase" },
      { value: "O(n)", label: "Complexity focus" },
    ],
    accent: "#f59e0b",
    github: "https://github.com/Maciejowskii",
    featured: false,
  },
  {
    title: "Digitay: Client Work & Agency Operations",
    category: "Digital Agency / CTO Role",
    description:
      "As CTO & Co-Founder at Digitay.pl, I lead end-to-end technical delivery for a growing portfolio of client projects: custom-built websites and e-commerce stores, SEO strategies, Google Business management, and ongoing performance optimization. I combine hands-on development with client consulting, team management, and strategic decision-making.",
    longDescription: [
      "Build and deliver custom websites and online stores for clients using Next.js, Django, and CMS platforms (WordPress, Sellstick). From initial architecture to production deployment.",
      "Optimize and fix existing WordPress and CMS-based e-commerce stores: page speed improvements, technical debt resolution, conversion-oriented UX changes.",
      "Plan and execute SEO strategies: technical audits, on-page optimization, keyword research, and writing SEO-friendly blog content that drives organic traffic.",
      "Create and manage Google Business Profiles for clients. Optimizing local visibility, handling reviews, and maintaining accurate business information.",
      "Consult directly with clients to understand their needs, translate business goals into technical requirements, and maintain strong long-term relationships.",
      "Manage the development team: code reviews, task delegation, sprint planning, quality assurance, and mentoring junior developers.",
      "Handle full-stack development across multiple frameworks: Next.js for performance-critical web apps, Django for backend-heavy solutions, WordPress for CMS-driven projects.",
    ],
    tech: ["Next.js", "Django", "WordPress", "Sellstick", "SEO", "Google Ads", "GTM", "GA4", "Tailwind CSS", "PostgreSQL"],
    metrics: [
      { value: "CTO", label: "Role" },
      { value: "30+", label: "Active clients" },
      { value: "Full-stack", label: "Development" },
      { value: "SEO + Ads", label: "Marketing tech" },
    ],
    accent: "#06B6D4",
    url: "https://digitay.pl",
    featured: true,
  },
];

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article
      className="glass-card"
      style={{ borderRadius: "24px", overflow: "hidden" }}
    >
      {/* Header bar */}
      <div
        className="featured-header-pad"
        style={{
          padding: "32px 36px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <span className="label-mono" style={{ color: project.accent, marginBottom: "8px", display: "block" }}>
            {project.category}
          </span>
          <h3
            className="heading-serif"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#f5f5f5", marginBottom: "4px" }}
          >
            {project.title}
          </h3>
        </div>
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "12px",
                color: "#a3a3a3",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "9999px",
                padding: "6px 16px",
                transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
                e.currentTarget.style.color = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#a3a3a3";
              }}
            >
              Live site ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "12px",
                color: "#a3a3a3",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "9999px",
                padding: "6px 16px",
                transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
                e.currentTarget.style.color = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#a3a3a3";
              }}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="featured-body-pad" style={{ padding: "24px 36px 36px" }}>
        <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#a3a3a3", fontWeight: 300, marginBottom: "32px", maxWidth: "720px" }}>
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 1 && (
          <div
            className="featured-metrics-grid"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            {project.metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <p className="heading-serif" style={{ fontSize: "1.6rem", color: "#f5f5f5", marginBottom: "4px" }}>
                  {m.value}
                </p>
                <p style={{ fontSize: "11px", color: "#737373", fontWeight: 300 }}>{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Detailed work */}
        {project.longDescription && (
          <div style={{ marginBottom: "32px" }}>
            <p className="label-mono" style={{ color: "#404040", marginBottom: "16px" }}>What I built</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {project.longDescription.map((item, i) => (
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
                      background: project.accent,
                      opacity: 0.5,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
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
      </div>
    </article>
  );
}

function CompactProject({ project }: { project: Project }) {
  return (
    <article
      className="glass-card compact-project-pad"
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
        <span className="label-mono" style={{ color: project.accent }}>{project.category}</span>
        {project.metrics?.[0] && (
          <span style={{ fontSize: "11px", fontFamily: "var(--font-jetbrains), monospace", color: "#10B981", background: "rgba(16,185,129,0.08)", padding: "4px 12px", borderRadius: "9999px", border: "1px solid rgba(16,185,129,0.15)" }}>
            {project.metrics[0].value} {project.metrics[0].label}
          </span>
        )}
      </div>

      <h3 className="heading-serif" style={{ fontSize: "1.6rem", marginBottom: "16px", color: "#f5f5f5" }}>
        {project.title}
      </h3>

      <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#a3a3a3", fontWeight: 300, marginBottom: project.subProjects ? "20px" : "24px", flex: project.subProjects ? undefined : 1 }}>
        {project.description}
      </p>

      {project.subProjects && (
        <div style={{ marginBottom: "20px", flex: 1 }}>
          <p style={{ fontSize: "10px", fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "0.15em", textTransform: "uppercase", color: "#525252", marginBottom: "10px" }}>
            Repositories
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.subProjects.map((sp) => (
              <a
                key={sp.name}
                href={sp.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-jetbrains), monospace",
                  color: "#a3a3a3",
                  background: "rgba(255,255,255,0.03)",
                  padding: "5px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${project.accent}40`;
                  e.currentTarget.style.color = "#f5f5f5";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "#a3a3a3";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                {sp.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
        {project.tech.map((t) => (
          <span key={t} style={{ fontSize: "11px", fontFamily: "var(--font-jetbrains), monospace", color: "#737373", background: "rgba(255,255,255,0.04)", padding: "6px 14px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.06)" }}>
            {t}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ alignSelf: "flex-start", fontSize: "13px", color: "#a3a3a3", textDecoration: "none", borderBottom: "1px solid #404040", paddingBottom: "2px", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#f5f5f5"; e.currentTarget.style.borderColor = "#a3a3a3"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#a3a3a3"; e.currentTarget.style.borderColor = "#404040"; }}
          >
            View project →
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ alignSelf: "flex-start", fontSize: "13px", color: "#a3a3a3", textDecoration: "none", borderBottom: "1px solid #404040", paddingBottom: "2px", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#f5f5f5"; e.currentTarget.style.borderColor = "#a3a3a3"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#a3a3a3"; e.currentTarget.style.borderColor = "#404040"; }}
          >
            GitHub →
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-pad" style={{ padding: "128px 24px", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <AnimateOnScroll>
          <p className="label-mono" style={{ marginBottom: "16px", textAlign: "center", color: "#a78bfa" }}>
            Case Studies
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <h2
            className="heading-serif"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", textAlign: "center", marginBottom: "64px", color: "#f5f5f5" }}
          >
            Real projects, <span style={{ color: "#a3a3a3" }}>real results</span>
          </h2>
        </AnimateOnScroll>

        {/* Featured projects */}
        {featured.map((project, i) => (
          <AnimateOnScroll key={project.title} delay={0.15 + i * 0.1}>
            <div style={{ marginBottom: "32px" }}>
              <FeaturedProject project={project} />
            </div>
          </AnimateOnScroll>
        ))}

        {/* Compact projects grid */}
        {rest.length > 0 && (
          <div className="grid-projects-compact" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "20px" }}>
            {rest.map((project, i) => (
              <AnimateOnScroll key={project.title} delay={0.2 + i * 0.08}>
                <CompactProject project={project} />
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
