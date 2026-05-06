import {useState} from "react";
import {tipServices} from "../../services/tipsService"

function CommentSection({tip_id}){
const [comments , setComments] = useState({});
const [openComment, setopenComment] = useState(null);
const [commentData, setCommentData] = useState({
    content: "",
  });

    const handleChange = (e , tip_id) => {
    console.log("handlChange is hit with event name:" , e.target.name , "and value:" , e.target.value);
    setError("");
    const value = e.target.value
        setCommentData({
      ...commentData,
      [tip_id] : value
    });
  
  };

   const handlecommentClick = async (tip_id) => {
    if (openComment === tip_id) {
      setopenComment(null);
      return;
    } else {
      setopenComment(tip_id);
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tips/${tip_id}/comments`);
    const fetchedComments = await res.json();
    console.log("Fetched Comments:", fetchedComments);

    setComments((prev) => ({
      ...prev,
      [tip_id]: Array.isArray(fetchedComments) ? fetchedComments : [],
    }));
   if(res.ok){
    setCommentData({

    })
   }

  };


   const handleCommentPost = async (tip_id) => {
    console.log("comment post clicked with commentdata:" , commentData , " for tip_id:" , tip_id);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tips/${tip_id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: commentData[tip_id] || "" }),
      });
      const data = await res.json();
      console.log(data);
      // if(res.ok){
       setCommentData({
      ...commentData,
      [tip_id]: ""
    });
      //  }
    } catch (error) {
      console.log("Error posting comment", error);
      setError("Something went wrong while posting the comment");
    }
  };

  return(
    <>
     <button onClick={() => handlecommentClick(tip.tip_id)}>
                    Comments
                  </button>
                  <input
                    type="text"
                    name="content"
                    placeholder="Write a comment..."
                    value={commentData[tip.tip_id] || ""}
                    onChange={(e) => handleChange(e , tip.tip_id)}
                  />
                  <button onClick={() => handleCommentPost(tip.tip_id)}>
                    Post
                  </button>
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
    </>
  )
}

export default CommentSection;