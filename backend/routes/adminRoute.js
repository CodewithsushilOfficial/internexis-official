const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Ambassador = require('../models/AmbassadorModel');
const Career = require('../models/CareerModel');
const Internship = require('../models/InternshipModel');
const router = express.Router();

// Admin credentials (in production, use environment variables)
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'help.internexis@gmail.com',
  password: process.env.ADMIN_PASSWORD || 'admin@internexis'
};

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'internexis_jwt_secret_key_2024_secure_token');
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Check credentials
    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        email: email,
        role: 'admin',
        loginTime: new Date()
      },
      process.env.JWT_SECRET || 'internexis_jwt_secret_key_2024_secure_token',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          email: email,
          role: 'admin'
        }
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// Get Dashboard Statistics
router.get('/dashboard', verifyAdmin, async (req, res) => {
  try {
    // Get statistics from all models
    const [ambassadorStats, careerStats, internshipStats] = await Promise.all([
      Ambassador.getStats(),
      Career.getStats(),
      Internship.getStats()
    ]);

    // Calculate totals
    const totalApplications = ambassadorStats.total + careerStats.total + internshipStats.total;
    const thisMonthApplications = ambassadorStats.thisMonth + careerStats.thisMonth + internshipStats.thisMonth;

    // Recent applications (last 10)
    const recentApplications = await Promise.all([
      Ambassador.find().sort({ submittedAt: -1 }).limit(3).select('name email status submittedAt').lean(),
      Career.find().sort({ submittedAt: -1 }).limit(3).select('name email position status submittedAt').lean(),
      Internship.find().sort({ submittedAt: -1 }).limit(4).select('name email domain status submittedAt').lean()
    ]);

    // Flatten and sort recent applications
    const allRecent = [
      ...recentApplications[0].map(app => ({ ...app, type: 'ambassador' })),
      ...recentApplications[1].map(app => ({ ...app, type: 'career' })),
      ...recentApplications[2].map(app => ({ ...app, type: 'internship' }))
    ].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).slice(0, 10);

    res.json({
      success: true,
      data: {
        overview: {
          totalApplications,
          thisMonthApplications,
          ambassadorApplications: ambassadorStats.total,
          careerApplications: careerStats.total,
          internshipApplications: internshipStats.total,
          completedInternships: internshipStats.completed || 0,
          activeInternships: internshipStats.active || 0
        },
        ambassador: ambassadorStats,
        career: careerStats,
        internship: internshipStats,
        recentApplications: allRecent,
        charts: {
          applicationsByType: [
            { name: 'Ambassador', value: ambassadorStats.total },
            { name: 'Career', value: careerStats.total },
            { name: 'Internship', value: internshipStats.total }
          ],
          statusDistribution: {
            pending: (ambassadorStats.byStatus.pending || 0) + 
                    (careerStats.byStatus.pending || 0) + 
                    (internshipStats.byStatus.pending || 0),
            reviewed: (ambassadorStats.byStatus.reviewed || 0) + 
                     (careerStats.byStatus.reviewed || 0) + 
                     (internshipStats.byStatus.reviewed || 0),
            accepted: (ambassadorStats.byStatus.accepted || 0) + 
                     (careerStats.byStatus.shortlisted || 0) + 
                     (internshipStats.byStatus.accepted || 0),
            rejected: (ambassadorStats.byStatus.rejected || 0) + 
                     (careerStats.byStatus.rejected || 0) + 
                     (internshipStats.byStatus.rejected || 0)
          }
        }
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

// Get Applications by Type
router.get('/applications/:type', verifyAdmin, async (req, res) => {
  try {
    const { type } = req.params;
    const { status, page = 1, limit = 10, search } = req.query;

    let Model;
    switch (type) {
      case 'ambassador':
        Model = Ambassador;
        break;
      case 'career':
        Model = Career;
        break;
      case 'internship':
        Model = Internship;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid application type'
        });
    }

    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
      
      // Add type-specific search fields
      if (type === 'ambassador') {
        query.$or.push({ college: { $regex: search, $options: 'i' } });
      } else if (type === 'career') {
        query.$or.push(
          { position: { $regex: search, $options: 'i' } },
          { currentCompany: { $regex: search, $options: 'i' } }
        );
      } else if (type === 'internship') {
        query.$or.push(
          { domain: { $regex: search, $options: 'i' } },
          { college: { $regex: search, $options: 'i' } }
        );
      }
    }

    const applications = await Model.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Model.countDocuments(query);

    res.json({
      success: true,
      data: applications,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

// Update Application Status
router.patch('/applications/:type/:id', verifyAdmin, async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status, notes } = req.body;

    let Model;
    switch (type) {
      case 'ambassador':
        Model = Ambassador;
        break;
      case 'career':
        Model = Career;
        break;
      case 'internship':
        Model = Internship;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid application type'
        });
    }

    const application = await Model.findByIdAndUpdate(
      id,
      {
        status,
        notes,
        reviewedBy: req.admin.email,
        reviewedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application updated successfully',
      data: application
    });

  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application'
    });
  }
});

// Delete Application
router.delete('/applications/:type/:id', verifyAdmin, async (req, res) => {
  try {
    const { type, id } = req.params;

    let Model;
    switch (type) {
      case 'ambassador':
        Model = Ambassador;
        break;
      case 'career':
        Model = Career;
        break;
      case 'internship':
        Model = Internship;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid application type'
        });
    }

    const application = await Model.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });

  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application'
    });
  }
});

// Export Applications to CSV
router.get('/export/:type', verifyAdmin, async (req, res) => {
  try {
    const { type } = req.params;
    const { status } = req.query;

    let Model;
    switch (type) {
      case 'ambassador':
        Model = Ambassador;
        break;
      case 'career':
        Model = Career;
        break;
      case 'internship':
        Model = Internship;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid application type'
        });
    }

    let query = {};
    if (status) {
      query.status = status;
    }

    const applications = await Model.find(query).sort({ submittedAt: -1 });

    res.json({
      success: true,
      data: applications,
      message: `${applications.length} ${type} applications exported`
    });

  } catch (error) {
    console.error('Export applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export applications'
    });
  }
});

// Verify Admin Token (for frontend auth check)
router.get('/verify', verifyAdmin, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    admin: {
      email: req.admin.email,
      role: req.admin.role
    }
  });
});

// Admin Logout (client-side token removal)
router.post('/logout', verifyAdmin, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;