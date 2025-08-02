const express = require('express');
const router = express.Router();
const Internship = require('../models/InternshipModel');

// POST - Submit Internship Application
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, domain, college, year, duration } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !domain || !college) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if email already exists for active applications
    const existingApplication = await Internship.findOne({ 
      email,
      status: { $nin: ['rejected', 'completed'] } // Allow reapplication if previous was rejected or completed
    });
    
    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: 'You already have an active internship application'
      });
    }

    // Create new internship application
    const newInternship = new Internship({
      name,
      email,
      phone,
      domain,
      college,
      year: year || '1st Year',
      duration: duration || '1 Month'
    });

    await newInternship.save();

    res.status(201).json({
      success: true,
      message: 'Internship application submitted successfully!',
      data: {
        id: newInternship._id,
        name: newInternship.name,
        email: newInternship.email,
        domain: newInternship.domain,
        college: newInternship.college,
        submittedAt: newInternship.submittedAt
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

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// GET - Get all internship applications (for admin)
router.get('/', async (req, res) => {
  try {
    const { domain, status, college } = req.query;
    const filter = {};
    
    if (domain) filter.domain = domain;
    if (status) filter.status = status;
    if (college) filter.college = new RegExp(college, 'i'); // Case-insensitive search

    const applications = await Internship.find(filter)
      .sort({ submittedAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });

  } catch (error) {
    console.error('Fetch internship applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
