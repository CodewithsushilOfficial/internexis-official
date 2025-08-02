const express = require('express');
const router = express.Router();
const Ambassador = require('../models/AmbassadorModel');

// POST - Submit Ambassador Application
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, college, whyYouWantToJoin } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !college || !whyYouWantToJoin) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if email already exists
    const existingApplication = await Ambassador.findOne({ email });
    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: 'An application with this email already exists'
      });
    }

    // Create new ambassador application
    const newAmbassador = new Ambassador({
      name,
      email,
      phone,
      college,
      whyYouWantToJoin
    });

    await newAmbassador.save();

    res.status(201).json({
      success: true,
      message: 'Campus Ambassador application submitted successfully!',
      data: {
        id: newAmbassador._id,
        name: newAmbassador.name,
        email: newAmbassador.email,
        submittedAt: newAmbassador.submittedAt
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

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// GET - Get all ambassador applications (for admin)
router.get('/', async (req, res) => {
  try {
    const applications = await Ambassador.find()
      .sort({ submittedAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });

  } catch (error) {
    console.error('Fetch ambassador applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
