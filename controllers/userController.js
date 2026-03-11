const db = require("../config/db.js");
const bcrypt = require("bcrypt");

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

exports.loginUser = async (req,res) => {

    const {email , password} = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql , [email] , async(err , result) => {
        if(err){
            console.log(err);
            return res.send("DataBase Error");
        }
        if(result.length === 0){
            return res.send("User not found");
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch){
            return res.send("Invalid password");
        }
        res.send("Login successfull");
    });

};