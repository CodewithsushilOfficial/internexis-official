// Quick OTP Verification Test
const http = require('http');

const otp = process.argv[2];

if (!otp) {
  console.log('❌ Please provide the OTP from your email');
  console.log('Usage: node verify.js <YOUR_OTP>');
  console.log('');
  console.log('📧 Check your email for the 6-digit OTP code');
  process.exit(1);
}

console.log('🔐 Testing OTP Verification...');
console.log('📧 Using OTP:', otp);

const postData = JSON.stringify({
  email: 'help.internexis@gmail.com',
  otp: otp
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin/verify-otp',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  console.log('📊 Response Status:', res.statusCode);
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📧 Raw Response:', data);
    
    try {
      const response = JSON.parse(data);
      
      console.log('� Parsed Response:', JSON.stringify(response, null, 2));
      
      if (response.success && response.data && response.data.token) {
        console.log('');
        console.log('✅ OTP VERIFICATION SUCCESSFUL!');
        console.log('🔑 JWT Token received');
        console.log('👤 Admin:', response.data.admin.email);
        console.log('');
        console.log('🎯 2FA Backend is working correctly!');
      } else {
        console.log('');
        console.log('❌ OTP verification failed');
        console.log('💡 Possible reasons:');
        console.log('   - Wrong OTP');
        console.log('   - OTP expired (5 minutes)');
        console.log('   - Too many attempts');
      }
    } catch (error) {
      console.log('❌ Error parsing response:', error.message);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Request error:', error.message);
});

req.write(postData);
req.end();
  
  const postData = JSON.stringify({
    email: 'help.internexis@gmail.com',
    otp: otp
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/verify-otp',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (response.success) {
          console.log('');
          console.log('🎉 SUCCESS! 2FA VERIFICATION COMPLETE!');
          console.log('==========================================');
          console.log('✅ OTP verified successfully');
          console.log('👤 Admin:', response.data.name);
          console.log('📧 Email:', response.data.email);
          console.log('🎭 Role:', response.data.role);
          console.log('🎟️ Token:', response.data.token ? 'Generated' : 'Missing');
          console.log('🕐 Last Login:', response.data.lastLogin);
          console.log('');
          console.log('🔒 Two-Factor Authentication is working perfectly!');
        } else {
          console.log('');
          console.log('❌ OTP Verification Failed');
          console.log('Error:', response.message);
          console.log('');
          console.log('💡 Try again with the correct OTP from your email');
        }
      } catch (error) {
        console.log('❌ Error parsing response:', error.message);
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ Request error:', error.message);
  });

  req.write(postData);
  req.end();
} else {
  console.log('💡 Usage: node verify.js <OTP>');
  console.log('   Example: node verify.js 123456');
  console.log('');
}
