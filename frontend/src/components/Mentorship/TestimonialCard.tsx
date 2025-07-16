import React from 'react';
import { motion } from 'framer-motion';
import { Star, GraduationCap, Quote } from 'lucide-react';

interface TestimonialCardProps {
  studentName: string;
  quote: string;
  image: string;
  college: string;
  course: string;
  stars: number;
  mentorName: string;
  domain: string;
  sessionsCompleted: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  studentName,
  quote,
  image,
  college,
  course,
  stars,
  mentorName,
  domain,
  sessionsCompleted
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl p-6 relative overflow-hidden group"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Quote icon */}
      <div className="absolute top-4 right-4 text-purple-500/20 dark:text-purple-400/20">
        <Quote className="h-8 w-8" />
      </div>

      <div className="relative z-10">
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < stars 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            {stars}.0 rating
          </span>
        </div>

        {/* Quote */}
        <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
          "{quote}"
        </blockquote>

        {/* Student Info */}
        <div className="flex items-center mb-4">
          <img 
            src={image} 
            alt={studentName}
            className="w-12 h-12 rounded-full object-cover border-2 border-white/30 dark:border-gray-600/30 mr-4"
          />
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{studentName}</h4>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <GraduationCap className="h-4 w-4 mr-1" />
              {course} • {college}
            </div>
          </div>
        </div>

        {/* Mentor Info */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Mentored by</div>
              <div className="font-semibold text-purple-600 dark:text-purple-400">{mentorName}</div>
              <div className="text-sm text-gray-500 dark:text-gray-500">{domain}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Sessions</div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">{sessionsCompleted}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
