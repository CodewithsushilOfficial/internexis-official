const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./models/AdminModel');

const setAdminPasswordCorrectly = async () => {
  try {
    console.log('🔄 Setting admin password correctly...');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Find admin
    const admin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
    
    if (!admin) {
      console.log('❌ Admin not found');
      process.exit(1);
    }

    // Set the password as plain text - the pre-save middleware will hash it
    admin.password = 'admin@internexis';
    admin.passwordChangedAt = new Date();
    admin.loginAttempts = 0; // Reset any failed login attempts
    admin.lockUntil = undefined; // Remove any account locks
    admin.isActive = true; // Ensure account is active
    admin.emailVerified = true; // Ensure email is verified
    
    // Save - this will trigger the pre-save middleware to hash the password
    await admin.save();

    console.log('✅ Admin password updated successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: admin@internexis (now properly hashed)');
    console.log('👤 Name:', admin.name);
    console.log('🔓 Account Status: Active');
    console.log('📞 Phone:', admin.phone || 'Not set');

    console.log('\n🚀 You can now login with:');
    console.log('📧 Email: help.internexis@gmail.com');
    console.log('🔑 Password: admin@internexis');

  } catch (error) {
    console.error('❌ Error setting password:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await mongoose.connection.close();
    console.log('📤 MongoDB connection closed');
    process.exit(0);
  }
};

setAdminPasswordCorrectly();
