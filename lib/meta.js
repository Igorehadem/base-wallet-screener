// lib/meta.js
// Centralized metadata builder for Farcaster Frames (vNext compatible)

import { getBaseUrl } from "@/lib/utils";

/**
 * Builds HTML with meta tags recognized by Warpcast (vNext spec)
 * @param {object} opts
 * @param {string} opts.title - OG and Frame title
 * @param {string} opts.description - Optional meta description
 * @param {string} opts.image - Absolute image URL
 * @param {string} opts.postUrl - URL to handle button POSTs (/api/tx or similar)
 * @param {string[]} opts.buttons - Button labels
 * @param {string} opts.inputText - Optional input placeholder
 */
export function buildFrameMeta({
  title,
  description,
  image,
  postUrl,
  buttons = [],
  inputText,
}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description || ""}" />
        <meta property="og:image" content="${image}" />

        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${image}" />
        <meta property="fc:frame:post_url" content="${postUrl}" />
        ${buttons
          .map((b, i) => `<meta property="fc:frame:button:${i + 1}" content="${b}" />`)
          .join("\n")}
        ${inputText ? `<meta property="fc:frame:input:text" content="${inputText}" />` : ""}
      </head>
      <body>
        <h1>${title}</h1>
        <p>${description || ""}</p>
        <img src="${image}" alt="frame image" width="300" />
      </body>
    </html>
  `;
}

/**
 * Builds absolute URL for /api/frame assets
 */
export function frameUrl(req, path = "/api/frame") {
  return `${getBaseUrl(req)}${path}`;
}
