import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Code, Bot, Smartphone, Globe, Zap } from 'lucide-react';

export const DigitalSolutionsPage: React.FC = () => {
  const solutions = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      features: ["React/Next.js", "Node.js Backend", "Database Integration", "Responsive Design"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["React Native", "Flutter", "iOS Development", "Android Development"]
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by artificial intelligence and machine learning",
      features: ["Custom AI Models", "Chatbots", "Data Analytics", "Automation"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Custom Software",
      description: "Tailored software solutions for specific business requirements",
      features: ["Desktop Applications", "APIs", "System Integration", "Cloud Solutions"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automation Tools",
      description: "Streamline your workflows with intelligent automation solutions",
      features: ["Process Automation", "Workflow Management", "Task Scheduling", "Report Generation"]
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Digital Transformation",
      description: "Complete digital transformation services for modern businesses",
      features: ["Strategy Consulting", "Technology Migration", "Digital Optimization", "Training"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mb-8">
              <Monitor className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-600 to-teal-600 bg-clip-text text-transparent dark:from-white dark:via-green-400 dark:to-teal-400 mb-6">
              💻 Digital Solutions
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Custom web/app development, AI tools, and automation services. 
              Transform your ideas into powerful digital solutions with our expert development team.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
              <Monitor className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Digital Solutions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl mb-6 text-white">
                  {solution.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {solution.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {solution.description}
                </p>
                
                <div className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Development Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Discovery', 'Design', 'Development', 'Deployment'].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full mb-4 font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {step}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {index === 0 && "Understanding your requirements and goals"}
                  {index === 1 && "Creating user-centered design solutions"}
                  {index === 2 && "Building with cutting-edge technologies"}
                  {index === 3 && "Launching and ongoing support"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalSolutionsPage;
