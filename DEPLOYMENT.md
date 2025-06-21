# Separate Deployment Guide: Frontend (Netlify) + Backend (Render)

## 🎯 Deployment Strategy
- **Frontend**: React + Vite → Netlify
- **Backend**: Node.js + Express → Render
- **Database**: MongoDB Atlas (shared)

## Problem Fixed
- ❌ **Error**: `sh: 1: vite: not found` during monorepo deployment
- ✅ **Solution**: Separate deployments for better performance and easier management

## Changes Made

### 1. Frontend - Netlify Ready
- Added `netlify.toml` configuration
- Environment variables setup in `.env.production`
- API base URL configured with `VITE_API_BASE_URL`
- CORS configuration updated

### 2. Backend - Render Optimized
- Updated `render.yaml` for backend-only deployment
- Removed static file serving (no longer needed)
- CORS configured for Netlify frontend URLs
- Simplified to API-only service

### 3. API Configuration
- Frontend uses environment variables for API URL
- Backend serves JSON API only
- Proper CORS headers for cross-origin requests

## Deployment Steps

### 🚀 Frontend Deployment (Netlify)

1. **Connect to Netlify**:
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repository

2. **Build Settings**:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

3. **Environment Variables** (in Netlify Dashboard):
   ```
   VITE_API_BASE_URL=https://internexis-backend.onrender.com/api
   VITE_NODE_ENV=production
   ```

4. **Deploy**: Netlify will auto-deploy from GitHub

### 🚀 Backend Deployment (Render)

1. **Connect to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect GitHub repository

2. **Service Settings**:
   ```
   Name: internexis-backend
   Root Directory: backend
   Build Command: npm install
   Start Command: node server.js
   ```

3. **Environment Variables** (in Render Dashboard):
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://internexis_user:internexis_user@cluster0.b9dwnfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   MONGO_URI=(same as above)
   CORS_ORIGIN=https://your-netlify-app.netlify.app
   ```

4. **Deploy**: Render will auto-deploy from GitHub

## URLs Structure
- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://internexis-backend.onrender.com`
- **API Endpoints**: `https://internexis-backend.onrender.com/api/`

## Benefits of Separate Deployment
✅ **Faster builds** - No monorepo complexity
✅ **Better performance** - CDN for frontend, optimized backend
✅ **Independent scaling** - Scale frontend and backend separately  
✅ **Easier debugging** - Separate logs and monitoring
✅ **Cost effective** - Netlify free tier + Render free tier

## Local Development
```bash
# Install all dependencies
npm run install:all

# Run frontend only
npm run dev:frontend

# Run backend only  
npm run dev:backend

# Run both (requires concurrently)
npm run dev
```

## Project Structure
```
internexis-official/
├── package.json (root - monorepo scripts)
├── render.yaml (deployment config)
├── frontend/
│   ├── package.json (frontend dependencies)
│   └── dist/ (built files)
└── backend/
    ├── package.json (backend dependencies)
    └── server.js (serves frontend + API)
```

## Notes
- Frontend builds to `frontend/dist/`
- Backend serves static files from `../frontend/dist/`
- All API routes are prefixed with `/api/`
- Frontend routes are handled by React Router (SPA)
