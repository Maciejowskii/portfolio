"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-5 left-1/2 z-50 glass rounded-full"
        style={{
          transform: "translateX(-50%)",
          width: "min(95%, 680px)",
          transition: "box-shadow 0.6s cubic-bezier(0.23,1,0.32,1)",
          boxShadow: scrolled
            ? "0 0 40px -10px rgba(139,92,246,0.15), 0 8px 32px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-3 md:px-6">
          <a
            href="#"
            className="heading-serif text-xl tracking-tight"
            style={{
              color: "#f5f5f5",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
          >
            MT
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "#a3a3a3",
                  fontSize: "13px",
                  fontWeight: 400,
                  textDecoration: "none",
                  transition: "color 0.3s cubic-bezier(0.23,1,0.32,1)",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#a3a3a3")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact" className="shiny-btn hidden md:inline-flex">
              <span className="shiny-btn-inner" style={{ padding: "10px 24px", fontSize: "13px" }}>
                Let&apos;s work
              </span>
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10"
              aria-label="Toggle menu"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                style={{
                  display: "block",
                  width: "18px",
                  height: "1px",
                  background: "#d4d4d4",
                  transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                  transform: mobileOpen ? "rotate(45deg) translateY(3.5px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "18px",
                  height: "1px",
                  background: "#d4d4d4",
                  transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                  transform: mobileOpen ? "rotate(-45deg) translateY(-3.5px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{
            background: "rgba(3,3,3,0.95)",
            backdropFilter: "blur(24px)",
          }}
          onClick={() => setMobileOpen(false)}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="heading-serif"
              style={{
                fontSize: "2rem",
                color: "#e5e5e5",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="shiny-btn mt-4">
            <span className="shiny-btn-inner">Let&apos;s work</span>
          </a>
        </div>
      )}
    </>
  );
}
