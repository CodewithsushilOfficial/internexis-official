import React, { useEffect, useRef, useState } from "react";
import { Code, MoveRight, Sparkles, Zap, Cpu, Database, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import StarBackground from "../../shared/StarBackground";

export const Hero: React.FC = () => {
  const floatingIconsRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [displayedText, setDisplayedText] = useState({ learn: "", build: "", certified: "" });
  
  // Text content for typewriter effect
  const textContent = {
    learn: "Learn,",
    build: "Build",
    certified: "Get Certified"
  };

  // Indian college student images with laptops for the slideshow
  const csImages = [
    {
      url: "https://iili.io/3ZCSdmJ.jpg",
      alt: "Indian student studying with laptop",
    },
    {
      url: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Indian students collaborating with laptop",
    },
    {
      url: "https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Indian student with laptop in classroom",
    },
    {
      url: "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Indian college students studying together with laptop",
    },
  ];

  // College student images already defined, no need for testimonials array

  useEffect(() => {
    // Auto-change the images every 5 seconds
    const imageInterval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % csImages.length);
    }, 5000);

    return () => {
      clearInterval(imageInterval);
    };
  }, [csImages.length]);

  // Typewriter effect for headlines
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    const typeText = (text: string, delay: number, setter: (value: string) => void) => {
      for (let i = 0; i <= text.length; i++) {
        const timeout = setTimeout(() => {
          setter(text.slice(0, i));
        }, delay + i * 100);
        timeouts.push(timeout);
      }
    };

    // Clear previous text
    setDisplayedText({ learn: "", build: "", certified: "" });
    
    // Start typing animations with delays
    typeText(textContent.learn, 800, (text) => 
      setDisplayedText(prev => ({ ...prev, learn: text }))
    );
    typeText(textContent.build, 2000, (text) => 
      setDisplayedText(prev => ({ ...prev, build: text }))
    );
    typeText(textContent.certified, 3500, (text) => 
      setDisplayedText(prev => ({ ...prev, certified: text }))
    );

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
    const icons = floatingIconsRef.current?.children;
    if (!icons) return;

    const animateFloating = () => {
      Array.from(icons).forEach((icon, index) => {
        const element = icon as HTMLElement;
        const delay = index * 100;
        setTimeout(() => {
          const xMovement = (Math.random() - 0.5) * 30;
          const yMovement = (Math.random() - 0.5) * 30;
          element.style.transform = `translate(${xMovement}px, ${yMovement}px) rotate(${Math.random() * 10 - 5}deg)`;
          element.style.transition =
            "transform 3s cubic-bezier(0.4, 0, 0.2, 1)";
        }, delay);
      });
    };

    animateFloating();
    const floatingInterval = setInterval(animateFloating, 3000);

    return () => clearInterval(floatingInterval);
  }, []);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  return (
    <section
      className="relative min-h-[100vh] pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-white dark:bg-gray-900"
      id="hero"
      data-aos="fade"
    >
      {/* Modern 3D Background with Animated Gradients */}
      <StarBackground />
      
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-transparent to-purple-50/20 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10"></div>
      
      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        />
        
        {/* Geometric grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM0Qjk5RkYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iNSIgY3k9IjUiIHI9IjMiLz48Y2lyY2xlIGN4PSIzNSIgY3k9IjUiIHI9IjIiLz48Y2lyY2xlIGN4PSI1NSIgY3k9IjE1IiByPSIyIi8+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMyIvPjxjaXJjbGUgY3g9IjQ1IiBjeT0iMzUiIHI9IjIiLz48Y2lyY2xlIGN4PSIxNSIgY3k9IjQ1IiByPSIzIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>

      {/* Enhanced Floating Tech Icons */}
      <div
        ref={floatingIconsRef}
        className="absolute inset-0 overflow-hidden opacity-5 sm:opacity-10 md:opacity-20 dark:opacity-10 dark:md:opacity-30 pointer-events-none z-5"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 transition-transform backdrop-blur-md p-2 md:p-4 rounded-lg md:rounded-2xl bg-white/10 dark:bg-gray-800/10 border border-white/10 dark:border-gray-700/10 hidden sm:block"
        >
          <Code size={40} className="md:w-[52px] md:h-[52px] text-blue-600 dark:text-blue-400 drop-shadow-lg" />
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/5 right-1/4 transition-transform backdrop-blur-md p-2 md:p-4 rounded-lg md:rounded-2xl bg-white/10 dark:bg-gray-800/10 border border-white/10 dark:border-gray-700/10 hidden sm:block"
        >
          <Rocket size={36} className="md:w-[46px] md:h-[46px] text-purple-600 dark:text-purple-400 drop-shadow-lg" />
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 left-1/3 transition-transform backdrop-blur-md p-2 md:p-4 rounded-lg md:rounded-2xl bg-white/10 dark:bg-gray-800/10 border border-white/10 dark:border-gray-700/10 hidden sm:block"
        >
          <Database size={32} className="md:w-[42px] md:h-[42px] text-green-600 dark:text-green-400 drop-shadow-lg" />
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, 18, 0],
            rotate: [0, -6, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-1/4 right-1/3 transition-transform backdrop-blur-md p-2 md:p-4 rounded-lg md:rounded-2xl bg-white/10 dark:bg-gray-800/10 border border-white/10 dark:border-gray-700/10 hidden sm:block"
        >
          <Cpu size={30} className="md:w-[40px] md:h-[40px] text-orange-600 dark:text-orange-400 drop-shadow-lg" />
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-2/5 left-2/3 transition-transform backdrop-blur-md p-2 md:p-4 rounded-lg md:rounded-2xl bg-white/10 dark:bg-gray-800/10 border border-white/10 dark:border-gray-700/10 hidden sm:block"
        >
          <Zap size={28} className="md:w-[36px] md:h-[36px] text-yellow-600 dark:text-yellow-400 drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Main content with enhanced modern layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-30 h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-12 xl:gap-16 min-h-[calc(100vh-12rem)] lg:min-h-[calc(100vh-8rem)]">
          {/* Left side - Ultra Modern Text content */}
          <div className="w-full lg:w-1/2 xl:w-5/12 space-y-6 md:space-y-8 text-center lg:text-left order-1 lg:order-1">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm md:text-xs lg:text-sm font-semibold shadow-lg backdrop-blur-md"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
              </motion.div>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                🚀 Your path to industry-ready skills
              </span>
            </motion.div>

            <div className="space-y-3 md:space-y-4">
              <motion.h1 
                className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.85] sm:leading-[0.9] tracking-tighter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-gray-900 dark:text-white drop-shadow-sm">
                  {displayedText.learn}
                  {displayedText.learn.length < textContent.learn.length && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-blue-600"
                    >
                      |
                    </motion.span>
                  )}
                </span>
                <br />
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-blue-600 dark:text-blue-400 drop-shadow-lg"
                  style={{
                    WebkitTextStroke: "1px rgba(59, 130, 246, 0.1)",
                  }}
                >
                  {displayedText.build}
                  {displayedText.build.length < textContent.build.length && displayedText.learn.length >= textContent.learn.length && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-blue-600"
                    >
                      |
                    </motion.span>
                  )}
                </motion.span>
                <span className="text-gray-900 dark:text-white">
                  {displayedText.build.length >= textContent.build.length ? " & " : ""}
                </span>
                <br />
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1,
                  }}
                  className="text-purple-600 dark:text-purple-400 drop-shadow-lg"
                  style={{
                    WebkitTextStroke: "1px rgba(236, 72, 153, 0.1)",
                  }}
                >
                  {displayedText.certified}
                  {displayedText.certified.length < textContent.certified.length && displayedText.build.length >= textContent.build.length && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-purple-600"
                    >
                      |
                    </motion.span>
                  )}
                </motion.span>
              </motion.h1>
            </div>

            <motion.p
              custom={2}
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              viewport={{ once: true }}
              className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 max-w-full lg:max-w-2xl leading-relaxed font-medium mx-auto lg:mx-0"
            >
              A{" "}
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                next-generation EduTech
              </span>{" "}
              and digital services platform offering comprehensive internships, cutting-edge training, expert career guidance, and innovative digital solutions.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-2 md:pt-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#programs"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 md:px-6 lg:px-10 py-4 md:py-3 lg:py-4 rounded-2xl text-lg md:text-base lg:text-lg font-bold text-white overflow-hidden shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-blue-600 group-hover:bg-blue-700 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/20 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-3">
                  Explore Programs
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <MoveRight size={18} />
                  </motion.div>
                </span>
              </motion.a>
              
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfMY0zYYwtHDW5gdBcoBWxsU0xPTyCzOAGPCUtnaMqqGcmnCg/viewform?usp=header"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 md:px-6 lg:px-10 py-4 md:py-3 lg:py-4 rounded-2xl text-lg md:text-base lg:text-lg font-bold border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 backdrop-blur-md transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Apply Now
                  <motion.div
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎯
                  </motion.div>
                </span>
              </motion.a>
            </motion.div>


          </div>

          {/* Right side - Ultra Modern Image content with 3D effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full lg:w-1/2 xl:w-7/12 relative perspective-1000 order-2 lg:order-2 mt-8 md:mt-4 lg:-mt-8"
          >
            <div className="relative transform-gpu max-w-lg md:max-w-xl lg:max-w-none mx-auto">
              {/* Main futuristic image container with 3D depth */}
              <motion.div
                whileHover={{ 
                  rotateY: 3, 
                  rotateX: 3, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative z-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 dark:ring-gray-700/30 transform-gpu preserve-3d"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 dark:border-gray-700/20 shadow-2xl backdrop-blur-xl">
                  {/* Enhanced auto-sliding image carousel with parallax effect */}
                  {csImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ 
                        opacity: activeImage === index ? 1 : 0,
                        scale: activeImage === index ? 1 : 1.1,
                      }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className={`absolute inset-0 ${activeImage === index ? "block" : "hidden"}`}
                    >
                      {/* Gradient overlay with modern styling */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/20 z-10"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>
                      
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Modern tech overlay pattern */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] opacity-30 z-15"></div>
                    </motion.div>
                  ))}

                  {/* Enhanced carousel indicators with modern design */}
                  <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-20">
                    {csImages.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`relative overflow-hidden transition-all duration-500 ${
                          activeImage === index
                            ? "w-6 md:w-8 h-2 md:h-3 bg-white shadow-lg shadow-white/50"
                            : "w-2 md:w-3 h-2 md:h-3 bg-white/50 hover:bg-white/70"
                        } rounded-full`}
                      >
                        {activeImage === index && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Modern image caption with glassmorphism */}
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-4 md:bottom-6 left-4 md:left-6 bg-black/30 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl text-xs font-semibold text-white/90 z-20 border border-white/10"
                  >
                    {csImages[activeImage].alt}
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating 3D elements around the image - Responsive positioning */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-1 md:-top-3 -right-1 md:-right-3 w-6 h-6 md:w-10 md:h-10 bg-yellow-400 rounded-md md:rounded-xl shadow-lg shadow-yellow-500/25 flex items-center justify-center z-30 transform-gpu"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="text-sm md:text-base"
                >
                  ⚡
                </motion.div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute -bottom-1 md:-bottom-3 -left-1 md:-left-3 w-5 h-5 md:w-9 md:h-9 bg-cyan-400 rounded-md md:rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center z-30 transform-gpu"
              >
                <span className="text-xs md:text-sm">🎯</span>
              </motion.div>

              {/* Enhanced floating pricing card - Responsive */}
              <motion.div
                initial={{ opacity: 0, x: 30, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="absolute -right-1 md:-right-3 -bottom-2 md:-bottom-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-md md:rounded-lg p-1 md:p-2 shadow-lg border border-white/20 dark:border-gray-700/20 z-30 max-w-[120px] md:max-w-[160px] transform-gpu"
              >
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="text-center">
                    <div className="text-sm md:text-base font-black text-orange-500">
                      ₹99
                    </div>
                    <div className="text-[8px] md:text-[9px] text-gray-600 dark:text-gray-300 font-semibold">
                      Internship
                    </div>
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="px-1 md:px-1.5 py-0.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300 text-[7px] md:text-[8px] font-bold rounded-full border border-green-200 dark:border-green-700 text-center">
                      💼 100% placement
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-[7px] md:text-[8px] text-gray-500 dark:text-gray-400 text-center"
                    >
                      ⭐ Certified
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced certificate badge with 3D effect - Responsive */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                whileHover={{ 
                  y: -8, 
                  rotate: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="absolute -left-2 md:-left-8 top-6 md:top-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-md md:rounded-xl p-2 md:p-3 shadow-lg border border-white/20 dark:border-gray-700/20 z-30 transform-gpu"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-blue-600 text-white p-1.5 md:p-2 rounded-md md:rounded-lg shadow-lg">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        className="md:w-5 md:h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-black text-gray-900 dark:text-white">
                      Certified
                    </div>
                    <div className="text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400">
                      Industry recognized
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional floating elements for depth - Responsive */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-1/4 -right-4 md:-right-8 w-3 h-3 md:w-5 md:h-5 bg-pink-400 rounded-full shadow-lg shadow-pink-500/25 z-20"
              />
              
              <motion.div
                animate={{
                  y: [0, 12, 0],
                  rotate: [0, -90, -180],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 3,
                }}
                className="absolute bottom-1/3 -left-2 md:-left-6 w-2 h-2 md:w-4 md:h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/25 z-20"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ultra Modern Wave Separator with Gradient */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10">
        <motion.div
          animate={{
            x: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-[200%] h-auto"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(255, 255, 255)" />
                <stop offset="25%" stopColor="rgb(249, 250, 251)" />
                <stop offset="50%" stopColor="rgb(243, 244, 246)" />
                <stop offset="75%" stopColor="rgb(249, 250, 251)" />
                <stop offset="100%" stopColor="rgb(255, 255, 255)" />
              </linearGradient>
              <linearGradient id="waveGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(17, 24, 39)" />
                <stop offset="25%" stopColor="rgb(31, 41, 55)" />
                <stop offset="50%" stopColor="rgb(55, 65, 81)" />
                <stop offset="75%" stopColor="rgb(31, 41, 55)" />
                <stop offset="100%" stopColor="rgb(17, 24, 39)" />
              </linearGradient>
            </defs>
            <path 
              d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,69.3C960,64,1056,32,1152,26.7C1248,21,1344,43,1392,53.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="url(#waveGradient)"
              className="dark:hidden"
            />
            <path 
              d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,69.3C960,64,1056,32,1152,26.7C1248,21,1344,43,1392,53.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="url(#waveGradientDark)"
              className="hidden dark:block"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
