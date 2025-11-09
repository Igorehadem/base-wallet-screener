// pages/api/stats.js
// Base Wallet Screener — Etherscan v2 wrapper + analytics

import axios from "axios";
import { sendJson, log } from "@/lib/logger";
import { roundTo } from "@/lib/utils";

export default async function handler(req, res) {
  const { address } = req.query;
  const apiKey = process.env.BASESCAN_API_KEY;

  if (!address) return sendJson(res, 400, { error: "Missing address" });
  if (!/^0x[a-fA-F0-9]{40}$/.test(address))
    return sendJson(res, 400, { error: "Invalid EVM address" });
  if (!apiKey) return sendJson(res, 500, { error: "Missing BASESCAN_API_KEY" });

  try {
    const baseUrl = "https://api.etherscan.io/v2/api";
    const common = `chainid=8453&address=${address}&apikey=${apiKey}`;

    const [normal, token] = await Promise.all([
      axios.get(`${baseUrl}?module=account&action=txlist&${common}`, {
        timeout: 20000,
      }),
      axios.get(`${baseUrl}?module=account&action=tokentx&${common}`, {
        timeout: 20000,
      }),
    ]);

    const normalTxs = normal.data?.status === "1" ? normal.data.result : [];
    const tokenTxs = token.data?.status === "1" ? token.data.result : [];

    const stats = analyze(address, normalTxs, tokenTxs);
    log.success(`Analyzed wallet ${address} → ${stats.totals.normalTxs} txs`);
    return sendJson(res, 200, stats);
  } catch (err) {
    log.error("Etherscan v2 error:", err.message);
    return sendJson(res, 500, { error: "Failed to fetch or analyze wallet" });
  }
}

function analyze(address, normalTxs, tokenTxs) {
  const lower = address.toLowerCase();
  const out = {
    network: "base",
    address,
    totals: {
      normalTxs: normalTxs.length,
      tokenTxs: tokenTxs.length,
      sentNative: 0,
      receivedNative: 0,
      gasSpentNative: 0,
    },
    time: { firstTxIso: null, lastTxIso: null },
    counterparties: { uniqueCount: 0 },
  };

  if (normalTxs.length) {
    out.time.firstTxIso = new Date(
      Number(normalTxs[0].timeStamp) * 1000
    ).toISOString();
    out.time.lastTxIso = new Date(
      Number(normalTxs.at(-1).timeStamp) * 1000
    ).toISOString();
  }

  const cps = new Set();

  for (const tx of normalTxs) {
    const from = (tx.from || "").toLowerCase();
    const to = (tx.to || "").toLowerCase();
    const valEth = Number(tx.value || 0) / 1e18;
    const gas = (Number(tx.gasUsed) * Number(tx.gasPrice)) / 1e18;
    out.totals.gasSpentNative += gas;
    if (from === lower) out.totals.sentNative += valEth;
    if (to === lower) out.totals.receivedNative += valEth;
    if (from && from !== lower) cps.add(from);
    if (to && to !== lower) cps.add(to);
  }

  out.counterparties.uniqueCount = cps.size;
  out.totals.sentNative = roundTo(out.totals.sentNative);
  out.totals.receivedNative = roundTo(out.totals.receivedNative);
  out.totals.gasSpentNative = roundTo(out.totals.gasSpentNative);

  const tokens = {};
  for (const t of tokenTxs) {
    const key = (t.contractAddress || "").toLowerCase();
    const decimals = Number(t.tokenDecimal || 18);
    if (!tokens[key]) {
      tokens[key] = { symbol: t.tokenSymbol, decimals, sent: 0, received: 0 };
    }
    const amt = Number(t.value || 0) / 10 ** decimals;
    if ((t.from || "").toLowerCase() === lower) tokens[key].sent += amt;
    if ((t.to || "").toLowerCase() === lower) tokens[key].received += amt;
  }

  for (const k in tokens) {
    tokens[k].sent = roundTo(tokens[k].sent);
    tokens[k].received = roundTo(tokens[k].received);
  }

  out.tokens = tokens;
  return out;
}
