const axios = require('axios');

// Test data that matches the frontend form submission
const testData = {
  name: "John Doe",
  email: "john.doe@example.com", 
  phone: "+1234567890",
  college: "Test University",
  whyYouWantToJoin: "I want to join because I am passionate about technology and want to help other students."
};

async function testAmbassadorSubmission() {
  try {
    console.log('Testing ambassador form submission...');
    console.log('Data being sent:', testData);
    
    const response = await axios.post('http://localhost:5000/api/ambassador', testData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ Success!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.log('❌ Error occurred:');
    
    if (error.response) {
      // Server responded with error status
      console.log('Status:', error.response.status);
      console.log('Error data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.log('Network error - no response received');
      console.log('Request details:', error.request);
    } else {
      // Other error
      console.log('Error message:', error.message);
    }
  }
}

// Run the test
testAmbassadorSubmission();
