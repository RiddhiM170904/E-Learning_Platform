# E-Learning Platform - Installation & Run Instructions

## Quick Start (3 Steps)

### Step 1: Install Dependencies

**Windows (PowerShell):**
```powershell
.\setup.ps1
```

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

**Manual Installation:**
```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### Step 2: Configure Environment

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
# Default values should work for local development
```

### Step 3: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
Backend runs at: http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs at: http://localhost:5173

---

## Detailed Setup

### Prerequisites

Install these before starting:

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **MongoDB Atlas Account**
   - Sign up: https://www.mongodb.com/cloud/atlas
   - Create a free cluster (M0)

### MongoDB Atlas Setup

1. **Create Cluster**
   - Log in to MongoDB Atlas
   - Create New Project (or use existing)
   - Build a Database → Free Shared (M0)
   - Choose cloud provider and region
   - Create Cluster (takes 3-5 minutes)

2. **Create Database User**
   - Security → Database Access
   - Add New Database User
   - Username: `elearning_user`
   - Password: [Generate secure password]
   - Built-in Role: Read and write to any database
   - Add User

3. **Whitelist IP**
   - Security → Network Access
   - Add IP Address
   - Allow Access from Anywhere (0.0.0.0/0)
   - (For production, use specific IPs)
   - Confirm

4. **Get Connection String**
   - Database → Connect
   - Connect your application
   - Copy connection string
   - Format: `mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>`

### Backend Configuration

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit .env with your values:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://elearning_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/elearning?retryWrites=true&w=majority
   JWT_SECRET=your_random_secret_key_min_32_characters
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:5173
   ```

   **Important:**
   - Replace `YOUR_PASSWORD` with your MongoDB password
   - Replace `cluster0.xxxxx` with your actual cluster address
   - Generate a strong `JWT_SECRET` (random string, 32+ characters)

5. **Seed the database (optional but recommended):**
   ```bash
   node seed.js
   ```

   This creates:
   - Admin user: `admin@elearning.com / admin123`
   - Demo user: `demo@elearning.com / demo123`
   - 5 sample courses

6. **Start the backend:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   Server running in development mode on port 5000
   MongoDB Connected: cluster0.xxxxx.mongodb.net
   ```

### Frontend Configuration

1. **Open a NEW terminal and navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **The default .env should work:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start the frontend:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   VITE v5.0.8  ready in 500 ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

### Access the Application

1. **Open your browser**
2. **Navigate to:** http://localhost:5173
3. **You should see the landing page!**

---

## Testing the Installation

### 1. Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","message":"E-Learning API is running"}
```

### 2. Test Frontend

1. Open http://localhost:5173
2. You should see the landing page
3. Click "Browse Courses"
4. Courses should load

### 3. Test Authentication

1. Click "Login"
2. Use demo credentials:
   - Email: `demo@elearning.com`
   - Password: `demo123`
3. Should redirect to Dashboard

### 4. Test Enrollment

1. While logged in, browse courses
2. Click on a course
3. Click "Enroll Now"
4. Should show success message
5. Check Dashboard - course should appear

### 5. Test Admin Panel

1. Logout
2. Login with admin credentials:
   - Email: `admin@elearning.com`
   - Password: `admin123`
3. Click "Admin" in header
4. Should see admin panel with stats

---

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"

**Causes:**
- Incorrect MongoDB URI
- IP not whitelisted
- Wrong database credentials

**Solutions:**
1. Verify MONGO_URI in .env is correct
2. Check MongoDB Atlas → Network Access
3. Ensure database user exists
4. Test connection string in MongoDB Compass

### Issue: "Port 5000 already in use"

**Solutions:**
1. Kill the process using port 5000
2. Or change PORT in backend/.env to 5001
3. Update VITE_API_URL in frontend/.env to http://localhost:5001/api

**Windows:**
```powershell
netstat -ano | findstr :5000
taskkill /PID [PID] /F
```

**Linux/Mac:**
```bash
lsof -ti:5000 | xargs kill -9
```

### Issue: "Module not found"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Frontend can't connect to backend

**Checks:**
1. Is backend running? Check Terminal 1
2. Is VITE_API_URL correct in frontend/.env?
3. Check browser console for CORS errors
4. Verify CLIENT_URL in backend/.env

**Solution:**
- Restart both backend and frontend
- Clear browser cache
- Check for typos in environment variables

### Issue: "Invalid credentials" when logging in

**Solutions:**
1. Ensure you ran `node seed.js`
2. Check MongoDB Atlas → Browse Collections
3. Verify users exist in database
4. Try creating a new account via Signup

### Issue: Blank page or white screen

**Solutions:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Common fixes:
   - Clear browser cache
   - Restart frontend dev server
   - Check for JavaScript errors
   - Verify API is running

---

## Development Commands

### Backend

```bash
# Development (with auto-reload)
npm run dev

# Production mode
npm start

# Run tests
npm test

# Seed database
node seed.js
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

---

## Environment Variables Reference

### Backend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for JWT signing | Random 32+ char string |
| `JWT_EXPIRE` | Token expiration | `7d` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Frontend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

## Next Steps

### After Successful Installation:

1. **Explore the app:**
   - Browse courses
   - Create an account
   - Enroll in courses
   - Check out the admin panel

2. **Review the code:**
   - Backend: `backend/controllers/`
   - Frontend: `frontend/src/pages/`
   - Models: `backend/models/`

3. **Read documentation:**
   - [QUICKSTART.md](QUICKSTART.md) - Quick setup
   - [README.md](README.md) - Full documentation
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production
   - [DEMO_GUIDE.md](DEMO_GUIDE.md) - Demo all features

4. **Make changes:**
   - Try changing colors in `tailwind.config.js`
   - Add a new field to User model
   - Create a new page component

5. **Deploy to production:**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
   - Deploy frontend to Vercel
   - Deploy backend to Render
   - Use MongoDB Atlas for database

---

## Getting Help

### Resources

- **Main README**: Comprehensive documentation
- **QUICKSTART Guide**: Step-by-step setup
- **Backend README**: API documentation
- **Frontend README**: Frontend architecture
- **DEMO_GUIDE**: Feature demonstrations

### Support

- **Check existing issues**: Common problems and solutions
- **Open new issue**: Report bugs or ask questions
- **Read code comments**: Inline documentation
- **Check logs**: Browser console and terminal output

---

## Verification Checklist

Before considering setup complete, verify:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] MongoDB connection successful
- [ ] Can access http://localhost:5173
- [ ] Landing page loads correctly
- [ ] Can browse courses
- [ ] Can login with demo credentials
- [ ] Can enroll in a course
- [ ] Dashboard shows enrolled course
- [ ] Admin login works
- [ ] Admin panel accessible

---

## Success! 🎉

If all checks pass, your E-Learning Platform is ready!

**Default Demo Accounts:**
- User: `demo@elearning.com` / `demo123`
- Admin: `admin@elearning.com` / `admin123`

**Access URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

Happy coding! 🚀
