# Setup Guide - GMB AI Dashboard

Follow these steps to set up and run the GMB AI Dashboard.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Valid API keys:
  - Claude API key (from Anthropic)
  - OpenAI API key (for DALL-E 3)

## Step-by-Step Setup

### 1. Clone or Download the Project

```bash
cd e:\learn\gmb-ai-dashboard
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Your package.json should have these dependencies:
# - express
# - axios
# - cors
# - dotenv
# - openai

# If package.json is missing, run:
npm init -y
npm install express axios cors dotenv openai
```

### 3. Configure Environment Variables

Create or edit `backend/.env` file:

```env
CLAUDE_API_KEY=your-claude-api-key-here
OPENAI_API_KEY=your-openai-api-key-here
```

**Important Notes:**
- No spaces around the `=` sign
- No quotes needed around the values
- Keep this file secure and never commit it

### 4. Start the Backend Server

```bash
# From the backend directory
node server.js

# You should see:
# Server running on port 5000
```

Keep this terminal window open!

### 5. Frontend Setup (React - Recommended)

Open a **new terminal window**:

```bash
# Navigate to React frontend
cd frontend-react

# Install dependencies
npm install

# Start the React development server
npm start

# Browser should automatically open to http://localhost:3000
```

### 6. Alternative: Static Frontend

If you prefer the simple HTML/CSS/JS version:

```bash
# Navigate to static frontend
cd frontend

# Option 1: Open index.html directly in browser
# Just double-click the index.html file

# Option 2: Use a local server (recommended)
npx http-server -p 8080
# Then visit: http://localhost:8080
```

## Verify Installation

### Test Backend
1. Open browser to: `http://localhost:5000`
2. You should see: "GMB AI Backend Running"

### Test Frontend (React)
1. Browser should be at: `http://localhost:3000`
2. You should see the GMB AI Dashboard with two tabs

### Test Functionality

**Post Generator:**
1. Select a business type
2. Enter offer details (min 10 chars)
3. Click "Generate Post & Image"
4. Wait for results (10-30 seconds)
5. Verify post text and image appear

**Sentiment Analyzer:**
1. Click "Sentiment Analyzer" tab
2. Enter a review or use sample
3. Click "Analyze Sentiment"
4. Verify sentiment results appear

## Common Setup Issues

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
cd backend
npm install
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Then restart server
node server.js
```

### Issue: ".env file not loading"
**Solution:**
1. Verify `.env` is in `backend/` directory
2. Check for spaces around `=` sign
3. Restart the server after editing `.env`

### Issue: "CORS error" in browser console
**Solution:**
1. Verify backend is running
2. Check `app.use(cors())` is in server.js
3. Clear browser cache and reload

### Issue: React won't start
**Solution:**
```bash
cd frontend-react
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: Image generation fails
**Solution:**
1. Verify `OPENAI_API_KEY` in `.env`
2. Check OpenAI account has credits
3. Ensure model is `dall-e-3`
4. Wait 10-30 seconds (images take time)

## Production Deployment

### Backend Deployment (Heroku, Railway, Render)

1. Set environment variables on hosting platform
2. Ensure `PORT` environment variable is used:
   ```javascript
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```
3. Add start script to `package.json`:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

### Frontend Deployment (Vercel, Netlify)

1. Build the React app:
   ```bash
   cd frontend-react
   npm run build
   ```

2. Update API URL for production in component files:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   ```

3. Deploy the `build` folder to hosting platform

## Environment Variables Reference

| Variable | Required | Used For |
|----------|----------|----------|
| `CLAUDE_API_KEY` | Yes | Post generation & sentiment analysis |
| `OPENAI_API_KEY` | Yes | Image generation (DALL-E 3) |
| `PORT` | No | Backend server port (default: 5000) |

## File Checklist

Before running, ensure these files exist:

```
✅ backend/server.js
✅ backend/.env
✅ backend/package.json
✅ frontend-react/src/App.js
✅ frontend-react/src/components/PostGenerator.js
✅ frontend-react/src/components/SentimentAnalyzer.js
✅ frontend-react/package.json
```

## Next Steps

After successful setup:

1. ✅ Test post generation
2. ✅ Test image generation
3. ✅ Test sentiment analysis
4. ✅ Check database file (`backend/posts-database.json`) is created
5. ✅ Verify posts are being saved
6. 🚀 Start creating content!

## Getting Help

If you encounter issues:

1. Check console logs (backend terminal)
2. Check browser console (F12 in Chrome)
3. Verify all environment variables
4. Review error messages carefully
5. Check API key validity
6. Ensure both servers are running

## Maintenance

### Clear Database
```bash
# Delete database file to start fresh
rm backend/posts-database.json
# It will be recreated automatically
```

### Update Dependencies
```bash
# Backend
cd backend
npm update

# Frontend
cd frontend-react
npm update
```

### Reset Everything
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend-react
rm -rf node_modules package-lock.json
npm install
```

---

**You're all set! 🎉**

Start generating amazing GMB posts and analyzing customer sentiment!
