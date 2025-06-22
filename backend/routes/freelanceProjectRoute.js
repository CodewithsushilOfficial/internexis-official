const express = require('express');
const router = express.Router();
const FreelanceProject = require('../models/FreelanceProjectModel');

// Get all projects for showcase (for frontend)
router.get('/', async (req, res) => {
  try {
    const { category, status, isShowcase, isFeatured } = req.query;
    
    let filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (isShowcase !== undefined) filter.isShowcase = isShowcase === 'true';
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
    
    const projects = await FreelanceProject.find(filter)
      .sort({ isFeatured: -1, endDate: -1, createdAt: -1 });
      
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching freelance projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching freelance projects',
      error: error.message
    });
  }
});

// Get portfolio/showcase projects
router.get('/portfolio', async (req, res) => {
  try {
    const projects = await FreelanceProject.find({
      isShowcase: true,
      status: { $in: ['Completed', 'In Progress'] }
    }).sort({ isFeatured: -1, endDate: -1 });
    
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolio projects',
      error: error.message
    });
  }
});

// Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await FreelanceProject.find({
      isFeatured: true,
      isShowcase: true
    }).sort({ endDate: -1 }).limit(6);
    
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured projects',
      error: error.message
    });
  }
});

// Get completed projects
router.get('/completed', async (req, res) => {
  try {
    const projects = await FreelanceProject.find({
      status: 'Completed',
      isShowcase: true
    }).sort({ endDate: -1 });
    
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching completed projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching completed projects',
      error: error.message
    });
  }
});

// Get ongoing projects
router.get('/ongoing', async (req, res) => {
  try {
    const projects = await FreelanceProject.find({
      status: { $in: ['In Progress', 'Under Review'] }
    }).sort({ startDate: -1 });
    
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching ongoing projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching ongoing projects',
      error: error.message
    });
  }
});

// Get projects by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const projects = await FreelanceProject.find({
      category: category,
      isShowcase: true
    }).sort({ endDate: -1 });
    
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects by category',
      error: error.message
    });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await FreelanceProject.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
});

// Admin Routes - Create new project
router.post('/admin', async (req, res) => {
  try {
    const project = new FreelanceProject(req.body);
    await project.save();
    
    res.status(201).json({
      success: true,
      message: 'Freelance project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

// Admin Routes - Update project
router.put('/admin/:id', async (req, res) => {
  try {
    const project = await FreelanceProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
});

// Admin Routes - Delete project
router.delete('/admin/:id', async (req, res) => {
  try {
    const project = await FreelanceProject.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
});

// Admin Routes - Get all projects
router.get('/admin/all', async (req, res) => {
  try {
    const projects = await FreelanceProject.find({})
      .sort({ isFeatured: -1, createdAt: -1 });
      
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching all projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// Update project status
router.patch('/admin/:id/status', async (req, res) => {
  try {
    const { status, completionPercentage } = req.body;
    
    const updateData = { status };
    if (completionPercentage !== undefined) {
      updateData.completionPercentage = completionPercentage;
    }
    
    if (status === 'Completed' && !req.body.endDate) {
      updateData.endDate = new Date();
      updateData.completionPercentage = 100;
    }
    
    const project = await FreelanceProject.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Project status updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating project status',
      error: error.message
    });
  }
});

// Get project statistics
router.get('/admin/stats', async (req, res) => {
  try {
    const stats = await FreelanceProject.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalBudget: { $sum: '$budget.amount' }
        }
      }
    ]);
    
    const categoryStats = await FreelanceProject.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        statusStats: stats,
        categoryStats: categoryStats
      }
    });
  } catch (error) {
    console.error('Error fetching project stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project stats',
      error: error.message
    });
  }
});

module.exports = router;
