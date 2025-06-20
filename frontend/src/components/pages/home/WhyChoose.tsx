import React, { useState } from 'react';
import { CheckCircle2, Award, Code, Lightbulb, Users, Clock, Briefcase, Gift, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Reason {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export const WhyChoose: React.FC = () => {
  const [activeReason, setActiveReason] = useState<number | null>(null);
  const reasons: Reason[] = [
    {
      title: "Government-Recognized & Certified",
      description: "Our internship certificates are approved by the All India Council for Technical Education (AICTE), giving your resume an authentic credibility boost.",
      icon: <Award size={28} />,
      color: "blue"
    },
    {
      title: "Real Projects, Not Just Theory",
      description: "Work on actual industry-relevant projects that solve real problems, not just textbook exercises. Build a portfolio that showcases your practical skills.",
      icon: <Code size={28} />,
      color: "green"
    },
    {
      title: "Mentor Support Throughout",
      description: "Get guidance from experienced professionals who review your code, provide feedback, and help you overcome challenges in your learning journey.",
      icon: <Lightbulb size={28} />,
      color: "purple"
    },
    {
      title: "Team Collaboration Experience",
      description: "Learn to work in distributed teams using professional collaboration tools like GitHub, preparing you for real workplace environments.",
      icon: <Users size={28} />,
      color: "pink"
    },
    {
      title: "Flexible, Remote & Affordable",
      description: "Complete your internship on your own schedule from anywhere in the world, with programs starting at just ₹199 - accessible to all students.",
      icon: <Clock size={28} />,
      color: "yellow"
    },
    {
      title: "Job-Ready Skills in Weeks",
      description: "Gain practical experience that bridges the gap between academic learning and industry requirements, making you immediately valuable to employers.",
      icon: <Briefcase size={28} />,
      color: "red"
    },
    {
      title: "Resume & Portfolio Enhancement", 
      description: "Add verified project experience to your resume and build an impressive portfolio that demonstrates your capabilities to potential employers.",
      icon: <CheckCircle2 size={28} />,
      color: "teal"
    },
    {
      title: "Top Performers Get Goodies & Job Referrals",
      description: "Excel in your internship to earn additional rewards, recognition, and potential job referrals to our network of hiring partners.",
      icon: <Gift size={28} />,
      color: "orange"
    }
  ];






  // Enhanced animation variants with more dynamic effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24, 
        mass: 1.2 
      } 
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -25, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] // Custom cubic bezier for smooth motion
      } 
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  const highlightVariants = {
    initial: { width: "0%", opacity: 0.5 },
    animate: { 
      width: "100%", 
      opacity: 1,
      transition: { 
        duration: 1.2, 
        ease: "easeInOut", 
        delay: 0.4 
      } 
    }
  };
  // Background particles animation with enhanced visuals
  const particles = Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    size: Math.random() * 12 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.4 + 0.1
  }));
  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-800/95 relative overflow-hidden" id="why-choose">
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient blobs for modern look */}
        <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-blue-300/10 to-transparent dark:from-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/5 w-1/3 h-1/3 bg-gradient-to-tl from-purple-300/10 to-transparent dark:from-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-pink-300/5 to-transparent dark:from-pink-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Animated background particles with improved visuals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div 
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 dark:from-blue-300/10 dark:to-purple-300/10"
            style={{ 
              width: particle.size, 
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{
              x: [0, Math.random() * 120 - 60],
              y: [0, Math.random() * 120 - 60],
              scale: [0.2, 1, 0.8, 1],
              opacity: [0, particle.opacity, particle.opacity/2, particle.opacity]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Subtle grid pattern for depth */}
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-[length:40px_40px] opacity-[0.03] dark:opacity-[0.05]"></div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-24 relative" data-aos="fade-up">
          <motion.div
            className="inline-block relative mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={titleVariants}
          >
            {/* Enhanced Sparkles animation */}
            <motion.div 
              className="absolute -top-10 -left-10 text-yellow-400 dark:text-yellow-300"
              animate={{ 
                rotate: [0, 20, -20, 10, 0],
                scale: [1, 1.2, 0.9, 1.1, 1],
                opacity: [0.7, 1, 0.8, 1, 0.7]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                repeatType: "loop" 
              }}
            >
              <Sparkles className="h-10 w-10" />
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Why Choose <span className="font-extrabold">Internexis</span>?
            </h2>
            
            {/* Enhanced gradient underline */}
            <motion.div 
              className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mt-3"
              variants={highlightVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            />
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-light"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={subtitleVariants}
          >
            We're transforming how students gain practical experience and prepare for tech careers
          </motion.p>
          
          {/* Decorative dots */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ opacity: 0.3, y: 10 }}
                animate={{ 
                  opacity: [0.3, 1, 0.3], 
                  y: [10, 0, 10],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.2, 
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
              />
            ))}
          </div>
        </div>
          <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-7 md:p-8 rounded-2xl backdrop-blur-sm 
                ${activeReason === index 
                  ? `bg-gradient-to-br from-${reason.color}-50/90 to-white/95 dark:from-${reason.color}-900/40 dark:to-gray-800/95 shadow-xl shadow-${reason.color}-200/50 dark:shadow-${reason.color}-900/30` 
                  : `bg-white/90 hover:bg-${reason.color}-50/80 dark:bg-gray-800/90 dark:hover:bg-${reason.color}-900/30 shadow-lg hover:shadow-xl hover:shadow-${reason.color}-200/40 dark:hover:shadow-${reason.color}-900/20`} 
                transition-all duration-500 ease-out 
                ${activeReason === index 
                  ? `border-2 border-${reason.color}-300/80 dark:border-${reason.color}-700/40` 
                  : `border border-gray-100/90 dark:border-gray-700/60 hover:border-${reason.color}-200/80 dark:hover:border-${reason.color}-800/40`} 
                cursor-pointer overflow-hidden group relative`}
              onClick={() => setActiveReason(activeReason === index ? null : index)}
              whileHover={{ 
                y: -15,
                scale: 1.03,
                boxShadow: '0 30px 35px -12px rgba(0, 0, 0, 0.18), 0 15px 20px -5px rgba(0, 0, 0, 0.06)',
                transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
              }}
              whileTap={{ 
                scale: 0.97, 
                boxShadow: '0 15px 20px -10px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)',
                y: -8,
                transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] }
              }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Enhanced background gradient effect on hover */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br from-${reason.color}-100/90 via-${reason.color}-50/60 to-white/70 dark:from-${reason.color}-500/40 dark:via-${reason.color}-800/30 dark:to-gray-800/80 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out z-0`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: activeReason === index ? 0.8 : 0, scale: 1 }}
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Enhanced animated gradient border on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl pointer-events-none">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-${reason.color}-400/30 to-transparent dark:via-${reason.color}-400/15`}
                  style={{ height: '200%', width: '200%', x: '-50%', y: '-50%' }}
                  animate={{ 
                    y: ['0%', '75%', '0%'],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Enhanced animated corner accent */}
              <div className="absolute -top-12 -right-12 w-32 h-32 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-75 group-hover:scale-100">
                <motion.div 
                  className={`w-full h-full rounded-full bg-gradient-to-br from-${reason.color}-400/40 via-${reason.color}-500/25 to-${reason.color}-600/15 dark:from-${reason.color}-400/25 dark:via-${reason.color}-500/20 dark:to-${reason.color}-600/10`}
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </div>
              
              {/* Enhanced additional accent spot */}
              <div className="absolute -bottom-8 -left-8 w-20 h-20 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-0 group-hover:scale-100">
                <motion.div 
                  className={`w-full h-full rounded-full bg-gradient-to-br from-${reason.color}-300/25 to-${reason.color}-500/15 dark:from-${reason.color}-300/15 dark:to-${reason.color}-500/10`}
                  animate={{ 
                    rotate: -360,
                    scale: [1, 0.9, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
                  }}
                />
              </div>
              
              <div className="flex flex-col h-full relative z-10">
                {/* Enhanced animated icon */}
                <motion.div 
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${reason.color}-100 to-${reason.color}-50/80 dark:from-${reason.color}-700/50 dark:to-${reason.color}-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:shadow-${reason.color}-200/50 dark:group-hover:shadow-${reason.color}-800/40 relative overflow-hidden`}
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.6, ease: "easeOut" }
                  }}
                >
                  {/* Enhanced animated background for icon */}
                  <div className="absolute inset-0 opacity-40">
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-${reason.color}-400/40`}
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut", 
                        repeatDelay: 1
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 opacity-0 dark:opacity-50 mix-blend-overlay">
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r from-${reason.color}-400/0 via-${reason.color}-400/80 to-${reason.color}-400/0`}
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut", 
                        repeatDelay: 0.5
                      }}
                    />
                  </div>
                  <motion.div
                    animate={activeReason === index ? { 
                      rotate: [0, 15, -15, 10, 0],
                      scale: [1, 1.2, 0.9, 1.1, 1] 
                    } : {}}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className={`w-full h-full flex items-center justify-center 
                      ${reason.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : ''} 
                      ${reason.color === 'green' ? 'text-green-600 dark:text-green-400' : ''} 
                      ${reason.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : ''} 
                      ${reason.color === 'pink' ? 'text-pink-600 dark:text-pink-400' : ''} 
                      ${reason.color === 'yellow' ? 'text-amber-600 dark:text-amber-400' : ''} 
                      ${reason.color === 'red' ? 'text-red-600 dark:text-red-400' : ''} 
                      ${reason.color === 'teal' ? 'text-teal-600 dark:text-teal-400' : ''} 
                      ${reason.color === 'orange' ? 'text-orange-600 dark:text-orange-400' : ''}
                      group-hover:text-${reason.color}-700 dark:group-hover:text-${reason.color}-300 
                      transition-colors duration-300 drop-shadow-md dark:drop-shadow-lg`}
                  >
                    {reason.icon}
                  </motion.div>
                </motion.div>
                  <motion.h3 
                  className={`text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-${reason.color}-600 dark:group-hover:text-${reason.color}-400 transition-all duration-500 relative inline-block`}
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="relative z-10">
                    {reason.title}
                    {/* Enhanced animated underline on hover with better animation */}
                    <motion.span
                      className={`absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-${reason.color}-500/90 to-${reason.color}-400/70 dark:from-${reason.color}-400/90 dark:to-${reason.color}-500/70 transform origin-left rounded-full`}
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: activeReason === index ? 1 : 0,
                        opacity: activeReason === index ? 1 : 0.7
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </motion.h3>
                
                <AnimatePresence mode="wait">
                  {activeReason === index ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.p 
                        className="text-gray-600 dark:text-gray-300 mt-3 text-sm leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.1, duration: 0.3 }
                        }}
                        exit={{ opacity: 0, y: 5 }}
                      >
                        {reason.description}
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.p 
                      className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 opacity-80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {reason.description.substring(0, 75)}...
                    </motion.p>
                  )}
                </AnimatePresence>
                  <div className="mt-auto pt-4">
                  <motion.button 
                    className={`text-sm flex items-center gap-2 font-medium 
                      ${activeReason === index 
                        ? `px-4 py-1.5 rounded-full bg-${reason.color}-100 dark:bg-${reason.color}-900/40 text-${reason.color}-600 dark:text-${reason.color}-300 shadow-sm shadow-${reason.color}-200/30 dark:shadow-${reason.color}-900/20` 
                        : `text-${reason.color}-500/80 dark:text-${reason.color}-400/80 group-hover:text-${reason.color}-600 dark:group-hover:text-${reason.color}-300`
                      } transition-all duration-300`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveReason(activeReason === index ? null : index);
                    }}
                    whileHover={{ 
                      x: activeReason === index ? 0 : 4,
                      scale: 1.05,
                      transition: { duration: 0.3, ease: "backOut" } 
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {activeReason === index ? "Show less" : "Read more"}
                    <motion.div
                      animate={activeReason === index 
                        ? { rotate: 90, x: 0 } 
                        : { rotate: 0, x: [0, 5, 0] }
                      }
                      transition={activeReason === index 
                        ? { duration: 0.3 }
                        : { 
                            rotate: { duration: 0.3 },
                            x: { duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }
                          }
                      }
                    >
                      <ArrowRight size={16} className={`${activeReason !== index ? "drop-shadow-sm" : ""}`} />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
          <motion.div 
          className="mt-28 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-purple-50/90 dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-purple-900/30 border border-blue-100/90 dark:border-blue-800/40 p-10 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl"
            whileHover={{ 
              boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.18)",
              y: -8,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
            data-aos="fade-up"
          >
            {/* Enhanced animated background pattern */}
            <div className="absolute inset-0">
              <motion.div 
                className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
                animate={{ 
                  backgroundPosition: ["0% 0%", "100% 100%"] 
                }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='currentColor' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundSize: "120px 120px"
                }}
              />
            </div>
            
            {/* Enhanced animated glow effects */}
            <motion.div 
              className="absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 15, 0],
                y: [0, -15, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            
            <motion.div 
              className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 dark:from-purple-400/15 dark:to-pink-400/15 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, -15, 0],
                y: [0, 15, 0]
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
            />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-full p-6 flex-shrink-0 shadow-xl shadow-blue-200/30 dark:shadow-blue-900/20 border border-blue-100/60 dark:border-blue-800/40"
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -8, 8, -5, 0],
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                <motion.div 
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 flex items-center justify-center text-white text-4xl font-bold shadow-inner overflow-hidden relative"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10,
                    delay: 0.3
                  }}
                >
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                      className="w-40 h-40 bg-white/20 blur-md"
                      style={{ rotate: -35, x: -30, y: -10 }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        repeatType: "loop", 
                        repeatDelay: 1,
                        ease: "easeInOut" 
                      }}
                    />
                  </div>
                  
                  <motion.span 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="relative z-10"
                  >
                    90<span className="text-base">%</span>
                  </motion.span>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:flex-1"
              >
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-300 dark:via-indigo-300 dark:to-purple-300"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Did You Know?
                </motion.h3>
                
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Over <span className="font-semibold text-blue-600 dark:text-blue-400">90%</span> of our interns report that their Internexis experience helped them secure 
                  their first job or freelance client. Our industry-aligned projects give you a significant 
                  competitive edge in the job market.
                </motion.p>
                
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <motion.a 
                    href="#testimonials" 
                    className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 font-medium group px-6 py-3 bg-blue-50/80 dark:bg-blue-900/30 rounded-full transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 shadow-sm hover:shadow-md shadow-blue-200/30 dark:shadow-blue-900/20 border border-blue-100/60 dark:border-blue-800/40"
                    whileHover={{ 
                      x: 6,
                      transition: { duration: 0.3, ease: "backOut" } 
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Read success stories
                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop", repeatDelay: 0.5 }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};