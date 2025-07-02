import React, { useState, useEffect } from 'react';
import ArticleCard from './components/ArticleCard';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

  const fetchArticles = async (keyword = 'India') => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(keyword)}&lang=en&max=10&apikey=${GNEWS_API_KEY}`
      );
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("❌ GNews Error:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      const res = await fetch(
        `https://gnews.io/api/v4/top-headlines?lang=en&country=in&topic=${category}&apikey=${GNEWS_API_KEY}`
      );
      const data = await res.json();
      setArticles(data.articles || []);
      setSummary('');
      setSelectedArticle(null);
    } catch (err) {
      console.error("❌ GNews Category Error:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const summarizeArticle = async (text, retries = 3, delay = 1000) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;
    const body = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `Summarize the following article in 3 bullet points:\n\n${text}` }],
        },
      ],
    };

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (res.status === 429) {
          const retryAfter = res.headers.get('Retry-After');
          const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : delay * 2 ** attempt;
          await new Promise((r) => setTimeout(r, waitTime));
          continue;
        }

        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
        const result = await res.json();
        const summaryText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        setSummary(summaryText || 'No summary available.');
        break;

      } catch (err) {
        console.error("❌ Gemini API Error:", err);
        if (attempt === retries) {
          setSummary('❌ Failed to summarize article.');
        } else {
          await new Promise((r) => setTimeout(r, delay * 2 ** attempt));
        }
      }
    }
  };

  const handleSearch = (term) => {
    setSelectedCategory('');
    fetchArticles(term);
    setSummary('');
    setSelectedArticle(null);
  };

  const handleClick = (article) => {
    setSelectedArticle(article);
    setSummary('');
  };

  const handleSummarizeClick = (article) => {
    setSelectedArticle(article);
    setSummary('');
    summarizeArticle(article.title + '\n\n' + article.description);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
  <div style={{
    backgroundImage: "url('/bg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh'
  }}>

     
      <Navbar />
      <SearchBar onSearch={handleSearch} />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '0 32px 20px',
        justifyContent: 'center',
      }}>
        {['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'].map((category) => (
          <button
            key={category}
            onClick={() => fetchCategory(category)}
            style={{
              padding: '10px 16px',
              borderRadius: '20px',
              border: '1px solid #ccc',
              background: selectedCategory === category ? '#0077cc' : '#ffffff',
              color: selectedCategory === category ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              boxShadow: selectedCategory === category ? '0 2px 6px rgba(0, 119, 204, 0.3)' : 'none',
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
          Loading news...
        </p>
      ) : (
        <div style={{
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(6px)',
  minHeight: '100vh',
  borderRadius: '12px',
  padding: '20px',
  margin: '20px',
}}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            padding: '32px',
          }}>
            {articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.url}>
                  <ArticleCard article={article} onClick={handleClick} />
                  {selectedArticle?.url === article.url && (
                    <div style={{ marginTop: '10px' }}>
                      <a href={article.url} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          marginBottom: '10px',
                          color: '#0077cc',
                          fontWeight: 'bold',
                          textDecoration: 'none',
                        }}>
                        🔗 Read Full Article →
                      </a>
                      {!summary && (
                        <button onClick={() => handleSummarizeClick(article)}
                          style={{
                            marginLeft: '12px',
                            padding: '6px 12px',
                            fontSize: '14px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: '#0077cc',
                            color: '#fff',
                            cursor: 'pointer',
                          }}>
                          🧠 Show Summary
                        </button>
                      )}
                      {summary && (
                        <div style={{
                          background: '#fefefe',
                          padding: '16px 20px',
                          borderRadius: '10px',
                          fontSize: '15px',
                          marginTop: '12px',
                          whiteSpace: 'pre-line',
                          border: '1px solid #ddd',
                          lineHeight: '1.6',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                        }}>
                          <strong style={{ color: '#1f2937' }}>🧠 Summary:</strong><br />
                          {summary}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', fontSize: '16px', gridColumn: '1 / -1' }}>
                No articles found.
              </p>
            )}
          </div>
        </div>
      )}

      <footer style={{
        textAlign: 'center',
        padding: '24px',
        background: '#f1f1f1',
        color: '#666',
        fontSize: '14px',
        borderTop: '1px solid #ddd',
        marginTop: '40px',
      }}>
        Made with ❤️ by Souvik · Kshitij 2025
      </footer>
    </div>
  );
}
