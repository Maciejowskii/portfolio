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

interface RelatedPost {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string | null;
  tags: string[];
  language: string;
}

function readingTime(content: string): string {
  const words = content.split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export default function BlogPostContent({
  post,
  prev,
  next,
  relatedPosts = [],
}: {
  post: Post;
  prev: NavPost | null;
  next: NavPost | null;
  relatedPosts?: RelatedPost[];
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

        {/* Related posts — "Read more" */}
        {relatedPosts.length > 0 && (
          <>
            <div
              style={{
                height: "1px",
                background: "rgba(255,255,255,0.04)",
                margin: "64px 0",
              }}
            />

            <section>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "1.8rem",
                  color: "#f5f5f5",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                Keep reading
              </h2>
              <p style={{ fontSize: "13px", color: "#525252", marginBottom: "32px" }}>
                More articles you might find useful
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "16px",
                }}
              >
                {relatedPosts.map((rp) => (
                  <a
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                    }}
                  >
                    <article
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)";
                        e.currentTarget.style.boxShadow = "0 0 30px -10px rgba(139,92,246,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {rp.coverImage && (
                        <div
                          style={{
                            height: "140px",
                            background: `url(${rp.coverImage}) center / cover no-repeat`,
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        />
                      )}
                      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", gap: "8px", marginBottom: "10px", alignItems: "center" }}>
                          {rp.publishedAt && (
                            <span style={{ fontSize: "10px", color: "#404040", fontFamily: "var(--font-jetbrains), monospace" }}>
                              {new Date(rp.publishedAt).toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
                            </span>
                          )}
                          <span style={{ fontSize: "10px", color: "#2a2a2a" }}>·</span>
                          <span style={{ fontSize: "10px", color: "#404040", textTransform: "uppercase" }}>{rp.language}</span>
                        </div>

                        <h3
                          style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontSize: "1.1rem",
                            color: "#f5f5f5",
                            lineHeight: 1.3,
                            marginBottom: "8px",
                          }}
                        >
                          {rp.title}
                        </h3>

                        <p
                          style={{
                            fontSize: "12px",
                            lineHeight: 1.6,
                            color: "#525252",
                            fontWeight: 300,
                            flex: 1,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {rp.excerpt}
                        </p>

                        {rp.tags.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "12px" }}>
                            {rp.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  fontSize: "9px",
                                  padding: "2px 8px",
                                  borderRadius: "9999px",
                                  border: "1px solid rgba(255,255,255,0.04)",
                                  color: "#404040",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </a>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: "32px" }}>
                <a
                  href="/blog"
                  style={{
                    fontSize: "13px",
                    color: "#a78bfa",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(167,139,250,0.3)",
                    paddingBottom: "2px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#a78bfa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(167,139,250,0.3)";
                  }}
                >
                  View all posts →
                </a>
              </div>
            </section>
          </>
        )}
      </article>
    </div>
  );
}
