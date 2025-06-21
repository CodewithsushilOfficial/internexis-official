const axios = require('axios');

const BACKEND_URL = 'https://internexis-official.onrender.com';

// Add unique career applications
const newCareerData = [
  {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@new.com",
    phone: "+919876543301",
    position: "Software Engineer",
    experience: "1-3",
    resumeLink: "https://example.com/rajesh-resume.pdf"
  },
  {
    name: "Sunita Agarwal",
    email: "sunita.agarwal@fresh.com",
    phone: "+919876543302", 
    position: "Data Scientist",
    experience: "3-5",
    resumeLink: "https://example.com/sunita-resume.pdf"
  },
  {
    name: "Deepak Singh",
    email: "deepak.singh@new.tech.com",
    phone: "+919876543303",
    position: "Full Stack Developer", 
    experience: "3-5",
    resumeLink: "https://example.com/deepak-resume.pdf"
  },
  {
    name: "Neha Gupta",
    email: "neha.gupta@design.fresh.com",
    phone: "+919876543304",
    position: "UI/UX Designer", 
    experience: "1-3",
    resumeLink: "https://example.com/neha-resume.pdf"
  }
];

const newInternshipData = [
  {
    name: "Arjun Rao",
    email: "arjun.rao@newstudent.edu",
    phone: "+919876543401",
    college: "Chennai University",
    year: "3rd Year",
    domain: "AI/ML",
    duration: "3 Months"
  },
  {
    name: "Shreya Das",
    email: "shreya.das@fresh.college.ac.in",
    phone: "+919876543402",
    college: "Hyderabad University",
    year: "2nd Year",
    domain: "Web Development",
    duration: "3 Months"
  },
  {
    name: "Varun Malhotra",
    email: "varun.malhotra@newuni.edu",
    phone: "+919876543403",
    college: "Jaipur University",
    year: "4th Year", 
    domain: "Mobile Development",
    duration: "6 Months"
  }
];

async function submitApplication(endpoint, data) {
  try {
    const response = await axios.post(`${BACKEND_URL}${endpoint}`, data, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || error.message 
    };
  }
}

async function addMoreData() {
  console.log('🚀 Adding more sample data...');
  
  // Submit career applications  
  console.log('\n💼 Submitting additional Career applications...');
  for (const [index, data] of newCareerData.entries()) {
    const result = await submitApplication('/api/career', data);
    if (result.success) {
      console.log(`✅ Career ${index + 1}: ${data.name}`);
    } else {
      console.log(`❌ Career ${index + 1} failed: ${result.error}`);
    }
  }

  // Submit internship applications
  console.log('\n🎓 Submitting additional Internship applications...');
  for (const [index, data] of newInternshipData.entries()) {
    const result = await submitApplication('/api/internship', data);
    if (result.success) {
      console.log(`✅ Internship ${index + 1}: ${data.name}`);
    } else {
      console.log(`❌ Internship ${index + 1} failed: ${result.error}`);
    }
  }

  // Check final stats
  console.log('\n📊 Checking final statistics...');
  try {
    const response = await axios.get(`${BACKEND_URL}/api/admin/dashboard/stats`);
    console.log('✅ Final stats:', response.data.data);
  } catch (error) {
    console.log('❌ Failed to get stats:', error.message);
  }

  console.log('\n🎉 Additional data added successfully!');
}

addMoreData();
