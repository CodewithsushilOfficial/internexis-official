const express = require('express');
const router = express.Router();
const CareerGuidance = require('../models/CareerGuidanceModel');

// Get all published career guidance content (for frontend)
router.get('/', async (req, res) => {
  try {
    const { category, targetAudience, contentType, difficulty } = req.query;
    
    let filter = { isPublished: true };
    
    if (category) filter.category = category;
    if (targetAudience) filter.targetAudience = targetAudience;
    if (contentType) filter.contentType = contentType;
    if (difficulty) filter.difficulty = difficulty;
    
    const content = await CareerGuidance.find(filter)
      .sort({ isFeatured: -1, publishedDate: -1 });
      
    res.json({
      success: true,
      count: content.length,
      data: content
    });
  } catch (error) {
    console.error('Error fetching career guidance:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching career guidance',
      error: error.message
    });
  }
});

// Get featured content
router.get('/featured', async (req, res) => {
  try {
    const content = await CareerGuidance.find({
      isPublished: true,
      isFeatured: true
    }).sort({ publishedDate: -1 }).limit(6);
    
    res.json({
      success: true,
      count: content.length,
      data: content
    });
  } catch (error) {
    console.error('Error fetching featured content:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured content',
      error: error.message
    });
  }
});

// Get latest content
router.get('/latest', async (req, res) => {
  try {
    const content = await CareerGuidance.find({
      isPublished: true
    }).sort({ publishedDate: -1 }).limit(10);
    
    res.json({
      success: true,
      count: content.length,
      data: content
    });
  } catch (error) {
    console.error('Error fetching latest content:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching latest content',
      error: error.message
    });
  }
});

// Get popular content
router.get('/popular', async (req, res) => {
  try {
    const content = await CareerGuidance.find({
      isPublished: true
    }).sort({ views: -1, likes: -1 }).limit(10);
    
    res.json({
      success: true,
      count: content.length,
      data: content
    });
  } catch (error) {
    console.error('Error fetching popular content:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching popular content',
      error: error.message
    });
  }
});

// Get content by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const content = await CareerGuidance.find({
      isPublished: true,
      category: category
    }).sort({ publishedDate: -1 });
    
    res.json({
      success: true,
      count: content.length,
      data: content
    });
  } catch (error) {
    console.error('Error fetching content by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching content by category',
      error: error.message
    });
  }
});

// Get single content
router.get('/:id', async (req, res) => {
  try {
    const content = await CareerGuidance.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    // Increment views
    await CareerGuidance.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching content',
      error: error.message
    });
  }
});

// Like content
router.patch('/:id/like', async (req, res) => {
  try {
    const content = await CareerGuidance.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content liked',
      data: { likes: content.likes }
    });
  } catch (error) {
    console.error('Error liking content:', error);
    res.status(500).json({
      success: false,
      message: 'Error liking content',
      error: error.message
    });
  }
});

// Admin Routes - Create new content
router.post('/admin', async (req, res) => {
  try {
    const content = new CareerGuidance(req.body);
    await content.save();
    
    res.status(201).json({
      success: true,
      message: 'Career guidance content created successfully',
      data: content
    });
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating content',
      error: error.message
    });
  }
});

// Admin Routes - Update content
router.put('/admin/:id', async (req, res) => {
  try {
    const content = await CareerGuidance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content updated successfully',
      data: content
    });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating content',
      error: error.message
    });
  }
});

// Admin Routes - Delete content
router.delete('/admin/:id', async (req, res) => {
  try {
    const content = await CareerGuidance.findByIdAndDelete(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting content',
      error: error.message
    });
  }
});

// Admin Routes - Get all content (including unpublished)
router.get('/admin/all', async (req, res) => {
  try {
    const content = await CareerGuidance.find({})
      .sort({ isFeatured: -1, publishedDate: -1 });
      
    res.json({
      success: true,
      count: content.length,
      data: content
    });
  } catch (error) {
    console.error('Error fetching all content:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching content',
      error: error.message
    });
  }
});

// Get filter options
router.get('/filters/options', async (req, res) => {
  try {
    const categories = await CareerGuidance.distinct('category', { isPublished: true });
    const targetAudiences = await CareerGuidance.distinct('targetAudience', { isPublished: true });
    const contentTypes = await CareerGuidance.distinct('contentType', { isPublished: true });
    const difficulties = await CareerGuidance.distinct('difficulty', { isPublished: true });
    
    res.json({
      success: true,
      data: {
        categories,
        targetAudiences,
        contentTypes,
        difficulties
      }
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: error.message
    });
  }
});

module.exports = router;
