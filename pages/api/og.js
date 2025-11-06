// pages/api/og.js
// Dynamic OG image for Farcaster Frame — shows wallet stats on Base
import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "Base Wallet Screener";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0d1117, #1a1f2b)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "60px",
        }}
      >
        <h1 style={{ fontSize: 72, margin: 0 }}>🟦 Base Wallet Screener</h1>
        <p style={{ fontSize: 32, opacity: 0.8 }}>{text}</p>
        <p style={{ fontSize: 24, marginTop: 40, color: "#9ca3af" }}>
          Analyze wallet activity directly in Farcaster
        </p>
      </div>
    ),
    { width: 1024, height: 1024 }
  );
}
