console.log('🔐 2FA MANUAL VERIFICATION');
console.log('========================');
console.log('');
console.log('📧 Step 1: Trigger OTP');
console.log('- Go to: http://localhost:5173');
console.log('- Enter: help.internexis@gmail.com');
console.log('- Enter: admin@internexis');
console.log('- Click Login');
console.log('');
console.log('📱 Step 2: Check your email for OTP');
console.log('- Check your Gmail inbox');
console.log('- Look for email from: Internexis Security');
console.log('- Subject: "Your OTP for Internexis Admin Login"');
console.log('- Copy the 6-digit OTP code');
console.log('');
console.log('🔐 Step 3: Verify OTP');
console.log('- Return to the frontend');
console.log('- Enter the 6-digit OTP');
console.log('- Submit to complete login');
console.log('');

// Get OTP from command line argument
const args = process.argv.slice(2);
if (args[0]) {
  const otp = args[0];
  console.log(`🎯 Testing OTP: ${otp}`);
  
  // Simple verification using Node.js built-in http
  const http = require('http');
  
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
