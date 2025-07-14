const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/AdminModel');

const resetAdminPassword = async () => {
  try {
    console.log('🔄 Resetting admin password...');

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

    // Set new password
    const newPassword = 'InternexisAdmin2024!';
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update admin
    admin.password = hashedPassword;
    admin.name = admin.name || 'System Administrator';
    admin.passwordChangedAt = new Date();
    await admin.save();

    console.log('✅ Admin password reset successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 New Password:', newPassword);
    console.log('👤 Name:', admin.name);

  } catch (error) {
    console.error('❌ Error resetting password:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('📤 MongoDB connection closed');
    process.exit(0);
  }
};

resetAdminPassword();
