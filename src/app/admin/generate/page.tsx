"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#f5f5f5",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontFamily: "var(--font-jetbrains), monospace",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#525252",
  marginBottom: "8px",
  display: "block",
};

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [language, setLanguage] = useState("pl");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const router = useRouter();

  async function handleGenerate() {
    if (!topic.trim()) return;
    setError("");
    setLoading(true);
    setProgress("Sending topic to AI...");

    try {
      const timer = setTimeout(() => setProgress("AI is writing the article..."), 5000);
      const timer2 = setTimeout(() => setProgress("Searching for images on Pexels..."), 15000);
      const timer3 = setTimeout(() => setProgress("Almost done, saving draft..."), 25000);

      const res = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          keywords: keywords.trim() || undefined,
          language,
        }),
      });

      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Generation failed");
        setLoading(false);
        return;
      }

      const data = await res.json();
      router.push(`/admin/edit/${data.postId}`);
    } catch {
      setError("Network error — try again");
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#030303", color: "#f5f5f5" }}>
      <header
        style={{
          padding: "16px 32px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          gap: "24px",
          background: "rgba(3,3,3,0.9)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <a href="/admin" style={{ color: "#525252", textDecoration: "none", fontSize: "12px" }}>
          ← Posts
        </a>
        <h1 style={{ fontSize: "1rem", fontWeight: 600 }}>Generate with AI</h1>
      </header>

      <main style={{ maxWidth: "640px", margin: "0 auto", padding: "48px 24px" }}>
        <div
          style={{
            padding: "36px",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#737373",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            Describe the topic for your blog post. AI will generate a full, SEO-optimized article
            with images, backlinks, and meta tags. The result is saved as a draft for your review.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Topic / Title idea</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Jak zoptymalizować Core Web Vitals w Next.js — praktyczny poradnik"
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
                disabled={loading}
              />
            </div>

            <div>
              <label style={labelStyle}>SEO Keywords (optional, comma-separated)</label>
              <input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. core web vitals, next.js performance, optymalizacja strony"
                style={inputStyle}
                disabled={loading}
              />
            </div>

            <div>
              <label style={labelStyle}>Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
                disabled={loading}
              >
                <option value="pl">Polish (PL)</option>
                <option value="en">English (EN)</option>
              </select>
            </div>

            {error && (
              <p style={{ fontSize: "13px", color: "#ef4444", padding: "12px", background: "rgba(239,68,68,0.08)", borderRadius: "10px" }}>
                {error}
              </p>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              style={{
                padding: "14px 24px",
                borderRadius: "12px",
                border: "none",
                background: loading ? "rgba(139,92,246,0.3)" : "#8B5CF6",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                position: "relative",
              }}
            >
              {loading ? progress : "Generate Blog Post"}
            </button>

            {loading && (
              <p style={{ fontSize: "12px", color: "#525252", textAlign: "center" }}>
                This usually takes 20-40 seconds. Do not close this page.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
