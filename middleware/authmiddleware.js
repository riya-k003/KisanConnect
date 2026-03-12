const jwt = require("jsonwebtoken");

exports.verifyToken = (req,res, next)=>{

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.send("Access Denied , No Token provided");
    }

    const token = authHeader.split(" ")[1];
    console.log(token);

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    }catch(error){
        res.send("Invalid Token");
    }
};