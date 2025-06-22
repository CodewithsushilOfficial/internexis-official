const axios = require('axios');

async function testAdminLogin() {
    try {
        console.log('Testing admin login...');
        
        const response = await axios.post('http://localhost:5000/api/admin/login', {
            email: 'help.internexis@gmail.com',
            password: 'admin@internexis'
        });
        
        console.log('Login successful!');
        console.log('Response:', response.data);
        
    } catch (error) {
        console.error('Login failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testAdminLogin();
