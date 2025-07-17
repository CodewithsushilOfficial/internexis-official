import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FeatureCards from './FeatureCards.tsx';
import TestimonialCarousel from './TestimonialCarousel.tsx';
import BecomeMenteeCTA from './BecomeMenteeCTA.tsx';

const MentorshipSection: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div data-aos="fade-up" data-aos-delay="100">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
              🔥 Mentorship Program
            </h1>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="200">
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Empowering Minds. Nurturing Futures.
            </p>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="300">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              At Internexis Technologies, we don't just offer training — we build careers through personalized mentorship. 
              Our Mentorship Program is designed to guide students, developers, and tech enthusiasts through real-world 
              challenges, industry insights, and hands-on support from experienced mentors.
            </p>
          </div>
        </div>

        {/* Why Join Section */}
        <div className="mb-20">
          <div data-aos="fade-up" data-aos-delay="400">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              💡 Why Join Our Mentorship?
            </h2>
          </div>
          
          <FeatureCards />
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <div data-aos="fade-up" data-aos-delay="600">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🌟 Mentee Testimonials
            </h2>
          </div>
          
          <TestimonialCarousel />
        </div>

        {/* CTA Section */}
        <BecomeMenteeCTA />
      </div>
    </section>
  );
};

export default MentorshipSection;
