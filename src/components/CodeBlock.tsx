"use client";

import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const lines = [
  { text: 'import { NextResponse } from "next/server";', colors: [{ match: "import", c: "#8B5CF6" }, { match: "from", c: "#8B5CF6" }, { match: '"next/server"', c: "#10B981" }] },
  { text: 'import { db } from "@/lib/database";', colors: [{ match: "import", c: "#8B5CF6" }, { match: "from", c: "#8B5CF6" }, { match: '"@/lib/database"', c: "#10B981" }] },
  { text: 'import { validateRequest } from "@/lib/auth";', colors: [{ match: "import", c: "#8B5CF6" }, { match: "from", c: "#8B5CF6" }, { match: '"@/lib/auth"', c: "#10B981" }] },
  { text: 'import { cache } from "@/lib/redis";', colors: [{ match: "import", c: "#8B5CF6" }, { match: "from", c: "#8B5CF6" }, { match: '"@/lib/redis"', c: "#10B981" }] },
  { text: "" },
  { text: "// Analytics-enriched API endpoint", isComment: true },
  { text: "export async function GET(request: Request) {", colors: [{ match: "export", c: "#8B5CF6" }, { match: "async", c: "#8B5CF6" }, { match: "function", c: "#8B5CF6" }, { match: "GET", c: "#06B6D4" }, { match: "Request", c: "#06B6D4" }] },
  { text: "  const session = await validateRequest(request);", colors: [{ match: "const", c: "#8B5CF6" }, { match: "await", c: "#8B5CF6" }, { match: "session", c: "#06B6D4" }] },
  { text: "" },
  { text: "  if (!session.valid) {", colors: [{ match: "if", c: "#8B5CF6" }] },
  { text: '    return NextResponse.json(', colors: [{ match: "return", c: "#8B5CF6" }, { match: "NextResponse", c: "#06B6D4" }] },
  { text: '      { error: "Unauthorized" },', colors: [{ match: '"Unauthorized"', c: "#10B981" }] },
  { text: "      { status: 401 }", colors: [{ match: "401", c: "#f59e0b" }] },
  { text: "    );" },
  { text: "  }" },
  { text: "" },
  { text: "  const metrics = await db.query(`", colors: [{ match: "const", c: "#8B5CF6" }, { match: "await", c: "#8B5CF6" }, { match: "metrics", c: "#06B6D4" }, { match: "db", c: "#06B6D4" }] },
  { text: "    SELECT COUNT(*) as total_views,", colors: [{ match: "SELECT", c: "#8B5CF6" }, { match: "COUNT", c: "#06B6D4" }] },
  { text: "    AVG(load_time) as avg_performance", colors: [{ match: "AVG", c: "#06B6D4" }] },
  { text: "    FROM analytics", colors: [{ match: "FROM", c: "#8B5CF6" }] },
  { text: "    WHERE user_id = $1", colors: [{ match: "WHERE", c: "#8B5CF6" }] },
  { text: '  `, [session.userId]);' },
  { text: "" },
  { text: "  return NextResponse.json({", colors: [{ match: "return", c: "#8B5CF6" }, { match: "NextResponse", c: "#06B6D4" }] },
  { text: "    data: metrics," },
  { text: "    timestamp: new Date().toISOString()", colors: [{ match: "new", c: "#8B5CF6" }, { match: "Date", c: "#06B6D4" }] },
  { text: "  });" },
  { text: "}" },
];

function colorize(line: typeof lines[0]) {
  if (line.isComment) return <span style={{ color: "#404040" }}>{line.text}</span>;
  if (!line.colors) return <span style={{ color: "#d4d4d4" }}>{line.text}</span>;

  let result = line.text;
  const segments: { text: string; color: string }[] = [];
  let remaining = result;

  const sorted = [...line.colors].sort((a, b) => remaining.indexOf(a.match) - remaining.indexOf(b.match));

  for (const { match, c } of sorted) {
    const idx = remaining.indexOf(match);
    if (idx === -1) continue;
    if (idx > 0) segments.push({ text: remaining.substring(0, idx), color: "#d4d4d4" });
    segments.push({ text: match, color: c });
    remaining = remaining.substring(idx + match.length);
  }
  if (remaining) segments.push({ text: remaining, color: "#d4d4d4" });

  return (
    <>
      {segments.map((s, i) => (
        <span key={i} style={{ color: s.color }}>{s.text}</span>
      ))}
    </>
  );
}

export default function CodeBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(lines.map((l) => l.text).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section-pad" style={{ padding: "128px 24px", position: "relative" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <AnimateOnScroll>
          <p className="label-mono" style={{ marginBottom: "16px", textAlign: "center", color: "#a78bfa" }}>
            Code Quality
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <h2
            className="heading-serif"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", textAlign: "center", marginBottom: "64px", color: "#f5f5f5" }}
          >
            Clean code, <span style={{ color: "#a3a3a3" }}>real engineering</span>
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div
            style={{
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(8,8,8,0.9)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Toolbar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444", opacity: 0.7 }} />
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308", opacity: 0.7 }} />
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e", opacity: 0.7 }} />
                </div>
                <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "12px", color: "#525252" }}>
                  api/dashboard/route.ts
                </span>
              </div>
              <button
                onClick={handleCopy}
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "11px",
                  color: "#525252",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  padding: "4px 8px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a3a3a3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#525252")}
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>

            {/* Code */}
            <div className="no-scrollbar code-block-pad" style={{ padding: "24px", overflowX: "auto" }}>
              <pre style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: "13px", lineHeight: 1.8, margin: 0 }}>
                {lines.map((line, i) => (
                  <div key={i} style={{ minHeight: "1.8em" }}>
                    <span style={{ display: "inline-block", width: "32px", textAlign: "right", marginRight: "20px", color: "#2a2a2a", fontSize: "12px", userSelect: "none" }}>
                      {i + 1}
                    </span>
                    {colorize(line)}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
