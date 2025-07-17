import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon, 
  DevicePhoneMobileIcon, 
  CpuChipIcon, 
  ChartBarIcon, 
  ShieldCheckIcon, 
  PuzzlePieceIcon, 
  PaintBrushIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';

interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  category: string;
  duration: string;
  level: string;
  gradient: string;
}

const courses: Course[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Master full-stack web development with React, Node.js, and MongoDB. Build modern, responsive web applications.',
    price: 399,
    icon: <CodeBracketIcon className="h-8 w-8" />,
    category: 'Development',
    duration: '3-4 months',
    level: 'Beginner to Advanced',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'android-development',
    name: 'Android Development',
    description: 'Create powerful mobile apps with Java, Kotlin, Flutter, and React Native. Learn modern Android development.',
    price: 399,
    icon: <DevicePhoneMobileIcon className="h-8 w-8" />,
    category: 'Mobile',
    duration: '2-3 months',
    level: 'Beginner to Intermediate',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'python-django',
    name: 'Python with Django',
    description: 'Build robust web applications with Python and Django framework. Learn backend development and APIs.',
    price: 399,
    icon: <CommandLineIcon className="h-8 w-8" />,
    category: 'Backend',
    duration: '2-3 months',
    level: 'Beginner to Intermediate',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Dive into artificial intelligence and machine learning with Python, TensorFlow, and real-world projects.',
    price: 399,
    icon: <CpuChipIcon className="h-8 w-8" />,
    category: 'AI/ML',
    duration: '3-4 months',
    level: 'Intermediate to Advanced',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'data-science',
    name: 'Data Science & Analytics',
    description: 'Master data analysis, visualization, and statistical modeling with Python, Pandas, and modern tools.',
    price: 399,
    icon: <ChartBarIcon className="h-8 w-8" />,
    category: 'Analytics',
    duration: '3-4 months',
    level: 'Beginner to Advanced',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & Ethical Hacking',
    description: 'Learn ethical hacking, penetration testing, and cybersecurity fundamentals with hands-on labs.',
    price: 399,
    icon: <ShieldCheckIcon className="h-8 w-8" />,
    category: 'Security',
    duration: '2-3 months',
    level: 'Beginner to Advanced',
    gradient: 'from-red-500 to-pink-600'
  },
  {
    id: 'dsa',
    name: 'DSA & Competitive Programming',
    description: 'Master data structures, algorithms, and competitive programming to ace technical interviews.',
    price: 399,
    icon: <PuzzlePieceIcon className="h-8 w-8" />,
    category: 'Programming',
    duration: '2-3 months',
    level: 'Beginner to Advanced',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    description: 'Create stunning user interfaces and experiences with Figma, design systems, and user research.',
    price: 399,
    icon: <PaintBrushIcon className="h-8 w-8" />,
    category: 'Design',
    duration: '2-3 months',
    level: 'Beginner to Intermediate',
    gradient: 'from-teal-500 to-green-600'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function Courses() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Your Career with
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Premium Courses
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Master in-demand skills with our comprehensive courses designed by industry experts. 
              Get hands-on experience with live projects and internship certificates.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-6 py-3 rounded-full font-semibold">
                🎯 Limited Time Offer: ₹399 Only
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-6 py-3 rounded-full font-semibold">
                📜 Internship Certificate
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-6 py-3 rounded-full font-semibold">
                🛠️ Live Projects
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {courses.map((course) => (
              <motion.div
                key={course.id}
                className="group"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                  {/* Card Header */}
                  <div className={`h-32 bg-gradient-to-r ${course.gradient} p-6 flex items-center justify-center`}>
                    <div className="text-white">
                      {course.icon}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ₹{course.price}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {course.name}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {course.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Duration:</span>
                        <span className="ml-2">{course.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Level:</span>
                        <span className="ml-2">{course.level}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Link
                        to={`/courses/${course.id}`}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group"
                      >
                        View Details
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      
                      <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center">
                        <span className="mr-2">💳</span>
                        Buy Now - ₹{course.price}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Internexis Courses?
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Get industry-ready skills with our comprehensive learning approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💬",
                title: "WhatsApp Support",
                description: "24/7 doubt solving support"
              },
              {
                icon: "📜",
                title: "Internship Certificate",
                description: "Industry-recognized certification"
              },
              {
                icon: "📚",
                title: "Lifetime Access",
                description: "Learn at your own pace"
              },
              {
                icon: "🛠️",
                title: "Live Projects",
                description: "Real-world experience"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
