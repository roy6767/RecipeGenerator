import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, LogOut, User, Cookie, Shield } from 'lucide-react';

const RecipeCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const recipes = [
    {
      id: 1,
      title: "Classic Margherita Pizza",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop",
      time: "30 min",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=400&fit=crop",
      time: "25 min",
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Chicken Tikka Masala",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop",
      time: "45 min",
      difficulty: "Medium"
    },
    {
      id: 4,
      title: "Caesar Salad",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop",
      time: "15 min",
      difficulty: "Easy"
    },
    {
      id: 5,
      title: "Beef Tacos",
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=400&fit=crop",
      time: "35 min",
      difficulty: "Easy"
    },
    {
      id: 6,
      title: "Chocolate Lava Cake",
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=400&fit=crop",
      time: "40 min",
      difficulty: "Hard"
    }
  ];

  // Duplicate recipes for seamless loop
  const duplicatedRecipes = [...recipes, ...recipes, ...recipes];

  useEffect(() => {
    const scrollSpeed = 1; // pixels per frame
    const cardHeight = 320; // approximate height of each card including margin
    const totalHeight = recipes.length * cardHeight;

    const animate = () => {
      setScrollPosition(prev => {
        const newPosition = prev + scrollSpeed;
        // Reset to middle set when reaching the end of second set
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
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700 px-4 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Delicious Recipes
          </h1>
          
          <div className="relative h-[600px] overflow-hidden">
            <div 
              ref={containerRef}
              className="absolute w-full transition-none"
              style={{ 
                transform: `translateY(-${scrollPosition}px)`,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {duplicatedRecipes.map((recipe, index) => (
                  <div 
                    key={`${recipe.id}-${index}`}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                  >
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {recipe.title}
                      </h3>
                      <div className="flex justify-between text-gray-400 text-sm">
                        <span>⏱️ {recipe.time}</span>
                        <span className={`font-medium ${
                          recipe.difficulty === 'Easy' ? 'text-green-400' :
                          recipe.difficulty === 'Medium' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
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
      <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <ChefHat size={20} />
              <span className="hidden sm:inline">Generate Recipe</span>
            </button>
            
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-6 text-gray-400">
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Shield size={16} />
                  <span>Privacy Policy</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Cookie size={16} />
                  <span>Cookies</span>
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                © All rights reserved by Jensen YH-AWS24
              </p>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <User size={20} />
              <span className="hidden sm:inline">Profile</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecipeCarousel;