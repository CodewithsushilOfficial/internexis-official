# Production Deployment Configuration Guide

## Backend Setup (Render.com)

### Environment Variables to Set on Render:

```bash
NODE_ENV=production
PORT=10000

# MongoDB
MONGODB_URI=mongodb+srv://internexis_user:internexis_user@cluster0.b9dwnfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# API URLs
API_BASE_URL=https://internexis-official.onrender.com

# Security
JWT_SECRET=6Xv6IG4m5sgfhU+o1XjRoYIbJ0vyPwQ30FnUrhi/bjxpMZu31BFoNg2K+8q0TwMC7blGr/6E1vPwHHlEGqw95w==
BCRYPT_ROUNDS=12

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=help.internexis@gmail.com
EMAIL_PASS=iecp fhcz nysx ayhp
EMAIL_FROM=Internexis Technologies <help.internexis@gmail.com>

# Admin Configuration
ADMIN_NAME=Sushil Kumar Kushwaha
ADMIN_EMAIL=help.internexis@gmail.com
ADMIN_PASSWORD=admin@internexis
ADMIN_PHONE=+91-9214267778

# Company Information
COMPANY_NAME=Internexis Technologies
COMPANY_EMAIL=info@internexis-technologies.in
COMPANY_PHONE=+91-9214267778

# CORS Configuration
FRONTEND_URL=https://internexis-technologies.in
CORS_ORIGIN=https://internexis-technologies.in

# Performance
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10mb
```

## Frontend Setup (Netlify)

### Environment Variables to Set on Netlify:

```bash
VITE_APP_NAME=Internexis Technologies
VITE_APP_VERSION=2.0.0
VITE_APP_DESCRIPTION=Internexis Technologies - Empowering careers through internships and campus ambassador programs

# Frontend URL
VITE_FRONTEND_URL=https://internexis-technologies.in

# Backend API Configuration
VITE_API_BASE_URL=https://internexis-official.onrender.com
VITE_BACKEND_URL=https://internexis-official.onrender.com
VITE_API_URL=https://internexis-official.onrender.com

# API Configuration
VITE_API_TIMEOUT=30000
VITE_API_RETRIES=3

# Analytics
VITE_GOOGLE_ANALYTICS_ID=G-WBL0T6LE7V

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ADMIN_DASHBOARD=true
VITE_ENABLE_CAMPUS_AMBASSADOR=true
VITE_ENABLE_GOOGLE_SHEETS_SYNC=true

# Contact Information
VITE_CONTACT_EMAIL=help.internexis@gmail.com
```

## Deployment Steps

### Backend (Render.com):
1. Connect your GitHub repository to Render
2. Set service type to "Web Service"
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Set environment to `Node.js`
6. Add all the environment variables listed above
7. Deploy the service

### Frontend (Netlify):
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add all the environment variables listed above
5. Configure custom domain: `internexis-technologies.in`
6. Deploy the site

## Admin Login Credentials:
- Email: help.internexis@gmail.com
- Password: admin@internexis

## API Endpoints:
- Backend: https://internexis-official.onrender.com
- Frontend: https://internexis-technologies.in
- Admin Dashboard: https://internexis-technologies.in/admin

## Testing Connection:
1. Check backend health: https://internexis-official.onrender.com/health
2. Test admin login: https://internexis-technologies.in/admin
3. Verify CORS: Check browser console for any CORS errors

## Troubleshooting:
1. If CORS errors occur, verify the CORS_ORIGIN environment variable
2. If login fails, check that JWT_SECRET is properly set
3. If admin doesn't exist, run the init-admin script on first deployment
4. Monitor logs on both Render and Netlify for any deployment issues
