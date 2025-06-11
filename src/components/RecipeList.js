import React from 'react';
import RecipeCard from './RecipeCard';

function RecipeList({ recipes, onRecipeClick }) {
  if (recipes.length === 0) {
    return <p>No recipes found. Try searching for something else.</p>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '20px',
      }}
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onClick={() => onRecipeClick(recipe.id)} />
      ))}
    </div>
  );
}

export default RecipeList;