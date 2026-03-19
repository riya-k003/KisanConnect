const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password: '0330',
    database:'KisanConnect'
});
// db.connect((err) => {
//     if (err) {
//         console.error("Database connection failed:", err);
//         return;
//     }
    console.log("Database connected");
// });


module.exports = db;