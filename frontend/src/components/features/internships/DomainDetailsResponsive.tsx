import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  Brain, 
  Code, 
  BarChart2,
  Palette,
  Shield,
  Cloud,
  Database,
  Gamepad2,
  Megaphone,
  Cpu,
  ArrowLeft,
  Clock,
  BookOpen,
  Layers,
  CheckCircle,
  Users,
  Award,
  Target,
  Star,
  TrendingUp,
  Zap,
  Sparkles,
  Rocket,
  MonitorPlay,
  HeadphonesIcon,
  PaintBucket,
  Camera,
  Lightbulb,
  ChevronRight,
  Menu
} from 'lucide-react';

interface TechStackItem {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon?: string;
}

interface SyllabusModule {
  id: number;
  title: string;
  duration: string;
  topics: string[];
  learningOutcome: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  technologies: string[];
  features: string[];
}

interface DomainInfo {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  duration: string;
  difficulty: string;
  prerequisites: string[];
  techStack: TechStackItem[];
  syllabus: SyllabusModule[];
  projects: Project[];
  careerOpportunities: string[];
  averageSalary: string;
}

const DomainDetails: React.FC = () => {
  const { domainSlug } = useParams<{ domainSlug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'projects' | 'career'>('overview');
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const domainData: Record<string, DomainInfo> = useMemo(() => ({
    web: {
      id: 'web',
      title: 'Web Development',
      description: 'Master frontend, backend, or full-stack development using industry-standard technologies and frameworks.',
      icon: <Globe size={50} className="text-blue-500" />,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-400',
      duration: '3-6 Months',
      difficulty: 'Beginner to Advanced',
      prerequisites: ['Basic Computer Knowledge', 'Problem-solving Skills', 'Logical Thinking'],
      averageSalary: '₹3-12 LPA',
      techStack: [
        { name: 'HTML5', level: 'Beginner' },
        { name: 'CSS3', level: 'Beginner' },
        { name: 'JavaScript', level: 'Intermediate' },
        { name: 'React.js', level: 'Intermediate' },
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'MongoDB', level: 'Intermediate' },
        { name: 'Git/GitHub', level: 'Beginner' }
      ],
      syllabus: [
        {
          id: 1,
          title: 'Frontend Fundamentals',
          duration: '3 Weeks',
          topics: ['HTML5 Semantic Elements', 'CSS3 & Flexbox/Grid', 'Responsive Design', 'JavaScript ES6+'],
          learningOutcome: 'Build modern, responsive user interfaces'
        },
        {
          id: 2,
          title: 'React Development',
          duration: '4 Weeks',
          topics: ['React Components', 'State Management', 'Hooks', 'React Router'],
          learningOutcome: 'Create dynamic single-page applications'
        },
        {
          id: 3,
          title: 'Backend Development',
          duration: '4 Weeks',
          topics: ['Node.js & Express', 'REST APIs', 'Database Integration', 'Authentication'],
          learningOutcome: 'Build secure server-side applications'
        },
        {
          id: 4,
          title: 'Full-Stack Integration',
          duration: '3 Weeks',
          topics: ['Frontend-Backend Connection', 'Deployment', 'Version Control', 'Testing'],
          learningOutcome: 'Deploy complete web applications'
        }
      ],
      projects: [
        {
          id: 1,
          title: 'E-commerce Website',
          description: 'Build a complete online shopping platform with user authentication, product catalog, and payment integration',
          difficulty: 'Advanced',
          duration: '4 Weeks',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
          features: ['User Authentication', 'Product Search', 'Shopping Cart', 'Payment Gateway', 'Admin Dashboard']
        },
        {
          id: 2,
          title: 'Task Management App',
          description: 'Create a collaborative project management tool with real-time updates',
          difficulty: 'Intermediate',
          duration: '2 Weeks',
          technologies: ['React', 'Firebase', 'Material-UI'],
          features: ['Real-time Updates', 'Team Collaboration', 'File Attachments', 'Progress Tracking']
        }
      ],
      careerOpportunities: [
        'Frontend Developer',
        'Backend Developer',
        'Full-Stack Developer',
        'UI/UX Developer',
        'Software Engineer'
      ]
    },
    android: {
      id: 'android',
      title: 'Android Development',
      description: 'Build powerful Android apps using modern development tools and frameworks with real-world implementations.',
      icon: <Smartphone size={50} className="text-green-500" />,
      color: 'green',
      gradient: 'from-green-500 to-emerald-400',
      duration: '3-5 Months',
      difficulty: 'Beginner to Advanced',
      prerequisites: ['Basic Programming Knowledge', 'Object-Oriented Concepts', 'Problem-solving Skills'],
      averageSalary: '₹3-15 LPA',
      techStack: [
        { name: 'Java', level: 'Intermediate' },
        { name: 'Kotlin', level: 'Advanced' },
        { name: 'Android Studio', level: 'Intermediate' },
        { name: 'XML Layouts', level: 'Beginner' },
        { name: 'Firebase', level: 'Intermediate' },
        { name: 'SQLite', level: 'Intermediate' },
        { name: 'REST APIs', level: 'Intermediate' }
      ],
      syllabus: [
        {
          id: 1,
          title: 'Android Fundamentals',
          duration: '2 Weeks',
          topics: ['Android Architecture', 'Activities & Fragments', 'Views & Layouts', 'Intents'],
          learningOutcome: 'Understand Android app structure and basic components'
        },
        {
          id: 2,
          title: 'UI/UX Design',
          duration: '2 Weeks',
          topics: ['Material Design', 'RecyclerView', 'Navigation', 'Animations'],
          learningOutcome: 'Create beautiful and user-friendly interfaces'
        },
        {
          id: 3,
          title: 'Data Management',
          duration: '3 Weeks',
          topics: ['SQLite Database', 'Room Database', 'SharedPreferences', 'File Storage'],
          learningOutcome: 'Implement efficient data storage solutions'
        }
      ],
      projects: [
        {
          id: 1,
          title: 'Social Media App',
          description: 'Build a complete social networking application with real-time features',
          difficulty: 'Advanced',
          duration: '4 Weeks',
          technologies: ['Kotlin', 'Firebase', 'Room Database'],
          features: ['User Profiles', 'Posts & Comments', 'Real-time Chat', 'Image Sharing']
        }
      ],
      careerOpportunities: [
        'Android Developer',
        'Mobile App Developer',
        'Native App Developer',
        'Mobile Software Engineer'
      ]
    },
    // Add simplified data for other domains to keep file size manageable
    ai: {
      id: 'ai',
      title: 'AI & Machine Learning',
      description: 'Explore artificial intelligence and machine learning with hands-on projects and real-world applications.',
      icon: <Brain size={50} className="text-purple-500" />,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-400',
      duration: '4-8 Months',
      difficulty: 'Intermediate to Advanced',
      prerequisites: ['Python Programming', 'Mathematics & Statistics', 'Linear Algebra Basics'],
      averageSalary: '₹6-25 LPA',
      techStack: [
        { name: 'Python', level: 'Intermediate' },
        { name: 'TensorFlow', level: 'Advanced' },
        { name: 'Scikit-learn', level: 'Intermediate' },
        { name: 'Pandas', level: 'Intermediate' }
      ],
      syllabus: [
        {
          id: 1,
          title: 'Python for AI',
          duration: '2 Weeks',
          topics: ['Python Libraries', 'NumPy & Pandas', 'Data Manipulation'],
          learningOutcome: 'Master Python tools for AI development'
        }
      ],
      projects: [
        {
          id: 1,
          title: 'Recommendation System',
          description: 'Build an AI-powered recommendation engine',
          difficulty: 'Advanced',
          duration: '3 Weeks',
          technologies: ['Python', 'TensorFlow', 'Pandas'],
          features: ['Machine Learning', 'Data Analysis', 'Personalization']
        }
      ],
      careerOpportunities: [
        'AI/ML Engineer',
        'Data Scientist',
        'Research Scientist'
      ]
    }
  }), []);

  useEffect(() => {
    if (domainSlug && domainData[domainSlug]) {
      setDomainInfo(domainData[domainSlug]);
    } else {
      navigate('/all-programs');
    }
  }, [domainSlug, navigate, domainData]);

  if (!domainInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Responsive Hero Section */}
      <section className={`relative bg-gradient-to-r ${domainInfo.gradient} text-white py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden`}>
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <Link 
              to="/all-programs" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors group text-sm sm:text-base"
            >
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Back to All Programs</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
            <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left w-full">
              {/* Icon with animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative flex justify-center lg:justify-start"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl">
                  {React.cloneElement(domainInfo.icon as React.ReactElement, {
                    size: window.innerWidth < 640 ? 24 : window.innerWidth < 768 ? 32 : 40,
                    className: "text-white"
                  })}
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <Sparkles size={8} className="text-yellow-800 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                </motion.div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                {domainInfo.title}
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block ml-2"
                >
                  ✨
                </motion.span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto lg:mx-0"
              >
                {domainInfo.description}
              </motion.p>

              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto lg:mx-0"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Clock size={14} className="text-white/80 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <div>
                      <div className="text-xs sm:text-sm text-white/70">Duration</div>
                      <div className="font-bold text-sm sm:text-base md:text-lg">{domainInfo.duration}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Target size={14} className="text-white/80 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <div>
                      <div className="text-xs sm:text-sm text-white/70">Level</div>
                      <div className="font-bold text-sm sm:text-base md:text-lg">{domainInfo.difficulty}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 border border-white/10 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                    <TrendingUp size={14} className="text-white/80 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <div>
                      <div className="text-xs sm:text-sm text-white/70">Salary</div>
                      <div className="font-bold text-sm sm:text-base md:text-lg">{domainInfo.averageSalary}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0"
              >
                <Link
                  to="/apply-internship"
                  className={`group inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex-1 sm:flex-none`}
                >
                  <Rocket size={16} className="group-hover:rotate-12 transition-transform sm:w-5 sm:h-5" />
                  Apply Now
                </Link>
                <button
                  onClick={() => setActiveTab('syllabus')}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 flex-1 sm:flex-none"
                >
                  <BookOpen size={16} className="sm:w-5 sm:h-5" />
                  View Curriculum
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Responsive Navigation Tabs */}
      <section className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Mobile Tab Selector */}
          <div className="sm:hidden py-3">
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as 'overview' | 'syllabus' | 'projects' | 'career')}
                className={`w-full p-3 sm:p-4 rounded-lg border border-gray-200 bg-gradient-to-r ${domainInfo.gradient} text-white font-bold text-base appearance-none`}
              >
                <option value="overview" className="bg-white text-gray-800">🔍 Overview</option>
                <option value="syllabus" className="bg-white text-gray-800">📚 Syllabus</option>
                <option value="projects" className="bg-white text-gray-800">🛠️ Projects</option>
                <option value="career" className="bg-white text-gray-800">💼 Career</option>
              </select>
              <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 w-5 h-5 text-white pointer-events-none" />
            </div>
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden sm:flex space-x-1 overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview', icon: <Layers size={20} />, description: 'Complete roadmap' },
              { id: 'syllabus', label: 'Syllabus', icon: <BookOpen size={20} />, description: 'Detailed curriculum' },
              { id: 'projects', label: 'Projects', icon: <Code size={20} />, description: 'Hands-on work' },
              { id: 'career', label: 'Career', icon: <Users size={20} />, description: 'Job opportunities' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'syllabus' | 'projects' | 'career')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-8 font-medium transition-all duration-300 min-w-[80px] sm:min-w-[100px] md:min-w-[140px] ${
                  activeTab === tab.id
                    ? `text-${domainInfo.color}-600 bg-gradient-to-t from-${domainInfo.color}-50 to-transparent`
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {/* Active indicator */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${domainInfo.gradient} rounded-t-full`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Icon with background */}
                <div className={`relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? `bg-gradient-to-r ${domainInfo.gradient} text-white shadow-lg` 
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  {React.cloneElement(tab.icon as React.ReactElement, {
                    size: window.innerWidth < 768 ? 16 : 20
                  })}
                </div>
                
                {/* Label and description */}
                <div className="text-center">
                  <div className="font-bold text-xs sm:text-sm">{tab.label}</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-500 hidden md:block">{tab.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Responsive Content Sections */}
      <section className="py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 sm:space-y-8 md:space-y-12"
            >
              {/* Tech Stack */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r ${domainInfo.gradient} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Zap size={16} className="text-white sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Tech Stack You'll Master
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {domainInfo.techStack.map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="group bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                        <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-800">{tech.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tech.level)}`}>
                          {tech.level}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-2 sm:mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ 
                            width: tech.level === 'Beginner' ? '40%' : 
                                   tech.level === 'Intermediate' ? '70%' : '95%'
                          }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                          className={`h-1.5 sm:h-2 rounded-full bg-gradient-to-r ${domainInfo.gradient}`}
                        ></motion.div>
                      </div>
                      
                      <div className="text-xs sm:text-sm text-gray-600">
                        {tech.level === 'Beginner' && "📚 Learn from scratch"}
                        {tech.level === 'Intermediate' && "🚀 Build real projects"}
                        {tech.level === 'Advanced' && "⚡ Master advanced concepts"}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Learning Path */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r ${domainInfo.gradient} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <MonitorPlay size={16} className="text-white sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Your Learning Journey
                  </h2>
                </div>
                
                <div className="relative">
                  {/* Timeline line - hidden on mobile */}
                  <div className="hidden sm:block absolute left-6 md:left-8 top-6 md:top-8 bottom-6 md:bottom-8 w-0.5 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300"></div>
                  
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    {domainInfo.syllabus.map((module, index) => (
                      <motion.div
                        key={module.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        className="relative"
                      >
                        {/* Timeline indicator - hidden on mobile */}
                        <div className="hidden sm:flex absolute left-0 top-4 sm:top-6 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full border-4 border-gray-200 items-center justify-center z-10 shadow-lg">
                          <span className={`font-bold text-sm sm:text-base md:text-lg text-${domainInfo.color}-600`}>{index + 1}</span>
                        </div>
                        
                        {/* Content Card */}
                        <div className="sm:ml-16 md:ml-24 bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              {/* Mobile timeline indicator */}
                              <div className="sm:hidden w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="font-bold text-xs text-white">{index + 1}</span>
                              </div>
                              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{module.title}</h3>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 text-gray-600">
                              <Clock size={14} className="sm:w-4 sm:h-4" />
                              <span className="text-xs sm:text-sm md:text-base">{module.duration}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">{module.learningOutcome}</p>
                          
                          <div className="space-y-2 sm:space-y-3">
                            <h4 className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">Topics Covered:</h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {module.topics.slice(0, 3).map((topic, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                                >
                                  {topic}
                                </span>
                              ))}
                              {module.topics.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs">
                                  +{module.topics.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other tabs content would go here... */}
          {activeTab === 'syllabus' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 sm:space-y-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold">Detailed Syllabus</h2>
              {domainInfo.syllabus.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-md"
                >
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-${domainInfo.color}-500 text-white flex items-center justify-center font-bold text-sm sm:text-base md:text-lg`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{module.title}</h3>
                      <div className="flex items-center gap-2 sm:gap-4 text-gray-600 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="sm:w-4 sm:h-4" />
                          <span className="text-sm sm:text-base">{module.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Topics Covered:</h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {module.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle size={14} className={`text-${domainInfo.color}-500 sm:w-4 sm:h-4`} />
                            <span className="text-xs sm:text-sm md:text-base">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Learning Outcome:</h4>
                      <p className="text-gray-700 text-xs sm:text-sm md:text-base">{module.learningOutcome}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Additional tabs content can be added here */}
        </div>
      </section>
    </div>
  );
};

export default DomainDetails;
