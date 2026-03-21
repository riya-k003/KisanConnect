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
                        <span>{tip.like_count}</span>
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