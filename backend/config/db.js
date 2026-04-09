const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mern_auth_db',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

// Test connection
(async () => {
    try {
        const conn = await promisePool.getConnection();
        console.log('✅ MySQL Connected to mern_auth_db');
        conn.release();
    } catch (err) {
        console.error('❌ MySQL Error:', err.message);
    }
})();

module.exports = promisePool;