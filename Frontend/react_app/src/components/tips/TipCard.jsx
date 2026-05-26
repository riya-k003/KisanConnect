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
        <div className="rounded-2xl border border-white/10 bg-[#1e293b] p-5 transition hover:border-green-500/40">
          <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 font-bold text-black">
            {tip.farmer_name?.charAt(0)}
          </div>
          
          {/* Name+time */}
          <div>
                 <p className="font-semibold text-white">
                  {tip.farmer_name}
                  </p>

                <span className="text-slate-400 text-sm">
                {timeAgo(tip.created_at)}
                </span>
            </div>
            </div>
            <button
            onClick={()=>onDelete(tip.tip_id)}
             className="text-slate-400 hover:text-red-400 transition"
             >
              🗑️
              </button>
              </div>
              {/* Title */}
            <h3 className="mt-4 text-xl font-bold text-white">
              {tip.title}
              </h3>
              {/* Content */}
            <p className="mt-3 leading-relaxed text-slate-300">
              {tip.content}
              </p>
              {/* Actions */}
            
            <div className="mt-5 flex items-center gap-6 border-t border-white/10 pt-4">
            
            {/* Like */}
                <button 
                onClick={()=> onLike(tip.tip_id)}
                className="flex items-center gap-2 text-slate-300 hover:text-pink-400 transition"
                >
                  {tip.isLiked ?"💖" : "🤍"} 

                <span>{tip.likes_count}</span>
                  </button>

                <button
                 onClick={()=>onCommentClick(tip.tip_id)}
                className="text-slate-300 hover:text-green-400 transition"
                 >
                  Comments
                  </button>
                  </div>

                  {/* Comment Input */}
                  <div className="mt-4 flex gap-2">
                <input
                type="text"
                name="content"
                placeholder="Write a comment..."
                value={commentData[tip.tip_id] || ""}
                onChange={(e)=> onCommentChange(e, tip.tip_id)}
                 className="flex-1 rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-green-500"
                />

                <button
                 onClick={()=>onCommentPost(tip.tip_id)}
                 className="rounded-xl bg-green-500 px-5 font-medium text-black hover:bg-green-400 transition"
                 >
                  Post
                  </button>
                  </div>

                  {/* Comments Section */}
                {openComment === tip.tip_id && (
                    <div className="mt-4 space-y-3">
                      {comments[tip.tip_id] ? (
                        comments[tip.tip_id]?.length > 0 ? (
                          comments[tip.tip_id]?.map((c, i) => (
                            <div
                             key={i}
                             className="rounded-xl bg-[#0f172a] p-3 text-slate-300">
                             {c.content}
                             </div>
                          ))
                        ) : (
                          <p
                           className="text-slate-500"
                          > NO Comments yet</p>
                        )
                      ) : (
                        <p
                        className="text-slate-500"
                        >Loading comments...
                        </p>
                      )}
                    </div>
                  )}
            </div>

    )
}
export default TipCard;