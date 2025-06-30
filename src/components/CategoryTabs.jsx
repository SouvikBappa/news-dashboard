import React from 'react';

const categories = ['technology', 'business', 'sports', 'health', 'education', 'science'];

export default function CategoryTabs({ onSelect }) {
  return (
    <div style={{ padding: '10px' }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{ marginRight: '10px', padding: '8px', cursor: 'pointer' }}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
