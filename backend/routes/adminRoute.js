const express = require('express');
const Admin = require('../models/AdminModel');
const router = express.Router();

// Simple password validation (in production, use bcrypt for hashing)
const validatePassword = (inputPassword, storedPassword) => {
  return inputPassword === storedPassword;
};

// Generate a simple JWT-like token (in production, use proper JWT)
const generateToken = (adminId) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `admin_${adminId}_${timestamp}_${randomString}`;
};

// Admin login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (admin.isAccountLocked()) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to multiple failed login attempts. Try again later.'
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Contact system administrator.'
      });
    }

    // Validate password
    const isValidPassword = validatePassword(password, admin.password);
    
    if (!isValidPassword) {
      // Increment login attempts
      await admin.incrementLoginAttempts();
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();

    // Generate token
    const token = generateToken(admin._id);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        adminId: admin._id,
        email: admin.email,
        role: admin.role,
        token: token,
        lastLogin: admin.lastLogin
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Verify token endpoint
router.post('/verify-token', async (req, res) => {
  try {
    const { token, adminId } = req.body;

    if (!token || !adminId) {
      return res.status(400).json({
        success: false,
        message: 'Token and admin ID are required'
      });
    }

    // Simple token validation (check if it follows our format)
    const tokenPattern = new RegExp(`^admin_${adminId}_\\d+_[a-z0-9]+$`);
    
    if (!tokenPattern.test(token)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format'
      });
    }

    // Find admin
    const admin = await Admin.findById(adminId);
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin or account deactivated'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Token is valid',
      data: {
        adminId: admin._id,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get admin profile endpoint
router.get('/profile/:adminId', async (req, res) => {
  try {
    const { adminId } = req.params;
    
    const admin = await Admin.findById(adminId).select('-password -loginAttempts -lockUntil');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.status(200).json({
      success: true,
      data: admin
    });

  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Initialize admin endpoint (for first-time setup)
router.post('/initialize', async (req, res) => {
  try {
    // Check if any admin already exists
    const existingAdmin = await Admin.findOne();
    
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }

    // Create the default admin
    const defaultAdmin = new Admin({
      email: 'help.internexis@gmail.com',
      password: 'admin@internexis',
      role: 'super_admin',
      isActive: true
    });

    await defaultAdmin.save();

    res.status(201).json({
      success: true,
      message: 'Default admin created successfully',
      data: {
        email: defaultAdmin.email,
        role: defaultAdmin.role
      }
    });

  } catch (error) {
    console.error('Initialize admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
