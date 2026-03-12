
exports.isFarmer = (req , res, next)=>{

    if(req.user.role !== "farmer"){
        return res.status(403).json({
            message:"Only farmers can create tips"
        })
    }
    next();
};