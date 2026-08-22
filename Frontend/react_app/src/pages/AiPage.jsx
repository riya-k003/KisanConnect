import KisanChat from "../components/KisanChat";
import {useState} from "react";
import {MessageCircle , X} from "lucide-react";

function AiPage() {
  const [isOpn , setOpn] = useState(false);
  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F5F5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}
    >
      {!isOpn && (
      <h1 style={{
        color: "#1D9E75",
        fontFamily: "sans-serif",
        marginBottom: "20px",
        fontSize: "24px",
        fontWeight: "600",
      }}>
        🌾 KissanConnect AI सहायक
      </h1>
      )}
      {isOpn && (
        <div 
        style={{
          position: "fixed",
          bottom: "90px",
          right:"24px",
          zIndex:999,
        }}
        >
      <KisanChat />
    </div>
      )}
       <button
        onClick={() => setOpn((prev) => !prev)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#1D9E75",
          color: "white",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
        aria-label="Toggle AI Assistant"
      >
        {isOpn ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}

export default AiPage;