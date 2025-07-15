import { CampusAmbassadorFormData } from "../services";

// Sample data arrays
const firstNames = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Vihaan",
  "Arjun",
  "Sai",
  "Reyansh",
  "Ayaan",
  "Krishna",
  "Ishaan",
  "Aadhya",
  "Saanvi",
  "Aanya",
  "Diya",
  "Ananya",
  "Isha",
  "Kavya",
  "Priya",
  "Riya",
  "Sneha",
];

const lastNames = [
  "Sharma",
  "Verma",
  "Gupta",
  "Singh",
  "Kumar",
  "Agarwal",
  "Jain",
  "Patel",
  "Shah",
  "Mehta",
  "Malhotra",
  "Sinha",
  "Tiwari",
  "Mishra",
  "Joshi",
  "Nair",
  "Rao",
  "Reddy",
  "Iyer",
  "Bansal",
];

const universities = [
  "Delhi University",
  "Mumbai University",
  "Pune University",
  "Bangalore University",
  "Chennai University",
  "IIT Delhi",
  "IIT Bombay",
  "IIT Kanpur",
  "NIT Trichy",
  "BITS Pilani",
  "VIT Vellore",
  "SRM University",
  "Manipal University",
  "Christ University",
  "NMIMS Mumbai",
  "Amity University",
  "Lovely Professional University",
  "Chandigarh University",
  "Sharda University",
  "Bennett University",
];

const courses = [
  "Computer Science Engineering",
  "Information Technology",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Commerce",
  "Economics",
  "Psychology",
  "Mass Communication",
  "Biotechnology",
  "Chemical Engineering",
  "Electrical Engineering",
  "Aerospace Engineering",
  "Data Science",
  "Artificial Intelligence",
  "Cybersecurity",
  "Digital Marketing",
  "Graphic Design",
  "Fashion Design",
];

const yearOfStudy = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "Final Year",
];

const skills = [
  "Leadership",
  "Communication",
  "Marketing",
  "Social Media Management",
  "Event Planning",
  "Public Speaking",
  "Team Management",
  "Content Creation",
  "Photography",
  "Video Editing",
  "Graphic Design",
  "Web Development",
  "Project Management",
  "Sales",
  "Customer Relations",
  "Creative Writing",
  "Digital Marketing",
  "Brand Management",
  "Network Building",
  "Problem Solving",
];

const availabilityHours = [
  "5-10 hours",
  "10-15 hours",
  "15-20 hours",
  "20+ hours",
];

const referralSources = [
  "Social Media",
  "Friend Referral",
  "University Notice",
  "Website",
  "Email Campaign",
  "Campus Event",
  "Career Fair",
  "LinkedIn",
  "Instagram",
  "WhatsApp Group",
  "Professor Recommendation",
  "Alumni Network",
  "Job Portal",
  "Online Advertisement",
  "College Magazine",
];

const motivations = [
  "I want to make a positive impact on my campus community and help fellow students discover amazing opportunities.",
  "Being a campus ambassador will help me develop leadership skills and build a strong professional network.",
  "I am passionate about connecting students with meaningful internships and career opportunities.",
  "I believe in Internexis mission and want to be part of spreading awareness about your programs.",
  "This role aligns perfectly with my goal of becoming a future leader in the corporate world.",
  "I want to gain hands-on experience in marketing, event management, and student engagement.",
  "I am excited about the opportunity to represent a forward-thinking company like Internexis.",
  "I want to help bridge the gap between academic learning and practical industry experience.",
  "Being a campus ambassador will allow me to contribute to my peers success while growing personally.",
  "I am motivated by the chance to earn while learning and building my professional profile.",
];

const whyInternexis = [
  "Internexis stands out for its commitment to providing quality internships and comprehensive career development programs.",
  "I admire Internexis innovative approach to connecting students with industry professionals and real-world experiences.",
  "The companys focus on holistic development and skill-building makes it the perfect platform for student growth.",
  "Internexis reputation for excellence and its impact on student careers make it an ideal organization to represent.",
  "I appreciate how Internexis goes beyond just placements to focus on overall personality and professional development.",
  "The wide range of opportunities and the supportive community at Internexis make it unique in the industry.",
  "Internexis commitment to student success and its track record of helping students achieve their goals inspire me.",
  "I chose Internexis because of its strong industry connections and the quality of mentorship it provides.",
  "The innovative programs and the emphasis on practical learning at Internexis align with my career aspirations.",
  "Internexis vision of empowering students and creating future leaders resonates strongly with my personal values.",
];

const experiences = [
  "Led a team of 15 students in organizing our college cultural fest, managing budget and coordinating with vendors.",
  "Served as class representative for 2 years, actively participating in student council meetings and representing student concerns.",
  "Organized multiple workshops on career development, attracting over 200 students and industry professionals.",
  "Founded and managed the college entrepreneurship club, hosting startup pitch competitions and networking events.",
  "Worked as a content creator for college social media handles, increasing follower engagement by 150%.",
  "Volunteered for various NGOs, organizing awareness campaigns and fundraising events for social causes.",
  "Completed internships in marketing and business development, gaining practical experience in corporate environments.",
  "Mentored junior students in academics and career planning, helping them secure internships and placements.",
  "Participated in national level debates and competitions, winning several awards for public speaking.",
  "Led sports teams as captain, demonstrating leadership skills and team coordination abilities.",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRandomCGPA(): string {
  return (Math.random() * 2 + 8).toFixed(2); // CGPA between 8.00 and 10.00
}

function generateRandomPhone(): string {
  const prefixes = ["9", "8", "7", "6"];
  const prefix = getRandomElement(prefixes);
  const remaining = Math.floor(Math.random() * 900000000) + 100000000;
  return `${prefix}${remaining}`;
}

function generateLinkedInUrl(firstName: string, lastName: string): string {
  return `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Math.floor(Math.random() * 1000)}`;
}

function generateStartDate(): string {
  const today = new Date();
  const futureDate = new Date(
    today.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000,
  ); // Next 30 days
  return futureDate.toISOString().split("T")[0];
}

export function generateSampleCampusAmbassadorData(): CampusAmbassadorFormData {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const selectedSkills = getRandomElements(
    skills,
    Math.floor(Math.random() * 3) + 3,
  ); // 3-5 skills

  return {
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${getRandomElement(["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"])}`,
    phone: generateRandomPhone(),
    university: getRandomElement(universities),
    course: getRandomElement(courses),
    yearOfStudy: getRandomElement(yearOfStudy),
    cgpa: generateRandomCGPA(),
    linkedinUrl: generateLinkedInUrl(firstName, lastName),
    portfolioUrl:
      Math.random() > 0.5
        ? `https://portfolio-${firstName.toLowerCase()}.vercel.app`
        : "",
    skills: selectedSkills,
    experience: getRandomElement(experiences),
    motivation: getRandomElement(motivations),
    whyInternexis: getRandomElement(whyInternexis),
    availabilityHours: getRandomElement(availabilityHours),
    startDate: generateStartDate(),
    referralSource: getRandomElement(referralSources),
    additionalInfo:
      Math.random() > 0.7
        ? "I am highly motivated and committed to excellence in everything I do."
        : "",
  };
}

export function generateMultipleSampleData(
  count: number,
): CampusAmbassadorFormData[] {
  const sampleDataArray: CampusAmbassadorFormData[] = [];

  for (let i = 0; i < count; i++) {
    sampleDataArray.push(generateSampleCampusAmbassadorData());
  }

  return sampleDataArray;
}
