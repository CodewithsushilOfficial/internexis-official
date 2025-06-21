// Test script for admin dashboard APIs
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';

// Test data
const adminCredentials = {
  email: 'help.internexis@gmail.com',
  password: 'admin@internexis'
};

async function testAdminAPIs() {
  try {
    console.log('🧪 Testing Admin Dashboard APIs...\n');

    // 1. Test Admin Login
    console.log('1. Testing Admin Login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/api/admin/login`, adminCredentials);
    console.log('✅ Login successful:', loginResponse.data.message);
    console.log('📧 Admin Email:', loginResponse.data.data.email);
    console.log('🔑 Admin Role:', loginResponse.data.data.role);
    console.log();

    // 2. Test Dashboard Stats
    console.log('2. Testing Dashboard Stats...');
    const statsResponse = await axios.get(`${API_BASE_URL}/api/admin/dashboard/stats`);
    console.log('✅ Stats retrieved:');
    console.log('   📊 Total Applications:', statsResponse.data.data.totalApplications);
    console.log('   👥 Campus Ambassadors:', statsResponse.data.data.campusAmbassadors);
    console.log('   💼 Career Applications:', statsResponse.data.data.careerApplications);
    console.log('   🎓 Internship Applications:', statsResponse.data.data.internshipApplications);
    console.log('   ⏰ Pending Applications:', statsResponse.data.data.pendingApplications);
    console.log('   📅 This Month Applications:', statsResponse.data.data.thisMonthApplications);
    console.log();

    // 3. Test Recent Applications
    console.log('3. Testing Recent Applications...');
    const recentResponse = await axios.get(`${API_BASE_URL}/api/admin/dashboard/recent/5`);
    console.log('✅ Recent applications retrieved:', recentResponse.data.data.length, 'applications');
    recentResponse.data.data.forEach((app, index) => {
      console.log(`   ${index + 1}. ${app.name} (${app.type}) - ${app.status}`);
    });
    console.log();

    // 4. Test Campus Ambassador Applications
    console.log('4. Testing Campus Ambassador Applications...');
    const ambassadorResponse = await axios.get(`${API_BASE_URL}/api/admin/applications/ambassador`);
    console.log('✅ Ambassador applications retrieved:', ambassadorResponse.data.data.applications.length, 'applications');
    console.log('   📋 First ambassador:', ambassadorResponse.data.data.applications[0]?.name || 'None');
    console.log();

    // 5. Test Career Applications
    console.log('5. Testing Career Applications...');
    const careerResponse = await axios.get(`${API_BASE_URL}/api/admin/applications/career`);
    console.log('✅ Career applications retrieved:', careerResponse.data.data.applications.length, 'applications');
    console.log('   💼 First career applicant:', careerResponse.data.data.applications[0]?.name || 'None');
    console.log();

    // 6. Test Internship Applications
    console.log('6. Testing Internship Applications...');
    const internshipResponse = await axios.get(`${API_BASE_URL}/api/admin/applications/internship`);
    console.log('✅ Internship applications retrieved:', internshipResponse.data.data.applications.length, 'applications');
    console.log('   🎓 First internship applicant:', internshipResponse.data.data.applications[0]?.name || 'None');
    console.log();

    console.log('🎉 All Admin Dashboard APIs are working correctly!');
    console.log('\n📱 You can now access the admin dashboard at: http://localhost:5174/admin-login');
    console.log('🔐 Login credentials:');
    console.log('   Email: help.internexis@gmail.com');
    console.log('   Password: admin@internexis');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testAdminAPIs();
