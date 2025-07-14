const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./models/AdminModel');

const resetProductionAdmin = async () => {
  try {
    console.log('🔄 Resetting production admin account...');

    // Use production MongoDB URI
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to production MongoDB');

    // Find and reset admin
    const admin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
    
    if (!admin) {
      console.log('❌ Admin not found, creating new admin...');
      
      const newAdmin = new Admin({
        name: 'Sushil Kumar Kushwaha',
        email: 'help.internexis@gmail.com',
        password: 'admin@internexis', // Will be hashed by pre-save middleware
        role: 'super_admin',
        isActive: true,
        emailVerified: true,
        phone: '+91-9214267778',
        department: 'IT Administration'
      });
      
      await newAdmin.save();
      console.log('✅ New admin created successfully!');
    } else {
      console.log('👤 Admin found, resetting account...');
      
      // Reset account lock and login attempts
      admin.password = 'admin@internexis'; // Will be hashed by pre-save middleware
      admin.loginAttempts = 0;
      admin.lockUntil = undefined;
      admin.isActive = true;
      admin.emailVerified = true;
      admin.passwordChangedAt = new Date();
      
      await admin.save();
      console.log('✅ Admin account reset successfully!');
    }

    console.log('\n🚀 Production admin ready:');
    console.log('📧 Email: help.internexis@gmail.com');
    console.log('🔑 Password: admin@internexis');
    console.log('🌐 Backend: https://internexis-official.onrender.com');
    console.log('🌐 Frontend: https://internexis-technologies.in');

  } catch (error) {
    console.error('❌ Error resetting production admin:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('📤 MongoDB connection closed');
    process.exit(0);
  }
};

resetProductionAdmin();
