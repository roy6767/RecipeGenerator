import React from 'react';
import { X } from 'lucide-react';
import './RecipeModal.css'; // We will create this CSS file next

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    // The semi-transparent background
    <div className="modal-overlay" onClick={onClose}>
      {/* The modal content box */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <img src={recipe.image} alt={recipe.title} className="modal-img" />
        
        <div className="modal-body">
          <h2 className="modal-title">{recipe.title}</h2>
          
          <div className="modal-meta">
            <span>⏱️ {recipe.time}</span>
            <span className={`difficulty-tag difficulty-${recipe.difficulty.toLowerCase()}`}>
              {recipe.difficulty}
            </span>
          </div>

          <h3 className="modal-sub-title">Ingredients</h3>
          <ul className="modal-ingredients">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="modal-sub-title">Preparation</h3>
          <p className="modal-description">
            {recipe.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;