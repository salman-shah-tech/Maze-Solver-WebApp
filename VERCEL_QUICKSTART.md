# ⚡ Vercel Deployment - Quick Start Guide

## 🎯 Quick Overview

**Frontend**: Deploy on Vercel ✅  
**Backend**: Deploy separately (Railway/Render/Heroku) ⚠️

---

## 🚀 5-Minute Deployment

### Step 1: Deploy Backend First

#### Option A: Railway (Easiest)
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Set **Root Directory**: `backend`
6. Railway auto-detects Java - click **Deploy**
7. **Copy the URL** (e.g., `https://maze-solver.railway.app`)

#### Option B: Render
1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect repository
5. Configure:
   - **Name**: `maze-solver-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `mvn clean install -DskipTests`
   - **Start Command**: `java -jar target/maze-solver-1.0.0.jar`
6. Click **Create Web Service**
7. **Copy the URL** when deployed

### Step 2: Update Backend CORS

Edit `backend/src/main/java/com/maze/solver/controllers/MazeController.java`:

```java
@CrossOrigin(origins = {
    "http://localhost:8000",
    "https://your-app-name.vercel.app"  // Will update after Vercel deploy
})
```

Commit and push changes.

### Step 3: Deploy Frontend on Vercel

#### Via Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your repository
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: (leave empty)
   - **Output Directory**: `.`
6. **Environment Variables**:
   - Click **"Environment Variables"**
   - Add: `VITE_API_URL` = `https://your-backend-url.com` (from Step 1)
7. Click **"Deploy"**

#### Via CLI:
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Add environment variable
vercel env add VITE_API_URL
# Enter: https://your-backend-url.com

# Deploy to production
vercel --prod
```

### Step 4: Update CORS with Vercel URL

1. Get your Vercel URL (e.g., `https://maze-solver.vercel.app`)
2. Update `MazeController.java`:
```java
@CrossOrigin(origins = {
    "http://localhost:8000",
    "https://maze-solver.vercel.app"  // Your actual Vercel URL
})
```
3. Commit, push, and redeploy backend

### Step 5: Test

1. Open your Vercel URL
2. Check backend status indicator (should show ✅ Connected)
3. Generate a maze
4. Solve the maze

---

## 📝 Important Notes

### Environment Variable
- **Name**: `VITE_API_URL`
- **Value**: Your deployed backend URL (e.g., `https://maze-solver.railway.app`)
- **Where**: Vercel Dashboard → Project Settings → Environment Variables

### CORS Configuration
Backend must allow your Vercel domain. Update:
```java
@CrossOrigin(origins = {"https://your-app.vercel.app"})
```

### File Structure
```
maze-solver-webapp/
├── frontend/          ← Deploy this on Vercel
│   ├── vercel.json    ← Already created
│   └── ...
└── backend/           ← Deploy this on Railway/Render
    ├── Procfile      ← Already created
    └── ...
```

---

## 🔧 Troubleshooting

### "Backend Disconnected"
- Check `VITE_API_URL` environment variable in Vercel
- Verify backend is running (test health endpoint)
- Check CORS configuration

### CORS Errors
- Update backend `@CrossOrigin` with your Vercel URL
- Redeploy backend after CORS change

### Build Fails
- Ensure root directory is set to `frontend` in Vercel
- Check that `vercel.json` exists

---

## ✅ Checklist

- [ ] Backend deployed and URL copied
- [ ] Backend CORS updated
- [ ] Frontend deployed on Vercel
- [ ] `VITE_API_URL` environment variable set
- [ ] CORS updated with Vercel URL
- [ ] Tested end-to-end

---

## 🎉 You're Done!

Your app should now be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.railway.app` (or similar)

For detailed instructions, see `DEPLOYMENT_GUIDE.md`

