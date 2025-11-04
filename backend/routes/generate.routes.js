const express = require('express');
const router = express.Router();
const generateController = require('../controller/generate.controller');

router.post('/', generateController.generateRecipe);

router.get('/test', (req, res) => {
  res.json({ message: 'Generate route working' });
});

module.exports = router;
