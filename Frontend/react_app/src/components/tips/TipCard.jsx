import {timeAgo} from "../../utils/timeAgo";

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
        <div className="tipBox">
            <div className="tipHeader">
                <p className="farmerName">{tip.farmer_name}</p>
                <span className="time">{timeAgo(tip.created_at)}</span>
            </div>
            <h3 className="title">{tip.title}</h3>
            <button className="delete" onClick={()=>onDelete(tip.tip_id)}></button>
            <p className="content">{tip.content}</p>
            <div className="like">
                <button onClick={()=> onLike(tip.tip_id)}>{tip.isLiked ?"💖" : "🤍"} </button>
                <span>{tip.likes_count}</span>
                <button onClick={()=>onCommentClick(tip.tip_id)}>Comments</button>
                <input
                type="text"
                name="content"
                placeholder="Write a comment..."
                value={commentData[tip.tip_id] || ""}
                onChange={(e)=> onCommentChange(tip.tip_id , e.target.value)}
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