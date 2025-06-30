import React from 'react';
import SummarizeButton from './SummarizeButton';

export default function ArticleDetail({ article, onBack }) {
  return (
    <div style={{ padding: '10px' }}>
      <button onClick={onBack}>← Back</button>
      <h2>{article.title}</h2>
      <p><strong>Author:</strong> {article.author || 'Unknown'}</p>
      <p><strong>Published:</strong> {article.publishedAt}</p>
      <p><strong>Source:</strong> {article.source.name}</p>
      {article.urlToImage && (
        <img src={article.urlToImage} alt="img" style={{ width: '100%', marginBottom: '10px' }} />
      )}
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noreferrer">🔗 Read Full Article</a>
      <br /><br />
      <SummarizeButton articleText={article.content || article.description || article.title} />
    </div>
  );
}
