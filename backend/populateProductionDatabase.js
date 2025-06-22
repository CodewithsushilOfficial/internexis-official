const mongoose = require('mongoose');
const Ambassador = require('./models/AmbassadorModel');
const Career = require('./models/CareerModel');
const Internship = require('./models/InternshipModel');
const Admin = require('./models/AdminModel');

// Load environment variables
require('dotenv').config();

// Production MongoDB URI - same as in your backend
const PRODUCTION_MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

// Database connection
const connectDB = async () => {
  try {
    if (!PRODUCTION_MONGO_URI) {
      throw new Error('MONGODB_URI or MONGO_URI environment variable is not set');
    }
    
    await mongoose.connect(PRODUCTION_MONGO_URI);
    console.log('✅ Connected to production MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample Campus Ambassador Applications Data
const ambassadorData = [
  {
    name: "Arjun Sharma",
    email: "arjun.sharma@gmail.com",
    phone: "+919876543210",
    college: "Indian Institute of Technology, Delhi",
    whyYouWantToJoin: "I am passionate about connecting students with career opportunities and want to represent Internexis on my campus. I have strong leadership skills and have organized multiple tech events.",
    status: "pending"
  },
  {
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+919876543211",
    college: "Nirma University, Ahmedabad",
    whyYouWantToJoin: "I believe in the mission of Internexis and want to help fellow students discover amazing internship opportunities. I am active in student committees and have good networking skills.",
    status: "reviewed"
  },
  {
    name: "Rohit Kumar",
    email: "rohit.kumar@student.ac.in",
    phone: "+919876543212",
    college: "Manipal Institute of Technology",
    whyYouWantToJoin: "As a computer science student, I understand the importance of internships. I want to be a bridge between Internexis and students, helping them find the right opportunities for their career growth.",
    status: "accepted"
  },
  {
    name: "Ananya Singh",
    email: "ananya.singh@gmail.com",
    phone: "+919876543213",
    college: "Vellore Institute of Technology",
    whyYouWantToJoin: "I have been actively involved in placement activities at my college and want to extend this passion to representing Internexis. I believe I can effectively communicate the value proposition to students.",
    status: "pending"
  },
  {
    name: "Karthik Reddy",
    email: "karthik.reddy@email.com",
    phone: "+919876543214",
    college: "BITS Pilani, Hyderabad",
    whyYouWantToJoin: "I am enthusiastic about creating awareness about internship opportunities among students. My previous experience in event management and student outreach makes me a suitable candidate.",
    status: "reviewed"
  },
  {
    name: "Sneha Agarwal",
    email: "sneha.agarwal@student.edu",
    phone: "+919876543215",
    college: "Delhi Technological University",
    whyYouWantToJoin: "I want to help bridge the gap between academia and industry by promoting internships. I have strong communication skills and am well-connected with student communities.",
    status: "pending"
  },
  {
    name: "Vikram Joshi",
    email: "vikram.joshi@gmail.com",
    phone: "+919876543216",
    college: "Pune Institute of Computer Technology",
    whyYouWantToJoin: "I am passionate about career development and want to help students discover opportunities that align with their skills and interests. I have experience in organizing career fairs.",
    status: "accepted"
  },
  {
    name: "Divya Menon",
    email: "divya.menon@email.com",
    phone: "+919876543217",
    college: "National Institute of Technology, Calicut",
    whyYouWantToJoin: "I believe every student deserves access to quality internship opportunities. I want to represent Internexis and ensure that students on my campus are aware of these opportunities.",
    status: "pending"
  },
  {
    name: "Aditya Gupta",
    email: "aditya.gupta@student.ac.in",
    phone: "+919876543218",
    college: "Jaypee Institute of Information Technology",
    whyYouWantToJoin: "I am motivated by the opportunity to help fellow students kickstart their careers. I have good interpersonal skills and understand the challenges students face in finding internships.",
    status: "reviewed"
  },
  {
    name: "Nisha Verma",
    email: "nisha.verma@gmail.com",
    phone: "+919876543219",
    college: "Symbiosis Institute of Technology",
    whyYouWantToJoin: "I want to make a meaningful impact on students' career journeys by promoting Internexis on my campus. I am enthusiastic, responsible, and committed to helping others succeed.",
    status: "pending"
  }
];

// Sample Career Applications Data
const careerData = [
  {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@professional.com",
    phone: "+919876543220",
    position: "Software Developer",
    resumeLink: "https://drive.google.com/file/d/1abc123/view",
    experience: "1-3",
    status: "pending"
  },
  {
    name: "Meera Krishnan",
    email: "meera.krishnan@gmail.com",
    phone: "+919876543221",
    position: "Data Scientist",
    resumeLink: "https://drive.google.com/file/d/1def456/view",
    experience: "3-5",
    status: "shortlisted"
  },
  {
    name: "Sanjay Gupta",
    email: "sanjay.gupta@email.com",
    phone: "+919876543222",
    position: "Product Manager",
    resumeLink: "https://drive.google.com/file/d/1ghi789/view",
    experience: "5-10",
    status: "interviewed"
  },
  {
    name: "Lakshmi Nair",
    email: "lakshmi.nair@professional.com",
    phone: "+919876543223",
    position: "UI/UX Designer",
    resumeLink: "https://drive.google.com/file/d/1jkl012/view",
    experience: "1-3",
    status: "pending"
  },
  {
    name: "Amit Singh",
    email: "amit.singh@gmail.com",
    phone: "+919876543224",
    position: "DevOps Engineer",
    resumeLink: "https://drive.google.com/file/d/1mno345/view",
    experience: "3-5",
    status: "reviewed"
  },
  {
    name: "Pooja Sharma",
    email: "pooja.sharma@email.com",
    phone: "+919876543225",
    position: "Digital Marketing Manager",
    resumeLink: "https://drive.google.com/file/d/1pqr678/view",
    experience: "1-3",
    status: "hired"
  },
  {
    name: "Naveen Reddy",
    email: "naveen.reddy@professional.com",
    phone: "+919876543226",
    position: "Full Stack Developer",
    resumeLink: "https://drive.google.com/file/d/1stu901/view",
    experience: "1-3",
    status: "pending"
  },
  {
    name: "Kavya Iyer",
    email: "kavya.iyer@gmail.com",
    phone: "+919876543227",
    position: "Business Analyst",
    resumeLink: "https://drive.google.com/file/d/1vwx234/view",
    experience: "0-1",
    status: "rejected"
  },
  {
    name: "Ravi Teja",
    email: "ravi.teja@email.com",
    phone: "+919876543228",
    position: "Machine Learning Engineer",
    resumeLink: "https://drive.google.com/file/d/1yza567/view",
    experience: "3-5",
    status: "shortlisted"
  },
  {
    name: "Shruti Agarwal",
    email: "shruti.agarwal@professional.com",
    phone: "+919876543229",
    position: "Content Writer",
    resumeLink: "https://drive.google.com/file/d/1bcd890/view",
    experience: "1-3",
    status: "pending"
  }
];

// Sample Internship Applications Data
const internshipData = [
  {
    name: "Aarav Patel",
    email: "aarav.patel@student.edu",
    phone: "+919876543230",
    domain: "Web Development",
    college: "Indian Institute of Technology, Bombay",
    year: "3rd Year",
    duration: "3 Months",
    status: "pending"
  },
  {
    name: "Isha Sharma",
    email: "isha.sharma@gmail.com",
    phone: "+919876543231",
    domain: "Data Science",
    college: "Delhi University",
    year: "4th Year",
    duration: "6 Months",
    status: "accepted"
  },
  {
    name: "Aryan Kumar",
    email: "aryan.kumar@student.ac.in",
    phone: "+919876543232",
    domain: "Mobile Development",
    college: "Birla Institute of Technology and Science",
    year: "2nd Year",
    duration: "2 Months",
    status: "reviewed"
  },
  {
    name: "Avni Singh",
    email: "avni.singh@email.com",
    phone: "+919876543233",
    domain: "UI/UX Design",
    college: "National Institute of Design",
    year: "3rd Year",
    duration: "3 Months",
    status: "pending"
  },
  {
    name: "Kartik Jain",
    email: "kartik.jain@student.edu",
    phone: "+919876543234",
    domain: "AI/ML",
    college: "Indian Institute of Science",
    year: "4th Year",
    duration: "6 Months",
    status: "completed"
  },
  {
    name: "Riya Gupta",
    email: "riya.gupta@gmail.com",
    phone: "+919876543235",
    domain: "Digital Marketing",
    college: "Symbiosis Institute of Media & Communication",
    year: "2nd Year",
    duration: "2 Months",
    status: "pending"
  },
  {
    name: "Harsh Agarwal",
    email: "harsh.agarwal@student.ac.in",
    phone: "+919876543236",
    domain: "Web Development",
    college: "Jadavpur University",
    year: "3rd Year",
    duration: "3 Months",
    status: "rejected"
  },
  {
    name: "Anshika Verma",
    email: "anshika.verma@email.com",
    phone: "+919876543237",
    domain: "Content Writing",
    college: "Jamia Millia Islamia",
    year: "1st Year",
    duration: "1 Month",
    status: "pending"
  },
  {
    name: "Yash Mehta",
    email: "yash.mehta@student.edu",
    phone: "+919876543238",
    domain: "Data Science",
    college: "Indian Statistical Institute",
    year: "4th Year",
    duration: "6 Months",
    status: "accepted"
  },
  {
    name: "Tanya Joshi",
    email: "tanya.joshi@gmail.com",
    phone: "+919876543239",
    domain: "UI/UX Design",
    college: "Pearl Academy",
    year: "2nd Year",
    duration: "2 Months",
    status: "reviewed"
  }
];

// Function to initialize admin
const initializeAdmin = async () => {
  try {
    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@internexis.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'changeThisPassword!';
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log(`✅ Admin already exists with email: ${adminEmail}`);
      return existingAdmin;
    }

    // Warn if using default credentials
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.log('⚠️  WARNING: Using default admin credentials. Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables for production.');
    }

    // Create admin
    const admin = new Admin({
      email: adminEmail,
      password: adminPassword,
      role: 'super_admin',
      isActive: true
    });

    await admin.save();
    console.log(`✅ Admin created successfully with email: ${adminEmail}`);
    return admin;
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    throw error;
  }
};

// Function to populate the database
const populateProductionDatabase = async () => {
  try {
    console.log('🚀 Starting production database population...');
    
    // Initialize admin first
    await initializeAdmin();

    // Check existing data
    const [existingAmbassadors, existingCareers, existingInternships] = await Promise.all([
      Ambassador.countDocuments(),
      Career.countDocuments(),
      Internship.countDocuments()
    ]);

    console.log(`Current data counts:`);
    console.log(`- Ambassadors: ${existingAmbassadors}`);
    console.log(`- Careers: ${existingCareers}`);
    console.log(`- Internships: ${existingInternships}`);

    if (existingAmbassadors === 0) {
      // Insert Ambassador Applications
      const ambassadorResults = await Ambassador.insertMany(ambassadorData);
      console.log(`✅ Inserted ${ambassadorResults.length} Campus Ambassador applications`);
    } else {
      console.log('⏭️ Ambassador applications already exist, skipping');
    }

    if (existingCareers === 0) {
      // Insert Career Applications
      const careerResults = await Career.insertMany(careerData);
      console.log(`✅ Inserted ${careerResults.length} Career applications`);
    } else {
      console.log('⏭️ Career applications already exist, skipping');
    }

    if (existingInternships === 0) {
      // Insert Internship Applications
      const internshipResults = await Internship.insertMany(internshipData);
      console.log(`✅ Inserted ${internshipResults.length} Internship applications`);
    } else {
      console.log('⏭️ Internship applications already exist, skipping');
    }

    // Get final counts
    const [finalAmbassadors, finalCareers, finalInternships] = await Promise.all([
      Ambassador.countDocuments(),
      Career.countDocuments(),
      Internship.countDocuments()
    ]);

    console.log('\n🎉 Production database population completed!');
    console.log(`Final counts:`);
    console.log(`- Campus Ambassadors: ${finalAmbassadors}`);
    console.log(`- Career Applications: ${finalCareers}`);
    console.log(`- Internship Applications: ${finalInternships}`);
    console.log(`- Total Applications: ${finalAmbassadors + finalCareers + finalInternships}`);
    
  } catch (error) {
    console.error('❌ Error populating production database:', error);
    throw error;
  }
};

// Main function
const main = async () => {
  try {    await connectDB();
    await populateProductionDatabase();    console.log('\n✨ Production database is ready!');
    console.log('🔗 Admin login available at the configured admin URL');
    console.log('🔐 Use the configured admin credentials to access the dashboard');
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.log('⚠️  Remember to set ADMIN_EMAIL and ADMIN_PASSWORD environment variables for production!');
    }
  } catch (error) {
    console.error('❌ Script failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📡 Database connection closed');
    process.exit(0);
  }
};

// Run the script
if (require.main === module) {
  main();
}

module.exports = { populateProductionDatabase };
