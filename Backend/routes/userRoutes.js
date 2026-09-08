const express = require("express");
const router = express.Router();

const {registerUser , loginUser , verifyOtp} = require("../controllers/userController");
const {verifyToken}= require("../middleware/authmiddleware");

router.get("/test",(req,res)=>{
    res.send("User route working");
});

router.post("/register" , registerUser);
router.post("/verify-otp" , verifyOtp);
router.post("/login" , loginUser);
router.get("/profile" , verifyToken ,(req,res)=>{
   res.json({
        message: "Protected route accessed",
        user: req.user
    });
});


module.exports = router;