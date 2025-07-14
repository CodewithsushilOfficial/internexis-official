const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');
require('dotenv').config();

const Admin = require('./models/AdminModel');

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

function questionHidden(prompt) {
  return new Promise(resolve => {
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    
    let input = '';
    process.stdout.write(prompt);
    
    stdin.on('data', function onData(key) {
      switch (key) {
        case '\n':
        case '\r':
        case '\u0004': // Ctrl+D
          stdin.setRawMode(false);
          stdin.removeListener('data', onData);
          stdin.pause();
          process.stdout.write('\n');
          resolve(input);
          break;
        case '\u0003': // Ctrl+C
          process.exit();
          break;
        case '\u007f': // Backspace
          if (input.length > 0) {
            input = input.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          input += key;
          process.stdout.write('*');
          break;
      }
    });
  });
}

class Setup2FA {
  async checkEnvironmentVariables() {
    log.title('CHECKING ENVIRONMENT CONFIGURATION');
    
    const requiredVars = [
      'MONGODB_URI',
      'GMAIL_EMAIL',
      'GMAIL_APP_PASSWORD',
      'JWT_SECRET'
    ];

    const missingVars = [];
    const presentVars = [];

    for (const varName of requiredVars) {
      if (process.env[varName]) {
        presentVars.push(varName);
        log.success(`${varName} is configured`);
      } else {
        missingVars.push(varName);
        log.error(`${varName} is missing`);
      }
    }

    if (missingVars.length > 0) {
      log.warning('Some environment variables are missing. Please add them to your .env file:');
      console.log('\nMissing variables:');
      missingVars.forEach(varName => {
        switch (varName) {
          case 'GMAIL_EMAIL':
            console.log(`${varName}=your-gmail@gmail.com`);
            break;
          case 'GMAIL_APP_PASSWORD':
            console.log(`${varName}=your-16-character-app-password`);
            console.log('Generate at: https://myaccount.google.com/apppasswords');
            break;
          case 'MONGODB_URI':
            console.log(`${varName}=mongodb://localhost:27017/internexis`);
            break;
          case 'JWT_SECRET':
            console.log(`${varName}=your-super-secret-jwt-key-here`);
            break;
          default:
            console.log(`${varName}=your-value-here`);
        }
      });
      return false;
    }

    log.success('All required environment variables are configured!');
    return true;
  }

  async testDatabaseConnection() {
    log.title('TESTING DATABASE CONNECTION');
    
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      log.success('Database connection successful');
      
      // Test collections
      const collections = await mongoose.connection.db.listCollections().toArray();
      log.info(`Found ${collections.length} collections in database`);
      
      return true;
    } catch (error) {
      log.error(`Database connection failed: ${error.message}`);
      return false;
    }
  }

  async testEmailConfiguration() {
    log.title('TESTING EMAIL CONFIGURATION');
    
    try {
      const emailService = require('./utils/emailService');
      const isConfigured = await emailService.verifyConfiguration();
      
      if (isConfigured) {
        log.success('Email configuration is valid');
        
        // Test OTP generation
        const testOtp = emailService.generateOTP();
        if (testOtp && testOtp.length === 6 && /^\d+$/.test(testOtp)) {
          log.success(`OTP generation working (sample: ${testOtp})`);
        } else {
          log.error('OTP generation failed');
          return false;
        }
        
        return true;
      } else {
        log.error('Email configuration verification failed');
        return false;
      }
    } catch (error) {
      log.error(`Email test failed: ${error.message}`);
      return false;
    }
  }

  async checkAdminAccount() {
    log.title('CHECKING ADMIN ACCOUNTS');
    
    try {
      const adminCount = await Admin.countDocuments();
      log.info(`Found ${adminCount} admin account(s) in database`);
      
      if (adminCount === 0) {
        log.warning('No admin accounts found. You need at least one admin account to test 2FA.');
        const createAdmin = await question('Would you like to create an admin account? (y/n): ');
        
        if (createAdmin.toLowerCase() === 'y' || createAdmin.toLowerCase() === 'yes') {
          await this.createAdminAccount();
        }
      } else {
        // Show existing admins
        const admins = await Admin.find({}, { email: 1, name: 1, isActive: 1 }).limit(5);
        console.log('\nExisting admin accounts:');
        admins.forEach(admin => {
          const status = admin.isActive ? '🟢 Active' : '🔴 Inactive';
          console.log(`  • ${admin.name} (${admin.email}) - ${status}`);
        });
      }
      
      return true;
    } catch (error) {
      log.error(`Admin account check failed: ${error.message}`);
      return false;
    }
  }

  async createAdminAccount() {
    log.title('CREATING ADMIN ACCOUNT');
    
    try {
      const name = await question('Enter admin name: ');
      const email = await question('Enter admin email: ');
      const password = await questionHidden('Enter admin password: ');
      const confirmPassword = await questionHidden('Confirm password: ');
      
      if (password !== confirmPassword) {
        log.error('Passwords do not match');
        return false;
      }
      
      if (password.length < 6) {
        log.error('Password must be at least 6 characters long');
        return false;
      }
      
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
      if (existingAdmin) {
        log.error('Admin with this email already exists');
        return false;
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create admin
      const admin = new Admin({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        emailVerified: true
      });
      
      await admin.save();
      log.success(`Admin account created successfully for ${email}`);
      return true;
      
    } catch (error) {
      log.error(`Failed to create admin account: ${error.message}`);
      return false;
    }
  }

  async testSendOTP() {
    log.title('TESTING OTP EMAIL SENDING');
    
    const testEmail = await question('Enter email address to test OTP sending (or press Enter to skip): ');
    
    if (!testEmail.trim()) {
      log.info('Skipping OTP test');
      return true;
    }
    
    try {
      const emailService = require('./utils/emailService');
      const testOtp = emailService.generateOTP();
      
      log.info(`Sending test OTP ${testOtp} to ${testEmail}...`);
      
      const result = await emailService.sendOTPEmail(testEmail, testOtp, 'Test User');
      
      if (result.success) {
        log.success(`Test OTP email sent successfully! Message ID: ${result.messageId}`);
        log.info('Please check the email inbox and spam folder');
        return true;
      } else {
        log.error(`Failed to send test email: ${result.error}`);
        return false;
      }
    } catch (error) {
      log.error(`OTP test failed: ${error.message}`);
      return false;
    }
  }

  async runFullSetup() {
    log.title('TWO-FACTOR AUTHENTICATION SETUP');
    console.log('This script will help you set up and test the 2FA system for your admin panel.\n');
    
    const steps = [
      ['Environment Variables', () => this.checkEnvironmentVariables()],
      ['Database Connection', () => this.testDatabaseConnection()],
      ['Email Configuration', () => this.testEmailConfiguration()],
      ['Admin Accounts', () => this.checkAdminAccount()],
      ['OTP Email Test', () => this.testSendOTP()]
    ];
    
    let allPassed = true;
    
    for (const [stepName, stepFunction] of steps) {
      try {
        log.info(`\nStep: ${stepName}`);
        const result = await stepFunction();
        if (!result) {
          allPassed = false;
          log.warning(`Step "${stepName}" needs attention before proceeding.`);
          
          const continueSetup = await question('Continue with next step? (y/n): ');
          if (continueSetup.toLowerCase() !== 'y' && continueSetup.toLowerCase() !== 'yes') {
            break;
          }
        }
      } catch (error) {
        log.error(`Step "${stepName}" failed: ${error.message}`);
        allPassed = false;
      }
    }
    
    console.log('\n' + '='.repeat(60));
    
    if (allPassed) {
      log.success('🎉 2FA setup completed successfully!');
      console.log('\nNext steps:');
      console.log('1. Start your backend server: npm run dev');
      console.log('2. Start your frontend: npm run dev');
      console.log('3. Test the complete login flow');
      console.log('4. Run automated tests: node test2FA.js');
    } else {
      log.warning('Setup completed with some issues. Please resolve the issues above before testing 2FA.');
    }
    
    await mongoose.disconnect();
    rl.close();
  }
}

// Main execution
async function main() {
  const setup = new Setup2FA();
  
  try {
    await setup.runFullSetup();
  } catch (error) {
    log.error(`Setup failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = Setup2FA;
