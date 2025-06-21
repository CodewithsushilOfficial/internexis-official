require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/AdminModel');

async function getAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const admin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
    if (admin) {
      console.log('Admin found:');
      console.log('Email:', admin.email);
      console.log('Password:', admin.password);
      console.log('Role:', admin.role);
      console.log('Active:', admin.isActive);
    } else {
      console.log('Admin not found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

getAdminPassword();
