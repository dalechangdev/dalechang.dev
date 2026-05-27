export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "monospace",
        color: "#fafafa",
        background: "#0f0f0f",
        gap: "1rem",
      }}
    >
      <p style={{ fontSize: "2rem", fontWeight: 700 }}>dc.</p>
      <p style={{ color: "#666" }}>new site coming soon</p>
      <a
        href="/2024"
        style={{ color: "#ff6b35", fontSize: "0.875rem", marginTop: "0.5rem" }}
      >
        view 2024 site →
      </a>
    </main>
  );
}
