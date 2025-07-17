import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  Smartphone,
  Brain,
  Code,
  BarChart2,
  Shield,
  Cloud,
  Database,
  Palette,
  Megaphone,
  Cpu,
  Gamepad,
  Search,
  ChevronRight,
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  Target
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Program {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  duration: string;
  level: string;
  skills: string[];
  color: string;
  route: string;
  badge?: string;
  rating: number;
  enrolled: number;
  type: "internship" | "training" | "certification";
}

const AllPrograms: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const programs: Program[] = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Master both frontend and backend development with modern frameworks and tools",
      icon: <Globe className="w-6 h-6" />,
      category: "Web Development",
      duration: "12 weeks",
      level: "Intermediate",
      skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML/CSS"],
      color: "blue",
      route: "/internship/web-development/full-stack",
      badge: "Most Popular",
      rating: 4.8,
      enrolled: 1250,
      type: "internship"
    },
    {
      id: 2,
      title: "Android App Development",
      description: "Build native Android applications using Java, Kotlin, and modern Android frameworks",
      icon: <Smartphone className="w-6 h-6" />,
      category: "Mobile Development",
      duration: "10 weeks",
      level: "Intermediate",
      skills: ["Java", "Kotlin", "Android Studio", "Firebase", "SQLite"],
      color: "green",
      route: "/internship/android-development",
      rating: 4.7,
      enrolled: 890,
      type: "internship"
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      description: "Dive into artificial intelligence and machine learning with hands-on projects",
      icon: <Brain className="w-6 h-6" />,
      category: "Artificial Intelligence",
      duration: "16 weeks",
      level: "Advanced",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Deep Learning"],
      color: "purple",
      route: "/internship/ai-ml",
      badge: "Advanced",
      rating: 4.9,
      enrolled: 567,
      type: "internship"
    },
    {
      id: 4,
      title: "Data Science & Analytics",
      description: "Transform raw data into actionable insights using advanced analytics",
      icon: <BarChart2 className="w-6 h-6" />,
      category: "Data Science",
      duration: "14 weeks",
      level: "Intermediate",
      skills: ["Python", "R", "SQL", "Tableau", "Power BI", "Statistics"],
      color: "orange",
      route: "/internship/data-science",
      rating: 4.6,
      enrolled: 723,
      type: "internship"
    },
    {
      id: 5,
      title: "Cybersecurity & Ethical Hacking",
      description: "Learn to protect systems and conduct ethical penetration testing",
      icon: <Shield className="w-6 h-6" />,
      category: "Cybersecurity",
      duration: "12 weeks",
      level: "Advanced",
      skills: ["Network Security", "Penetration Testing", "Cryptography", "Security Auditing"],
      color: "red",
      route: "/internship/cybersecurity",
      rating: 4.8,
      enrolled: 445,
      type: "internship"
    },
    {
      id: 6,
      title: "UI/UX Design",
      description: "Create beautiful and user-friendly interfaces and experiences",
      icon: <Palette className="w-6 h-6" />,
      category: "Design",
      duration: "8 weeks",
      level: "Beginner",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
      color: "pink",
      route: "/internship/ui-design",
      rating: 4.5,
      enrolled: 634,
      type: "internship"
    },
    {
      id: 7,
      title: "Python with Django",
      description: "Build scalable web applications using Python and Django framework",
      icon: <Code className="w-6 h-6" />,
      category: "Web Development",
      duration: "10 weeks",
      level: "Intermediate",
      skills: ["Python", "Django", "REST API", "PostgreSQL", "Redis"],
      color: "yellow",
      route: "/internship/python-django",
      rating: 4.7,
      enrolled: 512,
      type: "internship"
    },
    {
      id: 8,
      title: "Cloud Computing (AWS)",
      description: "Master cloud infrastructure and deployment on Amazon Web Services",
      icon: <Cloud className="w-6 h-6" />,
      category: "Cloud Computing",
      duration: "12 weeks",
      level: "Intermediate",
      skills: ["AWS", "Docker", "Kubernetes", "DevOps", "CI/CD"],
      color: "indigo",
      route: "/internship/cloud-computing",
      rating: 4.8,
      enrolled: 389,
      type: "training"
    },
    {
      id: 9,
      title: "Digital Marketing",
      description: "Learn comprehensive digital marketing strategies and tools",
      icon: <Megaphone className="w-6 h-6" />,
      category: "Marketing",
      duration: "8 weeks",
      level: "Beginner",
      skills: ["SEO", "SEM", "Social Media", "Content Marketing", "Analytics"],
      color: "teal",
      route: "/training/digital-marketing",
      rating: 4.4,
      enrolled: 756,
      type: "training"
    },
    {
      id: 10,
      title: "Game Development",
      description: "Create engaging games using Unity and modern game development tools",
      icon: <Gamepad className="w-6 h-6" />,
      category: "Game Development",
      duration: "14 weeks",
      level: "Intermediate",
      skills: ["Unity", "C#", "3D Modeling", "Game Design", "Physics"],
      color: "emerald",
      route: "/training/game-development",
      rating: 4.6,
      enrolled: 298,
      type: "training"
    },
    {
      id: 11,
      title: "Blockchain Development",
      description: "Build decentralized applications and smart contracts",
      icon: <Database className="w-6 h-6" />,
      category: "Blockchain",
      duration: "12 weeks",
      level: "Advanced",
      skills: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts", "DeFi"],
      color: "violet",
      route: "/training/blockchain",
      badge: "New",
      rating: 4.7,
      enrolled: 187,
      type: "training"
    },
    {
      id: 12,
      title: "IoT Development",
      description: "Connect devices and build Internet of Things applications",
      icon: <Cpu className="w-6 h-6" />,
      category: "IoT",
      duration: "10 weeks",
      level: "Intermediate",
      skills: ["Arduino", "Raspberry Pi", "C++", "Python", "Sensors"],
      color: "cyan",
      route: "/training/iot",
      rating: 4.5,
      enrolled: 234,
      type: "training"
    }
  ];

  const categories = [
    "all",
    "Web Development",
    "Mobile Development",
    "Artificial Intelligence",
    "Data Science",
    "Cybersecurity",
    "Design",
    "Cloud Computing",
    "Marketing",
    "Game Development",
    "Blockchain",
    "IoT"
  ];

  const types = [
    { value: "all", label: "All Programs" },
    { value: "internship", label: "Internships" },
    { value: "training", label: "Training" },
    { value: "certification", label: "Certifications" }
  ];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || program.category === selectedCategory;
    const matchesType = selectedType === "all" || program.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "5000+", label: "Students Enrolled" },
    { icon: <BookOpen className="w-8 h-8" />, value: "50+", label: "Programs Available" },
    { icon: <Award className="w-8 h-8" />, value: "95%", label: "Success Rate" },
    { icon: <Target className="w-8 h-8" />, value: "100+", label: "Industry Partners" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              All
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Programs
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive collection of internships, training programs, and certifications 
              designed to accelerate your career in technology.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search programs, skills, or technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {types.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Found {filteredPrograms.length} programs matching your criteria
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                {program.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full z-10">
                    {program.badge}
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-${program.color}-100 dark:bg-${program.color}-900/30 text-${program.color}-600 dark:text-${program.color}-400`}>
                      {program.icon}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {program.rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {program.enrolled} enrolled
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {program.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {program.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Target className="w-4 h-4 mr-2" />
                      {program.level}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {program.category}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Key Skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                      {program.skills.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{program.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Link
                    to={program.route}
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group-hover:shadow-lg"
                  >
                    {program.type === "internship" ? "Apply Now" : "Enroll Now"}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No programs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedType("all");
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
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
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students who have transformed their careers with our programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Career Guidance
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/campus-ambassador"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Become Ambassador
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AllPrograms;

export { AllPrograms };
