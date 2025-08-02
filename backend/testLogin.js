const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('🔄 Testing admin login...');
    
    const response = await axios.post('http://localhost:5001/api/admin/login', {
      email: 'help.internexis@gmail.com',
      password: 'InternexisAdmin2024!'
    });
    
    console.log('✅ Login successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('❌ Login failed:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
  }
};

testLogin();
