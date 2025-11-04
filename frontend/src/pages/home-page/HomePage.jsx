import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, LogOut, User, Cookie, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './style/HomePage.css';
import RecipeModal from './RecipeModal';
import apiService from '../../services/api';

const HomePage = () => {
    // Refs for animation, state for modal
    const containerRef = useRef(null);
    const animationFrameRef = useRef(null);
    const scrollPositionRef = useRef(0);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch recipes from API on component mount
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                const response = await apiService.recipes.getAll();
                if (response.success && response.data) {
                    setRecipes(response.data);
                }
                setError(null);
            } catch (err) {
                console.error('Error fetching recipes:', err);
                setError('Failed to load recipes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const duplicatedRecipes = [...recipes, ...recipes];

    // Infinite scroll animation effect
    useEffect(() => {
    if (!containerRef.current || recipes.length === 0) return;

    const scrollSpeed = 1; // pixels per frame
    const cardHeight = 320;
    const totalHeight = recipes.length * cardHeight;
    const container = containerRef.current;

    const animate = () => {
        scrollPositionRef.current += scrollSpeed;

        // When first list fully scrolled, reset smoothly
        if (scrollPositionRef.current >= totalHeight) {
        scrollPositionRef.current -= totalHeight;
        }

        container.style.transform = `translateY(-${scrollPositionRef.current}px)`;
        animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (!selectedRecipe) animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current);
    }, [recipes, selectedRecipe]);


    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleCloseModal = () => {
        setSelectedRecipe(null);
    };

    const handlePrivacyPolicyClick = () => {
        navigate('/privacy-policy');
    };

    const handleCookiesClick = () => {
        navigate('/cookies');
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
                    
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                            <p>Loading recipes...</p>
                        </div>
                    ) : error ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#d32f2f' }}>
                            <p>{error}</p>
                        </div>
                    ) : (
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
                    )}
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
                            <button 
                                onClick={handleCookiesClick} 
                                className="footer-link"
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                <Cookie size={16} />
                                <span>Cookies</span>
                            </button>
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