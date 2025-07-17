import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  Smartphone,
  Brain,
  Code,
  BarChart2,
  Shield,
  Palette,
  Database,
  ArrowRight,
  Clock,
  Star,
  ChevronRight,
  CheckCircle,
  Users,
  Award,
  Target,
  Play,
  BookOpen,
  TrendingUp,
  Zap,
  Sparkles,
  GraduationCap,
  Certificate,
  Trophy,
  Rocket,
  Filter,
  Search,
  Grid,
  List
} from "lucide-react";

interface InternshipProgram {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  level: string;
  skills: string[];
  color: string;
  route: string;
  badge?: string;
  image?: string;
  price?: string;
  originalPrice?: string;
  rating?: number;
  students?: number;
  category?: string;
  featured?: boolean;
  highlights?: string[];
}

const Internship: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const programs: InternshipProgram[] = [
    {
      id: 1,
      title: "Web Development",
      description: "Master frontend, backend, or full stack development with hands-on projects and industry-standard tools.",
      icon: <Globe className="w-8 h-8" />,
      duration: "8-12 weeks",
      level: "Beginner to Advanced",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "Express"],
      color: "blue",
      route: "/internship/web-development",
      badge: "Most Popular",
      image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹15,999",
      originalPrice: "₹24,999",
      rating: 4.8,
      students: 1250,
      category: "development",
      featured: true,
      highlights: ["Live Projects", "Industry Mentorship", "Job Guarantee"]
    },
    {
      id: 2,
      title: "Android Development",
      description: "Build native Android applications using Java, Kotlin, or cross-platform frameworks like Flutter.",
      icon: <Smartphone className="w-8 h-8" />,
      duration: "10-14 weeks",
      level: "Intermediate",
      skills: ["Java", "Kotlin", "Android Studio", "Flutter", "Firebase", "API Integration"],
      color: "green",
      route: "/internship/android-development",
      image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹12,999",
      originalPrice: "₹19,999",
      rating: 4.7,
      students: 856,
      category: "development",
      featured: false,
      highlights: ["Play Store Publishing", "Real Apps", "Google Guidelines"]
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      description: "Dive into artificial intelligence and machine learning with real-world projects and datasets.",
      icon: <Brain className="w-8 h-8" />,
      duration: "12-16 weeks",
      level: "Advanced",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Data Analysis", "Deep Learning"],
      color: "purple",
      route: "/internship/ai-ml",
      badge: "Trending",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹18,999",
      originalPrice: "₹29,999",
      rating: 4.9,
      students: 642,
      category: "ai-ml",
      featured: true,
      highlights: ["Industry Projects", "AI Certification", "Research Papers"]
    },
    {
      id: 4,
      title: "Data Science",
      description: "Analyze data, build predictive models, and create visualizations to drive business insights.",
      icon: <BarChart2 className="w-8 h-8" />,
      duration: "10-12 weeks",
      level: "Intermediate to Advanced",
      skills: ["Python", "R", "SQL", "Tableau", "Power BI", "Statistics"],
      color: "orange",
      route: "/internship/data-science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹16,999",
      originalPrice: "₹26,999",
      rating: 4.8,
      students: 934,
      category: "data",
      featured: false,
      highlights: ["Real Datasets", "Business Intelligence", "Predictive Modeling"]
    },
    {
      id: 5,
      title: "Cybersecurity",
      description: "Learn ethical hacking, penetration testing, and security protocols to protect digital assets.",
      icon: <Shield className="w-8 h-8" />,
      duration: "8-10 weeks",
      level: "Intermediate",
      skills: ["Network Security", "Ethical Hacking", "Penetration Testing", "Cryptography", "Security Auditing"],
      color: "red",
      route: "/internship/cybersecurity",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹14,999",
      originalPrice: "₹22,999",
      rating: 4.7,
      students: 567,
      category: "security",
      featured: false,
      highlights: ["Ethical Hacking", "Penetration Testing", "Security Certification"]
    },
    {
      id: 6,
      title: "UI/UX Design",
      description: "Design user-friendly interfaces and experiences using modern design tools and principles.",
      icon: <Palette className="w-8 h-8" />,
      duration: "6-8 weeks",
      level: "Beginner to Intermediate",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems"],
      color: "pink",
      route: "/internship/ui-design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹11,999",
      originalPrice: "₹18,999",
      rating: 4.6,
      students: 789,
      category: "design",
      featured: false,
      highlights: ["Design Portfolio", "User Research", "Industry Tools"]
    },
    {
      id: 7,
      title: "Python with Django",
      description: "Build scalable web applications using Python and the Django framework.",
      icon: <Code className="w-8 h-8" />,
      duration: "8-10 weeks",
      level: "Intermediate",
      skills: ["Python", "Django", "REST API", "PostgreSQL", "Redis", "Celery"],
      color: "yellow",
      route: "/internship/python-django",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹13,999",
      originalPrice: "₹21,999",
      rating: 4.7,
      students: 456,
      category: "development",
      featured: false,
      highlights: ["Django Framework", "REST APIs", "Database Integration"]
    },
    {
      id: 8,
      title: "Data Analytics",
      description: "Transform raw data into actionable insights using advanced analytics tools and techniques.",
      icon: <Database className="w-8 h-8" />,
      duration: "8-10 weeks",
      level: "Beginner to Intermediate",
      skills: ["Excel", "SQL", "Python", "Tableau", "Power BI", "Statistics"],
      color: "teal",
      route: "/internship/data-analytics",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: "₹12,999",
      originalPrice: "₹19,999",
      rating: 4.5,
      students: 678,
      category: "data",
      featured: false,
      highlights: ["Data Visualization", "Business Analytics", "Statistical Analysis"]
    }
  ];

  const categories = [
    { id: "all", name: "All Programs", count: programs.length },
    { id: "development", name: "Development", count: programs.filter(p => p.category === "development").length },
    { id: "ai-ml", name: "AI & ML", count: programs.filter(p => p.category === "ai-ml").length },
    { id: "data", name: "Data Science", count: programs.filter(p => p.category === "data").length },
    { id: "design", name: "Design", count: programs.filter(p => p.category === "design").length },
    { id: "security", name: "Security", count: programs.filter(p => p.category === "security").length },
  ];

  const filteredPrograms = programs.filter(program => {
    const matchesCategory = selectedCategory === "all" || program.category === selectedCategory;
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { value: "1000+", label: "Students Trained", icon: <Users className="w-6 h-6" /> },
    { value: "95%", label: "Placement Rate", icon: <Target className="w-6 h-6" /> },
    { value: "50+", label: "Industry Partners", icon: <Award className="w-6 h-6" /> },
    { value: "24/7", label: "Support Available", icon: <Clock className="w-6 h-6" /> }
  ];

  const benefits = [
    "Industry-relevant curriculum designed by experts",
    "Hands-on projects with real-world applications",
    "Mentorship from experienced professionals",
    "Certificates upon successful completion",
    "Career guidance and placement support",
    "Flexible learning schedules"
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300 text-lg font-medium"
          >
            Loading amazing internship programs...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-40 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ x: [-30, 30, -30], y: [30, -30, 30] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-40 w-24 h-24 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              Premium Internship Programs
              <Trophy className="w-5 h-5 ml-2 text-yellow-500" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Launch Your
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse"
              >
                {" "}Tech Career
              </motion.span>
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ duration: 2, delay: 0.6 }}
                className="inline-block ml-4"
              >
                <Rocket className="w-12 h-12 text-purple-600" />
              </motion.div>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Join our comprehensive internship programs and gain hands-on experience in cutting-edge technologies. 
              Build real projects, work with industry mentors, and accelerate your career growth with guaranteed placement support.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="#programs"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Explore Programs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Get Guidance
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-3 text-blue-600 dark:text-blue-400">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.icon}
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Choose Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Dream Path</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Select from our diverse range of internship programs designed to match your interests and career goals.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Programs Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 ${
                    program.featured ? "ring-2 ring-blue-500 ring-opacity-50" : ""
                  } ${viewMode === "list" ? "flex flex-col md:flex-row" : ""}`}
                >
                  {/* Badge */}
                  {program.badge && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full z-10 shadow-lg"
                    >
                      {program.badge}
                    </motion.div>
                  )}

                  {/* Image */}
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "md:w-1/3" : "h-48"}`}>
                    <motion.img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{program.rating}</span>
                    </div>
                  </div>
                  
                  <div className={`p-6 ${viewMode === "list" ? "md:w-2/3" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${program.color}-100 dark:bg-${program.color}-900/30 text-${program.color}-600 dark:text-${program.color}-400`}>
                        {program.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {program.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {program.students} students enrolled
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {program.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {program.highlights?.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {program.duration}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {program.level}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Skills You'll Master:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {program.skills.slice(0, 4).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg"
                          >
                            {skill}
                          </span>
                        ))}
                        {program.skills.length > 4 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{program.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {program.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {program.originalPrice}
                        </span>
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4"
                    >
                      <Link
                        to={program.route}
                        className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group-hover:shadow-lg"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredPrograms.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No programs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our Internship Programs?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We provide comprehensive learning experiences that prepare you for real-world challenges 
                and accelerate your career growth in the tech industry.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-blue-100 mb-6">
                  Join thousands of students who have successfully launched their tech careers through our programs.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-sm font-semibold"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold">1000+ Students</p>
                    <p className="text-sm text-blue-100">Already enrolled</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Internship;

export { Internship };
