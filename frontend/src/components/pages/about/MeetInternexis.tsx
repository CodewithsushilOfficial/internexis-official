import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const MeetInternexis: React.FC = () => {
  // Get current date and time
  const currentDateTime = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Back Link */}
        <Link 
          to="/" 
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>

        {/* Welcome Section */}
        <section className="py-16 md:py-24 bg-gray-50" id="meet-internexis">
          <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Innovate or Stagnate – At Internexis, We Choose to Lead.
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to Internexis, a next-generation internship platform crafted to empower students,
              bridge the academia-industry gap, and drive real-world innovation through meaningful,
              hands-on learning experiences.
            </p>
            <p className="text-gray-700 mb-4">
              In today’s fast-paced digital age, technology is constantly evolving—and so must we. 
              At Internexis, we believe in preparing the leaders of tomorrow by equipping them with real-time
              exposure to industry-grade tools, practices, and mentorship. We’re not just a portal; we are a 
              launchpad for young innovators.
            </p>

            {/* Who We Are Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">Who We Are</h3>
            <p className="text-gray-700 mb-4">
              Internexis is a dynamic ed-tech and internship-enabling platform, committed to revolutionizing
              the way students learn, upskill, and build their careers. Established by a team of passionate educators,
              tech professionals, and startup mentors, our mission is clear—to make high-quality internships accessible,
              impactful, and career-defining for every college student.
            </p>
            <p className="text-gray-700 mb-4">
              We recognize that the traditional classroom model alone cannot prepare students for the rapidly evolving
              demands of the tech world. That’s where we come in. Internexis acts as a bridge between what is taught and
              what is truly needed in the real world.
            </p>

            {/* What We Do Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">What We Do</h3>
            <p className="text-gray-700 mb-4">
              Internexis offers a curated selection of affordable, mentor-guided internship programs in high-demand
              domains such as:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Web Development</li>
              <li>Android Development</li>
              <li>Data Science & AI</li>
              <li>Machine Learning</li>
              <li>Programming Languages (C++, Python, Java, etc.)</li>
              <li>UI/UX Design</li>
              <li>Cloud & DevOps</li>
              <li>Cybersecurity</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Every internship program is designed to be project-based, offering a blend of theoretical learning,
              hands-on assignments, and real-world challenges. Students walk away not just with certificates, but with
              confidence, portfolio-worthy work, and career clarity.
            </p>

            {/* Vision & Mission Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">Our Vision</h3>
            <p className="text-gray-700 mb-4">
              To become the most trusted internship ecosystem in India and globally—one that empowers students to
              discover their potential, learn practically, and grow professionally.
            </p>
            <p className="text-gray-700 mb-4">
              We envision a world where no student is left behind due to lack of exposure, access, or affordability. 
              Internexis strives to be the partner in every student's success story.
            </p>
            
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">Our Mission</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>To democratize internships by making them affordable, accessible, and authentic.</li>
              <li>To bridge the skill gap between academia and industry through project-based learning.</li>
              <li>To provide every student an opportunity to experience industry workflows, even before graduation.</li>
              <li>To create a community of learners, doers, and future leaders who thrive on innovation and excellence.</li>
            </ul>

            {/* Why Internexis Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">Why Internexis?</h3>
            <p className="text-gray-700 mb-4">
              In a saturated market of online learning, Internexis stands apart. Here’s why:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>AICTE & ISO Recognized Programs</li>
              <li>Industry-Based Real Projects</li>
              <li>Mentorship from Experts</li>
              <li>Affordable & Flexible Learning</li>
              <li>Certificates + LOR</li>
              <li>Internship Tracker & 24/7 Support</li>
            </ul>

            {/* Core Values Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">Our Core Values</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Innovation First</li>
              <li>Student-Centric Approach</li>
              <li>Integrity & Transparency</li>
              <li>Growth Through Community</li>
              <li>Excellence Without Barriers</li>
            </ul>

            {/* What Makes Us Different Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">What Makes Internexis Different?</h3>
            <p className="text-gray-700 mb-4">
              In today’s job market, having a degree is not enough. Employers seek skills, experience, and problem-solving
              ability—qualities our internship programs aim to develop.
            </p>
            <p className="text-gray-700 mb-4">
              While many platforms promise learning, we promise transformation. Through:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Real Projects that go on your GitHub and resume.</li>
              <li>Peer Interaction & Feedback from mentors.</li>
              <li>Quizzes, Assessments & Progress Reports.</li>
              <li>Internship Certificates & LORs backed by credibility.</li>
              <li>Recognition from reputed tech bodies.</li>
              <li>Career resources & job referrals for top students.</li>
            </ul>

            {/* Success Stories Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">Success Stories</h3>
            <p className="text-gray-700 mb-4">
              Thousands of students across India have launched their tech careers through Internexis. Many have gone on to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Crack internships at Google, Amazon, and TCS.</li>
              <li>Get placed in unicorn startups and product companies.</li>
              <li>Pursue higher education at IITs, IIITs, and international universities.</li>
              <li>Build their own startups or contribute to open-source communities.</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You could be next.
            </p>

            {/* Team Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">Our Team</h3>
            <p className="text-gray-700 mb-4">
              Internexis was built by a passionate group of educators, technologists, and innovators who share a single mission—
              to make practical tech education affordable, accessible, and transformative.
            </p>
            <p className="text-gray-700 mb-4">
              Our team includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Software Engineers</li>
              <li>Startup Founders</li>
              <li>Mentors from the AI/ML & Web Dev Industry</li>
              <li>Education Advisors and Counselors</li>
            </ul>
            <p className="text-gray-700 mb-4">
              And together, we are building a platform that not only teaches, but inspires.
            </p>

            {/* Looking Ahead Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">Looking Ahead</h3>
            <p className="text-gray-700 mb-4">
              We’re not stopping here. In the coming years, Internexis aims to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Launch domain-specific bootcamps in AI, Blockchain, and Robotics.</li>
              <li>Introduce job placement support and industry-aligned micro-certifications.</li>
              <li>Build AI-powered learning assistants and internship recommendation engines.</li>
              <li>Expand globally and partner with international universities and tech organizations.</li>
            </ul>

            {/* Connect With Us Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">Connect With Us</h3>
            <p className="text-gray-700 mb-4">
              Whether you're a student, educator, or hiring manager—Internexis is here to collaborate.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Email: help.internexis@gmail.com</li>
              <li>Website: <a href="https://www.internexis.in" className="text-blue-600">www.internexis.in</a></li>
              <li>Socials: Follow us on Instagram, LinkedIn, and YouTube.</li>
            </ul>

            {/* Final Word Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">Final Word</h3>
            <p className="text-gray-700 mb-4">
              Internexis is more than a learning platform—it’s a mission to unlock the full potential of India’s youth.
            </p>
            <p className="text-gray-700 mb-4">
              The future of work is changing. At Internexis, we prepare you not just for your first job, but for a lifetime of adaptability, growth, and success.
            </p>
            <p className="text-gray-700 mb-4">
              Join the movement. Intern. Innovate. Inspire—with Internexis.
            </p>

            {/* Date and Time Section */}
            <div className="mt-8 text-center text-lg text-gray-600 italic">
              <p>Current Date and Time: {currentDateTime}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MeetInternexis;