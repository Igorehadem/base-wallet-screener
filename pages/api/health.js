// pages/api/health.js
// Healthcheck endpoint for Base Wallet Screener

import { sendJson, log } from "@/lib/logger";
import { getBaseUrl } from "@/lib/utils";

export default async function handler(req, res) {
  const uptime = process.uptime().toFixed(1);
  const base = getBaseUrl(req);
  const data = {
    status: "ok",
    service: "base-wallet-screener",
    baseUrl: base,
    uptime_sec: uptime,
    timestamp: new Date().toISOString(),
  };

  log.info(`Healthcheck ping → ${uptime}s uptime`);
  return sendJson(res, 200, data);
}
