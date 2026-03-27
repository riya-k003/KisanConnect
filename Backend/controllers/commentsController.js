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
        console.log("comments before querry");
    const [result] = await db.query(sql, [tip_id]);
    console.log("comment after query");
    if(result.length === 0){
        return res.status(200).json({
            message:"No comments yet"
        });
    }
   return res.status(200).json(result);
}catch(err){
    console.log(err);
    return res.status(500).json({
        message: "Server error"
    });
}
   
};
