# 🚀 Deployment Guide - Vercel (Frontend) + Backend Options

This guide explains how to deploy your Maze Solver application. **Important**: Vercel only supports frontend deployment. The Spring Boot backend needs to be deployed separately.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend Deployment on Vercel](#frontend-deployment-on-vercel)
3. [Backend Deployment Options](#backend-deployment-options)
4. [Configuration Changes](#configuration-changes)
5. [Step-by-Step Deployment](#step-by-step-deployment)
6. [Testing After Deployment](#testing-after-deployment)
7. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────┐
│   Frontend (Vercel)             │
│   - Static HTML/CSS/JS          │
│   - Makes API calls to backend  │
└──────────────┬──────────────────┘
               │
               │ HTTP Requests
               │
┌──────────────▼──────────────────┐
│   Backend (Separate Platform)    │
│   - Spring Boot (Java)           │
│   - REST API endpoints           │
└─────────────────────────────────┘
```

**Key Point**: Frontend and backend are deployed separately!

---

## 🎨 Frontend Deployment on Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Your code pushed to GitHub

### Step 1: Prepare Frontend for Deployment

#### 1.1 Update API Service for Production

Edit `frontend/js/apiService.js` to use environment variable for backend URL:

```javascript
class ApiService {
    constructor(baseUrl = null) {
        // Use environment variable in production, localhost in development
        this.baseUrl = baseUrl || 
            (import.meta.env?.VITE_API_URL || 
             (window.location.hostname === 'localhost' 
                ? 'http://localhost:8080' 
                : 'https://your-backend-url.com'));
        this.apiBase = `${this.baseUrl}/api/maze`;
    }
    // ... rest of the code
}
```

**OR** simpler approach - use a config file:

Create `frontend/js/config.js`:
```javascript
// Configuration for API endpoint
export const API_CONFIG = {
    // In production, this will be your deployed backend URL
    // In development, use localhost
    BASE_URL: import.meta.env?.VITE_API_URL || 
              (window.location.hostname === 'localhost' 
                ? 'http://localhost:8080' 
                : 'https://your-backend-url.com')
};
```

Then update `apiService.js`:
```javascript
import { API_CONFIG } from './config.js';

class ApiService {
    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
        this.apiBase = `${this.baseUrl}/api/maze`;
    }
    // ...
}
```

#### 1.2 Create `vercel.json` (Optional)

Create `frontend/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

### Step 2: Push to GitHub

```bash
cd /Users/xyz/Desktop/Desktop/maze-solver-webapp

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Maze Solver App"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/maze-solver-webapp.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: (leave empty - static site)
   - **Output Directory**: `.` (current directory)
5. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.com` (your deployed backend URL)
6. Click **"Deploy"**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? maze-solver-frontend
# - Directory? ./
# - Override settings? No

# For production deployment:
vercel --prod
```

### Step 4: Update API Service with Production URL

After deploying backend (see next section), update the environment variable in Vercel:
1. Go to your project on Vercel dashboard
2. Settings → Environment Variables
3. Add/Update `VITE_API_URL` with your backend URL
4. Redeploy

---

## ☕ Backend Deployment Options

Since Vercel doesn't support Java/Spring Boot, deploy the backend on one of these platforms:

### Option 1: Railway (Recommended - Easy & Free Tier)

**Steps:**
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect it's a Java project
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `mvn clean install -DskipTests`
   - **Start Command**: `java -jar target/maze-solver-1.0.0.jar`
6. Add environment variables if needed
7. Deploy!

**Get your backend URL**: Railway provides a URL like `https://your-app.railway.app`

### Option 2: Render (Free Tier Available)

**Steps:**
1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `maze-solver-backend`
   - **Environment**: `Java`
   - **Build Command**: `cd backend && mvn clean install -DskipTests`
   - **Start Command**: `cd backend && java -jar target/maze-solver-1.0.0.jar`
   - **Plan**: Free
5. Deploy!

**Get your backend URL**: Render provides a URL like `https://maze-solver-backend.onrender.com`

### Option 3: Heroku (Paid, but reliable)

**Steps:**
1. Install Heroku CLI
2. Create `backend/Procfile`:
   ```
   web: java -jar target/maze-solver-1.0.0.jar
   ```
3. Deploy:
   ```bash
   cd backend
   heroku create maze-solver-backend
   git subtree push --prefix backend heroku main
   ```

### Option 4: AWS/Google Cloud/Azure

For production, consider cloud platforms:
- **AWS**: Elastic Beanstalk or EC2
- **Google Cloud**: App Engine or Cloud Run
- **Azure**: App Service

---

## ⚙️ Configuration Changes

### Backend Configuration

#### 1. Update CORS in `MazeController.java`

Change from:
```java
@CrossOrigin(origins = "*")
```

To (for production):
```java
@CrossOrigin(origins = {"https://your-frontend.vercel.app", "http://localhost:8000"})
```

#### 2. Update `application.properties`

Create `backend/src/main/resources/application.properties`:
```properties
# Server Configuration
server.port=${PORT:8080}

# CORS Configuration
spring.web.cors.allowed-origins=${CORS_ORIGINS:http://localhost:8000}

# Logging
logging.level.com.maze.solver=INFO
```

#### 3. Create `backend/Procfile` (for Heroku/Railway)

```
web: java -jar target/maze-solver-1.0.0.jar
```

#### 4. Create `backend/system.properties` (for Heroku)

```
java.runtime.version=17
```

### Frontend Configuration

#### Update `apiService.js` to use environment variable:

```javascript
class ApiService {
    constructor() {
        // Use environment variable or default
        const apiUrl = import.meta.env?.VITE_API_URL || 
                      process.env.VITE_API_URL ||
                      (window.location.hostname === 'localhost' 
                        ? 'http://localhost:8080' 
                        : 'https://your-backend-url.com');
        
        this.baseUrl = apiUrl;
        this.apiBase = `${this.baseUrl}/api/maze`;
    }
    // ...
}
```

---

## 📝 Step-by-Step Deployment

### Complete Deployment Process:

#### 1. Prepare Backend
```bash
cd backend

# Test build locally
mvn clean package -DskipTests

# Verify JAR is created
ls target/maze-solver-1.0.0.jar
```

#### 2. Deploy Backend (Railway Example)
1. Push code to GitHub
2. Go to Railway.app
3. New Project → Deploy from GitHub
4. Select repository
5. Set root directory: `backend`
6. Deploy
7. Copy the generated URL (e.g., `https://maze-solver.railway.app`)

#### 3. Update Frontend Configuration
```bash
cd frontend

# Update apiService.js with your backend URL
# Or use environment variable
```

#### 4. Deploy Frontend to Vercel
1. Push code to GitHub
2. Go to Vercel.com
3. Import project
4. Set root directory: `frontend`
5. Add environment variable:
   - `VITE_API_URL` = `https://maze-solver.railway.app`
6. Deploy

#### 5. Update Backend CORS
Update `MazeController.java` with your Vercel URL:
```java
@CrossOrigin(origins = {"https://your-app.vercel.app"})
```

Redeploy backend.

---

## 🧪 Testing After Deployment

### 1. Test Backend Health
```bash
curl https://your-backend-url.com/api/maze/health
```
Expected: `{"status":"UP"}`

### 2. Test Frontend
1. Open your Vercel URL
2. Check browser console (F12) for errors
3. Check backend status indicator
4. Try generating a maze
5. Try solving a maze

### 3. Check CORS
If you see CORS errors:
- Verify backend CORS configuration includes your Vercel URL
- Check browser console for specific error

---

## 🐛 Troubleshooting

### Frontend Issues:

**Problem: "Backend Disconnected"**
- Check backend URL in environment variables
- Verify backend is running
- Check CORS configuration

**Problem: CORS Errors**
- Update backend `@CrossOrigin` with your Vercel URL
- Check browser console for specific error

**Problem: API calls failing**
- Verify `VITE_API_URL` environment variable is set
- Check network tab in browser DevTools
- Verify backend URL is correct

### Backend Issues:

**Problem: Build fails**
- Check Java version (must be 17+)
- Verify Maven is working
- Check build logs

**Problem: Port binding error**
- Use `server.port=${PORT:8080}` in application.properties
- Platform will provide PORT environment variable

**Problem: Application won't start**
- Check logs on deployment platform
- Verify JAR file is created correctly
- Check Procfile/start command

---

## 🔒 Security Considerations

### For Production:

1. **CORS**: Don't use `origins = "*"` in production
   ```java
   @CrossOrigin(origins = {"https://your-frontend.vercel.app"})
   ```

2. **Environment Variables**: Never commit secrets
   - Use platform environment variables
   - Keep `.env` files in `.gitignore`

3. **HTTPS**: Always use HTTPS in production
   - Vercel provides HTTPS automatically
   - Most backend platforms provide HTTPS

4. **Rate Limiting**: Consider adding rate limiting to backend
   - Prevent abuse
   - Use Spring Security or similar

---

## 📊 Cost Estimation

### Free Tier Options:

**Vercel (Frontend)**:
- ✅ Free tier: Unlimited deployments
- ✅ Free HTTPS
- ✅ Free custom domains

**Railway (Backend)**:
- ✅ Free tier: $5 credit/month
- ✅ Enough for small projects

**Render (Backend)**:
- ✅ Free tier: Spins down after inactivity
- ✅ Good for development/testing

**Total Cost**: $0/month for small projects! 🎉

---

## ✅ Deployment Checklist

- [ ] Backend builds successfully locally
- [ ] Backend deployed and accessible
- [ ] Backend health endpoint works
- [ ] Frontend updated with backend URL
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Frontend deployed on Vercel
- [ ] Tested end-to-end functionality
- [ ] HTTPS working on both
- [ ] Custom domain configured (optional)

---

## 🎯 Quick Reference

### Backend URL Examples:
- Railway: `https://maze-solver.railway.app`
- Render: `https://maze-solver.onrender.com`
- Heroku: `https://maze-solver.herokuapp.com`

### Frontend URL Examples:
- Vercel: `https://maze-solver.vercel.app`
- Custom: `https://maze-solver.yourdomain.com`

### Environment Variables:
- Frontend (Vercel): `VITE_API_URL`
- Backend: `PORT` (auto-provided by platform)

---

**Your application is now deployed! 🚀**

For questions or issues, check the platform-specific documentation or logs.

