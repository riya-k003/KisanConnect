import { useState, useRef, useEffect } from "react";
import askKisanAI from "../services/kisanAI";
import { speakText } from "../utils/ttsUtil";
import ReactMarkdown from "react-markdown";
import TTS from "./Speech/TTS.jsx";

const quickQuestions = {
  hi: [
    "फसल में कीड़े लग गए हैं",
    "गेहूं की बुवाई कब करें?",
    "खाद कितनी डालें?",
    "सिंचाई कब करें?",
  ],
  en: [
    "My crop has pests",
    "When to sow wheat?",
    "How much fertilizer?",
    "When to irrigate?",
  ],
};

function KisanChat() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "🌾 नमस्ते किसान भाई! मैं KissanConnect का AI सहायक हूँ। आप मुझसे फसल, खाद, सिंचाई या सरकारी योजनाओं के बारे में पूछ सकते हैं।",
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("hi");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const reply = await askKisanAI(userMsg, language);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      
          } catch (err) {
      const errorText = language ==="hi" ? "माफ़ करें, कुछ गड़बड़ हुई। थोड़ी देर बाद कोशिश करें।" :"Sorry, something went wrong. Please try again later.";
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: errorText,
        }
      ]);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerIcon}>🌾</span>
        <div>
          <div style={styles.headerTitle}>KissanConnect AI सहायक</div>
          <div style={styles.headerSub}>Farming Assistant</div>
        </div>
        {/* Language Toggle */}
        <div style={styles.langToggle}>
          <button
            style={language === "hi" ? styles.langActive : styles.langBtn}
            onClick={() => setLanguage("hi")}
          >
            हिंदी
          </button>
          <button
            style={language === "en" ? styles.langActive : styles.langBtn}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={msg.role === "user" ? styles.userMsg : styles.botMsg}
          >
            <div>
        {msg.role === "bot" ? (
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        ) : (
          msg.text
        )}
      </div>
            {msg.role === "bot" && (
      <div style={{ marginTop: "6px" }}>
        <TTS tip={{ content: msg.text }} />
      </div>
        )}
        </div>
        ))}
        {loading && (
          <div style={styles.botMsg}>
            {language === "hi" ? "सोच रहा हूँ..." : "Thinking..."}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Questions */}
      <div style={styles.chips}>
        {quickQuestions[language].map((q, i) => (
          <button key={i} style={styles.chip} onClick={() => sendMessage(q)}>
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          type="text"
          placeholder={
            language === "hi"
              ? "अपना सवाल लिखें..."
              : "Type your question..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          style={styles.sendBtn}
          onClick={() => sendMessage()}
          disabled={loading}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "600px",
    margin: "0 auto",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    overflow: "hidden",
    fontFamily: "sans-serif",
    display: "flex",
    flexDirection: "column",
    height: "600px",
  },
  header: {
    background: "#1D9E75",
    color: "white",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  headerIcon: { fontSize: "24px" },
  headerTitle: { fontWeight: "600", fontSize: "15px" },
  headerSub: { fontSize: "12px", opacity: 0.8 },
  langToggle: { marginLeft: "auto", display: "flex", gap: "6px" },
  langBtn: {
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
  },
  langActive: {
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid white",
    background: "white",
    color: "#1D9E75",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#f9f9f9",
  },
  botMsg: {
    background: "white",
    border: "1px solid #e0e0e0",
    borderRadius: "0 12px 12px 12px",
    padding: "10px 14px",
    fontSize: "14px",
    maxWidth: "80%",
    alignSelf: "flex-start",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
  },
  userMsg: {
    background: "#1D9E75",
    color: "white",
    borderRadius: "12px 0 12px 12px",
    padding: "10px 14px",
    fontSize: "14px",
    maxWidth: "80%",
    alignSelf: "flex-end",
    lineHeight: "1.6",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "10px 16px",
    background: "white",
    borderTop: "1px solid #eee",
  },
  chip: {
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid #1D9E75",
    background: "white",
    color: "#1D9E75",
    cursor: "pointer",
    fontSize: "12px",
  },
  inputRow: {
    display: "flex",
    gap: "8px",
    padding: "12px 16px",
    background: "white",
    borderTop: "1px solid #eee",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    fontSize: "14px",
    outline: "none",
  },
  sendBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    background: "#1D9E75",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default KisanChat;
