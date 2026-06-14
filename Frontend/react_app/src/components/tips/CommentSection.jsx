import {useState} from "react";
import {tipsService} from "../../services/tipsService"
import {SendHorizontal , Smile} from "lucide-react"


function CommentSection({
  tipId,
comments,
openComment,
commentData,
onCommentClick,
onCommentChange,
onCommentPost
}){


  


  return(
    <>
     {/* Comment Input */}
      <div className={`mt-6 flex gap-2  ${openComment === tipId ? "block" : "hidden"}`}>
        <button className=" w-[5%] flex justify-center items-center text-gray-500">
          <Smile size={25}/>
        </button>
        <input
          type="text"
          name="content"
          placeholder="Write a comment..."
          value={commentData[tipId] || ""}
          onChange={(e) => onCommentChange(e, tipId)}
          className="
          flex
          h-12
          w-[90%]
          rounded-2xl
          border border-[#E8EDE0]
          px-4
        "
        />

        <button
          onClick={() => onCommentPost(tipId)}
          className="
          px-6
          h-12
          rounded-2xl
          text-[#58B947]
          font-medium
          hover:bg-[#58B947]
          hover:text-[#dbffd4]
        "
        >
         Post
        </button>
      </div>

      {/* Comments */}
      {openComment === tipId && (
        <div className="mt-6 space-y-4 ">
          {comments[tipId] ? (
            comments[tipId].length > 0 ? (
              comments[tipId].map((c, i) => (
                <div
                  key={i}
                  className="
                  bg-[#F7F8F3]
                  border border-[#E8EDE0]
                  rounded-xl
                  p-5
                  text-[#555E55]
                "
                >
                  {c.content}
                </div>
              ))
            ) : (
              <p className="text-[#777]">
                No comments yet
              </p>
            )
          ) : (
            <p className="text-[#777]">
              Loading comments...
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default CommentSection;