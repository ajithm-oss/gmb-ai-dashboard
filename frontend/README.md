# GMB AI Dashboard - React Frontend

A modern, feature-rich React application for Google My Business post automation and product review sentiment analysis.

## ✨ Features

### 📝 Post Generator
- **Smart Form Validation** - Real-time validation with helpful error messages
- **Business Type Dropdown** - Pre-configured business categories
- **AI-Powered Content** - Generate posts using Claude AI
- **Image Generation** - Create promotional images with DALL-E 3
- **One-Click Generation** - Generate both post and image simultaneously
- **Database Storage** - Automatically saves all generated posts
- **Copy & Download** - Easy content management

### 😊 Sentiment Analyzer
- **Review Analysis** - Analyze product reviews for emotional tone
- **Detailed Insights** - Get sentiment, confidence, keywords, and explanation
- **Visual Results** - Color-coded sentiment badges and confidence bars
- **Sample Reviews** - Try pre-loaded positive, negative, and neutral samples
- **Multi-dimensional Analysis** - Detects happiness, sadness, frustration, satisfaction, and more

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 5000

### Installation

1. **Install dependencies**
   ```bash
   cd frontend-react
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - Make sure your backend is running on `http://localhost:5000`

## 📖 Usage Guide

### Post Generator

1. **Select Business Type**
   - Choose from pre-configured options (Restaurant, Salon, Gym, etc.)
   - Field is required and validated

2. **Enter Offer Details**
   - Describe your promotion or offer (minimum 10 characters)
   - Be specific for better AI-generated content

3. **Generate Content**
   - Click "Generate Post & Image" button
   - Both post and image will be created simultaneously
   - Results appear in real-time

4. **Use Your Content**
   - Copy the post text with one click
   - Download the generated image
   - Content is automatically saved to database

### Sentiment Analyzer

1. **Enter Review Text**
   - Paste a customer product review
   - Minimum 10 characters required

2. **Analyze Sentiment**
   - Click "Analyze Sentiment" button
   - AI analyzes emotional tone and sentiment

3. **View Results**
   - Overall sentiment (positive, negative, neutral, etc.)
   - Confidence level percentage
   - Detailed explanation
   - Key emotional phrases
   - Emotional tone description

4. **Try Samples**
   - Use pre-loaded sample reviews for testing
   - Positive, negative, and neutral examples available

## 🎨 Component Structure

```
src/
├── App.js                      # Main app component with tab navigation
├── App.css                     # Main app styles
├── index.js                    # React entry point
├── index.css                   # Global styles
└── components/
    ├── PostGenerator.js        # Post generation component
    ├── PostGenerator.css       # Post generator styles
    ├── SentimentAnalyzer.js    # Sentiment analysis component
    └── SentimentAnalyzer.css   # Sentiment analyzer styles
```

## 🔧 Configuration

### API Endpoint
The app connects to the backend at `http://localhost:5000` by default. To change this, update the `API_URL` constant in:
- `src/components/PostGenerator.js`
- `src/components/SentimentAnalyzer.js`

```javascript
const API_URL = 'http://your-backend-url:port';
```

## 🎯 Form Validation

### Post Generator
- **Business Type**: Must be selected (required)
- **Offer Details**:
  - Required field
  - Minimum 10 characters
  - Real-time validation feedback

### Sentiment Analyzer
- **Review Text**:
  - Required field
  - Minimum 10 characters
  - Real-time validation feedback

## 📊 Database Storage

All generated posts are automatically saved to `backend/posts-database.json` with:
- Unique ID
- Business type
- Offer details
- Generated post text
- Image URL (if generated)
- Timestamp

Access saved posts via: `GET http://localhost:5000/posts`

## 🎨 Styling

- **Modern Gradient Design** - Purple gradient theme
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Component-based CSS** - Each component has its own stylesheet
- **Smooth Animations** - Hover effects and transitions
- **Accessible UI** - Clear labels, error messages, and visual feedback

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

## 📦 Dependencies

- **react** (^18.2.0) - UI library
- **react-dom** (^18.2.0) - React DOM rendering
- **axios** (^1.6.0) - HTTP client for API calls
- **react-scripts** (5.0.1) - React build scripts

## 🐛 Troubleshooting

### CORS Errors
Make sure your backend has CORS enabled:
```javascript
app.use(cors());
```

### API Connection Failed
- Verify backend is running on port 5000
- Check API_URL in component files
- Ensure .env file has valid API keys

### Form Validation Issues
- Check browser console for errors
- Ensure all required fields are filled
- Verify minimum character requirements

### Sentiment Analysis Errors
- Verify CLAUDE_API_KEY is set in backend .env
- Check review text meets minimum length
- Review backend console for detailed errors

## 🚀 Production Build

```bash
npm run build
```

This creates an optimized production build in the `build` folder, ready to deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## 📝 Environment Variables

The frontend connects to the backend which requires:
- `OPENAI_API_KEY` - For image generation
- `CLAUDE_API_KEY` - For post generation and sentiment analysis

## 🤝 Contributing

This is a custom GMB automation tool. For issues or enhancements, contact your development team.

## 📄 License

Proprietary - Internal use only
