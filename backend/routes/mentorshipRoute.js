const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const router = express.Router();

// Mentorship Application Schema
const mentorshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  expertise: {
    type: [String],
    required: [true, 'At least one area of expertise is required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Please select at least one area of expertise'
    }
  },
  experience: {
    type: String,
    required: [true, 'Experience is required'],
    enum: ['1-3 years', '3-5 years', '5-10 years', '10+ years']
  },
  currentRole: {
    type: String,
    required: [true, 'Current role is required'],
    trim: true,
    maxlength: [100, 'Current role cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  linkedinProfile: {
    type: String,
    required: [true, 'LinkedIn profile is required'],
    validate: [validator.isURL, 'Please provide a valid LinkedIn URL']
  },
  portfolio: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid portfolio URL'
    }
  },
  motivation: {
    type: String,
    required: [true, 'Please tell us why you want to become a mentor'],
    trim: true,
    minlength: [50, 'Please provide at least 50 characters'],
    maxlength: [1000, 'Motivation cannot exceed 1000 characters']
  },
  availability: {
    type: String,
    required: [true, 'Availability is required'],
    enum: ['1-2 hours/week', '3-5 hours/week', '5-10 hours/week', '10+ hours/week']
  },
  preferredMode: {
    type: String,
    enum: ['Video Call', 'Phone Call', 'Chat/Text', 'Email', 'Flexible'],
    default: 'Flexible'
  },
  languages: {
    type: [String],
    default: ['English']
  },
  timeZone: {
    type: String,
    default: 'Asia/Kolkata'
  },
  specializations: {
    type: [String],
    default: []
  },
  achievements: {
    type: String,
    maxlength: [500, 'Achievements cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'under-review', 'approved', 'rejected', 'active', 'inactive'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: String
  },
  approvedAt: {
    type: Date
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
mentorshipSchema.index({ email: 1 });
mentorshipSchema.index({ status: 1 });
mentorshipSchema.index({ expertise: 1 });
mentorshipSchema.index({ submittedAt: -1 });

// Virtual for application age
mentorshipSchema.virtual('applicationAge').get(function() {
  return Math.floor((Date.now() - this.submittedAt) / (1000 * 60 * 60 * 24));
});

// Pre-save middleware
mentorshipSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (this.status !== 'pending') {
      this.reviewedAt = new Date();
    }
    if (this.status === 'approved') {
      this.approvedAt = new Date();
    }
  }
  next();
});

const Mentorship = mongoose.model('Mentorship', mentorshipSchema);

// Submit Mentorship Application
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      expertise,
      experience,
      currentRole,
      company,
      linkedinProfile,
      portfolio,
      motivation,
      availability,
      preferredMode,
      languages,
      timeZone,
      specializations,
      achievements
    } = req.body;

    // Check if email already exists
    const existingApplication = await Mentorship.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'A mentorship application with this email already exists'
      });
    }

    // Create new mentorship application
    const mentorship = new Mentorship({
      name,
      email,
      phone,
      expertise,
      experience,
      currentRole,
      company,
      linkedinProfile,
      portfolio,
      motivation,
      availability,
      preferredMode,
      languages: languages || ['English'],
      timeZone,
      specializations: specializations || [],
      achievements
    });

    await mentorship.save();

    res.status(201).json({
      success: true,
      message: 'Mentorship application submitted successfully! We will review your application and get back to you soon.',
      data: {
        id: mentorship._id,
        name: mentorship.name,
        email: mentorship.email,
        expertise: mentorship.expertise,
        status: mentorship.status,
        submittedAt: mentorship.submittedAt
      }
    });

  } catch (error) {
    console.error('Mentorship application error:', error);
    
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
        message: 'A mentorship application with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all mentorship applications (Admin only)
router.get('/', async (req, res) => {
  try {
    const { status, expertise, page = 1, limit = 10, search } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (expertise) {
      query.expertise = { $in: [expertise] };
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { currentRole: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await Mentorship.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Mentorship.countDocuments(query);

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
    console.error('Get mentorship applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

// Get approved mentors (Public endpoint)
router.get('/mentors', async (req, res) => {
  try {
    const { expertise, page = 1, limit = 12 } = req.query;
    
    let query = { status: 'approved' };
    
    if (expertise) {
      query.expertise = { $in: [expertise] };
    }

    const mentors = await Mentorship.find(query)
      .select('name expertise experience currentRole company rating totalSessions languages preferredMode specializations')
      .sort({ rating: -1, totalSessions: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Mentorship.countDocuments(query);

    res.json({
      success: true,
      data: mentors,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get mentors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch mentors'
    });
  }
});

// Get mentorship application by ID
router.get('/:id', async (req, res) => {
  try {
    const application = await Mentorship.findById(req.params.id);
    
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
    console.error('Get mentorship application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application'
    });
  }
});

// Update mentorship application status
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes, reviewedBy, rating } = req.body;
    
    const updateData = {
      status,
      notes,
      reviewedBy,
      reviewedAt: new Date()
    };

    if (rating) {
      updateData.rating = rating;
    }
    
    const application = await Mentorship.findByIdAndUpdate(
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
    console.error('Update mentorship application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application'
    });
  }
});

// Delete mentorship application
router.delete('/:id', async (req, res) => {
  try {
    const application = await Mentorship.findByIdAndDelete(req.params.id);
    
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
    console.error('Delete mentorship application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application'
    });
  }
});

// Get mentorship statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Mentorship.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const expertiseStats = await Mentorship.aggregate([
      { $unwind: '$expertise' },
      {
        $group: {
          _id: '$expertise',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    const total = await Mentorship.countDocuments();
    const thisMonth = await Mentorship.countDocuments({
      submittedAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });
    
    const approved = await Mentorship.countDocuments({ status: 'approved' });
    const active = await Mentorship.countDocuments({ status: 'active' });
    
    res.json({
      success: true,
      data: {
        total,
        thisMonth,
        approved,
        active,
        byStatus: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {}),
        topExpertise: expertiseStats
      }
    });

  } catch (error) {
    console.error('Get mentorship stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;