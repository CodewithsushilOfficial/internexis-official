import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ShieldCheckIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
  ClockIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

const modules = [
  {
    category: "Cybersecurity Fundamentals",
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    color: "from-red-500 to-pink-500",
    topics: [
      {
        title: "Networking Basics",
        duration: "Week 1-2",
        description: "OSI model, TCP/IP, network protocols, subnetting"
      },
      {
        title: "Information Security Principles",
        duration: "Week 3",
        description: "CIA triad, risk assessment, security policies"
      },
      {
        title: "Cryptography Fundamentals",
        duration: "Week 4",
        description: "Encryption, hashing, digital signatures, PKI"
      }
    ]
  },
  {
    category: "Ethical Hacking & Penetration Testing",
    icon: <ComputerDesktopIcon className="h-6 w-6" />,
    color: "from-purple-500 to-indigo-500",
    topics: [
      {
        title: "Kali Linux Mastery",
        duration: "Week 5-6",
        description: "Linux commands, terminal navigation, tool usage"
      },
      {
        title: "Reconnaissance & Scanning",
        duration: "Week 7",
        description: "Footprinting, enumeration, vulnerability scanning"
      },
      {
        title: "Exploitation Techniques",
        duration: "Week 8-9",
        description: "System exploitation, privilege escalation, persistence"
      }
    ]
  },
  {
    category: "Web Application Security",
    icon: <GlobeAltIcon className="h-6 w-6" />,
    color: "from-orange-500 to-red-500",
    topics: [
      {
        title: "OWASP Top 10",
        duration: "Week 10",
        description: "Common web vulnerabilities, SQL injection, XSS"
      },
      {
        title: "Web Application Testing",
        duration: "Week 11",
        description: "Manual testing, automated tools, security assessment"
      },
      {
        title: "Secure Development",
        duration: "Week 12",
        description: "Secure coding practices, code review, mitigation"
      }
    ]
  }
];

const projects = [
  {
    title: "Network Vulnerability Assessment",
    description: "Complete network security audit and vulnerability assessment",
    tech: ["Nmap", "Nessus", "Wireshark", "Network Analysis"]
  },
  {
    title: "Web Application Penetration Test",
    description: "Full web app pentest including OWASP Top 10 vulnerabilities",
    tech: ["Burp Suite", "OWASP ZAP", "SQL Injection", "XSS"]
  },
  {
    title: "Malware Analysis Lab",
    description: "Safe malware analysis and reverse engineering exercise",
    tech: ["Virtual Machines", "Reverse Engineering", "Static Analysis"]
  },
  {
    title: "Incident Response Simulation",
    description: "Hands-on incident response and digital forensics",
    tech: ["Forensic Tools", "Log Analysis", "Incident Response"]
  }
];

export function CyberSecurity() {
  const handleBuyNow = () => {
    alert('Redirecting to payment gateway...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl mb-6">
                <ShieldCheckIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Cybersecurity &
                <span className="block text-3xl md:text-4xl bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Ethical Hacking
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Learn ethical hacking, penetration testing, and cybersecurity fundamentals. 
                Protect systems and launch your career in cybersecurity.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-6 py-3 rounded-full font-bold text-xl">
                  Special Offer: ₹399 Only
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
                  2-3 Months • Beginner to Advanced
                </div>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
              >
                🚀 Buy Now - ₹399
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Cybersecurity Curriculum
            </h2>
          </div>

          <div className="space-y-8">
            {modules.map((module, moduleIndex) => (
              <motion.div
                key={moduleIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: moduleIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${module.color} p-6`}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      {module.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{module.category}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {module.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{topic.title}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{topic.duration}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{topic.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hands-On Security Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Become a Cybersecurity Expert?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Master ethical hacking and cybersecurity to protect organizations from cyber threats.
          </p>
          <button
            onClick={handleBuyNow}
            className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            🚀 Enroll Now - ₹399
          </button>
        </div>
      </section>
    </div>
  );
}
