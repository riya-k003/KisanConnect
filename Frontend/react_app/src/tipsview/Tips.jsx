import {useEffect , useState} from 'react';
import style from './tips.module.css';

function Tips(){

    const [tips , setTips] = useState([]);
    const [comments, setComments] = useState({});
    const [openComment , setopenComment] = useState(null);

    useEffect(()=>{
        console.log("Token:", localStorage.getItem("token"));
        fetch("http://localhost:3000/tips" , {
            method: "GET",
            headers :{
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            },
          
        })
        .then((res)=> res.json())
        .then((data)=> {
            console.log("DATA:" , data);
            console.log("FIRST TIP:" , data.tips[0]);
            setTips(data.tips);
        });
    }, []);

    useEffect(()=>{
        console.log("UPDATED TIPS:" , tips);
    }, [tips]);
    
    const handleClick = async (tip_id) =>{
        console.log("like button clicked" , tip_id);
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
        console.log("sending like request for" , tip_id);
        await fetch(`http://localhost:3000/tips/${tip_id}/like`, {
            method : "POST",
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        });
    }catch(err){
        console.log(err);
    }

    };


    const handlecommentClick= async(tip_id)=>{
        if(openComment === tip_id){
            setopenComment(null);
            return;
        }else{
            setopenComment(tip_id);
        }
        const res = await fetch(`http://localhost:3000/tips/${tip_id}/comments`)
        const fetchedComments = await res.json();
        console.log("Fetched Comments:" , fetchedComments);

        setComments(prev=>({
            ...prev,
            [tip_id]: Array.isArray(fetchedComments)? fetchedComments : []
        }));
        
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
                        <button onClick={()=>
                            handlecommentClick(tip.tip_id)
                        }>Comments</button>
                        <input 
                        type="text"
                        placeholder="Write a comment..."
                        />
                        <button>Post</button>
                        {openComment === tip.tip_id && (
                           <div>
                                {comments[tip.tip_id] ? (
                                comments[tip.tip_id]?.length > 0 ? (
                                    comments[tip.tip_id]?.map((c,i)=>(
                                    <p key={i}>{c.content}</p>
                                    ))
                                ):(
                                 <p> NO Comments yet</p>
                                )
                            ):(
                                <p>Loading comments...</p>
                                   
                        )}
                        </div>
                        )}
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