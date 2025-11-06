# 🧠 Base Wallet Screener (API + Farcaster MiniApp)

Minimal Next.js API that fetches **Base wallet activity** via the **Etherscan API v2**  
and returns aggregated statistics — designed as a backend for a **Farcaster MiniApp**.

Deployed on **Vercel**, fully serverless (Edge Runtime).

---

## ⚡ Live MiniApp

Try it directly in Warpcast or browser:

🔗 **https://base-wallet-screener.vercel.app/api/frame-input**

> Paste any Base address and get live onchain stats as a Farcaster Frame.

---

## 🚀 API Endpoints

| Endpoint | Description |
|-----------|--------------|
| `/api/stats?address=0x...` | Returns JSON summary of a Base wallet |
| `/api/og?address=0x...` | Renders dynamic OG image with wallet stats |
| `/api/frame?address=0x...` | Generates Farcaster Frame metadata |
| `/api/frame-input` | Interactive entry point (text input + button) |

---

## 🧩 Example Response

```json
{
  "network": "base",
  "address": "0x...",
  "totals": {
    "normalTxs": 42,
    "tokenTxs": 13,
    "sentNative": 0.421,
    "receivedNative": 1.093,
    "gasSpentNative": 0.0035
  },
  "time": {
    "firstTxIso": "2023-09-11T15:03:24.000Z",
    "lastTxIso": "2025-10-21T20:55:12.000Z"
  },
  "counterparties": { "uniqueCount": 17 },
  "tokens": {
    "0x...": { "symbol": "USDC", "decimals": 6, "sent": 10.5, "received": 2.0 }
  }
}
```

---

## 🖼️ OG Preview Example

Dynamic image rendered via `/api/og`:

![Base Wallet Screener Preview](https://base-wallet-screener.vercel.app/api/og?address=0x8ba1f109551bd432803012645ac136ddd64dba72)

---

## ⚙️ Environment

Copy `.env.example` → `.env` and set your API key:

```
BASESCAN_API_KEY=your_etherscan_api_key_here
```

Get a free key from 👉 https://etherscan.io/myapikey

---

## 🧭 Roadmap

- [x] Deploy to Vercel  
- [x] Add `/api/frame` for Farcaster MiniApp  
- [x] Add `/api/og` dynamic image rendering  
- [x] Add `/api/frame-input` interactive input-frame  
- [ ] Add internal tx (`action=txlistinternal`)  
- [ ] Detect contract interactions (`eth_getCode`)  
- [ ] Add USD valuation via Coingecko API  
- [ ] Add leaderboard by wallet activity  

---

## 🧠 Project Summary

**Created by:** [Igorehadem](https://github.com/Igorehadem)  
**Network:** Base 🟦  
**Purpose:** Open analytics tool for onchain builders  
**Built with:** Next.js 15, Edge Runtime, @vercel/og, Etherscan API v2  
**Deployed:** Vercel Serverless Functions

---
