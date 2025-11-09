// pages/api/og.js
// Dynamic OG image for Base Wallet Screener (uses @vercel/og)

import { ImageResponse } from "@vercel/og";
import { getBaseUrl, shortAddr } from "../../lib/utils.js";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const textParam = searchParams.get("text");
    const addrParam = searchParams.get("address");

    const title = addrParam
      ? `Base Wallet: ${shortAddr(addrParam)}`
      : textParam || "Base Wallet Screener";

    const base = getBaseUrl(req);
    const bg = `${base}/frame_v2.png`;

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 42,
            color: "white",
            background: `url(${bg}) center/cover`,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textShadow: "0 3px 6px rgba(0,0,0,0.5)",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <p style={{ fontSize: 72, fontWeight: 700, marginBottom: 20 }}>
            🧠 Base Wallet Screener
          </p>
          <p style={{ fontSize: 44, opacity: 0.9 }}>{title}</p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    console.error("OG generation error:", err.message);
    return new Response("OG image generation failed", { status: 500 });
  }
}
