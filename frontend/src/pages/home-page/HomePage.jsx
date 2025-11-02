-- Create database
CREATE DATABASE IF NOT EXISTS recipes_db;
USE recipes_db;

-- Drop tables if they exist (in reverse order due to foreign key constraints)
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;

-- Create the main 'recipes' table
CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(512),
  cook_time VARCHAR(50),
  difficulty VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create the 'ingredients' table
CREATE TABLE ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT NOT NULL,
  ingredient_text VARCHAR(255) NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert all recipes
INSERT INTO recipes (id, title, image_url, cook_time, difficulty, description) VALUES
(1, 'Classic Margherita Pizza', 
 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop', 
 '30 min', 
 'Easy',
 '1. Preheat oven to 240°C (475°F).\n2. Roll out pizza dough on a floured surface.\n3. Spread tomato sauce evenly on the dough.\n4. Sprinkle mozzarella cheese over the sauce.\n5. Bake for 10-12 minutes until crust is golden.\n6. Garnish with fresh basil leaves and a drizzle of olive oil.'),

(2, 'Spaghetti Carbonara', 
 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=400&fit=crop', 
 '25 min', 
 'Medium',
 '1. Boil spaghetti until al dente.\n2. Fry pancetta until crispy.\n3. In a bowl, whisk eggs, cheese, and lots of pepper.\n4. Drain pasta (reserve some pasta water).\n5. Add pasta to the pan with pancetta. Turn off heat.\n6. Quickly pour in egg mixture, tossing rapidly. Add pasta water if needed to create a creamy sauce. Serve immediately.'),

(3, 'Chicken Tikka Masala', 
 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop', 
 '45 min', 
 'Medium',
 '1. Marinate chicken in yogurt, ginger-garlic paste, and spices for at least 1 hour.\n2. Grill or pan-sear the chicken until cooked.\n3. In a separate pan, create the sauce by simmering tomato puree, spices, and cream.\n4. Add the cooked chicken to the sauce and simmer for 10 more minutes.'),

(4, 'Caesar Salad', 
 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop', 
 '15 min', 
 'Easy',
 '1. Chop the romaine lettuce and wash it thoroughly.\n2. In a large bowl, combine lettuce, croutons, and half the parmesan cheese.\n3. Add Caesar dressing and a squeeze of fresh lemon juice. Toss to coat evenly.\n4. Top with the remaining parmesan cheese and serve.'),

(5, 'Beef Tacos', 
 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=400&fit=crop', 
 '35 min', 
 'Easy',
 '1. In a skillet, cook the ground beef until browned. Drain excess fat.\n2. Add the taco seasoning and water (as directed on the packet) and simmer until thickened.\n3. Warm the taco shells in the oven.\n4. Assemble the tacos by filling shells with beef, lettuce, tomatoes, and cheese.'),

(6, 'Chocolate Lava Cake', 
 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=400&fit=crop', 
 '40 min', 
 'Hard',
 '1. Preheat oven to 220°C (425°F). Grease two ramekins.\n2. Melt dark chocolate and butter together in the microwave.\n3. In a separate bowl, whisk eggs, egg yolks, and sugar until pale and fluffy.\n4. Fold the melted chocolate mixture into the eggs, then gently fold in the flour.\n5. Pour batter into ramekins and bake for 12-14 minutes. The edges should be firm but the center still soft.\n6. Let cool for 1 minute, then invert onto a plate.');

-- Insert all ingredients
INSERT INTO ingredients (recipe_id, ingredient_text) VALUES
-- Recipe 1: Classic Margherita Pizza
(1, '1 Pizza Dough'),
(1, '1/2 cup Tomato Sauce'),
(1, '1 cup Mozzarella Cheese'),
(1, 'Fresh Basil Leaves'),
(1, 'Olive Oil'),

-- Recipe 2: Spaghetti Carbonara
(2, '200g Spaghetti'),
(2, '100g Pancetta or Guanciale'),
(2, '2 large Eggs'),
(2, '50g Pecorino Cheese, grated'),
(2, 'Black Pepper'),

-- Recipe 3: Chicken Tikka Masala
(3, '500g Chicken Breast'),
(3, '1 cup Yogurt'),
(3, '1 tbsp Ginger-Garlic Paste'),
(3, 'Spices (Tikka Masala)'),
(3, '1 can Tomato Puree'),
(3, '1/2 cup Heavy Cream'),

-- Recipe 4: Caesar Salad
(4, '1 head Romaine Lettuce'),
(4, '1 cup Croutons'),
(4, '1/2 cup Grated Parmesan'),
(4, '1/4 cup Caesar Dressing'),
(4, 'Lemon Juice'),

-- Recipe 5: Beef Tacos
(5, '500g Ground Beef'),
(5, '1 packet Taco Seasoning'),
(5, '8 Hard Taco Shells'),
(5, '1 cup Shredded Lettuce'),
(5, '1 cup Diced Tomatoes'),
(5, '1 cup Shredded Cheddar Cheese'),

-- Recipe 6: Chocolate Lava Cake
(6, '100g Dark Chocolate'),
(6, '1/2 cup Butter'),
(6, '2 Eggs'),
(6, '2 Egg Yolks'),
(6, '1/4 cup Sugar'),
(6, '2 tbsp Flour');