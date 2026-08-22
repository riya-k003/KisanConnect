import { useState, useRef, useEffect } from "react";
import askKisanAI from "../services/kisanAI";
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
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMsg,
      },
    ]);

    setLoading(true);

    try {
      const reply = await askKisanAI(userMsg, language);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: reply,
        },
      ]);
    } catch (err) {
      const errorText =
        language === "hi"
          ? "माफ़ करें, कुछ गड़बड़ हुई। थोड़ी देर बाद कोशिश करें।"
          : "Sorry, something went wrong. Please try again later.";

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: errorText,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="kisan-chat-container"
      style={styles.wrapper}
    >
      <div style={styles.header}>
        <div style={styles.headerBrand}>
          <div style={styles.headerIcon}>🌾</div>

          <div>
            <div
              data-testid="chat-header-title"
              style={styles.headerTitle}
            >
              KissanConnect AI
            </div>

            <div style={styles.headerSub}>
              कृषि और किसान सहायता
            </div>
          </div>
        </div>

        <div
          data-testid="language-toggle"
          style={styles.langToggle}
        >
          <button
            data-testid="hindi-language-button"
            type="button"
            style={
              language === "hi"
                ? styles.langActive
                : styles.langBtn
            }
            onClick={() => setLanguage("hi")}
          >
            हिंदी
          </button>

          <button
            data-testid="english-language-button"
            type="button"
            style={
              language === "en"
                ? styles.langActive
                : styles.langBtn
            }
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
        </div>
      </div>

      <div
        data-testid="chat-messages-area"
        style={styles.chatBox}
      >
        <div style={styles.chatIntro}>
          <span style={styles.introIcon}>✨</span>
          <span>
            {language === "hi"
              ? "कृषि से जुड़ा कोई भी सवाल पूछें"
              : "Ask anything about farming"}
          </span>
        </div>

        {messages.map((msg, i) => (
          <div
            key={i}
            data-testid={`chat-message-${msg.role}-${i}`}
            style={
              msg.role === "user"
                ? styles.userMessageWrapper
                : styles.botMessageWrapper
            }
          >
            {msg.role === "bot" && (
              <div style={styles.botAvatar}>🌱</div>
            )}

            <div
              style={
                msg.role === "user"
                  ? styles.userMsg
                  : styles.botMsg
              }
            >
              <div style={styles.messageContent}>
                {msg.role === "bot" ? (
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>

              {msg.role === "bot" && (
                <div style={styles.ttsWrapper}>
                  <TTS tip={{ content: msg.text }} />
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div
            data-testid="loading-message"
            style={styles.botMessageWrapper}
          >
            <div style={styles.botAvatar}>🌱</div>

            <div style={styles.botMsg}>
              <div style={styles.typingRow}>
                <span style={styles.typingDot}></span>
                <span style={styles.typingDot}></span>
                <span style={styles.typingDot}></span>

                <span style={styles.thinkingText}>
                  {language === "hi"
                    ? "सोच रहा हूँ..."
                    : "Thinking..."}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div
        data-testid="quick-questions-area"
        style={styles.chips}
      >
        <div style={styles.chipsLabel}>
          {language === "hi"
            ? "जल्दी पूछें"
            : "Quick questions"}
        </div>

        <div style={styles.chipsList}>
          {quickQuestions[language].map((q, i) => (
            <button
              key={i}
              data-testid={`quick-question-${i}`}
              type="button"
              style={styles.chip}
              onClick={() => sendMessage(q)}
              disabled={loading}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div
        data-testid="chat-input-area"
        style={styles.inputRow}
      >
        <input
          data-testid="chat-input"
          style={styles.input}
          type="text"
          placeholder={
            language === "hi"
              ? "अपना सवाल लिखें..."
              : "Type your question..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && sendMessage()
          }
        />

        <button
          data-testid="send-message-button"
          type="button"
          style={{
            ...styles.sendBtn,
            opacity: loading || !input.trim() ? 0.55 : 1,
            cursor:
              loading || !input.trim()
                ? "not-allowed"
                : "pointer",
          }}
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "min(380px, calc(100vw - 24px))",
    height: "min(600px, calc(100vh - 100px))",
    minHeight: "480px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid rgba(29, 158, 117, 0.18)",
    borderRadius: "24px",
    background: "#ffffff",
    fontFamily:
      '"Inter", "Noto Sans Devanagari", sans-serif',
    boxShadow:
      "0 20px 60px rgba(25, 75, 52, 0.22)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "16px",
    color: "white",
    background:
      "linear-gradient(135deg, #087f5b 0%, #1d9e75 55%, #159a86 100%)",
  },

  headerBrand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: 0,
  },

  headerIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    flexShrink: 0,
    border: "1px solid rgba(255,255,255,0.28)",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.16)",
    fontSize: "22px",
  },

  headerTitle: {
    overflow: "hidden",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "-0.2px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },

  headerSub: {
    marginTop: "3px",
    color: "rgba(255,255,255,0.78)",
    fontSize: "11px",
  },

  langToggle: {
    display: "flex",
    flexShrink: 0,
    gap: "4px",
    padding: "3px",
    border: "1px solid rgba(255,255,255,0.24)",
    borderRadius: "999px",
    background: "rgba(0,0,0,0.12)",
  },

  langBtn: {
    padding: "5px 9px",
    border: "none",
    borderRadius: "999px",
    background: "transparent",
    color: "rgba(255,255,255,0.84)",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "600",
  },

  langActive: {
    padding: "5px 9px",
    border: "none",
    borderRadius: "999px",
    background: "#ffffff",
    color: "#087f5b",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "700",
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  },

  chatBox: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    padding: "16px",
    background:
      "linear-gradient(180deg, #f7fbf8 0%, #f2f7f4 100%)",
  },

  chatIntro: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 10px",
    border: "1px solid #d7eee2",
    borderRadius: "999px",
    background: "#ebf8f0",
    color: "#35735a",
    fontSize: "11px",
    fontWeight: "600",
  },

  introIcon: {
    fontSize: "13px",
  },

  botMessageWrapper: {
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
    alignSelf: "flex-start",
    maxWidth: "88%",
  },

  userMessageWrapper: {
    display: "flex",
    alignSelf: "flex-end",
    maxWidth: "82%",
  },

  botAvatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    flexShrink: 0,
    borderRadius: "10px",
    background: "#d9f3e4",
    fontSize: "15px",
  },

  botMsg: {
    padding: "12px 14px",
    border: "1px solid #e2eee7",
    borderRadius: "5px 17px 17px 17px",
    background: "#ffffff",
    color: "#263b30",
    fontSize: "13px",
    lineHeight: "1.65",
    boxShadow: "0 4px 15px rgba(36, 79, 58, 0.06)",
  },

  userMsg: {
    padding: "12px 14px",
    borderRadius: "17px 5px 17px 17px",
    background: "#168b68",
    color: "#ffffff",
    fontSize: "13px",
    lineHeight: "1.65",
    boxShadow: "0 5px 16px rgba(22, 139, 104, 0.2)",
  },

  messageContent: {
    overflowWrap: "anywhere",
  },

  ttsWrapper: {
    marginTop: "8px",
    paddingTop: "7px",
    borderTop: "1px solid #edf3ef",
  },

  typingRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  typingDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#1d9e75",
    animation: "pulse 1.2s infinite ease-in-out",
  },

  thinkingText: {
    marginLeft: "5px",
    color: "#668272",
    fontSize: "12px",
  },

  chips: {
    padding: "10px 14px",
    borderTop: "1px solid #e5eee8",
    background: "#ffffff",
  },

  chipsLabel: {
    marginBottom: "7px",
    color: "#789083",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  chipsList: {
    display: "flex",
    gap: "7px",
    overflowX: "auto",
    paddingBottom: "2px",
  },

  chip: {
    flexShrink: 0,
    padding: "7px 11px",
    border: "1px solid #bce4cf",
    borderRadius: "999px",
    background: "#f1fbf5",
    color: "#197653",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 14px 14px",
    borderTop: "1px solid #e5eee8",
    background: "#ffffff",
  },

  input: {
    minWidth: 0,
    flex: 1,
    padding: "11px 13px",
    outline: "none",
    border: "1px solid #d9e7de",
    borderRadius: "13px",
    background: "#f7faf8",
    color: "#263b30",
    fontSize: "13px",
  },

  sendBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    flexShrink: 0,
    border: "none",
    borderRadius: "13px",
    background: "#168b68",
    color: "#ffffff",
    fontSize: "18px",
    boxShadow: "0 5px 14px rgba(22, 139, 104, 0.2)",
  },
};

export default KisanChat;