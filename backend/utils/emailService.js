const nodemailer = require('nodemailer');

// Email service configuration
class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      this.transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD // Use App Password, not regular password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      console.log('Email transporter initialized successfully');
    } catch (error) {
      console.error('Failed to initialize email transporter:', error);
    }
  }

  // Generate 6-digit OTP
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP email
  async sendOTPEmail(email, otp, adminName = 'Admin') {
    try {
      if (!this.transporter) {
        throw new Error('Email transporter not initialized');
      }

      const mailOptions = {
        from: {
          name: 'Internexis Security',
          address: process.env.GMAIL_EMAIL
        },
        to: email,
        subject: 'Your OTP for Internexis Admin Login',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">🔐 Internexis Admin Security</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
              <h2 style="color: #333; margin-top: 0;">Hello ${adminName},</h2>
              
              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                We received a login request for your Internexis admin account. To complete the login process, please use the following One-Time Password (OTP):
              </p>
              
              <div style="background: white; border: 2px dashed #667eea; border-radius: 10px; padding: 25px; text-align: center; margin: 25px 0;">
                <div style="font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                  ${otp}
                </div>
              </div>
              
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  ⚠️ <strong>Important Security Information:</strong>
                </p>
                <ul style="color: #856404; font-size: 14px; margin: 10px 0;">
                  <li>This OTP is valid for <strong>5 minutes only</strong></li>
                  <li>Never share this OTP with anyone</li>
                  <li>Internexis staff will never ask for your OTP</li>
                  <li>If you didn't request this login, please secure your account immediately</li>
                </ul>
              </div>
              
              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                If you have any concerns about this login attempt, please contact our security team immediately.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 12px; margin: 0;">
                This is an automated security message from Internexis Admin System<br>
                Please do not reply to this email.
              </p>
            </div>
          </div>
        `,
        text: `
Hello ${adminName},

Your One-Time Password (OTP) for Internexis Admin Login is: ${otp}

This OTP is valid for 5 minutes only. Please do not share this with anyone.

If you didn't request this login, please contact our security team immediately.

Best regards,
Internexis Security Team
        `
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('OTP email sent successfully:', info.messageId);
      return {
        success: true,
        messageId: info.messageId
      };

    } catch (error) {
      console.error('Failed to send OTP email:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Verify email configuration
  async verifyConfiguration() {
    try {
      if (!this.transporter) {
        throw new Error('Email transporter not initialized');
      }

      await this.transporter.verify();
      console.log('Email configuration verified successfully');
      return true;
    } catch (error) {
      console.error('Email configuration verification failed:', error);
      return false;
    }
  }
}

// Create singleton instance
const emailService = new EmailService();

module.exports = emailService;
