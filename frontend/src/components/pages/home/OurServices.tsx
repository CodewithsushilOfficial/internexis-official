import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Layers,
  Rocket,
  Code,
  Trophy,
  Heart,
  Target,
  Briefcase as BriefcaseIcon,
  Search,
  Award,
} from "lucide-react";
import AOS from "aos";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  gradient: string;
  hoverGradient: string;
  image: string;
  stats: string;
  category: string;
  badge?: string;
  features: string[];
  color: string;
}

// Modern Futuristic Background with Particles
function FuturisticBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Mesh Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)
          `,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 60% 60%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)`,
            `radial-gradient(circle at 40% 60%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 60% 40%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 20% 20%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)`
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating Geometric Shapes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
    </div>
  );
}

const services: Service[] = [
  {
    id: 1,
    title: "Internship Programs",
    description:
      "Real industry-based internships with hands-on projects, training, and certifications to accelerate your career growth",
    icon: <Rocket className="w-8 h-8" />,
    route: "/all-programs",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    hoverGradient: "from-blue-600 via-indigo-600 to-purple-700",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "1000+ Students",
    category: "Education",
    badge: "Most Popular",
    features: ["Live Projects", "Industry Mentors", "Certificates", "Career Support"],
    color: "blue",
  },
  {
    id: 2,
    title: "Digital Solutions",
    description:
      "Cutting-edge web development, mobile apps, AI automation, and digital transformation services for modern businesses",
    icon: <Code className="w-8 h-8" />,
    route: "/digital-solutions",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    hoverGradient: "from-emerald-600 via-teal-600 to-cyan-700",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "200+ Projects",
    category: "Technology",
    features: ["Custom Development", "AI Integration", "Cloud Solutions", "24/7 Support"],
    color: "emerald",
  },
  {
    id: 3,
    title: "Hackathons & Events",
    description:
      "Competitive tech events, innovation challenges, and skill-building workshops to enhance your technical prowess",
    icon: <Trophy className="w-8 h-8" />,
    route: "/hackathons",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    hoverGradient: "from-orange-600 via-red-600 to-pink-600",
    image:
      "https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "50+ Events",
    category: "Competition",
    features: ["Tech Competitions", "Workshops", "Networking", "Prizes & Recognition"],
    color: "orange",
  },
  {
    id: 4,
    title: "Work With Us",
    description:
      "Join our innovative EduTech platform and digital services ecosystem to shape the future of education and technology",
    icon: <Heart className="w-8 h-8" />,
    route: "/work-with-us",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    hoverGradient: "from-pink-600 via-rose-600 to-red-600",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "100+ Members",
    category: "Community",
    badge: "Hiring",
    features: ["Remote Work", "Growth Opportunities", "Team Collaboration", "Innovation Culture"],
    color: "pink",
  },
  {
    id: 5,
    title: "Expert Mentorship",
    description:
      "Personalized guidance from industry veterans and thought leaders to accelerate your professional development journey",
    icon: <Award className="w-8 h-8" />,
    route: "/mentorship",
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    hoverGradient: "from-indigo-600 via-blue-600 to-cyan-600",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "Expert Mentors",
    category: "Guidance",
    features: ["1-on-1 Sessions", "Industry Insights", "Career Planning", "Skill Development"],
    color: "indigo",
  },
  {
    id: 6,
    title: "Career Guidance",
    description:
      "Comprehensive career counseling and strategic pathway planning to help you achieve your professional aspirations",
    icon: <Target className="w-8 h-8" />,
    route: "/career-guidance",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    hoverGradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "Career Success",
    category: "Development",
    features: ["Career Counseling", "Resume Building", "Interview Prep", "Industry Insights"],
    color: "violet",
  },
  {
    id: 7,
    title: "Freelance Projects",
    description:
      "Real-world freelance opportunities and project-based work to build your portfolio and gain valuable experience",
    icon: <BriefcaseIcon className="w-8 h-8" />,
    route: "/freelance-projects",
    gradient: "from-red-500 via-pink-500 to-rose-500",
    hoverGradient: "from-red-600 via-pink-600 to-rose-600",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "Live Projects",
    category: "Experience",
    features: ["Real Projects", "Client Interaction", "Portfolio Building", "Flexible Work"],
    color: "red",
  },
  {
    id: 8,
    title: "Career & Jobs",
    description:
      "Connect with dream job opportunities and career advancement prospects tailored to your skills and aspirations",
    icon: <Search className="w-8 h-8" />,
    route: "/career-jobs",
    gradient: "from-teal-500 via-green-500 to-emerald-500",
    hoverGradient: "from-teal-600 via-green-600 to-emerald-600",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "Job Opportunities",
    category: "Career",
    features: ["Job Matching", "Career Opportunities", "Skill Assessment", "Interview Support"],
    color: "teal",
  },
];

export const OurServices: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleServiceClick = (route: string) => {
    navigate(route);
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 overflow-hidden">
      <FuturisticBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full mb-8 border border-blue-200 dark:border-blue-800"
          >
            <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <span className="text-base font-bold text-blue-700 dark:text-blue-300 tracking-wide">
              OUR PREMIUM SERVICES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-8 leading-tight"
          >
            Comprehensive Solutions for{" "}
            <motion.span 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent relative"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Your Success
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            From internships to career guidance, we provide cutting-edge solutions
            to accelerate your professional journey and unlock your potential.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              onHoverStart={() => setHoveredService(service.id)}
              onHoverEnd={() => setHoveredService(null)}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="group relative h-full"
              style={{ willChange: "transform" }}
            >
              <motion.div
                onClick={() => handleServiceClick(service.route)}
                className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20 dark:border-gray-700/50 overflow-hidden h-full flex flex-col group"
                style={{ willChange: "transform" }}
                whileHover={{
                  scale: 1,
                  borderColor: `rgb(${service.color === 'blue' ? '59, 130, 246' : 
                                      service.color === 'emerald' ? '16, 185, 129' :
                                      service.color === 'orange' ? '249, 115, 22' :
                                      service.color === 'pink' ? '236, 72, 153' :
                                      service.color === 'indigo' ? '99, 102, 241' :
                                      service.color === 'violet' ? '139, 92, 246' :
                                      service.color === 'red' ? '239, 68, 68' :
                                      '20, 184, 166'})`,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Image Section */}
                <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden rounded-t-2xl z-20">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover relative z-10"
                    style={{ transformOrigin: "center center" }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  
                  {/* Image Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300 z-10`} />
                  
                  {/* Category Badge on Image */}
                  <div className="absolute top-2 left-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <div className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-1.5`} />
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* Badge */}
                  {service.badge && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-30"
                    >
                      {service.badge}
                    </motion.div>
                  )}

                  {/* Icon Overlay */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`absolute bottom-2 right-2 inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r ${service.gradient} rounded-lg text-white shadow-lg backdrop-blur-sm z-30`}
                  >
                    <div className="w-4 h-4">
                      {service.icon}
                    </div>
                  </motion.div>
                </div>

                {/* Background Pattern for Content Area */}
                <div className="absolute inset-0 top-32 sm:top-36 md:top-40 opacity-5 group-hover:opacity-10 transition-opacity duration-500 z-0">
                  <div 
                    className={`w-full h-full bg-gradient-to-br ${service.gradient}`}
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                                       radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 0%, transparent 50%)`
                    }}
                  />
                </div>

                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] z-0`}
                  animate={
                    hoveredService === service.id
                      ? {
                          background: [
                            `conic-gradient(from 0deg, ${service.gradient.replace('from-', '').replace('via-', '').replace('to-', '')})`,
                            `conic-gradient(from 180deg, ${service.gradient.replace('from-', '').replace('via-', '').replace('to-', '')})`,
                            `conic-gradient(from 360deg, ${service.gradient.replace('from-', '').replace('via-', '').replace('to-', '')})`,
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-full h-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl" />
                </motion.div>

                {/* Content Section */}
                <div className="relative z-10 flex flex-col flex-grow p-3 md:p-4">
                  {/* Title */}
                  <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs md:text-sm mb-3 flex-grow overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {service.description}
                  </p>

                  {/* Features Grid */}
                  <div className="mb-3">
                    <div className="grid grid-cols-1 gap-1.5">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-center text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-2 py-1.5"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-2 flex-shrink-0`} />
                          <span className="font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Stats & Action */}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-1.5 animate-pulse`} />
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {service.stats}
                      </span>
                    </div>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.3 }}
                      className={`p-2 rounded-lg bg-gradient-to-r ${service.gradient} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      <ArrowRight className="w-3 h-3" />
                    </motion.div>
                  </div>
                </div>

                {/* Floating Elements */}
                {hoveredService === service.id && (
                  <>
                    <motion.div
                      className="absolute top-40 right-4 w-2 h-2 bg-blue-400 rounded-full pointer-events-none"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        y: [-2, 2, -2],
                        opacity: [0.6, 1, 0.6],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-12 left-3 w-1.5 h-1.5 bg-purple-400 rounded-full pointer-events-none"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        y: [2, -2, 2],
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.5, 1],
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute top-44 left-4 w-1 h-1 bg-pink-400 rounded-full pointer-events-none"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        rotate: [0, 360],
                        scale: [0.5, 1.2, 0.5],
                        opacity: [0.5, 1, 0.5],
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/all-programs")}
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group text-lg"
          >
            <span className="mr-3">Explore All Programs</span>
            <motion.div
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="p-2 bg-white/20 rounded-full"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;
