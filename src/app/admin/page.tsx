"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PenLine } from "lucide-react";

interface Post {
  id: number;
  title: string;
  slug: string;
  language: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  draft: { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" },
  scheduled: { bg: "rgba(6,182,212,0.12)", text: "#06B6D4" },
  published: { bg: "rgba(16,185,129,0.12)", text: "#10B981" },
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    const res = await fetch("/api/posts?limit=100");
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#030303", color: "#f5f5f5" }}>
      {/* Header */}
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
          <a
            href="/"
            style={{ color: "#525252", textDecoration: "none", fontSize: "12px" }}
          >
            ← Portfolio
          </a>
          <h1 style={{ fontSize: "1rem", fontWeight: 600, color: "#f5f5f5" }}>
            Blog Admin
          </h1>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="/admin/generate"
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              background: "rgba(139,92,246,0.12)",
              color: "#a78bfa",
              border: "1px solid rgba(139,92,246,0.2)",
              fontSize: "12px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            AI Generate
          </a>
          <a
            href="/admin/schedule"
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              background: "rgba(6,182,212,0.1)",
              color: "#06B6D4",
              border: "1px solid rgba(6,182,212,0.2)",
              fontSize: "12px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Schedule
          </a>
          <a
            href="/admin/tags"
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              background: "rgba(16,185,129,0.08)",
              color: "#10B981",
              border: "1px solid rgba(16,185,129,0.2)",
              fontSize: "12px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Tags
          </a>
          <a
            href="/admin/new"
            style={{
              padding: "8px 20px",
              borderRadius: "10px",
              background: "#8B5CF6",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            + New Post
          </a>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#737373",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#525252", padding: "80px 0" }}>
            Loading...
          </p>
        ) : posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "100px 0",
              color: "#525252",
            }}
          >
            <PenLine size={48} color="#525252" strokeWidth={1.2} style={{ marginBottom: "16px", margin: "0 auto 16px" }} />
            <p style={{ fontSize: "1.1rem", color: "#737373", marginBottom: "8px" }}>
              No posts yet
            </p>
            <p style={{ fontSize: "13px", marginBottom: "32px" }}>
              Create your first blog post to get started
            </p>
            <a
              href="/admin/new"
              style={{
                padding: "12px 28px",
                borderRadius: "12px",
                background: "#8B5CF6",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Create first post
            </a>
          </div>
        ) : (
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 90px 70px 140px 100px",
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
              <span>Title</span>
              <span>Status</span>
              <span>Lang</span>
              <span>Published</span>
              <span style={{ textAlign: "right" }}>Actions</span>
            </div>

            {/* Rows */}
            {posts.map((post) => {
              const sc = STATUS_COLORS[post.status] || STATUS_COLORS.draft;
              return (
                <div
                  key={post.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 90px 70px 140px 100px",
                    gap: "16px",
                    padding: "16px 24px",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    alignItems: "center",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <a
                    href={`/admin/edit/${post.id}`}
                    style={{
                      color: "#f5f5f5",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {post.title}
                  </a>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      background: sc.bg,
                      color: sc.text,
                      textAlign: "center",
                    }}
                  >
                    {post.status}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#737373",
                      textTransform: "uppercase",
                    }}
                  >
                    {post.language}
                  </span>
                  <span style={{ fontSize: "12px", color: "#525252" }}>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "n/a"}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <a
                      href={`/admin/edit/${post.id}`}
                      style={{
                        fontSize: "12px",
                        color: "#a78bfa",
                        textDecoration: "none",
                      }}
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{
                        fontSize: "12px",
                        color: "#ef4444",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
