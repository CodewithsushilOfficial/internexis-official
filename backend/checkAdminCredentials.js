const mongoose = require('mongoose');
const Admin = require('./models/AdminModel');
require('dotenv').config();

const checkAdminCredentials = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Find the admin user
    const admin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
    
    if (admin) {
      console.log('📋 Admin found:');
      console.log('Email:', admin.email);
      console.log('Password (stored):', admin.password);
      console.log('Password length:', admin.password.length);
      console.log('Role:', admin.role);
      console.log('Active:', admin.isActive);
      console.log('Login attempts:', admin.loginAttempts);
      console.log('Is locked:', admin.isLocked);
      console.log('Lock until:', admin.lockUntil);
      
      // Test password comparison
      const testPassword = 'admin@internexis';
      console.log('\n🔍 Testing password:');
      console.log('Test password:', testPassword);
      console.log('Test password length:', testPassword.length);
      console.log('Passwords match:', admin.password === testPassword);
      
      // Check if account is locked
      const isLocked = admin.isAccountLocked();
      console.log('Account locked:', isLocked);
      
    } else {
      console.log('❌ Admin not found');
    }
    
    await mongoose.connection.close();
    console.log('🔒 Database connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkAdminCredentials();
