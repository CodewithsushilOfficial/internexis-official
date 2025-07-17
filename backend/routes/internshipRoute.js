const express = require('express');
const Internship = require('../models/InternshipModel');
const router = express.Router();

// Submit Internship Application
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      domain,
      college,
      year,
      course,
      duration,
      startDate,
      skills,
      experience,
      motivation,
      portfolio,
      linkedinProfile,
      githubProfile,
      resumeLink,
      previousInternships,
      workMode,
      timeCommitment
    } = req.body;

    // Check if email already exists
    const existingApplication = await Internship.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'An internship application with this email already exists'
      });
    }

    // Create new internship application
    const internship = new Internship({
      name,
      email,
      phone,
      domain,
      college,
      year,
      course,
      duration,
      startDate,
      skills: skills || [],
      experience,
      motivation,
      portfolio,
      linkedinProfile,
      githubProfile,
      resumeLink,
      previousInternships,
      workMode,
      timeCommitment
    });

    await internship.save();

    res.status(201).json({
      success: true,
      message: 'Internship application submitted successfully!',
      data: {
        id: internship._id,
        name: internship.name,
        email: internship.email,
        domain: internship.domain,
        status: internship.status,
        submittedAt: internship.submittedAt
      }
    });

  } catch (error) {
    console.error('Internship application error:', error);
    
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
        message: 'An internship application with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all internship applications (Admin only)
router.get('/', async (req, res) => {
  try {
    const { status, domain, page = 1, limit = 10, search } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (domain) {
      query.domain = domain;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } },
        { domain: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await Internship.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Internship.countDocuments(query);

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
    console.error('Get internship applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

// Get internship application by ID
router.get('/:id', async (req, res) => {
  try {
    const application = await Internship.findById(req.params.id);
    
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
    console.error('Get internship application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application'
    });
  }
});

// Update internship application status
router.patch('/:id', async (req, res) => {
  try {
    const { 
      status, 
      notes, 
      reviewedBy, 
      mentorAssigned, 
      progress, 
      rating, 
      feedback 
    } = req.body;
    
    const updateData = {
      status,
      notes,
      reviewedBy,
      reviewedAt: new Date()
    };

    if (mentorAssigned) {
      updateData.mentorAssigned = mentorAssigned;
    }

    if (progress !== undefined) {
      updateData.progress = progress;
    }

    if (rating) {
      updateData.rating = rating;
    }

    if (feedback) {
      updateData.feedback = feedback;
    }

    // Handle certificate issuance for completed internships
    if (status === 'completed' && req.body.issueCertificate) {
      updateData.certificate = {
        issued: true,
        issuedAt: new Date(),
        certificateId: `INTERN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };
    }
    
    const application = await Internship.findByIdAndUpdate(
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
    console.error('Update internship application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application'
    });
  }
});

// Delete internship application
router.delete('/:id', async (req, res) => {
  try {
    const application = await Internship.findByIdAndDelete(req.params.id);
    
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
    console.error('Delete internship application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application'
    });
  }
});

// Get internship statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Internship.getStats();
    
    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get internship stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;