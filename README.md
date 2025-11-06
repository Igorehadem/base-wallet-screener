# 🧠 Base Wallet Screener (API)

Minimal Next.js API that fetches **Base wallet activity** via the **BaseScan API**  
and returns simple aggregated statistics — designed as a backend for a future **Farcaster MiniApp**.

---

## 🚀 Endpoint

```
GET /api/stats?address=0xYourAddress
```

### 🧩 Example Response

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

## ⚙️ Environment

Copy `.env.example` → `.env` and set your API key:

```
BASESCAN_API_KEY=your_basescan_api_key_here
```

Get a free key from 👉 [https://basescan.org/myapikey](https://basescan.org/myapikey)

---

## 🧭 Roadmap

- [ ] Add internal tx (`action=txlistinternal`)
- [ ] Detect contract interactions (`eth_getCode`)
- [ ] Add USD valuation via Coingecko API
- [ ] Add `/api/frame` for Farcaster MiniApp with OG image
- [ ] Deploy to Vercel

---

**Created by:** [Igorehadem](https://github.com/Igorehadem)  
**Network:** Base 🟦  
**Purpose:** Open analytics tool for onchain builders.
