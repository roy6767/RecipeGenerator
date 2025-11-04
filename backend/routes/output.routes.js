const express = require("express");
const router = express.Router();
const db = require("../db");

// Fetch latest result for a user
router.get("/latest/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const [results] = await db.execute(
      "SELECT * FROM results WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
      [userId]
    );
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No results found for this user." });
    }
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching result:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
module.exports = router;
