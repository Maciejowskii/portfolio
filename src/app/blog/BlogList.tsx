"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  language: string;
  publishedAt: string | null;
  coverImage: string;
  tags: string[];
  createdAt: string;
}

interface TagWithCount {
  tag: string;
  count: number;
}

interface Props {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  currentPage: number;
  allTags: TagWithCount[];
  activeLanguage?: string;
  activeTag?: string;
}

const TOP_TAGS_LIMIT = 12;

function readingTime(excerpt: string): string {
  const words = excerpt.split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 40));
  return `${mins} min read`;
}

export default function BlogList({
  posts,
  totalPages,
  currentPage,
  allTags,
  activeLanguage,
  activeTag,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tagsExpanded, setTagsExpanded] = useState(false);

  const topTags = allTags.slice(0, TOP_TAGS_LIMIT);
  const restTags = allTags.slice(TOP_TAGS_LIMIT);
  const hasMoreTags = restTags.length > 0;

  function buildUrl(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(overrides).forEach(([key, val]) => {
      if (val) params.set(key, val);
      else params.delete(key);
    });
    params.delete("page");
    return `/blog?${params.toString()}`;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#030303", color: "#f5f5f5" }}>
      {/* Header */}
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
        <a href="/" style={{ color: "#a3a3a3", textDecoration: "none", fontSize: "13px" }}>
          ← Back to portfolio
        </a>
      </nav>

      <main className="section-pad" style={{ maxWidth: "1000px", margin: "0 auto", padding: "64px 24px 128px" }}>
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "#f5f5f5",
            marginBottom: "12px",
          }}
        >
          Blog
        </h1>
        <p style={{ fontSize: "1rem", color: "#737373", fontWeight: 300, marginBottom: "48px", maxWidth: "600px" }}>
          Thoughts on web development, SEO, performance, and building digital products.
        </p>

        {/* Filters */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "48px" }}>
          {/* Language filter */}
          <button
            onClick={() => router.push(buildUrl({ lang: undefined }))}
            style={{
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid",
              borderColor: !activeLanguage ? "#8B5CF6" : "rgba(255,255,255,0.08)",
              background: !activeLanguage ? "rgba(139,92,246,0.12)" : "transparent",
              color: !activeLanguage ? "#a78bfa" : "#737373",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            All
          </button>
          {["pl", "en"].map((lang) => (
            <button
              key={lang}
              onClick={() =>
                router.push(buildUrl({ lang: activeLanguage === lang ? undefined : lang }))
              }
              style={{
                padding: "6px 16px",
                borderRadius: "9999px",
                border: "1px solid",
                borderColor: activeLanguage === lang ? "#8B5CF6" : "rgba(255,255,255,0.08)",
                background: activeLanguage === lang ? "rgba(139,92,246,0.12)" : "transparent",
                color: activeLanguage === lang ? "#a78bfa" : "#737373",
                fontSize: "12px",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              {lang}
            </button>
          ))}

          {/* Divider */}
          {allTags.length > 0 && (
            <span style={{ width: "1px", background: "rgba(255,255,255,0.06)", margin: "0 4px" }} />
          )}

          {/* Tag filters: top by usage, expandable */}
          {topTags.map(({ tag }) => (
            <button
              key={tag}
              onClick={() =>
                router.push(buildUrl({ tag: activeTag === tag ? undefined : tag }))
              }
              style={{
                padding: "6px 14px",
                borderRadius: "9999px",
                border: "1px solid",
                borderColor: activeTag === tag ? "#06B6D4" : "rgba(255,255,255,0.06)",
                background: activeTag === tag ? "rgba(6,182,212,0.1)" : "transparent",
                color: activeTag === tag ? "#06B6D4" : "#525252",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              {tag}
            </button>
          ))}

          {hasMoreTags && (
            <>
              <button
                onClick={() => setTagsExpanded(!tagsExpanded)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "transparent",
                  color: "#737373",
                  fontSize: "11px",
                  cursor: "pointer",
                }}
              >
                {tagsExpanded ? "Mniej" : `+${restTags.length} więcej`}
              </button>
              {tagsExpanded &&
                restTags.map(({ tag }) => (
                  <button
                    key={tag}
                    onClick={() =>
                      router.push(buildUrl({ tag: activeTag === tag ? undefined : tag }))
                    }
                    style={{
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      border: "1px solid",
                      borderColor: activeTag === tag ? "#06B6D4" : "rgba(255,255,255,0.06)",
                      background: activeTag === tag ? "rgba(6,182,212,0.1)" : "transparent",
                      color: activeTag === tag ? "#06B6D4" : "#525252",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    {tag}
                  </button>
                ))}
            </>
          )}
        </div>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#404040" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "8px" }}>No posts yet</p>
            <p style={{ fontSize: "13px" }}>Check back soon for new content.</p>
          </div>
        ) : (
          <div
            className="blog-post-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {posts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
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
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)";
                    e.currentTarget.style.boxShadow = "0 0 40px -15px rgba(139,92,246,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {post.coverImage && (
                    <div
                      style={{
                        height: "180px",
                        background: `url(${post.coverImage}) center / cover no-repeat`,
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    />
                  )}
                  <div
                    style={{
                      padding: "28px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "14px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          fontFamily: "var(--font-jetbrains), monospace",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#525252",
                        }}
                      >
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("pl-PL", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                      <span style={{ color: "#2a2a2a" }}>·</span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#404040",
                          textTransform: "uppercase",
                        }}
                      >
                        {post.language}
                      </span>
                      <span style={{ color: "#2a2a2a" }}>·</span>
                      <span style={{ fontSize: "10px", color: "#404040" }}>
                        {readingTime(post.excerpt)}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "1.3rem",
                        color: "#f5f5f5",
                        marginBottom: "12px",
                        lineHeight: 1.3,
                      }}
                    >
                      {post.title}
                    </h2>

                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.7,
                        color: "#737373",
                        fontWeight: 300,
                        flex: 1,
                        marginBottom: "16px",
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {post.tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "10px",
                              padding: "3px 10px",
                              borderRadius: "9999px",
                              border: "1px solid rgba(255,255,255,0.05)",
                              color: "#525252",
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "64px",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/blog?${new URLSearchParams({
                  ...(activeLanguage ? { lang: activeLanguage } : {}),
                  ...(activeTag ? { tag: activeTag } : {}),
                  page: String(p),
                }).toString()}`}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  border: "1px solid",
                  borderColor: p === currentPage ? "#8B5CF6" : "rgba(255,255,255,0.06)",
                  background: p === currentPage ? "rgba(139,92,246,0.12)" : "transparent",
                  color: p === currentPage ? "#a78bfa" : "#525252",
                  fontSize: "13px",
                  textDecoration: "none",
                }}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
