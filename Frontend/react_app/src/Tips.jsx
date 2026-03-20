import {useEffect , useState} from 'react';

function Tips(){

    const [tips , setTips] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:3000/tips")
        .then((res)=> res.json())
        .then((data)=> {
            console.log("DATA:" , data);
            setTips(data.tips);
        });
    }, []);

    useEffect(()=>{
        console.log("UPDATED TIPS:" , tips);
    }, [tips]);



    return(
        <>
        <div className="bg-red-500 text-white">
            <h2>All Tips</h2>
            <div className="tip-container">
                {tips.length === 0 ? (
                    <p>Loading...</p>
                ): (
                    tips.map((tip)=>(
                    <div key={tip.tip_id}>
                        <h3>{tip.title}</h3>
                        <p>{tip.content}</p>

                        <p>Likes: {tip.like_count}</p>
                        <p>{tip.isLiked ? "💖 Liked" : "🤍 Not Liked"}</p>

                        <button>Like</button>
                    </div>
                    ))
               )}
            </div>
        </div>
        
        </>
    )
    

}
export default Tips;