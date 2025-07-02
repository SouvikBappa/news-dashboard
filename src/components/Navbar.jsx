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
      <h2 style={{
        margin: 0,
        fontSize: '26px',
        fontWeight: '800',
        background: 'linear-gradient(to right, #ff512f, #dd2476)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '1px',
      }}>
        📰 ByteNews
      </h2>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/summaries" style={linkStyle}>My Summaries</Link>
      </div>
    </nav>
  );
}
