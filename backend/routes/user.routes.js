import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes - require authentication
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Example protected route
router.get('/me', protect, (req, res) => {
  res.json({ message: 'Protected route accessed successfully', user: req.user });
});

// GET all users - Example endpoint
router.get('/', protect, async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, created_at FROM users');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
});

// GET user by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    next(error);
  }
});

// PUT update user
router.put('/:id', protect, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.params.id;

    // Verify user is updating their own profile
    if (req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this user'
      });
    }

    // Build query dynamically based on provided fields
    let query = 'UPDATE users SET ';
    const params = [];
    const updates = [];

    if (name !== undefined) {
      updates.push('name = ?');
      params.push(name);
    }
    
    if (email !== undefined) {
      updates.push('email = ?');
      params.push(email);
    }
    
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push('password = ?');
      params.push(hashedPassword);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update'
      });
    }

    query += updates.join(', ') + ' WHERE id = ?';
    params.push(userId);

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get updated user data
    const [updatedUser] = await db.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [userId]);

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser[0]
    });
  } catch (error) {
    next(error);
  }
});

// DELETE user
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const userId = req.params.id;
    
    // Verify user is deleting their own account or is admin
    if (req.user.id !== userId && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this user'
      });
    }

    const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // If user is deleting their own account, log them out
    if (req.user.id === userId) {
      res.clearCookie('token');
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
