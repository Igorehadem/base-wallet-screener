// pages/api/og.js
// Dynamic OG image showing live Base wallet stats (edge-safe)
import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

export default async function handler(req) {
  const { searchParams, origin } = new URL(req.url);
  const address =
    searchParams.get("address") ||
    "0x8ba1f109551bd432803012645ac136ddd64dba72";

  // Use native fetch (axios not supported in edge runtime)
  const apiUrl = `${origin}/api/stats?address=${address}`;
  let stats = null;
  try {
    const resp = await fetch(apiUrl, { next: { revalidate: 0 } });
    if (resp.ok) stats = await resp.json();
  } catch (err) {
    console.error("Fetch failed:", err);
  }

  const t = stats?.totals || {};
  const normalTxs = t.normalTxs ?? 0;
  const tokenTxs = t.tokenTxs ?? 0;
  const sent = t.sentNative ?? 0;
  const recv = t.receivedNative ?? 0;
  const gas = t.gasSpentNative ?? 0;
  const addrShort = `${address.slice(0, 6)}...${address.slice(-4)}`;

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
          background:
            "radial-gradient(circle at center, #0d1117 0%, #0f172a 60%, #020617 100%)",
          color: "white",
          fontFamily: "monospace",
          textAlign: "center",
          padding: "60px",
        }}
      >
        <h1 style={{ fontSize: 60, marginBottom: 10 }}>🟦 Base Wallet Screener</h1>
        <p style={{ fontSize: 36, opacity: 0.8, margin: 0 }}>{addrShort}</p>
        <div style={{ marginTop: 40, fontSize: 28, lineHeight: 1.6 }}>
          <p>Tx: {normalTxs.toLocaleString()} | Tokens: {tokenTxs.toLocaleString()}</p>
          <p>Sent: {sent} | Received: {recv}</p>
          <p>Gas Spent: {gas}</p>
        </div>
        <p style={{ marginTop: 60, fontSize: 22, color: "#9ca3af" }}>
          Live stats from Base — powered by Etherscan v2
        </p>
      </div>
    ),
    { width: 1024, height: 1024 }
  );
}
