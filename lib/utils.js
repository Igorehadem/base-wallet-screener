// lib/utils.js
// Common helper utilities for Base Wallet Screener

/**
 * Return absolute base URL depending on environment.
 * Works both in local dev and Vercel.
 */
export function getBaseUrl(req) {
  try {
    const url = new URL(req?.url || "");
    return `${url.protocol}//${url.host}`;
  } catch {
    // Fallback for non-request contexts
    return process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
  }
}

/**
 * Shorten an address for display (0xABCD...1234)
 */
export function shortAddr(address, prefix = 6, suffix = 4) {
  if (!address || address.length < prefix + suffix + 2) return address || "";
  return `${address.slice(0, prefix + 2)}...${address.slice(-suffix)}`;
}

/**
 * Round a number to N decimals (default = 6)
 */
export function roundTo(n, decimals = 6) {
  const f = Math.pow(10, decimals);
  return Math.round((n + Number.EPSILON) * f) / f;
}
