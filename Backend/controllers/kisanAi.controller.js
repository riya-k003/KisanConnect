const Groq = require("groq-sdk");

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const askKisanAI = async (req , res)=>{
    const {message , language} = req.body;

    if(!message){
        return res.status(400).json({error: "Message is required"});
    }

    try{
        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            max_tokens:1024,
            messages: [
                {
                    role: "system",
                    content:`You are KissanConnect's  AI assistance for Indian Farmers.
            - Always reply in ${language ===  "hi" ? "Hindi (Devnagri script)" : "English"}
            - Give practical, simple advice relevant to Indian farming
            - Topics: crop diseases , pests , sowing , harvesting , fertilizers , irrigation, government schemes 
            - Keep answers under 150 words
            - USe simple language a farmer can understand`,
                },
                {role: "user",
                content: message,
            },
            ], 
        });

        const reply = response.choices[0]?.message?.content || "";
    res.json({ reply });
    }
    catch(error){
        console.error("Groq error:" , error);
        res.status(500).json({error: "AI service failed"});
    }
};

module.exports = { askKisanAI };