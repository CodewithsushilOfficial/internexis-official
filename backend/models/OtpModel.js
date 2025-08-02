const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  otp: {
    type: String,
    required: [true, 'OTP is required'],
    minlength: [6, 'OTP must be 6 digits'],
    maxlength: [6, 'OTP must be 6 digits']
  },
  attempts: {
    type: Number,
    default: 0,
    max: [3, 'Maximum 3 attempts allowed']
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    required: true,
    default: function() {
      return new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index to automatically delete expired OTP documents
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for faster queries
otpSchema.index({ email: 1, createdAt: -1 });

// Method to check if OTP is expired
otpSchema.methods.isExpired = function() {
  return this.expiresAt < new Date();
};

// Method to check if OTP attempts exceeded
otpSchema.methods.isAttemptsExceeded = function() {
  return this.attempts >= 3;
};

// Method to increment attempts
otpSchema.methods.incrementAttempts = async function() {
  this.attempts += 1;
  return this.save();
};

// Static method to cleanup expired OTPs for an email
otpSchema.statics.cleanupExpiredOtps = async function(email) {
  return this.deleteMany({
    email: email.toLowerCase(),
    $or: [
      { expiresAt: { $lt: new Date() } },
      { isUsed: true }
    ]
  });
};

// Static method to find valid OTP
otpSchema.statics.findValidOtp = function(email, otp) {
  return this.findOne({
    email: email.toLowerCase(),
    otp: otp,
    isUsed: false,
    expiresAt: { $gt: new Date() }
  });
};

module.exports = mongoose.model('Otp', otpSchema);
