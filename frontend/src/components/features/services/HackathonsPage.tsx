import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Calendar, Trophy, Users, Bell, Code2, Rocket } from 'lucide-react';

export const HackathonsPage: React.FC = () => {
  const features = [
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Daily Event Alerts",
      description: "Get notified about hackathons, coding competitions, and tech events happening worldwide"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Registration Support",
      description: "We help you register for events and provide guidance on requirements"
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Project Mentoring",
      description: "Expert mentors to guide your project development and strategy"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Winning Strategies",
      description: "Learn proven techniques and strategies to maximize your chances of winning"
    }
  ];

  const upcomingEvents = [
    {
      name: "Smart India Hackathon 2024",
      date: "Dec 15-17, 2024",
      type: "National",
      prize: "₹1,00,000",
      status: "Open"
    },
    {
      name: "HackWithInfy",
      date: "Jan 20-22, 2025",
      type: "Corporate",
      prize: "₹5,00,000",
      status: "Coming Soon"
    },
    {
      name: "NASA Space Apps Challenge",
      date: "Feb 10-12, 2025",
      type: "International",
      prize: "$30,000",
      status: "Coming Soon"
    },
    {
      name: "Microsoft Imagine Cup",
      date: "Mar 5-7, 2025",
      type: "Global",
      prize: "$100,000",
      status: "Coming Soon"
    }
  ];

  const categories = [
    "Web Development", "Mobile Apps", "AI/ML", "Blockchain", 
    "IoT", "AR/VR", "Cybersecurity", "Game Development",
    "Data Science", "Cloud Computing", "Open Innovation", "Social Good"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-8">
              <Zap className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 bg-clip-text text-transparent dark:from-white dark:via-yellow-400 dark:to-orange-400 mb-6">
              ⚡ Hackathons & Tech Events
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Daily alerts, registration support, and project mentoring for events. 
              Stay ahead of the competition with our comprehensive hackathon ecosystem.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Community
              <Rocket className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            How We Support You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
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

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Upcoming Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {event.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'Open' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">Prize Pool: {event.prize}</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{event.type} Event</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-md transition-shadow duration-300"
                >
                  {event.status === 'Open' ? 'Register Now' : 'Get Notified'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Event Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl text-center font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {category}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HackathonsPage;
