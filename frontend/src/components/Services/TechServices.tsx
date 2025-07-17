import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
  Target,
  Code,
  Layers
} from "lucide-react";
import AOS from "aos";

interface TechService {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  ctaText: string;
}

const services: TechService[] = [
  {
    id: 1,
    title: "Web Development Services",
    description: "We design and build modern, scalable, and SEO-optimized websites with mobile-first interfaces. From landing pages to full-stack portals, we deliver performance-driven results.",
    icon: <Globe className="w-8 h-8" />,
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    features: ["Custom Web Design", "Frontend & Backend Development", "CMS Development", "Web Portals & Dashboards"],
    ctaText: "Build Your Website"
  },
  {
    id: 2,
    title: "App Development Services",
    description: "Bring your app idea to life with our Android, iOS, and cross-platform development services. We ensure seamless performance, sleek UI/UX, and high user retention.",
    icon: <Smartphone className="w-8 h-8" />,
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    features: ["Android & iOS Development", "Cross-Platform Solutions", "API Integration", "App Store Deployment"],
    ctaText: "Launch Your App"
  },
  {
    id: 3,
    title: "AI Automation Solutions",
    description: "Leverage the power of Artificial Intelligence to automate complex workflows, save time, and reduce human error. We build intelligent automation systems.",
    icon: <Bot className="w-8 h-8" />,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    features: ["AI-Powered Task Automation", "Smart Chatbots", "Business Process Automation", "Workflow Optimization"],
    ctaText: "Automate Now"
  },
  {
    id: 4,
    title: "AI Agentic Systems",
    description: "Harness intelligent agents that think, learn, and act autonomously to solve real-world challenges. Perfect for enterprises and research-driven solutions.",
    icon: <Cpu className="w-8 h-8" />,
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    features: ["AI Agents for Task Scheduling", "Personal AI Assistants", "Customer Service Agents", "AI-Driven Decision Engines"],
    ctaText: "Deploy AI Agents"
  },
  {
    id: 5,
    title: "AI Tools Development",
    description: "Whether you're in healthcare, education, finance, or e-commerce — we build domain-specific AI tools to solve complex problems and drive innovation.",
    icon: <Wrench className="w-8 h-8" />,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    features: ["Predictive Analytics Tools", "Image & Voice Recognition", "AI Recommendation Engines", "NLP & Deep Learning"],
    ctaText: "Build AI Tools"
  },
  {
    id: 6,
    title: "Graphic Design Services",
    description: "Your brand deserves to shine. Our creative team crafts visually stunning designs that leave a lasting impression and connect with your audience.",
    icon: <Palette className="w-8 h-8" />,
    gradient: "from-pink-500 via-rose-500 to-red-500",
    features: ["Logo & Brand Identity", "UI/UX Design", "Social Media Creatives", "Marketing Collaterals"],
    ctaText: "Design Your Brand"
  },
  {
    id: 7,
    title: "E-Commerce Solutions",
    description: "Build your online store with Internexis and start selling across the globe. We provide all-in-one e-commerce solutions tailored to your market.",
    icon: <ShoppingCart className="w-8 h-8" />,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    features: ["E-Commerce Development", "Payment Gateway Integration", "Multi-Vendor Marketplaces", "Conversion Optimization"],
    ctaText: "Start Selling"
  }
];

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)
          `,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.4) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.4) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
             radial-gradient(circle at 60% 60%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};

// Service card component
const ServiceCard: React.FC<{ service: TechService; index: number }> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/50 overflow-hidden h-full">
        {/* Gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
          animate={isHovered ? { opacity: 0.05 } : { opacity: 0 }}
        />

        {/* Icon */}
        <div className="relative mb-6">
          <motion.div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} text-white shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {service.icon}
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-base">
          {service.description}
        </p>

        {/* Features */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-3">
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                viewport={{ once: true }}
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-3 flex-shrink-0`} />
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group`}
        >
          <span className="mr-2">{service.ctaText}</span>
          <motion.div
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.button>

        {/* Decorative elements */}
        {isHovered && (
          <>
            <motion.div
              className="absolute top-20 right-8 w-2 h-2 bg-blue-400 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [5, -5, 5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

export const TechServices: React.FC = () => {
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

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-flex items-center px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-8 border border-indigo-200 dark:border-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <motion.div
              className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-full h-full" />
            </motion.div>
            <span className="text-base font-bold text-indigo-700 dark:text-indigo-300 tracking-wide">
              OUR SERVICES
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Transforming Ideas into{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
              Scalable Digital Solutions
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            At <span className="font-bold text-indigo-600 dark:text-indigo-400">Internexis Technologies Pvt Ltd</span>, we specialize in delivering 
            <span className="font-bold text-purple-600 dark:text-purple-400"> future-ready, cost-effective solutions</span> that 
            empower startups, students, and enterprises to scale with confidence.
          </motion.p>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center mt-8"
          >
            <div className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-lg">
              <Target className="w-5 h-5 mr-2" />
              <span className="font-semibold">Future-ready solutions at affordable prices</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-gray-700/50"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Internexis?</span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Trusted by <span className="font-bold text-indigo-600">10,000+ Students & Professionals</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Target className="w-6 h-6" />, title: "Affordable Pricing", desc: "without Compromising Quality" },
              { icon: <Layers className="w-6 h-6" />, title: "End-to-End Solutions", desc: "Custom & Comprehensive" },
              { icon: <Zap className="w-6 h-6" />, title: "Timely Delivery", desc: "with 24/7 Support" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Let's Build Something <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Extraordinary</span>
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to launch your project? Contact us today and let Internexis help you turn your ideas into impactful digital solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Code className="w-5 h-5 mr-2" />
              <span>Explore More</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>📩 help.internexis@gmail.com • 🌐 www.internexis-technologies.in</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechServices;
