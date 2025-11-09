# Base Wallet Screener

Serverless Next.js app for screening any **Base wallet** and viewing onchain stats.  
Works both as a **REST API** and **Farcaster MiniApp Frame**.

---

## Live Demo

- Web / Warpcast MiniApp:  
  https://base-wallet-screener.vercel.app/api/frame-input  
- Example API call:  
  `/api/stats?address=0x8ba1f109551bd432803012645ac136ddd64dba72`

---

## Endpoints

| Endpoint | Description |
|-----------|--------------|
| `/api/stats?address=0x...` | JSON summary of Base wallet activity |
| `/api/og?address=0x...` | Dynamic image preview for a wallet |
| `/api/frame?address=0x...` | Farcaster frame metadata |
| `/api/frame-input` | Entry frame with text input field |

---

## Example JSON

```json
{
  "network": "base",
  "address": "0x...",
  "totals": {
    "normalTxs": 42,
    "tokenTxs": 13,
    "sentNative": 0.42,
    "receivedNative": 1.09,
    "gasSpentNative": 0.0035
  },
  "time": {
    "firstTxIso": "2023-09-11T15:03:24Z",
    "lastTxIso": "2025-10-21T20:55:12Z"
  },
  "counterparties": { "uniqueCount": 17 }
}
```

---

## Environment

```
BASESCAN_API_KEY=your_etherscan_api_key_here
```

Get an API key at: https://etherscan.io/myapikey  
Base chainid = 8453.

---

## Tech Stack

- Next.js 15 (Edge Runtime)
- Vercel Serverless Functions
- Axios + Etherscan v2 API
- @vercel/og for dynamic OG images

---

## Development

```bash
npm install
npm run dev
```

---

## License

MIT © 2025 Igorehadem  
https://github.com/Igorehadem/base-wallet-screener

---

## Development Checklist

- [x] Frame endpoints working on Vercel  
- [x] Etherscan v2 stats implemented  
- [x] OG image rendering  
- [ ] Add internal tx support  
- [ ] Add USD valuation via Coingecko  
- [ ] Add activity leaderboard
