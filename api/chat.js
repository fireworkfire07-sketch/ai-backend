export default function Home() {
  return (
    <div
      style={{
        background: "#0f172a",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: "40px",
          borderRadius: "20px",
          width: "90%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "42px" }}>ORHAN AI</h1>

        <p style={{ opacity: 0.7 }}>
          Dijital İkiz Sistemi
        </p>

        <input
          placeholder="Mesaj yaz..."
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "none",
            marginBottom: "15px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontSize: "18px",
          }}
        >
          Gönder
        </button>
      </div>
    </div>
  );
}
