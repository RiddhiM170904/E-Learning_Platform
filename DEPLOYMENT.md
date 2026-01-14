# Deployment Guide - E-Learning Platform

This guide walks you through deploying the E-Learning Platform to production.

## Overview

- **Frontend**: Vercel (recommended) or Netlify
- **Backend**: Render (recommended), Railway, or Heroku
- **Database**: MongoDB Atlas

## Prerequisites

- GitHub account
- Vercel account (frontend)
- Render account (backend)
- MongoDB Atlas cluster

---

## Part 1: Database Deployment (MongoDB Atlas)

### 1. Create Production Cluster

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project or use existing
3. Create a new cluster (M0 Free tier or higher)
4. Choose your cloud provider and region
5. Click "Create Cluster"

### 2. Configure Database Access

1. Go to **Database Access**
2. Click **Add New Database User**
3. Create a user with username and strong password
4. Assign role: "Atlas admin" or "Read and write to any database"
5. Save the username and password securely

### 3. Configure Network Access

1. Go to **Network Access**
2. Click **Add IP Address**
3. For production, add your server IP
4. Or click "Allow Access from Anywhere" (less secure, but easier)
5. Confirm

### 4. Get Connection String

1. Go to **Database** → Click **Connect**
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `elearning`

Save this connection string - you'll need it for backend deployment.

---

## Part 2: Backend Deployment (Render)

### 1. Prepare Backend for Deployment

Ensure your `backend/package.json` has:
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "npm install"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

### 2. Push to GitHub

```bash
cd E-Learning_Platform
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 3. Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `elearning-api`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 4. Set Environment Variables

Click **Environment** tab and add:

```
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_very_secure_random_string_for_production
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-domain.vercel.app
```

**Important**: 
- Use a STRONG, random JWT_SECRET for production
- Update CLIENT_URL once you deploy frontend

### 5. Deploy

1. Click **Create Web Service**
2. Wait for deployment (2-5 minutes)
3. Your API will be available at: `https://elearning-api.onrender.com`
4. Test the health endpoint: `https://your-app.onrender.com/api/health`

### 6. Seed Production Database (Optional)

```bash
# Set MONGO_URI temporarily in your local .env to production database
# Then run seed script locally
node backend/seed.js
```

Or create a one-off job in Render to run the seed script.

---

## Part 3: Frontend Deployment (Vercel)

### 1. Prepare Frontend for Deployment

Update `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### 2. Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Set Environment Variables

Add environment variable:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### 4. Deploy

1. Click **Deploy**
2. Wait for deployment (1-2 minutes)
3. Your app will be available at: `https://your-app.vercel.app`

### 5. Update Backend CORS

Go back to Render and update `CLIENT_URL`:
```
CLIENT_URL=https://your-app.vercel.app
```

Redeploy backend for changes to take effect.

---

## Part 4: Post-Deployment

### 1. Test the Application

- Visit your frontend URL
- Try browsing courses
- Test signup/login
- Enroll in a course
- Check dashboard
- Test admin panel (with admin credentials)

### 2. Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

**Render:**
1. Go to Settings → Custom Domains
2. Add your domain
3. Update DNS records

### 3. Enable HTTPS

Both Vercel and Render provide free SSL certificates automatically.

### 4. Monitor Your Application

**Render:**
- View logs in Dashboard
- Set up health checks
- Configure auto-deploy on push

**Vercel:**
- Analytics tab for visitor stats
- Real-time logs
- Performance insights

---

## Alternative: Deploy Backend to Railway

### 1. Railway Setup

1. Go to [Railway](https://railway.app/)
2. Click **New Project**
3. Choose **Deploy from GitHub repo**
4. Select your repository

### 2. Configure

1. Add **Root Directory**: `backend`
2. Add environment variables (same as Render)
3. Railway will auto-detect Node.js

### 3. Deploy

Click deploy - Railway will build and deploy automatically.

---

## Alternative: Deploy Backend to Heroku

### 1. Install Heroku CLI

```bash
npm install -g heroku
```

### 2. Login and Create App

```bash
heroku login
heroku create elearning-api
```

### 3. Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your_connection_string
heroku config:set JWT_SECRET=your_secret
heroku config:set CLIENT_URL=your_frontend_url
```

### 4. Deploy

```bash
git subtree push --prefix backend heroku main
```

---

## Environment Variables Summary

### Backend (Production)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/elearning
JWT_SECRET=super_secure_random_string_production
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend.vercel.app
```

### Frontend (Production)
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
- Check MONGO_URI is correct
- Ensure IP is whitelisted in MongoDB Atlas
- Verify database user credentials

**CORS Errors**
- Ensure CLIENT_URL matches frontend domain exactly
- Check CORS configuration in backend

**500 Server Errors**
- Check logs in Render/Railway/Heroku
- Verify all environment variables are set
- Check MongoDB connection

### Frontend Issues

**Cannot connect to API**
- Verify VITE_API_URL is correct
- Check backend is deployed and running
- Open browser console for errors

**404 on Page Refresh**
- Vercel handles this automatically
- For other hosts, configure SPA rewrites

### Database Issues

**Seed data not showing**
- Run seed script against production database
- Check MongoDB Atlas → Collections

---

## Security Best Practices

1. **Use Strong Secrets**
   - Generate random JWT_SECRET: `openssl rand -base64 32`
   - Never commit .env files

2. **Restrict Database Access**
   - Whitelist only necessary IPs
   - Use strong database passwords

3. **Enable HTTPS**
   - Use SSL certificates (auto on Vercel/Render)
   - Force HTTPS redirects

4. **Environment Variables**
   - Keep secrets in hosting platform
   - Never hardcode sensitive data

5. **Regular Updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities

---

## Monitoring and Maintenance

### Set Up Monitoring

1. **Uptime Monitoring**
   - Use UptimeRobot or Pingdom
   - Monitor both frontend and backend

2. **Error Tracking**
   - Integrate Sentry for error reporting
   - Set up alerts for critical errors

3. **Performance**
   - Use Vercel Analytics
   - Monitor API response times

### Regular Maintenance

- Update dependencies monthly
- Check and rotate secrets periodically
- Review and optimize database queries
- Monitor disk and bandwidth usage

---

## Cost Estimation

### Free Tier Limits

**MongoDB Atlas (M0)**
- 512 MB storage
- Shared RAM
- Good for small projects

**Render (Free)**
- Sleeps after 15 min of inactivity
- 750 hours/month

**Vercel (Hobby)**
- 100 GB bandwidth
- Unlimited websites

### Upgrade When...

- Traffic exceeds free limits
- Need always-on backend (no sleep)
- Require more database storage

---

## Rollback Procedure

If something goes wrong:

1. **Vercel**: Go to Deployments → Select previous → Promote to Production
2. **Render**: Go to Events → Revert to previous deploy
3. **Database**: Use MongoDB Atlas backup/restore

---

## Success Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] Database seeded with sample data
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] All features tested in production
- [ ] Monitoring set up

---

**Congratulations! Your E-Learning Platform is now live! 🎉**

Share your deployed URL and start accepting students!
