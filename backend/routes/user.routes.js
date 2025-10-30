const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all users - Example endpoint
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
});

// GET user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    
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

// POST create new user
router.post('/', async (req, res, next) => {
  try {
    const { username, email } = req.body;
    
    // Basic validation
    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: 'Username and email are required'
      });
    }
    
    const [result] = await db.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: result.insertId,
        username,
        email
      }
    });
  } catch (error) {
    next(error);
  }
});

// PUT update user
router.put('/:id', async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const [result] = await db.query(
      'UPDATE users SET username = ?, email = ? WHERE id = ?',
      [username, email, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// DELETE user
router.delete('/:id', async (req, res, next) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
