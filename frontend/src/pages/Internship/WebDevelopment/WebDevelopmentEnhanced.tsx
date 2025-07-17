import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, Code, Database, Calendar, Users, Award, Star, Clock, 
  CheckCircle, ArrowRight, Play, Download, BookOpen, Target,
  Zap, TrendingUp, Award as AwardIcon, Users as UsersIcon,
  Briefcase, Monitor, Server, Palette, Smartphone, Cloud,
  GitBranch, Shield, Search, MessageCircle, ChevronDown,
  ChevronUp, ExternalLink, Heart, Share2, ArrowLeft
} from 'lucide-react';

const WebDevelopmentEnhanced: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const programData = {
    title: "Web Development Internship",
    subtitle: "Master Modern Web Technologies",
    duration: "8-12 weeks",
    level: "Beginner to Advanced",
    price: "₹15,999",
    originalPrice: "₹24,999",
    rating: 4.8,
    students: 1250,
    instructor: "Industry Expert Team",
    lastUpdated: "December 2024",
    language: "English, Hindi",
    certificate: "Industry-Recognized Certificate",
    placement: "95% Placement Rate",
    projects: "5 Live Projects",
    mentorship: "1-on-1 Mentorship",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  };

  const highlights = [
    "Live Projects with Real Clients",
    "Industry Expert Mentorship",
    "Job Placement Guarantee",
    "Internship Certificate",
    "GitHub Portfolio Building",
    "Interview Preparation"
  ];

  const skills = [
    { name: "HTML5", level: 95, color: "bg-orange-500" },
    { name: "CSS3", level: 90, color: "bg-blue-500" },
    { name: "JavaScript", level: 88, color: "bg-yellow-500" },
    { name: "React.js", level: 85, color: "bg-cyan-500" },
    { name: "Node.js", level: 80, color: "bg-green-500" },
    { name: "MongoDB", level: 75, color: "bg-green-600" },
    { name: "Express.js", level: 82, color: "bg-gray-600" },
    { name: "Git & GitHub", level: 90, color: "bg-red-500" }
  ];

  const syllabus = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      duration: "Week 1-2",
      lessons: 12,
      topics: [
        "Introduction to Web Development",
        "HTML5 Structure and Semantics",
        "CSS3 Styling and Layouts",
        "Responsive Design Principles",
        "CSS Frameworks (Bootstrap, Tailwind)",
        "Browser Developer Tools"
      ]
    },
    {
      id: 2,
      title: "JavaScript Mastery",
      duration: "Week 3-4",
      lessons: 15,
      topics: [
        "JavaScript Fundamentals",
        "ES6+ Features",
        "DOM Manipulation",
        "Event Handling",
        "Async JavaScript (Promises, Async/Await)",
        "API Integration"
      ]
    },
    {
      id: 3,
      title: "Frontend Development with React",
      duration: "Week 5-7",
      lessons: 18,
      topics: [
        "React Fundamentals",
        "Components and Props",
        "State Management",
        "React Hooks",
        "React Router",
        "Context API",
        "Testing React Applications"
      ]
    },
    {
      id: 4,
      title: "Backend Development with Node.js",
      duration: "Week 8-10",
      lessons: 16,
      topics: [
        "Node.js Fundamentals",
        "Express.js Framework",
        "RESTful API Development",
        "Database Integration (MongoDB)",
        "Authentication & Authorization",
        "File Upload & Processing"
      ]
    },
    {
      id: 5,
      title: "Full-Stack Integration & Deployment",
      duration: "Week 11-12",
      lessons: 10,
      topics: [
        "Connecting Frontend & Backend",
        "State Management (Redux)",
        "Performance Optimization",
        "Testing & Debugging",
        "Deployment (Vercel, Netlify, Heroku)",
        "Domain & DNS Management"
      ]
    }
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Build a complete online store with cart, payment integration, and admin panel",
      tech: ["React", "Node.js", "MongoDB", "Stripe API"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Social Media Dashboard",
      description: "Create a responsive dashboard for managing multiple social media accounts",
      tech: ["React", "Express", "JWT", "Socket.io"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Task Management App",
      description: "Develop a collaborative project management tool with real-time updates",
      tech: ["React", "Node.js", "MongoDB", "WebSocket"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Software Developer at TCS",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "The web development internship transformed my career. The hands-on projects and mentorship helped me land my dream job!"
    },
    {
      name: "Priya Patel",
      role: "Frontend Developer at Flipkart",
      image: "https://images.unsplash.com/photo-1494790108755-2616b771b1e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "Amazing learning experience! The curriculum is well-structured and the instructors are incredibly supportive."
    }
  ];

  const features = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Frontend Development",
      description: "Master React, Vue.js, and modern JavaScript frameworks with responsive design principles"
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Backend Development",
      description: "Build robust APIs with Node.js, Express, and database management systems"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Management",
      description: "Work with MongoDB, MySQL, and learn about database design and optimization"
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Version Control",
      description: "Master Git and GitHub for collaborative development and code management"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Deployment & DevOps",
      description: "Deploy applications using modern cloud platforms and CI/CD pipelines"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Best Practices",
      description: "Learn about web security, authentication, and data protection techniques"
    }
  ];

  const tabButtons = [
    { id: 'overview', label: 'Overview', icon: <Globe className="w-4 h-4" /> },
    { id: 'curriculum', label: 'Curriculum', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Code className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Reviews', icon: <Star className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/internship"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Programs
              </Link>

              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-xl">
                  <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    {programData.title}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                    {programData.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{programData.rating}</span>
                  <span className="text-gray-600">({programData.students} students)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span>{programData.duration}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {highlights.map((highlight, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm"
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {programData.price}
                </div>
                <div className="text-lg text-gray-500 line-through">
                  {programData.originalPrice}
                </div>
                <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  36% OFF
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEnrolled(!isEnrolled)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  {isEnrolled ? 'Enrolled!' : 'Enroll Now'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center px-6 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:border-blue-500 transition-all duration-300"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Wishlist
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content - Video/Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={programData.image}
                  alt={programData.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-white transition-all duration-300"
                >
                  <Play className="w-8 h-8 text-blue-600 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabButtons.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 font-medium border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-16"
              >
                {/* Program Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Program Overview
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      Our comprehensive Web Development Internship program is designed to transform you from a beginner 
                      to a job-ready full-stack developer. Through hands-on projects, expert mentorship, and industry-standard 
                      practices, you'll build a strong foundation in both frontend and backend technologies.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      You'll work on real-world projects, collaborate with peers, and receive personalized feedback 
                      from industry professionals. Our curriculum is constantly updated to reflect current industry trends 
                      and best practices.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Weeks Duration</div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">5</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Live Projects</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">95%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Placement Rate</div>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">24/7</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Skills You'll Master
                    </h3>
                    <div className="space-y-4">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className={`h-full ${skill.color} rounded-full`}
                              />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                              {skill.level}%
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features Grid */}
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    What You'll Learn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="text-blue-600 dark:text-blue-400 mb-4">
                          {feature.icon}
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'curriculum' && (
              <motion.div
                key="curriculum"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Comprehensive Curriculum
                </h2>
                <div className="space-y-6">
                  {syllabus.map((module, index) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                      <button
                        onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {module.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {module.duration} • {module.lessons} lessons
                            </p>
                          </div>
                        </div>
                        {expandedModule === module.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {expandedModule === module.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-4"
                          >
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                Topics Covered:
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {module.topics.map((topic, topicIndex) => (
                                  <div key={topicIndex} className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                                      {topic}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Real-World Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                          Live Project
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-lg text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Student Success Stories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center gap-1 mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Web Development Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students who have successfully launched their careers in web development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Enroll Now - {programData.price}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Download Brochure
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopmentEnhanced;