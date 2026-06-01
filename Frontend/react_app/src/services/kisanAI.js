const askKisanAI = async (message, language = "hi") => {
  const response = await fetch("http://localhost:3000/api/kisanai/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, language }),
  });

  const data = await response.json();
  return data.reply;
};

export default askKisanAI;