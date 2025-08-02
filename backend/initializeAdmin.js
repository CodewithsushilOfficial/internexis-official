const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/AdminModel');

const initializeAdmin = async () => {
  try {
    console.log('🔄 Initializing admin account...');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI or MONGO_URI environment variable is not defined');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Check if any admin already exists
    const existingAdmin = await Admin.findOne();
    
    if (existingAdmin) {
      console.log('ℹ️ Admin account already exists');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Name:', existingAdmin.name);
      console.log('🔒 Role:', existingAdmin.role);
      
      // Close connection and exit
      await mongoose.connection.close();
      console.log('🔒 Database connection closed');
      process.exit(0);
    }

    // Get admin details from environment variables or use defaults
    const adminData = {
      name: process.env.ADMIN_NAME || 'System Administrator',
      email: process.env.ADMIN_EMAIL || 'help.internexis@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'InternexisAdmin2024!',
      role: 'super_admin',
      isActive: true,
      emailVerified: true,
      phone: process.env.ADMIN_PHONE || '',
      department: 'IT Administration'
    };

    // Create admin account
    const admin = new Admin(adminData);
    await admin.save();

    console.log('✅ Admin account created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔒 Role:', admin.role);
    console.log('🆔 Admin ID:', admin._id);
    console.log('📱 Phone:', admin.phone || 'Not provided');
    console.log('🏢 Department:', admin.department);
    console.log('🔑 Permissions:', admin.permissions.length, 'permissions assigned');
    
    console.log('\n⚠️ IMPORTANT SECURITY NOTES:');
    console.log('1. Please change the default password after first login');
    console.log('2. Consider enabling two-factor authentication');
    console.log('3. Ensure strong password policy in production');
    console.log('4. Regularly rotate admin credentials');

    console.log('\n🚀 You can now login to the admin panel with:');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password:', adminData.password);

  } catch (error) {
    console.error('❌ Error initializing admin:', error.message);
    
    if (error.code === 11000) {
      console.log('ℹ️ Admin with this email already exists');
    } else if (error.name === 'ValidationError') {
      console.log('❌ Validation Error:');
      Object.values(error.errors).forEach(err => {
        console.log(`  - ${err.path}: ${err.message}`);
      });
    }
  } finally {
    await mongoose.connection.close();
    console.log('� MongoDB connection closed');
    process.exit(0);
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n⏹️ Process interrupted');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the initialization
if (require.main === module) {
  initializeAdmin();
}

module.exports = initializeAdmin;
