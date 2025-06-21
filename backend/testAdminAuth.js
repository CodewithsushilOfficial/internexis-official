const axios = require('axios');

async function testAdminAuth() {
  try {
    console.log('Testing Admin Authentication Flow...');
    
    // 1. First, try to login as admin
    console.log('\n1. Testing admin login...');    const loginData = {
      email: 'help.internexis@gmail.com',
      password: 'admin@internexis'
    };
    
    const loginResponse = await axios.post('http://localhost:5000/api/admin/login', loginData);
    console.log('✅ Admin login successful');
    console.log('Login response:', loginResponse.data);
    
    const token = loginResponse.data.data.token;
    
    // 2. Use the token to access admin endpoints
    console.log('\n2. Testing authenticated admin requests...');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Test dashboard stats
    const statsResponse = await axios.get('http://localhost:5000/api/admin/dashboard/stats', { headers });
    console.log('✅ Dashboard stats with auth:', statsResponse.data.data);
    
    // Test career applications
    const careerResponse = await axios.get('http://localhost:5000/api/admin/applications/career', { headers });
    console.log('✅ Career applications with auth:', careerResponse.data.data.applications.length, 'applications');
    
    // Test recent applications
    const recentResponse = await axios.get('http://localhost:5000/api/admin/recent-applications', { headers });
    console.log('✅ Recent applications with auth:', recentResponse.data.data.length, 'recent applications');
    
  } catch (error) {
    console.error('❌ Admin auth test failed:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
  }
}

testAdminAuth();
