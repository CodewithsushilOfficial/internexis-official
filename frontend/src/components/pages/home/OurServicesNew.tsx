import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Monitor,
  Zap,
  Users,
  UserCheck,
  TrendingUp,
  Briefcase,
  Building,
  ArrowRight,
  Play,
  Layers,
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
}

// Modern Sophisticated Background
function SophisticatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Neural Network Pattern */}
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-[0.12]"
        viewBox="0 0 1200 800"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient
            id="neuralGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feMorphology operator="dilate" radius="2" />
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection Lines */}
        {[
          { x1: 100, y1: 150, x2: 300, y2: 200 },
          { x1: 300, y1: 200, x2: 500, y2: 180 },
          { x1: 500, y1: 180, x2: 700, y2: 220 },
          { x1: 200, y1: 350, x2: 400, y2: 300 },
          { x1: 400, y1: 300, x2: 600, y2: 340 },
          { x1: 600, y1: 340, x2: 800, y2: 320 },
          { x1: 150, y1: 500, x2: 350, y2: 480 },
          { x1: 350, y1: 480, x2: 550, y2: 520 },
          { x1: 550, y1: 520, x2: 750, y2: 500 },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#neuralGradient)"
            strokeWidth="1.5"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}

        {/* Neural Nodes */}
        {[
          { cx: 100, cy: 150 },
          { cx: 300, cy: 200 },
          { cx: 500, cy: 180 },
          { cx: 700, cy: 220 },
          { cx: 200, cy: 350 },
          { cx: 400, cy: 300 },
          { cx: 600, cy: 340 },
          { cx: 800, cy: 320 },
          { cx: 150, cy: 500 },
          { cx: 350, cy: 480 },
          { cx: 550, cy: 520 },
          { cx: 750, cy: 500 },
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill="url(#neuralGradient)"
            filter="url(#glow)"
            animate={{
              r: [3, 6, 3],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>

      {/* Flowing Gradients */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Hexagonal Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        animate={{
          opacity: [0.02, 0.08, 0.02],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 200 200"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>
    </div>
  );
}

const services: Service[] = [
  {
    id: 1,
    title: "Internship Programs",
    description:
      "Real industry-based internships with hands-on projects, training, and certifications to improve your skills",
    icon: <GraduationCap className="w-8 h-8" />,
    route: "/all-programs",
    gradient: "from-blue-500 via-purple-500 to-indigo-600",
    hoverGradient: "from-blue-600 via-purple-600 to-indigo-700",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "1000+ Students",
    category: "Education",
    badge: "Most Popular",
  },
  {
    id: 2,
    title: "Digital Solutions",
    description:
      "Website development, app development, AI automation, generative AI, and AI tools for businesses and professionals",
    icon: <Monitor className="w-8 h-8" />,
    route: "/digital-solutions",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    hoverGradient: "from-emerald-600 via-teal-600 to-cyan-700",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "200+ Projects",
    category: "Technology",
  },
  {
    id: 3,
    title: "Hackathons & Events",
    description:
      "Tech competitions, training courses, and skill-building events to improve your technical abilities and network",
    icon: <Zap className="w-8 h-8" />,
    route: "/hackathons",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    hoverGradient: "from-amber-600 via-orange-600 to-red-600",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "50+ Events",
    category: "Competition",
  },
  {
    id: 4,
    title: "Work With Us",
    description:
      "Join our self-independent EduTech and digital services platform to help shape the future of education and technology",
    icon: <Users className="w-8 h-8" />,
    route: "/work-with-us",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    hoverGradient: "from-pink-600 via-rose-600 to-red-600",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "100+ Members",
    category: "Community",
    badge: "Hiring",
  },
  {
    id: 5,
    title: "Expert Mentorship",
    description:
      "Personalized guidance from industry professionals to help you develop skills and achieve your dream job",
    icon: <UserCheck className="w-8 h-8" />,
    route: "/mentorship",
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    hoverGradient: "from-indigo-600 via-blue-600 to-cyan-600",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "Expert Mentors",
    category: "Guidance",
  },
  {
    id: 6,
    title: "Career Guidance",
    description:
      "Comprehensive career counseling and personalized pathway planning to help you achieve your dream career goals",
    icon: <TrendingUp className="w-8 h-8" />,
    route: "/career-guidance",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    hoverGradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "Career Success",
    category: "Development",
  },
  {
    id: 7,
    title: "Freelance Projects",
    description:
      "Real industry-based freelance opportunities to improve your skills on live projects and build your professional portfolio",
    icon: <Briefcase className="w-8 h-8" />,
    route: "/freelance-projects",
    gradient: "from-red-500 via-pink-500 to-rose-500",
    hoverGradient: "from-red-600 via-pink-600 to-rose-600",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "Live Projects",
    category: "Experience",
  },
  {
    id: 8,
    title: "Career & Jobs",
    description:
      "Connect with dream jobs and career opportunities suited to your skills, helping you achieve professional success",
    icon: <Building className="w-8 h-8" />,
    route: "/career-jobs",
    gradient: "from-teal-500 via-green-500 to-emerald-500",
    hoverGradient: "from-teal-600 via-green-600 to-emerald-600",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "Job Opportunities",
    category: "Placement",
  },
];

export const OurServices: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleServiceClick = (route: string) => {
    navigate(route);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-slate-50/80 via-blue-50/40 to-indigo-50/60 dark:from-gray-900 dark:via-slate-800/90 dark:to-gray-900"
    >
      {" "}
      {/* Modern Sophisticated Background */}
      <SophisticatedBackground /> {/* Minimal Enhanced Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle Corner Accents */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-teal-500/10 to-cyan-600/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        {" "}
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative inline-flex items-center justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl shadow-2xl">
                <Layers className="w-12 h-12 text-white" />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400"
          >
            🎯 Our Services
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6 max-w-md rounded-full"
          />

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6"
          >
            Empowering You at Every Step
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Internexis Technologies is a self-independent EduTech and digital
            services platform providing internships, training courses,
            hackathons, career guidance, freelance projects, and digital
            solutions for students, professionals, and businesses. We help
            students work on real industry-based projects to improve their
            skills and achieve their dream jobs.
          </motion.p>
        </motion.div>
        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                y: -20,
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative cursor-pointer"
              onClick={() => handleServiceClick(service.route)}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {" "}
              {/* Card Container */}
              <div className="relative h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden transition-all duration-500 group-hover:bg-white dark:group-hover:bg-gray-800">
                {/* Modern Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                />

                {/* Animated Border Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>

                {/* Modern Corner Decorations */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-8 h-8 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
                </div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-8 h-8 border-b-2 border-l-2 border-purple-400/50 rounded-bl-lg"></div>
                </div>

                {/* Badge */}
                {service.badge && (
                  <motion.div
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: -12 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="absolute -top-2 -right-2 z-20"
                  >
                    <div
                      className={`bg-gradient-to-r ${service.gradient} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
                    >
                      {service.badge}
                    </div>
                  </motion.div>
                )}

                {/* Image */}
                <div className="relative z-10 mb-6 overflow-hidden rounded-2xl">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}
                  />

                  {/* Category Tag */}
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-1 rounded-full">
                    {service.category}
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-3 right-3 bg-black/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                    {service.stats}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${service.gradient} rounded-2xl mb-4 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-500`}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Action Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center justify-center w-full py-3 bg-gradient-to-r ${service.gradient} text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <span className="mr-2">Explore Now</span>
                    <motion.div
                      animate={
                        hoveredCard === service.id ? { x: [0, 5, 0] } : {}
                      }
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-ping" />
                <div className="absolute bottom-8 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-20"
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/all-programs")}
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 cursor-pointer group"
          >
            <Play className="w-6 h-6 mr-3 group-hover:animate-pulse" />
            <span className="mr-3">Start Your Journey</span>
            <motion.div
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2 }}
            className="mt-6 text-gray-600 dark:text-gray-400"
          >
            Join <span className="font-bold text-blue-600">1000+</span> students
            already transforming their careers
          </motion.p>
        </motion.div>
      </div>
      {/* Custom Cursor Effect */}
      {hoveredCard && (
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            x: springX,
            y: springY,
          }}
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      )}
    </section>
  );
};

export default OurServices;
