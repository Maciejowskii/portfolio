"use client";

import { useEffect, useState } from "react";

interface TagWithCount {
  tag: string;
  count: number;
}

export default function AdminTagsPage() {
  const [tags, setTags] = useState<TagWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tags")
      .then((r) => (r.ok ? r.json() : []))
      .then(setTags)
      .catch(() => setTags([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#030303", color: "#f5f5f5" }}>
      <header
        style={{
          padding: "16px 32px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(3,3,3,0.9)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <a href="/admin" style={{ color: "#525252", textDecoration: "none", fontSize: "12px" }}>
            ← Admin
          </a>
          <h1 style={{ fontSize: "1rem", fontWeight: 600, color: "#f5f5f5" }}>
            Tag vocabulary
          </h1>
        </div>
      </header>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#525252", padding: "80px 0" }}>
            Loading...
          </p>
        ) : tags.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#525252" }}>
            <p style={{ fontSize: "1rem", marginBottom: "8px" }}>No tags yet</p>
            <p style={{ fontSize: "13px" }}>
              Tags appear here once posts have been published with tags.
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                marginBottom: "32px",
                padding: "20px 24px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "16px",
              }}
            >
              <p style={{ fontSize: "11px", color: "#525252", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Summary
              </p>
              <p style={{ fontSize: "1.1rem", color: "#f5f5f5" }}>
                <strong>{tags.length}</strong> unique tags across posts. Use consistent tags when editing to keep the vocabulary manageable.
              </p>
              <p style={{ fontSize: "12px", color: "#737373", marginTop: "8px" }}>
                Tip: When adding tags in the post editor, type 2+ characters to see existing tag suggestions.
              </p>
            </div>

            <div
              style={{
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px",
                  gap: "16px",
                  padding: "14px 24px",
                  background: "rgba(255,255,255,0.02)",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  fontSize: "10px",
                  fontFamily: "var(--font-jetbrains), monospace",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#525252",
                }}
              >
                <span>Tag</span>
                <span style={{ textAlign: "right" }}>Posts</span>
              </div>

              {tags.map(({ tag, count }) => (
                <div
                  key={tag}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 80px",
                    gap: "16px",
                    padding: "14px 24px",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "14px",
                      color: "#a78bfa",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = "none";
                    }}
                  >
                    {tag}
                  </a>
                  <span style={{ fontSize: "13px", color: "#737373", textAlign: "right" }}>
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
