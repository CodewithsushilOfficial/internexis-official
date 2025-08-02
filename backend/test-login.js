// Test script to verify frontend login works correctly
console.log('Testing admin login...');

const testLogin = async () => {
  try {
    const API_URL = 'http://localhost:5000';
    
    const credentials = {
      email: 'help.internexis@gmail.com',
      password: 'admin@internexis'
    };
    
    console.log('Sending login request with credentials:', credentials);
    
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Login successful!');
      console.log('Token received:', data.data.token);
      console.log('Admin info:', {
        email: data.data.email,
        name: data.data.name,
        role: data.data.role
      });
    } else {
      console.log('❌ Login failed:', data.message);
    }
    
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
};

testLogin();
