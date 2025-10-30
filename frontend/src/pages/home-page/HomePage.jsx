import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, LogOut, User, Cookie, Shield } from 'lucide-react';

// 💡 NEW: Import the standard CSS file
import './HomePage.css';

const HomePage = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);

    const recipes = [
        { id: 1, title: "Classic Margherita Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop", time: "30 min", difficulty: "Easy" },
        { id: 2, title: "Spaghetti Carbonara", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=400&fit=crop", time: "25 min", difficulty: "Medium" },
        { id: 3, title: "Chicken Tikka Masala", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop", time: "45 min", difficulty: "Medium" },
        { id: 4, title: "Caesar Salad", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop", time: "15 min", difficulty: "Easy" },
        { id: 5, title: "Beef Tacos", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=400&fit=crop", time: "35 min", difficulty: "Easy" },
        { id: 6, title: "Chocolate Lava Cake", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=400&fit=crop", time: "40 min", difficulty: "Hard" }
    ];

    const duplicatedRecipes = [...recipes, ...recipes, ...recipes];

    useEffect(() => {
        const scrollSpeed = 1;
        const cardHeight = 320; 
        const totalHeight = recipes.length * cardHeight;

        const animate = () => {
            setScrollPosition(prev => {
                const newPosition = prev + scrollSpeed;
                if (newPosition >= totalHeight * 2) {
                    return totalHeight;
                }
                return newPosition;
            });
        };

        const intervalId = setInterval(animate, 30);
        return () => clearInterval(intervalId);
    }, [recipes.length]);

    return (
        <div className="app-container">
            {/* Navbar */}
            <nav className="nav-bar sticky-nav">
                <div className="max-w-7xl mx-auto flex justify-center items-center">
                    <button className="primary-btn red-btn">
                        <LogOut size={20} />
                        <span className="hidden sm-inline">Logout</span>
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="main-content">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="main-title">Delicious Recipes</h1>
                    
                    <div className="carousel-wrapper">
                        <div 
                            ref={containerRef}
                            className="carousel-content"
                            style={{ 
                                transform: `translateY(-${scrollPosition}px)`,
                            }}
                        >
                            <div className="recipe-grid"> 
                                {duplicatedRecipes.map((recipe, index) => (
                                    <div 
                                        key={`${recipe.id}-${index}`}
                                        className="recipe-card"
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
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col sm-flex-row justify-between items-center gap-4">
                        <button className="primary-btn green-btn">
                            <ChefHat size={20} />
                            <span className="hidden sm-inline">Generate Recipe</span>
                        </button>
                        
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex gap-6 text-gray-400">
                                <a href="#" className="footer-link">
                                    <Shield size={16} />
                                    <span>Privacy Policy</span>
                                </a>
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
        </div>
    );
};

export default HomePage;