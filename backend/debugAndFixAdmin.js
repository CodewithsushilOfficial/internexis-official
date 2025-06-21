const mongoose = require('mongoose');
const Admin = require('./models/AdminModel');

// Load environment variables
require('dotenv').config();

// Production MongoDB URI
const PRODUCTION_MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb+srv://internexis:dBpass%40123@cluster0.mongodb.net/internexis?retryWrites=true&w=majority&appName=Cluster0";

async function debugAndFixAdmin() {
    try {
        console.log('🔌 Connecting to production MongoDB...');
        await mongoose.connect(PRODUCTION_MONGO_URI);
        console.log('✅ Connected to production MongoDB');

        // Check if admin exists
        console.log('🔍 Searching for admin user...');
        const existingAdmin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
        
        if (existingAdmin) {
            console.log('👤 Admin user found:');
            console.log(`   Email: ${existingAdmin.email}`);
            console.log(`   Password: "${existingAdmin.password}"`);
            console.log(`   Role: ${existingAdmin.role}`);
            console.log(`   IsActive: ${existingAdmin.isActive}`);
            console.log(`   LoginAttempts: ${existingAdmin.loginAttempts}`);
            console.log(`   IsLocked: ${existingAdmin.isLocked}`);
            console.log(`   LockUntil: ${existingAdmin.lockUntil}`);
            console.log(`   Created: ${existingAdmin.createdAt}`);

            // Test password match
            const testPassword = 'admin@internexis';
            const matches = testPassword === existingAdmin.password;
            console.log(`🔐 Password "${testPassword}" matches: ${matches ? '✅ YES' : '❌ NO'}`);

            if (!matches) {
                console.log('🔧 Updating admin password...');
                existingAdmin.password = 'admin@internexis';
                existingAdmin.isActive = true;
                existingAdmin.loginAttempts = 0;
                existingAdmin.isLocked = false;
                existingAdmin.lockUntil = undefined;
                await existingAdmin.save();
                console.log('✅ Admin password updated to: admin@internexis');
            }

            if (existingAdmin.isLocked) {
                console.log('🔓 Unlocking admin account...');
                existingAdmin.isLocked = false;
                existingAdmin.lockUntil = undefined;
                existingAdmin.loginAttempts = 0;
                await existingAdmin.save();
                console.log('✅ Admin account unlocked');
            }

        } else {
            console.log('❌ No admin user found. Creating new admin...');
            const newAdmin = new Admin({
                email: 'help.internexis@gmail.com',
                password: 'admin@internexis',
                role: 'admin',
                isActive: true
            });
            await newAdmin.save();
            console.log('✅ Admin user created successfully');
        }

        // Verify final state
        const finalAdmin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
        console.log('\n🎯 Final admin state:');
        console.log(`   Email: ${finalAdmin.email}`);
        console.log(`   Password: "${finalAdmin.password}"`);
        console.log(`   IsActive: ${finalAdmin.isActive}`);
        console.log(`   IsLocked: ${finalAdmin.isLocked}`);
        console.log(`   LoginAttempts: ${finalAdmin.loginAttempts}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('📡 Database connection closed');
    }
}

debugAndFixAdmin();
