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
        const admin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
        
        if (!admin) {
            console.log('❌ No admin user found with email help.internexis@gmail.com');
            return;
        }

        console.log('👤 Admin user found:');
        console.log(`   Email: ${admin.email}`);
        console.log(`   Created: ${admin.createdAt}`);
        console.log(`   Password Hash: ${admin.password.substring(0, 20)}...`);

        // Test password verification
        const testPassword = 'admin@internexis';
        const isPasswordValid = await bcrypt.compare(testPassword, admin.password);
        
        console.log(`🔐 Password verification for "${testPassword}": ${isPasswordValid ? '✅ Valid' : '❌ Invalid'}`);

        // Try some other possible passwords
        const otherPasswords = ['admin123', 'internexis123', 'admin@123'];
        for (const pwd of otherPasswords) {
            const isValid = await bcrypt.compare(pwd, admin.password);
            if (isValid) {
                console.log(`🔐 Alternative password "${pwd}": ✅ Valid`);
            }
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('📡 Database connection closed');
    }
}

checkProductionAdmin();
