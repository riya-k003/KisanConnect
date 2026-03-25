import {useEffect , useState} from 'react';
import style from './tips.module.css';

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
    
    const handleClick = async (tip_id) =>{
       const updatedTips = tips.map((tip)=>{
        console.log(tip.likes_count, typeof tip.like_count);
        if(tip.tip_id === tip_id){
            console.log(tip);
            return {
                ... tip,
                isLiked : !tip.isLiked,
                likes_count : tip.isLiked ? tip.likes_count -1  : tip.likes_count+1

            };
        }
        return tip;

       });
       setTips(updatedTips);

    //    calling backend

    try{
        await fetch(`http://localhost:3000/tips/${tip_id}/like`, {
            method : "POST",
        });
    }catch(err){
        console.log(err);
    }

    };

    


    return(
        <>
        <div className={style.container}>
            <div>
                {tips.length === 0 ? (
                    <p>Loading...</p>
                ): (
                    tips.map((tip)=>(
                    <div key={tip.tip_id} className={style.tipBox}>
                        <h3 className={style.title}>{tip.title}</h3>
                        <p className={style.content}>{tip.content}</p>
                       <div className={style.likes}>
                        <button onClick={()=>
                            handleClick(tip.tip_id)}>
                                {tip.isLiked ? "💖" : "🤍"}
                        </button>
                        <span>{tip.likes_count}</span>
                       </div>
                    </div>
                    ))
               )}
            </div>
        </div>
        
        </>
    )
    

}
export default Tips;