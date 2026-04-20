const db = require("../config/db")

exports.createTip = (req , res) =>{

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

    const sql = "INSERT INTO tips (title , content , category , farmer_id) VALUES (? , ? , ? , ?)";
    db.query(sql , [trimmedTitle , trimmedContent , trimmedCategory , farmer_id] , (err , result) =>{
        
        if(err){
            return res.status(500).json({
                message: "Error creating tip"
            })
        }
        res.status(201).json({
            message: "Tip created successfully",
            tip:{
                tip_id : result.insertId,
                title: trimmedTitle,
                content : trimmedContent,
                category : trimmedCategory,
                farmer_id,
                likes_count:0,
                isLiked:false
            }
        });
    });
};

exports.viewTips = async (req, res)=>{
    console.log("viewTips API hit");
    console.log("req.user:", req.user);
    console.log("user id:", req.user?.id);
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
        COUNT(DISTINCT al.user_id) AS likes_count,
        CASE
            WHEN ul.user_id IS NOT NULL THEN true
            Else false
        END AS isLiked
    FROM tips t
    JOIN users u ON t.farmer_id = u.id
    LEFT JOIN likes al ON t.tip_id = al.tip_id 
    LEFT JOIN likes ul ON t.tip_id = ul.tip_id AND ul.user_id = ?
    GROUP BY 
        t.tip_id,
        t.title,
        t.content,
        t.category,
        t.created_at,
        u.name,
        ul.user_id
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
            res.status(500).json({
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
