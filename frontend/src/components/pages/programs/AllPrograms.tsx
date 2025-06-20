import React, { useState, useEffect } from 'react';
import { Globe, Smartphone, Brain, Code, BarChart2, Shield, Cloud, Database, Palette, Megaphone, Cpu, Gamepad, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Program {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
  gradient?: string;
}

export const AllPrograms: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize AOS animation library
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
      title: "Web Development",
      description: "Master frontend, backend, or full-stack development using industry-standard technologies.",
      icon: <Globe size={40} />,
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Express.js", "Git", "REST APIs"],
      color: "blue",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      title: "Android App Development",
      description: "Build powerful Android apps using modern development tools and real-world use cases.",
      icon: <Smartphone size={40} />,
      skills: ["Java", "Kotlin", "Android Studio", "Firebase", "UI/UX Design", "API Integration", "SQLite"],
      color: "green",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      description: "Explore the world of artificial intelligence with practical projects and model training.",
      icon: <Brain size={40} />,
      skills: ["Python", "TensorFlow", "Scikit-learn", "Neural Networks", "NLP", "Computer Vision", "Data Analysis"],
      color: "purple",
      gradient: "from-purple-500 to-indigo-400"
    },
    {
      id: 4,
      title: "Programming Languages",
      description: "Strengthen your programming foundation and master the most in-demand languages.",
      icon: <Code size={40} />,
      skills: ["C", "C++", "Java", "JavaScript", "PHP", "Python", "React Basics", "OOP Concepts"],
      color: "orange",
      gradient: "from-orange-500 to-amber-400"
    },
    {
      id: 5,
      title: "Data Science & Analytics",
      description: "Turn data into insights using analytical tools, statistics, and visualization techniques.",
      icon: <BarChart2 size={40} />,
      skills: ["Python", "Pandas", "NumPy", "SQL", "Data Visualization", "Power BI", "Excel", "Statistical Analysis"],
      color: "blue",
      gradient: "from-blue-600 to-sky-400"
    },
    {
      id: 6,
      title: "Cybersecurity",
      description: "Learn how to secure digital systems and networks through ethical hacking and security tools.",
      icon: <Shield size={40} />,
      skills: ["Kali Linux", "Ethical Hacking", "OWASP", "Burp Suite", "Network Security", "Firewalls", "Linux Commands"],
      color: "green",
      gradient: "from-teal-500 to-green-400"
    },
    {
      id: 7,
      title: "Cloud Computing & DevOps",
      description: "Master cloud platforms and DevOps tools to build scalable, automated systems.",
      icon: <Cloud size={40} />,
      skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "GitHub", "CI/CD", "Shell Scripting", "Linux"],
      color: "purple",
      gradient: "from-violet-500 to-purple-400"
    },
    {
      id: 8,
      title: "Blockchain Development",
      description: "Dive into decentralized technology and build smart contracts on Ethereum.",
      icon: <Database size={40} />,
      skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js", "Truffle", "MetaMask", "DApps"],
      color: "orange",
      gradient: "from-amber-500 to-yellow-400"
    },
    {
      id: 9,
      title: "UI/UX Design",
      description: "Design intuitive and engaging user experiences with modern design tools.",
      icon: <Palette size={40} />,
      skills: ["Figma", "Adobe XD", "Prototyping", "Wireframing", "User Research", "Responsive Design", "Accessibility"],
      color: "blue",
      gradient: "from-cyan-500 to-blue-400"
    },
    {
      id: 10,
      title: "Digital Marketing",
      description: "Build your brand and boost visibility using SEO, social media, and online campaigns.",
      icon: <Megaphone size={40} />,
      skills: ["SEO", "SEM", "Google Ads", "Analytics", "Social Media Marketing", "Email Marketing", "Canva", "Content Strategy"],
      color: "green",
      gradient: "from-lime-500 to-green-400"
    },
    {
      id: 11,
      title: "Internet of Things (IoT)",
      description: "Create smart devices and applications using sensors, microcontrollers, and cloud integration.",
      icon: <Cpu size={40} />,
      skills: ["Arduino", "ESP32", "NodeMCU", "C/C++", "MQTT", "Blynk", "Firebase", "IoT Cloud Platforms"],
      color: "purple",
      gradient: "from-fuchsia-500 to-purple-400"
    },
    {
      id: 12,
      title: "Game Development",
      description: "Develop exciting 2D/3D games using professional game engines and logic design.",
      icon: <Gamepad size={40} />,
      skills: ["Unity", "C#", "Game Physics", "Level Design", "Animations", "Game UI", "Asset Creation"],
      color: "orange",
      gradient: "from-red-500 to-orange-400"
    }
  ];

  const getColorClass = (color: string, gradient: string | undefined, isHovered: boolean) => {
    const baseClasses = "absolute inset-0 rounded-xl transition-all duration-300 z-0";
    
    if (gradient && isHovered) {
      return `${baseClasses} bg-gradient-to-r ${gradient} opacity-20`;
    }
    
    switch (color) {
      case "blue":
        return `${baseClasses} ${isHovered ? 'bg-blue-100' : 'bg-blue-50'}`;
      case "green":
        return `${baseClasses} ${isHovered ? 'bg-green-100' : 'bg-green-50'}`;
      case "purple":
        return `${baseClasses} ${isHovered ? 'bg-purple-100' : 'bg-purple-50'}`;
      case "orange":
        return `${baseClasses} ${isHovered ? 'bg-orange-100' : 'bg-orange-50'}`;
      default:
        return `${baseClasses} ${isHovered ? 'bg-gray-100' : 'bg-gray-50'}`;
    }
  };

  const getIconColor = (color: string, gradient: string | undefined, isHovered: boolean) => {
    if (gradient && isHovered) {
      return "text-white";
    }
    
    switch (color) {
      case "blue": return "text-blue-500";
      case "green": return "text-green-500";
      case "purple": return "text-purple-500";
      case "orange": return "text-orange-500";
      default: return "text-gray-500";
    }
  };

  // Filter programs based on search query
  const filteredPrograms = searchQuery.trim() === '' 
    ? programs 
    : programs.filter(program => 
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        program.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100" id="all-programs">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-500 hover:text-blue-600 inline-flex items-center text-sm font-medium transition-colors duration-300">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-800 ml-1 md:ml-2 text-sm font-medium">All Programs</span>
                </div>
              </li>
            </ol>
          </nav>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              🎓 Our Internship Programs
            </span>
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.8 }}
            ></motion.div>
          </h2>
          <motion.p 
            className="text-xl text-gray-700 mb-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Learn. Build. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">Excel.</span>
          </motion.p>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            Kickstart your tech career with our industry-relevant internship programs designed for students and freshers. 
            Each program offers hands-on learning, real-time projects, expert mentorship, and a certificate of completion.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12" data-aos="fade-up" data-aos-delay="200">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000">
          {filteredPrograms.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }} 
              className="col-span-full text-center py-10"
              data-aos="fade-up"
            >
              <div className="text-gray-600 text-xl mb-4">No programs match your search</div>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </motion.div>
          ) : (
            filteredPrograms.map((program, index) => (
              <motion.div 
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-aos="flip-up"
                data-aos-delay={index * 100}
                className="relative p-6 rounded-xl shadow-lg bg-white cursor-pointer transition-all duration-300 hover:shadow-2xl z-10 group transform hover:-translate-y-2 hover:scale-[1.03] overflow-hidden"
                onMouseEnter={() => setHoveredCard(program.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background with animated gradient */}
                <div className={getColorClass(program.color, program.gradient, hoveredCard === program.id)}></div>
                
                {/* Animated border effect */}
                {hoveredCard === program.id && (
                  <motion.div 
                    className="absolute inset-0 z-0 border-2 rounded-xl overflow-hidden"
                    animate={{
                      background: [
                        `linear-gradient(0deg, transparent, transparent)`,
                        `linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.2), transparent 50%)`,
                        `linear-gradient(180deg, transparent 50%, rgba(255,255,255,0.2), transparent 50%)`,
                        `linear-gradient(270deg, transparent 50%, rgba(255,255,255,0.2), transparent 50%)`,
                        `linear-gradient(360deg, transparent 50%, rgba(255,255,255,0.2), transparent 50%)`,
                        `linear-gradient(0deg, transparent, transparent)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
                
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`${hoveredCard === program.id && program.gradient 
                      ? 'bg-gradient-to-r ' + program.gradient + ' p-3 rounded-full inline-block shadow-lg' 
                      : getIconColor(program.color, program.gradient, hoveredCard === program.id) + ' transform transition-all duration-500'} 
                      mb-4`}
                  >
                    {program.icon}
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-bold mb-3 text-gray-900"
                    animate={hoveredCard === program.id ? {
                      color: ['#1F2937', program.color === 'blue' ? '#3B82F6' : 
                             program.color === 'green' ? '#10B981' : 
                             program.color === 'purple' ? '#8B5CF6' : 
                             program.color === 'orange' ? '#F59E0B' : '#4B5563']
                    } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {program.title}
                  </motion.h3>
                  
                  <p className="text-gray-700 mb-4">{program.description}</p>
                  
                  <div className="mt-4">
                    <p className="font-medium text-gray-800 mb-2">Key Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {program.skills.map((skill, idx) => (
                        <motion.span 
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 + 0.2 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                            hoveredCard === program.id 
                              ? 'bg-gradient-to-r ' + program.gradient + ' text-white shadow-sm' 
                              : 'bg-white text-gray-700 border border-gray-200'
                          } transition-all duration-300`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to="/internship-projects"
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-white ${
                          hoveredCard === program.id && program.gradient 
                            ? 'bg-gradient-to-r ' + program.gradient + ' shadow-md' 
                            : `bg-${program.color}-500 hover:bg-${program.color}-600`
                        } transition-all duration-300`}
                      >
                        View Projects
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 ml-2" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.5 }} 
          className="mt-24 max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl relative overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {/* Background gradient animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
          
          {/* Animated corner accents */}
          <motion.div 
            className="absolute top-0 left-0 w-16 h-16" 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-300 to-cyan-200 opacity-20 -translate-x-16 -translate-y-16"></div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-0 right-0 w-16 h-16" 
            animate={{ rotate: -360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-300 to-pink-200 opacity-20 translate-x-16 translate-y-16"></div>
          </motion.div>
          
          <div className="relative z-10">
            <motion.h3 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            >
              ✨ All Internships Include:
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                "Real-World Projects",
                "Resume-Boosting Certifications",
                "Flexible Timings",
                "Live Mentorship & Support",
                "Project Report Assistance",
                "Authorized by AICTE / ISO / Ministry of Technical Education"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-start bg-gradient-to-r from-white to-gray-50 p-3 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mr-3 shadow-sm">
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-white text-lg font-bold"
                    >
                      ✓
                    </motion.span>
                  </div>
                  <p className="text-gray-700 font-medium py-1">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 text-center"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <Link 
            to="/#contact" 
            className="relative inline-flex group items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
          >
            {/* Animation effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            
            {/* Particle effect on hover */}
            <span className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:scale-105"></span>
            
            {/* Button text */}
            <span className="relative z-10 flex items-center">
              Apply Now 
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};