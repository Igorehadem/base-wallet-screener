// pages/api/frame-input.js
// Entry frame with text input (vNext compatible)

import { buildFrameMeta, frameUrl } from "@/lib/meta";
import { log } from "@/lib/logger";

export default async function handler(req, res) {
  try {
    const base = frameUrl(req);
    const image = `${base.replace("/api/frame-input", "")}/api/og?text=Enter%20wallet%20address`;

    const html = buildFrameMeta({
      title: "Base Wallet Screener",
      description: "Enter any Base address to view onchain stats",
      image,
      postUrl: `${base.replace("/api/frame-input", "")}/api/frame`,
      buttons: ["View Stats"],
      inputText: "Paste Base address",
    });

    log.success("Frame-input rendered successfully");
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (err) {
    log.error("Frame-input render failed:", err.message);
    res.status(500).send("Frame input generation failed");
  }
}
