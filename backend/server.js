import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import outputRoutes from './routes/output.routes.js';
import recipeRoutes from './routes/recipe.routes.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profile.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/results', outputRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


