const mongoose = require('mongoose');

const ambassadorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  alternatePhone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid alternate phone number']
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    maxlength: [200, 'College name cannot exceed 200 characters']
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true,
    maxlength: [100, 'Course name cannot exceed 100 characters']
  },
  year: {
    type: String,
    required: [true, 'Academic year is required'],
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Post Graduate', 'PhD'],
    trim: true
  },
  branch: {
    type: String,
    trim: true,
    maxlength: [100, 'Branch cannot exceed 100 characters']
  },
  cgpa: {
    type: Number,
    min: [0, 'CGPA cannot be negative'],
    max: [10, 'CGPA cannot exceed 10']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [50, 'City name cannot exceed 50 characters']
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
    maxlength: [50, 'State name cannot exceed 50 characters']
  },
  country: {
    type: String,
    default: 'India',
    trim: true,
    maxlength: [50, 'Country name cannot exceed 50 characters']
  },
  whyYouWantToJoin: {
    type: String,
    required: [true, 'Please explain why you want to join'],
    trim: true,
    minlength: [50, 'Explanation must be at least 50 characters'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  previousExperience: {
    type: String,
    trim: true,
    maxlength: [1000, 'Previous experience cannot exceed 1000 characters']
  },
  skills: [{
    type: String,
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  }],
  socialMedia: {
    linkedin: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?linkedin\.com\/.*$/, 'Please enter a valid LinkedIn URL']
    },
    instagram: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?instagram\.com\/.*$/, 'Please enter a valid Instagram URL']
    },
    twitter: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.*$/, 'Please enter a valid Twitter/X URL']
    },
    github: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?github\.com\/.*$/, 'Please enter a valid GitHub URL']
    }
  },
  referralCode: {
    type: String,
    trim: true,
    uppercase: true,
    maxlength: [20, 'Referral code cannot exceed 20 characters']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'under_review', 'interview_scheduled', 'interview_completed', 'accepted', 'rejected', 'on_hold'],
      message: 'Status must be one of: pending, under_review, interview_scheduled, interview_completed, accepted, rejected, on_hold'
    },
    default: 'pending'
  },
  statusHistory: [{
    status: {
      type: String,
      required: true
    },
    changedAt: {
      type: Date,
      default: Date.now
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters']
    }
  }],
  reviewNotes: {
    type: String,
    maxlength: [1000, 'Review notes cannot exceed 1000 characters']
  },
  interviewDate: {
    type: Date
  },
  interviewNotes: {
    type: String,
    maxlength: [1000, 'Interview notes cannot exceed 1000 characters']
  },
  ambassadorId: {
    type: String,
    unique: true,
    sparse: true // Only unique if not null
  },
  assignedRegion: {
    type: String,
    trim: true,
    maxlength: [100, 'Region cannot exceed 100 characters']
  },
  ambassadorLevel: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    default: 'Bronze'
  },
  performanceMetrics: {
    studentsReferred: {
      type: Number,
      default: 0,
      min: 0
    },
    eventsOrganized: {
      type: Number,
      default: 0,
      min: 0
    },
    socialMediaReach: {
      type: Number,
      default: 0,
      min: 0
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    }
  },
  documents: {
    resume: {
      type: String,
      trim: true
    },
    idProof: {
      type: String,
      trim: true
    },
    collegeId: {
      type: String,
      trim: true
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
ambassadorSchema.index({ phone: 1 });
ambassadorSchema.index({ status: 1 });
ambassadorSchema.index({ submittedAt: -1 });
ambassadorSchema.index({ college: 1 });
ambassadorSchema.index({ city: 1, state: 1 });
ambassadorSchema.index({ isActive: 1 });

// Virtual for full address
ambassadorSchema.virtual('fullAddress').get(function() {
  return `${this.city}, ${this.state}, ${this.country}`;
});

// Virtual for full name with college
ambassadorSchema.virtual('displayName').get(function() {
  return `${this.name} (${this.college})`;
});

// Virtual for application age
ambassadorSchema.virtual('applicationAge').get(function() {
  const now = new Date();
  const submitted = new Date(this.submittedAt);
  const diffTime = Math.abs(now - submitted);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Pre-save middleware to generate ambassador ID
ambassadorSchema.pre('save', async function(next) {
  if (this.status === 'accepted' && !this.ambassadorId) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments({ 
      status: 'accepted',
      ambassadorId: { $exists: true }
    });
    this.ambassadorId = `AMB${year}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Pre-save middleware to update status history
ambassadorSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      changedAt: new Date()
    });
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
  
  const totalStats = await this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        totalThisMonth: {
          $sum: {
            $cond: [
              {
                $gte: ['$submittedAt', new Date(new Date().getFullYear(), new Date().getMonth(), 1)]
              },
              1, 0
            ]
          }
        }
      }
    }
  ]);

  return {
    byStatus: stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {}),
    total: totalStats[0]?.total || 0,
    thisMonth: totalStats[0]?.totalThisMonth || 0
  };
};

// Instance method to update status with history
ambassadorSchema.methods.updateStatus = function(newStatus, adminId, notes) {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    changedBy: adminId,
    notes,
    changedAt: new Date()
  });
  return this.save();
};

module.exports = mongoose.model('Ambassador', ambassadorSchema);
