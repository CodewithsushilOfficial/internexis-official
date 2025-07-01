import React, { useEffect } from "react";
import { motion } from "framer-motion";
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
}

const services: Service[] = [
  {
    id: 1,
    title: "Internship",
    description:
      "Real-world internships across domains with live projects & certificates",
    icon: <GraduationCap className="w-8 h-8" />,
    route: "/all-programs",
    gradient: "from-blue-500 to-purple-600",
    hoverGradient: "from-blue-600 to-purple-700",
  },
  {
    id: 2,
    title: "Digital Solutions",
    description:
      "Custom web/app development, AI tools, and automation services",
    icon: <Monitor className="w-8 h-8" />,
    route: "/digital-solutions",
    gradient: "from-green-500 to-teal-600",
    hoverGradient: "from-green-600 to-teal-700",
  },
  {
    id: 3,
    title: "Hackathons & Tech Events",
    description:
      "Daily alerts, registration support, and project mentoring for events",
    icon: <Zap className="w-8 h-8" />,
    route: "/hackathons",
    gradient: "from-yellow-500 to-orange-600",
    hoverGradient: "from-yellow-600 to-orange-700",
  },
  {
    id: 4,
    title: "Work With Us",
    description: "Become a part of our team or join as campus ambassador",
    icon: <Users className="w-8 h-8" />,
    route: "/work-with-us",
    gradient: "from-pink-500 to-rose-600",
    hoverGradient: "from-pink-600 to-rose-700",
  },
  {
    id: 5,
    title: "Mentorship",
    description: "One-on-one guidance from industry mentors and professionals",
    icon: <UserCheck className="w-8 h-8" />,
    route: "/mentorship",
    gradient: "from-indigo-500 to-blue-600",
    hoverGradient: "from-indigo-600 to-blue-700",
  },
  {
    id: 6,
    title: "Career Guidance",
    description: "Resume reviews, interview prep, and career path planning",
    icon: <TrendingUp className="w-8 h-8" />,
    route: "/career-guidance",
    gradient: "from-purple-500 to-pink-600",
    hoverGradient: "from-purple-600 to-pink-700",
  },
  {
    id: 7,
    title: "Freelance Projects",
    description:
      "Gain freelance experience through client-assigned real-world projects",
    icon: <Briefcase className="w-8 h-8" />,
    route: "/freelance-projects",
    gradient: "from-red-500 to-pink-600",
    hoverGradient: "from-red-600 to-pink-700",
  },
  {
    id: 8,
    title: "Career & Jobs",
    description:
      "Find jobs, internships, and off-campus drives relevant to your domain",
    icon: <Building className="w-8 h-8" />,
    route: "/career-jobs",
    gradient: "from-teal-500 to-green-600",
    hoverGradient: "from-teal-600 to-green-700",
  },
];

export const OurServices: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  const handleServiceClick = (route: string) => {
    navigate(route);
  };

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

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -10, 0],
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6">
            🎯 Our Services – Empowering You at Every Step
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the wide range of services offered by Internexis – crafted
            to support your academic journey, career growth, skill development,
            and real-world opportunities.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative"
            >
              <div
                onClick={() => handleServiceClick(service.route)}
                className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-transparent overflow-hidden"
              >
                {/* Background Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                />

                {/* Animated Border */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]`}
                >
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl mb-6 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-500`}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  {/* Arrow Icon */}
                  <motion.div
                    initial={{ x: 0, opacity: 0.7 }}
                    whileHover={{ x: 5, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 inline-flex items-center text-gray-400 group-hover:text-blue-600 transition-colors duration-300"
                  >
                    <span className="text-sm font-medium mr-2">Explore</span>
                    <motion.div
                      animate={{
                        x: [0, 3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.div>
                  </motion.div>
                </div>

                {/* Floating Particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/all-programs")}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="mr-2">Explore All Programs</span>
            <motion.div
              animate={{
                x: [0, 4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;
