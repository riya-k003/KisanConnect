const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '0330',
    database:'KisanConnect'
});

connection.connect((err)=>{
    if(err){
        console.error('Database connection failed:' + err.stack);
        return;
    }
    console.log('Database connected');
});

module.exports = connection;