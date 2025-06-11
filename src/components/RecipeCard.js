import React, { useState, useEffect } from 'react';

function RecipeCard({ recipe, onClick }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some((fav) => fav.id === recipe.id));
  }, [recipe.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // prevent triggering onClick to open Modal
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== recipe.id);
    } else {
      favorites.push(recipe);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div
    onClick={onClick}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick();
      }}
      aria-label={`Open details for ${recipe.title}`}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: '100%', borderRadius: '6px', marginBottom: '10px' }}
      />
      <h3>{recipe.title}</h3>
      <button
        onClick={toggleFavorite}
        style={{
          marginTop: 'auto',
          padding: '8px 12px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: isFavorite ? '#ff6b6b' : '#bbb',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '★ Favorite' : '☆ Add Favorite'}
      </button>
    </div>
  );
}

export default RecipeCard;