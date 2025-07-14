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

// Dashboard recent applications
router.get('/dashboard/recent/:limit?', authenticateAdmin, asyncHandler(async (req, res) => {
  const limit = parseInt(req.params.limit) || 5;

  // Get recent applications from all three collections
  const [recentAmbassadors, recentCareers, recentInternships] = await Promise.all([
    Ambassador.find()
      .sort({ submittedAt: -1 })
      .limit(limit)
      .select('name email submittedAt status college')
      .lean(),
    Career.find()
      .sort({ submittedAt: -1 })
      .limit(limit)
      .select('name email submittedAt status position')
      .lean(),
    Internship.find()
      .sort({ submittedAt: -1 })
      .limit(limit)
      .select('name email submittedAt status domain college')
      .lean()
  ]);

  // Add type field to each application
  const ambassadorApps = recentAmbassadors.map(app => ({
    ...app,
    id: app._id,
    type: 'Campus Ambassador'
  }));

  const careerApps = recentCareers.map(app => ({
    ...app,
    id: app._id,
    type: 'Career'
  }));

  const internshipApps = recentInternships.map(app => ({
    ...app,
    id: app._id,
    type: 'Internship'
  }));

  // Combine all applications and sort by submission date
  const allApplications = [...ambassadorApps, ...careerApps, ...internshipApps]
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, limit);

  sendSuccess(res, allApplications, 'Recent applications retrieved successfully');
}));

// Get applications by type
router.get('/applications/:type', authenticateAdmin, asyncHandler(async (req, res) => {
  const { type } = req.params;
  const { page = 1, limit = 10, status, search } = req.query;

  let Model;
  let selectFields;

  switch (type.toLowerCase()) {
    case 'ambassador':
    case 'campus-ambassador':
      Model = Ambassador;
      selectFields = 'name email phone college whyYouWantToJoin submittedAt status';
      break;
    case 'career':
      Model = Career;
      selectFields = 'name email phone position resumeLink experience submittedAt status';
      break;
    case 'internship':
      Model = Internship;
      selectFields = 'name email phone domain college year duration submittedAt status';
      break;
    default:
      return sendError(res, 'Invalid application type', 400);
  }

  // Build query
  let query = {};
  
  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Get applications and total count
  const [applications, total] = await Promise.all([
    Model.find(query)
      .select(selectFields)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Model.countDocuments(query)
  ]);

  // Add id field for frontend compatibility
  const applicationsWithId = applications.map(app => ({
    ...app,
    id: app._id
  }));

  sendSuccess(res, {
    applications: applicationsWithId,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  }, 'Applications retrieved successfully');
}));

// Update application status
router.patch('/applications/:type/:id/status', authenticateAdmin, asyncHandler(async (req, res) => {
  const { type, id } = req.params;
  const { status } = req.body;

  if (!status) {
    return sendError(res, 'Status is required', 400);
  }

  let Model;
  switch (type.toLowerCase()) {
    case 'ambassador':
    case 'campus-ambassador':
      Model = Ambassador;
      break;
    case 'career':
      Model = Career;
      break;
    case 'internship':
      Model = Internship;
      break;
    default:
      return sendError(res, 'Invalid application type', 400);
  }

  const application = await Model.findByIdAndUpdate(
    id,
    { status, statusUpdatedAt: new Date() },
    { new: true, runValidators: true }
  );

  if (!application) {
    return sendError(res, 'Application not found', 404);
  }

  sendSuccess(res, application, 'Application status updated successfully');
}));

// Unlock admin account (emergency endpoint)
router.post('/unlock-account', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('adminKey').notEmpty().withMessage('Admin key is required')
], validateRequest, asyncHandler(async (req, res) => {
  const { email, adminKey } = req.body;
  
  // Check admin key (for emergency access)
  const expectedKey = process.env.ADMIN_UNLOCK_KEY || 'emergency_unlock_internexis_2024';
  if (adminKey !== expectedKey) {
    return sendError(res, 'Invalid admin key', 403);
  }

  // Find and unlock the admin account
  const admin = await Admin.findOne({ email: email.toLowerCase() });
  
  if (!admin) {
    return sendError(res, 'Admin not found', 404);
  }

  // Reset all lock-related fields
  admin.loginAttempts = 0;
  admin.lockUntil = undefined;
  admin.isActive = true;
  admin.emailVerified = true;
  admin.passwordChangedAt = new Date();
  
  await admin.save();

  console.log(`🔓 Admin account unlocked for: ${email}`);

  sendSuccess(res, {
    email: admin.email,
    name: admin.name,
    isActive: admin.isActive,
    isLocked: admin.isAccountLocked ? admin.isAccountLocked() : false,
    loginAttempts: admin.loginAttempts
  }, 'Admin account unlocked successfully');
}));

module.exports = router;
