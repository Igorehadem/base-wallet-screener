// pages/api/og.js
// Safe version for Next 15 ESM + @vercel/og (no JSX)
import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

export default async function handler(req) {
  const { searchParams, origin } = new URL(req.url);
  const address =
    searchParams.get("address") ||
    "0x8ba1f109551bd432803012645ac136ddd64dba72";

  const apiUrl = `${origin}/api/stats?address=${address}`;
  let stats = null;

  try {
    const resp = await fetch(apiUrl);
    if (resp.ok) stats = await resp.json();
  } catch (_) {}

  const t = stats?.totals || {};
  const textLines = [
    "🟦 Base Wallet Screener",
    `${address.slice(0, 6)}...${address.slice(-4)}`,
    `Tx: ${t.normalTxs ?? 0} | Tokens: ${t.tokenTxs ?? 0}`,
    `Sent: ${t.sentNative ?? 0} | Recv: ${t.receivedNative ?? 0}`,
    `Gas: ${t.gasSpentNative ?? 0}`,
    "Live stats — Etherscan v2",
  ];

  // Build DOM manually (no JSX)
  return new ImageResponse(
    {
      type: "div",
      props: {
        style: {
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
        },
        children: textLines.map((line, i) => ({
          type: "p",
          key: i,
          props: {
            style: {
              fontSize: i === 0 ? 60 : i === 1 ? 38 : 28,
              margin: i === 0 ? "10px 0 0" : "4px 0",
              opacity: i > 3 ? 0.7 : 1,
            },
            children: line,
          },
        })),
      },
    },
    { width: 1024, height: 1024 }
  );
}
