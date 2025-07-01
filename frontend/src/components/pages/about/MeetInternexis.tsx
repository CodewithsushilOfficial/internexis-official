import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
              Internexis Technologies - A Self-Independent EduTech & Digital
              Services Platform
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to Internexis Technologies, a comprehensive platform
              dedicated to empowering students through internships, training
              courses, career guidance, and freelance opportunities, while also
              providing digital solutions to businesses and professionals.
            </p>
            <p className="text-gray-700 mb-4">
              In today's fast-paced digital age, technology is constantly
              evolving—and so must we. At Internexis, we prepare students for
              real industry-based projects and provide them with hands-on
              experience to improve their skills and help them secure their
              dream jobs.
            </p>

            {/* Who We Are Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
              Who We Are
            </h3>
            <p className="text-gray-700 mb-4">
              Internexis Technologies is a self-independent EduTech and digital
              services platform that provides internships, training courses,
              hackathons, career guidance, and freelance projects. We're
              committed to helping students develop professional skills while
              working on real-world projects.
            </p>
            <p className="text-gray-700 mb-4">
              We also provide digital solutions to businesses and professionals,
              including website development, app development, AI automations,
              generative AI, and other innovative tools to help organizations
              succeed in the digital world.
            </p>

            {/* What We Do Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
              What We Do
            </h3>
            <p className="text-gray-700 mb-4">
              Internexis offers a curated selection of affordable, mentor-guided
              internship programs and digital services including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Web Development</li>
              <li>Android & iOS App Development</li>
              <li>Data Science & AI</li>
              <li>Machine Learning</li>
              <li>Programming Languages (C++, Python, Java, etc.)</li>
              <li>UI/UX Design</li>
              <li>Cloud & DevOps</li>
              <li>Cybersecurity</li>
              <li>AI Automations</li>
              <li>Generative AI & AI Tools</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Every internship program is designed to be project-based, offering
              a blend of theoretical learning, hands-on assignments, and
              real-world challenges. Students walk away not just with
              certificates, but with confidence, portfolio-worthy work, and
              career clarity.
            </p>

            {/* Vision & Mission Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
              Our Vision
            </h3>
            <p className="text-gray-700 mb-4">
              To become the most trusted self-independent EduTech and digital
              services platform in India and globally—one that empowers students
              to discover their potential, learn practically, and grow
              professionally, while also providing cutting-edge digital
              solutions to businesses.
            </p>

            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
              Our Mission
            </h3>
            <p className="text-gray-700 mb-4">
              To bridge the gap between education and industry by providing
              real-world experiences, practical skills, and meaningful
              connections that prepare students for successful careers, while
              also delivering innovative digital solutions to help businesses
              thrive in the digital age.
            </p>

            {/* Why Choose Us Section */}
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
              Why Choose Internexis Technologies?
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>
                <span className="font-semibold">Real Industry Projects:</span>{" "}
                Work on actual projects with real deliverables and impact
              </li>
              <li>
                <span className="font-semibold">Skill Enhancement:</span>{" "}
                Develop practical skills that employers are looking for
              </li>
              <li>
                <span className="font-semibold">Expert Mentorship:</span> Learn
                from industry professionals with years of experience
              </li>
              <li>
                <span className="font-semibold">Comprehensive Training:</span>{" "}
                Access structured courses and resources to boost your learning
              </li>
              <li>
                <span className="font-semibold">Career Support:</span> Receive
                guidance on resume building, interviews, and job search
              </li>
              <li>
                <span className="font-semibold">Digital Solutions:</span> Get
                access to cutting-edge digital services for your business needs
              </li>
              <li>
                <span className="font-semibold">Innovation Focus:</span> Stay at
                the forefront with AI tools and automation solutions
              </li>
            </ul>

            {/* Call to Action */}
            <div className="mt-8 text-center">
              <p className="text-gray-700 mb-4">
                Join Internexis Technologies today and take the first step
                towards a successful career in technology or transform your
                business with our innovative digital solutions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Link
                  to="/all-programs"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explore Internships
                </Link>
                <Link
                  to="/digital-solutions"
                  className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Discover Digital Solutions
                </Link>
              </div>
            </div>

            {/* Last Updated */}
            <p className="text-sm text-gray-500 mt-8 text-center">
              Last updated: {currentDateTime}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
