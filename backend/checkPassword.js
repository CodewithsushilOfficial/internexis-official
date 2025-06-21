const mongoose = require('mongoose');
const Admin = require('./models/AdminModel');

// MongoDB connection string for production
const MONGODB_URI = "mongodb+srv://internexis:dBpass%40123@cluster0.mongodb.net/internexis?retryWrites=true&w=majority&appName=Cluster0";

async function checkPassword() {
    try {
        console.log('🔌 Connecting to production MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to production MongoDB');

        // Find admin user
        const admin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
        
        if (!admin) {
            console.log('❌ No admin user found');
            return;
        }

        console.log('👤 Admin user found:');
        console.log(`   Email: ${admin.email}`);
        console.log(`   Stored Password: "${admin.password}"`);
        console.log(`   IsActive: ${admin.isActive}`);
        console.log(`   LoginAttempts: ${admin.loginAttempts}`);
        console.log(`   IsLocked: ${admin.isLocked}`);
        console.log(`   LockUntil: ${admin.lockUntil}`);

        // Test the validation function
        const testPasswords = ['admin@internexis', 'admin123', 'internexis123'];
        for (const pwd of testPasswords) {
            const matches = pwd === admin.password;
            console.log(`🔐 "${pwd}" matches stored password: ${matches ? '✅ YES' : '❌ NO'}`);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('📡 Database connection closed');
    }
}

checkPassword();
