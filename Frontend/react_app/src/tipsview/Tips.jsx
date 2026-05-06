
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./tips.module.css";
import { timeAgo } from "../utils/timeAgo";

function Tips() {
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();
  const [comments, setComments] = useState({});
  const [openComment, setopenComment] = useState(null);
  const [TipData, setTipData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [commentData, setCommentData] = useState({
    content: ""
  });
  const [loading , setLoading] = useState(true);
  const [Error , setError] = useState("");

  useEffect(() => {
    console.log("Token:", localStorage.getItem("token"));
    fetch(`${import.meta.env.VITE_API_URL}/tips`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    
      .then((res) => {
        console.log(res);
        if (res.status === 403 || res.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          return ;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setTips(data.tips);
        }
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(()=>{
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("UPDATED TIPS:", tips);
  }, [tips]);

  const fetchTips = async () => {
    try {

          console.log("fetchTips called");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/tips`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

         console.log("GET status:", res.status);

      const data = await res.json();

       console.log("GET response data:", data);

      setTips(data.tips);
    } catch (err) {
      console.log("fetchTips error" , err);
      setError("Something went wrong while fetching the tips");
    }
  };
  const handleClick = async (tip_id) => {
    console.log("like button clicked", tip_id);
    const updatedTips = tips.map((tip) => {
      console.log(tip.likes_count, typeof tip.like_count);
      if (tip.tip_id === tip_id) {
        console.log(tip);
        return {
          ...tip,
          isLiked: !tip.isLiked,
          likes_count: tip.isLiked ? tip.likes_count - 1 : tip.likes_count + 1,
        };
      }
      return tip;
    });
    setTips(updatedTips);

    //    calling backend

    try {
      console.log("sending like request for", tip_id);
      await fetch(`${import.meta.env.VITE_API_URL}/tips/${tip_id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
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

  const handleChange = (e , tip_id) => {
    console.log("handlChange is hit with event name:" , e.target.name , "and value:" , e.target.value);
    setError("");
    const value = e.target.value
        setCommentData({
      ...commentData,
      [tip_id] : value
    });
  
  };

  const handleTipChange =(e)=>{
  setError("");
  const {name , value} = e.target;
  setTipData({
    ...TipData,
    [name]:value
  })
}
  const handlePostTip = async () => {
      console.log("handlePostTip called with TipData:", TipData);
      const trimmedTitle = TipData.title.trim();
  const trimmedCategory = TipData.category.trim();
  const trimmedContent = TipData.content.trim();

  if (!trimmedTitle || !trimmedCategory || !trimmedContent) {
    setError("All fields are required");
    return;
  }

  if (/^\d+$/.test(trimmedTitle)) {
    setError("Title cannot contain only numbers");
    return;
  }

  if (trimmedTitle.length < 3) {
    setError("Title must be at least 3 characters");
    return;
  }

  if (trimmedContent.length < 10) {
    setError("Content must be at least 10 characters");
    return;
  }
  
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(TipData),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      console.log("Response received:", res);


      let data;
try {
  data = await res.json();
} catch (err) {
  data = { message: "Something went wrong" };
}

console.log("POST status:", res.status);
    console.log("res.ok:", res.ok);
    console.log("response data:", data);
if (!res.ok) {
  setError(data.message || "Request failed");
  return;
}
      
      setError("");
      if (data.tip) {
        setTips((prev) => [data.tip, ...prev]);
      }
      console.log("RESETTING FORM NOW");
      setTipData({
        title: "",
        category: "",
        content: "",
      });
    } catch (error) {
      console.log("Error posting tip", error);
      if (error.name === 'AbortError') {
        setError("Request timed out. Please try again.");
      } else {
        setError("Something went wrong while posting the comment");
      }
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

  const handleDelete = async(tip_id)=>{
    try{
      console.log("Sending DELETE request for tip_id:" , tip_id);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tips/${tip_id}` , {
        method : "DELETE",
        headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`
        },
      });
      const data = await res.json();
      if(!res.ok){
        setError(data.message || "Failed to delete the tip");
        return;
      }
      setTips(prev => prev.filter(t=> t.tip_id !== tip_id));
      setError("");
      
    } catch(err){
      console.log("Error deleting tip" , err);
      setError("Something went Wrong while deleting the tip")
    }
  }

  

  return (
    <>
      <div className={style.container}>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : tips.length === 0 ?(
            <p>No tips available</p>
          ) :(
            tips.map((tip) => (
              <div key={tip.tip_id} className={style.tipBox}>
                <div className ={style.tipHeader}>
                  <p className={style.farmerName}>{tip.farmer_name}</p>
                  <span className={style.time}>{timeAgo(tip.created_at)}</span>
                  </div>
                <h3 className={style.title}>{tip.title}</h3>
                <button className={style.deleteBtn} onClick={()=>handleDelete(tip.tip_id)}>🗑️</button>
                <p className={style.content}>{tip.content}</p>
                <div className={style.likes}>
                  <button onClick={() => handleClick(tip.tip_id)}>
                    {tip.isLiked ? "💖" : "🤍"}
                  </button>
                  <span>{tip.likes_count}</span>
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
                </div>
              </div>
            ))
          )}
        </div>
        </div>
      <div className="createTip">
      {Error && <p className={style.errorBox}>⚠️{Error}</p>}
        <input
          name="title"
          type="text"
          placeholder="Tip Title"
          value={TipData.title}
          onChange={handleTipChange}
        />
        <input
          name="category"
          type="text"
          placeholder="Category"
          value={TipData.category}
          onChange={handleTipChange}
        />
        <textarea
          name="content"
          placeholder=" Tip content"
          value={TipData.content}
          onChange={handleTipChange}
        
        ></textarea>
        <button onClick={handlePostTip}>POST</button>
      </div>
    </>
  );
}
export default Tips;
