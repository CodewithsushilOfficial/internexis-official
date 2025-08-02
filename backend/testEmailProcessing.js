const axios = require('axios');

const testEmailProcessing = async () => {
  try {
    console.log('🔄 Testing email processing...');
    
    const requestData = {
      email: 'help.internexis@gmail.com',
      password: 'InternexisAdmin2024!'
    };
    
    console.log('Sending request with data:', requestData);
    
    const response = await axios.post('http://localhost:5001/api/admin/login', requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Login successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('❌ Login failed:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Request was sent to:', error.config?.url);
    console.error('Request data:', error.config?.data);
  }
};

testEmailProcessing();
