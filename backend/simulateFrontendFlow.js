const axios = require('axios');

// Simulate the exact frontend API calls
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function simulateFrontendFlow() {
  try {
    console.log('Simulating complete frontend flow...');
    
    // 1. First submit a career application (like form submission)
    console.log('\n1. Submitting career application from frontend...');
    const careerData = {
      name: 'Frontend Test User',
      email: 'frontend-test@example.com',
      phone: '+1234567890',
      position: 'Frontend Developer',
      resumeLink: 'https://example.com/frontend-resume.pdf'
    };
    
    const careerSubmission = await api.post('/api/career', careerData);
    console.log('✅ Career application submitted:', careerSubmission.data);
    
    // 2. Admin login (simulate admin dashboard login)
    console.log('\n2. Admin login...');
    const loginData = {
      email: 'help.internexis@gmail.com',
      password: 'admin@internexis'
    };
    
    const loginResponse = await api.post('/api/admin/login', loginData);
    console.log('✅ Admin login successful');
    
    // Store auth token for subsequent requests
    const token = loginResponse.data.data.token;
    const authHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // 3. Fetch dashboard stats (what admin dashboard loads first)
    console.log('\n3. Fetching dashboard stats...');
    const statsResponse = await api.get('/api/admin/dashboard/stats', { headers: authHeaders });
    console.log('✅ Dashboard stats:', statsResponse.data.data);
    
    // 4. Fetch recent applications (dashboard overview)
    console.log('\n4. Fetching recent applications...');
    const recentResponse = await api.get('/api/admin/dashboard/recent/5', { headers: authHeaders });
    console.log('✅ Recent applications:', recentResponse.data.data.length, 'applications');
    
    // 5. Fetch career applications specifically (when clicking on careers tab)
    console.log('\n5. Fetching career applications for admin dashboard...');
    const careerApplicationsResponse = await api.get('/api/admin/applications/career', { headers: authHeaders });
    console.log('✅ Career applications count:', careerApplicationsResponse.data.data.applications.length);
    
    // Display first few career applications
    const applications = careerApplicationsResponse.data.data.applications;
    console.log('Career Applications in Dashboard:');
    applications.slice(0, 3).forEach((app, index) => {
      console.log(`  ${index + 1}. ${app.name} (${app.email}) - ${app.position} - Status: ${app.status}`);
    });
    
    // 6. Check if our submitted application is in the list
    const ourApplication = applications.find(app => app.email === careerData.email);
    if (ourApplication) {
      console.log('\n✅ SUCCESS: Our submitted application is visible in admin dashboard!');
      console.log('Application details:', {
        id: ourApplication.id,
        name: ourApplication.name,
        email: ourApplication.email,
        position: ourApplication.position,
        status: ourApplication.status,
        submittedAt: ourApplication.submittedAt
      });
    } else {
      console.log('\n❌ PROBLEM: Our submitted application is NOT visible in admin dashboard');
    }
    
  } catch (error) {
    console.error('❌ Simulation failed:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method
    });
  }
}

simulateFrontendFlow();
