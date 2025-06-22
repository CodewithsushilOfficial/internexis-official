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
        // Use environment variable or default for checking
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@internexis.com';
        const admin = await Admin.findOne({ email: adminEmail });
        
        if (!admin) {
            console.log('❌ No admin user found');
            return;
        }

        console.log('👤 Admin user found:');
        console.log(`   Email: ${admin.email}`);
        console.log(`   Stored Password: "${admin.password}"`);
        console.log(`   IsActive: ${admin.isActive}`);        console.log(`   LoginAttempts: ${admin.loginAttempts}`);
        console.log(`   IsLocked: ${admin.isLocked}`);
        console.log(`   LockUntil: ${admin.lockUntil}`);

        // Note: For security reasons, password testing is disabled in this script
        console.log('🔐 Password verification available through proper login endpoints only');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('📡 Database connection closed');
    }
}

checkPassword();
