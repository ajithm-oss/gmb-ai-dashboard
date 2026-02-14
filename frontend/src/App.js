import React, { useState } from 'react';
import './App.css';
import PostGenerator from './components/PostGenerator';
import SentimentAnalyzer from './components/SentimentAnalyzer';

function App() {
  const [activeTab, setActiveTab] = useState('post-generator');

  return (
    <div className="App">
      <header className="app-header">
        <h1>🚀 GMB AI Dashboard</h1>
        <p>AI-Powered Google Business Profile Management</p>
      </header>

      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'post-generator' ? 'active' : ''}`}
          onClick={() => setActiveTab('post-generator')}
        >
          📝 Post Generator
        </button>
        <button
          className={`tab-btn ${activeTab === 'sentiment-analyzer' ? 'active' : ''}`}
          onClick={() => setActiveTab('sentiment-analyzer')}
        >
          😊 Sentiment Analyzer
        </button>
      </div>

      <main className="app-main">
        {activeTab === 'post-generator' && <PostGenerator />}
        {activeTab === 'sentiment-analyzer' && <SentimentAnalyzer />}
      </main>

      <footer className="app-footer">
        <p>Powered by Claude AI & DALL-E 3</p>
      </footer>
    </div>
  );
}

export default App;
