import React, { useEffect, useRef, useState } from "react";
import { Code, Monitor, Bot, MoveRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import StarBackground from "../../shared/StarBackground";

export const Hero: React.FC = () => {
  const floatingIconsRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);

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

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 1.0, duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      className="relative min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
      id="hero"
      data-aos="fade"
    >
      {/* 3D Star Background */}
      <StarBackground />

      {/* Modern stylish background with animated gradients */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900 overflow-hidden opacity-60 dark:opacity-50">
        {/* Primary background with animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 opacity-80"></div>

        {/* Animated gradient blobs */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary-300/20 to-transparent dark:from-primary-700/20 dark:to-transparent rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-secondary-300/20 to-transparent dark:from-secondary-700/20 dark:to-transparent rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/3 w-1/3 h-1/3 bg-gradient-to-tr from-accent-300/20 to-transparent dark:from-accent-700/20 dark:to-transparent rounded-full blur-3xl animate-blob animation-delay-6000"></div>

        {/* Enhanced Grid pattern - kept subtle */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-[length:40px_40px] opacity-[0.03] dark:opacity-[0.05] z-0"></div>

        {/* Background mesh overlay for depth */}
        <div className="absolute inset-0 bg-[url('/patterns/hero-pattern.svg')] bg-repeat opacity-[0.02] dark:opacity-[0.04]"></div>

        {/* Professional geometric shapes that complement 3D background */}
        <div
          className="absolute top-20 right-[20%] w-64 h-64 border border-primary-200/15 dark:border-primary-700/10 rounded-full z-0 animate-pulse"
          style={{ animationDuration: "15s" }}
        ></div>
        <div
          className="absolute bottom-40 left-[15%] w-48 h-48 border border-secondary-200/15 dark:border-secondary-700/10 rounded-full z-0 animate-pulse"
          style={{ animationDuration: "18s" }}
        ></div>
        <div
          className="absolute top-1/3 left-[60%] w-32 h-32 border border-accent-200/15 dark:border-accent-700/10 rounded-full z-0 animate-pulse"
          style={{ animationDuration: "12s" }}
        ></div>

        {/* Modern abstract shapes with reduced opacity to complement 3D scene */}
        <div className="absolute top-[15%] left-[10%] w-40 h-40">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-5 dark:opacity-8"
          >
            <path
              d="M50 0L93.3 75H6.7L50 0Z"
              fill="currentColor"
              className="text-primary-500 dark:text-primary-400"
            />
          </svg>
        </div>
        <div className="absolute bottom-[20%] right-[15%] w-28 h-28">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-5 dark:opacity-8"
          >
            <rect
              x="10"
              y="10"
              width="80"
              height="80"
              rx="20"
              fill="currentColor"
              className="text-secondary-500 dark:text-secondary-400"
            />
          </svg>
        </div>

        {/* Additional floating elements that complement the 3D scene */}
        <div className="absolute top-[40%] right-[25%] w-16 h-16">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-5 dark:opacity-8 animate-pulse"
            style={{ animationDuration: "20s" }}
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="currentColor"
              className="text-accent-500 dark:text-accent-400"
            />
          </svg>
        </div>

        {/* Subtle dot patterns */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="absolute top-10 right-[30%] w-[25%] h-[40%]">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="dots-1"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="4"
                    cy="4"
                    r="1.5"
                    fill="currentColor"
                    className="text-primary-500 dark:text-primary-400"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots-1)" />
            </svg>
          </div>
          <div className="absolute bottom-20 left-[25%] w-[20%] h-[30%]">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="dots-2"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="4"
                    cy="4"
                    r="1"
                    fill="currentColor"
                    className="text-secondary-500 dark:text-secondary-400"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots-2)" />
            </svg>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary-200/30 dark:border-primary-700/20 rounded-full z-0"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 border-2 border-secondary-200/20 dark:border-secondary-700/10 rounded-full z-0"></div>
      </div>

      {/* Enhanced Floating icons with glass effect to complement 3D background */}
      <div
        ref={floatingIconsRef}
        className="absolute inset-0 overflow-hidden opacity-[0.18] dark:opacity-[0.25] pointer-events-none z-10"
      >
        <div className="absolute top-1/4 left-1/4 transition-transform backdrop-blur-sm p-3 rounded-xl bg-white/10 dark:bg-gray-800/10">
          <Code
            size={48}
            className="text-blue-600 dark:text-blue-400 drop-shadow"
          />
        </div>
        <div className="absolute top-1/5 right-1/4 transition-transform backdrop-blur-sm p-3 rounded-xl bg-white/10 dark:bg-gray-800/10">
          <Monitor
            size={42}
            className="text-purple-600 dark:text-purple-400 drop-shadow"
          />
        </div>
        <div className="absolute bottom-1/3 left-1/3 transition-transform backdrop-blur-sm p-3 rounded-xl bg-white/10 dark:bg-gray-800/10">
          <Bot
            size={38}
            className="text-green-600 dark:text-green-400 drop-shadow"
          />
        </div>
        <div className="absolute bottom-1/4 right-1/3 transition-transform backdrop-blur-sm p-3 rounded-xl bg-white/10 dark:bg-gray-800/10">
          <MoveRight
            size={36}
            className="text-accent-500 dark:text-accent-400 drop-shadow"
          />
        </div>
        <div className="absolute top-2/5 left-2/3 transition-transform backdrop-blur-sm p-3 rounded-xl bg-white/10 dark:bg-gray-800/10">
          <Sparkles
            size={32}
            className="text-secondary-500 dark:text-secondary-400 drop-shadow"
          />
        </div>
      </div>

      {/* Main content with enhanced layout */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mt-8 md:mt-0">
          {/* Left side - Enhanced Text content - adjusted for better spacing */}
          <div className="w-full lg:w-5/12 space-y-7">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-800/50 border border-blue-100 dark:border-blue-700/30 text-blue-600 dark:text-blue-300 text-sm font-medium shadow-sm"
            >
              <Sparkles
                size={16}
                className="text-blue-500 dark:text-blue-400"
              />
              <span>Your path to industry-ready skills</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter text-gray-900 dark:text-white drop-shadow-sm backdrop-blur-[1px]">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  y: [0, -5, 0],
                  transition: {
                    opacity: { duration: 0.5 },
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop" as const,
                    },
                  },
                }}
                className="inline-block"
              >
                Learn,
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  color: ["#4F46E5", "#3B82F6", "#8B5CF6", "#4F46E5"],
                  scale: [1, 1.02, 1],
                  transition: {
                    opacity: { duration: 0.5, delay: 0.2 },
                    color: {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "loop" as const,
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop" as const,
                      delay: 0.3,
                    },
                  },
                }}
                className="inline-block text-primary-500 dark:text-primary-400"
              >
                Build
              </motion.span>{" "}
              & <br className="hidden sm:block" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  textShadow: [
                    "0px 0px 0px rgba(0,0,0,0)",
                    "0px 0px 8px rgba(236, 72, 153, 0.5)",
                    "0px 0px 0px rgba(0,0,0,0)",
                  ],
                  y: [0, -4, 0],
                  transition: {
                    opacity: { duration: 0.5, delay: 0.4 },
                    textShadow: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop" as const,
                    },
                    y: {
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "loop" as const,
                      delay: 0.6,
                    },
                  },
                }}
                className="inline-block text-accent-500 dark:text-accent-400 drop-shadow"
              >
                Get Certified
              </motion.span>
            </h1>

            <motion.p
              custom={2}
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 max-w-xl leading-relaxed drop-shadow-sm backdrop-blur-[1px]"
            >
              A self-independent EduTech and digital services platform offering
              internships, training, career guidance, and digital solutions for
              students, professionals, and businesses.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              viewport={{ once: true }}
              className="flex flex-wrap gap-5 pt-2"
            >
              <motion.a
                href="#programs"
                variants={buttonVariants}
                whileHover="hover"
                className="btn-primary px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-3 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-shadow"
              >
                Explore Programs
                <MoveRight size={18} />
              </motion.a>
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfMY0zYYwtHDW5gdBcoBWxsU0xPTyCzOAGPCUtnaMqqGcmnCg/viewform?usp=header"
                variants={buttonVariants}
                whileHover="hover"
                className="px-8 py-4 rounded-xl text-base font-semibold border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-600 dark:hover:border-blue-300 backdrop-blur-sm transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Apply Now
              </motion.a>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              viewport={{ once: true }}
              className="flex items-center gap-5 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border- dark:border-gray-800 overflow-hidden ring-2 ring-primary-50 dark:ring-primary-900 shadow-sm"
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/women/${10 + i}.jpg`}
                      className="w-full h-full object-cover"
                      alt="Student"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  15,000+
                </span>{" "}
                students trained
              </div>
            </motion.div>
          </div>

          {/* Right side - Enhanced Image content with modern styling - increased width and moved left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full lg:w-7/12 relative lg:-ml-10"
          >
            <div className="relative">
              {/* Main decorative image with modern glass morphism effect and border */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl ring-2 ring-primary-300/50 dark:ring-primary-500/30 transform hover:scale-[1.02] transition-transform duration-500">
                <div className="aspect-[16/10] bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-white/40 dark:border-gray-700/40 shadow-lg">
                  {/* Auto-sliding image carousel with enhanced display */}
                  {csImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeImage === index ? 1 : 0 }}
                      transition={{ duration: 0.8 }}
                      className={`absolute inset-0 ${activeImage === index ? "block" : "hidden"}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-transparent z-10"></div>
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover opacity-95"
                      />
                    </motion.div>
                  ))}

                  {/* Image carousel indicator dots with enhanced styling */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                    {csImages.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeImage === index
                            ? "bg-primary-400 scale-125 shadow-md shadow-primary-500/30"
                            : "bg-white/60 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Image caption - shows which slide is active */}
                  <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-medium text-white/90 z-20">
                    {csImages[activeImage].alt}
                  </div>
                </div>
              </div>

              {/* Enhanced decorative elements */}
              {/* Removed gradient decorative elements */}

              {/* Enhanced pricing card - moved to bottom right, made smaller */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -right-3 -bottom-3 shadow-2xl rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2.5 max-w-[150px] border border-gray-100 dark:border-gray-700 z-20"
              >
                <div className="text-center">
                  <div className="text-xl font-bold text-accent-500 mb-0.5">
                    ₹99
                  </div>
                  <div className="text-[10px] text-gray-600 dark:text-gray-300 font-medium">
                    Internship starts at
                  </div>
                  <div className="mt-1 text-[9px] font-medium text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 py-0.5 px-1.5 rounded-full mx-auto inline-block">
                    100% placement assistance
                  </div>
                </div>
              </motion.div>

              {/* Enhanced certificate badge - adjusted position */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="absolute -left-6 bottom-20 shadow-2xl rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 border border-gray-100 dark:border-gray-700 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 dark:bg-primary-600 text-white p-2 rounded-lg shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-award"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      Certified
                    </div>
                    <div className="text-xs font-medium text-primary-600 dark:text-primary-400">
                      Industry recognized
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced wave separator */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto fill-white dark:fill-gray-900 transform translate-y-1"
          preserveAspectRatio="none"
        >
          <path d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,69.3C960,64,1056,32,1152,26.7C1248,21,1344,43,1392,53.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};
