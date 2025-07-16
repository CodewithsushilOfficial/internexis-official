import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, ChevronDown, Star, Zap, Globe, Users, Code, Briefcase } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../ui/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false); // Close mobile menu

    // If we're not on the home page, navigate to home first
    if (location.pathname !== "/") {
      return; // Let the Link component handle the navigation
    }

    // If we're already on the home page, scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  // Services dropdown data
  const servicesData = [
    {
      name: "Digital Solutions",
      path: "/digital-solutions",
      icon: Code,
      description: "Custom software development and digital transformation",
    },
    {
      name: "Internship Projects",
      path: "/internship-projects",
      icon: Briefcase,
      description: "Hands-on learning experiences and real-world projects",
    },
    {
      name: "Campus Ambassador",
      path: "/campus-ambassador",
      icon: Users,
      description: "Join our network of student ambassadors",
    },
    {
      name: "Hackathons",
      path: "/hackathons",
      icon: Zap,
      description: "Competitive coding and innovation challenges",
    },
    {
      name: "Mentorship",
      path: "/mentorship",
      icon: Star,
      description: "Get guidance from industry experts",
    },
    {
      name: "Work With Us",
      path: "/work-with-us",
      icon: Globe,
      description: "Join our team and grow your career",
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl shadow-xl shadow-gray-500/10 dark:shadow-gray-900/20 py-2 border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with enhanced styling */}
          <motion.div
            className="flex items-center relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="https://iili.io/3ZQltN1.jpg"
                height={70}
                width={150}
                className="h-11 md:h-13 w-auto hover:scale-105 transition-transform duration-300 relative z-10"
                alt="Internexis Technologies"
                loading="eager"
                fetchPriority="high"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Main Navigation Items */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <Link
                to="/"
                onClick={() => scrollToSection("about")}
                className="group relative px-4 py-2.5 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                onMouseEnter={() => setHoveredItem("about")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10">About</span>
                <div className={`absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                {hoveredItem === "about" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-800/30 dark:to-secondary-800/30 rounded-xl"
                    layoutId="navbar-hover"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </Link>
            </motion.div>

            {/* Services Dropdown */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className="group relative px-4 py-2.5 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 flex items-center gap-1"
                onMouseEnter={() => setHoveredItem("services")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10">Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
                <div className={`absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                {hoveredItem === "services" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-800/30 dark:to-secondary-800/30 rounded-xl"
                    layoutId="navbar-hover"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </button>

              {/* Services Dropdown Menu */}
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      {servicesData.map((service) => (
                        <Link
                          key={service.name}
                          to={service.path}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300"
                        >
                          <div className="mt-1 p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                            <service.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {service.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                              {service.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Other Navigation Items */}
            {[
              { name: "All Programs", path: "/all-programs" },
              { name: "Courses", path: "/courses" },
              { name: "Careers", path: "/careers" },
              { name: "Pricing", path: "/", section: "pricing" },
              { name: "Contact", path: "/", section: "contact" },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                custom={i + 2}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link
                  to={item.path}
                  onClick={() => item.section && scrollToSection(item.section)}
                  className="group relative px-4 py-2.5 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  {hoveredItem === item.name && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-800/30 dark:to-secondary-800/30 rounded-xl"
                      layoutId="navbar-hover"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Theme Toggle */}
            <motion.div
              custom={7}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              className="ml-2"
            >
              <ThemeToggle />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              custom={8}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              className="ml-4"
            >
              <Link
                to="https://docs.google.com/forms/d/e/1FAIpQLSfMY0zYYwtHDW5gdBcoBWxsU0xPTyCzOAGPCUtnaMqqGcmnCg/viewform?usp=header"
                className="group relative overflow-hidden btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10">Apply Now</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-3">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 focus:outline-none rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
          >
            <div className="mx-4 mt-4 mb-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              {/* About Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <Link
                  to="/"
                  onClick={() => {
                    scrollToSection("about");
                    setIsOpen(false);
                  }}
                  className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300"
                >
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg text-white shadow-lg">
                    <Star className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">About</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Learn about our mission</div>
                  </div>
                </Link>
              </motion.div>

              {/* Services Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 px-3">
                  Our Services
                </div>
                <div className="space-y-1">
                  {servicesData.map((service) => (
                    <Link
                      key={service.name}
                      to={service.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300"
                    >
                      <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg text-white shadow-lg">
                        <service.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {service.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {service.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Other Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-1 mb-4"
              >
                {[
                  { name: "All Programs", path: "/all-programs", icon: Code },
                  { name: "Courses", path: "/courses", icon: Briefcase },
                  { name: "Careers", path: "/careers", icon: Briefcase },
                  { name: "Pricing", path: "/", section: "pricing", icon: Star },
                  { name: "Contact", path: "/", section: "contact", icon: Globe },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      if (item.section) {
                        scrollToSection(item.section);
                      }
                      setIsOpen(false);
                    }}
                    className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300"
                  >
                    <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg text-white shadow-lg">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <Link
                  to="https://docs.google.com/forms/d/e/1FAIpQLSfMY0zYYwtHDW5gdBcoBWxsU0xPTyCzOAGPCUtnaMqqGcmnCg/viewform?usp=header"
                  onClick={() => setIsOpen(false)}
                  className="group relative overflow-hidden btn-primary py-3.5 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full flex items-center justify-center gap-2"
                >
                  <span className="relative z-10">Apply Now</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
