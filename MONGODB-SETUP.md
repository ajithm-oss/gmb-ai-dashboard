# MongoDB Setup Guide

This guide will help you set up MongoDB locally for the GMB AI Dashboard.

## Option 1: Install MongoDB Locally (Recommended for Development)

### Windows Installation

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Select "Windows" platform
   - Download the MSI installer
   - Run the installer and follow the setup wizard

2. **Install MongoDB as a Service**
   - During installation, select "Install MongoDB as a Service"
   - Keep default settings (Port: 27017)
   - Complete the installation

3. **Verify Installation**
   ```bash
   # Open Command Prompt or PowerShell
   mongod --version

   # You should see MongoDB version information
   ```

4. **Start MongoDB Service**
   ```bash
   # MongoDB should start automatically
   # To manually start:
   net start MongoDB

   # To stop:
   net stop MongoDB
   ```

5. **Connect to MongoDB**
   ```bash
   # Open MongoDB Shell
   mongosh

   # You should see a connection message
   ```

### Alternative: MongoDB Compass (GUI)

MongoDB Compass is included with the MongoDB installation and provides a visual interface:
- Open MongoDB Compass
- Connect to: `mongodb://localhost:27017`
- You'll see your databases listed

## Option 2: Use MongoDB Atlas (Cloud - Free Tier)

If you prefer a cloud database:

1. **Create Account**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Select "Free" tier (M0)
   - Choose a cloud provider and region
   - Click "Create"

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gmb-dashboard
   ```

## Verify MongoDB is Running

### Method 1: Command Line
```bash
# Check if MongoDB service is running
sc query MongoDB

# Or try connecting
mongosh mongodb://localhost:27017/gmb-dashboard
```

### Method 2: Start Your Backend
```bash
cd backend
node server.js

# You should see:
# ✅ Connected to MongoDB
# Server running on port 5000
```

## Database Structure

The app will automatically create:
- **Database**: `gmb-dashboard`
- **Collection**: `posts`

Each post document contains:
```javascript
{
  _id: ObjectId("..."),
  businessType: "Restaurant",
  offer: "20% off all meals",
  generatedPost: "Post text here...",
  imageUrl: "https://...",
  status: "posted",
  createdAt: Date,
  postedAt: Date
}
```

## View Your Data

### Using MongoDB Shell
```bash
# Connect to database
mongosh mongodb://localhost:27017/gmb-dashboard

# View all posts
db.posts.find().pretty()

# Count posts
db.posts.count()

# Find recent posts
db.posts.find().sort({createdAt: -1}).limit(5)
```

### Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to `gmb-dashboard` database
4. Click on `posts` collection
5. View and filter your data visually

## Common Issues & Solutions

### Issue: "MongoServerError: connect ECONNREFUSED"
**Solution**: MongoDB is not running
```bash
# Start MongoDB service
net start MongoDB

# Or restart
net stop MongoDB
net start MongoDB
```

### Issue: "MongoParseError: Invalid connection string"
**Solution**: Check your `.env` file
- Ensure no spaces around `=`
- Format: `MONGODB_URI=mongodb://localhost:27017/gmb-dashboard`
- No quotes needed

### Issue: MongoDB service won't start
**Solution**:
1. Check if port 27017 is available
2. Check MongoDB logs in `C:\Program Files\MongoDB\Server\{version}\log\`
3. Restart computer and try again

### Issue: "Authentication failed"
**Solution**:
If you set up authentication during installation:
```env
MONGODB_URI=mongodb://username:password@localhost:27017/gmb-dashboard
```

## Install Mongoose (Backend Dependency)

Already added to `package.json`, but to install:

```bash
cd backend
npm install mongoose
```

## Environment Variables

Your `backend/.env` should have:

```env
CLAUDE_API_KEY=your-claude-key
OPENAI_API_KEY=your-openai-key
MONGODB_URI=mongodb://localhost:27017/gmb-dashboard
```

## Testing the Integration

1. **Start MongoDB**
   ```bash
   # Should already be running as a service
   # Verify with: sc query MongoDB
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm install  # First time only
   node server.js

   # Look for: ✅ Connected to MongoDB
   ```

3. **Start Frontend**
   ```bash
   cd frontend-react
   npm install  # First time only
   npm start
   ```

4. **Test Workflow**
   - Generate a post and image
   - Click "📤 Post to MongoDB" button
   - You should see: "Post saved to MongoDB successfully! 🎉"
   - Verify in MongoDB Compass or shell

## Accessing Saved Posts

### Via API
```bash
# Get all posts from MongoDB
curl http://localhost:5000/mongodb-posts
```

### Via MongoDB Shell
```bash
mongosh mongodb://localhost:27017/gmb-dashboard
db.posts.find().pretty()
```

### Via MongoDB Compass
- Open Compass
- Connect to `mongodb://localhost:27017`
- Browse `gmb-dashboard` → `posts`

## Production Deployment

For production, consider:
- MongoDB Atlas (managed cloud)
- Add authentication
- Enable SSL/TLS
- Set up indexes for better performance
- Regular backups

## Uninstall MongoDB

If you need to remove MongoDB:

1. Stop service: `net stop MongoDB`
2. Uninstall via Windows Settings → Apps
3. Delete data directory: `C:\Program Files\MongoDB`
4. Delete data files: `C:\data\db` (if exists)

## Additional Resources

- MongoDB Documentation: https://docs.mongodb.com/
- Mongoose Documentation: https://mongoosejs.com/docs/
- MongoDB Compass: https://www.mongodb.com/products/compass
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas

---

**Need Help?**
- Check MongoDB service is running
- Verify connection string in `.env`
- Check backend console for connection errors
- Try MongoDB Compass to test connection manually
