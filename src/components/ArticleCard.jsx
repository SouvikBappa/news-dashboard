import React from 'react';

export default function ArticleCard({ article, onClick }) {
  const cardStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px 14px',
    marginBottom: '12px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    maxHeight: '100px',
  };

  const thumbnailStyle = {
    width: '90px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginRight: '14px',
    flexShrink: 0,
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: '600',
    margin: '0 0 6px 0',
    color: '#222',
    lineHeight: '1.3',
  };

  const metaStyle = {
    fontSize: '12px',
    color: '#777',
    margin: 0,
  };

  return (
    <div
      style={cardStyle}
      onClick={() => onClick(article)}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt="thumbnail"
          style={thumbnailStyle}
        />
      )}
      <div style={contentStyle}>
        <h2 style={titleStyle}>
          {article.title.length > 100
            ? article.title.slice(0, 100) + '...'
            : article.title}
        </h2>
        <p style={metaStyle}>
          {article.source.name} &middot;{' '}
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}




