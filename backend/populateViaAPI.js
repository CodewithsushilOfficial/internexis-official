const axios = require('axios');

const BACKEND_URL = 'https://internexis-official.onrender.com';

// Sample data for different application types
const ambassadorData = [
  {
    name: "Arjun Sharma",
    email: "arjun.sharma@gmail.com",
    phone: "+919876543210",
    college: "Indian Institute of Technology, Delhi",
    whyYouWantToJoin: "I am passionate about connecting students with career opportunities and want to represent Internexis on my campus."
  },
  {
    name: "Priya Patel", 
    email: "priya.patel@email.com",
    phone: "+919876543211",
    college: "Nirma University, Ahmedabad",
    whyYouWantToJoin: "I believe in the mission of Internexis and want to help fellow students discover amazing internship opportunities."
  },
  {
    name: "Rohit Kumar",
    email: "rohit.kumar@student.ac.in", 
    phone: "+919876543212",
    college: "Manipal Institute of Technology",
    whyYouWantToJoin: "I have strong leadership skills and have organized multiple tech events on campus."
  },
  {
    name: "Meera Yadav",
    email: "meera.yadav@college.edu",
    phone: "+919876543219",
    college: "Bangalore University",
    whyYouWantToJoin: "I want to bridge the gap between students and industry by promoting Internexis programs."
  },
  {
    name: "Karan Singh",
    email: "karan.singh@university.ac.in",
    phone: "+919876543220",
    college: "Punjab University",
    whyYouWantToJoin: "I am enthusiastic about helping my peers find meaningful career opportunities through Internexis."
  }
];

const careerData = [
  {
    name: "Anita Singh",
    email: "anita.singh@gmail.com",
    phone: "+919876543213",
    position: "Software Engineer",
    experience: "2 years",
    resumeLink: "https://example.com/resume1.pdf"
  },
  {
    name: "Vikram Gupta",
    email: "vikram.gupta@email.com",
    phone: "+919876543214", 
    position: "Data Scientist",
    experience: "3 years",
    resumeLink: "https://example.com/resume2.pdf"
  },
  {
    name: "Sneha Reddy",
    email: "sneha.reddy@company.com",
    phone: "+919876543215",
    position: "UI/UX Designer", 
    experience: "1.5 years",
    resumeLink: "https://example.com/resume3.pdf"
  },
  {
    name: "Amit Verma",
    email: "amit.verma@tech.com",
    phone: "+919876543221",
    position: "Full Stack Developer", 
    experience: "4 years",
    resumeLink: "https://example.com/resume4.pdf"
  },
  {
    name: "Pooja Sharma",
    email: "pooja.sharma@design.com",
    phone: "+919876543222",
    position: "Product Manager", 
    experience: "5 years",
    resumeLink: "https://example.com/resume5.pdf"
  }
];

const internshipData = [
  {
    name: "Rahul Sharma",
    email: "rahul.sharma@student.edu",
    phone: "+919876543216",
    college: "Delhi University",
    year: "3rd Year",
    domain: "Web Development",
    duration: "3 months"
  },
  {
    name: "Kavya Nair",
    email: "kavya.nair@college.ac.in",
    phone: "+919876543217",
    college: "Kerala University",
    year: "2nd Year",
    domain: "Mobile App Development",
    duration: "6 months"
  },
  {
    name: "Aman Joshi",
    email: "aman.joshi@university.edu",
    phone: "+919876543218",
    college: "Mumbai University",
    year: "4th Year", 
    domain: "Data Science",
    duration: "4 months"
  },
  {
    name: "Riya Patel",
    email: "riya.patel@student.ac.in",
    phone: "+919876543223",
    college: "Gujarat University",
    year: "3rd Year", 
    domain: "Artificial Intelligence",
    duration: "5 months"
  },
  {
    name: "Siddharth Roy",
    email: "siddharth.roy@college.edu",
    phone: "+919876543224",
    college: "Kolkata University",
    year: "2nd Year", 
    domain: "Cybersecurity",
    duration: "3 months"
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

async function populateProductionViaAPI() {
  console.log('🚀 Populating production database via API...');
  console.log(`📡 Backend URL: ${BACKEND_URL}\n`);
  // Submit ambassador applications
  console.log('👥 Submitting Campus Ambassador applications...');
  for (const [index, data] of ambassadorData.entries()) {
    const result = await submitApplication('/api/ambassador', data);
    if (result.success) {
      console.log(`✅ Ambassador ${index + 1}: ${data.name}`);
    } else {
      console.log(`❌ Ambassador ${index + 1} failed: ${result.error}`);
    }
  }

  // Submit career applications  
  console.log('\n💼 Submitting Career applications...');
  for (const [index, data] of careerData.entries()) {
    const result = await submitApplication('/api/career', data);
    if (result.success) {
      console.log(`✅ Career ${index + 1}: ${data.name}`);
    } else {
      console.log(`❌ Career ${index + 1} failed: ${result.error}`);
    }
  }

  // Submit internship applications
  console.log('\n🎓 Submitting Internship applications...');
  for (const [index, data] of internshipData.entries()) {
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

  console.log('\n🎉 Production database population completed!');
}

populateProductionViaAPI();
