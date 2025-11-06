// pages/api/frame-input.js
// Interactive Farcaster Frame: lets user enter an address

export const config = { runtime: "edge" };

export default async function handler(req) {
  const url = new URL(req.url);
  const base = `${url.protocol}//${url.host}`;
  const address = url.searchParams.get("address");

  const frameUrl = address
    ? `${base}/api/frame?address=${address}`
    : `${base}/api/frame`;

  const html = `
    <html>
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <meta property="og:title" content="Base Wallet Screener" />
        <meta property="og:description" content="Enter any Base address to view onchain stats" />
        <meta property="og:image" content="${base}/api/og?text=Enter%20wallet%20address" />

        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${base}/api/og?text=Enter%20wallet%20address" />
        <meta property="fc:frame:input:text" content="Paste Base address" />
        <meta property="fc:frame:button:1" content="Show Stats" />
        <meta property="fc:frame:button:1:action" content="post_redirect" />
        <meta property="fc:frame:button:1:target" content="${frameUrl}" />
      </head>
      <body></body>
    </html>
  `;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
