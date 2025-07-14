const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Admin name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    default: 'admin',
    enum: {
      values: ['admin', 'super_admin', 'moderator'],
      message: 'Role must be either admin, super_admin, or moderator'
    }
  },
  permissions: [{
    type: String,
    enum: [
      'read_ambassadors', 'write_ambassadors', 'delete_ambassadors',
      'read_careers', 'write_careers', 'delete_careers',
      'read_internships', 'write_internships', 'delete_internships',
      'read_digital_solutions', 'write_digital_solutions', 'delete_digital_solutions',
      'read_hackathons', 'write_hackathons', 'delete_hackathons',
      'read_work_with_us', 'write_work_with_us', 'delete_work_with_us',
      'read_mentorship', 'write_mentorship', 'delete_mentorship',
      'read_career_guidance', 'write_career_guidance', 'delete_career_guidance',
      'read_freelance_projects', 'write_freelance_projects', 'delete_freelance_projects',
      'manage_admins', 'view_analytics', 'export_data'
    ]
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  loginAttempts: {
    type: Number,
    default: 0,
    select: false
  },
  lockUntil: {
    type: Date,
    select: false
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  resetPasswordToken: {
    type: String,
    select: false
  },
  resetPasswordExpires: {
    type: Date,
    select: false
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    select: false
  },
  profileImage: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please provide a valid phone number']
  },
  department: {
    type: String,
    trim: true,
    maxlength: [50, 'Department cannot exceed 50 characters']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
adminSchema.index({ role: 1 });
adminSchema.index({ isActive: 1 });
adminSchema.index({ lastLogin: -1 });

// Virtual for account lock status
adminSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
adminSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to set default permissions based on role
adminSchema.pre('save', function(next) {
  if (this.isModified('role') || this.isNew) {
    switch (this.role) {
      case 'super_admin':
        this.permissions = [
          'read_ambassadors', 'write_ambassadors', 'delete_ambassadors',
          'read_careers', 'write_careers', 'delete_careers',
          'read_internships', 'write_internships', 'delete_internships',
          'read_digital_solutions', 'write_digital_solutions', 'delete_digital_solutions',
          'read_hackathons', 'write_hackathons', 'delete_hackathons',
          'read_work_with_us', 'write_work_with_us', 'delete_work_with_us',
          'read_mentorship', 'write_mentorship', 'delete_mentorship',
          'read_career_guidance', 'write_career_guidance', 'delete_career_guidance',
          'read_freelance_projects', 'write_freelance_projects', 'delete_freelance_projects',
          'manage_admins', 'view_analytics', 'export_data'
        ];
        break;
      case 'admin':
        this.permissions = [
          'read_ambassadors', 'write_ambassadors',
          'read_careers', 'write_careers',
          'read_internships', 'write_internships',
          'read_digital_solutions', 'write_digital_solutions',
          'read_hackathons', 'write_hackathons',
          'read_work_with_us', 'write_work_with_us',
          'read_mentorship', 'write_mentorship',
          'read_career_guidance', 'write_career_guidance',
          'read_freelance_projects', 'write_freelance_projects',
          'view_analytics'
        ];
        break;
      case 'moderator':
        this.permissions = [
          'read_ambassadors', 'read_careers', 'read_internships',
          'read_digital_solutions', 'read_hackathons', 'read_work_with_us',
          'read_mentorship', 'read_career_guidance', 'read_freelance_projects'
        ];
        break;
      default:
        this.permissions = [];
    }
  }
  next();
});

// Method to check if account is locked
adminSchema.methods.isAccountLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Method to increment login attempts
adminSchema.methods.incrementLoginAttempts = async function() {
  const maxAttempts = 5;
  const lockTime = 2 * 60 * 60 * 1000; // 2 hours

  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // If we have max attempts, lock the account
  if (this.loginAttempts + 1 >= maxAttempts && (!this.lockUntil || this.lockUntil < Date.now())) {
    updates.$set = {
      lockUntil: Date.now() + lockTime
    };
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
adminSchema.methods.resetLoginAttempts = async function() {
  const updates = {
    $unset: { loginAttempts: 1, lockUntil: 1 },
    $set: { lastLogin: new Date() }
  };
  
  return this.updateOne(updates);
};

// Method to check if admin has permission
adminSchema.methods.hasPermission = function(permission) {
  return this.permissions.includes(permission);
};

// Method to compare password
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if password was changed after token was issued
adminSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Static method to find admin by email and include password
adminSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() }).select('+password +loginAttempts +lockUntil');
};

module.exports = mongoose.model('Admin', adminSchema);
