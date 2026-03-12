require("dotenv").config();
const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    console.log("register api hit");
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users(name , email , password  , role) VALUES (? , ? , ? , ?)";

        db.query(sql, [name, email, hashedPassword, role], (err, result) => {

            if (err) {
                console.log(err);
                return res.send("Error inserting users");
            }
            res.send("User registered successfully");
        });
    } catch (error) {
        console.log(error);
        res.send("Server error");
    }
};

exports.loginUser = async (req, res)=>{
    console.log("login api hit");
    const{ email , password} = req.body;

    if(!email || !password){
        return res.send("Email and password required");
    }

    try{
        const sql = "SELECT * FROM users WHERE  email = ? ";
       
        db.query(sql , [email] , async (err , result)=>{

             if(result.length == 0){
                return res.send("User not found");
            }
            const user = result[0];
                 const isMatch = await bcrypt.compare(password , user.password);
                 if(!isMatch){
                     return res.status(400).json({
                        message:"Wrong Password"
                     });
                 }
                 const token = jwt.sign(
                    {id: user.id , email: user.email},
                    process.env.JWT_SECRET,
                    {expiresIn : "1h"}
                 );
                   res.status(200).json({
                        message:"Login Successful",
                        token : token
                     });

        });
    }catch(error){
        console.log(error);
        res.send("Server error");

    }
};