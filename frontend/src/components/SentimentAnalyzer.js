import React, { useState } from 'react';
import axios from 'axios';
import './SentimentAnalyzer.css';

const API_URL = 'http://localhost:5000';

function SentimentAnalyzer() {
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const validateReview = () => {
    if (!review.trim()) {
      setError('Please enter a review to analyze');
      return false;
    }

    if (review.trim().length < 10) {
      setError('Review must be at least 10 characters long');
      return false;
    }

    setError('');
    return true;
  };

  const analyzeReview = async () => {
    if (!validateReview()) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(`${API_URL}/analyze-sentiment`, {
        review: review.trim()
      });

      setResult(response.data);
    } catch (err) {
      console.error('Sentiment analysis error:', err);
      setError('Failed to analyze sentiment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setReview(e.target.value);
    if (error) {
      setError('');
    }
  };

  const getSentimentEmoji = (sentiment) => {
    const emojiMap = {
      'positive': '😊',
      'happy': '😄',
      'negative': '😞',
      'sad': '😢',
      'neutral': '😐',
      'angry': '😠',
      'frustrated': '😤',
      'satisfied': '🙂',
      'disappointed': '😕'
    };
    return emojiMap[sentiment?.toLowerCase()] || '😐';
  };

  const getSentimentColor = (sentiment) => {
    const lowerSentiment = sentiment?.toLowerCase();
    if (['positive', 'happy', 'satisfied'].includes(lowerSentiment)) {
      return '#10b981';
    } else if (['negative', 'sad', 'angry', 'frustrated', 'disappointed'].includes(lowerSentiment)) {
      return '#ef4444';
    }
    return '#6b7280';
  };

  return (
    <div className="sentiment-analyzer">
      <div className="analyzer-container">
        <div className="input-section">
          <h2>Product Review Sentiment Analysis</h2>
          <p className="description">
            Analyze customer reviews to understand their emotional tone and sentiment
          </p>

          <div className="form-group">
            <label htmlFor="review">
              Product Review <span className="required">*</span>
            </label>
            <textarea
              id="review"
              value={review}
              onChange={handleInputChange}
              placeholder="Paste a customer review here... (e.g., 'This product exceeded my expectations! The quality is amazing and delivery was fast.')"
              rows="6"
              className={error ? 'error' : ''}
            />
            {error && (
              <span className="error-message">{error}</span>
            )}
          </div>

          <button
            className="analyze-btn"
            onClick={analyzeReview}
            disabled={loading}
          >
            {loading ? '⏳ Analyzing...' : '🔍 Analyze Sentiment'}
          </button>

          {/* Sample Reviews */}
          <div className="sample-reviews">
            <p className="sample-title">Try these samples:</p>
            <div className="sample-buttons">
              <button
                className="sample-btn positive"
                onClick={() => setReview("This product is absolutely amazing! Best purchase I've made this year. Highly recommend!")}
              >
                😊 Positive Sample
              </button>
              <button
                className="sample-btn negative"
                onClick={() => setReview("Very disappointed with this product. Poor quality and took forever to arrive. Would not recommend.")}
              >
                😞 Negative Sample
              </button>
              <button
                className="sample-btn neutral"
                onClick={() => setReview("The product is okay, nothing special. It does what it's supposed to do but could be better.")}
              >
                😐 Neutral Sample
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="result-section">
            <h3>Analysis Results</h3>

            <div className="result-card">
              <div className="sentiment-badge" style={{ backgroundColor: getSentimentColor(result.sentiment) }}>
                <span className="sentiment-emoji">{getSentimentEmoji(result.sentiment)}</span>
                <span className="sentiment-label">{result.sentiment}</span>
              </div>

              {result.confidence && (
                <div className="confidence-bar">
                  <label>Confidence Level</label>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${result.confidence}%`,
                        backgroundColor: getSentimentColor(result.sentiment)
                      }}
                    />
                  </div>
                  <span className="confidence-value">{result.confidence}%</span>
                </div>
              )}

              {result.explanation && (
                <div className="explanation">
                  <h4>Analysis</h4>
                  <p>{result.explanation}</p>
                </div>
              )}

              {result.keywords && result.keywords.length > 0 && (
                <div className="keywords">
                  <h4>Key Phrases</h4>
                  <div className="keyword-tags">
                    {result.keywords.map((keyword, index) => (
                      <span key={index} className="keyword-tag">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.emotion && (
                <div className="emotion-details">
                  <h4>Emotional Tone</h4>
                  <p>{result.emotion}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SentimentAnalyzer;
