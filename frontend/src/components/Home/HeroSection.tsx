import React, { useEffect, useRef } from "react";
import { Code, MoveRight, Database, Rocket, Trophy, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import StarBackground from "../common/StarBackground";

export const HeroSection: React.FC = () => {
  const floatingIconsRef = useRef<HTMLDivElement>(null);
  
  // Main hero image for circular display
  const heroImage = {
    url: "https://iili.io/3ZCSdmJ.jpg",
    alt: "Indian student studying with laptop",
  };

  useEffect(() => {
    // Simple floating animation for icons
    const icons = floatingIconsRef.current?.children;
    if (!icons) return;

    const animateFloating = () => {
      Array.from(icons).forEach((icon, index) => {
        const element = icon as HTMLElement;
        const delay = index * 200;
        setTimeout(() => {
          const xMovement = (Math.random() - 0.5) * 40;
          const yMovement = (Math.random() - 0.5) * 40;
          element.style.transform = `translate(${xMovement}px, ${yMovement}px) rotate(${Math.random() * 10 - 5}deg)`;
          element.style.transition = "transform 4s cubic-bezier(0.4, 0, 0.2, 1)";
        }, delay);
      });
    };

    animateFloating();
    const floatingInterval = setInterval(animateFloating, 4000);

    return () => clearInterval(floatingInterval);
  }, []);

  return (
    <section
      className="relative min-h-screen pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-white dark:bg-gray-900"
      id="hero"
      data-aos="fade"
    >
      {/* Modern Background Elements */}
      <StarBackground />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/10 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        
        {/* Overlapping colored semicircles */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-2xl"
        />
      </div>

      {/* Floating Tech Icons */}
      <div
        ref={floatingIconsRef}
        className="absolute inset-0 overflow-hidden opacity-10 md:opacity-20 dark:opacity-30 pointer-events-none z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/4 left-1/4 p-3 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 shadow-lg"
        >
          <Code size={32} className="text-blue-600 dark:text-blue-400" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="absolute top-1/3 right-1/4 p-3 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 shadow-lg"
        >
          <Rocket size={28} className="text-purple-600 dark:text-purple-400" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.9 }}
          className="absolute bottom-1/3 left-1/3 p-3 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 shadow-lg"
        >
          <Database size={30} className="text-green-600 dark:text-green-400" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.1 }}
          className="absolute bottom-1/4 right-1/3 p-3 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 shadow-lg"
        >
          <Trophy size={26} className="text-orange-600 dark:text-orange-400" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-24 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10 text-center lg:text-left order-2 lg:order-1 px-4 lg:px-0"
          >
            {/* Large 3-part headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight px-2 lg:px-0">
                <div className="mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {"Learn,".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        transition={{
                          duration: 0.05,
                          delay: index * 0.08,
                          repeat: Infinity,
                          repeatType: "loop",
                          repeatDelay: 5,
                          ease: "easeOut"
                        }}
                        style={{ display: 'inline-block', overflow: 'hidden' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.5,
                        delay: 0.48,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 5,
                        ease: "easeInOut"
                      }}
                      className="text-blue-600 dark:text-blue-400 ml-1"
                    >
                      |
                    </motion.span>
                  </span>{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">
                    {"Grow".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        transition={{
                          duration: 0.05,
                          delay: 0.6 + index * 0.08,
                          repeat: Infinity,
                          repeatType: "loop",
                          repeatDelay: 5,
                          ease: "easeOut"
                        }}
                        style={{ display: 'inline-block', overflow: 'hidden' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.5,
                        delay: 0.92,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 5,
                        ease: "easeInOut"
                      }}
                      className="text-purple-600 dark:text-purple-400 ml-1"
                    >
                      |
                    </motion.span>
                  </span>
                </div>
                <div>
                  <span className="text-gray-800 dark:text-white">
                    {"& ".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        transition={{
                          duration: 0.05,
                          delay: 1.1 + index * 0.08,
                          repeat: Infinity,
                          repeatType: "loop",
                          repeatDelay: 5,
                          ease: "easeOut"
                        }}
                        style={{ display: 'inline-block', overflow: 'hidden' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.5,
                        delay: 1.26,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 5,
                        ease: "easeInOut"
                      }}
                      className="text-gray-800 dark:text-white ml-1"
                    >
                      |
                    </motion.span>
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                    {"Succeed".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        transition={{
                          duration: 0.05,
                          delay: 1.3 + index * 0.08,
                          repeat: Infinity,
                          repeatType: "loop",
                          repeatDelay: 5,
                          ease: "easeOut"
                        }}
                        style={{ display: 'inline-block', overflow: 'hidden' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.5,
                        delay: 1.86,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 5,
                        ease: "easeInOut"
                      }}
                      className="text-emerald-600 dark:text-emerald-400 ml-1"
                    >
                      |
                    </motion.span>
                  </span>
                </div>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-medium px-2 lg:px-0">
                <span className="text-indigo-600 dark:text-indigo-400">Internships</span> • <span className="text-purple-600 dark:text-purple-400">Mentorship</span> • <span className="text-blue-600 dark:text-blue-400">Skill Training</span> • <span className="text-emerald-600 dark:text-emerald-400">Career Growth</span>
              </p>
            </motion.div>

            {/* Subheading paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="px-2 lg:px-0"
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light leading-relaxed max-w-4xl mx-auto lg:mx-0">
                A next-generation <span className="font-semibold text-indigo-600 dark:text-indigo-400">career-first platform</span> delivering industry-ready internships, hands-on training, live mentorship, and real-world certifications — built for students who <span className="font-semibold text-purple-600 dark:text-purple-400">dream big</span> and <span className="font-semibold text-emerald-600 dark:text-emerald-400">build bigger</span>.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6 px-2 lg:px-0"
            >
              <motion.a
                href="#programs"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-white/20 to-indigo-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Explore Programs
                  <MoveRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfMY0zYYwtHDW5gdBcoBWxsU0xPTyCzOAGPCUtnaMqqGcmnCg/viewform?usp=header"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white font-bold text-xl rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
              >
                <span className="flex items-center justify-center gap-2">
                  Apply Now
                  <motion.span
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎯
                  </motion.span>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Circular Image with Overlays */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center items-center order-1 lg:order-2 px-4 lg:px-0"
          >
            {/* Main circular image container */}
            <div className="relative mx-auto">
              {/* Circular image */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] xl:w-[520px] xl:h-[520px] rounded-full overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20"></div>
                <img
                  src={heroImage.url}
                  alt={heroImage.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating badges and icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 px-5 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">✅ Certified</div>
                    <div className="text-xs text-green-600 dark:text-green-400">Industry Recognized</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 px-5 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 text-sm font-semibold">
                  <div className="text-orange-500 font-bold">₹99</div>
                  <div className="text-gray-400">|</div>
                  <div className="text-green-600 dark:text-green-400">100% Placement</div>
                  <div className="text-gray-400">|</div>
                  <div className="text-blue-600 dark:text-blue-400">⭐ Certified</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute top-1/2 -right-10 bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">💼</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 font-semibold">Internship</div>
                </div>
              </motion.div>

              {/* Floating animated icons */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 left-1/4 text-3xl"
              >
                🎯
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-8 right-1/4 text-3xl"
              >
                ⚡
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-1/4 -left-8 text-3xl"
              >
                📃
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 18, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-1/4 -right-12 text-3xl"
              >
                💼
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
