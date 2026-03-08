const items = [
  "Full-Stack Development",
  "Next.js",
  "TypeScript",
  "React",
  "WordPress",
  "SEO Architecture",
  "UI Performance",
  "API Integrations",
  "Analytics",
  "Technical SEO",
  "PostgreSQL",
  "Docker",
  "Node.js",
  "Tailwind CSS",
  "Conversion Optimization",
  "Clean Deployments",
];

function TickerItem({ text }: { text: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "24px", padding: "0 24px" }}>
      <span className="label-mono" style={{ whiteSpace: "nowrap", fontSize: "11px", letterSpacing: "0.15em" }}>
        {text}
      </span>
      <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(139,92,246,0.5)", flexShrink: 0 }} />
    </span>
  );
}

export default function Ticker() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "60px",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <div
        className="animate-ticker"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <TickerItem key={`a-${i}`} text={item} />
        ))}
        {items.map((item, i) => (
          <TickerItem key={`b-${i}`} text={item} />
        ))}
      </div>
    </div>
  );
}
