const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const Admin = require('../models/AdminModel');
const Ambassador = require('../models/AmbassadorModelNew');
const Career = require('../models/CareerModel');
const Internship = require('../models/InternshipModel');
const { asyncHandler, validateRequest, authenticateAdmin, sendSuccess, sendError } = require('../utils/middleware');

const router = express.Router();

// Validation rules
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Generate JWT token
const generateToken = (adminId, role) => {
  return jwt.sign(
    { 
      id: adminId, 
      role,
      type: 'admin',
      iat: Math.floor(Date.now() / 1000)
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '24h',
      issuer: 'internexis-api',
      audience: 'internexis-admin'
    }
  );
};

// Admin login endpoint
router.post('/login', loginValidation, validateRequest, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(`Admin login attempt for email: ${email}`);
  console.log('Original email from request:', JSON.stringify(email));
  console.log('Lowercase email:', email.toLowerCase());

  // Find admin by email
  const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password +loginAttempts +lockUntil');
  
  console.log('Admin found:', !!admin);
  if (admin) {
    console.log('Admin email in DB:', admin.email);
  }
  
  if (!admin) {
    console.log(`Admin not found for email: ${email.toLowerCase()}`);
    return sendError(res, 'Invalid credentials', 401);
  }

  // Check if account is locked
  if (admin.isAccountLocked()) {
    console.log(`Account locked for admin: ${email}`);
    return sendError(res, 'Account is temporarily locked due to multiple failed login attempts. Try again later.', 423);
  }

  // Check if admin is active
  if (!admin.isActive) {
    console.log(`Inactive admin attempted login: ${email}`);
    return sendError(res, 'Account is deactivated. Contact system administrator.', 401);
  }

  // Validate password
  const isValidPassword = await bcrypt.compare(password, admin.password);
  
  if (!isValidPassword) {
    console.log(`Invalid password for admin: ${email}`);
    // Increment login attempts
    await admin.incrementLoginAttempts();
    return sendError(res, 'Invalid credentials', 401);
  }

  // Reset login attempts on successful login
  await admin.resetLoginAttempts();

  // Update last login
  admin.lastLogin = new Date();
  await admin.save();

  // Generate token
  const token = generateToken(admin._id, admin.role);

  console.log(`Admin login successful for: ${email}`);

  // Return success response
  sendSuccess(res, {
    adminId: admin._id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    token,
    lastLogin: admin.lastLogin,
    permissions: admin.permissions
  }, 'Login successful');
}));

// Verify token endpoint
router.get('/verify', authenticateAdmin, asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('-password -loginAttempts -lockUntil');
  
  if (!admin || !admin.isActive) {
    return sendError(res, 'Admin not found or inactive', 404);
  }

  sendSuccess(res, {
    adminId: admin._id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    permissions: admin.permissions,
    lastLogin: admin.lastLogin
  }, 'Token verified');
}));

// Logout endpoint
router.post('/logout', authenticateAdmin, asyncHandler(async (req, res) => {
  // In a real application, you might want to blacklist the token
  // For now, we'll just send a success response
  sendSuccess(res, null, 'Logged out successfully');
}));

// Get admin profile
router.get('/profile', authenticateAdmin, asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('-password -loginAttempts -lockUntil');
  
  if (!admin) {
    return sendError(res, 'Admin not found', 404);
  }

  sendSuccess(res, admin, 'Profile retrieved successfully');
}));

// Update admin profile
router.put('/profile', authenticateAdmin, [
  body('name').optional().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),
], validateRequest, asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const updates = {};

  if (name) updates.name = name;
  if (email) {
    // Check if email already exists
    const existingAdmin = await Admin.findOne({ 
      email: email.toLowerCase(), 
      _id: { $ne: req.admin.id } 
    });
    
    if (existingAdmin) {
      return sendError(res, 'Email already exists', 400);
    }
    
    updates.email = email.toLowerCase();
  }

  const admin = await Admin.findByIdAndUpdate(
    req.admin.id,
    updates,
    { new: true, runValidators: true }
  ).select('-password -loginAttempts -lockUntil');

  sendSuccess(res, admin, 'Profile updated successfully');
}));

// Change password
router.put('/change-password', authenticateAdmin, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  })
], validateRequest, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.admin.id).select('+password');
  
  if (!admin) {
    return sendError(res, 'Admin not found', 404);
  }

  // Verify current password
  const isValidPassword = await bcrypt.compare(currentPassword, admin.password);
  
  if (!isValidPassword) {
    return sendError(res, 'Current password is incorrect', 400);
  }

  // Hash new password
  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // Update password
  admin.password = hashedPassword;
  admin.passwordChangedAt = new Date();
  await admin.save();

  sendSuccess(res, null, 'Password changed successfully');
}));

// Dashboard stats
router.get('/dashboard/stats', authenticateAdmin, asyncHandler(async (req, res) => {
  const [
    totalAmbassadors,
    totalCareers,
    totalInternships,
    recentAmbassadors,
    recentCareers,
    recentInternships
  ] = await Promise.all([
    Ambassador.countDocuments(),
    Career.countDocuments(),
    Internship.countDocuments(),
    Ambassador.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
    Career.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
    Internship.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } })
  ]);

  const stats = {
    total: {
      ambassadors: totalAmbassadors,
      careers: totalCareers,
      internships: totalInternships,
      all: totalAmbassadors + totalCareers + totalInternships
    },
    recent: {
      ambassadors: recentAmbassadors,
      careers: recentCareers,
      internships: recentInternships,
      all: recentAmbassadors + recentCareers + recentInternships
    },
    growth: {
      ambassadors: totalAmbassadors > 0 ? ((recentAmbassadors / totalAmbassadors) * 100).toFixed(2) : 0,
      careers: totalCareers > 0 ? ((recentCareers / totalCareers) * 100).toFixed(2) : 0,
      internships: totalInternships > 0 ? ((recentInternships / totalInternships) * 100).toFixed(2) : 0
    }
  };

  sendSuccess(res, stats, 'Dashboard stats retrieved successfully');
}));

module.exports = router;
