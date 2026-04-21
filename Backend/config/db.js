const mysql = require('mysql2/promise')

const db =  mysql.createPool({
    host:'localhost',
    user:'root',
    password: '0330',
    database:'KisanConnect',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.on('connection', (connection) => {
    console.log('Database connection established as id ' + connection.threadId);
});

db.on('error', (err) => {
    console.error('Database pool error:', err);
});

console.log("Database connected");


module.exports = db;