import { timeAgo } from "../../utils/timeAgo";
import CommentSection from "./CommentSection";
import {Earth , Trash2 , Heart , MessageCircle , Bookmark , Share , SendHorizontal , Smile} from "lucide-react"


function TipCard({
  tip,
  onLike,
  onDelete,
  onCommentClick,
  onCommentChange,
  onCommentPost,
  comments,
  openComment,
  commentData,
}) {
  return (
    <div
      className="
      bg-white
      border border-[#E8EDE0]
      rounded-[28px]
      p-8
      shadow-sm
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between  rounded-3xl mb-8 ">
        <div className="flex items-center gap-3 ">
          <div
            className="
            h-14
            w-14
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
            text-[#2F6B3F]
            font-bold
            text-xl
          "
          >
            {tip.farmer_name?.charAt(0)}
          </div>

          <div>
            <p
              className="
              font-semibold
              text-[#183A26]
              text-[20px]
              leading-none
            "
            >
              {tip.farmer_name}
            </p>

            <p className=" flex gap-2 text-sm text-[#777] mt-2">
              <Earth size={20}/>
              {timeAgo(tip.created_at)}
            </p>
          </div>
        </div>
        <div className="h-[8vh] w-[8vw] flex justify-center ">

        <button
          onClick={() => onDelete(tip.tip_id)}
          className="
          text-[#999]
          hover:text-red-500
          text-xl
          transition
        "
        >
          <Trash2 size={20}/>
        </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image */}
        <div className="lg:w-[40%] h-[240px] flex justify-center pt-5 flex-shrink-0 ">
          <img
            src={
              tip.image_url ||
              "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200"
            }
            alt={tip.title}
            className="
            w-[95%]
            h-[240px]
            object-cover
            rounded-[24px]
            shadow-sm
          "
          />
        </div>

        {/* Content */}
        <div className="flex-1 py-3">
          <h3
            className="
            text-[28px]
            leading-tight
            font-bold
            text-[#143424]
          "
          >
            {tip.title}
          </h3>

          <p
            className="
            mt-5
            text-[16px]
            leading-8
            text-[#555E55]
          "
          >
            {tip.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap  ">
            <span
              className="
              h-[4vh]
              w-[15vw]
              flex 
              justify-center
              rounded-full
              bg-purple-100
              text-black-300
              text-sm
            "
            >
              {tip.category}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
        mt-8
        pt-6
        border-t border-[#E8EDE0]
        rounded-3xl
        flex items-center justify-between
      "
      >
        <div className="flex items-center h-[5vh] w-[30%] justify-center gap-8">
          <button
            onClick={() => onLike(tip.tip_id)}
            className="
            flex items-center gap-2
            text-[#666]
            hover:text-red-500
            transition
          "
          >
            <Heart size={20}
            className={tip.isLiked ? "text-red-500" : "text-[#666]"}
            fill={tip.isLiked ? "currentColor" : "none"}
            />
            <span>{tip.likes_count}</span>
          </button>

          <button
            onClick={() => onCommentClick(tip.tip_id)}
            className="
            flex items-center gap-2
            text-[#666]
          "
          >
            <MessageCircle size={20}/>
            <span>
              {comments[tip.tip_id]?.length || 0}
            </span>
          </button>

          <button className="text-[#666]">
            <Bookmark size={20}/>
          </button>
        </div>

            <div className="h-[5vh] w-[10%] flex justify-center rounded-3xl">
        <button className="text-[#666] ">
          < Share size={20}/>
        </button>
        </div>
      </div>

      <CommentSection
  tipId={tip.tip_id}
  comments={comments}
  openComment={openComment}
  commentData={commentData}
  onCommentClick={onCommentClick}
  onCommentChange={onCommentChange}
  onCommentPost={onCommentPost}
/>
    </div>
  );
}

export default TipCard;