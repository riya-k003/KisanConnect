import { timeAgo } from "../../utils/timeAgo";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
  Globe2,
  Send,
} from "lucide-react";

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
  // Support multiple field naming conventions from the backend / hook
  const isLiked = Boolean(tip.liked ?? tip.is_liked ?? tip.user_liked);

  return (
    <div
      data-testid={`tip-card-${tip.tip_id}`}
      className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(20,52,36,0.05)] border border-[#EFF1EC] p-7 lg:p-8 transition hover:shadow-[0_6px_22px_rgba(20,52,36,0.08)]"
    >
      {/* ===== Header ===== */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className="
              h-12 w-12 rounded-full
              bg-gradient-to-br from-[#E8F3E2] to-[#D2EBC2]
              flex items-center justify-center
              text-[#2F6B3F] font-semibold text-base
              ring-2 ring-white shadow-sm
              shrink-0
            "
          >
            {tip.farmer_name?.charAt(0)}
          </div>

          <div className="flex flex-col">
            <p
              data-testid={`tip-farmer-name-${tip.tip_id}`}
              className="font-semibold text-[#143424] text-[15.5px] leading-tight"
            >
              {tip.farmer_name}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <p className="text-[12.5px] text-[#8A8F89]">
                {timeAgo(tip.created_at)}
              </p>
              <Globe2 className="w-3 h-3 text-[#A8AEA6]" />
            </div>
          </div>
        </div>

        <button
          data-testid={`tip-delete-btn-${tip.tip_id}`}
          onClick={() => onDelete(tip.tip_id)}
          className="text-[#B5BAB2] hover:text-[#143424] transition p-1.5 rounded-full hover:bg-[#F4F6F1]"
          aria-label="Tip options"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* ===== Main Content ===== */}
      <div className="flex flex-col lg:flex-row gap-7 mt-7">
        {/* Image */}
        <div className="lg:w-[44%] flex-shrink-0">
          <img
            src={
              tip.image_url ||
              "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200"
            }
            alt={tip.title}
            className="w-full h-[240px] object-cover rounded-2xl"
          />
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <h3
            data-testid={`tip-title-${tip.tip_id}`}
            className="text-[24px] leading-snug font-bold text-[#143424] tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {tip.title}
          </h3>

          <p className="mt-4 text-[14.5px] leading-7 text-[#5C6660]">
            {tip.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5 mt-6">
            <span className="px-4 py-1.5 rounded-full bg-[#E9F4E1] text-[#3F8B3F] text-[12.5px] font-medium">
              Farming
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#E3EEFB] text-[#2C6FB8] text-[12.5px] font-medium">
              Tips
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#FCEFE0] text-[#C97A2B] text-[12.5px] font-medium">
              Agriculture
            </span>
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <div className="mt-7 pt-5 border-t border-[#EFF1EC] flex items-center justify-between">
        <div className="flex items-center gap-7">
          <button
            data-testid={`tip-like-btn-${tip.tip_id}`}
            onClick={() => onLike(tip.tip_id)}
            className={`flex items-center gap-2 transition group ${
              isLiked
                ? "text-[#E0445B]"
                : "text-[#5C6660] hover:text-[#E0445B]"
            }`}
            aria-pressed={isLiked}
          >
            <Heart
              className={`w-[18px] h-[18px] transition ${
                isLiked
                  ? "fill-[#E0445B] text-[#E0445B]"
                  : "fill-none text-[#5C6660] group-hover:text-[#E0445B]"
              }`}
            />
            <span className="text-[14px] font-medium">{tip.likes_count}</span>
          </button>

          <button
            data-testid={`tip-comment-btn-${tip.tip_id}`}
            onClick={() => onCommentClick(tip.tip_id)}
            className="flex items-center gap-2 text-[#5C6660] hover:text-[#143424] transition"
          >
            <MessageCircle className="w-[18px] h-[18px]" />
            <span className="text-[14px] font-medium">
              {comments[tip.tip_id]?.length || 0}
            </span>
          </button>

          <button className="flex items-center gap-2 text-[#5C6660] hover:text-[#143424] transition">
            <Bookmark className="w-[18px] h-[18px]" />
            <span className="text-[14px] font-medium">Save</span>
          </button>
        </div>

        <button className="flex items-center gap-2 text-[#5C6660] hover:text-[#143424] transition">
          <Share2 className="w-[18px] h-[18px]" />
          <span className="text-[14px] font-medium">Share</span>
        </button>
      </div>

      {/* ===== Comment Section (toggle) ===== */}
      {openComment === tip.tip_id && (
        <div className="mt-6 pt-6 border-t border-[#EFF1EC]">
          {/* Comment Input */}
          <div className="flex gap-2.5">
            <input
              data-testid={`tip-comment-input-${tip.tip_id}`}
              type="text"
              name="content"
              placeholder="Write a comment..."
              value={commentData[tip.tip_id] || ""}
              onChange={(e) => onCommentChange(e, tip.tip_id)}
              className="
                flex-1 h-11 rounded-full
                bg-[#F7F8F3] border border-[#EFF1EC]
                px-5 text-[14px] text-[#143424]
                placeholder:text-[#A8AEA6]
                focus:outline-none focus:border-[#58B947] focus:bg-white
                transition
              "
            />
            <button
              data-testid={`tip-comment-post-btn-${tip.tip_id}`}
              onClick={() => onCommentPost(tip.tip_id)}
              className="
                h-11 px-5 rounded-full
                bg-[#58B947] hover:bg-[#4CA53D]
                text-white font-medium text-[14px]
                flex items-center gap-2 shadow-sm
                transition
              "
            >
              <Send className="w-4 h-4" />
              Post
            </button>
          </div>

          {/* Comments List */}
          <div className="mt-5 space-y-3">
            {comments[tip.tip_id] ? (
              comments[tip.tip_id].length > 0 ? (
                comments[tip.tip_id].map((c, i) => (
                  <div
                    key={i}
                    className="
                      bg-[#F7F8F3] rounded-2xl px-5 py-3.5
                      text-[14px] text-[#3F4742] leading-6
                    "
                  >
                    {c.content}
                  </div>
                ))
              ) : (
                <p className="text-[13px] text-[#8A8F89] italic">
                  No comments yet. Be the first to share your thoughts.
                </p>
              )
            ) : (
              <p className="text-[13px] text-[#8A8F89] italic">
                Loading comments...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TipCard;
