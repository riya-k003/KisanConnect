const Groq = require("groq-sdk");

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const askKisanAI = async (req , res)=>{
    const {message , language , conversationHistory} = req.body;

    if(!message){
        return res.status(400).json({error: "Message is required"});
    }

    if(conversationHistory !== undefined && !Array.isArray(conversationHistory)){
        return res.status(400).json({
            error: "Conversation history must be an array of messages"
        });
    }
    if(conversationHistory && conversationHistory.length > 10){
        return res.status(400).json({
            error: "Conversation history cannot exceed 10 messages"

    });
}
const cleanHistory = (conversationHistory || [])
    .filter((item)=>
    item &&
typeof item === "object" &&
!Array.isArray(item)&&
["user" , "assistant"].includes(item.role) &&
typeof item.content === "string"
)
  .slice(-6)
  .map((item) => ({
    role: item.role,
    content: item.content.slice(0, 2000)
}));
console.log("Cleaned history:" , cleanHistory);

    try{
        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            max_tokens:1024,
            messages: [
                {
                    role: "system",
                    content: `
You are KissanConnect's AI assistance for Indian farmers.

IMPORTANT RULES STRICTLY FOLLOW THESE RULES:

1. Return the response ONLY in valid JSON format.
2. Do not provide any information outside the JSON.
3. Provide only useful, practical information relevant to the farmer's question.
4. Always reply in ${
    language === "hi"
        ? "Hindi using Devanagari script"
        : "English"
}.
5. Keep the answer simple and easy for an Indian farmer to understand.
6. Keep the reply under 150 words.
7. Provide the answer in points.
8. Provide the answer for the specific crop mentioned in the question, if any. Do not provide generic answers.
9. Topics include:
   - Crop diseases
   - Pests
   - Sowing
   - Harvesting
   - Fertilizers
   - Irrigation
   - Government schemes
   - General agricultural services

SAFETY RULES:

10. Do NOT provide any chemical pesticide, insecticide, fungicide,
   herbicide or other chemical treatment name, dosage, concentration,
   application rate or mixing instructions.

11. If chemical treatment may be required, do NOT recommend a specific
   chemical. Instead, advise the farmer to consult their nearest KCC
   (Kisan Call Centre) or KVK (Krishi Vigyan Kendra) for a
   crop-specific recommendation also tell the full form of the recommendation in hindi.

12. You may mention commonly used natural/organic soil amendments or
    fertilizers when relevant, but do not claim that any input is
    universally harmless. Recommend appropriate use according to the
    crop and soil condition. Never  recommend any chemical fertilizer or pesticides. 

13. For government schemes or national agricultural services, provide
    only relevant and useful information.

14.  Do not invent scheme details or contact numbers.

15. If the crop name is not specified and is required for the advice, you may ask the user to provide the crop name.

16. Put each point in the answer in a separate line and start each point with a bullet.



JSON FORMAT:

{
"type": "question",
"reply" : "Your question",
"crop": null
                }

{
  "type": "advice",
  "reply": "Your useful answer here",
  "crop": "crop name"
}

The "type" must be one of:
"advice",
"question",
"error"

Rules for "crop":
- If a specific crop is mentioned or clearly identified, provide its name.
- Otherwise return null.

Do not use Markdown.
Do not wrap the JSON in code blocks.
Do not add explanations outside the JSON `,
                },

                ...(cleanHistory || []),
                {role: "user",
                content: message,
            },
            ], 
        });
        
        const rawReply = response.choices[0]?.message?.content || "";
        try{
            const result = JSON.parse(rawReply);

    res.json({ 
        type: result.type,
        reply: result.reply,
        crop : result.crop  
    });
    } catch(error){
        console.log("Invalid AI JSON:" , rawReply);

        res.status(500).json({
            type: "error",
            reply: "AI returned an invaild response format.",
            crop: null
        });
    }
}
    catch(error){
        console.error("Groq error:" , error);
        res.status(500).json({
            type: "error",
            reply: "Ai service failed",
            crop : null
        });
    }
};

module.exports = { askKisanAI };