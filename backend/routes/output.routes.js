const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// Create a MySQL2 connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

// GET /api/results/latest/:userId
// Fetch the latest result for a given user
router.get("/latest/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Execute the query
    const [results] = await pool.execute(
      "SELECT * FROM results WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
      [userId]
    );

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: "No results found for this user." });
    }

    // Return the latest result
    res.json(results[0]);
  } catch (err) {
    console.error("Error fetching result:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
