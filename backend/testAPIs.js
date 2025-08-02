const axios = require('axios');

const testAPIs = async () => {
  try {
    console.log('🔄 Testing API endpoints...');
    
    // Login first to get token
    const loginResponse = await axios.post('http://localhost:5000/api/admin/login', {
      email: 'help.internexis@gmail.com',
      password: 'InternexisAdmin2024!'
    });
    
    const token = loginResponse.data.data.token;
    console.log('✅ Login successful, token obtained');
    
    // Setup axios with auth header
    const authApi = axios.create({
      baseURL: 'http://localhost:5000',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Test admin profile
    const profileResponse = await authApi.get('/api/admin/profile');
    console.log('✅ Admin profile retrieved:', profileResponse.data.data.name);
    
    // Test dashboard stats
    const statsResponse = await authApi.get('/api/admin/dashboard/stats');
    console.log('✅ Dashboard stats retrieved:', JSON.stringify(statsResponse.data.data, null, 2));
    
    // Test ambassador submission (public endpoint)
    const ambassadorData = {
      name: 'Test Student',
      email: 'test.student@example.com',
      phone: '+91-9876543210',
      college: 'Test University',
      course: 'Computer Science',
      year: '3rd Year',
      city: 'Test City',
      state: 'Test State',
      cgpa: '8.5',
      skills: ['Leadership', 'Communication', 'Public Speaking'],
      experience: 'Led student organizations and managed events',
      motivation: 'Want to contribute to Internexis growth and help other students',
      availability: 'Weekends and evenings',
      whyYouWantToJoin: 'I want to join Internexis as a campus ambassador because I am passionate about technology and helping other students find great opportunities. I believe I can make a positive impact by connecting students with valuable internships and career opportunities.',
      socialMedia: {
        linkedin: 'https://linkedin.com/in/testuser',
        instagram: '@testuser'
      }
    };
    
    const ambassadorResponse = await axios.post('http://localhost:5000/api/ambassador', ambassadorData);
    console.log('✅ Ambassador application submitted:', ambassadorResponse.data.data.id);
    
    // Test fetching ambassador applications (admin endpoint)
    const ambassadorsResponse = await authApi.get('/api/ambassador/admin/all');
    console.log('✅ Ambassador applications retrieved:', ambassadorsResponse.data.data.applications.length, 'applications');
    
    console.log('\n🎉 All API tests passed successfully!');
    
  } catch (error) {
    console.error('❌ API test failed:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Error:', error.message);
  }
};

testAPIs();
