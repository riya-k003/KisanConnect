const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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