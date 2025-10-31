import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, LogOut, User, Cookie, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import RecipeModal from './RecipeModal';

const HomePage = () => {
    // Refs for animation, state for modal
    const containerRef = useRef(null);
    const animationFrameRef = useRef(null);
    const scrollPositionRef = useRef(0);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const navigate = useNavigate();

    const recipes = [
      { 
          id: 1, 
          title: "Classic Margherita Pizza", 
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop", 
          time: "30 min", 
          difficulty: "Easy",
          ingredients: [
              "1 Pizza Dough",
              "1/2 cup Tomato Sauce",
              "1 cup Mozzarella Cheese",
              "Fresh Basil Leaves",
              "Olive Oil"
          ],
          description: "1. Preheat oven to 240°C (475°F).\n2. Roll out pizza dough on a floured surface.\n3. Spread tomato sauce evenly on the dough.\n4. Sprinkle mozzarella cheese over the sauce.\n5. Bake for 10-12 minutes until crust is golden.\n6. Garnish with fresh basil leaves and a drizzle of olive oil."
      },
      { 
          id: 2, 
          title: "Spaghetti Carbonara", 
          image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=400&fit=crop", 
          time: "25 min", 
          difficulty: "Medium",
          ingredients: [
              "200g Spaghetti",
              "100g Pancetta or Guanciale",
              "2 large Eggs",
              "50g Pecorino Cheese, grated",
              "Black Pepper"
          ],
          description: "1. Boil spaghetti until al dente.\n2. Fry pancetta until crispy.\n3. In a bowl, whisk eggs, cheese, and lots of pepper.\n4. Drain pasta (reserve some pasta water).\n5. Add pasta to the pan with pancetta. Turn off heat.\n6. Quickly pour in egg mixture, tossing rapidly. Add pasta water if needed to create a creamy sauce. Serve immediately."
      },
      { 
          id: 3, 
          title: "Chicken Tikka Masala", 
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop", 
          time: "45 min", 
          difficulty: "Medium", 
          ingredients: ["500g Chicken Breast", "1 cup Yogurt", "1 tbsp Ginger-Garlic Paste", "Spices (Tikka Masala)", "1 can Tomato Puree", "1/2 cup Heavy Cream"], 
          description: "1. Marinate chicken in yogurt, ginger-garlic paste, and spices for at least 1 hour.\n2. Grill or pan-sear the chicken until cooked.\n3. In a separate pan, create the sauce by simmering tomato puree, spices, and cream.\n4. Add the cooked chicken to the sauce and simmer for 10 more minutes." 
      },
      { 
          id: 4, 
          title: "Caesar Salad", 
          image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop", 
          time: "15 min", 
          difficulty: "Easy", 
          ingredients: ["1 head Romaine Lettuce", "1 cup Croutons", "1/2 cup Grated Parmesan", "1/4 cup Caesar Dressing", "Lemon Juice"], 
          description: "1. Chop the romaine lettuce and wash it thoroughly.\n2. In a large bowl, combine lettuce, croutons, and half the parmesan cheese.\n3. Add Caesar dressing and a squeeze of fresh lemon juice. Toss to coat evenly.\n4. Top with the remaining parmesan cheese and serve." 
      },
      { 
          id: 5, 
          title: "Beef Tacos", 
          image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=400&fit=crop", 
          time: "35 min", 
          difficulty: "Easy", 
          ingredients: ["500g Ground Beef", "1 packet Taco Seasoning", "8 Hard Taco Shells", "1 cup Shredded Lettuce", "1 cup Diced Tomatoes", "1 cup Shredded Cheddar Cheese"], 
          description: "1. In a skillet, cook the ground beef until browned. Drain excess fat.\n2. Add the taco seasoning and water (as directed on the packet) and simmer until thickened.\n3. Warm the taco shells in the oven.\n4. Assemble the tacos by filling shells with beef, lettuce, tomatoes, and cheese." 
      },
      { 
          id: 6, 
          title: "Chocolate Lava Cake", 
          image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=400&fit=crop", 
          time: "40 min", 
          difficulty: "Hard", 
          ingredients: ["100g Dark Chocolate", "1/2 cup Butter", "2 Eggs", "2 Egg Yolks", "1/4 cup Sugar", "2 tbsp Flour"], 
          description: "1. Preheat oven to 220°C (425°F). Grease two ramekins.\n2. Melt dark chocolate and butter together in the microwave.\n3. In a separate bowl, whisk eggs, egg yolks, and sugar until pale and fluffy.\n4. Fold the melted chocolate mixture into the eggs, then gently fold in the flour.\n5. Pour batter into ramekins and bake for 12-14 minutes. The edges should be firm but the center still soft.\n6. Let cool for 1 minute, then invert onto a plate." 
      }
    ];

    const duplicatedRecipes = [...recipes, ...recipes, ...recipes];

    // This useEffect handles the animation without causing re-renders
    useEffect(() => {
        const scrollSpeed = 1;
        const cardHeight = 320; // card height + gap
        const totalHeight = recipes.length * cardHeight;
        
        const container = containerRef.current;
        if (!container) return; 

        const animate = () => {
            scrollPositionRef.current += scrollSpeed;
            
            if (scrollPositionRef.current >= totalHeight * 2) {
                scrollPositionRef.current = totalHeight;
            }

            container.style.transform = `translateY(-${scrollPositionRef.current}px)`;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Only animate if the modal is NOT open
        if (!selectedRecipe) {
            animationFrameRef.current = requestAnimationFrame(animate);
        }

        // Cleanup: stop the animation
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [recipes.length, selectedRecipe]); // Re-runs when modal opens/closes


    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleCloseModal = () => {
        setSelectedRecipe(null);
    };

     const handlePrivacyPolicyClick = () => {
        navigate('/privacy-policy');
    };

       return (
        <div className="app-container">
            {/* Navigation Bar */}
            <nav className="nav-bar sticky-nav">
                <div className="nav-container">
                    <button className="primary-btn red-btn">
                        <LogOut size={20} />
                        <span className="hidden sm-inline">Logout</span>
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="main-content">
                <div className="content-container">
                    <h1 className="main-title">Delicious Recipes</h1>
                    
                    <div className="carousel-wrapper">
                        <div 
                            ref={containerRef}
                            className="carousel-content"
                        >
                            <div className="recipe-grid"> 
                                {duplicatedRecipes.map((recipe, index) => (
                                    <div 
                                        key={`${recipe.id}-${index}`}
                                        className="recipe-card"
                                        onClick={() => handleRecipeClick(recipe)}
                                    >
                                        <img 
                                            src={recipe.image} 
                                            alt={recipe.title}
                                            className="card-img"
                                        />
                                        <div className="card-body">
                                            <h3 className="card-title">{recipe.title}</h3>
                                            <div className="card-footer">
                                                <span>⏱️ {recipe.time}</span>
                                                <span className={`difficulty-tag difficulty-${recipe.difficulty.toLowerCase()}`}>
                                                    {recipe.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="nav-bar footer-nav">
                <div className="nav-container">
                    <div id="footer-elements" className="footer-content">
                        <button className="primary-btn green-btn">
                            <ChefHat size={20} />
                            <span className="hidden sm-inline">Generate Recipe</span>
                        </button>
                        
                        <div className="footer-center">
                            <div className="footer-links">
                                <button 
                                    onClick={handlePrivacyPolicyClick} 
                                    className="footer-link"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <Shield size={16} />
                                    <span>Privacy Policy</span>
                                </button>
                                <a href="#" className="footer-link">
                                    <Cookie size={16} />
                                    <span>Cookies</span>
                                </a>
                            </div>
                            <p className="footer-text">
                                © All rights reserved by Jensen YH-AWS24
                            </p>
                        </div>
                        
                        <button className="primary-btn blue-btn">
                            <User size={20} />
                            <span className="hidden sm-inline">Profile</span>
                        </button>
                    </div>
                </div>
            </footer>

            {/* Modal rendering */}
            {selectedRecipe && (
                <RecipeModal 
                    recipe={selectedRecipe} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default HomePage;