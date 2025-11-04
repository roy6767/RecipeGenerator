import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fridge',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Successfully connected to the database.');
  } catch (err) {
    console.error('Error connecting to MySQL database:', err.message);
    return;
  } finally {
    if (connection) await connection.release();
  }
}

// Test the connection when this module is imported
testConnection().catch(console.error);

// Export the pool for use in other modules
export default pool;
