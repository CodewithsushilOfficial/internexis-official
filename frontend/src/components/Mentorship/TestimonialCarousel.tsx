import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      name: 'Ananya S.',
      role: 'Web Development Mentee',
      content: 'The mentorship at Internexis changed my life. My mentor helped me crack interviews, build projects, and gain confidence!',
      avatar: 'AS'
    },
    {
      name: 'Rahul K.',
      role: 'AI/ML Mentee',
      content: 'From zero to internship-ready in 4 weeks! The guidance and community support were top-notch.',
      avatar: 'RK'
    },
    {
      name: 'Priya M.',
      role: 'Full Stack Development Mentee',
      content: 'The personalized roadmap and real-world projects gave me the confidence to land my dream job at a top tech company.',
      avatar: 'PM'
    },
    {
      name: 'Arjun V.',
      role: 'Data Science Mentee',
      content: 'Amazing experience! The mentors are not just teachers but career guides who genuinely care about your success.',
      avatar: 'AV'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Testimonial Display */}
      <div className="relative h-80 overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 p-8 bg-gradient-to-br from-white/30 to-white/10 dark:from-gray-800/30 dark:to-gray-800/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 rounded-3xl"
          >
            <div className="h-full flex flex-col justify-center items-center text-center">
              {/* Avatar */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {testimonials[currentIndex].avatar}
                </div>
              </div>
              
              {/* Quote */}
              <div className="mb-6">
                <svg className="w-8 h-8 text-purple-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{testimonials[currentIndex].content}"
                </p>
              </div>
              
              {/* Author Info */}
              <div>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-purple-600 dark:text-purple-400 font-medium">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        {/* Previous Button */}
        <button
          onClick={prevTestimonial}
          className="p-3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-full border border-white/30 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextTestimonial}
          className="p-3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-full border border-white/30 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 mx-auto w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default TestimonialCarousel;
