const axios = require('axios');

async function testFullFlow() {
  try {
    console.log('Testing complete career application flow...');
    
    // 1. Submit a new career application
    console.log('\n1. Submitting new career application...');
    const newApplication = {
      name: 'Test Frontend User',
      email: 'testfrontend@example.com',
      phone: '+9876543210',
      position: 'Software Engineer',
      resumeLink: 'https://example.com/resume-frontend.pdf'
    };
    
    const submitResponse = await axios.post('http://localhost:5000/api/career', newApplication);
    console.log('✅ Career application submitted successfully');
    console.log('Response:', submitResponse.data);
    
    // 2. Verify it appears in the admin dashboard
    console.log('\n2. Checking admin dashboard...');
    const adminResponse = await axios.get('http://localhost:5000/api/admin/applications/career');
    const applications = adminResponse.data.data.applications;
    
    const newApp = applications.find(app => app.email === newApplication.email);
    if (newApp) {
      console.log('✅ Application found in admin dashboard!');
      console.log('Application details:', {
        id: newApp.id,
        name: newApp.name,
        email: newApp.email,
        position: newApp.position,
        status: newApp.status,
        submittedAt: newApp.submittedAt
      });
    } else {
      console.log('❌ Application NOT found in admin dashboard');
    }
    
    // 3. Check updated stats
    console.log('\n3. Checking updated dashboard stats...');
    const statsResponse = await axios.get('http://localhost:5000/api/admin/dashboard/stats');
    console.log('✅ Current stats:', statsResponse.data.data);
    
    // 4. Clean up - delete the test application
    if (newApp) {
      console.log('\n4. Cleaning up test data...');
      await axios.delete(`http://localhost:5000/api/career/${newApp.id || newApp._id}`);
      console.log('✅ Test application deleted');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testFullFlow();
