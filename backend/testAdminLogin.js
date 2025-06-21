const mongoose = require('mongoose');
const Admin = require('./models/AdminModel');
require('dotenv').config();

const testAdminLogin = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI or MONGO_URI environment variable is not defined');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Test login credentials
    const testEmail = 'help.internexis@gmail.com';
    const testPassword = 'admin@internexis';

    console.log('\n🔍 Testing Admin Login...');
    console.log(`Email: ${testEmail}`);
    console.log(`Password: ${testPassword}`);

    // Find admin by email
    const admin = await Admin.findOne({ email: testEmail.toLowerCase() });
    
    if (!admin) {
      console.log('❌ Admin not found! Please run "npm run init-admin" first.');
      return;
    }

    console.log('\n📋 Admin found in database:');
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);
    console.log(`Active: ${admin.isActive}`);
    console.log(`Created: ${admin.createdAt}`);

    // Test password validation
    const isPasswordValid = (testPassword === admin.password);
    
    if (isPasswordValid) {
      console.log('\n✅ Password validation: SUCCESS');
      console.log('🎉 Admin login credentials are working correctly!');
    } else {
      console.log('\n❌ Password validation: FAILED');
      console.log('⚠️ Password does not match what is stored in database');
    }

    // Close connection
    await mongoose.connection.close();
    console.log('\n🔒 Database connection closed');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
};

// Run the test
testAdminLogin();
