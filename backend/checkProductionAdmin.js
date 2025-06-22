const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/AdminModel');

// MongoDB connection string for production
const MONGODB_URI = "mongodb+srv://internexis:dBpass%40123@cluster0.mongodb.net/internexis?retryWrites=true&w=majority&appName=Cluster0";

async function checkProductionAdmin() {
    try {
        console.log('🔌 Connecting to production MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to production MongoDB');

        // Find admin user
        // Use environment variable or default for checking
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@internexis.com';
        const admin = await Admin.findOne({ email: adminEmail });
        
        if (!admin) {
            console.log(`❌ No admin user found with email ${adminEmail}`);
            return;
        }

        console.log('👤 Admin user found:');
        console.log(`   Email: ${admin.email}`);
        console.log(`   Created: ${admin.createdAt}`);        console.log(`   Password Hash: ${admin.password.substring(0, 20)}...`);

        // Note: For security reasons, password testing is disabled in production scripts
        console.log('🔐 Password verification available through proper login endpoints only');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('📡 Database connection closed');
    }
}

checkProductionAdmin();
