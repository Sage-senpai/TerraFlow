import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TerraFlow - One Vault. Five Economies.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F141A",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(248,198,30,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#1B222B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(248,198,30,0.5)",
              border: "2px solid rgba(248,198,30,0.3)",
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 512 512"
              fill="none"
            >
              <path d="M118 158 C180 138 332 138 394 158" stroke="#F8C61E" strokeWidth="40" strokeLinecap="round"/>
              <path d="M256 158 L256 268" stroke="#F8C61E" strokeWidth="40" strokeLinecap="round"/>
              <path d="M256 268 C238 318 188 358 140 408" stroke="#F8C61E" strokeWidth="32" strokeLinecap="round"/>
              <path d="M256 268 C262 318 250 360 256 408" stroke="#F8C61E" strokeWidth="32" strokeLinecap="round"/>
              <path d="M256 268 C274 318 324 358 372 408" stroke="#F8C61E" strokeWidth="32" strokeLinecap="round"/>
            </svg>
          </div>
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#E8ECF0",
              letterSpacing: "-0.02em",
            }}
          >
            TerraFlow
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#F8C61E",
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          One Vault. Five Economies.
        </div>

        {/* Sectors */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { label: "Stable Yield", apy: "5-8%", color: "#F8C61E" },
            { label: "Active Trading", apy: "15-30%", color: "#28C76F" },
            { label: "DeFi Yield", apy: "6-12%", color: "#7B6FF0" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                padding: "12px 24px",
                borderRadius: 12,
                border: `1px solid ${s.color}40`,
                background: `${s.color}10`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.apy}</span>
              <span style={{ fontSize: 14, color: "#8F98A3", marginTop: 4 }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            display: "flex",
            gap: 8,
            alignItems: "center",
            fontSize: 14,
            color: "#4A5568",
          }}
        >
          <span>Built on Ranger Earn</span>
          <span style={{ color: "#2A3340" }}>|</span>
          <span>Drift</span>
          <span style={{ color: "#2A3340" }}>|</span>
          <span>Kamino</span>
          <span style={{ color: "#2A3340" }}>|</span>
          <span>Solana</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
