import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onSearch(trimmedInput);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: '10px',
          width: '250px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 15px',
          marginLeft: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;