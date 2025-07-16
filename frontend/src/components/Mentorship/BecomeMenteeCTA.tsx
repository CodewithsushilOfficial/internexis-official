import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BecomeMenteeCTA: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleApplyClick = () => {
    // Add your navigation logic here
    console.log('Navigate to mentorship application');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative text-center"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
      
      {/* Main CTA Container */}
      <div className="relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-gray-700/20 p-12 shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        <div className="absolute top-6 right-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-4 h-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 right-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Ready to Transform Your Career?
          </motion.h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful mentees who have accelerated their careers through our personalized mentorship program.
          </p>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Successful Mentees
              </div>
            </motion.div>
            
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                95%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Job Placement Rate
              </div>
            </motion.div>
            
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Expert Mentors
              </div>
            </motion.div>
          </div>
          
          {/* CTA Button */}
          <motion.button
            onClick={handleApplyClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2">🚀</span>
              Become a Mentee
              <motion.svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
            
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </motion.button>
          
          {/* Additional Info */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free Initial Consultation
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Flexible Schedule
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BecomeMenteeCTA;
