const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Import routes
const ambassadorRoute = require('./routes/ambassadorRoute');
const careerRoute = require('./routes/careerRoute');
const internshipRoute = require('./routes/internshipRoute');
const adminRoute = require('./routes/adminRoute');

// Import new service routes
const digitalSolutionRoute = require('./routes/digitalSolutionRoute');
const hackathonEventRoute = require('./routes/hackathonEventRoute');
const workWithUsRoute = require('./routes/workWithUsRoute');
const mentorshipRoute = require('./routes/mentorshipRoute');
const careerGuidanceRoute = require('./routes/careerGuidanceRoute');
const freelanceProjectRoute = require('./routes/freelanceProjectRoute');
const internshipOpportunityRoute = require('./routes/internshipOpportunityRoute');
const jobOpportunityRoute = require('./routes/jobOpportunityRoute');

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://internexis-technologies.in',
        'https://www.internexis-technologies.in',
        'https://internexis-frontend.netlify.app',
        'https://internexis-technologies.netlify.app',
        process.env.CORS_ORIGIN
      ].filter(Boolean)
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/ambassador', ambassadorRoute);
app.use('/api/career', careerRoute);
app.use('/api/internship', internshipRoute);
app.use('/api/admin', adminRoute);

// New service routes
app.use('/api/digital-solutions', digitalSolutionRoute);
app.use('/api/hackathons', hackathonEventRoute);
app.use('/api/work-with-us', workWithUsRoute);
app.use('/api/mentorship', mentorshipRoute);
app.use('/api/career-guidance', careerGuidanceRoute);
app.use('/api/freelance-projects', freelanceProjectRoute);
app.use('/api/internships', internshipOpportunityRoute);
app.use('/api/jobs', jobOpportunityRoute);

// Root endpoint - API info
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Internexis Backend API is running!',
    version: '2.0.0',
    frontend: process.env.NODE_ENV === 'production' 
      ? 'https://internexis-technologies.in'
      : 'http://localhost:5173',
    endpoints: {
      // Original endpoints
      ambassador: '/api/ambassador',
      career: '/api/career',
      internship: '/api/internship',
      admin: '/api/admin',
      health: '/health',
      
      // New service endpoints
      digitalSolutions: '/api/digital-solutions',
      hackathons: '/api/hackathons',
      workWithUs: '/api/work-with-us',
      mentorship: '/api/mentorship',
      careerGuidance: '/api/career-guidance',
      freelanceProjects: '/api/freelance-projects',
      internshipOpportunities: '/api/internships',
      jobOpportunities: '/api/jobs'
    },
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI or MONGO_URI environment variable is not defined');
    }    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB connected successfully');
    
    // Log database name
    console.log('📊 Connected to database:', mongoose.connection.db.databaseName);
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('⏹️ Shutting down server...');
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = app;
