import KisanChat from "../components/KisanChat";

function AiPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F5F5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <h1 style={{
        color: "#1D9E75",
        fontFamily: "sans-serif",
        marginBottom: "20px",
        fontSize: "24px",
        fontWeight: "600",
      }}>
        🌾 KissanConnect AI सहायक
      </h1>
      <KisanChat />
    </div>
  );
}

export default AiPage;