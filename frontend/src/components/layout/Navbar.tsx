import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/theme-toggle';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false); // Close mobile menu
    
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      return; // Let the Link component handle the navigation
    }
    
    // If we're already on the home page, scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants for navbar links
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg py-3 border-b border-gray-100/50 dark:border-gray-800/50' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://iili.io/3ZQltN1.jpg"
              height={70}
              width={150}
              className="h-10 md:h-12 w-auto hover:opacity-90 transition-opacity"
              alt="Internexis Technologies"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
            {/* Desktop Navigation - Enhanced */}
          <div className="hidden md:flex items-center space-x-2">
            {[
              {name: 'About', path: '/', section: 'about'},
              // {name: 'Programs', path: '/', section: 'programs'},
              {name: 'Internship Projects', path: '/internship-projects', section: ''},
              {name: 'All Programs', path: '/all-programs', section: ''},
              {name: 'Campus Ambassador', path: '/campus-ambassador', section: ''},
              {name: 'Careers', path: '/careers', section: ''},
              {name: 'Pricing', path: '/', section: 'pricing'},
              {name: 'FAQ', path: '/', section: 'faq'},
              {name: 'Contact', path: '/', section: 'contact'}
            ].map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link 
                  to={item.path}
                  onClick={() => item.section && scrollToSection(item.section)}
                  className="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/20 transition-all"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              custom={6}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              className="ml-2"
            >
              <ThemeToggle />
            </motion.div>            <motion.div
              custom={7}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              className="ml-5"
            >              <Link 
                to="https://docs.google.com/forms/d/e/1FAIpQLSfMY0zYYwtHDW5gdBcoBWxsU0xPTyCzOAGPCUtnaMqqGcmnCg/viewform?usp=header"
                className="btn-primary py-2.5 px-5 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30"
              >
                <span>Apply Now</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
          
          {/* Mobile menu button - Enhanced */}
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 focus:outline-none p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Mobile Navigation */}
      <motion.div 
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >        <div className="mx-4 mt-2 mb-3 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl rounded-2xl p-4 border border-gray-100/50 dark:border-gray-800/50">
          {[
            {name: 'About', path: '/', section: 'about'},
            {name: 'Programs', path: '/', section: 'programs'},
            {name: 'Internship Projects', path: '/internship-projects', section: ''},
            {name: 'All Programs', path: '/all-programs', section: ''},
            {name: 'Campus Ambassador', path: '/campus-ambassador', section: ''},
            {name: 'Careers', path: '/careers', section: ''},
            {name: 'Pricing', path: '/', section: 'pricing'},
            {name: 'FAQ', path: '/', section: 'faq'},
            {name: 'Contact', path: '/', section: 'contact'}
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={item.path}
                onClick={() => {
                  if (item.section) {
                    scrollToSection(item.section);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/20 transition-all"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-3"
          >            <Link
              to="https://docs.google.com/forms/d/e/1FAIpQLSfMY0zYYwtHDW5gdBcoBWxsU0xPTyCzOAGPCUtnaMqqGcmnCg/viewform?usp=header"
              onClick={() => {
                scrollToSection('contact');
                setIsOpen(false);
              }}
              className="block w-full text-center btn-primary py-3.5 px-5 rounded-xl font-semibold shadow-lg"
            >
              Apply Now
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </nav>
  );
};
