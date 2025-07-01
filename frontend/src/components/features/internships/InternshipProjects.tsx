import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "../../ui/card";
import {
  Globe,
  Smartphone,
  Brain,
  Code,
  BarChart2,
  Shield,
  Database,
  Palette,
} from "lucide-react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import AccessCodeModal from "../../ui/access-code-modal";
import SecureYouTubeEmbed from "../../ui/secure-youtube-embed";
import ProjectImageDisplay from "../../ui/project-image-display";

interface Project {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  resources?: string[];
  requiredModules?: string[];
  type: "mini" | "major";
}

interface DomainProject {
  domain: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient?: string;
  projects: Project[];
}

const InternshipProjects: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { domainSlug } = useParams<{ domainSlug?: string }>();

  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [projectType, setProjectType] = useState<"mini" | "major">("mini");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDomain, setCurrentDomain] = useState<string>("");
  const [currentDomainTitle, setCurrentDomainTitle] = useState<string>("");

  // Domain-specific access codes
  const accessCodes: Record<string, string> = {
    web: "Web7236",
    python: "Py7236",
    c: "c7236",
    cpp: "c++7236",
    java: "java7236",
    javascript: "js7236",
    react: "react7236",
    android: "App7236",
    ai: "Ai7236",
    uiux: "Ui7236",
    datascience: "Data7236",
    cybersecurity: "Cyber7236",
    major: "major7236",
  };

  // Effect to set selected domain based on URL parameter
  useEffect(() => {
    if (domainSlug) {
      // Convert URL slug to domain id (e.g., "python-programming" to "python")
      const domain = domainSlug.split("-")[0];
      setSelectedDomain(domain);

      // Check for tab query parameter
      const searchParams = new URLSearchParams(location.search);
      const tabParam = searchParams.get("tab");
      if (tabParam === "mini" || tabParam === "major") {
        setProjectType(tabParam);
      } else {
        setProjectType("mini"); // Default to mini if no valid tab parameter
      }
    } else {
      setSelectedDomain(null);
    }
  }, [domainSlug, location.search]);

  const domainProjects: DomainProject[] = [
    {
      domain: "web",
      title: "Web Development",
      description:
        "Master frontend, backend, or full-stack development using industry-standard technologies.",
      icon: <Globe size={40} />,
      color: "blue",
      gradient: "from-blue-500 to-cyan-400",
      projects: [
        {
          id: 1,
          title: "Create an Impressive Real Estate Website",
          description:
            "Follow this step-by-step tutorial to build a professional real estate website with property listings, search functionality, and contact forms. Learn modern design techniques and responsive layouts that will impress potential clients and showcase properties effectively.",
          videoUrl: "bKjpNrbMyvc",
          requiredModules: ["HTML5", "CSS3", "JavaScript"],
          type: "mini",
        },
        {
          id: 2,
          title: "Build a Personal Portfolio Website",
          description:
            "Create a stunning portfolio website that will help you stand out to employers. This tutorial guides you through designing an attractive layout, showcasing your projects professionally, and implementing smooth animations that capture attention and demonstrate your front-end skills.",
          videoUrl: "jOHlyy2cUzs",
          requiredModules: ["HTML5", "CSS3", "JavaScript"],
          type: "mini",
        },
        {
          id: 3,
          title: "Build a Travel Website From Scratch",
          description:
            "Develop an engaging travel website with beautiful destination galleries, booking features, and interactive maps. Learn to create immersive user experiences that inspire wanderlust and convert visitors into travelers through effective design and functionality.",
          videoUrl: "VA8cgdMpNf4",
          requiredModules: ["HTML5", "CSS3", "JavaScript"],
          type: "mini",
        },
        {
          id: 4,
          title: "Build a Real World Website",
          description:
            "Master professional web development by creating a multi-page business website with responsive design, contact forms, and service showcases. This practical tutorial demonstrates industry-standard techniques used by professional developers in commercial projects.",
          videoUrl: "GohJZd9Tu2Y",
          requiredModules: ["HTML5", "CSS3", "JavaScript"],
          type: "mini",
        },
        {
          id: 5,
          title: "Build A Delicious Fast Food Website",
          description:
            "Create a mouth-watering fast food restaurant website with interactive menu displays, online ordering capabilities, and appetizing food galleries. Learn how to use design elements that stimulate appetite and drive customer engagement through effective visual presentation.",
          videoUrl: "2F0PQEN1254",
          requiredModules: ["HTML5", "CSS3", "JavaScript"],
          type: "mini",
        },
        {
          id: 6,
          title: "How to Make Most Beautiful eCommerce Website",
          description:
            "Build a complete, visually stunning eCommerce platform with product listings, shopping cart functionality, checkout process, and payment integration. This comprehensive tutorial covers advanced techniques for creating a professional online store that converts visitors into customers.",
          videoUrl: "dZV-y3GzBlg",
          requiredModules: ["HTML5", "CSS3", "JavaScript", "API Integration"],
          type: "major",
        },
      ],
    },
    {
      domain: "python",
      title: "Python Programming",
      description:
        "Learn Python programming with practical projects and applications.",
      icon: <Code size={40} />,
      color: "green",
      gradient: "from-green-500 to-emerald-400",
      projects: [
        {
          id: 1,
          title: "Create A Calculator Using Tkinter In Python",
          description:
            "Master GUI development in Python by building a fully functional calculator with a professional interface. This tutorial walks you through creating buttons, implementing mathematical operations, and designing an intuitive layout that handles user input effectively.",
          videoUrl: "6CZB6VTy3Hg",
          requiredModules: ["Tkinter (built-in Python library)"],
          type: "mini",
        },
        {
          id: 2,
          title: "Build a Weather App in Python Using Weather API",
          description:
            "Develop a dynamic weather application that provides real-time forecasts, temperature data, and weather conditions for any location worldwide. Learn API integration, data parsing, and how to create an attractive interface that displays weather information clearly and beautifully.",
          videoUrl: "NCCYWIzN6hU",
          resources: [
            "Weather API: https://openweathermap.org/",
            "Download images: https://drive.google.com/drive/folders/12DxWZq1F9ynC5m8JHIpMzBQq7wvmSXCs",
          ],
          requiredModules: ["pytz", "geopy", "timezonefinder"],
          type: "mini",
        },
        {
          id: 3,
          title: "How to Create a Spelling Checker App Using Python",
          description:
            "Build an intelligent spelling correction tool that identifies and suggests fixes for misspelled words in documents and text inputs. This tutorial demonstrates natural language processing techniques and how to implement efficient text analysis algorithms in Python.",
          videoUrl: "u03Jeez3690",
          type: "mini",
        },
        {
          id: 4,
          title: "How to Create Internet Speedtest App Using Python",
          description:
            "Create a professional internet speed testing application that measures download and upload speeds, ping, and jitter with graphical results. Learn network programming concepts and how to present technical data in user-friendly visualizations that anyone can understand.",
          videoUrl: "duNlmdYXXVE",
          requiredModules: ["speedtest-cli"],
          type: "mini",
        },
        {
          id: 5,
          title: "How to Make Bill Management System in Python",
          description:
            "Develop a comprehensive billing system with invoice generation, payment tracking, and financial reporting capabilities. This project teaches database management, GUI development, and business logic implementation that can be adapted for real-world business applications.",
          videoUrl: "-yoQkUngES0",
          type: "mini",
        },
        {
          id: 6,
          title: "Book Recommender System Project | Python Application",
          description:
            "Build a sophisticated recommendation engine that analyzes reading patterns and suggests personalized book recommendations using machine learning algorithms. This advanced project covers data processing, collaborative filtering techniques, and creating an intuitive interface for discovering new books.",
          videoUrl: "Nq4L7cHJU4A",
          requiredModules: ["pillow==10.3.0", "requests==2.32.2"],
          type: "major",
        },
      ],
    },
    {
      domain: "c",
      title: "C Programming",
      description:
        "Master C programming fundamentals and build practical applications.",
      icon: <Code size={40} />,
      color: "purple",
      gradient: "from-purple-500 to-indigo-400",
      projects: [
        {
          id: 1,
          title: "Quiz Game Using C Programming",
          description:
            "Develop an engaging quiz application with multiple-choice questions, timer functionality, and score tracking. This tutorial demonstrates fundamental C programming concepts including arrays, structures, and file handling while creating an interactive game that can be customized with your own questions.",
          videoUrl: "N2BwLm3mTAE",
          requiredModules: ["C Standard Library"],
          type: "mini",
        },
        {
          id: 2,
          title: "Modern Periodic Table Using C",
          description:
            "Create an interactive periodic table application that provides detailed information about chemical elements, their properties, and uses. Learn how to organize and display complex scientific data through effective programming techniques and user-friendly interfaces.",
          videoUrl: "-B8-ZBTX7Og",
          requiredModules: ["C Standard Library"],
          type: "mini",
        },
        {
          id: 3,
          title: "Phone Book By C",
          description:
            "Build a comprehensive contact management system with features for adding, searching, editing, and deleting contacts. This project teaches important concepts in data structures, file operations, and creating maintainable code that handles real-world information management tasks.",
          videoUrl: "vUJBxhtnHYk",
          requiredModules: ["C Standard Library"],
          type: "mini",
        },
        {
          id: 4,
          title: "Billing System Using C",
          description:
            "Develop a professional billing system that generates invoices, calculates taxes, applies discounts, and maintains transaction records. This practical project demonstrates how to implement business logic and financial calculations in a console-based application.",
          videoUrl: "5mRkXcSprxs",
          requiredModules: ["C Standard Library"],
          type: "mini",
        },
        {
          id: 5,
          title: "Casino Game Using C",
          description:
            "Create an exciting casino game with betting mechanics, random number generation, and win/loss tracking. Learn how to implement game logic, manage virtual currency, and create an entertaining user experience using only the C standard library.",
          videoUrl: "PDIyEZfC1wE",
          requiredModules: ["C Standard Library"],
          type: "mini",
        },
        {
          id: 6,
          title: "ATM Machine Using C",
          description:
            "Build a realistic ATM system simulation with account management, secure transactions, balance inquiries, and fund transfers. This major project demonstrates advanced concepts in security, data validation, and creating robust financial applications with proper error handling.",
          videoUrl: "ticwl0hSgpM",
          requiredModules: ["C Standard Library"],
          type: "major",
        },
        {
          id: 7,
          title: "Library Management Using C",
          description:
            "Develop a complete library management system with features for cataloging books, managing borrowers, tracking loans, and generating reports. This comprehensive project teaches database concepts, search algorithms, and creating maintainable systems for information management.",
          videoUrl: "7WOtTStiuFE",
          requiredModules: ["C Standard Library"],
          type: "major",
        },
      ],
    },
    {
      domain: "cpp",
      title: "C++ Programming",
      description:
        "Learn object-oriented programming with C++ and build robust applications.",
      icon: <Code size={40} />,
      color: "orange",
      gradient: "from-orange-500 to-amber-400",
      projects: [
        {
          id: 1,
          title: "Cafeteria Order Management using OOPS",
          description:
            "Develop a complete cafeteria management system that handles orders, inventory, and billing using object-oriented programming principles. This project demonstrates class hierarchies, inheritance, and encapsulation while creating a practical application for food service businesses.",
          videoUrl: "DPBAZIffot4",
          requiredModules: ["C++ Standard Library"],
          type: "mini",
        },
        {
          id: 2,
          title: "Traffic Control Management System in C++",
          description:
            "Build an intelligent traffic management simulation that models vehicle flow, signal timing, and congestion control. Learn how to implement complex systems using object-oriented design patterns and create visual representations of traffic scenarios.",
          videoUrl: "LWJQk4Ib5dI",
          requiredModules: ["C++ Standard Library"],
          type: "mini",
        },
        {
          id: 3,
          title: "Telecom Billing System using OOP",
          description:
            "Create a sophisticated telecom billing application that calculates charges, generates invoices, and manages customer accounts. This project teaches database integration, rate calculation algorithms, and building maintainable software using OOP principles.",
          videoUrl: "N-K6FLd6xoo",
          requiredModules: ["C++ Standard Library"],
          type: "mini",
        },
        {
          id: 4,
          title: "Airlines Reservation System using OOP",
          description:
            "Develop a comprehensive flight booking system with seat selection, passenger management, and ticket generation. Learn to implement complex business rules, data validation, and create an intuitive interface for managing travel reservations.",
          videoUrl: "R6YgHJQg_Qw",
          requiredModules: ["C++ Standard Library"],
          type: "mini",
        },
        {
          id: 5,
          title: "College Management System using OOPS",
          description:
            "Build a feature-rich educational management system that handles student records, faculty information, course scheduling, and grade tracking. This project demonstrates database design, user authentication, and creating modular, maintainable code using object-oriented techniques.",
          videoUrl: "RaUyb9M2IUI",
          requiredModules: ["C++ Standard Library"],
          type: "mini",
        },
        {
          id: 6,
          title: "Super Market Billing System With File Handling & OOP in C++",
          description:
            "Create a professional supermarket billing and inventory management system with barcode scanning, product database, and sales analytics. This comprehensive project demonstrates file handling for data persistence, report generation, and implementing a complete business solution using object-oriented design.",
          videoUrl: "9ErnYksU8FQ",
          requiredModules: ["C++ Standard Library", "File Handling"],
          type: "major",
        },
        {
          id: 7,
          title:
            "Bank Account Management System With File Handling & OOP in C++",
          description:
            "Develop a secure banking application with account creation, transaction processing, interest calculation, and statement generation. Learn to implement financial security measures, data validation, and create a robust system that maintains data integrity through proper file handling techniques.",
          videoUrl: "eHj8UsItFBQ",
          requiredModules: ["C++ Standard Library", "File Handling"],
          type: "major",
        },
        {
          id: 8,
          title: "Movie Ticket Booking System in C++",
          description:
            "Build an interactive cinema ticket reservation system with real-time seat selection, multiple screening management, and payment processing. This project teaches concurrent booking handling, user interface design, and implementing business rules for a commercial entertainment application.",
          videoUrl: "Yb6PQ2D8cHY",
          requiredModules: ["C++ Standard Library"],
          type: "major",
        },
        {
          id: 9,
          title: "Library Management System in C++",
          description:
            "Create a comprehensive library automation system with book cataloging, member management, borrowing workflows, and overdue tracking. This advanced project demonstrates database design principles, search algorithms, and building a complete information management system with proper data relationships.",
          videoUrl: "hirbpkfiWWE",
          requiredModules: ["C++ Standard Library", "File Handling"],
          type: "major",
        },
        {
          id: 10,
          title: "Car Rental System in C++ With MySQL",
          description:
            "Develop a full-featured vehicle rental management system with reservation handling, fleet management, billing, and customer profiles using database integration. Learn advanced C++ techniques combined with SQL database operations to create a scalable, enterprise-level application with reporting capabilities.",
          videoUrl: "fdWRjI2tNSk",
          requiredModules: [
            "C++ Standard Library",
            "MySQL",
            "Database Connectivity",
          ],
          type: "major",
        },
      ],
    },
    {
      domain: "java",
      title: "Java Programming",
      description:
        "Master Java programming and build cross-platform applications.",
      icon: <Code size={40} />,
      color: "blue",
      gradient: "from-blue-600 to-sky-400",
      projects: [
        {
          id: 1,
          title: "Build a Library Management System in Java",
          description:
            "Create a complete library management system with database integration using Java.",
          videoUrl: "6CZB6VTy3Hg",
          requiredModules: ["Java SE", "JDBC", "MySQL"],
          type: "mini",
        },
      ],
    },
    {
      domain: "javascript",
      title: "JavaScript Programming",
      description:
        "Learn modern JavaScript and build interactive web applications.",
      icon: <Code size={40} />,
      color: "green",
      gradient: "from-teal-500 to-green-400",
      projects: [
        {
          id: 1,
          title: "Build a Weather Dashboard with JavaScript",
          description:
            "Create an interactive weather dashboard using JavaScript and APIs.",
          videoUrl: "6CZB6VTy3Hg",
          requiredModules: ["JavaScript", "HTML", "CSS", "Weather API"],
          type: "mini",
        },
      ],
    },
    {
      domain: "cybersecurity",
      title: "Cyber Security",
      description:
        "Master cybersecurity concepts and build practical security tools and applications.",
      icon: <Shield size={40} />,
      color: "red",
      gradient: "from-red-500 to-rose-400",
      projects: [
        {
          id: 1,
          title: "Password Strength Analyzer",
          description:
            "Develop a tool that assesses the robustness of passwords by evaluating factors such as length, character diversity, and absence of easily guessable patterns. The tool simulates brute-force attacks to test password resistance to cracking methods, providing users with quantitative measures of password strength.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/bohdan-git1/password-strenth-metor",
          ],
          requiredModules: ["Python", "hashlib", "re"],
          type: "mini",
        },
        {
          id: 2,
          title: "File Integrity Checker",
          description:
            "Create a crucial tool for verifying the accuracy and reliability of data or files by comparing their current state with a previously established baseline or known good values (hash values or checksums). This tool alerts users to potential security breaches by detecting unauthorized modifications or corruption.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/marisafromthere/OS_Project",
          ],
          requiredModules: ["Python", "hashlib", "os"],
          type: "mini",
        },
        {
          id: 3,
          title: "Caesar Cipher Encryption/Decryption",
          description:
            "Implement a program for Caesar cipher encryption and decryption that encodes messages by shifting each letter forward in the alphabet and decodes them by shifting each letter backwards. This project demonstrates fundamental concepts in cryptography and basic encryption principles.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cliffordebayan/Caesar-Cipher",
          ],
          requiredModules: ["Python", "string"],
          type: "mini",
        },
        {
          id: 4,
          title: "Simple Malware Scanner Using Yara",
          description:
            "Build a basic malware detection tool using Yara rules to identify potentially malicious patterns in files. Learn how to create and implement detection rules while gaining insights into malware analysis techniques.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/malware-scanner",
          ],
          requiredModules: ["Python", "yara-python", "os"],
          type: "mini",
        },
        {
          id: 5,
          title: "Network Traffic Analyzer",
          description:
            "Create a tool that captures and analyzes network packets to identify protocols, extract metadata, and visualize traffic patterns. This project teaches network protocol analysis, packet inspection, and traffic visualization techniques essential for network security monitoring.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/network-analyzer",
          ],
          requiredModules: ["Python", "scapy", "matplotlib"],
          type: "mini",
        },
        {
          id: 6,
          title: "Port Scanner",
          description:
            "Develop a tool that scans network ports to identify open services and potential vulnerabilities. This project teaches network reconnaissance techniques, socket programming, and service identification methods used in security assessments.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/port-scanner",
          ],
          requiredModules: ["Python", "socket", "threading"],
          type: "mini",
        },
        {
          id: 7,
          title: "Steganography Tool",
          description:
            "Build an application that can hide secret messages within image files without visibly altering their appearance. This project demonstrates data hiding techniques, binary manipulation, and covert communication methods used in information security.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/steganography-tool",
          ],
          requiredModules: ["Python", "Pillow", "numpy"],
          type: "mini",
        },
        {
          id: 8,
          title: "Secure Password Manager",
          description:
            "Create a local password manager that securely stores and encrypts user credentials. This project teaches encryption implementation, secure storage practices, and user authentication techniques essential for protecting sensitive information.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/password-manager",
          ],
          requiredModules: ["Python", "cryptography", "tkinter"],
          type: "mini",
        },
        {
          id: 9,
          title: "Keylogger Detection Tool",
          description:
            "Develop a security tool that can detect potential keyloggers running on a system by monitoring process behaviors and file system activities. This project teaches malware detection techniques, system monitoring, and threat identification methods.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/keylogger-detector",
          ],
          requiredModules: ["Python", "psutil", "win32api"],
          type: "mini",
        },
        {
          id: 10,
          title: "DNS Spoofing Detection",
          description:
            "Build a tool that monitors DNS responses to detect potential spoofing attacks that redirect users to malicious websites. This project teaches network monitoring, DNS protocol analysis, and attack detection techniques used in network security.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/dns-spoof-detector",
          ],
          requiredModules: ["Python", "scapy", "dnspython"],
          type: "mini",
        },
        {
          id: 11,
          title: "ARP Poisoning Detector",
          description:
            "Create a tool that monitors ARP traffic to detect potential man-in-the-middle attacks through ARP spoofing. This project teaches network security monitoring, protocol analysis, and attack detection techniques used in protecting local networks.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/arp-poison-detector",
          ],
          requiredModules: ["Python", "scapy", "netifaces"],
          type: "mini",
        },
        {
          id: 12,
          title: "Web Application Firewall",
          description:
            "Develop a basic web application firewall that can detect and block common web attacks such as SQL injection and XSS. This project teaches web security concepts, attack pattern recognition, and defensive programming techniques used in protecting web applications.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/simple-waf",
          ],
          requiredModules: ["Python", "Flask", "re"],
          type: "mini",
        },
        {
          id: 13,
          title: "Secure File Encryption Tool",
          description:
            "Build a tool that encrypts and decrypts files using strong cryptographic algorithms to protect sensitive data. This project teaches encryption implementation, key management, and secure data handling practices essential for data protection.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/file-encryption",
          ],
          requiredModules: ["Python", "cryptography", "tkinter"],
          type: "mini",
        },
        {
          id: 14,
          title: "Two-Factor Authentication System",
          description:
            "Create a two-factor authentication system that generates and validates time-based one-time passwords (TOTP) for secure login. This project teaches multi-factor authentication implementation, secure token generation, and user verification techniques.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/2fa-system",
          ],
          requiredModules: ["Python", "pyotp", "qrcode", "Flask"],
          type: "mini",
        },
        {
          id: 15,
          title: "Security Log Analyzer",
          description:
            "Develop a tool that parses and analyzes system logs to identify potential security incidents and anomalies. This project teaches log analysis techniques, pattern recognition, and security monitoring practices used in threat detection.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/log-analyzer",
          ],
          requiredModules: ["Python", "pandas", "matplotlib", "re"],
          type: "mini",
        },
        {
          id: 16,
          title: "Phishing Email Detector",
          description:
            "Build a tool that analyzes email content and headers to identify potential phishing attempts. This project teaches email security analysis, threat detection, and machine learning techniques used in identifying social engineering attacks.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/phishing-detector",
          ],
          requiredModules: ["Python", "scikit-learn", "nltk", "pandas"],
          type: "mini",
        },
        {
          id: 17,
          title: "Wireless Network Security Scanner",
          description:
            "Create a tool that scans and analyzes wireless networks to identify security vulnerabilities and unauthorized access points. This project teaches wireless security concepts, network scanning, and vulnerability assessment techniques.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/wifi-scanner",
          ],
          requiredModules: ["Python", "scapy", "wireless"],
          type: "mini",
        },
        {
          id: 18,
          title: "System Security Auditor",
          description:
            "Develop a tool that performs security audits of system configurations to identify potential vulnerabilities and misconfigurations. This project teaches system hardening principles, security benchmarking, and vulnerability assessment techniques.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/security-auditor",
          ],
          requiredModules: ["Python", "psutil", "paramiko"],
          type: "mini",
        },
        {
          id: 19,
          title: "Secure Coding Analyzer",
          description:
            "Build a tool that analyzes source code to identify potential security vulnerabilities and coding best practice violations. This project teaches secure coding standards, static code analysis, and vulnerability identification techniques.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/code-analyzer",
          ],
          requiredModules: ["Python", "ast", "re"],
          type: "mini",
        },
        {
          id: 20,
          title: "Digital Forensics Toolkit",
          description:
            "Create a suite of tools for digital forensics investigations, including file recovery, metadata analysis, and timeline reconstruction. This project teaches forensic investigation techniques, data recovery, and evidence handling practices.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/forensics-toolkit",
          ],
          requiredModules: ["Python", "exiftool", "pytsk3", "pyewf"],
          type: "mini",
        },
        {
          id: 21,
          title:
            "Comprehensive Security Information and Event Management (SIEM) System",
          description:
            "Develop an enterprise-grade SIEM system that collects, analyzes, and correlates security events from multiple sources to detect complex threats and coordinate incident response. This major project demonstrates implementing advanced security monitoring architecture, threat intelligence integration, and creating dashboards for security operations centers.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/enterprise-siem",
          ],
          requiredModules: [
            "Python",
            "Elasticsearch",
            "Kafka",
            "React",
            "Node.js",
          ],
          type: "major",
        },
        {
          id: 22,
          title: "Advanced Intrusion Detection and Prevention System",
          description:
            "Build a sophisticated network security system that combines signature-based and anomaly-based detection to identify and block malicious traffic in real-time. This comprehensive project teaches network security architecture, traffic analysis algorithms, and implementing enterprise-level protection systems with minimal false positives.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/advanced-ids",
          ],
          requiredModules: [
            "Python",
            "Scapy",
            "TensorFlow",
            "Redis",
            "PostgreSQL",
          ],
          type: "major",
        },
        {
          id: 23,
          title:
            "Security Orchestration, Automation and Response (SOAR) Platform",
          description:
            "Create a comprehensive security automation platform that orchestrates incident response workflows across multiple security tools and systems. This major project demonstrates implementing automated security playbooks, integration with diverse security tools, and building systems that accelerate incident response through automation.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/soar-platform",
          ],
          requiredModules: ["Python", "Django", "Celery", "React", "Docker"],
          type: "major",
        },
        {
          id: 24,
          title: "Threat Hunting Platform",
          description:
            "Develop an advanced security platform that proactively searches through networks and datasets to identify threats that have evaded existing security solutions. This major project teaches threat intelligence concepts, advanced detection techniques, and implementing systems that support proactive security operations.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/threat-hunting",
          ],
          requiredModules: [
            "Python",
            "Elasticsearch",
            "Spark",
            "Jupyter",
            "React",
          ],
          type: "major",
        },
        {
          id: 25,
          title: "Zero Trust Security Framework",
          description:
            "Build a comprehensive security architecture that implements the zero trust principle of 'never trust, always verify' across all network resources and services. This major project demonstrates implementing modern access control systems, continuous authentication, and creating security frameworks that protect organizations in distributed environments.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/zero-trust",
          ],
          requiredModules: ["Python", "Node.js", "OAuth", "SAML", "Kubernetes"],
          type: "major",
        },
        {
          id: 26,
          title: "Cloud Security Posture Management System",
          description:
            "Create a platform that continuously monitors cloud environments for misconfigurations, compliance violations, and security risks across multiple cloud providers. This major project teaches cloud security principles, compliance frameworks, and implementing tools that secure complex cloud infrastructures.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/cloud-security",
          ],
          requiredModules: [
            "Python",
            "Terraform",
            "AWS SDK",
            "Azure SDK",
            "React",
          ],
          type: "major",
        },
        {
          id: 27,
          title: "Advanced Malware Analysis Platform",
          description:
            "Develop a sophisticated malware analysis environment that combines static, dynamic, and behavioral analysis techniques to thoroughly dissect and understand malicious software. This major project demonstrates implementing secure sandboxing, reverse engineering tools, and creating comprehensive malware intelligence systems.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/malware-platform",
          ],
          requiredModules: [
            "Python",
            "YARA",
            "Cuckoo Sandbox",
            "Radare2",
            "Docker",
          ],
          type: "major",
        },
        {
          id: 28,
          title: "Security Data Lake and Analytics Platform",
          description:
            "Build an enterprise security analytics platform that ingests, processes, and analyzes massive volumes of security data to enable advanced threat detection and investigation. This major project teaches big data security analytics, data lake architecture, and implementing systems that derive security insights from diverse data sources.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/security-datalake",
          ],
          requiredModules: [
            "Python",
            "Spark",
            "Hadoop",
            "Elasticsearch",
            "Tableau",
          ],
          type: "major",
        },
        {
          id: 29,
          title: "DevSecOps Pipeline Implementation",
          description:
            "Create a comprehensive CI/CD pipeline that integrates security at every stage of the software development lifecycle, from code commit to production deployment. This major project demonstrates implementing security automation in development workflows, vulnerability scanning integration, and creating systems that enable secure, rapid software delivery.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/devsecops",
          ],
          requiredModules: [
            "Python",
            "Jenkins",
            "Docker",
            "Kubernetes",
            "OWASP Tools",
          ],
          type: "major",
        },
        {
          id: 30,
          title: "Cyber Range and Attack Simulation Platform",
          description:
            "Develop an advanced training environment that simulates realistic cyber attacks and defense scenarios for security education and team exercises. This major project teaches offensive and defensive security techniques, infrastructure automation, and implementing platforms that enhance security team capabilities through practical training.",
          videoUrl: "",
          resources: [
            "Source Code: https://github.com/cybersecurity-projects/cyber-range",
          ],
          requiredModules: [
            "Python",
            "Ansible",
            "Terraform",
            "Docker",
            "Kubernetes",
          ],
          type: "major",
        },
      ],
    },
    {
      domain: "react",
      title: "React Development",
      description:
        "Master React.js and build modern, responsive user interfaces.",
      icon: <Code size={40} />,
      color: "purple",
      gradient: "from-violet-500 to-purple-400",
      projects: [
        {
          id: 1,
          title: "Build an E-commerce Dashboard with React",
          description:
            "Create a complete e-commerce admin dashboard using React and Material UI.",
          videoUrl: "6CZB6VTy3Hg",
          requiredModules: ["React", "Material UI", "React Router"],
          type: "mini",
        },
      ],
    },
    {
      domain: "android",
      title: "Android Development",
      description:
        "Build powerful Android applications using modern development tools.",
      icon: <Smartphone size={40} />,
      color: "orange",
      gradient: "from-amber-500 to-yellow-400",
      projects: [
        {
          id: 1,
          title: "Online Grocery Store App",
          description:
            "Build a feature-rich grocery shopping application with product categories, search functionality, shopping cart, and checkout process. This tutorial guides you through creating a modern UI with RecyclerViews, implementing user authentication, and connecting to a backend database for product management.",
          videoUrl: "SLTUBf5FaCA",
          resources: ["Project Source code: https://github.com/thecodenest"],
          requiredModules: ["Android Studio", "Java/Kotlin", "Firebase"],
          type: "mini",
        },
        {
          id: 2,
          title: "Nursery Store Android App",
          description:
            "Create an elegant plant store application with beautiful product displays, detailed plant information, search functionality, and secure purchasing. Learn to implement custom UI components, image handling, and database integration for a specialized e-commerce experience.",
          videoUrl: "Qfna00ewI7g",
          resources: [
            "Project Source code: https://github.com/thecodenest/PlantStore",
          ],
          requiredModules: ["Android Studio", "Java/Kotlin", "Firebase"],
          type: "mini",
        },
        {
          id: 3,
          title: "Online Learning Android App",
          description:
            "Develop a comprehensive educational platform with course catalogs, video lessons, quizzes, and progress tracking. This project demonstrates implementing media playback, user engagement features, and creating an intuitive learning experience with proper navigation patterns.",
          videoUrl: "jzL_OME0Xag",
          resources: [
            "Project source code: https://github.com/thecodenest/CourseApp",
          ],
          requiredModules: ["Android Studio", "Java/Kotlin", "Firebase"],
          type: "mini",
        },
        {
          id: 4,
          title: "Food Ordering Android App",
          description:
            "Build a sleek food delivery application with restaurant discovery, menu browsing, order customization, and real-time delivery tracking. Learn to implement location services, payment integration, and creating an engaging food ordering experience with modern Android development practices.",
          videoUrl: "iF9PYjn3Gvg",
          resources: [
            "Project source code: https://github.com/thecodenest/FoodApp",
          ],
          requiredModules: ["Android Studio", "Java/Kotlin", "Firebase"],
          type: "mini",
        },
        {
          id: 5,
          title: "E-Commerce Shopping Android App",
          description:
            "Create a professional e-commerce platform with product categories, filtering options, user profiles, wishlist functionality, and secure checkout process. This tutorial covers implementing complex UI patterns, state management, and creating a complete shopping experience from browsing to purchase.",
          videoUrl: "uCORvQL1OPA",
          resources: ["Project source code: https://youtu.be/uCORvQL1OPA"],
          requiredModules: ["Android Studio", "Java/Kotlin", "Firebase"],
          type: "mini",
        },
        {
          id: 6,
          title: "Restaurant Food Delivery Android App",
          description:
            "Develop an advanced restaurant delivery system with multi-restaurant support, real-time order tracking, driver assignment, and secure payment processing. This major project demonstrates implementing complex workflows, push notifications, maps integration, and creating a commercial-grade application with professional features.",
          videoUrl: "oBmlKMVX070",
          resources: [
            "Project source code: https://www.dropbox.com/s/d2h0g1cnch9",
          ],
          requiredModules: [
            "Android Studio",
            "Java/Kotlin",
            "Firebase",
            "Payment Gateway Integration",
          ],
          type: "major",
        },
      ],
    },
    {
      domain: "ai",
      title: "AI & ML",
      description:
        "Explore artificial intelligence and machine learning with practical projects.",
      icon: <Brain size={40} />,
      color: "blue",
      gradient: "from-cyan-500 to-blue-400",
      projects: [
        {
          id: 1,
          title: "Build an Image Classification Model",
          description:
            "Create an image classification model using TensorFlow and Python.",
          videoUrl: "6CZB6VTy3Hg",
          requiredModules: ["Python", "TensorFlow", "NumPy", "Matplotlib"],
          type: "mini",
        },
      ],
    },
    {
      domain: "uiux",
      title: "UI & UX",
      description:
        "Design intuitive and engaging user experiences with modern design tools.",
      icon: <Palette size={40} />,
      color: "green",
      gradient: "from-lime-500 to-green-400",
      projects: [
        {
          id: 1,
          title: "Design a Mobile App UI in Figma",
          description:
            "Create a complete mobile app user interface design using Figma.",
          videoUrl: "6CZB6VTy3Hg",
          requiredModules: ["Figma"],
          type: "mini",
        },
      ],
    },
    {
      domain: "datascience",
      title: "Data Science & Analytics",
      description:
        "Master data analysis, visualization, and machine learning with practical projects.",
      icon: <BarChart2 size={40} />,
      color: "blue",
      gradient: "from-blue-500 to-indigo-400",
      projects: [
        {
          id: 1,
          title:
            "Building a Credit Card Approval Predictor with Machine Learning",
          description:
            "Develop a machine learning model that predicts credit card approval decisions. Learn data preprocessing, feature engineering, and model training techniques to create a system that can automatically assess credit applications based on various applicant attributes.",
          videoUrl: "KZqP25FX8w8",
          requiredModules: ["Python", "Pandas", "Scikit-learn", "NumPy"],
          type: "mini",
        },
        {
          id: 2,
          title: "Predict House Prices with Machine Learning",
          description:
            "Build a regression model that accurately predicts housing prices based on various features. This beginner-friendly project teaches fundamental machine learning concepts, data cleaning, and model evaluation techniques using real-world housing data.",
          videoUrl: "Fw6cwl1KeqA",
          requiredModules: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
          type: "mini",
        },
        {
          id: 3,
          title:
            "Exploratory Data Analysis with Python Pandas - Volleyball Dataset",
          description:
            "Learn how to perform comprehensive exploratory data analysis on a volleyball dataset. Master data cleaning, visualization, and statistical analysis techniques to extract meaningful insights and patterns from sports performance data.",
          videoUrl: "yfl84gqsPEw",
          requiredModules: ["Python", "Pandas", "Matplotlib", "Seaborn"],
          type: "mini",
        },
        {
          id: 4,
          title: "Python Exploratory Data Analysis (EDA) - Flights Dataset",
          description:
            "Analyze a complex flights dataset using Python, Pandas and Seaborn. Learn advanced data visualization techniques, statistical analysis, and how to identify patterns in large transportation datasets to derive actionable business insights.",
          videoUrl: "4LxD1Kt3788",
          requiredModules: ["Python", "Pandas", "Matplotlib", "Seaborn"],
          type: "mini",
        },
        {
          id: 5,
          title: "Python Data Analysis - Iris Dataset",
          description:
            "Explore the famous Iris dataset through comprehensive data analysis and visualization. This project teaches fundamental data science concepts, statistical methods, and classification techniques using one of the most widely-used datasets in machine learning.",
          videoUrl: "GmLvqzIAB-g",
          requiredModules: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
          type: "mini",
        },
        {
          id: 6,
          title:
            "Build a Restaurant Ratings Predictor: Python Data Science Project",
          description:
            "Develop a sophisticated machine learning model that predicts restaurant ratings based on various features. This comprehensive project covers the entire data science workflow from data collection and preprocessing to model development, evaluation, and deployment.",
          videoUrl: "SJ_3_RlgAlU",
          requiredModules: [
            "Python",
            "Pandas",
            "Scikit-learn",
            "NumPy",
            "Matplotlib",
            "Seaborn",
          ],
          type: "major",
        },
      ],
    },
    {
      domain: "major",
      title: "Major Projects",
      description:
        "Advanced projects that combine multiple technologies and skills.",
      icon: <Database size={40} />,
      color: "purple",
      gradient: "from-fuchsia-500 to-purple-400",
      projects: [],
    },
  ];

  // Function to get color class based on domain color and hover state
  const getColorClass = (
    color: string,
    gradient: string | undefined,
    isHovered: boolean,
  ) => {
    const baseClasses =
      "absolute inset-0 rounded-xl transition-all duration-300 z-0";

    if (gradient && isHovered) {
      return `${baseClasses} bg-gradient-to-r ${gradient} opacity-20`;
    }

    switch (color) {
      case "blue":
        return `${baseClasses} ${isHovered ? "bg-blue-100" : "bg-blue-50"}`;
      case "green":
        return `${baseClasses} ${isHovered ? "bg-green-100" : "bg-green-50"}`;
      case "purple":
        return `${baseClasses} ${isHovered ? "bg-purple-100" : "bg-purple-50"}`;
      case "orange":
        return `${baseClasses} ${isHovered ? "bg-orange-100" : "bg-orange-50"}`;
      default:
        return `${baseClasses} ${isHovered ? "bg-gray-100" : "bg-gray-50"}`;
    }
  };

  // Function to get icon color based on domain color and hover state
  const getIconColor = (
    color: string,
    gradient: string | undefined,
    isHovered: boolean,
  ) => {
    if (gradient && isHovered) {
      return "text-white";
    }

    switch (color) {
      case "blue":
        return "text-blue-500";
      case "green":
        return "text-green-500";
      case "purple":
        return "text-purple-500";
      case "orange":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  // Function to handle domain selection
  const handleDomainSelect = (domain: string) => {
    const domainProject = domainProjects.find((d) => d.domain === domain);
    if (domainProject) {
      setCurrentDomain(domain);
      setCurrentDomainTitle(domainProject.title);
      setIsModalOpen(true);
    }
  };

  // Function to handle access code submission
  const handleAccessCodeSubmit = (code: string) => {
    if (code === accessCodes[currentDomain]) {
      // Access granted, navigate to projects page
      const domainProject = domainProjects.find(
        (d) => d.domain === currentDomain,
      );
      if (domainProject) {
        const slug = `${currentDomain}-${domainProject.title.toLowerCase().replace(/\s+/g, "-")}`;
        navigate(`/internship-projects/${slug}?tab=mini`);
        setProjectType("mini"); // Reset to mini projects tab when selecting a new domain
        setIsModalOpen(false);
      }
    } else {
      // Access code is incorrect - modal will show error
      // Error handling is done in the modal component
      alert("Incorrect access code! Please enter the correct code.");
    }
  };

  // Function to go back to domain selection
  const handleBackToDomains = () => {
    navigate("/internship-projects");
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50" id="internship-projects">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-8">
        {/* Breadcrumb navigation */}
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="text-gray-500 hover:text-blue-600 inline-flex items-center text-sm font-medium"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link
                  to="/all-programs"
                  className="text-gray-500 hover:text-blue-600 ml-1 md:ml-2 text-sm font-medium"
                >
                  All Programs
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-gray-800 ml-1 md:ml-2 text-sm font-medium">
                  Internship Projects
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Access Code Modal */}
      <AccessCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAccessCodeSubmit}
        domain={currentDomain}
        domainTitle={currentDomainTitle}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            🚀 Internship Project Tutorials
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            View step-by-step tutorials of projects developed as part of our
            internship programs. Add these projects to your portfolio and
            enhance your skills.
          </p>
        </div>

        {selectedDomain === null ? (
          // Domain Selection View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000">
            {domainProjects.map((domain, index) => (
              <div
                key={domain.domain}
                className="relative p-6 rounded-xl shadow-md bg-white cursor-pointer transition-all duration-300 hover:shadow-xl z-10 group transform hover:-translate-y-1 hover:scale-[1.02]"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={getColorClass(
                    domain.color,
                    domain.gradient,
                    hoveredCard === index,
                  )}
                ></div>
                <div className="relative z-10">
                  <div
                    className={`${hoveredCard === index && domain.gradient ? "bg-gradient-to-r " + domain.gradient + " p-3 rounded-full inline-block shadow-lg transform -translate-y-1" : getIconColor(domain.color, domain.gradient, hoveredCard === index) + " transform transition-transform duration-300"} mb-4`}
                  >
                    {domain.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {domain.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{domain.description}</p>
                  <button
                    onClick={() => handleDomainSelect(domain.domain)}
                    className={`mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${hoveredCard === index && domain.gradient ? "bg-gradient-to-r " + domain.gradient + " text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                  >
                    Do Projects
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Projects View for Selected Domain
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={handleBackToDomains}
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to All Domains
              </button>
              <h3 className="text-2xl font-bold text-gray-900">
                {domainProjects.find((d) => d.domain === selectedDomain)?.title}{" "}
                Projects
              </h3>
            </div>

            <Tabs
              defaultValue={projectType}
              value={projectType}
              className="w-full mb-10"
            >
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-lg grid-cols-2 p-2.5 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-gray-200 shadow-lg gap-4">
                  <TabsTrigger
                    value="mini"
                    className={`${projectType === "mini" ? "data-[state=active]" : ""} text-base font-medium py-4 px-6 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3`}
                    onClick={() => {
                      setProjectType("mini");
                      // Update URL with tab type
                      if (selectedDomain) {
                        const domainProject = domainProjects.find(
                          (d) => d.domain === selectedDomain,
                        );
                        if (domainProject) {
                          const slug = `${selectedDomain}-${domainProject.title.toLowerCase().replace(/\s+/g, "-")}`;
                          navigate(`/internship-projects/${slug}?tab=mini`);
                        }
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Mini Projects</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="major"
                    className={`${projectType === "major" ? "data-[state=active]" : ""} text-base font-medium py-4 px-6 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-400 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-3`}
                    onClick={() => {
                      setProjectType("major");
                      // Update URL with tab type
                      if (selectedDomain) {
                        const domainProject = domainProjects.find(
                          (d) => d.domain === selectedDomain,
                        );
                        if (domainProject) {
                          const slug = `${selectedDomain}-${domainProject.title.toLowerCase().replace(/\s+/g, "-")}`;
                          navigate(`/internship-projects/${slug}?tab=major`);
                        }
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.25 16.25L17 19.75H7L4.75 16.25M4.75 7.75L7 4.25H17L19.25 7.75M5 16.25V7.75M19 16.25V7.75M9 9.75H10M9 14.25H10M14 9.75H15M14 14.25H15"
                      />
                    </svg>
                    <span>Major Projects</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="mini" className="mt-8">
                <div className="space-y-12">
                  {domainProjects
                    .find((d) => d.domain === selectedDomain)
                    ?.projects.filter((project) => project.type === "mini")
                    .map((project) => (
                      <Card
                        key={project.id}
                        className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 rounded-2xl transform hover:-translate-y-2 hover:scale-[1.01] group w-full max-w-4xl mx-auto"
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col">
                            {/* Use ProjectImageDisplay for cybersecurity domain, otherwise use SecureYouTubeEmbed */}
                            {selectedDomain === "cybersecurity" ? (
                              <ProjectImageDisplay
                                title={project.title}
                                domain={selectedDomain}
                              />
                            ) : (
                              <SecureYouTubeEmbed
                                videoUrl={project.videoUrl}
                                title={project.title}
                                resources={project.resources}
                              />
                            )}

                            {/* Project Details */}
                            <div className="p-6 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              {/* Title */}
                              <h3 className="text-2xl font-bold mb-3 text-gray-900 border-b pb-2 flex items-center relative z-10">
                                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3 shadow-sm group-hover:shadow-md transition-all duration-300">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                                {project.title}
                              </h3>

                              {/* Description */}
                              <p className="text-gray-700 mb-5 text-lg relative z-10">
                                {project.description}
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Resources Section */}
                                {project.resources &&
                                  project.resources.length > 0 && (
                                    <div className="mb-4 bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100 relative z-10">
                                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5 mr-2"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                        </svg>
                                        Resources:
                                      </h4>
                                      <ul className="list-disc pl-5 space-y-1">
                                        {project.resources.map(
                                          (resource, index) => (
                                            <li
                                              key={index}
                                              className="text-gray-700 hover:text-blue-600 transition-colors"
                                            >
                                              {resource}
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    </div>
                                  )}

                                {/* Required Modules Section */}
                                {project.requiredModules &&
                                  project.requiredModules.length > 0 && (
                                    <div className="mb-4 bg-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 relative z-10">
                                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5 mr-2"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                        Required Modules:
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {project.requiredModules.map(
                                          (module, index) => (
                                            <span
                                              key={index}
                                              className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200 shadow-sm hover:shadow hover:bg-green-200 transition-all duration-300"
                                            >
                                              {module}
                                            </span>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  )}
                              </div>

                              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <p className="text-sm text-gray-500">
                                  Project #{project.id}
                                </p>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                  {project.type === "mini"
                                    ? "Mini Project"
                                    : "Major Project"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="major" className="mt-8">
                <div className="space-y-12">
                  {domainProjects
                    .find((d) => d.domain === selectedDomain)
                    ?.projects.filter((project) => project.type === "major")
                    .map((project) => (
                      <Card
                        key={project.id}
                        className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 rounded-2xl transform hover:-translate-y-2 hover:scale-[1.01] group w-full max-w-4xl mx-auto"
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col">
                            {/* Use ProjectImageDisplay for cybersecurity domain, otherwise use SecureYouTubeEmbed */}
                            {selectedDomain === "cybersecurity" ? (
                              <ProjectImageDisplay
                                title={project.title}
                                domain={selectedDomain}
                              />
                            ) : (
                              <SecureYouTubeEmbed
                                videoUrl={project.videoUrl}
                                title={project.title}
                              />
                            )}

                            {/* Project Details */}
                            <div className="p-6 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              {/* Title */}
                              <h3 className="text-2xl font-bold mb-3 text-gray-900 border-b pb-2 flex items-center relative z-10">
                                <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3 shadow-sm group-hover:shadow-md transition-all duration-300">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                                  </svg>
                                </span>
                                {project.title}
                              </h3>

                              {/* Description */}
                              <p className="text-gray-700 mb-5 text-lg relative z-10">
                                {project.description}
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Resources Section */}
                                {project.resources &&
                                  project.resources.length > 0 && (
                                    <div className="mb-4 bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100 relative z-10">
                                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5 mr-2"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                        </svg>
                                        Resources:
                                      </h4>
                                      <ul className="list-disc pl-5 space-y-1">
                                        {project.resources.map(
                                          (resource, index) => (
                                            <li
                                              key={index}
                                              className="text-gray-700 hover:text-blue-600 transition-colors"
                                            >
                                              {resource}
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    </div>
                                  )}

                                {/* Required Modules Section */}
                                {project.requiredModules &&
                                  project.requiredModules.length > 0 && (
                                    <div className="mb-4 bg-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 relative z-10">
                                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5 mr-2"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                        Required Modules:
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {project.requiredModules.map(
                                          (module, index) => (
                                            <span
                                              key={index}
                                              className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200 shadow-sm hover:shadow hover:bg-green-200 transition-all duration-300"
                                            >
                                              {module}
                                            </span>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  )}
                              </div>

                              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <p className="text-sm text-gray-500">
                                  Project #{project.id}
                                </p>
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                                  {project.type === "mini"
                                    ? "Mini Project"
                                    : "Major Project"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <div className="mt-16 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
            📜 Rules and Terms for Project Submission
          </h3>
          <div className="space-y-4">
            <p className="text-gray-700">
              At Internexis Technologies, we believe in providing our interns
              with real-time, hands-on project experience. To maintain quality
              and consistency, all interns should follow these guidelines during
              their internship:
            </p>

            <div className="pl-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                ✅ Internship Project Guidelines:
              </h4>

              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg">📂</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium">Project Completion:</span> All
                    mini and major projects assigned during the internship must
                    be completed on time.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg">🔗</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium">Submission Format:</span> Each
                    project should be uploaded to GitHub and the repository link
                    should be submitted through the official Internexis
                    submission form that will be shared by the company at the
                    end of the internship period or milestone.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg">🕒</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium">Timely Submission:</span> Late
                    submissions may delay or affect your certification
                    eligibility.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg">🏅</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium">
                      Certificate Eligibility:
                    </span>{" "}
                    Interns who successfully complete all assigned projects and
                    submit them as instructed will be eligible to receive an
                    Internship Completion Certificate from Internexis
                    Technologies.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg">❗</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium">Original Work Only:</span> All
                    work should be your own and original. Plagiarism or copying
                    from other sources may result in disqualification from
                    certification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipProjects;
