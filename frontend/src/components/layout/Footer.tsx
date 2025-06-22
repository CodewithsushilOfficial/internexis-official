import React, { useState } from "react";
import { GraduationCap, Heart, ArrowUp, Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your newsletter service
    // For demo purposes, just show success message
    setEmailSubmitted(true);
    setTimeout(() => setEmailSubmitted(false), 3000);
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pt-20 pb-8 overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-accent-500/10 blur-[50px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary-500/10 blur-[70px]" />
        
        {/* Animated particles for modern feel */}
        <div className="hidden lg:block">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/5 rounded-full w-1 h-1"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Enhanced scroll to top button */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.button
          onClick={scrollToTop}
          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 shadow-primary-500/30 border border-primary-400/20"
          whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          data-aos="fade-up"
        >
          <ArrowUp size={22} />
        </motion.button>
      </div>

      {/* Wave separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-12 w-full">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45,.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-gray-900/30"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-16 mb-16">
          {/* Company info - wider on desktop */}
          <div className="lg:col-span-4" data-aos="fade-up">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-6"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-blue-500/10 backdrop-blur-md mr-4 border border-blue-500/20 shadow-lg shadow-blue-500/10">
                <GraduationCap className="h-7 w-7 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Internexis Technologies</h2>
            </motion.div>
            <p className="text-gray-300 mb-8 leading-relaxed text-base">
              Offering AICTE and ISO-certified virtual internships with
              real-world projects, expert mentorship, and affordable pricing. We
              empower students to gain practical experience, build portfolios, and earn
              recognized certifications.
            </p>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center text-gray-300 group hover:text-primary-400 transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-800/50 mr-4 flex items-center justify-center shadow-md group-hover:bg-primary-500/20 transition-colors">
                  <MapPin size={18} className="text-primary-400" />
                </div>
                <span>Noida, Uttar Pradesh, India</span>
              </motion.div>
              <motion.div 
                className="flex items-center text-gray-300 group hover:text-primary-400 transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-800/50 mr-4 flex items-center justify-center shadow-md group-hover:bg-primary-500/20 transition-colors">
                  <Mail size={18} className="text-primary-400" />
                </div>
                <a href="mailto:help.internexis@gmail.com" className="transition-colors">
                  help.internexis@gmail.com
                </a>
              </motion.div>
              <motion.div 
                className="flex items-center text-gray-300 group hover:text-primary-400 transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-800/50 mr-4 flex items-center justify-center shadow-md group-hover:bg-primary-500/20 transition-colors">
                  <Phone size={18} className="text-primary-400" />
                </div>
                <a href="tel:+919214267778" className="transition-colors">
                  +91 921 426 7778
                </a>
              </motion.div>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-xl font-bold mb-8 relative">
              Quick Links
              <span className="absolute -bottom-3 left-0 w-16 h-1.5 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full"></span>
            </h3>            <ul className="space-y-4">              {[
                { name: "About Us", path: "/#about" },
                { name: "Internship Programs", path: "/#programs" },
                { name: "Career Page", path: "/careers" },
                { name: "Pricing", path: "/#pricing" },
                { name: "Testimonials", path: "/#testimonials" },
                { name: "FAQ", path: "/#faq" },
                { name: "Contact Us", path: "/#contact" },
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <span className="inline-block w-0 group-hover:w-4 overflow-hidden transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">&raquo;</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-xl font-bold mb-8 relative">
              Legal
              <span className="absolute -bottom-3 left-0 w-16 h-1.5 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Terms of Service", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Refund Policy", path: "/refund-policy" },
                { name: "Cookie Policy", path: "/cookie-policy" },
                { name: "Terms & Conditions", path: "/terms-and-conditions" },
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <span className="inline-block w-0 group-hover:w-4 overflow-hidden transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">&raquo;</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>          </div>

          {/* Services */}
          <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="250">
            <h3 className="text-xl font-bold mb-8 relative">
              Services
              <span className="absolute -bottom-3 left-0 w-16 h-1.5 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full"></span>
            </h3>            <ul className="space-y-4">
              {[
                { name: "Virtual Internships", path: "/#programs" },
                { name: "Career Guidance", path: "/careers" },
                { name: "Campus Ambassador", path: "/#ambassador" },
                { name: "Mentorship Program", path: "/#mentorship" },
                { name: "Project Consultation", path: "/#contact" },
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <span className="inline-block w-0 group-hover:w-4 overflow-hidden transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">&raquo;</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter - improved */}
          <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-xl font-bold mb-8 relative">
              Stay Updated
              <span className="absolute -bottom-3 left-0 w-16 h-1.5 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full"></span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Subscribe to our newsletter for the latest updates on internships, tech trends, and special offers.
            </p>
            <form className="mb-8" onSubmit={handleSubmit}>
              <div className="relative group">
                <AnimatePresence>
                  {!emailSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex"
                    >
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-800/70 border border-gray-700 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 text-gray-200 px-5 py-3 rounded-l-lg w-full text-sm focus:outline-none transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white px-5 py-3 rounded-r-lg transition-all duration-300 text-sm group-hover:shadow-lg group-hover:shadow-primary-500/20 flex items-center justify-center min-w-[100px]"
                      >
                        Subscribe <Send size={16} className="ml-2" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-green-500/20 text-green-400 border border-green-500/30 px-5 py-3.5 rounded-lg text-sm flex items-center justify-center"
                    >
                      <CheckCircle size={18} className="mr-2" /> Thank you for subscribing!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
            
            <div className="space-y-5">
              <h4 className="text-lg font-medium text-white">Connect with us</h4>
              <div className="flex gap-4">
                {[
                  { 
                    name: "Facebook", 
                    url: "https://www.facebook.com/profile.php?id=61576033436313&sk=about", 
                    icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>,
                    hoverClass: "hover:bg-[#1877F2]" 
                  },
                  { 
                    name: "Twitter", 
                    url: "#", 
                    icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>,
                    hoverClass: "hover:bg-[#1DA1F2]" 
                  },
                  { 
                    name: "LinkedIn", 
                    url: "https://www.linkedin.com/company/internexis-technologies/",
                    icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
                    hoverClass: "hover:bg-[#0A66C2]" 
                  },
                  { 
                    name: "Instagram", 
                    url: "https://www.instagram.com/internexis_/",
                    icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
                    hoverClass: "hover:bg-gradient-to-r hover:from-[#F58529] hover:to-[#DD2A7B]" 
                  },
                ].map((platform, index) => (
                  <motion.a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 border border-gray-700/50 shadow-lg ${platform.hoverClass} group`}
                    aria-label={platform.name}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="transform group-hover:scale-110 transition-transform duration-300">
                      {platform.icon}
                    </span>
                    <span className="sr-only">{platform.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Modern divider */}
        <div className="relative h-px mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent"></div>
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-primary-500/50 to-primary-300/50 rounded-full"
            animate={{ 
              width: ["0%", "20%", "0%"],
              left: ["0%", "100%", "0%"],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Bottom section with animated elements */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm">
          <div className="flex items-center text-gray-400">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              © {new Date().getFullYear()} Internexis Technologies. All rights reserved. Made with{" "}
              <Heart className="inline-block h-4 w-4 text-accent-500 hover:text-red-500 transition-colors" fill="#ff6b6b" /> in India
            </motion.p>
          </div>            <div className="flex flex-wrap gap-4 text-gray-500">
            {["Accessibility", "Careers", "Sitemap"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="hover:text-primary-400 transition-colors text-sm"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
