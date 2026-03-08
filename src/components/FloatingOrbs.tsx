export default function FloatingOrbs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* 
        Large pre-softened gradients instead of small blurred divs.
        The gradient itself fades to transparent over a wide area,
        so we only need minimal blur — avoids pixelation.
      */}

      {/* Top-center violet ambient */}
      <div
        className="absolute animate-float"
        style={{
          top: "-30%",
          left: "20%",
          width: "120vw",
          height: "80vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, rgba(139,92,246,0.03) 30%, transparent 65%)",
          filter: "blur(20px)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* Right cyan ambient */}
      <div
        className="absolute animate-float-slow"
        style={{
          top: "25%",
          right: "-20%",
          width: "70vw",
          height: "70vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(6,182,212,0.05) 0%, rgba(6,182,212,0.02) 35%, transparent 65%)",
          filter: "blur(15px)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* Bottom-left violet ambient */}
      <div
        className="absolute animate-float-slower"
        style={{
          bottom: "-10%",
          left: "-15%",
          width: "80vw",
          height: "60vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.05) 0%, rgba(139,92,246,0.02) 30%, transparent 60%)",
          filter: "blur(15px)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* Subtle center glow for depth */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: "100vw",
          height: "60vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.03) 0%, transparent 50%)",
          transform: "translate(-50%, -50%) translateZ(0)",
          willChange: "transform",
        }}
      />

      {/* Noise texture overlay for premium feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
