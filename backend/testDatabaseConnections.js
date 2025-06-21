const mongoose = require('mongoose');
const Admin = require('./models/AdminModel');
const Ambassador = require('./models/AmbassadorModel');

// Try different possible connection strings
const possibleURIs = [
    "mongodb+srv://internexis:dBpass%40123@cluster0.mongodb.net/internexis?retryWrites=true&w=majority&appName=Cluster0",
    "mongodb+srv://internexis:dBpass%40123@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    "mongodb+srv://internexis:dBpass%40123@cluster0.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
];

async function testDatabase(uri, name) {
    try {
        console.log(`\n🔍 Testing ${name}...`);
        console.log(`📡 URI: ${uri}`);
        
        await mongoose.connect(uri);
        console.log('✅ Connected successfully');
        
        const dbName = mongoose.connection.db.databaseName;
        console.log(`📊 Database name: ${dbName}`);
        
        // Check collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📁 Collections:', collections.map(c => c.name));
        
        // Count documents
        const adminCount = await Admin.countDocuments();
        const ambassadorCount = await Ambassador.countDocuments();
        
        console.log(`👤 Admin count: ${adminCount}`);
        console.log(`🎯 Ambassador count: ${ambassadorCount}`);
        
        if (adminCount > 0) {
            const admin = await Admin.findOne();
            console.log(`👤 Admin email: ${admin.email}`);
            console.log(`🔐 Admin password: ${admin.password}`);
        }
        
        await mongoose.disconnect();
        return { success: true, dbName, adminCount, ambassadorCount };
        
    } catch (error) {
        console.log(`❌ Failed: ${error.message}`);
        try {
            await mongoose.disconnect();
        } catch (e) {}
        return { success: false, error: error.message };
    }
}

async function runDatabaseTests() {
    console.log('🔬 Testing different database connections...\n');
    
    for (let i = 0; i < possibleURIs.length; i++) {
        const result = await testDatabase(possibleURIs[i], `Database ${i + 1}`);
        if (result.success && result.adminCount > 0) {
            console.log(`\n🎯 Found admin data in: ${result.dbName}`);
            console.log(`📡 Working URI: ${possibleURIs[i]}`);
            break;
        }
    }
}

runDatabaseTests();
