const db = require("../config/db")

exports.createTip = (req , res) =>{

    console.log("createTip called with body:", req.body);
     console.log("req.file:", req.file);  
    console.log("User from token:", req.user);

    const {title , content , category} = req.body;

    if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    typeof category !== "string"
  ) {
    return res.status(400).json({
      message: "Title, content, and category must be strings",
    });
  }

    
    const trimmedTitle = title?.trim();
const trimmedContent = content?.trim();
const trimmedCategory = category?.trim();

if (!trimmedTitle || !trimmedContent || !trimmedCategory) {
    return res.status(400).json({
        message: "All fields are required"
    });
}

if (/^\d+$/.test(trimmedTitle)) {
    return res.status(400).json({
      message: "Title cannot contain only numbers",
    });
  }

if (trimmedTitle.length < 3) {
    return res.status(400).json({
        message: "Title must be at least 3 characters"
    });
}

if (trimmedContent.length < 10) {
    return res.status(400).json({
        message: "Content must be at least 10 characters"
    });
}

    const farmer_id = req.user.id;
    const image_url = req.file ? req.file.path : null;

    const sql = "INSERT INTO tips (title , content , category , farmer_id , image_url) VALUES (? , ? , ? , ? , ?)";
    
    const queryPromise = db.query(sql , [trimmedTitle , trimmedContent , trimmedCategory , farmer_id , image_url]);
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout')), 5000)
    );
    
    Promise.race([queryPromise, timeoutPromise])
        .then(([result]) => {
            console.log("Database insert successful, result:", result);
            res.status(201).json({
                message: "Tip created successfully",
                tip:{
                    tip_id : result.insertId,
                    title: trimmedTitle,
                    content : trimmedContent,
                    category : trimmedCategory,
                    farmer_id,
                    image_url,
                    likes_count:0,
                    isLiked:false
                }
            });
        })
        .catch((err) => {
            console.log("Database error:", err);
            res.status(500).json({
                message: "Error creating tip"
            });
        });
};

exports.viewTips = async (req, res)=>{
    const user_id = req.user ? req.user.id : null;
    const page = parseInt(req.query.page) || 1 ;

    

    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1)*limit;

    const sql = `
    SELECT 
        t.tip_id,
        t.title,
        t.content,
        t.category,
        t.created_at,
        u.name AS farmer_name,
       (SELECT COUNT(*) FROM likes l WHERE l.tip_id = t.tip_id) AS likes_count,
       (SELECT COUNT(*) FROM comments cm WHERE cm.tip_id = t.tip_id) AS comments_count,
        EXISTS (
        SELECT 1 FROM likes ul WHERE ul.tip_id = t.tip_id AND ul.user_id = ?
        ) AS isliked
    FROM tips t
    JOIN users u ON t.farmer_id = u.id
    ORDER BY t.tip_id DESC
    LIMIT ? OFFSET ?
        `;
        try{
        const [results] = await db.query(sql , [user_id , limit , offset]);
           console.log("results:", results);
           console.log("first result:" , results[0]);

           
            res.json({
                page, 
                tips : results
            });
        }catch(err){
            console.log("DB ERROR:" , err);
            res.status(401).json({
                message: "server error"
            });
        }

};

exports.togglelike = async (req, res)=>{
     console.log("toggle api hit");
    const user_id = req.user.id;
    const tip_id = req.params.tip_id;

     console.log("User:", user_id);
    console.log("Tip:", tip_id);

    try{
        const [existing] = await db.query("SELECT * FROM likes WHERE user_id = ? AND tip_id = ?",
        [user_id , tip_id]);

        let liked;
        if(existing.length > 0){
            await db.query(
                "DELETE FROM likes WHERE user_id = ? AND tip_id = ?",
                [user_id , tip_id]
            );
            liked = false;
        }
        else{
            await db.query(
                "INSERT INTO likes (user_id , tip_id) VALUES (? , ?)",
                [user_id , tip_id]
            );
            liked = true;
        }

            const [count] = await db.query(
                "SELECT COUNT(*) as likes_count FROM likes WHERE tip_id = ?",
                [tip_id]
            );
            res.json({
                liked,
                likes_count: count[0].likes_count
            });
}
 catch(error){
    console.log(error);
    res.status(500).json({
        message: "Server error"
    });
 }
};

exports.deleteTip =  async(req , res)=>{
    const tip_id = parseInt(req.params.tip_id, 10);
    const farmer_id = req.user.id;

    const sql = "DELETE FROM tips WHERE farmer_id = ? AND tip_id =?;"
    const queryPromise = db.query(sql , [farmer_id , tip_id]);
    const timeoutPromise = new Promise((_ , reject)=>
        setTimeout(()=> reject(new Error("Database query timeout")), 5000)
);

    try{
        const [result] = await Promise.race([queryPromise , timeoutPromise]);
            if(result.affectedRows === 0){
                return res.status(404).json({
                    message: "Tip not found or you don't have permission to delete this tip"
                });
            }
           return res.status(200).json({
            message: "Tip deleted successfully",
            });

        } catch(err) {
            console.log("Delete error:", err);
            return res.status(500).json({
              message: "Server error"
            });
        }
};