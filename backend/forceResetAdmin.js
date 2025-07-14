const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./models/AdminModel');

const forceResetAdmin = async () => {
  try {
    console.log('🔄 Force resetting admin account...');

    // Use production MongoDB URI
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to production MongoDB');

    // Find admin and forcefully reset everything
    const result = await Admin.updateOne(
      { email: 'help.internexis@gmail.com' },
      {
        $set: {
          password: '$2b$12$mK9p3XvQR1BqGhHd6KjNEehP4KjNEeP4KjNEeP4KjNEeP4KjNEeP.', // Temporary hash
          loginAttempts: 0,
          isActive: true,
          emailVerified: true,
          passwordChangedAt: new Date()
        },
        $unset: {
          lockUntil: 1
        }
      }
    );

    console.log('Update result:', result);

    // Now set the correct password using the model (to trigger pre-save hash)
    const admin = await Admin.findOne({ email: 'help.internexis@gmail.com' });
    if (admin) {
      admin.password = 'admin@internexis';
      admin.loginAttempts = 0;
      admin.lockUntil = undefined;
      admin.isActive = true;
      admin.emailVerified = true;
      admin.passwordChangedAt = new Date();
      
      await admin.save();
      console.log('✅ Admin password set correctly with model pre-save middleware');
    }

    console.log('\n🚀 Production admin ready:');
    console.log('📧 Email: help.internexis@gmail.com');
    console.log('🔑 Password: admin@internexis');
    console.log('🔓 Account Status: Unlocked and Active');

  } catch (error) {
    console.error('❌ Error force resetting admin:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.connection.close();
    console.log('📤 MongoDB connection closed');
    process.exit(0);
  }
};

forceResetAdmin();
