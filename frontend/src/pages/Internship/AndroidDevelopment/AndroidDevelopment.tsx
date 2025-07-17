import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Code, Database, Play, Calendar, Users, Award } from 'lucide-react';

const AndroidDevelopment: React.FC = () => {
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Java & Kotlin",
      description: "Master both Java and Kotlin programming languages for Android development"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Android SDK",
      description: "Learn to use Android SDK, Android Studio, and development tools"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Integration",
      description: "Work with SQLite, Room, and Firebase for data management"
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "App Publishing",
      description: "Learn to publish apps on Google Play Store with best practices"
    }
  ];

  const curriculum = [
    {
      week: "Week 1-2",
      topic: "Android Fundamentals",
      content: "Introduction to Android development, Android Studio setup, and basic app structure"
    },
    {
      week: "Week 3-4",
      topic: "UI/UX Design",
      content: "Activity lifecycle, layouts, views, and Material Design principles"
    },
    {
      week: "Week 5-6",
      topic: "Data & Storage",
      content: "SQLite databases, SharedPreferences, and file handling"
    },
    {
      week: "Week 7-8",
      topic: "Advanced Features",
      content: "Networking, APIs, location services, and notifications"
    },
    {
      week: "Week 9-10",
      topic: "Project Development",
      content: "Build a complete Android application from scratch"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-6">
              <Smartphone className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Android Development <span className="text-green-600">Internship</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Build native Android applications using Java, Kotlin, and modern Android frameworks
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <Calendar className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium">10 Weeks</span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <Users className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium">Limited Seats</span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <Award className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium">Certificate</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
            >
              Apply Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What You'll Learn
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Master the skills needed to become a professional Android developer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-green-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Curriculum Overview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A structured 10-week program designed to make you job-ready
            </p>
          </motion.div>

          <div className="space-y-6">
            {curriculum.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    {item.week}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.topic}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AndroidDevelopment;

export { AndroidDevelopment };
