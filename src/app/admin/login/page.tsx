"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Invalid password");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#030303",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "24px",
          padding: "48px 36px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "2rem",
            color: "#f5f5f5",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          Admin Panel
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "#737373",
            textAlign: "center",
            marginBottom: "36px",
          }}
        >
          Enter password to continue
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "#f5f5f5",
            fontSize: "14px",
            outline: "none",
            marginBottom: "16px",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p style={{ fontSize: "13px", color: "#ef4444", marginBottom: "16px", textAlign: "center" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#8B5CF6",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            transition: "all 0.3s",
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <a
          href="/"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "24px",
            fontSize: "12px",
            color: "#525252",
            textDecoration: "none",
          }}
        >
          ← Back to portfolio
        </a>
      </form>
    </div>
  );
}
