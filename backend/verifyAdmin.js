const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./models/AdminModel');

const verifyAdmin = async () => {
  try {
    console.log('🔍 Verifying admin account status...');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Count all admin accounts
    const adminCount = await Admin.countDocuments();
    console.log(`📊 Total admin accounts: ${adminCount}`);

    // Get the specific admin
    const admin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
    
    if (admin) {
      console.log('\n📋 Admin Account Status:');
      console.log('📧 Email:', admin.email);
      console.log('👤 Name:', admin.name);
      console.log('🔑 Role:', admin.role);
      console.log('🔓 Active:', admin.isActive);
      console.log('📞 Phone:', admin.phone);
      console.log('🛡️ Login Attempts:', admin.loginAttempts || 0);
      console.log('🔒 Lock Until:', admin.lockUntil || 'Not locked');
      console.log('🚪 Account Locked:', admin.isAccountLocked ? admin.isAccountLocked() : false);
      console.log('✉️ Email Verified:', admin.emailVerified);
      
      console.log('\n✅ ADMIN ACCOUNT IS READY TO USE!');
      console.log('📧 Email: help.internexis@gmail.com');
      console.log('🔑 Password: admin@internexis');
    } else {
      console.log('❌ Admin account not found!');
    }

  } catch (error) {
    console.error('❌ Error verifying admin:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('📤 MongoDB connection closed');
    process.exit(0);
  }
};

verifyAdmin();
