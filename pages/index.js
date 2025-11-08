// pages/index.js
// Home page for Base Wallet Screener MiniApp (detected by Farcaster Builder)

export default function Home() {
  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "radial-gradient(circle at center, #0d1117 0%, #1a1f2b 80%)",
        color: "white",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🧠 Base Wallet Screener</h1>
      <p style={{ fontSize: "1.2rem", opacity: 0.85, maxWidth: 600 }}>
        Analyze onchain activity for any Base wallet — live Farcaster MiniApp.
      </p>

      <section style={{ marginTop: "2rem" }}>
        <a
          href="/api/frame-input?v=2"
          style={{
            background: "#3b82f6",
            color: "white",
            padding: "12px 28px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1.1rem",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#2563eb")}
          onMouseLeave={(e) => (e.target.style.background = "#3b82f6")}
        >
          🔗 Open Farcaster Frame
        </a>
      </section>

      <p style={{ marginTop: "3rem", fontSize: "0.95rem", opacity: 0.7 }}>
        Or use the API directly:
        <br />
        <code style={{ background: "#111827", padding: "6px 10px", borderRadius: "8px" }}>
          /api/stats?address=0x...
        </code>
      </p>

      <footer style={{ marginTop: "4rem", fontSize: "0.85rem", opacity: 0.5 }}>
        igoreha.online · Built on Base · 2025
      </footer>
    </main>
  );
}
