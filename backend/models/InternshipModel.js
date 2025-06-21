const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  domain: {
    type: String,
    required: [true, 'Domain is required'],
    trim: true,
    enum: ['Web Development', 'Mobile Development', 'Data Science', 'AI/ML', 'UI/UX Design', 'Digital Marketing', 'Content Writing', 'Other'],
    maxlength: [100, 'Domain cannot exceed 100 characters']
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    maxlength: [200, 'College name cannot exceed 200 characters']
  },
  year: {
    type: String,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'],
    default: '1st Year'
  },
  duration: {
    type: String,
    enum: ['1 Month', '2 Months', '3 Months', '6 Months'],
    default: '1 Month'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  }
});

// Add indexes for better query performance
internshipSchema.index({ email: 1 });
internshipSchema.index({ domain: 1 });
internshipSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('Internship', internshipSchema);
