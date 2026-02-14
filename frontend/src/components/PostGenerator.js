import React, { useState } from 'react';
import axios from 'axios';
import './PostGenerator.css';

const API_URL = 'http://localhost:5000';

const BUSINESS_TYPES = [
  { value: '', label: 'Select Business Type' },
  { value: 'Restaurant', label: '🍽️ Restaurant' },
  { value: 'Salon', label: '💇 Salon' },
  { value: 'Gym', label: '💪 Gym' },
  { value: 'Spa', label: '🧖 Spa' },
  { value: 'Cafe', label: '☕ Cafe' },
  { value: 'Retail Store', label: '🏪 Retail Store' },
  { value: 'Hotel', label: '🏨 Hotel' },
  { value: 'Dental Clinic', label: '🦷 Dental Clinic' },
  { value: 'Auto Repair', label: '🔧 Auto Repair' },
  { value: 'Real Estate', label: '🏡 Real Estate' },
];

function PostGenerator() {
  const [formData, setFormData] = useState({
    businessType: '',
    offer: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    post: null,
    imageUrl: null,
  });

  const [postStatus, setPostStatus] = useState({
    loading: false,
    success: false,
    message: ''
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessType) {
      newErrors.businessType = 'Please select a business type';
    }

    if (!formData.offer.trim()) {
      newErrors.offer = 'Please enter offer details';
    } else if (formData.offer.trim().length < 10) {
      newErrors.offer = 'Offer details must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const generateContent = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setResults({ post: null, imageUrl: null });

    try {
      // Generate both post and image in parallel
      const [postResponse, imageResponse] = await Promise.allSettled([
        axios.post(`${API_URL}/generate-post`, formData),
        axios.post(`${API_URL}/generate-image`, formData)
      ]);

      const newResults = {};

      // Handle post result
      if (postResponse.status === 'fulfilled') {
        newResults.post = postResponse.value.data.post;
      } else {
        console.error('Post generation failed:', postResponse.reason);
      }

      // Handle image result
      if (imageResponse.status === 'fulfilled') {
        newResults.imageUrl = imageResponse.value.data.imageUrl;
      } else {
        console.error('Image generation failed:', imageResponse.reason);
      }

      setResults(newResults);

      // Save to database if post was generated successfully
      if (newResults.post) {
        await saveToDatabase({
          ...formData,
          post: newResults.post,
          imageUrl: newResults.imageUrl || null,
        });
      }

    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveToDatabase = async (data) => {
    try {
      await axios.post(`${API_URL}/save-post`, {
        businessType: data.businessType,
        offer: data.offer,
        generatedPost: data.post,
        imageUrl: data.imageUrl,
        createdAt: new Date().toISOString(),
      });
      console.log('Post saved to database');
    } catch (error) {
      console.error('Failed to save to database:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  const postToMongoDB = async () => {
    if (!results.post) {
      alert('Please generate a post first!');
      return;
    }

    setPostStatus({ loading: true, success: false, message: '' });

    try {
      const response = await axios.post(`${API_URL}/post-to-mongodb`, {
        businessType: formData.businessType,
        offer: formData.offer,
        generatedPost: results.post,
        imageUrl: results.imageUrl,
      });

      if (response.data.success) {
        setPostStatus({
          loading: false,
          success: true,
          message: 'Post saved to MongoDB successfully! 🎉'
        });

        // Reset success message after 3 seconds
        setTimeout(() => {
          setPostStatus({ loading: false, success: false, message: '' });
        }, 5000);
      }
    } catch (error) {
      console.error('Error posting to MongoDB:', error);
      setPostStatus({
        loading: false,
        success: false,
        message: ''
      });
      alert('Failed to save post to MongoDB. Please check if MongoDB is running.');
    }
  };

  return (
    <div className="post-generator">
      <div className="generator-container">
        <div className="form-section">
          <h2>Generate GMB Post</h2>

          <div className="form-group">
            <label htmlFor="businessType">
              Business Type <span className="required">*</span>
            </label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              className={errors.businessType ? 'error' : ''}
            >
              {BUSINESS_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.businessType && (
              <span className="error-message">{errors.businessType}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="offer">
              Offer Details <span className="required">*</span>
            </label>
            <textarea
              id="offer"
              name="offer"
              value={formData.offer}
              onChange={handleInputChange}
              placeholder="e.g., 20% off all services this weekend only!"
              rows="4"
              className={errors.offer ? 'error' : ''}
            />
            {errors.offer && (
              <span className="error-message">{errors.offer}</span>
            )}
          </div>

          <button
            className="generate-btn"
            onClick={generateContent}
            disabled={loading}
          >
            {loading ? '⏳ Generating...' : '✨ Generate Post & Image'}
          </button>
        </div>

        <div className="results-section">
          {/* Post Result */}
          <div className="result-card">
            <h3>Generated Post</h3>
            {results.post ? (
              <div className="result-content">
                <p>{results.post}</p>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(results.post)}
                >
                  📋 Copy Post
                </button>
              </div>
            ) : (
              <div className="placeholder">
                {loading ? 'Generating post...' : 'Your generated post will appear here'}
              </div>
            )}
          </div>

          {/* Image Result */}
          <div className="result-card">
            <h3>Generated Image</h3>
            {results.imageUrl ? (
              <div className="result-content">
                <img src={results.imageUrl} alt="Generated promotional banner" />
                <a
                  href={results.imageUrl}
                  download="gmb-post-image.png"
                  className="download-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💾 Download Image
                </a>
              </div>
            ) : (
              <div className="placeholder">
                {loading ? 'Generating image...' : 'Your generated image will appear here'}
              </div>
            )}
          </div>
        </div>

        {/* Post to MongoDB Button - Appears after generation */}
        {(results.post || results.imageUrl) && (
          <div className="post-actions">
            <button
              className={`post-to-db-btn ${postStatus.success ? 'success' : ''}`}
              onClick={postToMongoDB}
              disabled={postStatus.loading}
            >
              {postStatus.loading ? '⏳ Saving to MongoDB...' :
               postStatus.success ? '✅ Saved Successfully!' :
               '📤 Post to MongoDB'}
            </button>
            {postStatus.success && (
              <div className="success-message">
                {postStatus.message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostGenerator;
