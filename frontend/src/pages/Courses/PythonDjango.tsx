import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
  CommandLineIcon,
  ServerIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const modules = [
  {
    category: "Python Fundamentals",
    icon: <CommandLineIcon className="h-6 w-6" />,
    color: "from-yellow-500 to-orange-500",
    topics: [
      {
        title: "Python Basics & Syntax",
        duration: "Week 1",
        description: "Variables, data types, operators, control structures"
      },
      {
        title: "Functions & Modules",
        duration: "Week 2",
        description: "Function creation, parameters, scope, module imports"
      },
      {
        title: "Object-Oriented Programming",
        duration: "Week 3",
        description: "Classes, objects, inheritance, polymorphism"
      },
      {
        title: "File Handling & Exceptions",
        duration: "Week 4",
        description: "File operations, error handling, debugging"
      }
    ]
  },
  {
    category: "Django Framework",
    icon: <ServerIcon className="h-6 w-6" />,
    color: "from-green-500 to-teal-500",
    topics: [
      {
        title: "Django Project Setup",
        duration: "Week 5",
        description: "Installation, project structure, virtual environment"
      },
      {
        title: "Models & Database",
        duration: "Week 6",
        description: "ORM, database design, migrations, admin panel"
      },
      {
        title: "Views & Templates",
        duration: "Week 7",
        description: "Function/class-based views, template system, context"
      },
      {
        title: "URL Routing & Forms",
        duration: "Week 8",
        description: "URL patterns, form handling, validation"
      }
    ]
  },
  {
    category: "Advanced Django",
    icon: <GlobeAltIcon className="h-6 w-6" />,
    color: "from-blue-500 to-purple-500",
    topics: [
      {
        title: "User Authentication",
        duration: "Week 9",
        description: "Login/logout, registration, permissions, sessions"
      },
      {
        title: "Django REST Framework",
        duration: "Week 10",
        description: "API development, serializers, viewsets, authentication"
      },
      {
        title: "Testing & Debugging",
        duration: "Week 11",
        description: "Unit testing, integration testing, debugging tools"
      },
      {
        title: "Deployment & Production",
        duration: "Week 12",
        description: "Heroku, AWS, Docker, environment configuration"
      }
    ]
  }
];

const projects = [
  {
    title: "Personal Blog Website",
    description: "Full-featured blog with user authentication and admin panel",
    tech: ["Django", "PostgreSQL", "Bootstrap", "Authentication"]
  },
  {
    title: "E-commerce Platform",
    description: "Online store with cart, payments, and order management",
    tech: ["Django", "Stripe API", "Database Design", "Sessions"]
  },
  {
    title: "Task Management API",
    description: "RESTful API for task management with JWT authentication",
    tech: ["Django REST", "JWT", "API Design", "Testing"]
  },
  {
    title: "Social Media Dashboard",
    description: "User profiles, posts, comments, and real-time updates",
    tech: ["Django", "WebSockets", "AJAX", "File Upload"]
  }
];

const features = [
  {
    icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    title: "Full-Stack Development",
    description: "Build complete web applications from scratch"
  },
  {
    icon: <ClockIcon className="h-6 w-6 text-blue-500" />,
    title: "Industry-Ready Skills",
    description: "Learn production-level Django development"
  },
  {
    icon: <AcademicCapIcon className="h-6 w-6 text-purple-500" />,
    title: "API Development",
    description: "Master REST API creation with Django"
  },
  {
    icon: <UserGroupIcon className="h-6 w-6 text-orange-500" />,
    title: "Database Mastery",
    description: "Advanced database design and optimization"
  }
];

export function PythonDjango() {
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl mb-6">
                <CommandLineIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Python with Django
                <span className="block text-3xl md:text-4xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Backend Mastery
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Master backend web development with Python and Django framework. Build robust web applications, 
                APIs, and launch your career in backend development.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-6 py-3 rounded-full font-bold text-xl">
                  Special Offer: ₹399 Only
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
                  2-3 Months • Beginner to Advanced
                </div>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
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
                What You'll Master
              </h2>
              <div className="space-y-4">
                {[
                  "Master Python programming from basics to advanced",
                  "Build web applications with Django framework",
                  "Create REST APIs with Django REST Framework",
                  "Implement user authentication and authorization",
                  "Design and optimize database schemas",
                  "Deploy applications to production servers",
                  "Handle file uploads and media management",
                  "Build 4+ real-world web applications"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircleIcon className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
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
              Complete Python Django Curriculum
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From Python fundamentals to advanced Django development and deployment
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
                        {module.topics.length} Modules • {module.topics.length} Weeks
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
              Real-World Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Build production-ready web applications using Django
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
                      className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm"
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

      {/* Tech Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Technologies You'll Master
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Python", icon: "🐍", color: "from-yellow-500 to-yellow-600" },
              { name: "Django", icon: "🌟", color: "from-green-500 to-green-600" },
              { name: "PostgreSQL", icon: "🐘", color: "from-blue-500 to-blue-600" },
              { name: "REST APIs", icon: "🔌", color: "from-purple-500 to-purple-600" },
              { name: "HTML/CSS", icon: "🎨", color: "from-orange-500 to-orange-600" },
              { name: "JavaScript", icon: "⚡", color: "from-yellow-400 to-yellow-500" },
              { name: "Git", icon: "📦", color: "from-gray-500 to-gray-600" },
              { name: "Deployment", icon: "🚀", color: "from-red-500 to-red-600" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gradient-to-r ${tech.color} p-4 rounded-xl text-center text-white`}
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div className="font-bold">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Master Backend Development?
          </h2>
          <p className="text-yellow-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have mastered Python and Django to build powerful web applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBuyNow}
              className="bg-white text-yellow-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              🚀 Enroll Now - ₹399
            </button>
            <button className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300">
              💬 WhatsApp Support
            </button>
          </div>
          <div className="mt-8 flex justify-center space-x-8 text-yellow-100">
            <div className="text-center">
              <div className="font-bold text-2xl">🐍</div>
              <div className="text-sm">Python Mastery</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">🌟</div>
              <div className="text-sm">Django Expert</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">🔌</div>
              <div className="text-sm">API Development</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">🚀</div>
              <div className="text-sm">Production Ready</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
