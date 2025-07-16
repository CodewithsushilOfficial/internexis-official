import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Database, Calendar, Users, Award } from 'lucide-react';

const FullStackDevelopment: React.FC = () => {
  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Frontend Mastery",
      description: "Build responsive UIs with React, Vue.js, and modern CSS frameworks"
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Backend Expertise",
      description: "Develop robust APIs and server-side applications with Node.js"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Integration",
      description: "Connect and manage databases with MongoDB, PostgreSQL, and more"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-6">
              <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Full Stack Development <span className="text-purple-600">Internship</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Master both frontend and backend technologies for complete web applications
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <Calendar className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium">16 Weeks</span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <Users className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium">Limited Seats</span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <Award className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium">Certificate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What You'll Learn
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              End-to-end web development skills for building complete applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
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
    </div>
  );
};

export default FullStackDevelopment;
