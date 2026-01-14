# E-Learning Platform - Quick Start Guide

This guide will help you get the E-Learning Platform up and running in minutes.

## Prerequisites Checklist

- [ ] Node.js v16+ installed
- [ ] npm or yarn installed
- [ ] MongoDB Atlas account created
- [ ] Git installed

## Step-by-Step Setup

### 1. Database Setup (5 minutes)

1. **Create MongoDB Atlas Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up or log in
   - Create a FREE cluster (M0)
   - Choose your cloud provider and region
   - Click "Create Cluster"

2. **Create Database User**
   - Go to Database Access
   - Click "Add New Database User"
   - Choose Password authentication
   - Username: `elearning_user`
   - Password: Generate a secure password
   - Set role to "Read and write to any database"
   - Click "Add User"

3. **Whitelist IP Address**
   - Go to Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

4. **Get Connection String**
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `elearning`

### 2. Backend Setup (3 minutes)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# Open .env in your text editor and add:
# - Your MongoDB connection string
# - A strong JWT secret (random string)
```

**Your .env should look like:**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://elearning_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/elearning?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_random_string_12345
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

```bash
# Seed the database with sample data
node seed.js

# Start the backend server
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0-xxxxx.mongodb.net
✅ Database seeded successfully!
```

### 3. Frontend Setup (2 minutes)

Open a NEW terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# The .env should contain:
# VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. Access the Platform

Open your browser and go to: **http://localhost:5173**

### 5. Login with Demo Accounts

**User Account:**
- Email: `demo@elearning.com`
- Password: `demo123`

**Admin Account:**
- Email: `admin@elearning.com`
- Password: `admin123`

## Verify Everything is Working

### Test User Flow:
1. Go to http://localhost:5173
2. Click "Browse Courses"
3. Click on any course
4. Click "Enroll Now"
5. Login with demo credentials
6. You should be enrolled!
7. Go to Dashboard to see your course

### Test Admin Flow:
1. Logout
2. Login with admin credentials
3. Click "Admin" in navigation
4. You should see the admin panel with:
   - Platform statistics
   - User management
   - Course management

## Troubleshooting

### Backend won't start
- **Error: "Cannot connect to MongoDB"**
  - Check your MongoDB URI is correct in .env
  - Ensure IP is whitelisted in MongoDB Atlas
  - Check database user credentials

- **Error: "Port 5000 is already in use"**
  - Change PORT in .env to 5001
  - Update VITE_API_URL in frontend/.env to http://localhost:5001/api

### Frontend won't start
- **Error: "Cannot connect to API"**
  - Make sure backend is running
  - Check VITE_API_URL in frontend/.env
  - Open browser console for error messages

### Cannot login
- **"Invalid credentials"**
  - Make sure you ran `node seed.js` in backend
  - Check if MongoDB is connected
  - Try creating a new account via signup

### Blank page or errors
- Open browser Developer Tools (F12)
- Check Console tab for errors
- Common issues:
  - CORS error: Check CLIENT_URL in backend/.env
  - API error: Check backend is running on correct port

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Saves automatically refresh the browser
- Backend: Using nodemon, changes restart the server

### API Testing
Use these tools to test API endpoints:
- **Postman**: https://www.postman.com/
- **Thunder Client**: VS Code extension
- **curl**: Command line tool

Example:
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@elearning.com","password":"demo123"}'
```

### Database Inspection
- **MongoDB Compass**: GUI tool for MongoDB
  - Download: https://www.mongodb.com/products/compass
  - Connect using your MongoDB URI

- **MongoDB Atlas UI**:
  - Go to Collections in your cluster
  - Browse your data directly

## Next Steps

1. **Explore the Code**
   - Check out the backend controllers and models
   - Look at React components in frontend/src
   - Understand the authentication flow

2. **Make Changes**
   - Try changing colors in tailwind.config.js
   - Add a new field to the User model
   - Create a new page component

3. **Add Features**
   - Implement password reset
   - Add course ratings
   - Create a search bar in header

4. **Deploy**
   - Follow deployment guide in main README
   - Deploy to Vercel (frontend) and Render (backend)

## Common Commands Reference

### Backend
```bash
npm run dev      # Start development server
npm start        # Start production server
node seed.js     # Seed database
npm test         # Run tests
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run tests
```

## Getting Help

- Check the main README.md for detailed documentation
- Read backend/README.md for API details
- Read frontend/README.md for frontend architecture
- Open an issue on GitHub
- Check the code comments

## Success! 🎉

You now have a fully functional e-learning platform running locally!

Try:
- Browsing courses
- Enrolling in a course
- Tracking progress
- Creating a new course (as admin)
- Managing users (as admin)

Happy coding! 🚀
