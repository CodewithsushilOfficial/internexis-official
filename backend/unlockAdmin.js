const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./models/AdminModel');

const unlockAdminAccount = async () => {
  try {
    console.log('🔄 Unlocking admin account...');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Find and unlock admin account
    const admin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
    
    if (!admin) {
      console.log('❌ Admin not found');
      process.exit(1);
    }

    console.log('👤 Admin found:', admin.email);
    console.log('🔒 Current login attempts:', admin.loginAttempts);
    console.log('⏰ Lock until:', admin.lockUntil);
    console.log('📊 Account locked:', admin.isAccountLocked());

    // Reset login attempts and remove lock
    admin.loginAttempts = 0;
    admin.lockUntil = undefined;
    admin.isActive = true;
    admin.emailVerified = true;
    
    // Ensure password is correct
    admin.password = 'admin@internexis'; // Will be hashed by pre-save middleware
    admin.passwordChangedAt = new Date();

    await admin.save();

    console.log('✅ Admin account unlocked successfully!');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔑 Password reset to: admin@internexis');
    console.log('🔓 Login attempts reset to: 0');
    console.log('✅ Account is now active and unlocked');

    console.log('\n🚀 You can now login with:');
    console.log('📧 Email: help.internexis@gmail.com');
    console.log('🔑 Password: admin@internexis');

  } catch (error) {
    console.error('❌ Error unlocking admin account:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await mongoose.connection.close();
    console.log('📤 MongoDB connection closed');
    process.exit(0);
  }
};

unlockAdminAccount();
