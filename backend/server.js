const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Import routes
const ambassadorRoute = require('./routes/ambassadorRouteNew');
const careerRoute = require('./routes/careerRoute');
const internshipRoute = require('./routes/internshipRoute');
const adminRoute = require('./routes/adminRouteNew');

// Import new service routes
const digitalSolutionRoute = require('./routes/digitalSolutionRoute');
const hackathonEventRoute = require('./routes/hackathonEventRoute');
const workWithUsRoute = require('./routes/workWithUsRoute');
const mentorshipRoute = require('./routes/mentorshipRoute');
const careerGuidanceRoute = require('./routes/careerGuidanceRoute');
const freelanceProjectRoute = require('./routes/freelanceProjectRoute');
const internshipOpportunityRoute = require('./routes/internshipOpportunityRoute');
const jobOpportunityRoute = require('./routes/jobOpportunityRoute');

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// CORS middleware
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
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(bodyParser.json({ 
  limit: process.env.MAX_FILE_SIZE || '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(bodyParser.urlencoded({ 
  extended: true, 
  limit: process.env.MAX_FILE_SIZE || '10mb' 
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Request timing middleware
app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

// Response time logging
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    const responseTime = Date.now() - req.startTime;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${responseTime}ms`);
    originalSend.call(this, data);
  };
  next();
});

// MongoDB connection
const dbManager = require('./utils/database');
const { errorHandler, notFound, healthCheck } = require('./utils/middleware');

// Health check endpoint (enhanced)
app.get('/health', healthCheck);

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

// 404 handler for API routes
app.use('/api/*', notFound);

// Global error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await dbManager.connect();
    dbManager.setupEventHandlers();
    
    // Start HTTP server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
      console.log(`� API Documentation: http://localhost:${PORT}/`);
    });

    // Handle server errors
    server.on('error', (error) => {
      console.error('❌ Server error:', error);
      process.exit(1);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n📤 Received ${signal}. Graceful shutdown initiated...`);
      server.close(() => {
        console.log('✅ HTTP server closed');
        dbManager.gracefulShutdown(signal);
      });
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
