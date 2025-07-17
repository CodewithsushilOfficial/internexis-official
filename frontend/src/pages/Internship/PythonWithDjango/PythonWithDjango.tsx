import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Calendar, Users, Award } from 'lucide-react';

const PythonWithDjango: React.FC = () => {
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Python Mastery",
      description: "Master Python programming from basics to advanced concepts"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Django Framework",
      description: "Build robust web applications using Django framework"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Integration",
      description: "Work with PostgreSQL, MySQL, and Django ORM"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full mb-6">
              <Code className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Python with Django <span className="text-emerald-600">Internship</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Master Python programming and Django web development framework
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <Calendar className="w-4 h-4 text-emerald-600 mr-2" />
                <span className="text-sm font-medium">10 Weeks</span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <Users className="w-4 h-4 text-emerald-600 mr-2" />
                <span className="text-sm font-medium">Limited Seats</span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <Award className="w-4 h-4 text-emerald-600 mr-2" />
                <span className="text-sm font-medium">Certificate</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200"
            >
              Apply Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-emerald-600 mb-4">
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
    </div>
  );
};

export default PythonWithDjango;

export { PythonWithDjango };
