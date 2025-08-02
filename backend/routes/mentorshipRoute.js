const express = require('express');
const router = express.Router();
const Mentorship = require('../models/MentorshipModel');

// Get all active mentors (for frontend)
router.get('/', async (req, res) => {
  try {
    const { expertise, priceRange, isFeatured } = req.query;
    
    let filter = { isActive: true };
    
    if (expertise) {
      filter.expertise = { $in: [expertise] };
    }
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        filter['pricing.sessionPrice'] = { $gte: min, $lte: max };
      } else {
        filter['pricing.sessionPrice'] = { $gte: min };
      }
    }
    
    if (isFeatured) {
      filter.isFeatured = isFeatured === 'true';
    }
    
    const mentors = await Mentorship.find(filter)
      .sort({ isFeatured: -1, rating: -1, totalSessions: -1 });
      
    res.json({
      success: true,
      count: mentors.length,
      data: mentors
    });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching mentors',
      error: error.message
    });
  }
});

// Get featured mentors
router.get('/featured', async (req, res) => {
  try {
    const mentors = await Mentorship.find({
      isActive: true,
      isFeatured: true
    }).sort({ rating: -1 }).limit(6);
    
    res.json({
      success: true,
      count: mentors.length,
      data: mentors
    });
  } catch (error) {
    console.error('Error fetching featured mentors:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured mentors',
      error: error.message
    });
  }
});

// Get mentors by expertise
router.get('/expertise/:expertise', async (req, res) => {
  try {
    const { expertise } = req.params;
    const mentors = await Mentorship.find({
      isActive: true,
      expertise: { $in: [expertise] }
    }).sort({ rating: -1, totalSessions: -1 });
    
    res.json({
      success: true,
      count: mentors.length,
      data: mentors
    });
  } catch (error) {
    console.error('Error fetching mentors by expertise:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching mentors by expertise',
      error: error.message
    });
  }
});

// Get single mentor
router.get('/:id', async (req, res) => {
  try {
    const mentor = await Mentorship.findById(req.params.id);
    
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }
    
    res.json({
      success: true,
      data: mentor
    });
  } catch (error) {
    console.error('Error fetching mentor:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching mentor',
      error: error.message
    });
  }
});

// Admin Routes - Create new mentor
router.post('/admin', async (req, res) => {
  try {
    const mentor = new Mentorship(req.body);
    await mentor.save();
    
    res.status(201).json({
      success: true,
      message: 'Mentor created successfully',
      data: mentor
    });
  } catch (error) {
    console.error('Error creating mentor:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating mentor',
      error: error.message
    });
  }
});

// Admin Routes - Update mentor
router.put('/admin/:id', async (req, res) => {
  try {
    const mentor = await Mentorship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Mentor updated successfully',
      data: mentor
    });
  } catch (error) {
    console.error('Error updating mentor:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating mentor',
      error: error.message
    });
  }
});

// Admin Routes - Delete mentor
router.delete('/admin/:id', async (req, res) => {
  try {
    const mentor = await Mentorship.findByIdAndDelete(req.params.id);
    
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Mentor deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting mentor:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting mentor',
      error: error.message
    });
  }
});

// Admin Routes - Get all mentors (including inactive)
router.get('/admin/all', async (req, res) => {
  try {
    const mentors = await Mentorship.find({})
      .sort({ isFeatured: -1, rating: -1, createdAt: -1 });
      
    res.json({
      success: true,
      count: mentors.length,
      data: mentors
    });
  } catch (error) {
    console.error('Error fetching all mentors:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching mentors',
      error: error.message
    });
  }
});

// Increment session count
router.patch('/:id/session', async (req, res) => {
  try {
    const mentor = await Mentorship.findByIdAndUpdate(
      req.params.id,
      { $inc: { totalSessions: 1 } },
      { new: true }
    );
    
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Session count updated',
      data: { totalSessions: mentor.totalSessions }
    });
  } catch (error) {
    console.error('Error updating session count:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating session count',
      error: error.message
    });
  }
});

// Get expertise areas
router.get('/filters/expertise', async (req, res) => {
  try {
    const expertiseAreas = await Mentorship.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$expertise' },
      { $group: { _id: '$expertise', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: expertiseAreas.map(item => item._id)
    });
  } catch (error) {
    console.error('Error fetching expertise areas:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching expertise areas',
      error: error.message
    });
  }
});

module.exports = router;
