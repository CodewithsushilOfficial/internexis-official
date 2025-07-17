import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain, Database, TrendingUp, Calendar, Users, Award, Star, Clock, 
  CheckCircle, ArrowRight, Play, Download, BookOpen, Target,
  Zap, Code, BarChart3, Cpu, GitBranch, Shield, Search, 
  ChevronDown, ChevronUp, ExternalLink, Heart, Share2, ArrowLeft,
  Layers, PieChart, LineChart, Settings, Activity, Microscope,
  Sparkles, Robot, Network, Globe
} from 'lucide-react';

const AIMLEnhanced: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const programData = {
    title: "AI & Machine Learning Internship",
    subtitle: "Master Artificial Intelligence & ML Technologies",
    duration: "12-16 weeks",
    level: "Advanced",
    price: "₹18,999",
    originalPrice: "₹29,999",
    rating: 4.9,
    students: 642,
    instructor: "AI Research Team",
    lastUpdated: "December 2024",
    language: "English, Hindi",
    certificate: "AI/ML Specialist Certificate",
    placement: "92% Placement Rate",
    projects: "8 AI/ML Projects",
    mentorship: "Expert AI Mentorship",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  };

  const highlights = [
    "Industry AI/ML Projects",
    "Research Paper Publication",
    "AI Certification from Google",
    "Deep Learning Specialization",
    "Real-world Dataset Analysis",
    "AI Job Placement Support"
  ];

  const skills = [
    { name: "Python", level: 95, color: "bg-blue-500" },
    { name: "TensorFlow", level: 88, color: "bg-orange-500" },
    { name: "PyTorch", level: 85, color: "bg-red-500" },
    { name: "Scikit-learn", level: 90, color: "bg-green-500" },
    { name: "Deep Learning", level: 82, color: "bg-purple-500" },
    { name: "Data Analysis", level: 92, color: "bg-yellow-500" },
    { name: "Computer Vision", level: 78, color: "bg-pink-500" },
    { name: "NLP", level: 80, color: "bg-indigo-500" }
  ];

  const syllabus = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      duration: "Week 1-3",
      lessons: 18,
      topics: [
        "Introduction to AI & ML",
        "Types of Machine Learning",
        "Linear & Logistic Regression",
        "Decision Trees & Random Forest",
        "Support Vector Machines",
        "K-Means Clustering",
        "Model Evaluation & Validation"
      ]
    },
    {
      id: 2,
      title: "Deep Learning & Neural Networks",
      duration: "Week 4-7",
      lessons: 22,
      topics: [
        "Neural Network Fundamentals",
        "Backpropagation Algorithm",
        "Convolutional Neural Networks",
        "Recurrent Neural Networks",
        "LSTM & GRU Networks",
        "Generative Adversarial Networks",
        "Transfer Learning"
      ]
    },
    {
      id: 3,
      title: "Computer Vision",
      duration: "Week 8-10",
      lessons: 16,
      topics: [
        "Image Processing Basics",
        "Object Detection & Recognition",
        "Facial Recognition Systems",
        "Image Segmentation",
        "OpenCV Implementation",
        "YOLO & R-CNN Models",
        "Real-time Video Processing"
      ]
    },
    {
      id: 4,
      title: "Natural Language Processing",
      duration: "Week 11-13",
      lessons: 18,
      topics: [
        "Text Preprocessing",
        "Sentiment Analysis",
        "Named Entity Recognition",
        "Language Models",
        "BERT & Transformers",
        "Chatbot Development",
        "Text Generation"
      ]
    },
    {
      id: 5,
      title: "AI Model Deployment & MLOps",
      duration: "Week 14-16",
      lessons: 14,
      topics: [
        "Model Optimization",
        "Cloud Deployment (AWS, GCP)",
        "Docker & Kubernetes",
        "CI/CD for ML Models",
        "Model Monitoring",
        "A/B Testing for ML",
        "Production ML Systems"
      ]
    }
  ];

  const projects = [
    {
      title: "Predictive Analytics Dashboard",
      description: "Build a complete ML dashboard for business forecasting and analytics",
      tech: ["Python", "TensorFlow", "Streamlit", "AWS"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Computer Vision App",
      description: "Develop an object detection and recognition system for real-time applications",
      tech: ["Python", "OpenCV", "YOLO", "Flask"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "NLP Chatbot",
      description: "Create an intelligent chatbot using natural language processing and deep learning",
      tech: ["Python", "NLTK", "BERT", "PyTorch"],
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Recommendation System",
      description: "Build a sophisticated recommendation engine for e-commerce platforms",
      tech: ["Python", "Collaborative Filtering", "TensorFlow", "MongoDB"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const testimonials = [
    {
      name: "Arjun Singh",
      role: "ML Engineer at Google",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "The AI/ML internship was incredible! The depth of knowledge and hands-on projects prepared me for my role at Google."
    },
    {
      name: "Sneha Reddy",
      role: "Data Scientist at Microsoft",
      image: "https://images.unsplash.com/photo-1494790108755-2616b771b1e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "Outstanding curriculum and mentorship. The real-world projects gave me confidence to work on complex AI problems."
    }
  ];

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Machine Learning Algorithms",
      description: "Master supervised, unsupervised, and reinforcement learning algorithms with practical implementation"
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Deep Learning & Neural Networks",
      description: "Build and train neural networks using TensorFlow and PyTorch for complex AI applications"
    },
    {
      icon: <Microscope className="w-6 h-6" />,
      title: "Computer Vision",
      description: "Develop image and video processing applications with object detection and recognition capabilities"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Natural Language Processing",
      description: "Create intelligent text processing systems, chatbots, and language understanding models"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Data Science & Analytics",
      description: "Analyze large datasets and extract meaningful insights using statistical and ML techniques"
    },
    {
      icon: <Robot className="w-6 h-6" />,
      title: "AI Model Deployment",
      description: "Deploy and scale AI models in production environments using cloud platforms and MLOps practices"
    }
  ];

  const tabButtons = [
    { id: 'overview', label: 'Overview', icon: <Brain className="w-4 h-4" /> },
    { id: 'curriculum', label: 'Curriculum', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Code className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Reviews', icon: <Star className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm" />
        
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
                className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Programs
              </Link>

              <div className="flex items-center gap-2 mb-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-xl">
                  <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
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
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Trending
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
                  37% OFF
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEnrolled(!isEnrolled)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
                >
                  {isEnrolled ? 'Enrolled!' : 'Enroll Now'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center px-6 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:border-purple-500 transition-all duration-300"
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
                  <Play className="w-8 h-8 text-purple-600 ml-1" />
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
                    ? 'border-purple-600 text-purple-600'
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
                      Our advanced AI & Machine Learning Internship program is designed to transform you into a skilled 
                      AI professional ready to tackle real-world challenges. You'll dive deep into machine learning algorithms, 
                      neural networks, and cutting-edge AI technologies used by industry leaders.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      Work on research-grade projects, publish papers, and get hands-on experience with the latest AI tools 
                      and frameworks. Our curriculum covers everything from classical ML to deep learning, computer vision, 
                      and natural language processing.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">16</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Weeks Duration</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">AI/ML Projects</div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">92%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Placement Rate</div>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1:1</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Mentorship</div>
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
                        <div className="text-purple-600 dark:text-purple-400 mb-4">
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
                  Comprehensive AI/ML Curriculum
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
                          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                            <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
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
                  AI/ML Projects Portfolio
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm">
                          AI Project
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
                              className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-lg text-sm"
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
                  AI Professional Success Stories
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Master AI & Machine Learning?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join the next generation of AI professionals and build the future with artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Enroll Now - {programData.price}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
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

export default AIMLEnhanced;