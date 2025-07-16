import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Zap } from 'lucide-react';

interface SessionPackageCardProps {
  sessions: number;
  price: number;
  discount: number;
  tagline: string;
  popular?: boolean;
  features: string[];
  onClick: () => void;
}

const SessionPackageCard: React.FC<SessionPackageCardProps> = ({
  sessions,
  price,
  discount,
  tagline,
  popular = false,
  features,
  onClick
}) => {
  const originalPrice = price + discount;
  const pricePerSession = Math.round(price / sessions);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl border-2 ${
        popular 
          ? 'border-purple-500 shadow-2xl shadow-purple-500/20' 
          : 'border-white/20 dark:border-gray-700/20'
      } p-6 cursor-pointer group hover:shadow-xl transition-all duration-300`}
      onClick={onClick}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-4 py-1 rounded-full flex items-center">
            <Star className="h-4 w-4 mr-1 fill-current" />
            {tagline}
          </div>
        </div>
      )}

      {/* Gradient Background */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        popular 
          ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10' 
          : 'bg-gradient-to-br from-blue-500/5 to-purple-500/5'
      }`} />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mb-2">
            <span className="text-4xl font-bold text-gray-800 dark:text-white">
              {sessions}
            </span>
            <span className="text-lg text-gray-600 dark:text-gray-400 ml-2">
              Session{sessions > 1 ? 's' : ''}
            </span>
          </div>
          
          {!popular && (
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {tagline}
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              ₹{price}
            </span>
            {discount > 0 && (
              <span className="text-lg text-gray-400 line-through ml-2">
                ₹{originalPrice}
              </span>
            )}
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            ₹{pricePerSession} per session
          </div>
          
          {discount > 0 && (
            <div className="inline-flex items-center mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
              <Zap className="h-4 w-4 mr-1" />
              Save ₹{discount}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
            popular
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-700/30 text-gray-800 dark:text-white border border-white/30 dark:border-gray-600/30'
          }`}
        >
          Choose This Package
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SessionPackageCard;
