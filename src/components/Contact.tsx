"use client";

import { useState, type FormEvent } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const links = [
  { label: "Email", href: "mailto:m.tyra@digitay.pl", display: "m.tyra@digitay.pl" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/maciejtyra/", display: "linkedin.com/in/maciejtyra" },
  { label: "GitHub", href: "https://github.com/Maciejowskii", display: "github.com/Maciejowskii" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  fontSize: "14px",
  fontWeight: 300,
  color: "#f5f5f5",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  outline: "none",
  transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
  fontFamily: "inherit",
};

const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
  e.currentTarget.style.boxShadow = "0 0 20px -8px rgba(139,92,246,0.15)";
};

const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
  e.currentTarget.style.boxShadow = "none";
};

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const budget = data.get("budget") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBudget: ${budget}\n\n${message}`
    );

    window.location.href = `mailto:m.tyra@digitay.pl?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    }, 500);
  };

  return (
    <section id="contact" className="section-pad" style={{ padding: "128px 24px", position: "relative" }}>
{/* WebGL background handles ambient glow */}

      <div style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <AnimateOnScroll>
            <p className="label-mono" style={{ marginBottom: "16px", color: "#a78bfa" }}>
              Contact
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <h2
              className="heading-serif"
              style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", marginBottom: "24px", color: "#f5f5f5" }}
            >
              Let&apos;s build something
              <br />
              <span className="text-shimmer">remarkable together</span>
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <p style={{ maxWidth: "480px", margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.7, color: "#a3a3a3", fontWeight: 300 }}>
              Have a project in mind, need a technical partner, or want to explore
              a collaboration? Send me a message.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Two-column: form + sidebar */}
        <div className="grid-contact-cols" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "48px", alignItems: "start" }}>
          {/* Form */}
          <AnimateOnScroll delay={0.25}>
            <form
              onSubmit={handleSubmit}
              className="glass-card"
              style={{ borderRadius: "24px", padding: "40px" }}
            >
              <div className="grid-contact-form-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label
                    htmlFor="name"
                    style={{ display: "block", fontSize: "12px", color: "#525252", marginBottom: "8px", fontWeight: 500, letterSpacing: "0.05em" }}
                  >
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    style={{ display: "block", fontSize: "12px", color: "#525252", marginBottom: "8px", fontWeight: 500, letterSpacing: "0.05em" }}
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  htmlFor="budget"
                  style={{ display: "block", fontSize: "12px", color: "#525252", marginBottom: "8px", fontWeight: 500, letterSpacing: "0.05em" }}
                >
                  Budget range
                </label>
                <select
                  id="budget"
                  name="budget"
                  style={{ ...inputStyle, cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                  onFocus={inputFocusHandler}
                  onBlur={inputBlurHandler}
                  defaultValue=""
                >
                  <option value="" disabled style={{ background: "#0a0a0a" }}>Select a range</option>
                  <option value="< 5 000 PLN" style={{ background: "#0a0a0a" }}>&lt; 5 000 PLN</option>
                  <option value="5 000 – 15 000 PLN" style={{ background: "#0a0a0a" }}>5 000 – 15 000 PLN</option>
                  <option value="15 000 – 30 000 PLN" style={{ background: "#0a0a0a" }}>15 000 – 30 000 PLN</option>
                  <option value="30 000 – 60 000 PLN" style={{ background: "#0a0a0a" }}>30 000 – 60 000 PLN</option>
                  <option value="60 000+ PLN" style={{ background: "#0a0a0a" }}>60 000+ PLN</option>
                  <option value="To be discussed" style={{ background: "#0a0a0a" }}>To be discussed</option>
                </select>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  htmlFor="message"
                  style={{ display: "block", fontSize: "12px", color: "#525252", marginBottom: "8px", fontWeight: 500, letterSpacing: "0.05em" }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project — goals, timeline, any specific requirements..."
                  style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                  onFocus={inputFocusHandler}
                  onBlur={inputBlurHandler}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="shiny-btn"
                style={{ width: "100%", cursor: status === "sending" ? "wait" : "pointer" }}
              >
                <span
                  className="shiny-btn-inner"
                  style={{
                    width: "100%",
                    display: "block",
                    textAlign: "center",
                    padding: "14px 32px",
                  }}
                >
                  {status === "sending"
                    ? "Opening mail client..."
                    : status === "sent"
                      ? "✓ Message prepared!"
                      : "Send message"}
                </span>
              </button>

              {status === "sent" && (
                <p style={{ textAlign: "center", fontSize: "13px", color: "#10B981", marginTop: "16px", fontWeight: 300 }}>
                  Your mail client should have opened with the message. You can also write directly to m.tyra@digitay.pl
                </p>
              )}
            </form>
          </AnimateOnScroll>

          {/* Sidebar */}
          <AnimateOnScroll delay={0.35}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Direct email card */}
              <div
                className="glass-card"
                style={{ borderRadius: "20px", padding: "28px" }}
              >
                <p className="label-mono" style={{ marginBottom: "12px", color: "#525252" }}>
                  Prefer email directly?
                </p>
                <a
                  href="mailto:m.tyra@digitay.pl"
                  style={{
                    fontSize: "14px",
                    color: "#a78bfa",
                    textDecoration: "none",
                    fontWeight: 400,
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5fd")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#a78bfa")}
                >
                  m.tyra@digitay.pl
                </a>
              </div>

              {/* Social links */}
              <div
                className="glass-card"
                style={{ borderRadius: "20px", padding: "28px" }}
              >
                <p className="label-mono" style={{ marginBottom: "16px", color: "#525252" }}>
                  Find me online
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "13px",
                        color: "#737373",
                        textDecoration: "none",
                        transition: "color 0.3s cubic-bezier(0.23,1,0.32,1)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#e5e5e5")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#737373")}
                    >
                      <span style={{ fontWeight: 400 }}>{link.label}</span>
                      <span style={{ fontSize: "12px" }}>→</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div
                className="glass-card"
                style={{ borderRadius: "20px", padding: "28px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ position: "relative", display: "inline-flex", width: "7px", height: "7px" }}>
                    <span
                      className="animate-ping"
                      style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#10B981", opacity: 0.75 }}
                    />
                    <span style={{ position: "relative", width: "7px", height: "7px", borderRadius: "50%", background: "#10B981", display: "inline-flex" }} />
                  </span>
                  <p className="label-mono" style={{ color: "#525252" }}>
                    Response time
                  </p>
                </div>
                <p style={{ fontSize: "14px", color: "#d4d4d4", fontWeight: 400 }}>
                  Usually within 24 hours
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
