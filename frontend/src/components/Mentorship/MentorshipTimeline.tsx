import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Video, 
  Award, 
  TrendingUp,
  CheckCircle,
  Users,
  BookOpen
} from 'lucide-react';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  imageAlt: string;
  color: string;
  bgGradient: string;
}

const MentorshipTimeline: React.FC = () => {
  const timelineSteps: TimelineStep[] = [
    {
      id: 1,
      title: "Browse & Select Mentor",
      description: "Explore our curated list of industry experts across various domains. Filter by expertise, rating, availability, and price to find your perfect mentor match.",
      icon: Search,
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
      imageAlt: "Browse mentors",
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      id: 2,
      title: "Book Your Session",
      description: "Choose your preferred time slot and book a 30-minute 1-on-1 session. Select from individual sessions or discounted packages based on your learning goals.",
      icon: Calendar,
      image: "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=400&h=300&fit=crop",
      imageAlt: "Book session",
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      id: 3,
      title: "Attend Live Session",
      description: "Join your mentor for an interactive video call with screen sharing, code review, and real-time guidance. Get personalized feedback on your projects and career questions.",
      icon: Video,
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=300&fit=crop",
      imageAlt: "Live session",
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
      id: 4,
      title: "Receive Feedback & Resources",
      description: "Get detailed session notes, actionable feedback, and curated resources from your mentor. Access recordings and follow-up materials to continue your learning journey.",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      imageAlt: "Feedback and resources",
      color: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
    },
    {
      id: 5,
      title: "Achieve Your Goals",
      description: "Apply the insights gained from your mentorship sessions to land your dream job, build amazing projects, or advance your career. Join our success stories!",
      icon: Award,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
      imageAlt: "Achieve goals",
      color: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🚀 Your Mentorship Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From browsing mentors to achieving your career goals - here's how our mentorship program works
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-30"></div>
          
          {/* Animated Pulse Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full animate-pulse"></div>
          </div>

          {/* Timeline Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="relative z-10"
          >
            {timelineSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  className="relative mb-20 last:mb-0"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Pulse Animation */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-full animate-ping opacity-25`}></div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className={`${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      } ${
                        isEven ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'
                      }`}
                    >
                      <div className={`bg-gradient-to-br ${step.bgGradient} backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 dark:border-gray-700/30`}>
                        <div className={`flex items-center mb-6 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                          <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mr-4 ${isEven ? 'lg:order-2 lg:mr-0 lg:ml-4' : ''}`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className={`${isEven ? 'lg:order-1' : ''}`}>
                            <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-1">
                              Step {step.id}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                          {step.description}
                        </p>
                        
                        {/* Progress Indicator */}
                        <div className="mt-6 flex items-center">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${step.color} transition-all duration-1000`}
                              style={{ width: `${(step.id / timelineSteps.length) * 100}%` }}
                            ></div>
                          </div>
                          <div className="ml-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                            {step.id}/{timelineSteps.length}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Image Card */}
                    <motion.div
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      } ${
                        isEven ? 'lg:pl-8' : 'lg:pr-8'
                      }`}
                    >
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl overflow-hidden">
                          <img
                            src={step.image}
                            alt={step.imageAlt}
                            className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                          
                          {/* Overlay Icon */}
                          <div className="absolute top-6 right-6 w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg">
                            <Icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">
              Join 1000+ Success Stories
            </h3>
            <p className="text-purple-100 text-lg">
              Students who followed this journey and achieved their goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">85%</div>
              <div className="text-purple-100">Job Placement Rate</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-purple-100">Sessions Completed</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-purple-100">Satisfaction Rating</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Ready to Start Your Journey?
          </h3>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Search className="h-5 w-5 inline mr-2" />
            Browse Mentors Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MentorshipTimeline;
