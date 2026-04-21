const jwt = require("jsonwebtoken");

exports.verifyToken = (req,res, next)=>{

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            message: "Access denied, No token provided"
        });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message: "Token expired or invalid"
        })
    }
};