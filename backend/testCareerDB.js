const mongoose = require('mongoose');
const Career = require('./models/CareerModel');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

async function testCareerDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');
    
    // Test career applications
    const careerCount = await Career.countDocuments();
    console.log('Total career applications in database:', careerCount);
    
    const recentCareers = await Career.find().sort({ submittedAt: -1 }).limit(5);
    console.log('Recent career applications:');
    recentCareers.forEach((career, index) => {
      console.log(`${index + 1}. ${career.name} - ${career.email} - ${career.position} (${career.submittedAt})`);
    });
    
    // Test creating a new career application
    console.log('\nTesting career application creation...');
    const testCareer = new Career({
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      position: 'Software Engineer',
      resumeLink: 'https://example.com/resume.pdf'
    });
    
    const savedCareer = await testCareer.save();
    console.log('Test career application created:', savedCareer._id);
    
    // Delete the test record
    await Career.findByIdAndDelete(savedCareer._id);
    console.log('Test career application deleted');
    
  } catch (error) {
    console.error('Database test error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

testCareerDB();
