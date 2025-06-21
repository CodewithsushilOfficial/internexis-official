const express = require('express');
const router = express.Router();
const Career = require('../models/CareerModel');

// POST - Submit Career Application
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, position, resumeLink, experience } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !position || !resumeLink) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if email already exists for the same position
    const existingApplication = await Career.findOne({ 
      email, 
      position,
      status: { $nin: ['rejected'] } // Allow reapplication if previously rejected
    });
    
    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: 'You have already applied for this position'
      });
    }

    // Create new career application
    const newCareer = new Career({
      name,
      email,
      phone,
      position,
      resumeLink,
      experience: experience || '0-1'
    });

    await newCareer.save();

    res.status(201).json({
      success: true,
      message: 'Career application submitted successfully!',
      data: {
        id: newCareer._id,
        name: newCareer.name,
        email: newCareer.email,
        position: newCareer.position,
        submittedAt: newCareer.submittedAt
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
      message: 'Internal server error. Please try again later.'
    });
  }
});

// GET - Get all career applications (for admin)
router.get('/', async (req, res) => {
  try {
    const { position, status } = req.query;
    const filter = {};
    
    if (position) filter.position = position;
    if (status) filter.status = status;

    const applications = await Career.find(filter)
      .sort({ submittedAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });

  } catch (error) {
    console.error('Fetch career applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
