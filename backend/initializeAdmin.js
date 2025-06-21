const mongoose = require('mongoose');
const Admin = require('./models/AdminModel');
require('dotenv').config();

const initializeAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI or MONGO_URI environment variable is not defined');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
    
    if (existingAdmin) {
      console.log('ℹ️ Admin already exists with email: help.internexis@gmail.com');
      console.log('Admin details:', {
        email: existingAdmin.email,
        role: existingAdmin.role,
        isActive: existingAdmin.isActive,
        createdAt: existingAdmin.createdAt
      });
    } else {
      // Create new admin
      const newAdmin = new Admin({
        email: 'help.internexis@gmail.com',
        password: 'admin@internexis',
        role: 'super_admin',
        isActive: true
      });

      await newAdmin.save();
      console.log('✅ Admin created successfully');
      console.log('Admin details:', {
        email: newAdmin.email,
        role: newAdmin.role,
        isActive: newAdmin.isActive
      });
    }

    // Close connection
    await mongoose.connection.close();
    console.log('🔒 Database connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Run the initialization
initializeAdmin();
