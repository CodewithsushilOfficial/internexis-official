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
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    match: [/^[\+]?[0-9\s\-\(\)]{10,15}$/, 'Please enter a valid phone number']
  },
  alternatePhone: {
    type: String,
    trim: true,
    match: [/^[\+]?[0-9\s\-\(\)]{10,15}$/, 'Please enter a valid alternate phone number']
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
    maxlength: [100, 'Course cannot exceed 100 characters']
  },
  branch: {
    type: String,
    trim: true,
    maxlength: [100, 'Branch cannot exceed 100 characters']
  },
  year: {
    type: String,
    required: [true, 'Academic year is required'],
    enum: {
      values: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Post Graduate', 'PhD'],
      message: 'Please select a valid academic year'
    }
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
    maxlength: [50, 'City cannot exceed 50 characters']
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
    maxlength: [50, 'State cannot exceed 50 characters']
  },
  country: {
    type: String,
    trim: true,
    default: 'India',
    maxlength: [50, 'Country cannot exceed 50 characters']
  },
  whyYouWantToJoin: {
    type: String,
    required: [true, 'Please explain why you want to join'],
    trim: true,
    minlength: [50, 'Explanation must be at least 50 characters'],
    maxlength: [2000, 'Explanation cannot exceed 2000 characters']
  },
  previousExperience: {
    type: String,
    trim: true,
    maxlength: [1000, 'Previous experience cannot exceed 1000 characters']
  },
  skills: [{
    type: String,
    trim: true,
    maxlength: [50, 'Each skill cannot exceed 50 characters']
  }],
  socialMedia: {
    linkedin: { type: String, trim: true },
    instagram: { type: String, trim: true },
    twitter: { type: String, trim: true },
    github: { type: String, trim: true }
  },
  referralCode: {
    type: String,
    trim: true,
    uppercase: true
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'under_review', 'interview_scheduled', 'interview_completed', 'accepted', 'rejected', 'on_hold'],
      message: 'Invalid status'
    },
    default: 'pending'
  },
  statusHistory: [{
    status: {
      type: String,
      required: true
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    changedAt: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters']
    }
  }],
  ambassadorId: {
    type: String,
    unique: true,
    sparse: true,
    uppercase: true
  },
  assignedRegion: {
    type: String,
    trim: true,
    maxlength: [100, 'Region cannot exceed 100 characters']
  },
  ambassadorLevel: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum']
  },
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
ambassadorSchema.index({ createdAt: -1 });
ambassadorSchema.index({ college: 1 });
ambassadorSchema.index({ city: 1, state: 1 });
ambassadorSchema.index({ isActive: 1 });

// Virtual for application age
ambassadorSchema.virtual('applicationAge').get(function() {
  const now = new Date();
  const created = this.createdAt;
  const diffTime = Math.abs(now - created);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual for submitted at (for backward compatibility)
ambassadorSchema.virtual('submittedAt').get(function() {
  return this.createdAt;
});

// Method to update status with history
ambassadorSchema.methods.updateStatus = async function(newStatus, changedBy, notes) {
  const oldStatus = this.status;
  
  // Add to status history
  this.statusHistory.push({
    status: newStatus,
    changedBy,
    notes,
    changedAt: new Date()
  });
  
  // Update current status
  this.status = newStatus;
  this.lastActivity = new Date();
  
  // Generate ambassador ID if accepted
  if (newStatus === 'accepted' && !this.ambassadorId) {
    const count = await this.constructor.countDocuments({ status: 'accepted' });
    this.ambassadorId = `IA${String(count + 1).padStart(4, '0')}`;
  }
  
  await this.save();
  return this;
};

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
  
  const statusCounts = {};
  stats.forEach(stat => {
    statusCounts[stat._id] = stat.count;
  });
  
  const totalApplications = await this.countDocuments();
  const acceptedApplications = statusCounts.accepted || 0;
  const pendingApplications = statusCounts.pending || 0;
  const rejectedApplications = statusCounts.rejected || 0;
  
  // Get recent applications (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentApplications = await this.countDocuments({ 
    createdAt: { $gte: weekAgo } 
  });
  
  // Get top colleges
  const topColleges = await this.aggregate([
    { $group: { _id: '$college', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
  
  return {
    totalApplications,
    statusBreakdown: statusCounts,
    acceptanceRate: totalApplications > 0 ? ((acceptedApplications / totalApplications) * 100).toFixed(2) : 0,
    recentApplications,
    topColleges
  };
};

module.exports = mongoose.model('Ambassador', ambassadorSchema);
