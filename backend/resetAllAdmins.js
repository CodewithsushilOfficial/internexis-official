const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./models/AdminModel');

const resetAllAdmins = async () => {
  try {
    console.log('🔄 Resetting all admin accounts...');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Delete ALL existing admin accounts
    const deleteResult = await Admin.deleteMany({});
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing admin accounts`);

    // Create a fresh admin account
    const newAdmin = new Admin({
      name: 'System Administrator',
      email: 'help.internexis@gmail.com',
      password: 'admin@internexis', // Will be hashed by pre-save middleware
      role: 'super_admin',
      isActive: true,
      emailVerified: true,
      phone: '+91-9214267778',
      department: 'IT Administration',
      loginAttempts: 0,
      lockUntil: undefined
    });

    await newAdmin.save();
    console.log('✅ New clean admin account created successfully!');

    // Verify the admin was created
    const verifyAdmin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
    if (verifyAdmin) {
      console.log('\n📋 Admin Account Details:');
      console.log('📧 Email:', verifyAdmin.email);
      console.log('👤 Name:', verifyAdmin.name);
      console.log('🔑 Role:', verifyAdmin.role);
      console.log('🔓 Active:', verifyAdmin.isActive);
      console.log('📞 Phone:', verifyAdmin.phone);
      console.log('🛡️ Login Attempts:', verifyAdmin.loginAttempts || 0);
      console.log('🔒 Account Locked:', verifyAdmin.isAccountLocked ? verifyAdmin.isAccountLocked() : false);
    }

    console.log('\n🚀 Admin credentials:');
    console.log('📧 Email: help.internexis@gmail.com');
    console.log('🔑 Password: admin@internexis');

  } catch (error) {
    console.error('❌ Error resetting admin accounts:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await mongoose.connection.close();
    console.log('📤 MongoDB connection closed');
    process.exit(0);
  }
};

resetAllAdmins();
