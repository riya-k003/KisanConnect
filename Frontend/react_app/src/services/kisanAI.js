const askKisanAI = async (message , language = "hi")=>{
    const response = await fetch("http://localhost:3000/api/kisanai/ask",{
        method: "POST",
        headers:{
           " Contetn-Type": "application/json",
        },
        body: JSON.stringify({message , language}),
    });

    const data = await response.json();

    if(!respinse.ok){
        throw new Error(data.error || "Ai services failed");
    }
    return data.reply;
};

export default askKisanAI;