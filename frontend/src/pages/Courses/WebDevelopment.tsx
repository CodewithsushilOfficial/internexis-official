import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  ServerIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const modules = [
  {
    category: "Frontend Development",
    icon: <GlobeAltIcon className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    topics: [
      {
        title: "HTML5 & CSS3 Basics",
        duration: "Week 1-2",
        description: "Semantic HTML, CSS Grid, Flexbox, Responsive Design"
      },
      {
        title: "Advanced CSS & Frameworks",
        duration: "Week 3-4",
        description: "Bootstrap 5, Tailwind CSS, CSS Animations, SASS"
      },
      {
        title: "JavaScript ES6+",
        duration: "Week 5-6",
        description: "Modern JavaScript, DOM Manipulation, Async/Await, ES6 Features"
      },
      {
        title: "React.js Fundamentals",
        duration: "Week 7-8",
        description: "Components, Props, State, Hooks, Context API"
      },
      {
        title: "React Advanced",
        duration: "Week 9-10",
        description: "Custom Hooks, Performance Optimization, Testing"
      },
      {
        title: "Deployment & Version Control",
        duration: "Week 11-12",
        description: "Git & GitHub, Vercel, Netlify, CI/CD Basics"
      }
    ]
  },
  {
    category: "Backend Development",
    icon: <ServerIcon className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    topics: [
      {
        title: "Node.js Fundamentals",
        duration: "Week 1-2",
        description: "Node.js Basics, NPM, File System, HTTP Module"
      },
      {
        title: "Express.js Framework",
        duration: "Week 3-4",
        description: "Express Setup, Routing, Middleware, Error Handling"
      },
      {
        title: "Database Integration",
        duration: "Week 5-6",
        description: "MongoDB, Mongoose, Database Design, CRUD Operations"
      },
      {
        title: "API Development",
        duration: "Week 7-8",
        description: "REST APIs, JSON, HTTP Methods, API Testing"
      },
      {
        title: "Authentication & Security",
        duration: "Week 9-10",
        description: "JWT, Passport.js, Bcrypt, Security Best Practices"
      },
      {
        title: "Production Deployment",
        duration: "Week 11-12",
        description: "Heroku, Render, AWS, Environment Variables"
      }
    ]
  },
  {
    category: "Full Stack Integration (MERN)",
    icon: <CpuChipIcon className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    topics: [
      {
        title: "MERN Stack Setup",
        duration: "Week 1-2",
        description: "Project Structure, Frontend-Backend Integration"
      },
      {
        title: "State Management",
        duration: "Week 3-4",
        description: "Redux, Context API, State Persistence"
      },
      {
        title: "Real-time Features",
        duration: "Week 5-6",
        description: "Socket.io, WebSockets, Live Updates"
      },
      {
        title: "Capstone Project",
        duration: "Week 7-8",
        description: "Full-Featured Blog/eCommerce Application"
      }
    ]
  }
];

const projects = [
  {
    title: "Personal Portfolio Website",
    description: "Responsive portfolio with dark mode, animations, and contact form",
    tech: ["React", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Task Management App",
    description: "Full-stack todo application with user authentication",
    tech: ["MERN Stack", "JWT", "MongoDB"]
  },
  {
    title: "E-commerce Platform",
    description: "Complete online store with payment integration",
    tech: ["React", "Node.js", "Stripe API", "MongoDB"]
  },
  {
    title: "Blog Platform",
    description: "Multi-user blogging platform with admin panel",
    tech: ["MERN Stack", "Rich Text Editor", "Image Upload"]
  }
];

const features = [
  {
    icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    title: "Lifetime Access",
    description: "Access course materials forever with free updates"
  },
  {
    icon: <ClockIcon className="h-6 w-6 text-blue-500" />,
    title: "Self-Paced Learning",
    description: "Learn at your own speed with flexible schedules"
  },
  {
    icon: <AcademicCapIcon className="h-6 w-6 text-purple-500" />,
    title: "Industry Certificate",
    description: "Get internship certificate recognized by top companies"
  },
  {
    icon: <UserGroupIcon className="h-6 w-6 text-orange-500" />,
    title: "24/7 Support",
    description: "WhatsApp support for doubt solving and guidance"
  }
];

export function WebDevelopment() {
  const handleBuyNow = () => {
    // Integration with Razorpay will be implemented here
    alert('Redirecting to payment gateway...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
                <CodeBracketIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Web Development
                <span className="block text-3xl md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Master Course
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Master full-stack web development with React, Node.js, and MongoDB. Build modern, 
                responsive web applications and launch your career in tech.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-6 py-3 rounded-full font-bold text-xl">
                  Special Offer: ₹399 Only
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
                  3-4 Months • Beginner to Advanced
                </div>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
              >
                🚀 Buy Now - ₹399
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What You'll Learn
              </h2>
              <div className="space-y-4">
                {[
                  "Build responsive websites with HTML5, CSS3, and JavaScript",
                  "Master React.js for modern frontend development",
                  "Create backend APIs with Node.js and Express.js",
                  "Work with MongoDB for database management",
                  "Implement user authentication and security",
                  "Deploy applications to production servers",
                  "Use Git for version control and collaboration",
                  "Build 4+ real-world projects for your portfolio"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Features</h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    {feature.icon}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Course Curriculum
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our structured curriculum takes you from beginner to advanced level with hands-on projects
            </p>
          </div>

          <div className="space-y-8">
            {modules.map((module, moduleIndex) => (
              <motion.div
                key={moduleIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: moduleIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${module.color} p-6`}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      {module.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{module.category}</h3>
                      <p className="text-white/80">
                        {module.topics.length} Modules • {module.topics.length * 2} Weeks
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {module.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{topic.title}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{topic.duration}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{topic.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Live Projects Included
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Build real-world applications to strengthen your portfolio and gain practical experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Web Development Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully launched their careers with our comprehensive web development course.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBuyNow}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              🚀 Enroll Now - ₹399
            </button>
            <button className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300">
              💬 WhatsApp Support
            </button>
          </div>
          <div className="mt-8 flex justify-center space-x-8 text-blue-100">
            <div className="text-center">
              <div className="font-bold text-2xl">📜</div>
              <div className="text-sm">Internship Certificate</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">🛠️</div>
              <div className="text-sm">4+ Live Projects</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">📚</div>
              <div className="text-sm">Lifetime Access</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">🧠</div>
              <div className="text-sm">Beginner Friendly</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
