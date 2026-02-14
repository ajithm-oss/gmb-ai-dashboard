# GMB AI Dashboard

A comprehensive AI-powered platform for Google My Business automation featuring post generation, image creation, and product review sentiment analysis.

## 🎯 Features

### 📝 Post Generator
- Generate AI-powered GMB posts using Claude AI
- Create professional promotional images with DALL-E 3
- Smart form validation
- Automatic database storage
- Business type dropdown selection
- One-click copy and download

### 😊 Sentiment Analyzer
- Analyze product review sentiment and emotional tone
- Detect positive, negative, neutral, happy, sad emotions
- Confidence scoring
- Key phrase extraction
- Detailed explanations
- Visual result presentation

### 💾 Database Storage
- Automatic saving of all generated posts
- JSON-based storage (easily upgradeable to MongoDB/PostgreSQL)
- Historical post retrieval
- Maintains last 100 posts

## 🏗️ Project Structure

```
gmb-ai-dashboard/
├── backend/                    # Express.js backend server
│   ├── server.js              # Main server file with all endpoints
│   ├── .env                   # Environment variables (API keys)
│   ├── posts-database.json    # Auto-generated database file
│   └── package.json           # Backend dependencies
│
├── frontend-react/            # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── PostGenerator.js
│   │   │   ├── PostGenerator.css
│   │   │   ├── SentimentAnalyzer.js
│   │   │   └── SentimentAnalyzer.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── README.md
│
└── frontend/                  # Static HTML/CSS/JS frontend (alternative)
    ├── index.html
    ├── style.css
    ├── app.js
    └── README.md
```

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies (if needed)
npm install express axios cors dotenv openai

# Configure environment variables
# Edit .env file with your API keys:
# CLAUDE_API_KEY=your-claude-api-key
# OPENAI_API_KEY=your-openai-api-key

# Start the server
node server.js
```

Backend runs on: `http://localhost:5000`

### 2. Frontend Setup (React)

```bash
# Navigate to React frontend
cd frontend-react

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs on: `http://localhost:3000`

### Alternative: Static Frontend

```bash
# Navigate to static frontend
cd frontend

# Open index.html in browser, or use a local server:
npx http-server -p 8080
```

## 🔌 API Endpoints

### Post Generation
- **POST** `/generate-post` - Generate GMB post text
  ```json
  {
    "businessType": "Restaurant",
    "offer": "20% off all meals this weekend"
  }
  ```

- **POST** `/generate-image` - Generate promotional image
  ```json
  {
    "businessType": "Restaurant",
    "offer": "20% off all meals this weekend"
  }
  ```

### Database Operations
- **POST** `/save-post` - Save generated post to database
  ```json
  {
    "businessType": "Restaurant",
    "offer": "20% off",
    "generatedPost": "...",
    "imageUrl": "...",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
  ```

- **GET** `/posts` - Retrieve all saved posts

### Sentiment Analysis
- **POST** `/analyze-sentiment` - Analyze review sentiment
  ```json
  {
    "review": "This product is amazing! Best purchase ever!"
  }
  ```

  Response:
  ```json
  {
    "sentiment": "positive",
    "confidence": 95,
    "explanation": "...",
    "keywords": ["amazing", "best"],
    "emotion": "highly satisfied"
  }
  ```

### Health Check
- **GET** `/` - Server status

## 🔑 Environment Variables

Create a `.env` file in the `backend` directory:

```env
CLAUDE_API_KEY=sk-ant-api03-xxxxx
OPENAI_API_KEY=sk-proj-xxxxx
```

**Important:** Never commit the `.env` file to version control!

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP client
- **Claude AI (Anthropic)** - Text generation & sentiment analysis
- **OpenAI DALL-E 3** - Image generation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend (React)
- **React 18** - UI library
- **Axios** - API communication
- **CSS3** - Styling with gradients and animations
- **Responsive Design** - Mobile-friendly

### Frontend (Static)
- **Vanilla JavaScript** - No framework overhead
- **HTML5 & CSS3** - Modern web standards
- **Fetch API** - HTTP requests

## 📊 Database Schema

**posts-database.json**
```json
{
  "posts": [
    {
      "id": "1705315800000",
      "businessType": "Restaurant",
      "offer": "20% off all meals",
      "generatedPost": "🍽️ Special Weekend Offer! ...",
      "imageUrl": "https://...",
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

## ✅ Form Validation

### Post Generator
- Business Type: Required (dropdown selection)
- Offer Details: Required, minimum 10 characters

### Sentiment Analyzer
- Review Text: Required, minimum 10 characters

## 🎨 UI Features

- **Modern Gradient Design** - Purple theme
- **Tab Navigation** - Switch between features
- **Real-time Validation** - Instant feedback
- **Loading States** - Visual progress indicators
- **Error Handling** - User-friendly error messages
- **Copy to Clipboard** - One-click copying
- **Image Download** - Direct download links
- **Responsive Layout** - Works on all devices

## 🧪 Testing the Application

### Test Post Generation
1. Select "Restaurant" from business type
2. Enter "20% off all meals this weekend"
3. Click "Generate Post & Image"
4. Verify post text and image appear
5. Check `posts-database.json` for saved entry

### Test Sentiment Analysis
1. Switch to "Sentiment Analyzer" tab
2. Enter a product review
3. Click "Analyze Sentiment"
4. Verify sentiment, confidence, and keywords

## 🐛 Common Issues

### Backend Port Already in Use
```bash
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Invalid API Keys
- Verify keys in `.env` file
- Check for spaces around `=` sign
- Restart server after updating `.env`

### CORS Errors
- Ensure backend has `app.use(cors())`
- Verify frontend is calling correct API URL

### Image Generation Fails
- Check `OPENAI_API_KEY` is valid
- Verify model name is `dall-e-3`
- Images take 10-30 seconds to generate

## 📈 Future Enhancements

- [ ] MongoDB integration for scalable storage
- [ ] User authentication and authorization
- [ ] Post scheduling and publishing to GMB
- [ ] Multi-language support
- [ ] Batch sentiment analysis
- [ ] Analytics dashboard
- [ ] Export to CSV/PDF
- [ ] Post history and editing

## 🤝 Contributing

This is a proprietary project. For feature requests or bug reports, contact the development team.

## 📄 License

Proprietary - Internal use only

## 👥 Support

For issues or questions:
- Check the README files in each directory
- Review console logs for detailed errors
- Verify all environment variables are set correctly
- Ensure both backend and frontend are running

---

**Powered by Claude AI & DALL-E 3** 🚀
