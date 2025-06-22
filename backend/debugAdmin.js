require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/AdminModel');

async function debugAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');
    
    const admin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
    
    if (admin) {
      console.log('Admin found:');
      console.log('Email:', admin.email);
      console.log('Password (first 20 chars):', admin.password.substring(0, 20) + '...');
      console.log('Password length:', admin.password.length);
      console.log('Starts with $2b (bcrypt):', admin.password.startsWith('$2b'));
      console.log('Role:', admin.role);
      console.log('IsActive:', admin.isActive);
      console.log('LoginAttempts:', admin.loginAttempts);
      console.log('IsLocked:', admin.isLocked);
    } else {
      console.log('No admin found with email: help.internexis@gmail.com');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
}

debugAdmin();
