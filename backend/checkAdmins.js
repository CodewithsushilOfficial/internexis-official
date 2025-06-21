require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/AdminModel');

async function checkAdmins() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');
    
    const admins = await Admin.find();
    console.log('Total admins in database:', admins.length);
    
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. Email: ${admin.email}, Role: ${admin.role}, Active: ${admin.isActive}`);
    });
    
    if (admins.length === 0) {
      console.log('\nNo admin accounts found. Creating default admin...');
      const defaultAdmin = new Admin({
        email: 'help.internexis@gmail.com',
        password: 'Internexis@2025',
        role: 'super_admin',
        isActive: true
      });
      
      await defaultAdmin.save();
      console.log('✅ Default admin created successfully');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

checkAdmins();
