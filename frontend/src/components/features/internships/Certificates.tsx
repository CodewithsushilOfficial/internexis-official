import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../lib/hooks/use-theme";
import { Award, Download, Eye, Shield, Star, Sparkles, CheckCircle, ExternalLink } from "lucide-react";

export const Certificates: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "internship" | "training" | "evaluation"
  >("internship");
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const certificateImages = {
    internship: "https://iili.io/3whm6o7.jpg",
    training: "https://iili.io/3whm6o7.jpg",
    evaluation: "https://iili.io/3whm6o7.jpg",
  };

  // Enhanced tab colors with modern gradients
  const tabColors = {
    internship: {
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      darkGradient: "from-blue-600 via-indigo-600 to-purple-700",
      glowColor: "rgba(99, 102, 241, 0.4)",
      textColor: isDarkMode ? "text-blue-300" : "text-blue-700",
      bgColor: isDarkMode ? "bg-blue-900/20" : "bg-blue-50",
      borderColor: "border-blue-500/30",
      accentColor: "text-blue-500",
      icon: Award,
    },
    training: {
      gradient: "from-purple-500 via-pink-500 to-rose-600",
      darkGradient: "from-purple-600 via-pink-600 to-rose-700",
      glowColor: "rgba(236, 72, 153, 0.4)",
      textColor: isDarkMode ? "text-pink-300" : "text-pink-700",
      bgColor: isDarkMode ? "bg-pink-900/20" : "bg-pink-50",
      borderColor: "border-pink-500/30",
      accentColor: "text-pink-500",
      icon: Shield,
    },
    evaluation: {
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      darkGradient: "from-emerald-600 via-teal-600 to-cyan-700",
      glowColor: "rgba(20, 184, 166, 0.4)",
      textColor: isDarkMode ? "text-emerald-300" : "text-emerald-700",
      bgColor: isDarkMode ? "bg-emerald-900/20" : "bg-emerald-50",
      borderColor: "border-emerald-500/30",
      accentColor: "text-emerald-500",
      icon: Star,
    },
  };

  const tabContent = {
    internship: {
      title: "Certificate of Internship",
      description:
        "Official recognition of your completed internship, verified by our partnered institutions. Includes a unique verification ID and digital signature for authenticity.",
      features: [
        "AICTE & Government Recognized",
        "Includes project details",
        "Digital verification system",
        "LinkedIn-optimized format",
      ],
    },
    training: {
      title: "Certificate of Training",
      description:
        "Awarded upon completion of the associated coursework and skill development portions of the program. Highlights your technical competencies.",
      features: [
        "Details specific skills acquired",
        "Training hours included",
        "Endorsed by industry partners",
        "Shareable as digital badge",
      ],
    },
    evaluation: {
      title: "Performance Evaluation",
      description:
        "Detailed assessment of your performance across various competencies and skills demonstrated during the internship period.",
      features: [
        "Personalized feedback",
        "Quantitative skill ratings",
        "Strengths and improvement areas",
        "Recommendations for growth",
      ],
    },
  };

  return (
    <section
      ref={sectionRef}
      className={`py-20 md:py-32 relative overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100"
      }`}
      id="certificates"
    >
      {/* Enhanced floating elements with animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-60 left-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-teal-500/10 to-emerald-500/10 blur-3xl"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 blur-3xl"
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 md:px-8 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Enhanced Header Section */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-xl border ${
              isDarkMode
                ? "bg-gradient-to-r from-indigo-900/30 to-purple-900/30 text-indigo-300 border-indigo-500/30"
                : "bg-gradient-to-r from-indigo-100/80 to-purple-100/80 text-indigo-700 border-indigo-200/50"
            } shadow-lg`}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Recognized Certifications
            <motion.div
              className="ml-2 w-2 h-2 bg-current rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <motion.h2
            className={`text-5xl md:text-7xl font-bold mb-8 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Certificate
              </span>{" "}
              <span className="relative">
                Samples
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </span>
            </span>
          </motion.h2>
          
          <motion.p
            className={`text-xl md:text-2xl leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Internexis provides{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              verified, downloadable,
            </span>{" "}
            and industry-recognized certificates that boost your career
          </motion.p>
        </motion.div>

        {/* Enhanced Content Layout */}
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Certificate Display - Left Side */}
          <motion.div 
            className="lg:col-span-3 order-2 lg:order-1 flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className={`relative group overflow-hidden rounded-3xl ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-800/60 to-gray-900/60 shadow-2xl shadow-indigo-500/10"
                  : "bg-gradient-to-br from-white/80 to-gray-50/80 shadow-2xl shadow-blue-200/30"
              } backdrop-blur-xl border ${
                isDarkMode ? "border-gray-700/50" : "border-white/50"
              } p-8`}
              whileHover={{ 
                scale: 1.02,
                boxShadow: isDarkMode 
                  ? "0 25px 50px rgba(99, 102, 241, 0.15)" 
                  : "0 25px 50px rgba(59, 130, 246, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTab}
                    src={certificateImages[activeTab]}
                    alt={`${activeTab} certificate`}
                    className="w-full h-auto rounded-2xl shadow-lg"
                    initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </AnimatePresence>
                
                {/* Certificate overlay info */}
                <motion.div
                  className="absolute top-4 right-4 flex gap-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <motion.button
                    className={`p-2 rounded-lg backdrop-blur-xl ${
                      isDarkMode 
                        ? "bg-white/10 text-white border border-white/20" 
                        : "bg-black/10 text-gray-700 border border-black/20"
                    } hover:scale-110 transition-transform`}
                    whileHover={{ rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className={`p-2 rounded-lg backdrop-blur-xl ${
                      isDarkMode 
                        ? "bg-white/10 text-white border border-white/20" 
                        : "bg-black/10 text-gray-700 border border-black/20"
                    } hover:scale-110 transition-transform`}
                    whileHover={{ rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Tabs and Content - Right Side */}
          <motion.div 
            className="lg:col-span-2 order-1 lg:order-2 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Enhanced Tab Navigation */}
            <div className="mb-6">
              <div
                className={`flex p-1.5 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-800/50 border border-gray-700/50"
                    : "bg-white/50 border border-gray-200/50"
                } backdrop-blur-xl shadow-lg overflow-hidden`}
              >
                {Object.entries(tabContent).map(([tab]) => {
                  const IconComponent = tabColors[tab as keyof typeof tabColors].icon;
                  const isActive = activeTab === tab;
                  
                  return (
                    <motion.button
                      key={tab}
                      className={`relative flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                        isActive
                          ? isDarkMode
                            ? "text-white shadow-lg"
                            : "text-gray-900 shadow-lg"
                          : isDarkMode
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() =>
                        setActiveTab(tab as "internship" | "training" | "evaluation")
                      }
                      whileHover={{ y: isActive ? 0 : -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div
                          className={`absolute inset-0 rounded-lg bg-gradient-to-r ${
                            tabColors[tab as keyof typeof tabColors].gradient
                          } opacity-90`}
                          layoutId="activeTab"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      
                      <div className="relative z-10 flex items-center justify-center gap-1.5">
                        <IconComponent className="w-4 h-4" />
                        <span className="hidden sm:inline text-sm">
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </span>
                      </div>
                      
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-white/20"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Content Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className={`${
                  isDarkMode
                    ? "bg-gray-800/60 border border-gray-700/50"
                    : "bg-white/60 border border-gray-200/50"
                } p-6 rounded-2xl shadow-xl backdrop-blur-xl relative overflow-hidden`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Background decoration */}
                <motion.div
                  className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${
                    tabColors[activeTab].gradient
                  } opacity-10 rounded-bl-[80px] rounded-tr-2xl`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />

                <div className="relative z-10">
                  <motion.h3
                    className={`text-2xl md:text-3xl font-bold mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span
                      className={`bg-clip-text text-transparent bg-gradient-to-r ${
                        tabColors[activeTab].gradient
                      }`}
                    >
                      {tabContent[activeTab].title}
                    </span>
                  </motion.h3>
                  
                  <motion.p
                    className={`text-base md:text-lg mb-6 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    } leading-relaxed`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {tabContent[activeTab].description}
                  </motion.p>

                  <motion.h4
                    className={`text-lg font-semibold mb-4 ${
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    } flex items-center`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Star className="mr-2 w-4 h-4 text-yellow-500" />
                    Key Features:
                  </motion.h4>
                  
                  <motion.ul 
                    className="space-y-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {tabContent[activeTab].features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <motion.div
                          className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 mt-0.5 flex-shrink-0 ${
                            tabColors[activeTab].bgColor
                          } ${tabColors[activeTab].textColor} shadow-lg`}
                          whileHover={{ 
                            scale: 1.1, 
                            boxShadow: `0 0 20px ${tabColors[activeTab].glowColor}` 
                          }}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </motion.div>
                        <span
                          className={`text-base ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Enhanced verification section */}
                  <motion.div
                    className={`${
                      isDarkMode
                        ? "bg-gray-900/50 border border-gray-600/30"
                        : `${tabColors[activeTab].bgColor} border ${tabColors[activeTab].borderColor}`
                    } p-4 rounded-xl relative overflow-hidden`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                    
                    <div className="flex items-start relative z-10">
                      <motion.div
                        className={`mr-3 p-2 rounded-lg bg-gradient-to-br ${
                          tabColors[activeTab].gradient
                        } shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Shield className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h5
                          className={`font-bold text-lg mb-1 ${
                            tabColors[activeTab].accentColor
                          }`}
                        >
                          Verification System
                        </h5>
                        <p
                          className={`${
                            isDarkMode ? "text-gray-300" : tabColors[activeTab].textColor
                          } text-base leading-relaxed`}
                        >
                          Each certificate includes a unique QR code and verification ID
                          that employers can use to validate authenticity through our
                          secure online portal.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced CTA button */}
                  <motion.button
                    className={`mt-6 px-6 py-3 rounded-xl font-semibold text-base text-white relative group overflow-hidden
                    bg-gradient-to-r ${tabColors[activeTab].gradient} shadow-lg hover:shadow-xl transform transition-all duration-300`}
                    whileHover={{ 
                      y: -3, 
                      scale: 1.02,
                      boxShadow: `0 20px 40px ${tabColors[activeTab].glowColor}` 
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10 flex items-center">
                      View Sample Certificate
                      <motion.div
                        className="ml-2"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.div>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
