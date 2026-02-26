const db = require('./server/db');
const express = require('express');
const app = express();

app.use(express.json());
app.post('/register' , (req,res)=>{
    const{name , email , password , role} = req.body;

    const sql = "INSERT INTO users(name , email , password , role)VALUES(? , ? , ? , ?)";

    db.query(sql , [name , email , password , role] , (err , result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({message: "Error inserting user"});
        }
        res.json({message: "User registered successfully"});
    });
});

app.get('/register', (req, res) => {
    res.send("Register route working (GET)");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});