# Admin Authentication System - MongoDB Integration

## Overview
The admin authentication system has been updated to use MongoDB instead of hardcoded credentials. This provides better security and allows for proper user management.

## Admin Credentials
- **Email**: `help.internexis@gmail.com`
- **Password**: `admin@internexis`
- **Role**: `super_admin`

## Backend Changes

### 1. Admin Model (`backend/models/AdminModel.js`)
- Email-based authentication
- Account locking after failed attempts (5 attempts = 2 hour lock)
- Role-based access (admin, super_admin)
- Activity tracking (last login, login attempts)

### 2. Admin Routes (`backend/routes/adminRoute.js`)
**Available Endpoints:**
- `POST /api/admin/login` - Admin login
- `POST /api/admin/verify-token` - Token verification
- `GET /api/admin/profile/:adminId` - Get admin profile
- `POST /api/admin/initialize` - Initialize default admin (one-time use)

### 3. Server Updates (`backend/server.js`)
- Added admin routes to the main server
- Updated API endpoints list

## Frontend Changes

### 1. Login Form (`frontend/src/components/features/admin/SimpleAdminLogin.tsx`)
- Updated from username to email field
- API integration with backend
- Better error handling
- Token storage and management

### 2. Environment Variables
**Development (`frontend/.env.development`):**
```
VITE_API_BASE_URL=http://localhost:5000
```

**Production (`frontend/.env.production`):**
```
VITE_API_BASE_URL=https://internexis-official.onrender.com
```

## Setup Instructions

### 1. Initialize Admin Account
```bash
cd backend
npm run init-admin
```

### 2. Test Admin Login
```bash
cd backend
npm run test-admin
```

### 3. Start Backend Server
```bash
cd backend
npm run dev
```

### 4. Start Frontend
```bash
cd frontend
npm run dev
```

## API Usage Examples

### Login Request
```javascript
POST /api/admin/login
Content-Type: application/json

{
  "email": "help.internexis@gmail.com",
  "password": "admin@internexis"
}
```

### Login Response (Success)
```javascript
{
  "success": true,
  "message": "Login successful",
  "data": {
    "adminId": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "help.internexis@gmail.com",
    "role": "super_admin",
    "token": "admin_60f7b3b3b3b3b3b3b3b3b3b3_1640995200000_abc123def456",
    "lastLogin": "2025-06-21T06:31:38.000Z"
  }
}
```

### Login Response (Error)
```javascript
{
  "success": false,
  "message": "Invalid credentials"
}
```

## Security Features

1. **Account Locking**: After 5 failed login attempts, the account is locked for 2 hours
2. **Token-Based Authentication**: Simple token system for session management
3. **Input Validation**: Email format validation and required field checks
4. **Role-Based Access**: Different admin roles (admin, super_admin)
5. **Activity Tracking**: Last login and attempt tracking

## Frontend Token Storage

The frontend stores authentication data in localStorage:
- `adminLoggedIn`: boolean flag
- `adminToken`: authentication token
- `adminId`: admin user ID
- `adminEmail`: admin email
- `adminRole`: admin role

## Database Schema

```javascript
{
  email: String (required, unique, lowercase)
  password: String (required)
  role: String (default: 'admin', enum: ['admin', 'super_admin'])
  isActive: Boolean (default: true)
  lastLogin: Date
  loginAttempts: Number (default: 0)
  isLocked: Boolean (default: false)
  lockUntil: Date
  createdAt: Date
  updatedAt: Date
}
```

## Notes

- The system uses simple password validation (in production, consider using bcrypt)
- The token system is simplified (in production, consider using JWT)
- All admin operations are logged for security tracking
- The system supports future expansion for multiple admin users
