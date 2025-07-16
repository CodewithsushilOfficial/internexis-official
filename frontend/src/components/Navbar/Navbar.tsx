import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, ChevronDown, Star, Globe, Users, Code, Briefcase, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../ui/theme-toggle";
import { ContactFormPopup } from "../ui/ContactFormPopup";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

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
      path: "/services",
      icon: Monitor,
      description: "Complete digital transformation solutions",
    },
    {
      name: "Internships",
      path: "/all-programs",
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
      name: "Mentorship",
      path: "/mentorship",
      icon: Star,
      description: "Get guidance from industry experts",
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl shadow-gray-500/5 dark:shadow-gray-900/30 py-3 border-b border-gray-200/30 dark:border-gray-700/30"
          : "bg-transparent py-5"
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex items-center">
                <img
                  src="https://iili.io/3ZQltN1.jpg"
                  height={70}
                  width={150}
                  className="h-12 md:h-14 w-auto hover:scale-105 transition-transform duration-300"
                  alt="Internexis Technologies"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Home Link */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <Link
                to="/"
                className="group relative px-4 py-2.5 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                onMouseEnter={() => setHoveredItem("home")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10">Home</span>
                <div className={`absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                {hoveredItem === "home" && (
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
                    className="absolute top-full left-0 mt-3 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-3">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 px-3 uppercase tracking-wide">
                        Our Services
                      </div>
                      {servicesData.map((service, index) => (
                        <motion.div
                          key={service.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            to={service.path}
                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300"
                          >
                            <div className="mt-1 p-2.5 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                              <service.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {service.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                                {service.description}
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Other Navigation Items */}
            {[
              { name: "Courses", path: "/courses" },
              { name: "Careers", path: "/careers" },
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
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Contact Us Button */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <button
                onClick={() => setIsContactPopupOpen(true)}
                className="group relative px-4 py-2.5 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                onMouseEnter={() => setHoveredItem("Contact Us")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10">Contact Us</span>
                <div className={`absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                {hoveredItem === "Contact Us" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-800/30 dark:to-secondary-800/30 rounded-xl"
                    layoutId="navbar-hover"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </button>
            </motion.div>

            {/* Theme Toggle */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              className="ml-2"
            >
              <ThemeToggle />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              custom={6}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              className="ml-4"
            >
              <Link
                to="https://docs.google.com/forms/d/e/1FAIpQLSfMY0zYYwtHDW5gdBcoBWxsU0xPTyCzOAGPCUtnaMqqGcmnCg/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden btn-primary py-3 px-6 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-0"
              >
                <span className="relative z-10">Apply Now</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
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
              
              {/* Services Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 px-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                  Our Services
                </div>
                <div className="space-y-2">
                  {servicesData.map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        to={service.path}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300"
                      >
                        <div className="p-2.5 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                          <service.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {service.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {service.description}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Other Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 px-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                  Quick Links
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Home", path: "/", icon: Monitor },
                    { name: "Courses", path: "/courses", icon: Code },
                    { name: "Careers", path: "/careers", icon: Briefcase },
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300"
                      >
                        <div className="p-2.5 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {item.name}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Contact Us Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + 3 * 0.05 }}
                  >
                    <button
                      onClick={() => {
                        setIsContactPopupOpen(true);
                        setIsOpen(false);
                      }}
                      className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300 w-full"
                    >
                      <div className="p-2.5 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          Contact Us
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <Link
                  to="https://docs.google.com/forms/d/e/1FAIpQLSfMY0zYYwtHDW5gdBcoBWxsU0xPTyCzOAGPCUtnaMqqGcmnCg/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="group relative overflow-hidden btn-primary py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-0"
                >
                  <span className="relative z-10">Apply Now</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Popup */}
      <ContactFormPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
      />
    </nav>
  );
};
