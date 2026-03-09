"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostData {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  language: string;
  status: string;
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
  coverImage: string;
  tags: string[];
}

const EMPTY_POST: PostData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  language: "pl",
  status: "draft",
  publishedAt: "",
  metaTitle: "",
  metaDescription: "",
  coverImage: "",
  tags: [],
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ąàáâãäå]/g, "a")
    .replace(/[ćçč]/g, "c")
    .replace(/[ęèéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[łľ]/g, "l")
    .replace(/[ńñ]/g, "n")
    .replace(/[óòôõö]/g, "o")
    .replace(/[śšş]/g, "s")
    .replace(/[ùúûü]/g, "u")
    .replace(/[żźž]/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#f5f5f5",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box" as const,
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontFamily: "var(--font-jetbrains), monospace",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#737373",
  marginBottom: "6px",
  display: "block",
};

interface TagWithCount {
  tag: string;
  count: number;
}

export default function PostEditor({ postId }: { postId?: number }) {
  const [post, setPost] = useState<PostData>(EMPTY_POST);
  const [tagInput, setTagInput] = useState("");
  const [existingTags, setExistingTags] = useState<TagWithCount[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [slugManual, setSlugManual] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/tags")
      .then((r) => r.ok ? r.json() : [])
      .then(setExistingTags)
      .catch(() => setExistingTags([]));
  }, []);

  const tagSuggestions = tagInput.trim().length >= 2
    ? existingTags.filter(
        ({ tag }) =>
          tag.toLowerCase().includes(tagInput.trim().toLowerCase()) &&
          !post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      ).slice(0, 8)
    : [];

  const loadPost = useCallback(async () => {
    if (!postId) return;
    const res = await fetch(`/api/posts/${postId}`);
    if (!res.ok) return;
    const data = await res.json();
    setPost({
      ...data,
      publishedAt: data.publishedAt
        ? new Date(data.publishedAt).toISOString().slice(0, 16)
        : "",
      tags: JSON.parse(data.tags || "[]"),
    });
    setSlugManual(true);
  }, [postId]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  function handleChange(field: keyof PostData, value: string) {
    setPost((p) => {
      const updated = { ...p, [field]: value };
      if (field === "title" && !slugManual) {
        updated.slug = slugify(value);
      }
      return updated;
    });
  }

  function addTag(suggestedTag?: string) {
    const tag = (suggestedTag ?? tagInput.trim()).trim();
    const exists = post.tags.some((t) => t.toLowerCase() === tag.toLowerCase());
    if (tag && !exists) {
      setPost((p) => ({ ...p, tags: [...p.tags, tag] }));
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setPost((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));
  }

  async function handleSave() {
    setError("");
    setSaving(true);

    const body = {
      ...post,
      publishedAt: post.publishedAt || null,
    };

    try {
      const url = postId ? `/api/posts/${postId}` : "/api/posts";
      const method = postId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        setSaving(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error");
      setSaving(false);
    }
  }

  async function handlePublishNow() {
    setError("");
    setSaving(true);

    const body = {
      ...post,
      status: "published",
      publishedAt: post.publishedAt || new Date().toISOString().slice(0, 16),
    };

    try {
      const url = postId ? `/api/posts/${postId}` : "/api/posts";
      const method = postId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to publish");
        setSaving(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error");
      setSaving(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#030303", color: "#f5f5f5" }}>
      {/* Header */}
      <header
        style={{
          padding: "12px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(3,3,3,0.9)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="/admin" style={{ color: "#525252", textDecoration: "none", fontSize: "12px" }}>
            ← Posts
          </a>
          <span style={{ fontSize: "14px", fontWeight: 500 }}>
            {postId ? "Edit Post" : "New Post"}
          </span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setShowPreview(!showPreview)}
            style={{
              padding: "7px 16px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: showPreview ? "rgba(139,92,246,0.15)" : "transparent",
              color: showPreview ? "#a78bfa" : "#737373",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {showPreview ? "Editor" : "Preview"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "7px 20px",
              borderRadius: "8px",
              border: "none",
              background: "rgba(255,255,255,0.06)",
              color: "#d4d4d4",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={handlePublishNow}
            disabled={saving}
            style={{
              padding: "7px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#8B5CF6",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Publish
          </button>
        </div>
      </header>

      {error && (
        <div style={{ padding: "12px 24px", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontSize: "13px" }}>
          {error}
        </div>
      )}

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px" }}>
          {/* Left: Editor */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Title */}
            <input
              value={post.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Post title..."
              style={{
                ...inputStyle,
                fontSize: "1.5rem",
                fontFamily: "'Instrument Serif', serif",
                padding: "16px 18px",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 0,
              }}
            />

            {/* Content */}
            {showPreview ? (
              <div
                className="blog-content"
                style={{
                  minHeight: "500px",
                  padding: "24px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.02)",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "#d4d4d4",
                }}
              >
                <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
              </div>
            ) : (
              <textarea
                value={post.content}
                onChange={(e) => handleChange("content", e.target.value)}
                placeholder="Write your post in Markdown..."
                style={{
                  ...inputStyle,
                  minHeight: "500px",
                  resize: "vertical",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "13px",
                  lineHeight: 1.7,
                }}
              />
            )}
          </div>

          {/* Right: Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Slug */}
            <div>
              <label style={labelStyle}>Slug</label>
              <input
                value={post.slug}
                onChange={(e) => {
                  setSlugManual(true);
                  handleChange("slug", e.target.value);
                }}
                placeholder="post-url-slug"
                style={inputStyle}
              />
            </div>

            {/* Excerpt */}
            <div>
              <label style={labelStyle}>Excerpt</label>
              <textarea
                value={post.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                placeholder="Short description for card and meta..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {/* Status */}
            <div>
              <label style={labelStyle}>Status</label>
              <select
                value={post.status}
                onChange={(e) => handleChange("status", e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="draft" style={{ background: "#1a1a1a", color: "#f5f5f5" }}>Draft</option>
                <option value="scheduled" style={{ background: "#1a1a1a", color: "#f5f5f5" }}>Scheduled</option>
                <option value="published" style={{ background: "#1a1a1a", color: "#f5f5f5" }}>Published</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label style={labelStyle}>Language</label>
              <select
                value={post.language}
                onChange={(e) => handleChange("language", e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="pl" style={{ background: "#1a1a1a", color: "#f5f5f5" }}>Polish (PL)</option>
                <option value="en" style={{ background: "#1a1a1a", color: "#f5f5f5" }}>English (EN)</option>
              </select>
            </div>

            {/* Publish date */}
            <div>
              <label style={labelStyle}>Publish Date</label>
              <input
                type="datetime-local"
                value={post.publishedAt}
                onChange={(e) => handleChange("publishedAt", e.target.value)}
                style={{ ...inputStyle, colorScheme: "dark" }}
              />
            </div>

            {/* Cover image */}
            <div>
              <label style={labelStyle}>Cover Image URL</label>
              <input
                value={post.coverImage}
                onChange={(e) => handleChange("coverImage", e.target.value)}
                placeholder="https://..."
                style={inputStyle}
              />
            </div>

            {/* Tags */}
            <div>
              <label style={labelStyle}>Tags</label>
              <div style={{ position: "relative", display: "flex", gap: "6px", marginBottom: "8px" }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Add tag... (suggestions after 2 chars)"
                    style={{ ...inputStyle, width: "100%" }}
                  />
                  {tagSuggestions.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        marginTop: "4px",
                        background: "rgba(10,10,10,0.95)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "10px",
                        zIndex: 50,
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}
                    >
                      {tagSuggestions.map(({ tag, count }) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => addTag(tag)}
                          style={{
                            display: "block",
                            width: "100%",
                            padding: "10px 14px",
                            textAlign: "left",
                            background: "none",
                            border: "none",
                            color: "#d4d4d4",
                            fontSize: "13px",
                            cursor: "pointer",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(139,92,246,0.15)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "none";
                          }}
                        >
                          {tag}
                          <span style={{ marginLeft: "8px", fontSize: "11px", color: "#525252" }}>
                            ({count})
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => addTag()}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "transparent",
                    color: "#737373",
                    fontSize: "12px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Add
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      background: "rgba(139,92,246,0.12)",
                      color: "#a78bfa",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#a78bfa",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: "14px",
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* SEO Section */}
            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.04)",
                background: "rgba(255,255,255,0.01)",
              }}
            >
              <p
                style={{
                  ...labelStyle,
                  marginBottom: "14px",
                  color: "#06B6D4",
                }}
              >
                SEO Settings
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ ...labelStyle, fontSize: "10px" }}>Meta Title</label>
                  <input
                    value={post.metaTitle}
                    onChange={(e) => handleChange("metaTitle", e.target.value)}
                    placeholder={post.title || "Custom meta title..."}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ ...labelStyle, fontSize: "10px" }}>Meta Description</label>
                  <textarea
                    value={post.metaDescription}
                    onChange={(e) => handleChange("metaDescription", e.target.value)}
                    placeholder={post.excerpt || "Custom meta description..."}
                    rows={2}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                  <p style={{ fontSize: "10px", color: "#404040", marginTop: "4px" }}>
                    {(post.metaDescription || post.excerpt).length}/160
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
