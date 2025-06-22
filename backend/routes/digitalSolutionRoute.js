const express = require('express');
const router = express.Router();
const DigitalSolution = require('../models/DigitalSolutionModel');

// Get all digital solutions (for frontend)
router.get('/', async (req, res) => {
  try {
    const { category, isActive = true } = req.query;
    
    let filter = { isActive: isActive === 'true' };
    if (category) {
      filter.category = category;
    }
    
    const solutions = await DigitalSolution.find(filter)
      .sort({ priority: -1, createdAt: -1 });
      
    res.json({
      success: true,
      count: solutions.length,
      data: solutions
    });
  } catch (error) {
    console.error('Error fetching digital solutions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching digital solutions',
      error: error.message
    });
  }
});

// Get single digital solution
router.get('/:id', async (req, res) => {
  try {
    const solution = await DigitalSolution.findById(req.params.id);
    
    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Digital solution not found'
      });
    }
    
    res.json({
      success: true,
      data: solution
    });
  } catch (error) {
    console.error('Error fetching digital solution:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching digital solution',
      error: error.message
    });
  }
});

// Admin Routes - Create new digital solution
router.post('/admin', async (req, res) => {
  try {
    const solution = new DigitalSolution(req.body);
    await solution.save();
    
    res.status(201).json({
      success: true,
      message: 'Digital solution created successfully',
      data: solution
    });
  } catch (error) {
    console.error('Error creating digital solution:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating digital solution',
      error: error.message
    });
  }
});

// Admin Routes - Update digital solution
router.put('/admin/:id', async (req, res) => {
  try {
    const solution = await DigitalSolution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Digital solution not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Digital solution updated successfully',
      data: solution
    });
  } catch (error) {
    console.error('Error updating digital solution:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating digital solution',
      error: error.message
    });
  }
});

// Admin Routes - Delete digital solution
router.delete('/admin/:id', async (req, res) => {
  try {
    const solution = await DigitalSolution.findByIdAndDelete(req.params.id);
    
    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Digital solution not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Digital solution deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting digital solution:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting digital solution',
      error: error.message
    });
  }
});

// Admin Routes - Get all digital solutions (including inactive)
router.get('/admin/all', async (req, res) => {
  try {
    const solutions = await DigitalSolution.find({})
      .sort({ priority: -1, createdAt: -1 });
      
    res.json({
      success: true,
      count: solutions.length,
      data: solutions
    });
  } catch (error) {
    console.error('Error fetching all digital solutions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching digital solutions',
      error: error.message
    });
  }
});

// Get categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await DigitalSolution.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

module.exports = router;
