const express = require("express");
const router = express.Router();
const generateController = require("../controller/generate.controller");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, generateController.generateRecipe);

router.get("/test", (req, res) => {
  res.json({ message: "Generate route working" });
});

module.exports = router;
