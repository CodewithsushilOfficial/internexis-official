const axios = require('axios');

async function testCareerAPI() {
  try {
    console.log('Testing Career API endpoints...');
    
    // Test direct career route
    console.log('\n1. Testing GET /api/career');
    const careerResponse = await axios.get('http://localhost:5000/api/career');
    console.log('✅ Career applications fetched successfully');
    console.log(`Found ${careerResponse.data.count} career applications`);
    
    // Test admin career route
    console.log('\n2. Testing GET /api/admin/applications/career');
    const adminCareerResponse = await axios.get('http://localhost:5000/api/admin/applications/career');
    console.log('✅ Admin career applications fetched successfully');
    console.log(`Found ${adminCareerResponse.data.data.applications.length} career applications via admin route`);
    
    // Test admin dashboard stats
    console.log('\n3. Testing GET /api/admin/dashboard/stats');
    const statsResponse = await axios.get('http://localhost:5000/api/admin/dashboard/stats');
    console.log('✅ Dashboard stats fetched successfully');
    console.log('Stats:', statsResponse.data.data);
    
  } catch (error) {
    console.error('❌ API test error:', error.response?.data || error.message);
  }
}

testCareerAPI();
