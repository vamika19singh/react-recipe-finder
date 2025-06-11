import React from 'react';

function Filters({ filters, onFilterChange }) {
  const diets = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Gluten Free', value: 'gluten free' },
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <span style={{ marginRight: '10px' }}>Filter by diet:</span>
      {diets.map((diet) => (
        <label key={diet.value} style={{ marginRight: '15px' }}>
          <input
            type="checkbox"
            checked={filters.includes(diet.value)}
            onChange={() => onFilterChange(diet.value)}
          />{' '}
          {diet.label}
        </label>
      ))}
    </div>
  );
}

export default Filters;