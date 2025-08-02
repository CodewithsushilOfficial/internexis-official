const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/AdminModel');

const setCustomAdminPassword = async () => {
  try {
    console.log('🔄 Setting custom admin password...');

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

    // Set the password to what user specified
    const newPassword = 'admin@internexis';
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update admin with proper fields
    admin.password = hashedPassword;
    admin.passwordChangedAt = new Date();
    admin.loginAttempts = 0; // Reset any failed login attempts
    admin.lockUntil = undefined; // Remove any account locks
    admin.isActive = true; // Ensure account is active
    admin.emailVerified = true; // Ensure email is verified
    
    await admin.save();

    console.log('✅ Admin password updated successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password:', newPassword);
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

setCustomAdminPassword();
