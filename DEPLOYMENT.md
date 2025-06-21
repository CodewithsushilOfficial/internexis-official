# Render Deployment Guide

## Problem Fixed
- ❌ **Error**: `sh: 1: vite: not found` during deployment
- ✅ **Solution**: Proper monorepo structure with separate frontend and backend builds

## Changes Made

### 1. Root Package.json Added
- Added root-level `package.json` with build scripts for monorepo deployment
- Separated frontend and backend build processes

### 2. Backend Package.json Updated
- Removed frontend build commands from backend scripts
- Simplified backend-only build process

### 3. Render.yaml Configuration
- Updated build command to use root-level scripts
- Proper separation of frontend build and backend start
- Removed database credentials from yaml file (for security)

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Fix: Render deployment configuration for monorepo"
git push origin main
```

### 2. Render Dashboard Setup
1. Go to Render Dashboard
2. Select your service "internexis-official"
3. Go to Environment variables
4. Add these variables manually:
   - `MONGODB_URI`: `mongodb+srv://internexis_user:internexis_user@cluster0.b9dwnfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   - `MONGO_URI`: `mongodb+srv://internexis_user:internexis_user@cluster0.b9dwnfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

### 3. Deploy
- Render will automatically deploy with the new configuration
- Build process will now work correctly

## Build Process Flow
1. **Root Install**: Installs root dependencies
2. **Frontend Build**: 
   - `cd frontend && npm install`
   - `npm run build:production`
3. **Backend Setup**:
   - `cd backend && npm install`
4. **Start**: `cd backend && node server.js`

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
