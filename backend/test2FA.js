const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

// Test configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';
const TEST_ADMIN_EMAIL = 'help.internexis@gmail.com'; // Replace with your test admin email
const TEST_ADMIN_PASSWORD = 'admin@internexis'; // Replace with your test admin password

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}🔐 ${msg}${colors.reset}\n`)
};

// Test functions
class TwoFactorAuthTester {
  constructor() {
    this.testResults = {
      total: 0,
      passed: 0,
      failed: 0
    };
  }

  async runTest(testName, testFunction) {
    this.testResults.total++;
    log.info(`Running: ${testName}`);
    
    try {
      await testFunction();
      this.testResults.passed++;
      log.success(`${testName} - PASSED`);
    } catch (error) {
      this.testResults.failed++;
      log.error(`${testName} - FAILED: ${error.message}`);
    }
  }

  // Test 1: Admin login with valid credentials (should return OTP sent)
  async testValidCredentialsLogin() {
    const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
      email: TEST_ADMIN_EMAIL,
      password: TEST_ADMIN_PASSWORD
    });

    if (!response.data.success) {
      throw new Error(`Login failed: ${response.data.message}`);
    }

    if (!response.data.data.otp_sent) {
      throw new Error('Expected otp_sent to be true');
    }

    if (!response.data.data.email) {
      throw new Error('Expected email in response');
    }

    log.info(`OTP sent to: ${response.data.data.email}`);
  }

  // Test 2: Admin login with invalid credentials
  async testInvalidCredentialsLogin() {
    try {
      await axios.post(`${API_BASE_URL}/api/admin/login`, {
        email: TEST_ADMIN_EMAIL,
        password: 'wrong_password'
      });
      throw new Error('Expected login to fail with invalid credentials');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Expected behavior
        return;
      }
      throw error;
    }
  }

  // Test 3: OTP verification with invalid OTP
  async testInvalidOTPVerification() {
    // First, trigger OTP generation
    await axios.post(`${API_BASE_URL}/api/admin/login`, {
      email: TEST_ADMIN_EMAIL,
      password: TEST_ADMIN_PASSWORD
    });

    // Try to verify with invalid OTP
    try {
      await axios.post(`${API_BASE_URL}/api/admin/verify-otp`, {
        email: TEST_ADMIN_EMAIL,
        otp: '123456'
      });
      throw new Error('Expected OTP verification to fail with invalid OTP');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Expected behavior
        return;
      }
      throw error;
    }
  }

  // Test 4: OTP verification without prior login
  async testOTPVerificationWithoutLogin() {
    try {
      await axios.post(`${API_BASE_URL}/api/admin/verify-otp`, {
        email: TEST_ADMIN_EMAIL,
        otp: '123456'
      });
      throw new Error('Expected OTP verification to fail without prior login');
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 404)) {
        // Expected behavior
        return;
      }
      throw error;
    }
  }

  // Test 5: Resend OTP functionality
  async testResendOTP() {
    // First, trigger OTP generation
    await axios.post(`${API_BASE_URL}/api/admin/login`, {
      email: TEST_ADMIN_EMAIL,
      password: TEST_ADMIN_PASSWORD
    });

    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Try to resend OTP
    const response = await axios.post(`${API_BASE_URL}/api/admin/resend-otp`, {
      email: TEST_ADMIN_EMAIL
    });

    if (!response.data.success) {
      throw new Error(`Resend OTP failed: ${response.data.message}`);
    }

    log.info('OTP resent successfully');
  }

  // Test 6: Rate limiting for resend OTP
  async testResendOTPRateLimit() {
    // First, trigger OTP generation
    await axios.post(`${API_BASE_URL}/api/admin/login`, {
      email: TEST_ADMIN_EMAIL,
      password: TEST_ADMIN_PASSWORD
    });

    // Resend OTP immediately
    await axios.post(`${API_BASE_URL}/api/admin/resend-otp`, {
      email: TEST_ADMIN_EMAIL
    });

    // Try to resend again immediately (should be rate limited)
    try {
      await axios.post(`${API_BASE_URL}/api/admin/resend-otp`, {
        email: TEST_ADMIN_EMAIL
      });
      throw new Error('Expected resend OTP to be rate limited');
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Expected behavior
        return;
      }
      throw error;
    }
  }

  // Test 7: API endpoints accessibility
  async testAPIEndpoints() {
    const endpoints = [
      '/api/admin/login',
      '/api/admin/verify-otp',
      '/api/admin/resend-otp'
    ];

    for (const endpoint of endpoints) {
      try {
        // Just check if endpoint exists (POST without data should return 400, not 404)
        await axios.post(`${API_BASE_URL}${endpoint}`, {});
      } catch (error) {
        if (error.response && error.response.status === 404) {
          throw new Error(`Endpoint ${endpoint} not found`);
        }
        // Other errors (400, 401, etc.) are expected for endpoints without proper data
      }
    }
  }

  // Test 8: Database connection and models
  async testDatabaseModels() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      
      // Test if OTP model is available
      const Otp = require('../models/OtpModel');
      const Admin = require('../models/AdminModel');
      
      // Test creating a test OTP record
      const testOtp = new Otp({
        email: 'test@example.com',
        otp: '123456',
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
      });
      
      // Validate the model
      await testOtp.validate();
      
      log.info('Database models validated successfully');
      
      await mongoose.disconnect();
    } catch (error) {
      throw new Error(`Database model test failed: ${error.message}`);
    }
  }

  // Run all tests
  async runAllTests() {
    log.title('TWO-FACTOR AUTHENTICATION TEST SUITE');
    
    const tests = [
      ['Database Models Test', () => this.testDatabaseModels()],
      ['API Endpoints Accessibility', () => this.testAPIEndpoints()],
      ['Valid Credentials Login (OTP Generation)', () => this.testValidCredentialsLogin()],
      ['Invalid Credentials Login', () => this.testInvalidCredentialsLogin()],
      ['Invalid OTP Verification', () => this.testInvalidOTPVerification()],
      ['OTP Verification Without Login', () => this.testOTPVerificationWithoutLogin()],
      ['Resend OTP Functionality', () => this.testResendOTP()],
      ['Resend OTP Rate Limiting', () => this.testResendOTPRateLimit()]
    ];

    for (const [testName, testFunction] of tests) {
      await this.runTest(testName, testFunction);
      // Wait between tests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    this.printResults();
  }

  printResults() {
    log.title('TEST RESULTS SUMMARY');
    console.log(`Total Tests: ${this.testResults.total}`);
    console.log(`${colors.green}Passed: ${this.testResults.passed}${colors.reset}`);
    console.log(`${colors.red}Failed: ${this.testResults.failed}${colors.reset}`);
    
    const successRate = ((this.testResults.passed / this.testResults.total) * 100).toFixed(1);
    console.log(`Success Rate: ${successRate}%`);
    
    if (this.testResults.failed === 0) {
      log.success('🎉 All tests passed! Two-Factor Authentication is working correctly.');
    } else {
      log.warning(`${this.testResults.failed} test(s) failed. Please check the implementation.`);
    }
  }
}

// Manual test instructions
function printManualTestInstructions() {
  log.title('MANUAL TESTING INSTRUCTIONS');
  
  console.log(`${colors.bright}1. Complete Login Flow Test:${colors.reset}`);
  console.log('   • Open your frontend application');
  console.log('   • Navigate to admin login page');
  console.log('   • Enter valid credentials');
  console.log('   • Check that OTP input screen appears');
  console.log('   • Check your email for OTP');
  console.log('   • Enter the OTP and verify successful login');
  
  console.log(`\n${colors.bright}2. Email Verification:${colors.reset}`);
  console.log('   • Verify that OTP emails are received');
  console.log('   • Check email formatting and content');
  console.log('   • Verify OTP expiry behavior (5 minutes)');
  
  console.log(`\n${colors.bright}3. Security Testing:${colors.reset}`);
  console.log('   • Test with wrong OTP (should fail after 3 attempts)');
  console.log('   • Test OTP expiry (wait 5+ minutes)');
  console.log('   • Test resend OTP functionality');
  console.log('   • Test back to login button');
  
  console.log(`\n${colors.bright}4. Admin Dashboard Access:${colors.reset}`);
  console.log('   • After successful 2FA, verify admin dashboard loads');
  console.log('   • Check that authentication token is stored');
  console.log('   • Test logout and re-login flow');
  
  console.log(`\n${colors.yellow}Note: Make sure to update TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD in this script${colors.reset}`);
}

// Main execution
async function main() {
  if (process.argv.includes('--manual-only')) {
    printManualTestInstructions();
    return;
  }

  const tester = new TwoFactorAuthTester();
  
  try {
    await tester.runAllTests();
  } catch (error) {
    log.error(`Test suite failed: ${error.message}`);
    process.exit(1);
  }
  
  console.log('\n');
  printManualTestInstructions();
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = TwoFactorAuthTester;
