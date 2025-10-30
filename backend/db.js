const mysql = require('mysql2');
const dbConfig = require('./config/db.config');

// Create connection pool
const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  waitForConnections: true,
  connectionLimit: dbConfig.pool.max,
  queueLimit: 0
});

// Get promise-based pool for async/await usage
const promisePool = pool.promise();

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
    return;
  }
  console.log('Successfully connected to MySQL database');
  connection.release();
});

module.exports = promisePool;
