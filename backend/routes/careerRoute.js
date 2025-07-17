const express = require('express');
const Career = require('../models/CareerModel');
const router = express.Router();

// Submit Career Application
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      position,
      resumeLink,
      experience,
      currentCompany,
      expectedSalary,
      location,
      skills,
      portfolio,
      linkedinProfile,
      githubProfile,
      coverLetter,
      availability,
      workType,
      remoteWork
    } = req.body;

    // Create new career application
    const career = new Career({
      name,
      email,
      phone,
      position,
      resumeLink,
      experience,
      currentCompany,
      expectedSalary,
      location,
      skills: skills || [],
      portfolio,
      linkedinProfile,
      githubProfile,
      coverLetter,
      availability,
      workType,
      remoteWork
    });

    await career.save();

    res.status(201).json({
      success: true,
      message: 'Career application submitted successfully!',
      data: {
        id: career._id,
        name: career.name,
        email: career.email,
        position: career.position,
        status: career.status,
        submittedAt: career.submittedAt
      }
    });

  } catch (error) {
    console.error('Career application error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all career applications (Admin only)
router.get('/', async (req, res) => {
  try {
    const { status, position, page = 1, limit = 10, search } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (position) {
      query.position = position;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
        { currentCompany: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await Career.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Career.countDocuments(query);

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
    console.error('Get career applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

// Get career application by ID
router.get('/:id', async (req, res) => {
  try {
    const application = await Career.findById(req.params.id);
    
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
    console.error('Get career application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application'
    });
  }
});

// Update career application status
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes, reviewedBy, interviewDate, rating } = req.body;
    
    const updateData = {
      status,
      notes,
      reviewedBy,
      reviewedAt: new Date()
    };

    if (interviewDate) {
      updateData.interviewDate = new Date(interviewDate);
    }

    if (rating) {
      updateData.rating = rating;
    }
    
    const application = await Career.findByIdAndUpdate(
      req.params.id,
      updateData,
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
    console.error('Update career application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application'
    });
  }
});

// Delete career application
router.delete('/:id', async (req, res) => {
  try {
    const application = await Career.findByIdAndDelete(req.params.id);
    
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
    console.error('Delete career application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application'
    });
  }
});

// Get career statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Career.getStats();
    
    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get career stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;