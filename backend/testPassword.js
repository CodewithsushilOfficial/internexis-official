const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/AdminModel');

const testPassword = async () => {
  try {
    console.log('🔄 Testing password verification...');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Find admin
    const admin = await Admin.findOne({ email: 'help.internexis@gmail.com' }).select('+password');
    
    if (!admin) {
      console.log('❌ Admin not found');
      process.exit(1);
    }

    const testPasswords = [
      'InternexisAdmin2024!',
      'admin@internexis',
      
    ];

    for (const password of testPasswords) {
      const isValid = await bcrypt.compare(password, admin.password);
      console.log(`Password "${password}": ${isValid ? '✅ VALID' : '❌ Invalid'}`);
    }

    console.log('\nAdmin password hash:', admin.password.substring(0, 20) + '...');

  } catch (error) {
    console.error('❌ Error testing password:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('📤 MongoDB connection closed');
    process.exit(0);
  }
};

testPassword();
