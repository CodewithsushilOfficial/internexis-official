import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Star, ArrowRight, CheckCircle } from 'lucide-react';

export const WorkWithUsPage: React.FC = () => {
  const opportunities = [
    {
      title: "Campus Ambassador",
      description: "Represent Internexis at your college and help fellow students discover opportunities",
      benefits: ["Monthly Stipend", "Certificate", "Leadership Experience", "Networking"],
      route: "/campus-ambassador-application",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      title: "Content Creator",
      description: "Create engaging content about technology, careers, and student life",
      benefits: ["Flexible Hours", "Creative Freedom", "Portfolio Building", "Recognition"],
      route: "/careers",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Technical Team",
      description: "Join our development team and work on cutting-edge projects",
      benefits: ["Remote Work", "Skill Development", "Project Experience", "Mentorship"],
      route: "/careers",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Marketing Team",
      description: "Help us reach more students and promote our programs effectively",
      benefits: ["Marketing Skills", "Campaign Management", "Analytics", "Growth Experience"],
      route: "/careers",
      gradient: "from-green-500 to-teal-600"
    }
  ];

  const benefits = [
    "Work with a dynamic and passionate team",
    "Flexible working hours and remote opportunities",
    "Professional development and skill enhancement",
    "Networking with industry professionals",
    "Certificate of completion and recommendations",
    "Opportunity to make a real impact on student lives"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mb-8">
              <Users className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-pink-600 to-rose-600 bg-clip-text text-transparent dark:from-white dark:via-pink-400 dark:to-rose-400 mb-6">
              🤝 Work With Us
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Become a part of our team or join as campus ambassador. 
              Shape the future of student empowerment and career development.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Team
              <Heart className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Available Opportunities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${opportunity.gradient} rounded-2xl mb-6 text-white`}>
                  <Users className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {opportunity.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {opportunity.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {opportunity.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = opportunity.route}
                  className={`w-full py-3 bg-gradient-to-r ${opportunity.gradient} text-white rounded-xl font-medium hover:shadow-md transition-shadow duration-300 flex items-center justify-center`}
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Work With Internexis?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl p-12 text-white"
          >
            <Star className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students and professionals who are already part of the Internexis family.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white text-pink-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WorkWithUsPage;
