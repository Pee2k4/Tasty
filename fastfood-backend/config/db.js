const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 22839, // Aiven thường dùng 22839

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    
    // THÊM DÒNG NÀY ĐỂ CHẠY ĐƯỢC TRÊN CLOUD
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool.promise();