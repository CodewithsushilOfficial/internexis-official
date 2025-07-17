const express = require('express');
const Ambassador = require('../models/AmbassadorModel');
const router = express.Router();

// Submit Ambassador Application
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      college,
      whyYouWantToJoin,
      year,
      course,
      skills,
      socialMedia
    } = req.body;

    // Check if email already exists
    const existingApplication = await Ambassador.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'An application with this email already exists'
      });
    }

    // Create new ambassador application
    const ambassador = new Ambassador({
      name,
      email,
      phone,
      college,
      whyYouWantToJoin,
      year,
      course,
      skills: skills || [],
      socialMedia: socialMedia || {}
    });

    await ambassador.save();

    res.status(201).json({
      success: true,
      message: 'Ambassador application submitted successfully!',
      data: {
        id: ambassador._id,
        name: ambassador.name,
        email: ambassador.email,
        status: ambassador.status,
        submittedAt: ambassador.submittedAt
      }
    });

  } catch (error) {
    console.error('Ambassador application error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'An application with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all ambassador applications (Admin only)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await Ambassador.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Ambassador.countDocuments(query);

    res.json({
      success: true,
      data: applications,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get ambassador applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

// Get ambassador application by ID
router.get('/:id', async (req, res) => {
  try {
    const application = await Ambassador.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: application
    });

  } catch (error) {
    console.error('Get ambassador application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application'
    });
  }
});

// Update ambassador application status
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes, reviewedBy } = req.body;
    
    const application = await Ambassador.findByIdAndUpdate(
      req.params.id,
      {
        status,
        notes,
        reviewedBy,
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
    console.error('Update ambassador application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application'
    });
  }
});

// Delete ambassador application
router.delete('/:id', async (req, res) => {
  try {
    const application = await Ambassador.findByIdAndDelete(req.params.id);
    
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
    console.error('Delete ambassador application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application'
    });
  }
});

// Get ambassador statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Ambassador.getStats();
    
    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get ambassador stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;