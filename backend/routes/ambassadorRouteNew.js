const express = require('express');
const { body, query, param } = require('express-validator');
const router = express.Router();
const Ambassador = require('../models/AmbassadorModelNew');
const { asyncHandler, validateRequest, authenticateAdmin, sendSuccess, sendError } = require('../utils/middleware');

// Validation rules
const ambassadorApplicationValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .matches(/^[\+]?[0-9\s\-\(\)]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('college')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('College name must be between 2 and 200 characters'),
  body('course')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Course must be between 2 and 100 characters'),
  body('year')
    .isIn(['1st Year', '2nd Year', '3rd Year', '4th Year', 'Post Graduate', 'PhD'])
    .withMessage('Please select a valid academic year'),
  body('city')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  body('state')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('State must be between 2 and 50 characters'),
  body('whyYouWantToJoin')
    .trim()
    .isLength({ min: 50, max: 2000 })
    .withMessage('Explanation must be between 50 and 2000 characters'),
  body('cgpa')
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage('CGPA must be between 0 and 10'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  body('skills.*')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Each skill must be at most 50 characters')
];

const statusUpdateValidation = [
  param('id').isMongoId().withMessage('Invalid ambassador ID'),
  body('status')
    .isIn(['pending', 'under_review', 'interview_scheduled', 'interview_completed', 'accepted', 'rejected', 'on_hold'])
    .withMessage('Invalid status'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
];

// PUBLIC ROUTES

// POST - Submit Ambassador Application
router.post('/', ambassadorApplicationValidation, validateRequest, asyncHandler(async (req, res) => {
  const {
    name, email, phone, alternatePhone, college, course, year, branch, cgpa,
    city, state, country, whyYouWantToJoin, previousExperience, skills,
    socialMedia, referralCode
  } = req.body;

  console.log(`New ambassador application from: ${email}`);

  // Check if email already exists
  const existingApplication = await Ambassador.findOne({ email });
  if (existingApplication) {
    return sendError(res, 'An application with this email already exists', 409);
  }

  // Check if phone already exists
  const existingPhone = await Ambassador.findOne({ phone });
  if (existingPhone) {
    return sendError(res, 'An application with this phone number already exists', 409);
  }

  // Create new ambassador application
  const ambassadorData = {
    name, email, phone, college, course, year, city, state,
    whyYouWantToJoin, ...(alternatePhone && { alternatePhone }),
    ...(branch && { branch }), ...(cgpa && { cgpa }),
    ...(country && { country }), ...(previousExperience && { previousExperience }),
    ...(skills && skills.length > 0 && { skills }),
    ...(socialMedia && { socialMedia }), ...(referralCode && { referralCode })
  };

  const newAmbassador = new Ambassador(ambassadorData);
  await newAmbassador.save();

  console.log(`Ambassador application created: ID ${newAmbassador._id}`);

  sendSuccess(res, {
    id: newAmbassador._id,
    name: newAmbassador.name,
    email: newAmbassador.email,
    submittedAt: newAmbassador.submittedAt,
    status: newAmbassador.status
  }, 'Campus Ambassador application submitted successfully!', 201);
}));

// GET - Check application status by email
router.get('/status/:email', [
  param('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
], validateRequest, asyncHandler(async (req, res) => {
  const { email } = req.params;
  
  const application = await Ambassador.findOne({ email }).select('name email status submittedAt ambassadorId');
  
  if (!application) {
    return sendError(res, 'No application found with this email', 404);
  }

  sendSuccess(res, {
    name: application.name,
    email: application.email,
    status: application.status,
    submittedAt: application.submittedAt,
    applicationAge: application.applicationAge,
    ...(application.ambassadorId && { ambassadorId: application.ambassadorId })
  }, 'Application status retrieved successfully');
}));

// ADMIN ROUTES

// GET - Get all ambassador applications with filters
router.get('/admin/all', authenticateAdmin, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['pending', 'under_review', 'interview_scheduled', 'interview_completed', 'accepted', 'rejected', 'on_hold']),
  query('college').optional().trim(),
  query('city').optional().trim(),
  query('search').optional().trim()
], validateRequest, asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, college, city, search, sortBy = 'submittedAt', sortOrder = 'desc' } = req.query;
  
  // Build filter object
  const filter = {};
  if (status) filter.status = status;
  if (college) filter.college = new RegExp(college, 'i');
  if (city) filter.city = new RegExp(city, 'i');
  if (search) {
    filter.$or = [
      { name: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { college: new RegExp(search, 'i') },
      { ambassadorId: new RegExp(search, 'i') }
    ];
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  // Execute queries in parallel
  const [applications, totalCount] = await Promise.all([
    Ambassador.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('statusHistory.changedBy', 'name email'),
    Ambassador.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(totalCount / parseInt(limit));

  sendSuccess(res, {
    applications,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalCount,
      hasNextPage: parseInt(page) < totalPages,
      hasPrevPage: parseInt(page) > 1
    },
    filters: { status, college, city, search }
  }, 'Ambassador applications retrieved successfully');
}));

// GET - Get ambassador application by ID
router.get('/admin/:id', authenticateAdmin, [
  param('id').isMongoId().withMessage('Invalid ambassador ID')
], validateRequest, asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const application = await Ambassador.findById(id).populate('statusHistory.changedBy', 'name email');
  
  if (!application) {
    return sendError(res, 'Ambassador application not found', 404);
  }

  sendSuccess(res, application, 'Ambassador application retrieved successfully');
}));

// PUT - Update ambassador application status
router.put('/admin/:id/status', authenticateAdmin, statusUpdateValidation, validateRequest, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  const application = await Ambassador.findById(id);
  
  if (!application) {
    return sendError(res, 'Ambassador application not found', 404);
  }

  await application.updateStatus(status, req.admin.id, notes);

  console.log(`Ambassador ${id} status updated to ${status} by admin ${req.admin.id}`);

  sendSuccess(res, {
    id: application._id,
    status: application.status,
    updatedAt: new Date()
  }, 'Ambassador status updated successfully');
}));

// PUT - Update ambassador application details
router.put('/admin/:id', authenticateAdmin, [
  param('id').isMongoId().withMessage('Invalid ambassador ID'),
  body('reviewNotes').optional().trim().isLength({ max: 1000 }).withMessage('Review notes cannot exceed 1000 characters'),
  body('interviewDate').optional().isISO8601().withMessage('Please provide a valid interview date'),
  body('interviewNotes').optional().trim().isLength({ max: 1000 }).withMessage('Interview notes cannot exceed 1000 characters'),
  body('assignedRegion').optional().trim().isLength({ max: 100 }).withMessage('Region cannot exceed 100 characters'),
  body('ambassadorLevel').optional().isIn(['Bronze', 'Silver', 'Gold', 'Platinum']).withMessage('Invalid ambassador level')
], validateRequest, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const application = await Ambassador.findByIdAndUpdate(
    id,
    { ...updates, lastActivity: new Date() },
    { new: true, runValidators: true }
  );
  
  if (!application) {
    return sendError(res, 'Ambassador application not found', 404);
  }

  console.log(`Ambassador ${id} updated by admin ${req.admin.id}`);

  sendSuccess(res, application, 'Ambassador application updated successfully');
}));

// DELETE - Delete ambassador application
router.delete('/admin/:id', authenticateAdmin, [
  param('id').isMongoId().withMessage('Invalid ambassador ID')
], validateRequest, asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const application = await Ambassador.findByIdAndDelete(id);
  
  if (!application) {
    return sendError(res, 'Ambassador application not found', 404);
  }

  console.log(`Ambassador ${id} deleted by admin ${req.admin.id}`);

  sendSuccess(res, null, 'Ambassador application deleted successfully');
}));

// GET - Get ambassador statistics
router.get('/admin/stats/overview', authenticateAdmin, asyncHandler(async (req, res) => {
  const stats = await Ambassador.getStats();
  
  sendSuccess(res, stats, 'Ambassador statistics retrieved successfully');
}));

// GET - Export ambassador data
router.get('/admin/export', authenticateAdmin, [
  query('format').optional().isIn(['json', 'csv']).withMessage('Format must be json or csv'),
  query('status').optional().isIn(['pending', 'under_review', 'interview_scheduled', 'interview_completed', 'accepted', 'rejected', 'on_hold'])
], validateRequest, asyncHandler(async (req, res) => {
  const { format = 'json', status } = req.query;
  
  const filter = status ? { status } : {};
  const applications = await Ambassador.find(filter).lean();

  if (format === 'csv') {
    // Convert to CSV format
    const csv = applications.map(app => ({
      Name: app.name,
      Email: app.email,
      Phone: app.phone,
      College: app.college,
      Course: app.course,
      Year: app.year,
      City: app.city,
      State: app.state,
      Status: app.status,
      'Submitted At': app.submittedAt,
      'Ambassador ID': app.ambassadorId || 'N/A'
    }));

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="ambassadors.csv"');
    
    // Simple CSV conversion (in production, use a proper CSV library)
    const headers = Object.keys(csv[0] || {}).join(',');
    const rows = csv.map(row => Object.values(row).join(',')).join('\n');
    res.send(headers + '\n' + rows);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="ambassadors.json"');
    sendSuccess(res, applications, 'Ambassador data exported successfully');
  }
}));

module.exports = router;
