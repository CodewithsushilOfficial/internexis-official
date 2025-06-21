const axios = require('axios');

// Test configuration
const API_BASE_URL = 'http://localhost:5000';
const timestamp = Date.now();
const TEST_APPLICATION = {
  name: 'Test Delete User',
  email: `testdelete${timestamp}@example.com`, // Make email unique
  phone: '9999999999', // Fixed phone format
  college: 'Test University',
  whyYouWantToJoin: 'This is a test application for delete functionality testing.'
};

// Function to create a test application
async function createTestApplication() {
  try {
    console.log('🧪 Creating test application...');
    
    const response = await axios.post(`${API_BASE_URL}/api/ambassador`, TEST_APPLICATION);
      if (response.data.success) {
      console.log('✅ Test application created successfully:');
      console.log('ID:', response.data.data.id);
      console.log('Name:', TEST_APPLICATION.name);
      console.log('Email:', TEST_APPLICATION.email);
      return response.data.data.id;
    } else {
      console.error('❌ Failed to create test application:', response.data.message);
      return null;
    }  } catch (error) {
    console.error('❌ Error creating test application:', error.response?.data || error.message);
    return null;
  }
}

// Function to test admin login and get token
async function loginAdmin() {
  try {
    console.log('🔑 Logging in as admin...');
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
      email: 'help.internexis@gmail.com',
      password: 'admin@internexis'
    });    if (response.data.success) {
      console.log('✅ Admin login successful');
      console.log('Response data:', response.data);
      return response.data.data.token;
    } else {
      console.error('❌ Admin login failed:', response.data.message);
      return null;
    }
  } catch (error) {
    console.error('❌ Error during admin login:', error.message);
    return null;
  }
}

// Function to test delete functionality
async function testDeleteFunction(applicationId, token) {
  try {
    console.log(`🗑️ Testing delete function for application ID: ${applicationId}`);
    
    const response = await axios.delete(
      `${API_BASE_URL}/api/admin/applications/ambassador/${applicationId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data.success) {
      console.log('✅ Delete test successful:');
      console.log('Message:', response.data.message);
      console.log('Deleted application:', response.data.data);
      return true;
    } else {
      console.error('❌ Delete test failed:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error during delete test:', error.response?.data || error.message);
    return false;
  }
}

// Function to verify application is deleted
async function verifyDeletion(applicationId, token) {
  try {
    console.log(`🔍 Verifying application ${applicationId} is deleted...`);
    
    const response = await axios.get(
      `${API_BASE_URL}/api/admin/applications/ambassador`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data.success) {
      const applications = response.data.data.applications;
      const foundApp = applications.find(app => app._id === applicationId);
      
      if (!foundApp) {
        console.log('✅ Verification successful: Application successfully deleted from database');
        return true;
      } else {
        console.error('❌ Verification failed: Application still exists in database');
        return false;
      }
    } else {
      console.error('❌ Error during verification:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error during verification:', error.message);
    return false;
  }
}

// Main test function
async function runDeleteTest() {
  console.log('🚀 Starting Delete Functionality Test\n');
  
  // Step 1: Create test application
  const applicationId = await createTestApplication();
  if (!applicationId) {
    console.log('❌ Test failed at step 1: Could not create test application');
    return;
  }
  
  console.log('');
  
  // Step 2: Login as admin
  const token = await loginAdmin();
  if (!token) {
    console.log('❌ Test failed at step 2: Could not login as admin');
    return;
  }
  
  console.log('');
  
  // Step 3: Test delete functionality
  const deleteSuccess = await testDeleteFunction(applicationId, token);
  if (!deleteSuccess) {
    console.log('❌ Test failed at step 3: Delete operation failed');
    return;
  }
  
  console.log('');
  
  // Step 4: Verify deletion
  const verificationSuccess = await verifyDeletion(applicationId, token);
  if (!verificationSuccess) {
    console.log('❌ Test failed at step 4: Verification failed');
    return;
  }
  
  console.log('\n🎉 All tests passed! Delete functionality is working correctly.\n');
  console.log('✅ Test Summary:');
  console.log('   - Test application created');
  console.log('   - Admin authentication successful');
  console.log('   - Delete operation successful');
  console.log('   - Deletion verified in database');
}

// Run the test
if (require.main === module) {
  runDeleteTest().catch(error => {
    console.error('💥 Test runner error:', error);
  });
}

module.exports = { runDeleteTest };
