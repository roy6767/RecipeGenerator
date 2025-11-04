const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controller/profileController');

/**
 * GET /api/profile
 * Fetch user info + preferences
 */
router.get('/', verifyToken, getProfile);

/**
 * PUT /api/profile
 * Update user info + preferences
 */
router.put('/', verifyToken, updateProfile);

module.exports = router;
