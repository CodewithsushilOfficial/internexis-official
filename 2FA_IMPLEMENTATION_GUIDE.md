# Two-Factor Authentication (2FA) Implementation Guide

## 🔐 Overview

This guide documents the implementation of Two-Factor Authentication (2FA) for the Internexis Admin Panel. The 2FA system adds an extra layer of security by requiring administrators to verify their identity through a time-limited OTP (One-Time Password) sent to their email after successful login credentials verification.

## 🏗️ Architecture

### Authentication Flow
```
1. Admin enters email/password → Backend validates credentials
2. If valid → Generate 6-digit OTP → Store in MongoDB → Send via email
3. Frontend shows OTP input screen
4. Admin enters OTP → Backend verifies → Issues JWT token
5. Admin gains access to dashboard
```

### Security Features
- ✅ 6-digit numeric OTP
- ✅ 5-minute expiry time
- ✅ Maximum 3 verification attempts per OTP
- ✅ Rate limiting on OTP requests (1 minute cooldown)
- ✅ Automatic cleanup of expired OTPs
- ✅ Secure email templates with security warnings
- ✅ bcrypt password hashing
- ✅ JWT token-based authentication

## 📁 Files Added/Modified

### Backend Files Created
- `models/OtpModel.js` - MongoDB schema for OTP storage
- `utils/emailService.js` - Email service with Gmail SMTP integration
- `setup2FA.js` - Setup and configuration script
- `test2FA.js` - Automated testing suite

### Backend Files Modified
- `routes/adminRoute.js` - Added 2FA endpoints and logic
- `server.js` - Added email service initialization
- `.env` - Added Gmail SMTP configuration
- `package.json` - Added new scripts

### Frontend Files Created
- `components/admin/OTPVerification.tsx` - OTP input component

### Frontend Files Modified
- `components/admin/AdminLogin.tsx` - Updated to handle 2FA flow

## 🔧 Setup Instructions

### 1. Environment Configuration

Add the following variables to your `.env` file:

```env
# Gmail SMTP Configuration
GMAIL_EMAIL=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# JWT Secret (if not already set)
JWT_SECRET=your-super-secret-jwt-key

# MongoDB URI (if not already set)
MONGODB_URI=your-mongodb-connection-string
```

### 2. Gmail App Password Setup

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to Security → 2-Step Verification (enable if not already)
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Use the 16-character password in `GMAIL_APP_PASSWORD`

### 3. Run Setup Script

```bash
cd backend
npm run setup-2fa
```

This script will:
- Verify environment variables
- Test database connection
- Test email configuration
- Check/create admin accounts
- Send a test OTP email

### 4. Install Dependencies

All required dependencies are already included in `package.json`:
- `nodemailer` - Email sending
- `bcryptjs` - Password hashing
- `mongoose` - MongoDB integration

## 🚀 Usage

### Backend Endpoints

#### 1. Admin Login (Step 1)
```
POST /api/admin/login
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email address",
  "data": {
    "otp_sent": true,
    "email": "admin@example.com",
    "expires_in": 300
  }
}
```

#### 2. OTP Verification (Step 2)
```
POST /api/admin/verify-otp
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "otp": "123456"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "adminId": "...",
    "email": "admin@example.com",
    "name": "Admin Name",
    "role": "admin",
    "token": "jwt_token_here",
    "lastLogin": "2025-01-15T10:30:00Z",
    "permissions": [...]
  }
}
```

#### 3. Resend OTP
```
POST /api/admin/resend-otp
```

**Request Body:**
```json
{
  "email": "admin@example.com"
}
```

### Frontend Integration

The frontend automatically handles the 2FA flow:

1. **AdminLogin Component**: Handles initial login and redirects to OTP verification
2. **OTPVerification Component**: Manages OTP input, validation, and submission
3. **Automatic Flow**: Seamlessly transitions between login and verification screens

## 🔒 Security Considerations

### OTP Security
- **Expiry**: OTPs expire after 5 minutes
- **Single Use**: Each OTP can only be used once
- **Attempt Limiting**: Maximum 3 verification attempts per OTP
- **Rate Limiting**: 1-minute cooldown between OTP requests

### Email Security
- **Professional Templates**: Branded email templates with security warnings
- **Clear Instructions**: Users warned never to share OTPs
- **Phishing Protection**: Official branding and clear sender identification

### Database Security
- **Automatic Cleanup**: Expired OTPs are automatically removed
- **Hashed Passwords**: All admin passwords use bcrypt with 12 rounds
- **Indexed Collections**: Optimized database queries with proper indexing

## 🧪 Testing

### Automated Testing
```bash
# Run the full test suite
npm run test-2fa

# Manual testing instructions only
node test2FA.js --manual-only
```

### Manual Testing Checklist

1. **Complete Login Flow**
   - [ ] Login with valid credentials
   - [ ] Receive OTP email
   - [ ] Enter correct OTP
   - [ ] Access admin dashboard

2. **Error Handling**
   - [ ] Wrong password rejection
   - [ ] Invalid OTP rejection
   - [ ] Expired OTP handling
   - [ ] Maximum attempts exceeded

3. **Email Functionality**
   - [ ] OTP email delivery
   - [ ] Email formatting and branding
   - [ ] Resend OTP functionality

4. **Security Features**
   - [ ] Rate limiting on resend
   - [ ] OTP expiry (5 minutes)
   - [ ] Account lockout on failed attempts

## 📊 Database Schema

### OTP Model
```javascript
{
  email: String,        // Admin email address
  otp: String,          // 6-digit numeric OTP
  attempts: Number,     // Verification attempts (max 3)
  isUsed: Boolean,      // Whether OTP has been used
  expiresAt: Date,      // Expiry timestamp (5 minutes)
  createdAt: Date       // Creation timestamp
}
```

### Admin Model Updates
The existing Admin model already includes necessary fields:
- `password` (bcrypt hashed)
- `loginAttempts` and `lockUntil` for account security
- `isActive` for account status

## 🎨 Frontend Components

### OTPVerification Component Features
- **6-Digit Input**: Individual input fields for each digit
- **Auto-Focus**: Automatic navigation between input fields
- **Paste Support**: Support for pasting 6-digit codes
- **Visual Timer**: Real-time countdown display
- **Error Handling**: Clear error messages and retry logic
- **Responsive Design**: Mobile-friendly interface
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Design Elements
- **Gradient Backgrounds**: Modern visual design
- **Icon Integration**: Heroicons for visual cues
- **Animation Effects**: Smooth transitions with Framer Motion
- **Loading States**: Visual feedback during operations
- **Security Warnings**: Clear security notices and instructions

## 🔧 Troubleshooting

### Common Issues

1. **Email Not Sending**
   - Verify Gmail App Password is correct (16 characters)
   - Check that 2-Step Verification is enabled on Google Account
   - Verify GMAIL_EMAIL and GMAIL_APP_PASSWORD in .env

2. **Database Connection Issues**
   - Verify MONGODB_URI in .env file
   - Check MongoDB server status
   - Ensure network connectivity

3. **Frontend Not Showing OTP Screen**
   - Check browser console for errors
   - Verify API endpoint connectivity
   - Check that backend returns `otp_sent: true`

4. **OTP Verification Failing**
   - Ensure OTP hasn't expired (5 minutes)
   - Check for typos in OTP entry
   - Verify email address matches exactly

### Debug Commands
```bash
# Test email configuration
node -e "require('./utils/emailService').verifyConfiguration()"

# Check database connectivity
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('Connected'))"

# Test OTP generation
node -e "console.log(require('./utils/emailService').generateOTP())"
```

## 📈 Performance Considerations

### Database Optimization
- **TTL Index**: Automatic document expiry using MongoDB TTL
- **Compound Indexes**: Optimized queries for email + timestamp
- **Connection Pooling**: Efficient database connection management

### Email Service
- **Connection Reuse**: Single SMTP connection for multiple emails
- **Error Handling**: Graceful degradation on email service failures
- **Rate Limiting**: Prevents email service abuse

### Frontend Performance
- **Code Splitting**: Lazy loading of OTP component
- **State Management**: Efficient state updates
- **Memory Management**: Proper cleanup of timers and event listeners

## 🔄 Future Enhancements

### Potential Improvements
1. **SMS 2FA**: Alternative to email OTP
2. **TOTP Support**: Google Authenticator integration
3. **Backup Codes**: Recovery codes for account access
4. **Admin Preferences**: Choice of 2FA method
5. **Audit Logging**: Detailed security event logging
6. **IP Whitelisting**: Location-based security
7. **Device Management**: Trusted device registration

### Migration Path
The current implementation is designed to be backward compatible and can be enhanced incrementally without breaking existing functionality.

## 📋 Maintenance

### Regular Tasks
1. **Monitor Email Delivery**: Check email service health
2. **Database Cleanup**: Verify automatic OTP cleanup
3. **Security Audits**: Review authentication logs
4. **Performance Monitoring**: Track response times

### Log Monitoring
Watch for these log patterns:
- `OTP email sent successfully` - Successful email delivery
- `Email configuration verified` - Email service health
- `OTP verification error` - Authentication issues
- `Email transporter not initialized` - Configuration problems

---

**Note**: This implementation follows security best practices but should be reviewed by a security professional before production deployment.
