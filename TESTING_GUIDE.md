# Testing Guide - Dynamic Recipe System

## Current Status ✅

### Backend Server
- **Status**: Running successfully on port 5000
- **Database**: Connected to `fridge` database
- **API Endpoint**: `/api/recipes` is working correctly
- **Data**: All 6 recipes with ingredients are being served

### Verified Working
✅ Backend server starts without errors  
✅ Database connection successful  
✅ API returns all recipes with ingredients in correct format  
✅ Frontend code updated to fetch from API  

## Quick Start

### 1. Configure Frontend Environment

**IMPORTANT**: Create/update `frontend/.env` file with:
```
REACT_APP_API_URL=http://localhost:5000
```

You can do this by:
- Opening `frontend/.env` in your editor
- Adding the line above
- Saving the file

### 2. Backend is Already Running ✅
The backend server is currently running on port 5000. You can verify by visiting:
- http://localhost:5000 (health check)
- http://localhost:5000/api/recipes (recipe data)

### 3. Start the Frontend

Open a **new terminal** and run:
```bash
cd frontend
npm start
```

The React app will open at http://localhost:3000

## What You Should See

### Loading Sequence
1. **Initial Load**: "Loading recipes..." message appears briefly
2. **Recipes Display**: All 6 recipes appear in the carousel:
   - Classic Margherita Pizza
   - Spaghetti Carbonara
   - Chicken Tikka Masala
   - Caesar Salad
   - Beef Tacos
   - Chocolate Lava Cake

### Interactive Features
3. **Click a Recipe**: Modal opens showing:
   - Recipe title
   - Cook time and difficulty
   - Full ingredient list (from database)
   - Step-by-step instructions

4. **Auto-scrolling**: Recipe carousel scrolls automatically
5. **No Errors**: Browser console should be clean (no red errors)

## API Test Results

### Sample API Response (Verified Working)
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Classic Margherita Pizza",
      "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop",
      "time": "30 min",
      "difficulty": "Easy",
      "ingredients": [
        "1 Pizza Dough",
        "1/2 cup Tomato Sauce",
        "1 cup Mozzarella Cheese",
        "Fresh Basil Leaves",
        "Olive Oil"
      ],
      "description": "1. Preheat oven to 240°C..."
    }
    // ... 5 more recipes
  ]
}
```

## Testing Checklist

### Backend Tests
- [x] Server starts on port 5000
- [x] Database connection successful
- [x] GET /api/recipes returns 200 OK
- [x] Response includes all 6 recipes
- [x] Each recipe has ingredients array
- [x] CORS headers present

### Frontend Tests (After npm start)
- [ ] Frontend .env configured with API URL
- [ ] App loads without errors
- [ ] Loading state appears briefly
- [ ] All 6 recipes display
- [ ] Recipe images load correctly
- [ ] Click recipe opens modal
- [ ] Modal shows ingredients from database
- [ ] Modal shows description
- [ ] Close modal works
- [ ] No console errors

## Troubleshooting

### If Frontend Shows "Failed to load recipes"

**Check 1**: Is `frontend/.env` configured?
```bash
# In frontend directory
cat .env
# Should show: REACT_APP_API_URL=http://localhost:5000
```

**Check 2**: Is backend running?
```bash
# Test in browser or terminal
curl http://localhost:5000/api/recipes
```

**Check 3**: CORS errors in browser console?
- Already configured in backend, but verify browser console
- Should see `Access-Control-Allow-Origin: *` in network tab

**Check 4**: Restart frontend after .env changes
```bash
# Stop frontend (Ctrl+C)
# Start again
npm start
```

### If Backend Not Running

Restart backend:
```bash
cd backend
npm start
# or for auto-reload during development:
npm run dev
```

## Testing Dynamic Updates

### Add a New Recipe to Database

1. Connect to MySQL:
```sql
USE fridge;

INSERT INTO recipes (title, image_url, cook_time, difficulty, description) 
VALUES (
  'Test Recipe', 
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=400&fit=crop',
  '15 min',
  'Easy',
  'Test instructions'
);

-- Get the new recipe ID (e.g., 7)
SET @recipe_id = LAST_INSERT_ID();

INSERT INTO ingredients (recipe_id, ingredient_text) VALUES
(@recipe_id, 'Test Ingredient 1'),
(@recipe_id, 'Test Ingredient 2');
```

2. Refresh frontend (http://localhost:3000)
3. New recipe should appear automatically!

### Modify Existing Recipe

```sql
UPDATE recipes 
SET title = 'Updated Pizza Title' 
WHERE id = 1;
```

Refresh frontend to see changes.

## Performance Notes

- **First Load**: May take 1-2 seconds to fetch from database
- **Subsequent Loads**: Same timing (no caching yet)
- **Database Queries**: 7 queries per page load (1 for recipes + 6 for ingredients)
- **Future Optimization**: Could use JOIN to reduce to 1 query

## Success Indicators

✅ **Backend Console Shows**:
```
Server is running on port 5000
Successfully connected to MySQL database
```

✅ **Browser Network Tab Shows**:
- Request to `http://localhost:5000/api/recipes`
- Status: 200 OK
- Response: JSON with 6 recipes

✅ **Frontend Displays**:
- All recipe cards with images
- Correct titles, times, and difficulty levels
- Clickable cards that open modals
- Ingredients match database

## Next Steps After Testing

1. **Verify Everything Works**: Complete the testing checklist above
2. **Test Database Updates**: Try adding/modifying recipes
3. **Optional Enhancements**:
   - Add search functionality
   - Implement filters (by difficulty, time)
   - Add pagination for more recipes
   - Cache API responses
   - Add recipe creation UI

## Support

If you encounter issues:
1. Check both backend and frontend console logs
2. Verify .env files are configured correctly
3. Ensure MySQL database is running
4. Check that port 5000 and 3000 are not in use by other apps
5. Review `UPGRADE_NOTES.md` for detailed troubleshooting
