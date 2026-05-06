export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "520px",
        background: "#111827",
        borderRadius: "24px",
        padding: "32px",
        boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "42px", margin: "0 0 10px" }}>
          ORHAN AI
        </h1>

        <p style={{ opacity: .75, marginBottom: "24px" }}>
          Dijital İkiz Sistemi Aktif
        </p>

        <input
          placeholder="Mesaj yaz..."
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "none",
            fontSize: "16px",
            marginBottom: "14px",
            boxSizing: "border-box"
          }}
        />

        <button style={{
          width: "100%",
          padding: "16px",
          borderRadius: "14px",
          border: "none",
          background: "#2563eb",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Gönder
        </button>
      </div>
    </main>
  );
}
