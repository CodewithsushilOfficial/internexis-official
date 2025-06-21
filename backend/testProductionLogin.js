// Test script to debug production admin login
const axios = require('axios');

async function testProductionLogin() {
    try {
        console.log('🧪 Testing production admin login API...');
        console.log('📡 Backend URL: https://internexis-official.onrender.com');
        
        const loginData = {
            email: 'help.internexis@gmail.com',
            password: 'admin@internexis'
        };
        
        console.log('📤 Sending login request with:', loginData);
        
        const response = await axios.post(
            'https://internexis-official.onrender.com/api/admin/login',
            loginData,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            }
        );
        
        console.log('✅ Login successful!');
        console.log('📥 Response:', response.data);
        
    } catch (error) {
        console.log('❌ Login failed');
        
        if (error.response) {
            console.log('🔍 Status:', error.response.status);
            console.log('🔍 Response:', error.response.data);
        } else if (error.request) {
            console.log('🔍 Network error - no response received');
            console.log('🔍 Request error:', error.message);
        } else {
            console.log('🔍 Error:', error.message);
        }
    }
}

// Also test if backend is accessible
async function testBackendHealth() {
    try {
        console.log('💓 Testing backend health...');
        const response = await axios.get('https://internexis-official.onrender.com/health');
        console.log('✅ Backend is healthy:', response.data);
    } catch (error) {
        console.log('❌ Backend health check failed:', error.message);
    }
}

async function runTests() {
    await testBackendHealth();
    console.log('');
    await testProductionLogin();
}

runTests();
