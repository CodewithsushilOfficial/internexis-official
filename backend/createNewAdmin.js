const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/AdminModel');

const createNewAdmin = async () => {
  try {
    console.log('🔄 Creating new admin with correct password...');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Delete existing admin
    await Admin.deleteMany({});
    console.log('🗑️ Cleared existing admins');

    // Create new admin with plain text password (will be hashed by pre-save hook)
    const newPassword = 'InternexisAdmin2024!';
    
    const adminData = {
      name: 'System Administrator',
      email: 'help.internexis@gmail.com',
      password: newPassword, // This will be hashed by the pre-save middleware
      role: 'super_admin',
      isActive: true,
      emailVerified: true,
      phone: '+91-9214267778',
      department: 'IT Administration'
    };

    const admin = new Admin(adminData);
    await admin.save();

    console.log('✅ New admin created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔑 Password:', newPassword);
    console.log('🔒 Role:', admin.role);
    
    // Test the password
    const adminWithPassword = await Admin.findById(admin._id).select('+password');
    const isPasswordValid = await bcrypt.compare(newPassword, adminWithPassword.password);
    console.log('🧪 Password test:', isPasswordValid ? '✅ VALID' : '❌ Invalid');

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('📤 MongoDB connection closed');
    process.exit(0);
  }
};

createNewAdmin();
