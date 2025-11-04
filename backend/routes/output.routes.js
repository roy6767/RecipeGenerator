const express = require("express");
const router = express.Router();
const db = require("../db");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.sendStatus(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// GET /api/results/latest/:userId
// Fetch the latest result for a given user
router.get("/latest/", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
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
