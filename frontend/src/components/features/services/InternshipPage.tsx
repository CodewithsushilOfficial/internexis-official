import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export const InternshipPage: React.FC = () => {
  const benefits = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry Certificates",
      description: "Get recognized certificates from top companies"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Mentorship",
      description: "Learn from industry professionals and experts"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Duration",
      description: "Choose internship duration that fits your schedule"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Real Projects",
      description: "Work on live projects with real-world impact"
    }
  ];

  const domains = [
    "Web Development", "Mobile App Development", "Data Science", 
    "Machine Learning", "Digital Marketing", "UI/UX Design",
    "Cloud Computing", "DevOps", "Cybersecurity", "Blockchain"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6">
              🎓 Internship Programs
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Real-world internships across domains with live projects & certificates. 
              Gain practical experience and boost your career with our comprehensive internship programs.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Our Internship Programs?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Available Domains
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-center font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {domain}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternshipPage;
