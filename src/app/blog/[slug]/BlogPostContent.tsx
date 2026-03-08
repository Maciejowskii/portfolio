"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  language: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  coverImage: string;
  tags: string[];
}

interface NavPost {
  title: string;
  slug: string;
}

function readingTime(content: string): string {
  const words = content.split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export default function BlogPostContent({
  post,
  prev,
  next,
}: {
  post: Post;
  prev: NavPost | null;
  next: NavPost | null;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "#030303", color: "#f5f5f5" }}>
      {/* Top nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "16px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(3,3,3,0.85)",
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/blog" style={{ color: "#a3a3a3", textDecoration: "none", fontSize: "13px" }}>
          ← All posts
        </a>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent",
              color: "#737373",
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            Copy link
          </button>
        </div>
      </nav>

      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px 128px" }}>
        {/* Header */}
        <header style={{ marginBottom: "48px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            {post.publishedAt && (
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "var(--font-jetbrains), monospace",
                  color: "#525252",
                }}
              >
                {new Date(post.publishedAt).toLocaleDateString("pl-PL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            <span style={{ color: "#2a2a2a" }}>·</span>
            <span style={{ fontSize: "12px", color: "#404040" }}>
              {readingTime(post.content)}
            </span>
            <span style={{ color: "#2a2a2a" }}>·</span>
            <span
              style={{
                fontSize: "10px",
                padding: "2px 8px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#525252",
                textTransform: "uppercase",
              }}
            >
              {post.language}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              color: "#f5f5f5",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "#737373",
                fontWeight: 300,
              }}
            >
              {post.excerpt}
            </p>
          )}

          {post.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "20px" }}>
              {post.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  style={{
                    fontSize: "11px",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#525252",
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
                    e.currentTarget.style.color = "#a78bfa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "#525252";
                  }}
                >
                  {tag}
                </a>
              ))}
            </div>
          )}
        </header>

        {post.coverImage && (
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "48px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}

        {/* Content */}
        <div className="blog-content">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>

        {/* Separator */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.04)",
            margin: "64px 0",
          }}
        />

        {/* Prev / Next */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {prev ? (
            <a
              href={`/blog/${prev.slug}`}
              style={{
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.05)",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <p style={{ fontSize: "10px", color: "#525252", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Previous
              </p>
              <p style={{ fontSize: "14px", color: "#a3a3a3" }}>{prev.title}</p>
            </a>
          ) : (
            <div />
          )}
          {next ? (
            <a
              href={`/blog/${next.slug}`}
              style={{
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.05)",
                textDecoration: "none",
                textAlign: "right",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <p style={{ fontSize: "10px", color: "#525252", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Next
              </p>
              <p style={{ fontSize: "14px", color: "#a3a3a3" }}>{next.title}</p>
            </a>
          ) : (
            <div />
          )}
        </div>
      </article>
    </div>
  );
}
