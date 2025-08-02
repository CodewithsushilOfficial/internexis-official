const express = require('express');
const router = express.Router();
const HackathonEvent = require('../models/HackathonEventModel');

// Get all active hackathons/events (for frontend)
router.get('/', async (req, res) => {
  try {
    const { eventType, status, mode, isFeatured } = req.query;
    
    let filter = { isActive: true };
    
    if (eventType) filter.eventType = eventType;
    if (status) filter.status = status;
    if (mode) filter.mode = mode;
    if (isFeatured) filter.isFeatured = isFeatured === 'true';
    
    const events = await HackathonEvent.find(filter)
      .sort({ isFeatured: -1, startDate: 1 });
      
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Error fetching hackathon events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hackathon events',
      error: error.message
    });
  }
});

// Get upcoming events
router.get('/upcoming', async (req, res) => {
  try {
    const currentDate = new Date();
    const events = await HackathonEvent.find({
      isActive: true,
      startDate: { $gte: currentDate }
    }).sort({ startDate: 1 }).limit(10);
    
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming events',
      error: error.message
    });
  }
});

// Get featured events
router.get('/featured', async (req, res) => {
  try {
    const events = await HackathonEvent.find({
      isActive: true,
      isFeatured: true
    }).sort({ startDate: 1 }).limit(5);
    
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Error fetching featured events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured events',
      error: error.message
    });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await HackathonEvent.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching event',
      error: error.message
    });
  }
});

// Admin Routes - Create new event
router.post('/admin', async (req, res) => {
  try {
    const event = new HackathonEvent(req.body);
    await event.save();
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating event',
      error: error.message
    });
  }
});

// Admin Routes - Update event
router.put('/admin/:id', async (req, res) => {
  try {
    const event = await HackathonEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating event',
      error: error.message
    });
  }
});

// Admin Routes - Delete event
router.delete('/admin/:id', async (req, res) => {
  try {
    const event = await HackathonEvent.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting event',
      error: error.message
    });
  }
});

// Admin Routes - Get all events (including inactive)
router.get('/admin/all', async (req, res) => {
  try {
    const events = await HackathonEvent.find({})
      .sort({ isFeatured: -1, startDate: -1 });
      
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Error fetching all events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: error.message
    });
  }
});

// Update event status (for automatic status management)
router.patch('/admin/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const event = await HackathonEvent.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Event status updated successfully',
      data: event
    });
  } catch (error) {
    console.error('Error updating event status:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating event status',
      error: error.message
    });
  }
});

module.exports = router;
