const askKisanAI = async (message , language = "hi")=>{
    console.log("askKisanAI called with:", message, language);
     console.log("About to fetch..."); 
    const response = await fetch("http://localhost:3000/api/kisanai/ask",{
        method: "POST",
        headers:{
           " Content-Type": "application/json",
        },
        body: JSON.stringify({message , language}),
    });

    const data = await response.json();

    console.log("Response status:", response.status);

    if(!response.ok){
        throw new Error(data.error || "Ai services failed");
    }
     console.error("Fetch error:", error);
    return data.reply;
};

export default askKisanAI;