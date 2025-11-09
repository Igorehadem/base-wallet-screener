// lib/logger.js
// Lightweight structured logger for serverless API routes

/**
 * Logs messages with timestamp and color-coded level.
 * Safe for both Vercel serverless and local Next.js dev.
 */

const useColor = process.env.NODE_ENV !== "production";

function ts() {
  return new Date().toISOString().split("T")[1].replace("Z", "");
}

function color(text, code) {
  return useColor ? `\x1b[${code}m${text}\x1b[0m` : text;
}

export const log = {
  info: (...args) => console.log(color(`[${ts()}] ℹ️`, "36"), ...args),
  warn: (...args) => console.warn(color(`[${ts()}] ⚠️`, "33"), ...args),
  error: (...args) => console.error(color(`[${ts()}] ❌`, "31"), ...args),
  success: (...args) => console.log(color(`[${ts()}] ✅`, "32"), ...args),
};

/**
 * Helper for clean JSON API responses
 */
export function sendJson(res, status, data) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data, null, 2));
}
