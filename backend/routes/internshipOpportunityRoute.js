const express = require('express');
const router = express.Router();
const InternshipOpportunity = require('../models/InternshipOpportunityModel');

// Get all active internship opportunities (for frontend)
router.get('/opportunities', async (req, res) => {
  try {
    const { domain, mode, duration, location, stipendRange } = req.query;
    
    let filter = { 
      isActive: true,
      applicationDeadline: { $gte: new Date() }
    };
    
    if (domain) filter.domain = domain;
    if (mode) filter.mode = mode;
    if (duration) filter.duration = duration;
    if (location && location !== 'All') filter.location = new RegExp(location, 'i');
    
    if (stipendRange) {
      const [min, max] = stipendRange.split('-').map(Number);
      if (max) {
        filter['stipend.amount'] = { $gte: min, $lte: max };
      } else if (min === 0) {
        filter['stipend.amount'] = 0;
      } else {
        filter['stipend.amount'] = { $gte: min };
      }
    }
    
    const opportunities = await InternshipOpportunity.find(filter)
      .sort({ isFeatured: -1, isUrgent: -1, createdAt: -1 });
      
    res.json({
      success: true,
      count: opportunities.length,
      data: opportunities
    });
  } catch (error) {
    console.error('Error fetching internship opportunities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching internship opportunities',
      error: error.message
    });
  }
});

// Get featured internship opportunities
router.get('/opportunities/featured', async (req, res) => {
  try {
    const opportunities = await InternshipOpportunity.find({
      isActive: true,
      isFeatured: true,
      applicationDeadline: { $gte: new Date() }
    }).sort({ applicationDeadline: 1 }).limit(6);
    
    res.json({
      success: true,
      count: opportunities.length,
      data: opportunities
    });
  } catch (error) {
    console.error('Error fetching featured opportunities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured opportunities',
      error: error.message
    });
  }
});

// Get urgent internship opportunities
router.get('/opportunities/urgent', async (req, res) => {
  try {
    const opportunities = await InternshipOpportunity.find({
      isActive: true,
      isUrgent: true,
      applicationDeadline: { $gte: new Date() }
    }).sort({ applicationDeadline: 1 }).limit(5);
    
    res.json({
      success: true,
      count: opportunities.length,
      data: opportunities
    });
  } catch (error) {
    console.error('Error fetching urgent opportunities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching urgent opportunities',
      error: error.message
    });
  }
});

// Get latest internship opportunities
router.get('/opportunities/latest', async (req, res) => {
  try {
    const opportunities = await InternshipOpportunity.find({
      isActive: true,
      applicationDeadline: { $gte: new Date() }
    }).sort({ createdAt: -1 }).limit(10);
    
    res.json({
      success: true,
      count: opportunities.length,
      data: opportunities
    });
  } catch (error) {
    console.error('Error fetching latest opportunities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching latest opportunities',
      error: error.message
    });
  }
});

// Get single internship opportunity
router.get('/opportunities/:id', async (req, res) => {
  try {
    const opportunity = await InternshipOpportunity.findById(req.params.id);
    
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Internship opportunity not found'
      });
    }
    
    res.json({
      success: true,
      data: opportunity
    });
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching opportunity',
      error: error.message
    });
  }
});

// Increment application count for opportunity
router.patch('/opportunities/:id/apply', async (req, res) => {
  try {
    const opportunity = await InternshipOpportunity.findByIdAndUpdate(
      req.params.id,
      { $inc: { applicationsCount: 1 } },
      { new: true }
    );
    
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Application count updated',
      data: { applicationsCount: opportunity.applicationsCount }
    });
  } catch (error) {
    console.error('Error updating application count:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating application count',
      error: error.message
    });
  }
});

// Admin Routes - Create new internship opportunity
router.post('/admin/opportunities', async (req, res) => {
  try {
    const opportunity = new InternshipOpportunity(req.body);
    await opportunity.save();
    
    res.status(201).json({
      success: true,
      message: 'Internship opportunity created successfully',
      data: opportunity
    });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating opportunity',
      error: error.message
    });
  }
});

// Admin Routes - Update internship opportunity
router.put('/admin/opportunities/:id', async (req, res) => {
  try {
    const opportunity = await InternshipOpportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Opportunity updated successfully',
      data: opportunity
    });
  } catch (error) {
    console.error('Error updating opportunity:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating opportunity',
      error: error.message
    });
  }
});

// Admin Routes - Delete internship opportunity
router.delete('/admin/opportunities/:id', async (req, res) => {
  try {
    const opportunity = await InternshipOpportunity.findByIdAndDelete(req.params.id);
    
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Opportunity deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting opportunity',
      error: error.message
    });
  }
});

// Admin Routes - Get all internship opportunities (including inactive)
router.get('/admin/opportunities/all', async (req, res) => {
  try {
    const opportunities = await InternshipOpportunity.find({})
      .sort({ isFeatured: -1, createdAt: -1 });
      
    res.json({
      success: true,
      count: opportunities.length,
      data: opportunities
    });
  } catch (error) {
    console.error('Error fetching all opportunities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching opportunities',
      error: error.message
    });
  }
});

// Get opportunity filters data
router.get('/opportunities/filters/data', async (req, res) => {
  try {
    const domains = await InternshipOpportunity.distinct('domain', { isActive: true });
    const modes = await InternshipOpportunity.distinct('mode', { isActive: true });
    const durations = await InternshipOpportunity.distinct('duration', { isActive: true });
    const locations = await InternshipOpportunity.distinct('location', { isActive: true });
    
    res.json({
      success: true,
      data: {
        domains,
        modes,
        durations,
        locations
      }
    });
  } catch (error) {
    console.error('Error fetching filter data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter data',
      error: error.message
    });
  }
});

module.exports = router;
