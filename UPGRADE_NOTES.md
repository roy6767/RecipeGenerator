# Recipe System Upgrade - Static to Dynamic

## Overview
Successfully upgraded the recipe system from hardcoded static data to a dynamic database-driven system.

## Changes Made

### 1. Backend Changes

#### Created New API Route: `backend/routes/recipe.routes.js`
- **GET /api/recipes** - Fetches all recipes with their ingredients from the database
- **GET /api/recipes/:id** - Fetches a single recipe by ID with ingredients

The route queries the `recipes` and `ingredients` tables from the `fridge` database and returns data in the format expected by the frontend.

#### Updated `backend/server.js`
- Added recipe routes import
- Registered `/api/recipes` endpoint

### 2. Frontend Changes

#### Updated `frontend/src/services/api.js`
- Added `recipes` service with `getAll()` and `getById()` methods

#### Updated `frontend/src/pages/home-page/HomePage.jsx`
- Removed hardcoded recipe data
- Added state management for recipes, loading, and error states
- Implemented `useEffect` hook to fetch recipes from API on component mount
- Added loading and error UI states

### 3. Database Schema
The system uses the existing database schema in `backend/init-db.sql`:
- **Database**: `fridge`
- **Tables**: 
  - `recipes` - stores recipe information (title, image_url, cook_time, difficulty, description)
  - `ingredients` - stores ingredients linked to recipes via foreign key

## How to Test

### Prerequisites
1. Ensure MySQL is running
2. Database `fridge` is created and populated (run `backend/init-db.sql`)
3. Backend `.env` file is configured with correct database credentials:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=fridge
   PORT=5000
   ```
4. Frontend `.env` file is configured with backend URL:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

### Testing Steps

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # or for development with auto-reload:
   npm run dev
   ```
   
   Expected output: "Server is running on port 5000"
   Expected output: "Successfully connected to MySQL database"

2. **Test Backend API Directly**
   Open browser or use curl:
   ```bash
   curl http://localhost:5000/api/recipes
   ```
   
   Expected: JSON response with all recipes and their ingredients

3. **Start the Frontend**
   ```bash
   cd frontend
   npm start
   ```
   
   Expected: React app opens at http://localhost:3000

4. **Verify Dynamic Loading**
   - HomePage should display "Loading recipes..." briefly
   - Then display all recipes from the database
   - Click on any recipe to view details (ingredients, description)
   - All data should match what's in the database

### Verification Checklist
- [ ] Backend server starts without errors
- [ ] Database connection successful
- [ ] `/api/recipes` endpoint returns recipe data
- [ ] Frontend displays loading state
- [ ] Recipes appear on the HomePage
- [ ] Recipe cards show correct title, image, time, and difficulty
- [ ] Clicking a recipe opens modal with ingredients and description
- [ ] No console errors in browser

## Database Management

### Adding New Recipes
To add new recipes to the system, insert into the database:

```sql
-- Add a new recipe
INSERT INTO recipes (title, image_url, cook_time, difficulty, description) 
VALUES ('New Recipe', 'https://example.com/image.jpg', '20 min', 'Easy', 'Instructions here');

-- Get the recipe ID (e.g., 7)
-- Add ingredients for the recipe
INSERT INTO ingredients (recipe_id, ingredient_text) VALUES
(7, 'Ingredient 1'),
(7, 'Ingredient 2');
```

The new recipe will automatically appear on the frontend after page refresh.

### Modifying Recipes
Update recipes directly in the database:

```sql
UPDATE recipes SET title = 'Updated Title' WHERE id = 1;
UPDATE ingredients SET ingredient_text = 'New Ingredient' WHERE id = 1;
```

## API Response Format

The backend returns recipes in this format:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Classic Margherita Pizza",
      "image": "https://...",
      "time": "30 min",
      "difficulty": "Easy",
      "ingredients": ["1 Pizza Dough", "1/2 cup Tomato Sauce", ...],
      "description": "1. Preheat oven..."
    }
  ]
}
```

## Troubleshooting

### Frontend shows "Failed to load recipes"
- Check if backend server is running
- Verify `REACT_APP_API_URL` in frontend `.env`
- Check browser console for CORS errors
- Ensure backend CORS is configured (already done in `server.js`)

### Backend connection errors
- Verify MySQL is running
- Check database credentials in backend `.env`
- Ensure database `fridge` exists
- Run `init-db.sql` to create tables and populate data

### Empty recipe list
- Check if database has data: `SELECT * FROM recipes;`
- Verify API response in browser: http://localhost:5000/api/recipes
- Check browser console for errors

## Next Steps (Optional Enhancements)
- Add pagination for large recipe lists
- Implement search and filter functionality
- Add recipe creation/editing endpoints
- Add user authentication for recipe management
- Implement caching to reduce database queries
