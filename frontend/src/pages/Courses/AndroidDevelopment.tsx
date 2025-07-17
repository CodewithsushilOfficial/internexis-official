import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
  DevicePhoneMobileIcon,
  CodeBracketIcon,
  CpuChipIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const modules = [
  {
    category: "Java-Based Android Development",
    icon: <CodeBracketIcon className="h-6 w-6" />,
    color: "from-orange-500 to-red-500",
    topics: [
      {
        title: "Java Fundamentals",
        duration: "Week 1-2",
        description: "OOP concepts, Data Structures, Exception Handling"
      },
      {
        title: "Android Studio Setup",
        duration: "Week 3",
        description: "IDE setup, Project structure, AVD configuration"
      },
      {
        title: "UI Development with XML",
        duration: "Week 4-5",
        description: "Layouts, Views, Material Design, Responsive UI"
      },
      {
        title: "Activities & Intents",
        duration: "Week 6",
        description: "Activity lifecycle, Intent filters, Data passing"
      },
      {
        title: "Data Storage & SQLite",
        duration: "Week 7",
        description: "SharedPreferences, SQLite database, Room"
      },
      {
        title: "Firebase Integration",
        duration: "Week 8",
        description: "Authentication, Firestore, Real-time updates"
      }
    ]
  },
  {
    category: "Kotlin-Based Android Development",
    icon: <CpuChipIcon className="h-6 w-6" />,
    color: "from-purple-500 to-indigo-500",
    topics: [
      {
        title: "Kotlin Fundamentals",
        duration: "Week 1-2",
        description: "Syntax, Null safety, Extension functions, Coroutines"
      },
      {
        title: "Modern Android Architecture",
        duration: "Week 3-4",
        description: "MVVM, LiveData, ViewModel, Data Binding"
      },
      {
        title: "Jetpack Components",
        duration: "Week 5-6",
        description: "Navigation, WorkManager, Room, Paging"
      },
      {
        title: "Coroutines & Async Programming",
        duration: "Week 7",
        description: "Suspend functions, Flow, Channels"
      },
      {
        title: "Testing & Debugging",
        duration: "Week 8",
        description: "Unit testing, UI testing, Debugging techniques"
      }
    ]
  },
  {
    category: "Flutter Development",
    icon: <GlobeAltIcon className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    topics: [
      {
        title: "Dart Programming",
        duration: "Week 1-2",
        description: "Dart syntax, OOP, Asynchronous programming"
      },
      {
        title: "Flutter Widgets",
        duration: "Week 3-4",
        description: "Stateless/Stateful widgets, Custom widgets, Layouts"
      },
      {
        title: "State Management",
        duration: "Week 5",
        description: "Provider, Bloc, Riverpod patterns"
      },
      {
        title: "Navigation & Routing",
        duration: "Week 6",
        description: "Navigator, Named routes, Deep linking"
      },
      {
        title: "Firebase & APIs",
        duration: "Week 7",
        description: "Firebase integration, HTTP requests, JSON parsing"
      },
      {
        title: "App Store Publishing",
        duration: "Week 8",
        description: "Play Store, App Store deployment"
      }
    ]
  },
  {
    category: "React Native Development",
    icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    topics: [
      {
        title: "React Native Basics",
        duration: "Week 1-2",
        description: "Setup, Components, JSX, Props & State"
      },
      {
        title: "Navigation & Styling",
        duration: "Week 3-4",
        description: "React Navigation, StyleSheet, Flexbox"
      },
      {
        title: "Native Features",
        duration: "Week 5",
        description: "Camera, Location, Push notifications"
      },
      {
        title: "State Management",
        duration: "Week 6",
        description: "Redux, Context API, Async storage"
      },
      {
        title: "API Integration",
        duration: "Week 7",
        description: "REST APIs, GraphQL, Authentication"
      },
      {
        title: "Testing & Deployment",
        duration: "Week 8",
        description: "Unit testing, App distribution, CI/CD"
      }
    ]
  }
];

const projects = [
  {
    title: "Weather App",
    description: "Real-time weather app with location services and forecasts",
    tech: ["Java/Kotlin", "API Integration", "Location Services"]
  },
  {
    title: "Chat Application",
    description: "Real-time messaging app with Firebase backend",
    tech: ["Flutter", "Firebase", "Real-time DB"]
  },
  {
    title: "E-commerce Mobile App",
    description: "Full-featured shopping app with payment integration",
    tech: ["React Native", "Redux", "Payment Gateway"]
  },
  {
    title: "Social Media App",
    description: "Instagram-like app with photo sharing and social features",
    tech: ["Kotlin", "Firebase", "Camera API"]
  }
];

const features = [
  {
    icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    title: "Multiple Technologies",
    description: "Learn Java, Kotlin, Flutter, and React Native"
  },
  {
    icon: <ClockIcon className="h-6 w-6 text-blue-500" />,
    title: "Flexible Learning",
    description: "Choose your preferred technology stack"
  },
  {
    icon: <AcademicCapIcon className="h-6 w-6 text-purple-500" />,
    title: "Industry Projects",
    description: "Build real-world mobile applications"
  },
  {
    icon: <UserGroupIcon className="h-6 w-6 text-orange-500" />,
    title: "Expert Mentorship",
    description: "Get guidance from industry professionals"
  }
];

export function AndroidDevelopment() {
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-6">
                <DevicePhoneMobileIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Android Development
                <span className="block text-3xl md:text-4xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Complete Course
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Master mobile app development with Java, Kotlin, Flutter, and React Native. 
                Build cross-platform apps and launch your mobile development career.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-6 py-3 rounded-full font-bold text-xl">
                  Special Offer: ₹399 Only
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
                  2-3 Months • Beginner to Advanced
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
                What You'll Master
              </h2>
              <div className="space-y-4">
                {[
                  "Build native Android apps with Java and Kotlin",
                  "Create cross-platform apps with Flutter",
                  "Develop mobile apps using React Native",
                  "Implement modern UI/UX design patterns",
                  "Integrate Firebase for backend services",
                  "Handle device features (camera, GPS, sensors)",
                  "Publish apps to Google Play Store and App Store",
                  "Build 4+ real-world mobile applications"
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
              Choose your preferred technology stack or learn them all for maximum career opportunities
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
              Live Projects Portfolio
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Build production-ready mobile applications that you can showcase to employers
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
                      className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm"
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

      {/* Technology Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Technologies You'll Master
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Java", color: "from-red-500 to-orange-500" },
              { name: "Kotlin", color: "from-purple-500 to-indigo-500" },
              { name: "Flutter", color: "from-blue-500 to-cyan-500" },
              { name: "React Native", color: "from-green-500 to-emerald-500" },
              { name: "Firebase", color: "from-yellow-500 to-orange-500" },
              { name: "Android Studio", color: "from-gray-500 to-gray-700" },
              { name: "SQLite", color: "from-indigo-500 to-purple-500" },
              { name: "REST APIs", color: "from-teal-500 to-blue-500" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gradient-to-r ${tech.color} p-4 rounded-xl text-center text-white font-bold`}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Amazing Mobile Apps?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have mastered mobile app development and launched successful careers in tech.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBuyNow}
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              🚀 Enroll Now - ₹399
            </button>
            <button className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300">
              💬 WhatsApp Support
            </button>
          </div>
          <div className="mt-8 flex justify-center space-x-8 text-green-100">
            <div className="text-center">
              <div className="font-bold text-2xl">📱</div>
              <div className="text-sm">4 Technologies</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">🛠️</div>
              <div className="text-sm">4+ Live Apps</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">📚</div>
              <div className="text-sm">Lifetime Access</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">🏪</div>
              <div className="text-sm">App Store Ready</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
