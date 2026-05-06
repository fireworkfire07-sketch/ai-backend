export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        color: "white",
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: "40px",
          borderRadius: "24px",
          width: "90%",
          maxWidth: "520px",
          textAlign: "center",
          boxShadow: "0 0 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          ORHAN AI
        </h1>

        <p
          style={{
            opacity: 0.7,
            marginBottom: "24px",
          }}
        >
          Dijital İkiz Sistemi Aktif
        </p>

        <input
          placeholder="Mesaj yaz..."
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "none",
            marginBottom: "14px",
            boxSizing: "border-box",
            fontSize: "16px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Gönder
        </button>
      </div>
    </div>
  );
}
