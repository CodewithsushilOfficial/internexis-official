import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group relative"
    >
      <div className="relative h-full p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icon */}
        <div className="relative z-10 mb-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"></div>
      </div>
    </motion.div>
  );
};

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: '💡',
      title: '1-on-1 Guidance',
      description: 'Get personal mentorship from industry experts, developers, and project managers guiding you through every step of your journey.',
    },
    {
      icon: '🤝',
      title: 'Live Projects & Case Studies',
      description: 'Work on real-world projects and get feedback that helps you grow into a confident professional.',
    },
    {
      icon: '🚀',
      title: 'Career Roadmaps & Networking',
      description: 'Receive a customized roadmap aligned with your goals and get connected with a growing community of learners and mentors.',
    },
  ];

  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={index * 0.2}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
