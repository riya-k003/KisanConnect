const db = require("../config/db")

exports.createTip = (req , res) =>{

    const {title , content , category} = req.body;

    const farmer_id = req.user.id;

    const sql = "INSERT INTO tips (title , content , category , farmer_id) VALUES (? , ? , ? , ?)";
    db.query(sql , [title , content , category , farmer_id] , (err , result) =>{
        
        if(err){
            return res.status(500).json({
                message: "Error creating tip"
            })
        }
        res.status(201).json({
            message: "Tip created successfully"
        })
    })
};

exports.viewTips = async (req, res)=>{
    console.log("viewTips API hit");
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
        COUNT(l.tip_id) AS likes_count,
        COALESCE(SUM(l.user_id IS NOT NULL),0) > 0 AS isLiked
        FROM tips t
        JOIN users u ON t.farmer_id = u.id
        LEFT JOIN likes l ON t.tip_id = l.tip_id AND l.user_id = ?
        GROUP BY t.tip_id
        ORDER BY t.tip_id DESC
        LIMIT ? OFFSET ?
        `;
        try{
    console.log("Before query");

        const [results] = await db.query(sql , [user_id , limit , offset]);
            console.log("After query");
           
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
