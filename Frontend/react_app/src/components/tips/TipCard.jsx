import {timeAgo} from "../../utils/timeAgo";
import style from "../../styles/tips.module.css"

function TipCard(
    {
    tip,                  
  onLike,                 
  onDelete,
  onCommentClick,
  onCommentChange,
  onCommentPost,
  comments,
  openComment,
  commentData,
    }
){
    return(
        <div className={style.tipBox}>
            <div className={style.Header}>
                <p className={style.fartherName}>{tip.farmer_name}</p>
                <span className={style.time}>{timeAgo(tip.created_at)}</span>
            </div>
            <h3 className={style.title}>{tip.title}</h3>
            <button className={style.delete} onClick={()=>onDelete(tip.tip_id)}></button>
            <p className={style.content}>{tip.content}</p>
            <div className={style.likes}>
                <button onClick={()=> onLike(tip.tip_id)}>{tip.isLiked ?"💖" : "🤍"} </button>
                <span>{tip.likes_count}</span>
                <button onClick={()=>onCommentClick(tip.tip_id)}>Comments</button>
                <input
                type="text"
                name="content"
                placeholder="Write a comment..."
                value={commentData[tip.tip_id] || ""}
                onChange={(e)=> onCommentChange(e, tip.tip_id)}
                />
                <button onClick={()=>onCommentPost(tip.tip_id)}>Post</button>
                {openComment === tip.tip_id && (
                    <div>
                      {comments[tip.tip_id] ? (
                        comments[tip.tip_id]?.length > 0 ? (
                          comments[tip.tip_id]?.map((c, i) => (
                            <p key={i}>{c.content}</p>
                          ))
                        ) : (
                          <p> NO Comments yet</p>
                        )
                      ) : (
                        <p>Loading comments...</p>
                      )}
                    </div>
                  )}
            </div>
        </div>
    )
}
export default TipCard;