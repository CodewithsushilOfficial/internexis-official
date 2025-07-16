import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Languages, ChevronRight } from 'lucide-react';

interface MentorCardProps {
  id: string;
  name: string;
  image: string;
  domain: string;
  stack: string[];
  rating: number;
  reviewCount: number;
  experience: string;
  available: boolean;
  languages: string[];
  price: number;
  location: string;
  bio: string;
  sessionsCompleted: number;
  onBookNow: (mentorId: string) => void;
}

const MentorCard: React.FC<MentorCardProps> = ({
  id,
  name,
  image,
  domain,
  stack,
  rating,
  reviewCount,
  experience,
  available,
  languages,
  price,
  location,
  bio,
  sessionsCompleted,
  onBookNow
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-2xl p-6 overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Availability Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          available 
            ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
            : 'bg-red-500/20 text-red-600 dark:text-red-400'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-1 ${
            available ? 'bg-green-500' : 'bg-red-500'
          }`} />
          {available ? 'Available' : 'Busy'}
        </div>
      </div>

      <div className="relative z-10">
        {/* Profile Section */}
        <div className="flex items-start mb-4">
          <div className="relative">
            <img 
              src={image} 
              alt={name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/30 dark:border-gray-600/30"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Star className="h-3 w-3 text-white fill-current" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">{name}</h3>
            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">{domain}</p>
            <div className="flex items-center mt-1">
              <MapPin className="h-3 w-3 text-gray-500 mr-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">{location}</span>
            </div>
          </div>
        </div>

        {/* Rating & Experience */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              {rating} ({reviewCount} reviews)
            </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-800 dark:text-white">₹{price}</div>
            <div className="text-xs text-gray-500">per 30min</div>
          </div>
        </div>

        {/* Experience & Sessions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{experience}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {sessionsCompleted} sessions completed
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {stack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-xs rounded-full text-purple-600 dark:text-purple-400 font-medium"
              >
                {tech}
              </span>
            ))}
            {stack.length > 3 && (
              <span className="px-2 py-1 bg-gray-500/20 text-xs rounded-full text-gray-600 dark:text-gray-400">
                +{stack.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="flex items-center mb-4">
          <Languages className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {languages.join(', ')}
          </span>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {bio}
        </p>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* View Profile Button */}
          <Link
            to={`/mentorship/mentor/${id}`}
            className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center group bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 text-gray-800 dark:text-white"
          >
            View Profile
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Book Now Button */}
          <motion.button
            onClick={() => onBookNow(id)}
            disabled={!available}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center group ${
              available
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-400/50 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={available ? { scale: 1.05 } : {}}
            whileTap={available ? { scale: 0.95 } : {}}
          >
            {available ? 'Book Session Now' : 'Currently Unavailable'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MentorCard;
