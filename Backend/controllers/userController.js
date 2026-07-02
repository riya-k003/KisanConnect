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
      const [result] = await  db.query(sql, [name, email, hashedPassword, role]);

            return res.status(201).json({
                message: "User registered successfully",
                userId: result.insertId
            });
        }catch(error){
            console.log(error);

            if(error.code === 'ER_DUP_ENTRY'){
                return res.status(400).json({
                    message: "Email already exists"
                });
            }
            return res.status(500).json({
                message: "Server error"
            });
        } 
    
};

exports.loginUser = async (req, res) => {
    console.log("login api hit");
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send("Email and password required");
    }

    try {
        const sql = "SELECT * FROM users WHERE  email = ? ";
        const [result] = await db.query(sql, [email]);
           

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
            });
            }
            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: "Wrong Password"
                });
            }
            const token = jwt.sign(
                { id: user.id,
                  email: user.email,
                  role: user.role,
                  name: user.name 
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                message: "Login Successful",
                token: token
            });

    } catch (error) {
        console.log(error);
        res.send("Server error");

    }
};