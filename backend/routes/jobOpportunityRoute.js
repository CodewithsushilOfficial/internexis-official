const express = require('express');
const router = express.Router();
const JobOpportunity = require('../models/JobOpportunityModel');

// Get all active job opportunities (for frontend)
router.get('/jobs', async (req, res) => {
  try {
    const { category, jobType, experience, location, isRemote, department } = req.query;
    
    let filter = { 
      isActive: true,
      applicationDeadline: { $gte: new Date() }
    };
    
    if (category) filter.category = category;
    if (jobType) filter.jobType = jobType;
    if (experience) filter.experience = experience;
    if (department) filter.department = department;
    if (location && location !== 'All') filter.location = new RegExp(location, 'i');
    if (isRemote) filter.isRemote = isRemote === 'true';
    
    const jobs = await JobOpportunity.find(filter)
      .sort({ isFeatured: -1, isUrgent: -1, createdAt: -1 });
      
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching job opportunities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job opportunities',
      error: error.message
    });
  }
});

// Get featured job opportunities
router.get('/jobs/featured', async (req, res) => {
  try {
    const jobs = await JobOpportunity.find({
      isActive: true,
      isFeatured: true,
      applicationDeadline: { $gte: new Date() }
    }).sort({ applicationDeadline: 1 }).limit(6);
    
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching featured jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured jobs',
      error: error.message
    });
  }
});

// Get urgent job opportunities
router.get('/jobs/urgent', async (req, res) => {
  try {
    const jobs = await JobOpportunity.find({
      isActive: true,
      isUrgent: true,
      applicationDeadline: { $gte: new Date() }
    }).sort({ applicationDeadline: 1 }).limit(5);
    
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

// Get latest job opportunities
router.get('/jobs/latest', async (req, res) => {
  try {
    const jobs = await JobOpportunity.find({
      isActive: true,
      applicationDeadline: { $gte: new Date() }
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

// Get remote job opportunities
router.get('/jobs/remote', async (req, res) => {
  try {
    const jobs = await JobOpportunity.find({
      isActive: true,
      isRemote: true,
      applicationDeadline: { $gte: new Date() }
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching remote jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching remote jobs',
      error: error.message
    });
  }
});

// Get single job opportunity
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await JobOpportunity.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job opportunity not found'
      });
    }
    
    // Increment views
    await JobOpportunity.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    
    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error.message
    });
  }
});

// Increment application count for job
router.patch('/jobs/:id/apply', async (req, res) => {
  try {
    const job = await JobOpportunity.findByIdAndUpdate(
      req.params.id,
      { $inc: { applicationsCount: 1 } },
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
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

// Admin Routes - Create new job opportunity
router.post('/admin/jobs', async (req, res) => {
  try {
    const job = new JobOpportunity(req.body);
    await job.save();
    
    res.status(201).json({
      success: true,
      message: 'Job opportunity created successfully',
      data: job
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating job',
      error: error.message
    });
  }
});

// Admin Routes - Update job opportunity
router.put('/admin/jobs/:id', async (req, res) => {
  try {
    const job = await JobOpportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating job',
      error: error.message
    });
  }
});

// Admin Routes - Delete job opportunity
router.delete('/admin/jobs/:id', async (req, res) => {
  try {
    const job = await JobOpportunity.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting job',
      error: error.message
    });
  }
});

// Admin Routes - Get all job opportunities (including inactive)
router.get('/admin/jobs/all', async (req, res) => {
  try {
    const jobs = await JobOpportunity.find({})
      .sort({ isFeatured: -1, createdAt: -1 });
      
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message
    });
  }
});

// Get job filters data
router.get('/jobs/filters/data', async (req, res) => {
  try {
    const categories = await JobOpportunity.distinct('category', { isActive: true });
    const jobTypes = await JobOpportunity.distinct('jobType', { isActive: true });
    const experiences = await JobOpportunity.distinct('experience', { isActive: true });
    const departments = await JobOpportunity.distinct('department', { isActive: true });
    const locations = await JobOpportunity.distinct('location', { isActive: true });
    
    res.json({
      success: true,
      data: {
        categories,
        jobTypes,
        experiences,
        departments,
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

// Get job statistics
router.get('/admin/jobs/stats', async (req, res) => {
  try {
    const stats = await JobOpportunity.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalApplications: { $sum: '$applicationsCount' },
          totalViews: { $sum: '$views' }
        }
      }
    ]);
    
    const jobTypeStats = await JobOpportunity.aggregate([
      {
        $group: {
          _id: '$jobType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        categoryStats: stats,
        jobTypeStats: jobTypeStats
      }
    });
  } catch (error) {
    console.error('Error fetching job stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job stats',
      error: error.message
    });
  }
});

module.exports = router;
