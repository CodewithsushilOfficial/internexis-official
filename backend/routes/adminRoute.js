const express = require('express');
const Admin = require('../models/AdminModel');
const Ambassador = require('../models/AmbassadorModel');
const Career = require('../models/CareerModel');
const Internship = require('../models/InternshipModel');
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

// Dashboard statistics endpoint
router.get('/dashboard/statistics', async (req, res) => {
  try {
    // Example aggregation - adjust as needed
    const [applicationsCount, internshipsCount, careersCount, ambassadorsCount] = await Promise.all([
      Internship.countDocuments(),
      Career.countDocuments(),
      Ambassador.countDocuments(),
      // Add more as needed
    ]);

    res.status(200).json({
      success: true,
      data: {
        applications: applicationsCount,
        internships: internshipsCount,
        careers: careersCount,
        ambassadors: ambassadorsCount
      }
    });

  } catch (error) {
    console.error('Dashboard statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Dashboard applications data endpoint
router.get('/dashboard/applications', async (req, res) => {
  try {
    const applications = await Internship.find().populate('adminId', 'email').sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: applications
    });

  } catch (error) {
    console.error('Dashboard applications data error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Dashboard Stats Endpoint
router.get('/dashboard/stats', async (req, res) => {
  try {
    // Get counts for each application type
    const [
      totalAmbassadors,
      totalCareers,
      totalInternships,
      pendingAmbassadors,
      pendingCareers,
      pendingInternships
    ] = await Promise.all([
      Ambassador.countDocuments(),
      Career.countDocuments(),
      Internship.countDocuments(),
      Ambassador.countDocuments({ status: 'pending' }),
      Career.countDocuments({ status: 'pending' }),
      Internship.countDocuments({ status: 'pending' })
    ]);

    const totalApplications = totalAmbassadors + totalCareers + totalInternships;
    const pendingApplications = pendingAmbassadors + pendingCareers + pendingInternships;

    // Get applications from this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [
      thisMonthAmbassadors,
      thisMonthCareers,
      thisMonthInternships
    ] = await Promise.all([
      Ambassador.countDocuments({ submittedAt: { $gte: startOfMonth } }),
      Career.countDocuments({ submittedAt: { $gte: startOfMonth } }),
      Internship.countDocuments({ submittedAt: { $gte: startOfMonth } })
    ]);

    const thisMonthApplications = thisMonthAmbassadors + thisMonthCareers + thisMonthInternships;

    res.status(200).json({
      success: true,
      data: {
        totalApplications,
        campusAmbassadors: totalAmbassadors,
        careerApplications: totalCareers,
        internshipApplications: totalInternships,
        pendingApplications,
        thisMonthApplications
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Recent Applications Endpoint
router.get('/dashboard/recent/:limit?', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 5;

    // Get recent applications from all three collections
    const [recentAmbassadors, recentCareers, recentInternships] = await Promise.all([
      Ambassador.find()
        .sort({ submittedAt: -1 })
        .limit(limit)
        .select('name email submittedAt status college')
        .lean(),
      Career.find()
        .sort({ submittedAt: -1 })
        .limit(limit)
        .select('name email submittedAt status position')
        .lean(),
      Internship.find()
        .sort({ submittedAt: -1 })
        .limit(limit)
        .select('name email submittedAt status domain college')
        .lean()
    ]);

    // Add type field to each application
    const ambassadorApps = recentAmbassadors.map(app => ({
      ...app,
      id: app._id,
      type: 'Campus Ambassador'
    }));

    const careerApps = recentCareers.map(app => ({
      ...app,
      id: app._id,
      type: 'Career'
    }));

    const internshipApps = recentInternships.map(app => ({
      ...app,
      id: app._id,
      type: 'Internship'
    }));

    // Combine all applications and sort by submission date
    const allApplications = [...ambassadorApps, ...careerApps, ...internshipApps]
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .slice(0, limit);

    res.status(200).json({
      success: true,
      data: allApplications
    });

  } catch (error) {
    console.error('Recent applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get All Applications by Type
router.get('/applications/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { page = 1, limit = 10, status, search } = req.query;

    let Model;
    let selectFields;

    switch (type.toLowerCase()) {
      case 'ambassador':
      case 'campus-ambassador':
        Model = Ambassador;
        selectFields = 'name email phone college whyYouWantToJoin submittedAt status';
        break;
      case 'career':
        Model = Career;
        selectFields = 'name email phone position resumeLink experience submittedAt status';
        break;
      case 'internship':
        Model = Internship;
        selectFields = 'name email phone domain college year duration submittedAt status';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid application type'
        });
    }

    // Build query
    let query = {};
    
    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get applications and total count
    const [applications, total] = await Promise.all([
      Model.find(query)
        .select(selectFields)
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Model.countDocuments(query)
    ]);

    // Add id field for frontend compatibility
    const applicationsWithId = applications.map(app => ({
      ...app,
      id: app._id
    }));

    res.status(200).json({
      success: true,
      data: {
        applications: applicationsWithId,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update Application Status
router.patch('/applications/:type/:id/status', async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    let Model;
    switch (type.toLowerCase()) {
      case 'ambassador':
      case 'campus-ambassador':
        Model = Ambassador;
        break;
      case 'career':
        Model = Career;
        break;
      case 'internship':
        Model = Internship;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid application type'
        });
    }

    const application = await Model.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });

  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete application endpoint
router.delete('/applications/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    
    console.log(`🗑️ Delete request received for ${type} application:`, id);

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('❌ Invalid ObjectId format:', id);
      return res.status(400).json({
        success: false,
        message: 'Invalid application ID format'
      });
    }

    let Model;
    let modelName;
    switch (type.toLowerCase()) {
      case 'ambassador':
      case 'campus-ambassador':
        Model = Ambassador;
        modelName = 'Campus Ambassador';
        break;
      case 'career':
        Model = Career;
        modelName = 'Career';
        break;
      case 'internship':
        Model = Internship;
        modelName = 'Internship';
        break;
      default:
        console.log('❌ Invalid application type:', type);
        return res.status(400).json({
          success: false,
          message: 'Invalid application type'
        });
    }

    // First find the application to get details for logging
    const application = await Model.findById(id);
    
    if (!application) {
      console.log('❌ Application not found:', id);
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Log the application details before deletion
    console.log(`📋 Application found for deletion:`, {
      id: application._id,
      name: application.name,
      email: application.email,
      type: modelName,
      submittedAt: application.submittedAt
    });

    // Delete the application
    await Model.findByIdAndDelete(id);

    console.log(`✅ ${modelName} application deleted successfully:`, {
      id: application._id,
      name: application.name,
      email: application.email,
      deletedAt: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: `${modelName} application deleted successfully`,
      data: {
        id: application._id,
        name: application.name,
        email: application.email,
        type: modelName
      }
    });

  } catch (error) {
    console.error('❌ Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Export endpoints
router.get('/export/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { format = 'xlsx' } = req.query;

    let Model, typeName;
    switch (type) {
      case 'ambassador':
        Model = Ambassador;
        typeName = 'Campus Ambassador';
        break;
      case 'career':
        Model = Career;
        typeName = 'Career';
        break;
      case 'internship':
        Model = Internship;
        typeName = 'Internship';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid export type'
        });
    }

    // Fetch all data
    const applications = await Model.find().sort({ submittedAt: -1 }).lean();

    if (format === 'xlsx') {
      const ExcelJS = require('exceljs');
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(`${typeName} Applications`);

      // Define columns based on type
      let columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Phone', key: 'phone', width: 15 },
        { header: 'Status', key: 'status', width: 12 },
        { header: 'Submitted At', key: 'submittedAt', width: 15 }
      ];

      // Add type-specific columns
      if (type === 'ambassador') {
        columns.push(
          { header: 'College', key: 'college', width: 30 },
          { header: 'Why Join', key: 'whyYouWantToJoin', width: 50 }
        );
      } else if (type === 'career') {
        columns.push(
          { header: 'Position', key: 'position', width: 20 },
          { header: 'Experience', key: 'experience', width: 15 },
          { header: 'Resume Link', key: 'resumeLink', width: 40 }
        );
      } else if (type === 'internship') {
        columns.push(
          { header: 'Domain', key: 'domain', width: 20 },
          { header: 'College', key: 'college', width: 30 },
          { header: 'Year', key: 'year', width: 12 },
          { header: 'Duration', key: 'duration', width: 12 }
        );
      }

      worksheet.columns = columns;

      // Style the header row
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4472C4' }
      };
      worksheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };

      // Add data rows
      applications.forEach(app => {
        const row = {
          name: app.name,
          email: app.email,
          phone: app.phone || '',
          status: app.status,
          submittedAt: new Date(app.submittedAt).toLocaleDateString('en-US')
        };

        if (type === 'ambassador') {
          row.college = app.college || '';
          row.whyYouWantToJoin = app.whyYouWantToJoin || '';
        } else if (type === 'career') {
          row.position = app.position || '';
          row.experience = app.experience || '';
          row.resumeLink = app.resumeLink || '';
        } else if (type === 'internship') {
          row.domain = app.domain || '';
          row.college = app.college || '';
          row.year = app.year || '';
          row.duration = app.duration || '';
        }

        worksheet.addRow(row);
      });

      // Auto-fit columns
      worksheet.columns.forEach(column => {
        if (column.eachCell) {
          let maxLength = 0;
          column.eachCell({ includeEmpty: true }, function (cell) {
            const columnLength = cell.value ? cell.value.toString().length : 10;
            if (columnLength > maxLength) {
              maxLength = columnLength;
            }
          });
          column.width = maxLength < 10 ? 10 : maxLength + 2;
        }
      });

      // Add borders to all cells
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      });

      // Set response headers
      const fileName = `${type}-applications-${new Date().toISOString().split('T')[0]}.xlsx`;
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

      // Write to response
      await workbook.xlsx.write(res);
      res.end();

    } else if (format === 'csv') {
      // CSV format
      let headers = ['Name', 'Email', 'Phone', 'Status', 'Submitted At'];
      
      if (type === 'ambassador') {
        headers.push('College', 'Why Join');
      } else if (type === 'career') {
        headers.push('Position', 'Experience', 'Resume Link');
      } else if (type === 'internship') {
        headers.push('Domain', 'College', 'Year', 'Duration');
      }

      const csvRows = [headers.join(',')];

      applications.forEach(app => {
        const row = [
          `"${app.name || ''}"`,
          `"${app.email || ''}"`,
          `"${app.phone || ''}"`,
          `"${app.status || ''}"`,
          `"${new Date(app.submittedAt).toLocaleDateString('en-US')}"`
        ];

        if (type === 'ambassador') {
          row.push(`"${app.college || ''}"`);
          row.push(`"${(app.whyYouWantToJoin || '').replace(/"/g, '""')}"`);
        } else if (type === 'career') {
          row.push(`"${app.position || ''}"`);
          row.push(`"${app.experience || ''}"`);
          row.push(`"${app.resumeLink || ''}"`);
        } else if (type === 'internship') {
          row.push(`"${app.domain || ''}"`);
          row.push(`"${app.college || ''}"`);
          row.push(`"${app.year || ''}"`);
          row.push(`"${app.duration || ''}"`);
        }

        csvRows.push(row.join(','));
      });

      const fileName = `${type}-applications-${new Date().toISOString().split('T')[0]}.csv`;
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.send(csvRows.join('\n'));

    } else {
      return res.status(400).json({
        success: false,
        message: 'Unsupported format. Use xlsx or csv.'
      });
    }

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export data'
    });
  }
});

// Export all data in a single Excel file with multiple sheets
router.get('/export-all', async (req, res) => {
  try {
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();

    // Fetch all data
    const [ambassadors, careers, internships] = await Promise.all([
      Ambassador.find().sort({ submittedAt: -1 }).lean(),
      Career.find().sort({ submittedAt: -1 }).lean(),
      Internship.find().sort({ submittedAt: -1 }).lean()
    ]);

    // Create Campus Ambassador sheet
    const ambassadorSheet = workbook.addWorksheet('Campus Ambassadors');
    ambassadorSheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'College', key: 'college', width: 30 },
      { header: 'Why Join', key: 'whyYouWantToJoin', width: 50 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Submitted At', key: 'submittedAt', width: 15 }
    ];

    // Style header and add data
    ambassadorSheet.getRow(1).font = { bold: true };
    ambassadorSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
    ambassadorSheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };

    ambassadors.forEach(app => {
      ambassadorSheet.addRow({
        name: app.name,
        email: app.email,
        phone: app.phone || '',
        college: app.college || '',
        whyYouWantToJoin: app.whyYouWantToJoin || '',
        status: app.status,
        submittedAt: new Date(app.submittedAt).toLocaleDateString('en-US')
      });
    });

    // Create Career sheet
    const careerSheet = workbook.addWorksheet('Career Applications');
    careerSheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Position', key: 'position', width: 20 },
      { header: 'Experience', key: 'experience', width: 15 },
      { header: 'Resume Link', key: 'resumeLink', width: 40 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Submitted At', key: 'submittedAt', width: 15 }
    ];

    careerSheet.getRow(1).font = { bold: true };
    careerSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF10B981' } };
    careerSheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };

    careers.forEach(app => {
      careerSheet.addRow({
        name: app.name,
        email: app.email,
        phone: app.phone || '',
        position: app.position || '',
        experience: app.experience || '',
        resumeLink: app.resumeLink || '',
        status: app.status,
        submittedAt: new Date(app.submittedAt).toLocaleDateString('en-US')
      });
    });

    // Create Internship sheet
    const internshipSheet = workbook.addWorksheet('Internship Applications');
    internshipSheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Domain', key: 'domain', width: 20 },
      { header: 'College', key: 'college', width: 30 },
      { header: 'Year', key: 'year', width: 12 },
      { header: 'Duration', key: 'duration', width: 12 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Submitted At', key: 'submittedAt', width: 15 }
    ];

    internshipSheet.getRow(1).font = { bold: true };
    internshipSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF8B5CF6' } };
    internshipSheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };

    internships.forEach(app => {
      internshipSheet.addRow({
        name: app.name,
        email: app.email,
        phone: app.phone || '',
        domain: app.domain || '',
        college: app.college || '',
        year: app.year || '',
        duration: app.duration || '',
        status: app.status,
        submittedAt: new Date(app.submittedAt).toLocaleDateString('en-US')
      });
    });

    // Add borders to all sheets
    [ambassadorSheet, careerSheet, internshipSheet].forEach(sheet => {
      sheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      });
    });

    // Set response headers
    const fileName = `internexis-all-applications-${new Date().toISOString().split('T')[0]}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // Write to response
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Export all error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export data'
    });
  }
});

module.exports = router;
