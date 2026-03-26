const db = require("../config/db");

exports.createComment = async (req , res)=>{
    const tip_id = req.params.tip_id;

    const {user_id , content} = req.body;

     if(!content || content.trim() === ""){
            return res.status(400).json({
                message : "Comment cannot be empty"
            })
        }
        if(!user_id){
            return res.status(400).json({
                message : "user_id requried"
            })
        }
console.log("before querry");
    const sql = "INSERT INTO comments(tip_id , user_id , content) VALUES(?, ? , ?)";
    console.log("after querry");
    try{
    const [result] = await db.query(sql , [tip_id , user_id , content]);
       
    res.status(201).json({
            message: "Comment added",
            comment_id: result.insertId
        });
    }catch(err){
        res.status(500).json({
            message: "Server error"
        })
    }
}

exports.getComments = async (req,res)=>{
   const tip_id = req.params.tip_id;

   const sql = `SELECT 
                user_id,
                content,
                created_at
                FROM comments WHERE tip_id = ?
                ORDER BY created_at DESC`;

    try{

    const [result] = await db.query(sql, [tip_id]);
    if(result.length === 0){
        res.status(201).json({
            message:"No comments yet"
        });
    }
    res.json(result);
    console.log("response send");
}catch(err){
    res.status(500).json({
        message: "Server error"
    });
}
   
};