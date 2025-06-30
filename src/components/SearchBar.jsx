import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '10px',
        padding: '20px 32px',
        backgroundColor: '#fafafa',
      }}
    >
      <input
        type="text"
        value={term}
        placeholder="Search news..."
        onChange={(e) => setTerm(e.target.value)}
        style={{
          flexGrow: 1,
          padding: '10px',
          fontSize: '16px',
          borderRadius: '6px',
          border: '1px solid #ccc',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 16px',
          backgroundColor: '#0077cc',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
}

