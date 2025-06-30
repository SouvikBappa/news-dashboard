import React from 'react';

export default function SummarizeButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 16px',
        backgroundColor: '#5c2d91',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        marginTop: '10px',
        cursor: 'pointer',
        fontWeight: '500',
      }}
    >
      🧠 Summarize
    </button>
  );
}
