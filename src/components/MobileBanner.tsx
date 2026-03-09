"use client";

import { useState, useEffect } from "react";
import { Monitor } from "lucide-react";

export default function MobileBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wasDismissed = sessionStorage.getItem("mobile-banner-dismissed");
    if (wasDismissed) return;

    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) setVisible(true);

    const handler = (e: MediaQueryListEvent) => setVisible(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 12px 12px",
        animation: "fade-in-up 0.5s cubic-bezier(0.23,1,0.32,1) forwards",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          background: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.5), 0 0 30px -10px rgba(139,92,246,0.1)",
        }}
      >
        <Monitor size={22} color="#a78bfa" strokeWidth={1.5} style={{ flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "12px", fontWeight: 500, color: "#e5e5e5", marginBottom: "2px" }}>
            Best viewed on desktop
          </p>
          <p style={{ fontSize: "11px", color: "#737373", fontWeight: 300, lineHeight: 1.4 }}>
            For the full experience with all animations and effects, visit on a larger screen.
          </p>
        </div>
        <button
          onClick={() => {
            setDismissed(true);
            sessionStorage.setItem("mobile-banner-dismissed", "1");
          }}
          aria-label="Dismiss"
          style={{
            background: "none",
            border: "none",
            color: "#525252",
            fontSize: "18px",
            cursor: "pointer",
            flexShrink: 0,
            padding: "4px",
            lineHeight: 1,
            transition: "color 0.2s",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
