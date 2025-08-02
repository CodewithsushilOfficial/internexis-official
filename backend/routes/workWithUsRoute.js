const express = require('express');
const router = express.Router();
const WorkWithUs = require('../models/WorkWithUsModel');

// Get all active job openings (for frontend)
router.get('/', async (req, res) => {
  try {
    const { jobType, department, location, experience } = req.query;
    
    let filter = { isActive: true };
    
    if (jobType) filter.jobType = jobType;
    if (department) filter.department = department;
    if (location && location !== 'All') filter.location = new RegExp(location, 'i');
    if (experience) filter.experience = experience;
    
    const jobs = await WorkWithUs.find(filter)
      .sort({ isUrgent: -1, createdAt: -1 });
      
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching job openings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job openings',
      error: error.message
    });
  }
});

// Get urgent job openings
router.get('/urgent', async (req, res) => {
  try {
    const jobs = await WorkWithUs.find({
      isActive: true,
      isUrgent: true,
      deadline: { $gte: new Date() }
    }).sort({ deadline: 1 }).limit(5);
    
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching urgent jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching urgent jobs',
      error: error.message
    });
  }
});

// Get latest job openings
router.get('/latest', async (req, res) => {
  try {
    const jobs = await WorkWithUs.find({
      isActive: true,
      deadline: { $gte: new Date() }
    }).sort({ createdAt: -1 }).limit(10);
    
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching latest jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching latest jobs',
      error: error.message
    });
  }
});

// Get single job opening
router.get('/:id', async (req, res) => {
  try {
    const job = await WorkWithUs.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job opening not found'
      });
    }
    
    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job opening:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job opening',
      error: error.message
    });
  }
});

// Admin Routes - Create new job opening
router.post('/admin', async (req, res) => {
  try {
    const job = new WorkWithUs(req.body);
    await job.save();
    
    res.status(201).json({
      success: true,
      message: 'Job opening created successfully',
      data: job
    });
  } catch (error) {
    console.error('Error creating job opening:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating job opening',
      error: error.message
    });
  }
});

// Admin Routes - Update job opening
router.put('/admin/:id', async (req, res) => {
  try {
    const job = await WorkWithUs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job opening not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Job opening updated successfully',
      data: job
    });
  } catch (error) {
    console.error('Error updating job opening:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating job opening',
      error: error.message
    });
  }
});

// Admin Routes - Delete job opening
router.delete('/admin/:id', async (req, res) => {
  try {
    const job = await WorkWithUs.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job opening not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Job opening deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job opening:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting job opening',
      error: error.message
    });
  }
});

// Admin Routes - Get all job openings (including inactive)
router.get('/admin/all', async (req, res) => {
  try {
    const jobs = await WorkWithUs.find({})
      .sort({ isUrgent: -1, createdAt: -1 });
      
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching all job openings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job openings',
      error: error.message
    });
  }
});

// Increment application count
router.patch('/:id/apply', async (req, res) => {
  try {
    const job = await WorkWithUs.findByIdAndUpdate(
      req.params.id,
      { $inc: { applicationsCount: 1 } },
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job opening not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Application count updated',
      data: { applicationsCount: job.applicationsCount }
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

// Get job filters data
router.get('/filters/data', async (req, res) => {
  try {
    const jobTypes = await WorkWithUs.distinct('jobType', { isActive: true });
    const departments = await WorkWithUs.distinct('department', { isActive: true });
    const locations = await WorkWithUs.distinct('location', { isActive: true });
    const experiences = await WorkWithUs.distinct('experience', { isActive: true });
    
    res.json({
      success: true,
      data: {
        jobTypes,
        departments,
        locations,
        experiences
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
