// pages/api/frame.js
// Generates Farcaster Frame meta tags dynamically for Base Wallet Screener
// Comments in English (user preference)

export const config = { runtime: "edge" };

export default async function handler(req) {
  const url = new URL(req.url);
  const base = `${url.protocol}//${url.host}`;
  const address = url.searchParams.get("address") || "0x8ba1f109551bd432803012645ac136ddd64dba72"; // default Vitalik’s addr
  const apiUrl = `${base}/api/stats?address=${address}`;
  const imageUrl = `${base}/api/og?text=Wallet%20${address.slice(0, 6)}...%20Stats`;
  const buttonUrl = `${base}/api/frame`; // clicking will reload frame

  const html = `
    <html>
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <meta property="og:title" content="Base Wallet Screener" />
        <meta property="og:description" content="Check onchain activity for any Base address" />
        <meta property="og:image" content="${imageUrl}" />

        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:post_url" content="${buttonUrl}" />
        <meta property="fc:frame:button:1" content="Check Another Wallet" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:button:1:target" content="${buttonUrl}" />
      </head>
      <body>
        <h1>Base Wallet Screener</h1>
        <p>Stats for ${address}</p>
        <p>Data API: ${apiUrl}</p>
      </body>
    </html>
  `;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "no-store",
    },
  });
}
