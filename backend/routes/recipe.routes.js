const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all recipes with their ingredients
router.get('/', async (req, res, next) => {
  try {
    // First, get all recipes
    const [recipes] = await db.query('SELECT * FROM recipes ORDER BY id');
    
    // For each recipe, get its ingredients
    const recipesWithIngredients = await Promise.all(
      recipes.map(async (recipe) => {
        const [ingredients] = await db.query(
          'SELECT ingredient_text FROM ingredients WHERE recipe_id = ?',
          [recipe.id]
        );
        
        return {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image_url,
          time: recipe.cook_time,
          difficulty: recipe.difficulty,
          ingredients: ingredients.map(ing => ing.ingredient_text),
          description: recipe.description
        };
      })
    );
    
    res.json({
      success: true,
      data: recipesWithIngredients
    });
  } catch (error) {
    next(error);
  }
});

// GET single recipe by ID with ingredients
router.get('/:id', async (req, res, next) => {
  try {
    const [recipes] = await db.query('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
    
    if (recipes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    const recipe = recipes[0];
    
    // Get ingredients for this recipe
    const [ingredients] = await db.query(
      'SELECT ingredient_text FROM ingredients WHERE recipe_id = ?',
      [recipe.id]
    );
    
    const recipeWithIngredients = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      time: recipe.cook_time,
      difficulty: recipe.difficulty,
      ingredients: ingredients.map(ing => ing.ingredient_text),
      description: recipe.description
    };
    
    res.json({
      success: true,
      data: recipeWithIngredients
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
