const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const askKisanAI = async (message, language = "hi") => {
  const response = await fetch(`${API_BASE_URL}/api/kisanai/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, language }),
  });

  const data = await response.json();
  return data.reply;
};

export default askKisanAI;