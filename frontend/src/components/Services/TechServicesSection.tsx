import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Cpu, 
  Wrench, 
  Palette, 
  ShoppingCart,
  ArrowRight,
  Zap,
  Layers
} from "lucide-react";
import AOS from "aos";

interface QuickService {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  route: string;
  stats: string;
  category: string;
  features: string[];
}

const quickServices: QuickService[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Modern, responsive & scalable websites with mobile-first design and SEO optimization",
    icon: <Globe className="w-6 h-6" />,
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    route: "/services",
    stats: "200+ Websites Built",
    category: "Development",
    features: ["Custom Design", "Full-Stack Development", "SEO-Optimized", "Mobile-First"]
  },
  {
    id: 2,
    title: "Mobile Apps",
    description: "Android, iOS & cross-platform apps with seamless performance and engaging UI/UX",
    icon: <Smartphone className="w-6 h-6" />,
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    route: "/services",
    stats: "100+ Apps Launched",
    category: "Mobile",
    features: ["Native & Cross-Platform", "UI/UX Design", "App Store Deployment", "API Integration"]
  },
  {
    id: 3,
    title: "AI Automation",
    description: "Intelligent automation solutions to streamline workflows and reduce manual tasks",
    icon: <Bot className="w-6 h-6" />,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    route: "/services",
    stats: "50+ Automations",
    category: "AI/ML",
    features: ["Task Automation", "Smart Chatbots", "Process Optimization", "AI Integration"]
  },
  {
    id: 4,
    title: "AI Agents",
    description: "Autonomous AI systems that think, learn, and act to solve complex business challenges",
    icon: <Cpu className="w-6 h-6" />,
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    route: "/services",
    stats: "25+ AI Agents",
    category: "AI/ML",
    features: ["Autonomous Systems", "Decision Making", "Learning Capabilities", "Enterprise Ready"]
  },
  {
    id: 5,
    title: "AI Tools",
    description: "Custom AI tools for specific domains like healthcare, education, finance & e-commerce",
    icon: <Wrench className="w-6 h-6" />,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    route: "/services",
    stats: "Domain-Specific",
    category: "AI/ML",
    features: ["Predictive Analytics", "Recognition Systems", "Recommendation Engines", "Deep Learning"]
  },
  {
    id: 6,
    title: "Graphic Design",
    description: "Creative designs that connect & convert - from logos to social media creatives",
    icon: <Palette className="w-6 h-6" />,
    gradient: "from-pink-500 via-rose-500 to-red-500",
    route: "/services",
    stats: "500+ Designs",
    category: "Design",
    features: ["Brand Identity", "UI/UX Design", "Social Media", "Marketing Materials"]
  },
  {
    id: 7,
    title: "E-Commerce",
    description: "Complete online store solutions with payment integration and optimization",
    icon: <ShoppingCart className="w-6 h-6" />,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    route: "/services",
    stats: "75+ Stores",
    category: "E-Commerce",
    features: ["Online Stores", "Payment Gateway", "Multi-vendor", "Conversion Optimization"]
  }
];

// Animated background component
const QuickAnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
          `,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 60% 60%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
};

// Service card component
const QuickServiceCard: React.FC<{ service: QuickService; index: number }> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(service.route);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-gray-700/50 overflow-hidden h-full">
        {/* Gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 rounded-2xl`}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <motion.div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${service.gradient} text-white shadow-lg mr-4`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {service.icon}
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                {service.title}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {service.category}
              </span>
            </div>
          </div>
          <motion.div
            animate={isHovered ? { x: 3 } : { x: 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {service.features.slice(0, 4).map((feature, idx) => (
            <div key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.gradient} mr-2 flex-shrink-0`} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-2 animate-pulse`} />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {service.stats}
            </span>
          </div>
          <div className={`px-2 py-1 rounded-md bg-gradient-to-r ${service.gradient} text-white text-xs font-medium`}>
            View Details
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TechServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 overflow-hidden">
      <QuickAnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-flex items-center px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-6 border border-indigo-200 dark:border-indigo-800 shadow-lg"
          >
            <motion.div
              className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-full h-full" />
            </motion.div>
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 tracking-wide">
              OUR TECH SERVICES
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
          >
            Digital Solutions for{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
              Modern Business
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            From web development to AI automation, we deliver 
            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> future-ready solutions</span> at 
            <span className="font-semibold text-green-600 dark:text-green-400"> affordable prices</span>
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {quickServices.map((service, index) => (
            <QuickServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/services")}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <Layers className="w-5 h-5 mr-2" />
            <span className="mr-3">Explore All Services</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechServicesSection;
