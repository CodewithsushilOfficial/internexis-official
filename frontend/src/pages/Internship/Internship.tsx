import React from "react";
import { motion } from "framer-motion";
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
  Target
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
}

const Internship: React.FC = () => {
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
      badge: "Most Popular"
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
      route: "/internship/android-development"
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
      route: "/internship/ai-ml"
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
      route: "/internship/data-science"
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
      route: "/internship/cybersecurity"
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
      route: "/internship/ui-design"
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
      route: "/internship/python-django"
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
      route: "/internship/data-analytics"
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4"
            >
              <Star className="w-4 h-4 mr-2" />
              Premium Internship Programs
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Launch Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Tech Career
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Join our comprehensive internship programs and gain hands-on experience in cutting-edge technologies. 
              Build real projects, work with industry mentors, and accelerate your career growth.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/all-programs"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Programs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
              >
                Get Guidance
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Select from our diverse range of internship programs designed to match your interests and career goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                {program.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full">
                    {program.badge}
                  </div>
                )}
                
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${program.color}-100 dark:bg-${program.color}-900/30 text-${program.color}-600 dark:text-${program.color}-400 mb-4`}>
                    {program.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {program.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      Duration: {program.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Star className="w-4 h-4 mr-2" />
                      Level: {program.level}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Skills You'll Learn:
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
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
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
