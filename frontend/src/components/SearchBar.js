import React, { useState } from 'react';

function SearchBar({ onSearch, features }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for features (e.g., Tycho Crater, Olympus Mons)..."
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ddd',
          minWidth: '300px'
        }}
      />
      <button 
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          marginLeft: '0.5rem',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
