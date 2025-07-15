import React from "react";
import {
  Globe,
  Smartphone,
  Brain,
  Code,
  ChevronRight,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Program {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  skills: string[];
  color: string;
  duration: string;
  level: string;
}

export const Internship: React.FC = () => {
  const programs: Program[] = [
    {
      id: 1,
      title: "Web Development",
      description:
        "Master frontend, backend, or full stack development with hands-on projects and industry-standard tools.",
      icon: <Globe size={32} />,
      iconBg: "bg-blue-500",
      skills: [
        "HTML/CSS",
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "Express",
      ],
      color: "blue",
      duration: "8 weeks",
      level: "Beginner to Advanced",
    },
    {
      id: 2,
      title: "Android App Development",
      description:
        "Create fully functional mobile applications using Java, Kotlin, and modern Android development practices.",
      icon: <Smartphone size={32} />,
      iconBg: "bg-green-500",
      skills: [
        "Java",
        "Kotlin",
        "Android SDK",
        "Firebase",
        "UI/UX Design",
        "API Integration",
      ],
      color: "green",
      duration: "10 weeks",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      description:
        "Implement AI solutions, train models, and explore practical applications of machine learning.",
      icon: <Brain size={32} />,
      iconBg: "bg-purple-500",
      skills: [
        "Python",
        "TensorFlow",
        "Data Analysis",
        "Neural Networks",
        "Computer Vision",
        "NLP",
      ],
      color: "purple",
      duration: "12 weeks",
      level: "Advanced",
    },
    {
      id: 4,
      title: "Software Development",
      description:
        "Build robust software applications using industry best practices and design patterns.",
      icon: <Code size={32} />,
      iconBg: "bg-accent-500",
      skills: [
        "C++",
        "Java",
        "Object-Oriented Design",
        "Testing",
        "Git",
        "CI/CD",
      ],
      color: "accent",
      duration: "8 weeks",
      level: "All Levels",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="programs">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Our Internship Programs
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Gain real-world experience with our industry-aligned programs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Show only first 4 programs */}
          {programs.slice(0, 4).map((program) => (
            <motion.div
              key={program.id}
              className="relative flex flex-col h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.3 }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className={`p-6 flex-grow`}>
                <div
                  className={`h-12 w-12 rounded-lg ${program.iconBg} mb-6 flex items-center justify-center text-white`}
                >
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {program.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {program.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {program.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center">
                    <Zap size={16} className="mr-1" />
                    {program.duration}
                  </span>
                  <span>{program.level}</span>
                </div>
                <Link
                  to={`/internship-projects`}
                  className={`flex items-center justify-center py-2 px-4 rounded-md font-medium text-white transition-all duration-300 bg-${program.color}-500 hover:bg-${program.color}-600`}
                >
                  Learn More
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All button */}
        <div className="flex justify-center mt-12">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/all-programs"
              className="btn-primary px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-3 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all"
            >
              View All Internship Programs
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Internship;
