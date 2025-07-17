const mongoose = require('mongoose');
const validator = require('validator');

const ambassadorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    minlength: [2, 'College name must be at least 2 characters long'],
    maxlength: [200, 'College name cannot exceed 200 characters']
  },
  whyYouWantToJoin: {
    type: String,
    required: [true, 'Please tell us why you want to join'],
    trim: true,
    minlength: [10, 'Please provide at least 10 characters'],
    maxlength: [1000, 'Response cannot exceed 1000 characters']
  },
  year: {
    type: String,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Post Graduate'],
    default: '2nd Year'
  },
  course: {
    type: String,
    trim: true,
    maxlength: [100, 'Course name cannot exceed 100 characters']
  },
  skills: {
    type: [String],
    default: []
  },
  socialMedia: {
    linkedin: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || validator.isURL(v);
        },
        message: 'Please provide a valid LinkedIn URL'
      }
    },
    instagram: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || validator.isURL(v);
        },
        message: 'Please provide a valid Instagram URL'
      }
    }
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: String
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

// Indexes for better query performance
ambassadorSchema.index({ email: 1 });
ambassadorSchema.index({ status: 1 });
ambassadorSchema.index({ submittedAt: -1 });
ambassadorSchema.index({ college: 1 });

// Virtual for application age
ambassadorSchema.virtual('applicationAge').get(function() {
  return Math.floor((Date.now() - this.submittedAt) / (1000 * 60 * 60 * 24));
});

// Pre-save middleware
ambassadorSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status !== 'pending') {
    this.reviewedAt = new Date();
  }
  next();
});

// Static method to get statistics
ambassadorSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const total = await this.countDocuments();
  const thisMonth = await this.countDocuments({
    submittedAt: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    }
  });
  
  return {
    total,
    thisMonth,
    byStatus: stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {})
  };
};

module.exports = mongoose.model('Ambassador', ambassadorSchema);