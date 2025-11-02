require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

// Import routes
const userRoutes = require("./routes/user.routes");
const outputRoutes = require("./routes/output.routes");
const recipeRoutes = require("./routes/recipe.routes");

const app = express();
const PORT = process.env.PORT || 5001 || 5002 || 5003 || 5004;

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

// Start server with fallback ports
const FALLBACK_PORTS = [5001, 5002, 5003, 5004];
let currentPortIndex = 0;

const startServer = (port) => {
  const server = app.listen(port, () => {
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Port ${port} is busy, trying next port...`);
      currentPortIndex++;
      
      if (currentPortIndex < FALLBACK_PORTS.length) {
        startServer(FALLBACK_PORTS[currentPortIndex]);
      } else {
        console.error(`❌ All ports (${FALLBACK_PORTS.join(', ')}) are in use.`);
        console.error('💡 Please stop one of the running servers or free up a port.');
        process.exit(1);
      }
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
};

startServer(PORT);
