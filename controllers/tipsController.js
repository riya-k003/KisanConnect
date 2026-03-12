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