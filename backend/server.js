require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

// Import routes
const userRoutes = require("./routes/user.routes");
const outputRoutes = require("./routes/output.routes");
const recipeRoutes = require("./routes/recipe.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/results", outputRoutes);
app.use("/api/recipes", recipeRoutes);

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Error handling middleware - must be last
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
