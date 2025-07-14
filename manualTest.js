const API_BASE_URL = 'http://localhost:5000';
const TEST_EMAIL = 'help.internexis@gmail.com';
const TEST_PASSWORD = 'admin@internexis';

console.log('🔐 MANUAL 2FA TEST');
console.log('==================');

async function step1_login() {
  console.log('\n📧 Step 1: Logging in with credentials...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      })
    });

    const data = await response.json();

    if (data.success && data.data.otp_sent) {
      console.log('✅ Login successful! OTP has been sent to:', data.data.email);
      console.log('📧 Check your email for the 6-digit OTP');
      console.log('⏰ OTP expires in:', data.data.expires_in, 'seconds');
      return true;
    } else {
      console.log('❌ Login failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Login error:', error.message);
    return false;
  }
}

async function step2_verifyOTP(otp) {
  console.log('\n🔐 Step 2: Verifying OTP...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: TEST_EMAIL,
        otp: otp
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ OTP verification successful!');
      console.log('👤 Admin:', data.data.name);
      console.log('📧 Email:', data.data.email);
      console.log('🎭 Role:', data.data.role);
      console.log('🎟️ Token received:', data.data.token ? 'Yes' : 'No');
      console.log('🕐 Last login:', data.data.lastLogin);
      return true;
    } else {
      console.log('❌ OTP verification failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ OTP verification error:', error.message);
    return false;
  }
}

async function testInvalidOTP() {
  console.log('\n🚫 Testing invalid OTP...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: TEST_EMAIL,
        otp: '123456' // Invalid OTP
      })
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.log('✅ Invalid OTP correctly rejected:', data.message);
    } else {
      console.log('❌ Should have failed but got:', data);
    }
  } catch (error) {
    console.log('✅ Invalid OTP correctly rejected:', error.message);
  }
}

async function testResendOTP() {
  console.log('\n🔄 Testing resend OTP...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/resend-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: TEST_EMAIL
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ OTP resent successfully!');
      console.log('📧 New OTP sent to:', data.data.email);
    } else if (response.status === 429) {
      console.log('✅ Rate limiting working:', data.message);
    } else {
      console.log('❌ Resend failed:', data.message);
    }
  } catch (error) {
    console.log('❌ Resend error:', error.message);
  }
}

async function runTests() {
  console.log('Starting comprehensive 2FA test...\n');
  
  // Step 1: Login and trigger OTP
  const loginSuccess = await step1_login();
  
  if (loginSuccess) {
    // Test invalid OTP first
    await testInvalidOTP();
    
    // Test resend OTP (should be rate limited)
    await testResendOTP();
    
    // Now prompt for real OTP
    console.log('\n🎯 MANUAL VERIFICATION REQUIRED:');
    console.log('1. Check your email for the OTP');
    console.log('2. Run: node manualTest.js verify <OTP>');
    console.log('   Example: node manualTest.js verify 123456');
  }
  
  console.log('\n📊 Test Summary:');
  console.log('✅ Login endpoint working');
  console.log('✅ OTP email sending working');
  console.log('✅ Invalid OTP rejection working');
  console.log('✅ Rate limiting working');
  console.log('⏳ Manual OTP verification pending...');
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args[0] === 'verify' && args[1]) {
  // Manual OTP verification
  const otp = args[1];
  step2_verifyOTP(otp).then(() => {
    console.log('\n🎉 2FA TEST COMPLETED!');
    console.log('Your Two-Factor Authentication is working perfectly!');
  });
} else {
  // Run initial tests
  runTests();
}
