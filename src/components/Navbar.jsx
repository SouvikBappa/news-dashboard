import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navStyle = {
    backgroundColor: '#333',
    padding: '16px 32px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    color: '#fff',
    marginLeft: '20px',
    textDecoration: 'none',
    fontSize: '16px',
  };

  return (
    <nav style={navStyle}>
      <h2 style={{ margin: 0, fontSize: '24px' }}>📰 News AI</h2>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/summaries" style={linkStyle}>My Summaries</Link>
      </div>
    </nav>
  );
}
