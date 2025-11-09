// pages/api/frame.js
// Base Wallet Screener – Farcaster Frame (vNext)

import { buildFrameMeta, frameUrl } from "../../lib/meta.js";
import { log } from "../../lib/logger.js";

export default async function handler(req, res) {
  try {
    const base = frameUrl(req);
    const image = `${base.replace("/api/frame", "")}/api/og?text=Enter%20wallet%20address`;
    const html = buildFrameMeta({
      title: "Base Wallet Screener",
      description: "Analyze Base wallet activity right inside Warpcast.",
      image,
      postUrl: `${base.replace("/api/frame", "")}/api/tx`,
      buttons: ["Summon Stats"],
      inputText: "Paste Base address",
    });

    log.info("✅ Frame meta rendered");
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (err) {
    log.error("❌ Frame build error:", err.message);
    res.status(500).send("Frame generation failed");
  }
}
