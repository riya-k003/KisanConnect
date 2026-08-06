import {useState} from 'react';
import {Volume , VolumeX} from 'lucide-react';


function TTS({tip}){
     const [isSpeaking , setIsSpeaking] = useState(false);

     const handleSpeak = ()=>{
        const willSpeak = !isSpeaking;
        setIsSpeaking(willSpeak);
        if(willSpeak){
            const utterance = new SpeechSynthesisUtterance(tip.content);
            utterance.lang = detectLang(utterance.text);
            utterance.rate = 0.7;
            utterance.onend = ()=>{
                setIsSpeaking(false);
            }
            speechSynthesis.speak(utterance);
        }
        else{
            speechSynthesis.cancel();
        }
     }

     const detectLang = (text)=>{
        const devanagariCount = (text.match(/[\u0900-\u097F]/g) || []).length;
        const totalCount = text.replace(/\s/g, "").length;
        const ratio = devanagariCount / totalCount;

        if(ratio > 0.5){
            return "hi-IN";
        }
        return "en-IN";
         }

         return(
            <div className="flex items-center gap-2">
                <button onClick={handleSpeak} className="flex items-center gap-2 text-[16px] text-2xl text-[#2F6B3F]]">
                    {isSpeaking ? <VolumeX size={26}/> : <Volume size={26}/>}
                </button>
            </div>
         )
}

export default TTS;
