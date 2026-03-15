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

exports.viewTips = (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const offset = (page - 1)*limit;

    const sql = `
        SELECT 
        t.tip_id,
        t.title,
        t.content,
        t.category,
        t.created_at,
        u.name AS farmer_name
        FROM tips t
        JOIN users u ON t.farmer_id = u.id
        ORDER BY t.tip_id DESC
        LIMIT ? OFFSET ?
        `;

        db.query(sql , [limit , offset] , (err , results) =>{
            if(err){
                console.error(err);
                return res.status(500).json({
                    message:"Server error"
                });
            }
            res.json({
                page, 
                tips : results
            });
        });
};