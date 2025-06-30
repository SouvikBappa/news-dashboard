import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryTabs from '../components/CategoryTabs';
import ArticleCard from '../components/ArticleCard';
import ArticleDetail from '../components/ArticleDetail';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [keyword, setKeyword] = useState('technology');
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  const NEWS_API_KEY = '28ca5aec2f734e449360e17d7af96e57';

  const fetchArticles = async () => {
    const cached = sessionStorage.getItem(`articles-${keyword}`);
    if (cached) {
      setArticles(JSON.parse(cached));
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${keyword}&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
      );
      sessionStorage.setItem(`articles-${keyword}`, JSON.stringify(res.data.articles));
      setArticles(res.data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [keyword]);

  return (
    <div style={{ padding: '10px' }}>
      <SearchBar onSearch={(term) => setKeyword(term)} />
      <CategoryTabs onSelect={(cat) => setKeyword(cat)} />
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No articles found for "{keyword}".</p>
      ) : selectedArticle ? (
        <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />
      ) : (
        articles.map((article, i) => (
          <ArticleCard key={i} article={article} onClick={setSelectedArticle} />
        ))
      )}
    </div>
  );
}


