"use client";

const footerLinks = {
  Navigation: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#stack" },
    { label: "Process", href: "#process" },
  ],
  Services: [
    { label: "Web Applications", href: "#" },
    { label: "Business Websites", href: "#" },
    { label: "Dashboards", href: "#" },
    { label: "Integrations", href: "#" },
  ],
  Connect: [
    { label: "Email", href: "mailto:m.tyra@digitay.pl" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/maciejtyra/" },
    { label: "GitHub", href: "https://github.com/Maciejowskii" },
    { label: "Contact", href: "#contact" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        background: "#050505",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "64px",
          }}
        >
          {/* Brand */}
          <div>
            <p className="heading-serif" style={{ fontSize: "1.8rem", color: "#f5f5f5", marginBottom: "12px" }}>
              Maciej Tyra
            </p>
            <p style={{ fontSize: "13px", color: "#525252", fontWeight: 300, lineHeight: 1.6, maxWidth: "240px" }}>
              Full-stack developer & CTO at Digitay.pl. Building fast, scalable digital experiences.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="label-mono" style={{ marginBottom: "16px", color: "#525252" }}>
                {category}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        fontSize: "13px",
                        color: "#525252",
                        textDecoration: "none",
                        fontWeight: 300,
                        transition: "color 0.3s cubic-bezier(0.23,1,0.32,1)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#d4d4d4")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#525252")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "11px", color: "#404040", fontWeight: 300 }}>
            © {year} Maciej Tyra. All rights reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ position: "relative", display: "inline-flex", width: "7px", height: "7px" }}>
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
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#10B981",
                  display: "inline-flex",
                }}
              />
            </span>
            <span style={{ fontSize: "11px", color: "#525252", fontWeight: 300 }}>
              Available for new projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
