// pages/api/stats.js
// Updated to use Etherscan API v2 (Base = chainid 8453)

import axios from "axios";

export default async function handler(req, res) {
  const { address } = req.query;
  const apiKey = process.env.BASESCAN_API_KEY;

  if (!address) return res.status(400).json({ error: "Missing address parameter" });
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return res.status(400).json({ error: "Invalid EVM address" });
  if (!apiKey) return res.status(500).json({ error: "Missing BASESCAN_API_KEY" });

  try {
    // Base network chainid = 8453
    const baseUrl = "https://api.etherscan.io/v2/api";
    const common = `chainid=8453&address=${address}&apikey=${apiKey}`;

    const normalTxUrl = `${baseUrl}?module=account&action=txlist&${common}`;
    const tokenTxUrl = `${baseUrl}?module=account&action=tokentx&${common}`;

    const [normalResp, tokenResp] = await Promise.all([
      axios.get(normalTxUrl, { timeout: 20000 }),
      axios.get(tokenTxUrl, { timeout: 20000 })
    ]);

    const normalTxs = normalResp.data?.status === "1" ? normalResp.data.result : [];
    const tokenTxs  = tokenResp.data?.status  === "1" ? tokenResp.data.result  : [];

    const stats = analyze(address, normalTxs, tokenTxs);
    return res.status(200).json(stats);
  } catch (err) {
    console.error("Etherscan v2 error:", err.message);
    return res.status(500).json({ error: "Failed to fetch data from Etherscan v2" });
  }
}

function analyze(address, normalTxs, tokenTxs) {
  const lower = address.toLowerCase();
  const toEth = (wei) => Number(wei) / 1e18;

  const out = {
    network: "base",
    address,
    totals: {
      normalTxs: normalTxs.length,
      tokenTxs: tokenTxs.length,
      sentNative: 0,
      receivedNative: 0,
      gasSpentNative: 0
    },
    time: { firstTxIso: null, lastTxIso: null },
    counterparties: { uniqueCount: 0 }
  };

  if (normalTxs.length) {
    out.time.firstTxIso = new Date(Number(normalTxs[0].timeStamp) * 1000).toISOString();
    out.time.lastTxIso  = new Date(Number(normalTxs[normalTxs.length - 1].timeStamp) * 1000).toISOString();
  }

  const cps = new Set();

  for (const tx of normalTxs) {
    const from = (tx.from || "").toLowerCase();
    const to = (tx.to || "").toLowerCase();
    const valueEth = toEth(tx.value || "0");
    const gasUsed = Number(tx.gasUsed || 0);
    const gasPrice = Number(tx.gasPrice || 0);
    out.totals.gasSpentNative += (gasUsed * gasPrice) / 1e18;

    if (from === lower) out.totals.sentNative += valueEth;
    if (to === lower) out.totals.receivedNative += valueEth;

    if (from && from !== lower) cps.add(from);
    if (to && to !== lower) cps.add(to);
  }

  out.totals.sentNative = round6(out.totals.sentNative);
  out.totals.receivedNative = round6(out.totals.receivedNative);
  out.totals.gasSpentNative = round6(out.totals.gasSpentNative);
  out.counterparties.uniqueCount = cps.size;

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
    tokens[k].sent = round6(tokens[k].sent);
    tokens[k].received = round6(tokens[k].received);
  }
  out.tokens = tokens;
  return out;
}

function round6(n) {
  return Number((n || 0).toFixed(6));
}
