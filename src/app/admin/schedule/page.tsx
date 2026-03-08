"use client";

import { useEffect, useState, useCallback } from "react";

interface ScheduledTopic {
  id: number;
  topic: string;
  keywords: string;
  language: string;
  scheduledAt: string;
  generated: boolean;
  postId: number | null;
  createdAt: string;
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
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: "10px",
  fontFamily: "var(--font-jetbrains), monospace",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#525252",
  marginBottom: "6px",
  display: "block",
};

export default function SchedulePage() {
  const [topics, setTopics] = useState<ScheduledTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [newTopic, setNewTopic] = useState("");
  const [newKeywords, setNewKeywords] = useState("");
  const [newLanguage, setNewLanguage] = useState("pl");
  const [newDate, setNewDate] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchTopics = useCallback(async () => {
    const res = await fetch("/api/schedule");
    const data = await res.json();
    setTopics(data.topics || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  async function handleAdd() {
    if (!newTopic.trim() || !newDate) return;
    setSaving(true);

    await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: newTopic.trim(),
        keywords: newKeywords.trim(),
        language: newLanguage,
        scheduledAt: newDate,
      }),
    });

    setNewTopic("");
    setNewKeywords("");
    setNewDate("");
    setSaving(false);
    setShowForm(false);
    fetchTopics();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this scheduled topic?")) return;

    await fetch("/api/schedule", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchTopics();
  }

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
            ← Posts
          </a>
          <h1 style={{ fontSize: "1rem", fontWeight: 600 }}>Blog Schedule</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "8px 20px",
            borderRadius: "10px",
            background: showForm ? "rgba(255,255,255,0.06)" : "#8B5CF6",
            color: showForm ? "#a3a3a3" : "#fff",
            border: "none",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {showForm ? "Cancel" : "+ Schedule Topic"}
        </button>
      </header>

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Add form */}
        {showForm && (
          <div
            style={{
              padding: "28px",
              borderRadius: "16px",
              border: "1px solid rgba(139,92,246,0.15)",
              background: "rgba(139,92,246,0.04)",
              marginBottom: "32px",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Topic</label>
                <input
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Blog post topic..."
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Keywords (optional)</label>
                <input
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  placeholder="seo, nextjs, performance"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Language</label>
                <select
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="pl">PL</option>
                  <option value="en">EN</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Scheduled Date & Time</label>
                <input
                  type="datetime-local"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  style={{ ...inputStyle, colorScheme: "dark" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  onClick={handleAdd}
                  disabled={saving || !newTopic.trim() || !newDate}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#8B5CF6",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    opacity: saving ? 0.6 : 1,
                    width: "100%",
                  }}
                >
                  {saving ? "Adding..." : "Add to Schedule"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <p style={{ textAlign: "center", color: "#525252", padding: "60px 0" }}>Loading...</p>
        ) : topics.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#404040" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "8px", color: "#737373" }}>No scheduled topics</p>
            <p style={{ fontSize: "13px" }}>
              Schedule blog topics and AI will generate them automatically at the set time.
            </p>
          </div>
        ) : (
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 100px 60px 150px 80px",
                gap: "12px",
                padding: "12px 20px",
                background: "rgba(255,255,255,0.02)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                fontSize: "10px",
                fontFamily: "var(--font-jetbrains), monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#525252",
              }}
            >
              <span>Topic</span>
              <span>Status</span>
              <span>Lang</span>
              <span>Scheduled</span>
              <span style={{ textAlign: "right" }}>Action</span>
            </div>

            {/* Rows */}
            {topics.map((t) => (
              <div
                key={t.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 60px 150px 80px",
                  gap: "12px",
                  padding: "14px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ fontSize: "13px", color: "#f5f5f5", fontWeight: 500, marginBottom: "2px" }}>
                    {t.topic}
                  </p>
                  {t.keywords && (
                    <p style={{ fontSize: "11px", color: "#404040" }}>{t.keywords}</p>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    textAlign: "center",
                    background: t.generated
                      ? "rgba(16,185,129,0.12)"
                      : "rgba(245,158,11,0.12)",
                    color: t.generated ? "#10B981" : "#f59e0b",
                  }}
                >
                  {t.generated ? "Generated" : "Pending"}
                </span>
                <span style={{ fontSize: "12px", color: "#737373", textTransform: "uppercase" }}>
                  {t.language}
                </span>
                <span style={{ fontSize: "12px", color: "#525252" }}>
                  {new Date(t.scheduledAt).toLocaleString("pl-PL", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <div style={{ textAlign: "right" }}>
                  {t.generated && t.postId ? (
                    <a
                      href={`/admin/edit/${t.postId}`}
                      style={{ fontSize: "12px", color: "#a78bfa", textDecoration: "none" }}
                    >
                      Edit post
                    </a>
                  ) : (
                    <button
                      onClick={() => handleDelete(t.id)}
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
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
