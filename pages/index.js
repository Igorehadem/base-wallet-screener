// Simple landing page for health check
export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Base Wallet Screener API</h1>
      <p>
        Use <code>/api/stats?address=0x...</code> to get wallet activity stats on Base.
      </p>
    </main>
  );
}
