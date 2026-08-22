export const detectLang = (text)=>{
        const devanagariCount = (text.match(/[\u0900-\u097F]/g) || []).length;
        const totalCount = text.replace(/\s/g, "").length;
        const ratio = devanagariCount / totalCount;

        if(ratio > 0.5){
            return "hi-IN";
        }
        return "en-IN";
}

const stripMarkdown = (text , lang = "hi") => {
  let cleaned = text
    .replace(/\*\*(.*?)\*\*/g, "$1")   // **bold** -> bold
    .replace(/\*(.*?)\*/g, "$1")        // *italic* -> italic
    .replace(/^#+\s/gm, "")             // headings
    .replace(/^\s*[-*]\s/gm, "")        // bullet markers
    .replace(/`/g, "");    // inline code backticks

    const rangeWord = lang === "hi" ? "से" : "to";
  cleaned = cleaned.replace(/(\d+)\s*-\s*(\d+)/g, `$1 ${rangeWord} $2`);

  return cleaned;
};

export const speakText = (text)=>{
    if (!text) return;
    window.speechSynthesis.cancel();
    const lang = detectLang(text);
    const cleanText = stripMarkdown(text , lang.startsWith("hi") ? "hi" : "en");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
};