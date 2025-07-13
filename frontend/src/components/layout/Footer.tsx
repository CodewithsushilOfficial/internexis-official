import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Heart,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const footer = footerRef.current;
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove);
      return () => footer.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitted(true);
    setTimeout(() => setEmailSubmitted(false), 3000);
    setEmail("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-black text-white pt-16 pb-6 overflow-hidden"
    >
      {/* Enhanced decorative elements with mouse tracking */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient blobs using website colors */}
        <motion.div 
          className="absolute -top-24 -right-24 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-primary-500/15 via-secondary-500/10 to-accent-500/12 blur-[100px]"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-secondary-500/15 via-primary-500/10 to-accent-500/12 blur-[100px]"
          animate={{
            scale: [1.15, 1, 1.15],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Interactive gradient that follows mouse */}
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-primary-500/8 to-secondary-500/8 blur-[80px]"
          animate={{
            x: mousePosition.x - 144,
            y: mousePosition.y - 144,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
          }}
        />

        {/* Floating particles */}
        <div className="hidden lg:block">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/8 rounded-full"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -80, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Enhanced scroll to top button */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5
        }}
      >
        <motion.button
          onClick={scrollToTop}
          className="relative bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 text-white w-14 h-14 rounded-xl flex items-center justify-center shadow-2xl border border-primary-400/30 backdrop-blur-sm group overflow-hidden"
          whileHover={{
            y: -6,
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(53, 99, 233, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
          <ArrowUp size={20} className="relative z-10 group-hover:scale-110 transition-transform" />
          <Sparkles 
            size={10} 
            className="absolute top-1 right-1 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" 
          />
        </motion.button>
      </motion.div>

      {/* Modern wave separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform rotate-180">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-12 w-full"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(53, 99, 233, 0.25)" />
              <stop offset="50%" stopColor="rgba(140, 48, 245, 0.25)" />
              <stop offset="100%" stopColor="rgba(255, 107, 53, 0.25)" />
            </linearGradient>
          </defs>
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45,.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="url(#waveGradient)"
          />
        </motion.svg>
      </div>

      <motion.div 
        className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-12 mb-12"
          variants={itemVariants}
        >
          {/* Company info - Enhanced with glassmorphism */}
          <motion.div className="lg:col-span-4" variants={itemVariants}>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Company header */}
              <div className="flex items-center mb-6 group">
                <motion.div 
                  className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-600/20 via-secondary-600/20 to-accent-600/20 backdrop-blur-xl mr-3 border border-primary-500/30 shadow-xl overflow-hidden"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/30"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <GraduationCap className="h-6 w-6 text-primary-400 relative z-10 group-hover:text-white transition-colors" />
                  <motion.div
                    className="absolute inset-0 border border-white/20 rounded-xl"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                    Internexis Technologies
                  </h2>
                  <motion.div
                    className="h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 1 }}
                  />
                </div>
              </div>

              {/* Company description with glassmorphism card */}
              <motion.div
                className="relative bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10 shadow-xl mb-6"
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(53, 99, 233, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-300 leading-relaxed text-base">
                  Internexis Technologies is a self-driven tech platform empowering future innovators through real-world internships, hands-on training, and career mentorship in Web Development, AI/ML, Cybersecurity, UI/UX, and more. Built by passionate educators and developers — 100% community-driven, no third-party dependency.
                </p>
                {/* Decorative corners */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-primary-400/50 rounded-tl-lg" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-secondary-400/50 rounded-br-lg" />
              </motion.div>

              {/* Contact information with enhanced animations */}
              <div className="space-y-3">
                {[
                  {
                    icon: MapPin,
                    text: "Noida, Uttar Pradesh, India",
                    color: "text-primary-400",
                    bgColor: "bg-primary-500/10",
                    hoverBg: "group-hover:bg-primary-500/20",
                  },
                  {
                    icon: Mail,
                    text: "help.internexis@gmail.com",
                    href: "mailto:help.internexis@gmail.com",
                    color: "text-accent-400",
                    bgColor: "bg-accent-500/10",
                    hoverBg: "group-hover:bg-accent-500/20",
                  },
                  {
                    icon: Phone,
                    text: "+91 921 426 7778",
                    href: "tel:+919214267778",
                    color: "text-secondary-400",
                    bgColor: "bg-secondary-500/10",
                    hoverBg: "group-hover:bg-secondary-500/20",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center text-gray-300 group cursor-pointer"
                    whileHover={{ x: 6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.div 
                      className={`w-10 h-10 rounded-lg ${item.bgColor} ${item.hoverBg} mr-3 flex items-center justify-center shadow-lg border border-white/10 transition-all duration-300`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <item.icon size={16} className={item.color} />
                    </motion.div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-white transition-colors flex items-center group text-base"
                      >
                        <span>{item.text}</span>
                        <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <span className="group-hover:text-white transition-colors text-base">{item.text}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links - Enhanced with modern styling */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="relative">
              <h3 className="text-xl font-bold mb-6 relative group">
                <span className="relative z-10">Quick Links</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-500 via-primary-500 to-secondary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500/20 to-transparent rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "About Us", path: "/#about", icon: "🏢" },
                  { name: "Internship Programs", path: "/#programs", icon: "🎓" },
                  { name: "Career Page", path: "/careers", icon: "💼" },
                  { name: "Pricing", path: "/#pricing", icon: "💰" },
                  { name: "Testimonials", path: "/#testimonials", icon: "⭐" },
                  { name: "FAQ", path: "/#faq", icon: "❓" },
                  { name: "Contact Us", path: "/#contact", icon: "📞" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group relative text-base"
                    >
                      <motion.div
                        className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-sm border border-white/10 mr-2 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="relative">
                        {item.name}
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                      <motion.span
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm"
                        whileHover={{ x: 3 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Legal - Enhanced */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="relative">
              <h3 className="text-xl font-bold mb-6 relative">
                <span className="relative z-10">Legal</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-accent-500 via-accent-500 to-secondary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                />
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Terms of Service", path: "/terms", icon: "📋" },
                  { name: "Privacy Policy", path: "/privacy-policy", icon: "🔒" },
                  { name: "Refund Policy", path: "/refund-policy", icon: "💸" },
                  { name: "Cookie Policy", path: "/cookie-policy", icon: "🍪" },
                  { name: "Terms & Conditions", path: "/terms-and-conditions", icon: "📄" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group relative text-base"
                    >
                      <motion.div
                        className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent-500/20 to-secondary-500/20 backdrop-blur-sm border border-white/10 mr-2 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: -10 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="relative">
                        {item.name}
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-500 to-secondary-500 origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                      <motion.span
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm"
                        whileHover={{ x: 3 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Services - Enhanced */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="relative">
              <h3 className="text-xl font-bold mb-6 relative">
                <span className="relative z-10">Services</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-secondary-500 via-accent-500 to-primary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                />
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Virtual Internships", path: "/#programs", icon: "💻" },
                  { name: "Career Guidance", path: "/careers", icon: "🎯" },
                  { name: "Campus Ambassador", path: "/#ambassador", icon: "🏛️" },
                  { name: "Mentorship Program", path: "/#mentorship", icon: "👨‍🏫" },
                  { name: "Project Consultation", path: "/#contact", icon: "🔧" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group relative text-base"
                    >
                      <motion.div
                        className="w-6 h-6 rounded-lg bg-gradient-to-br from-secondary-500/20 to-primary-500/20 backdrop-blur-sm border border-white/10 mr-2 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="relative">
                        {item.name}
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-secondary-500 to-primary-500 origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                      <motion.span
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm"
                        whileHover={{ x: 3 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Newsletter - Enhanced with glassmorphism and animations */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="relative">
              <h3 className="text-xl font-bold mb-6 relative">
                <span className="relative z-10">Stay Updated</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-secondary-500 via-accent-500 to-primary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                />
              </h3>
              
              <motion.p 
                className="text-gray-300 mb-5 leading-relaxed text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                Subscribe to our newsletter for the latest updates on internships,
                tech trends, and special offers.
              </motion.p>

              {/* Enhanced newsletter form */}
              <motion.form 
                className="mb-6" 
                onSubmit={handleSubmit}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <div className="relative group">
                  <AnimatePresence mode="wait">
                    {!emailSubmitted ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        <div className="flex overflow-hidden rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
                          <input
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent text-gray-200 px-4 py-3 flex-1 text-base focus:outline-none placeholder-gray-400"
                            required
                          />
                          <motion.button
                            type="submit"
                            className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white px-5 py-3 transition-all duration-300 text-base flex items-center justify-center min-w-[100px] relative overflow-hidden group"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {/* Animated background */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.6 }}
                            />
                            <span className="relative z-10 flex items-center">
                              Subscribe
                              <motion.div
                                className="ml-2"
                                whileHover={{ x: 2 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <Send size={14} />
                              </motion.div>
                            </span>
                          </motion.button>
                        </div>
                        {/* Glow effect */}
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                          style={{ transform: 'scale(1.05)' }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="bg-gradient-to-r from-accent-500/20 to-primary-500/20 text-accent-400 border border-accent-500/30 px-5 py-3 rounded-xl text-base flex items-center justify-center backdrop-blur-xl shadow-xl"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                        >
                          <CheckCircle size={18} className="mr-2" />
                        </motion.div>
                        <span className="font-medium">Thank you for subscribing!</span>
                        <motion.div
                          className="ml-2"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          🎉
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.form>

              {/* Enhanced social media section */}
              <motion.div 
                className="space-y-5"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              >
                <h4 className="text-lg font-medium text-white flex items-center">
                  <Star className="mr-2 text-yellow-400" size={18} />
                  Connect with us
                </h4>
                
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    {
                      name: "Facebook",
                      url: "https://www.facebook.com/profile.php?id=61576033436313&sk=about",
                      icon: (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      ),
                      bgColor: "from-primary-600/20 to-primary-500/20",
                      hoverColor: "hover:from-primary-600/40 hover:to-primary-500/40",
                      borderColor: "border-primary-500/30",
                    },
                    {
                      name: "Twitter",
                      url: "#",
                      icon: (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      ),
                      bgColor: "from-secondary-600/20 to-secondary-500/20",
                      hoverColor: "hover:from-secondary-600/40 hover:to-secondary-500/40",
                      borderColor: "border-secondary-500/30",
                    },
                    {
                      name: "LinkedIn",
                      url: "https://www.linkedin.com/company/internexis-technologies/",
                      icon: (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                      bgColor: "from-primary-700/20 to-primary-600/20",
                      hoverColor: "hover:from-primary-700/40 hover:to-primary-600/40",
                      borderColor: "border-primary-600/30",
                    },
                    {
                      name: "Instagram",
                      url: "https://www.instagram.com/internexis_/",
                      icon: (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      ),
                      bgColor: "from-accent-600/20 to-secondary-600/20",
                      hoverColor: "hover:from-accent-600/40 hover:to-secondary-600/40",
                      borderColor: "border-accent-500/30",
                    },
                  ].map((platform, index) => (
                    <motion.a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        h-12 bg-gradient-to-br ${platform.bgColor} ${platform.hoverColor}
                        backdrop-blur-xl rounded-xl flex items-center justify-center 
                        text-gray-300 hover:text-white transition-all duration-300 
                        border ${platform.borderColor} shadow-lg group relative overflow-hidden
                      `}
                      aria-label={platform.name}
                      whileHover={{
                        y: -3,
                        scale: 1.03,
                        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.9 + index * 0.1, duration: 0.3 }}
                    >
                      {/* Animated background effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div
                        className="relative z-10"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        {platform.icon}
                      </motion.div>
                      <span className="sr-only">{platform.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced animated divider */}
        <motion.div 
          className="relative h-px mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full shadow-lg"
            animate={{
              width: ["0%", "6rem", "0%"],
              left: ["20%", "50%", "80%"],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Sparkle effects */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${20 + (i * 15)}%`,
                top: '50%',
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Enhanced bottom section */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-base"
          variants={itemVariants}
        >
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-center gap-3 text-gray-400"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            <div className="flex items-center">
              <motion.p className="flex items-center text-base">
                © {new Date().getFullYear()} Internexis Technologies. All rights reserved.
              </motion.p>
            </div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="mr-2 text-base">Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart
                  className="inline-block h-3.5 w-3.5 text-red-500 mx-1"
                  fill="#ef4444"
                />
              </motion.div>
              <span className="ml-1 text-base">in India</span>
              <motion.span
                className="ml-2"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🇮🇳
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-5 text-gray-500"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.4, duration: 0.5 }}
          >
            {[
              { name: "Accessibility", href: "#accessibility" },
              { name: "Careers", href: "/careers" },
              { name: "Sitemap", href: "#sitemap" },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="hover:text-white transition-all duration-300 text-base relative group"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="relative">
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Final floating elements */}
        <motion.div
          className="absolute bottom-3 right-3 opacity-20"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={20} className="text-secondary-400" />
        </motion.div>
      </motion.div>
    </footer>
  );
};
