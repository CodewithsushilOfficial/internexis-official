// Quick API test to trigger OTP
const http = require('http');

console.log('🔐 Testing Admin Login API...');
console.log('Connecting to: http://localhost:5000/api/admin/login');

const postData = JSON.stringify({
  email: 'help.internexis@gmail.com',
  password: 'admin@internexis'
});

console.log('📧 Request Data:', postData);

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  console.log('📊 Response Status:', res.statusCode);
  console.log('📊 Response Headers:', res.headers);
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📧 Raw Response:', data);
    
    try {
      const response = JSON.parse(data);
      
      console.log('� Parsed Response:', JSON.stringify(response, null, 2));
      
      if (response.success && response.data && response.data.otp_sent) {
        console.log('');
        console.log('✅ 2FA LOGIN FLOW WORKING!');
        console.log('📧 OTP has been sent to:', response.data.email);
        console.log('⏰ Expires in:', response.data.expires_in, 'seconds');
        console.log('');
        console.log('🎯 Now check your email and run:');
        console.log('   node verify.js <YOUR_OTP>');
      } else if (response.data && response.data.token) {
        console.log('');
        console.log('❌ DIRECT LOGIN - 2FA NOT WORKING!');
        console.log('🔧 Backend is bypassing 2FA');
        console.log('Token received:', response.data.token);
      } else {
        console.log('');
        console.log('❌ Unexpected response');
      }
    } catch (error) {
      console.log('❌ Error parsing response:', error.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Request error:', error.message);
  console.log('❌ Make sure backend server is running on port 5000');
});

req.setTimeout(10000, () => {
  console.log('❌ Request timeout');
  req.destroy();
});

console.log('📤 Sending request...');
req.write(postData);
req.end();
