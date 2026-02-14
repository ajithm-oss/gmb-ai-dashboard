require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const OpenAI = require("openai");
const mongoose = require("mongoose");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fs = require("fs");
const path = require("path");

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gmb-dashboard";

mongoose.connect(MONGODB_URI)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// MongoDB Post Schema
const postSchema = new mongoose.Schema({
  businessType: {
    type: String,
    required: true
  },
  offer: {
    type: String,
    required: true
  },
  generatedPost: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['draft', 'posted'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  postedAt: {
    type: Date,
    default: null
  }
});

const Post = mongoose.model("Post", postSchema);

const app = express();
app.use(cors());
app.use(express.json());

// Database file path
const DB_FILE = path.join(__dirname, "posts-database.json");

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ posts: [] }, null, 2));
}

app.get("/", (req, res) => {
  res.send("GMB AI Backend Running");
});

app.post("/generate-post", async (req, res) => {
  const { businessType, offer } = req.body;

  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-haiku-20240307",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: `Generate a Google Business Profile post for a ${businessType} offering ${offer}. Include emojis and CTA.`
          }
        ]
      },
      {
        headers: {
          "x-api-key": process.env.CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        }
      }
    );

    res.json({ post: response.data.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/generate-image", async (req, res) => {

  try {

    const { businessType, offer } = req.body;
    if (!businessType || !offer) {
      return res.status(400).json({
        error: "businessType and offer are required",
      });
    }

    const prompt = `
      Create a professional promotional banner for a ${businessType}.
      Highlight this offer clearly: "${offer}".
      Modern design, high resolution, marketing style,
      bright lighting, realistic, social media ready.
    `;

    const result = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      size: "1024x1024",
    });
//aadd
    const imageUrl = result.data[0].url;

    res.json({
      success: true,
      imageUrl,
    });

  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({
      error: "Image generation failed",
      details: error.message,
      type: error.constructor.name
    });
  }
});


app.get("/test-openai", async (req, res) => {

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: "Say hello"
    });

    res.json({
      success: true,
      output: response.output_text
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// Save post to database
app.post("/save-post", (req, res) => {
  try {
    const { businessType, offer, generatedPost, imageUrl, createdAt } = req.body;

    if (!businessType || !offer || !generatedPost) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // Read current database
    const dbData = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));

    // Add new post
    const newPost = {
      id: Date.now().toString(),
      businessType,
      offer,
      generatedPost,
      imageUrl: imageUrl || null,
      createdAt: createdAt || new Date().toISOString(),
    };

    dbData.posts.unshift(newPost); // Add to beginning of array

    // Keep only last 100 posts to prevent file from growing too large
    if (dbData.posts.length > 100) {
      dbData.posts = dbData.posts.slice(0, 100);
    }

    // Write back to database
    fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2));

    res.json({
      success: true,
      message: "Post saved successfully",
      postId: newPost.id,
    });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({
      error: "Failed to save post",
      details: error.message,
    });
  }
});

// Get all saved posts
app.get("/posts", (req, res) => {
  try {
    const dbData = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    res.json({
      success: true,
      posts: dbData.posts,
      count: dbData.posts.length,
    });
  } catch (error) {
    console.error("Error reading posts:", error);
    res.status(500).json({
      error: "Failed to retrieve posts",
      details: error.message,
    });
  }
});

// Save post to MongoDB (triggered by "Post" button)
app.post("/post-to-mongodb", async (req, res) => {
  try {
    const { businessType, offer, generatedPost, imageUrl } = req.body;

    if (!businessType || !offer || !generatedPost) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // Create new post document
    const newPost = new Post({
      businessType,
      offer,
      generatedPost,
      imageUrl: imageUrl || null,
      status: 'posted',
      postedAt: new Date()
    });

    // Save to MongoDB
    const savedPost = await newPost.save();

    res.json({
      success: true,
      message: "Post saved to MongoDB successfully!",
      postId: savedPost._id,
      post: savedPost
    });
  } catch (error) {
    console.error("Error saving to MongoDB:", error);
    res.status(500).json({
      error: "Failed to save post to MongoDB",
      details: error.message,
    });
  }
});

// Get all MongoDB posts
app.get("/mongodb-posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(100);
    res.json({
      success: true,
      posts: posts,
      count: posts.length,
    });
  } catch (error) {
    console.error("Error retrieving posts from MongoDB:", error);
    res.status(500).json({
      error: "Failed to retrieve posts",
      details: error.message,
    });
  }
});

// Sentiment Analysis endpoint
app.post("/analyze-sentiment", async (req, res) => {
  try {
    const { review } = req.body;

    if (!review || !review.trim()) {
      return res.status(400).json({
        error: "Review text is required",
      });
    }

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-haiku-20240307",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: `Analyze the sentiment of this product review and provide a detailed analysis.

Review: "${review}"

Please provide:
1. Overall sentiment (e.g., positive, negative, neutral, happy, sad, frustrated, satisfied, disappointed)
2. Confidence level (0-100%)
3. A brief explanation of why you classified it this way
4. Key emotional phrases or words that influenced your decision (up to 5 keywords)
5. The predominant emotion detected

Format your response as JSON with this structure:
{
  "sentiment": "positive/negative/neutral/happy/sad/etc",
  "confidence": 85,
  "explanation": "Brief explanation here",
  "keywords": ["keyword1", "keyword2"],
  "emotion": "The emotional tone description"
}`
          }
        ]
      },
      {
        headers: {
          "x-api-key": process.env.CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        }
      }
    );

    // Parse the AI response
    const aiResponse = response.data.content[0].text;

    // Try to extract JSON from the response
    let analysisResult;
    try {
      // Look for JSON in the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: create a basic response if JSON parsing fails
        analysisResult = {
          sentiment: "neutral",
          confidence: 70,
          explanation: aiResponse,
          keywords: [],
          emotion: "Analysis provided in explanation"
        };
      }
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      analysisResult = {
        sentiment: "neutral",
        confidence: 70,
        explanation: aiResponse,
        keywords: [],
        emotion: "Unable to parse structured response"
      };
    }

    res.json(analysisResult);
  } catch (error) {
    console.error("Sentiment analysis error:", error);
    res.status(500).json({
      error: "Sentiment analysis failed",
      details: error.message,
    });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
