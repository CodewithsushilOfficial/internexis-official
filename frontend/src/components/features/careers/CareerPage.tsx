/**
 * CareerPage - Main careers page component
 * 
 * This page uses ONLY the unified CareerForm component.
 * All legacy forms have been removed and consolidated into CareerForm.tsx
 * 
 * Forms removed:
 * - CareerApplicationForm.tsx (deleted)
 * - EmbeddedCareerApplicationForm.tsx (deleted)
 * - ModernCareerApplicationForm.tsx (deleted) 
 * - UnifiedCareerApplicationForm.tsx (deleted)
 * 
 * Current form: CareerForm.tsx (the only form used)
 */

import React, { useState } from "react";
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  MapPin, 
  CheckCircle,
  Star,
  Award,
  TrendingUp,
  Sparkles,
  Rocket,
  Target,
  Globe,
  Zap,
  Coffee,
  Crown,
  Diamond
} from 'lucide-react';
import CareerForm from './CareerForm';
import './CareerPage.module.css';
import './AnimatedEffects.module.css';

const CareerPage: React.FC = () => {
  
  // Storyset Animated Images URLs
  const storsetImages = {
    heroAnimation: "https://storyset.com/illustration/programming/amico/animate.svg",
    studentDeveloper: "https://storyset.com/illustration/education/cuate/animate.svg",
    mentor: "https://storyset.com/illustration/teacher/rafiki/animate.svg",
    freelancer: "https://storyset.com/illustration/remote-work/bro/animate.svg",
    ambassador: "https://storyset.com/illustration/community/pana/animate.svg",
    volunteer: "https://storyset.com/illustration/helping-hand/cuate/animate.svg",
    teamwork: "https://storyset.com/illustration/team-work/rafiki/animate.svg",
    innovation: "https://storyset.com/illustration/innovation/amico/animate.svg",
    growth: "https://storyset.com/illustration/growth-analytics/pana/animate.svg",
    success: "https://storyset.com/illustration/success/bro/animate.svg",
    coding: "https://storyset.com/illustration/coding/pana/animate.svg",
    service: "https://storyset.com/illustration/customer-service/cuate/animate.svg",
    support: "https://storyset.com/illustration/technical-support/rafiki/animate.svg",
    collaboration: "https://storyset.com/illustration/collaboration/amico/animate.svg",
    learning: "https://storyset.com/illustration/learning/bro/animate.svg",
    career: "https://storyset.com/illustration/career-progress/pana/animate.svg"
  };
  // High-Quality Premium Images - Carefully Selected for Each Section
  const premiumImages = {
    // Hero Section - Professional Programming & Coding
    heroMain: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heroCoding: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    
    // Career Opportunities - High Quality & Role-Specific
    studentDeveloper: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    mentorshipProgram: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    remoteFreelancer: "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    campusAmbassador: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1949&q=80",
    volunteerSupport: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    
    // Technical Skills - Modern & Professional Tech Images
    frontendDev: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    backendServers: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
    mobileApps: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    aiMachineLearning: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80",
    dataScience: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    uiuxDesign: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    
    // Company Culture & Workplace
    teamCollaboration: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    modernWorkspace: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    
    // Services & Support
    skillDevelopment: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    mentorshipTraining: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    careerGrowth: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    innovationLab: "https://images.unsplash.com/photo-1581093458791-9f3c3250e670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    flexibleWork: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80",
    modernOffice: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    
    // Success & Achievement
    successAchievement: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
    teamSuccess: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  };

  // Floating Particles Component
  const FloatingParticles: React.FC = () => {
    return (
      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ 
              y: "-100px", 
              opacity: [0, 1, 1, 0],
              x: [0, 50, -50, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + i * 8}%`,
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
            }}
          />
        ))}
      </div>
    );
  };
  // Animated Background Component
  const AnimatedBackground: React.FC<{ 
    type: 'coding' | 'teaching' | 'remote' | 'community' | 'volunteer';
    className?: string;
  }> = ({ type, className = "" }) => {
    const getAnimationElements = () => {
      switch (type) {
        case 'coding':
          return (
            <div className={`relative w-full h-full ${className}`}>
              <motion.div
                animate={{ 
                  y: [-20, 20, -20],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 left-4 w-12 h-12 bg-blue-500 rounded-lg opacity-20"
              />
              <motion.div
                animate={{ 
                  x: [-15, 15, -15],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-8 right-8 w-8 h-8 bg-green-500 rounded-full opacity-30"
              />
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-6 left-6 w-10 h-10 border-2 border-purple-400 rounded-full opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-2xl" />
            </div>
          );
        case 'teaching':
          return (
            <div className={`relative w-full h-full ${className}`}>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-6 w-16 h-16 bg-purple-400 rounded-full opacity-20"
              />
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  x: [-5, 5, -5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-8 right-4 w-12 h-12 bg-pink-400 rounded-lg opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-2xl" />
            </div>
          );
        case 'remote':
          return (
            <div className={`relative w-full h-full ${className}`}>
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-4 right-4 w-14 h-14 border-3 border-green-400 rounded-full opacity-20"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-4 left-4 w-10 h-10 bg-emerald-400 rounded-full opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-emerald-100/50 rounded-2xl" />
            </div>
          );
        case 'community':
          return (
            <div className={`relative w-full h-full ${className}`}>
              <motion.div
                animate={{ 
                  y: [-15, 15, -15],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-8 w-12 h-12 bg-orange-400 rounded-lg opacity-25"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 right-6 w-8 h-8 bg-red-400 rounded-full opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-red-100/50 rounded-2xl" />
            </div>
          );
        case 'volunteer':
          return (
            <div className={`relative w-full h-full ${className}`}>
              <motion.div
                animate={{ 
                  rotate: [0, -360],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute top-8 right-8 w-10 h-10 border-2 border-teal-400 rounded-full opacity-25"
              />
              <motion.div
                animate={{ 
                  x: [-10, 10, -10],
                  y: [-5, 5, -5]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-6 left-8 w-14 h-14 bg-blue-400 rounded-lg opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 to-blue-100/50 rounded-2xl" />
            </div>
          );
        default:
          return <div className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl ${className}`} />;
      }
    };

    return getAnimationElements();
  };

  const heroStats = [
    { 
      number: '500+', 
      label: 'Team Members', 
      icon: Users,
      description: 'Talented professionals'
    },
    { 
      number: '50+', 
      label: 'Active Projects', 
      icon: Briefcase,
      description: 'Innovative solutions'
    },
    { 
      number: '100+', 
      label: 'Universities', 
      icon: GraduationCap,
      description: 'Global reach'
    },
    { 
      number: '98%', 
      label: 'Satisfaction Rate', 
      icon: Heart,
      description: 'Happy team members'
    }
  ];  const opportunities = [
    {
      title: 'Student Team Members',
      description: 'Join our core team and work on cutting-edge projects while studying',
      icon: GraduationCap,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      roles: ['Web Developer', 'App Developer', 'AI/ML Engineer', 'UI/UX Designer'],
      benefits: ['Flexible Hours', 'Real Projects', 'Mentorship', 'Certificates'],
      animationType: 'coding' as const,
      storysetImage: storsetImages.studentDeveloper,
      premiumImage: premiumImages.studentDeveloper
    },
    {
      title: 'Mentors & Advisors',
      description: 'Guide the next generation of talent and share your expertise',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      roles: ['Technical Mentor', 'Career Advisor', 'Industry Expert', 'Workshop Leader'],
      benefits: ['Flexible Schedule', 'Impact Lives', 'Network Growth', 'Recognition'],
      animationType: 'teaching' as const,
      storysetImage: storsetImages.mentor,
      premiumImage: premiumImages.mentorshipProgram
    },
    {
      title: 'Freelancers',
      description: 'Work on exciting projects with complete flexibility',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      roles: ['Project Manager', 'Content Creator', 'Marketing Specialist', 'Designer'],
      benefits: ['Remote Work', 'Competitive Pay', 'Project Variety', 'Growth Opportunities'],
      animationType: 'remote' as const,
      storysetImage: storsetImages.freelancer,
      premiumImage: premiumImages.remoteFreelancer
    },
    {
      title: 'Campus Ambassadors',
      description: 'Represent Internexis at your university and build communities',
      icon: MapPin,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      roles: ['University Rep', 'Event Organizer', 'Community Builder', 'Brand Advocate'],
      benefits: ['Leadership Skills', 'Networking', 'Incentives', 'Recognition'],
      animationType: 'community' as const,
      storysetImage: storsetImages.ambassador,
      premiumImage: premiumImages.campusAmbassador
    },
    {
      title: 'Volunteers',
      description: 'Contribute to meaningful projects and make a difference',
      icon: Heart,
      color: 'from-teal-500 to-blue-500',
      bgColor: 'from-teal-50 to-blue-50',
      roles: ['Event Helper', 'Content Contributor', 'Community Moderator', 'Research Assistant'],
      benefits: ['Social Impact', 'Skill Development', 'Community', 'Experience'],
      animationType: 'volunteer' as const,
      storysetImage: storsetImages.volunteer,
      premiumImage: premiumImages.volunteerSupport
    }
  ];

  const companyValues = [
    {
      icon: Rocket,
      title: 'Innovation First',
      description: 'We embrace cutting-edge technologies and creative solutions to solve real-world problems.',
      color: 'from-blue-500 to-purple-500',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-purple-50'
    },
    {
      icon: Users,
      title: 'Team Spirit',
      description: 'Collaboration and mutual support drive our success. We grow together as one team.',
      color: 'from-green-500 to-teal-500',
      bgPattern: 'bg-gradient-to-br from-green-50 to-teal-50'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We set high standards and strive for perfection in everything we deliver.',
      color: 'from-orange-500 to-red-500',
      bgPattern: 'bg-gradient-to-br from-orange-50 to-red-50'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Our work spans across continents, creating positive change worldwide.',
      color: 'from-purple-500 to-pink-500',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50'
    }
  ];
  // Student image rotation logic - Updated with software engineers, study groups, hackathons, trainers and mentors
  const studentImages = [
    // Software engineer working on code
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    // College study group collaborating
    "https://cdn.pixabay.com/photo/2024/01/30/12/59/women-8541959_1280.jpg",
    // Hackathon event with programmers
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    // Trainer/instructor teaching coding
    "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    // Mentor helping student with programming
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"  ];  // Using a static image instead of rotation
  const [currentHeroImage] = useState(0);
  // Disabled auto-rotation for static display
  // useEffect(() => {
  //   const interval = setInterval(() => setCurrentHeroImage((c) => (c + 1) % studentImages.length), 4000);
  //   return () => clearInterval(interval);
  // }, [studentImages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      
      {/* Floating Particles Background Effect */}
      <FloatingParticles />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-96 h-96"
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 -left-40 w-80 h-80"
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"></div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/3 w-64 h-64"
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </motion.div>      </div>      {/* Hero Section with Enhanced Design */}
      <section className="pt-20 pb-24 relative z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">              {/* Hero Content */}
            <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center mb-28">
              
              {/* Left Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl"
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </motion.div>
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold">
                    ✨ Now Hiring - Join Our Amazing Team!
                  </span>
                </div>

                <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-tight">
                  Build Your{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Dream Career
                  </span>{' '}
                  with Us
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                  🚀 Join a team that values innovation, creativity, and growth. Whether you're a student starting your journey or a professional ready for new challenges, we have the perfect opportunity for you.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <span>Start Your Journey</span>
                    <Rocket className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-bold rounded-2xl border-2 border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <span>Explore Opportunities</span>
                    <Star className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>              {/* Right Side - Animated Hero Illustration */}              <motion.div
                initial={{ opacity: 0, x: 50 }}                animate={{ opacity: 1, x: 0 }}                transition={{ duration: 0.8, delay: 0.2 }}                className="relative w-full lg:w-[520px] xl:w-[560px] mx-auto"
              >                <div className="relative p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                     style={{ transform: "perspective(1000px) rotateY(-3deg)" }}>                  <div className="relative z-10">                  {/* High-Quality Professional Coding Hero Image - Card Style */}                    <div className="w-full aspect-[4/3] rounded-lg bg-white flex items-center justify-center shadow-md overflow-hidden relative transition-all duration-500 border-0">                        {/* Static image display */}                      <img
                        src={studentImages[currentHeroImage]}
                        alt="Tech Professional Collaboration"
                        className="w-full h-full object-cover"
                        style={{ 
                          objectFit: "cover",
                          objectPosition: "center"
                        }}
                        loading="eager"                      />                      {/* Removing card title overlay and gradient overlay */}
                      
                      {/* Static Live Development Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border-0">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-800">🚀 Live Development</span>
                        </div>
                      </div>
                      
                      {/* Static Programming Language Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg shadow-md border-0">
                        <span className="text-white font-bold text-sm">⚛️ React</span>
                      </div>
                      
                      {/* Static Technology Badge */}
                      <div className="absolute bottom-[72px] right-4 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-md border-0">
                        <span className="text-white font-bold text-xs">🔥 TypeScript</span>
                      </div>
                      
                      <motion.div
                        animate={{ 
                          y: [-6, 6, -6],
                          rotate: [0, -3, 3, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                        className="absolute bottom-6 left-6 px-4 py-2 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-xl shadow-xl border border-white/30"
                      >
                        <span className="text-white font-bold text-sm">🟢 Node.js</span>
                      </motion.div>
                      
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 8, -8, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 3 }}
                        className="absolute bottom-6 right-6 px-4 py-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-xl shadow-xl border border-white/30"
                      >
                        <span className="text-white font-bold text-sm">🐍 Python</span>
                      </motion.div>
                      
                      {/* Professional Experience Indicator */}
                      <motion.div
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                        className="absolute bottom-20 right-8 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
                      >
                        <span className="text-white font-semibold text-xs">💼 Professional Level</span>
                      </motion.div>
                    </div>
                      {/* Enhanced Code Rain Effect - Removed */}
                  </div>
                  
                  {/* Floating Elements Around Hero Animation - Static */}                  {/* Static decorative elements - smaller size */}
                  <div className="absolute -top-6 -right-6 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <Diamond className="h-5 w-5 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {heroStats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5
                  }}
                  transition={{ duration: 0.3 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-gray-900 mb-2 text-center">{stat.number}</div>
                    <div className="text-lg font-bold text-gray-700 mb-1 text-center">{stat.label}</div>
                    <div className="text-sm text-gray-500 text-center">{stat.description}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Our{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Core Values
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do and shape the culture we're building together.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5
                  }}
                  className="group relative perspective-1000"
                >
                  <div className={`relative ${value.bgPattern} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                      }}></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${value.color} rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl`}>
                        <value.icon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>      {/* Enhanced Opportunities Section */}
      <section id="opportunities" className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Amazing{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Opportunities
                </span>{' '}
                Await
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Discover the perfect role that matches your skills, interests, and career goals. Each opportunity is designed to help you grow and make a meaningful impact.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {opportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -10
                  }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-100/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50">                    {/* High-Quality Premium Image Section */}
                    <div className="relative h-64 overflow-hidden rounded-t-3xl">
                      
                      {/* Premium Professional Image */}
                      <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={opportunity.premiumImage}
                          alt={opportunity.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          style={{ 
                            objectFit: 'cover',
                            objectPosition: 'center',
                            filter: 'brightness(1.1) contrast(1.05) saturate(1.2)'
                          }}
                        />
                        
                        {/* Enhanced Gradient Overlay for Better Text Readability */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent`} />
                        
                        {/* Subtle Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <AnimatedBackground type={opportunity.animationType} />
                        </div>
                      </motion.div>
                      
                      {/* Premium Role Badge with Enhanced Design */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-r ${opportunity.color} rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-white/40`}
                      >
                        <opportunity.icon className="h-8 w-8 text-white drop-shadow-lg" />
                      </motion.div>
                      
                      {/* Professional Status Indicator */}
                      <motion.div
                        animate={{ 
                          y: [-2, 2, -2],
                          rotate: [0, 1, -1, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute bottom-4 left-4 px-4 py-2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/60"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 bg-gradient-to-r ${opportunity.color} rounded-full animate-pulse`}></div>
                          <span className="text-sm font-bold text-gray-800">🚀 Professional Role</span>
                        </div>
                      </motion.div>
                      
                      {/* Experience Level Badge */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.9, 1, 0.9]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-4 right-4 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-xl border border-white/30"
                      >
                        <span className="text-white font-semibold text-xs">⭐ All Levels Welcome</span>
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {opportunity.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {opportunity.description}
                      </p>

                      {/* Roles */}
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-gray-700 mb-3">Available Roles:</h4>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.roles.map((role, roleIndex) => (
                            <span
                              key={roleIndex}
                              className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm font-medium hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all duration-300"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-gray-700 mb-3">Key Benefits:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {opportunity.benefits.map((benefit, benefitIndex) => (
                            <div
                              key={benefitIndex}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Apply Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className={`w-full py-3 bg-gradient-to-r ${opportunity.color} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group`}
                      >
                        <span>Apply for {opportunity.title}</span>
                        <Rocket className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>      {/* Technical Skills Section with Freepik Illustrations */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Technical{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Expertise
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Master cutting-edge technologies and build expertise in the most in-demand tech skills of 2025.
              </p>
            </motion.div>            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">              {[
                {
                  title: "Frontend Development",
                  description: "React, Vue.js, Angular, TypeScript, Next.js and modern web technologies",
                  image: premiumImages.frontendDev,
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "from-blue-50 to-cyan-50",
                  skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
                  icon: "⚛️"
                },
                {
                  title: "Backend Development",
                  description: "Node.js, Python, Java, microservices and scalable server architectures",
                  image: premiumImages.backendServers,
                  color: "from-green-500 to-emerald-500",
                  bgColor: "from-green-50 to-emerald-50",
                  skills: ["Node.js", "Python", "PostgreSQL", "Redis"],
                  icon: "🔧"
                },
                {
                  title: "Mobile App Development",
                  description: "React Native, Flutter, iOS and Android native development",
                  image: premiumImages.mobileApps,
                  color: "from-purple-500 to-pink-500",
                  bgColor: "from-purple-50 to-pink-50",
                  skills: ["React Native", "Flutter", "Swift", "Kotlin"],
                  icon: "📱"
                },
                {
                  title: "AI & Machine Learning",
                  description: "TensorFlow, PyTorch, computer vision, NLP and deep learning",
                  image: premiumImages.aiMachineLearning,
                  color: "from-orange-500 to-red-500",
                  bgColor: "from-orange-50 to-red-50",
                  skills: ["TensorFlow", "PyTorch", "OpenAI", "Computer Vision"],
                  icon: "🤖"
                },
                {
                  title: "Data Science",
                  description: "Analytics, visualization, big data processing and statistical modeling",
                  image: premiumImages.dataScience,
                  color: "from-teal-500 to-blue-500",
                  bgColor: "from-teal-50 to-blue-50",
                  skills: ["Pandas", "NumPy", "Tableau", "Apache Spark"],
                  icon: "📊"
                },
                {
                  title: "UI/UX Design",
                  description: "Figma, Adobe Creative Suite, user research and design systems",
                  image: premiumImages.uiuxDesign,
                  color: "from-pink-500 to-purple-500",
                  bgColor: "from-pink-50 to-purple-50",
                  skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
                  icon: "🎨"
                }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5
                  }}
                  className="group relative"
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50">
                      {/* High-Quality Premium Tech Images */}
                    <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${skill.bgColor} rounded-t-3xl`}>
                      <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={skill.image}
                          alt={skill.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          style={{ 
                            objectFit: 'cover',
                            objectPosition: 'center',
                            filter: 'brightness(1.1) contrast(1.1) saturate(1.2)'
                          }}
                        />
                        
                        {/* Enhanced Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        
                        {/* Premium Tech Badge */}
                        <motion.div
                          animate={{ 
                            rotate: [0, 3, -3, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                          className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-r ${skill.color} rounded-2xl flex items-center justify-center shadow-xl text-2xl border-2 border-white/40`}
                        >
                          {skill.icon}
                        </motion.div>
                        
                        {/* High Demand Indicator */}
                        <motion.div
                          animate={{ 
                            y: [-2, 2, -2],
                            opacity: [0.9, 1, 0.9]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                          className="absolute bottom-4 left-4 px-4 py-2 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/60"
                        >
                          <span className="text-sm font-bold text-gray-800">🔥 High Demand 2025</span>
                        </motion.div>
                        
                        {/* Industry Rating */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          className="absolute bottom-4 right-4 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-lg border border-white/30"
                        >
                          <span className="text-white font-semibold text-xs">⭐ Industry Leading</span>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                        {skill.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {skill.description}
                      </p>
                      
                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skill.skills.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                            className={`px-3 py-1 bg-gradient-to-r ${skill.color} text-white text-xs font-semibold rounded-full shadow-sm`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      
                      {/* Learn More Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 bg-gradient-to-r ${skill.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
                      >
                        <span>Start Learning</span>
                        <Rocket className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>      </section>      {/* Enhanced Application Form Section */}
      <section id="application-form" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.05'%3E%3Cpolygon points='50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}></div>
        </div>

        {/* Floating elements */}
        <motion.div 
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[5%] w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ 
            y: [20, -20, 20],
            rotate: [0, -5, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-[5%] w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-full blur-xl"
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <motion.div              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_10px_25px_rgba(79,70,229,0.4)]"
                >
                  <Coffee className="h-10 w-10 text-white" />
                </motion.div>
                <span className="px-5 py-3 bg-white/90 text-blue-700 rounded-full text-base font-bold shadow-lg border border-blue-100">
                  🎯 Ready to Make the Move?
                </span>
              </div>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
                Let's{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Get Started
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-2">
                Fill out our streamlined application form and take the first step towards joining our incredible team. We're excited to learn about your unique skills and aspirations!
              </p>
              <div className="flex items-center justify-center gap-3 text-gray-500 mb-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Quick application process</span>
                <span className="mx-2">•</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No complex steps</span>
                <span className="mx-2">•</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Fast response time</span>
              </div>
            </motion.div>

            {/* Application Form Container */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-indigo-100/30 rounded-3xl blur-xl transform -rotate-1"></div>              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-[0_20px_50px_rgba(79,70,229,0.2)] border-2 border-white/70 hover:shadow-[0_25px_60px_rgba(79,70,229,0.3)] transition-all duration-500">
                <div className="absolute -top-10 -right-8 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-8 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-xl"></div>
                <CareerForm isEmbedded={true} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          ></motion.div>
          
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.3, 1],
            }}
            transition={{ 
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Internexis?
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                We're not just another company – we're a community of innovators, dreamers, and achievers who believe in making a lasting impact together.
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: GraduationCap,
                  title: 'Learn & Grow',
                  description: 'Access cutting-edge technologies, world-class mentorship, and unlimited learning opportunities to accelerate your career.',
                  color: 'from-blue-500 to-cyan-500',
                  bgPattern: 'from-blue-500/10 to-cyan-500/10'
                },
                {
                  icon: Users,
                  title: 'Amazing Team',
                  description: 'Collaborate with passionate individuals from diverse backgrounds who share your drive for innovation and excellence.',
                  color: 'from-purple-500 to-pink-500',
                  bgPattern: 'from-purple-500/10 to-pink-500/10'
                },
                {
                  icon: Briefcase,
                  title: 'Real Impact',
                  description: 'Work on meaningful projects that solve real-world problems and build an impressive professional portfolio.',
                  color: 'from-green-500 to-emerald-500',
                  bgPattern: 'from-green-500/10 to-emerald-500/10'
                },
                {
                  icon: Award,
                  title: 'Recognition',
                  description: 'Get acknowledged for your contributions with certificates, public recognition, and career advancement opportunities.',
                  color: 'from-orange-500 to-red-500',
                  bgPattern: 'from-orange-500/10 to-red-500/10'
                },
                {
                  icon: TrendingUp,
                  title: 'Career Growth',
                  description: 'Clear pathways for advancement with opportunities to lead teams, mentor others, and shape the future of our company.',
                  color: 'from-teal-500 to-blue-500',
                  bgPattern: 'from-teal-500/10 to-blue-500/10'
                },
                {
                  icon: Heart,
                  title: 'Work-Life Balance',
                  description: 'Flexible schedules that respect your personal time, academic commitments, and individual lifestyle needs.',
                  color: 'from-pink-500 to-purple-500',
                  bgPattern: 'from-pink-500/10 to-purple-500/10'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10
                  }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 group-hover:bg-white/15">
                    
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${benefit.color} rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl`}>
                      <benefit.icon className="h-10 w-10 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {benefit.description}
                    </p>

                    {/* Decorative Element */}
                    <div className={`absolute top-4 right-4 w-6 h-6 bg-gradient-to-r ${benefit.color} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Transform Your Future?
                  </span>
                </h3>
                <p className="text-lg text-gray-300 mb-8">
                  Join thousands of talented individuals who have already started their journey with us. Your dream career is just one click away.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto group"
                >
                  <span>Apply Now & Join Us</span>
                  <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                </motion.button>
              </div>
            </motion.div>          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                What Our{' '}
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Team Says
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it - hear from our amazing team members about their experience working with us.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Full Stack Developer",
                  avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
                  testimonial: "Working at Internexis has been transformative. The learning opportunities are endless and the team is incredibly supportive.",
                  rating: 5
                },
                {
                  name: "Michael Chen",
                  role: "UI/UX Designer",
                  avatar: "https://img.freepik.com/free-vector/young-man-with-glasses-avatar_1308-175763.jpg",
                  testimonial: "The creative freedom and collaborative environment here has helped me grow both professionally and personally.",
                  rating: 5
                },
                {
                  name: "Emily Rodriguez",
                  role: "Project Manager",
                  avatar: "https://img.freepik.com/free-vector/businesswoman-character-avatar-isolated_24877-60111.jpg",
                  testimonial: "Internexis values work-life balance and provides amazing opportunities for career advancement. Best decision I ever made!",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50"
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 shadow-lg"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.testimonial}"</p>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services & Support Section with Storyset Images */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                What We{' '}
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Provide
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                From comprehensive training to ongoing support, we provide everything you need to succeed in your career journey with us.
              </p>
            </motion.div>            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[                {
                  title: "Technical Training",
                  description: "Comprehensive coding bootcamps and skill development programs",
                  image: premiumImages.skillDevelopment,
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "from-blue-50 to-cyan-50"
                },
                {
                  title: "Mentorship Program",
                  description: "One-on-one guidance from industry experts and senior professionals",
                  image: premiumImages.mentorshipTraining,
                  color: "from-purple-500 to-pink-500",
                  bgColor: "from-purple-50 to-pink-50"
                },
                {
                  title: "Career Growth",
                  description: "Clear advancement paths and leadership development opportunities",
                  image: premiumImages.careerGrowth,
                  color: "from-green-500 to-emerald-500",
                  bgColor: "from-green-50 to-emerald-50"
                },
                {
                  title: "Innovation Lab",
                  description: "Access to cutting-edge tools and experimental project opportunities",
                  image: premiumImages.innovationLab,
                  color: "from-teal-500 to-blue-500",
                  bgColor: "from-teal-50 to-blue-50"
                },
                {
                  title: "Flexible Work",
                  description: "Work-life balance with flexible schedules and remote options",
                  image: premiumImages.flexibleWork,
                  color: "from-orange-500 to-red-500",
                  bgColor: "from-orange-50 to-red-50"
                },
                {
                  title: "Modern Office",
                  description: "State-of-the-art facilities and collaborative workspaces",
                  image: premiumImages.modernOffice,
                  color: "from-pink-500 to-purple-500",
                  bgColor: "from-pink-50 to-purple-50"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -10
                  }}
                  className="group relative"
                >
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50">
                      {/* Premium Service Images */}
                    <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${service.bgColor} rounded-t-3xl`}>
                      <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          style={{ 
                            objectFit: 'cover',
                            objectPosition: 'center',
                            filter: 'brightness(1.1) contrast(1.08) saturate(1.15)'
                          }}
                        />
                        
                        {/* Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </motion.div>
                      
                      {/* Service Quality Badge */}
                      <motion.div
                        animate={{ 
                          y: [-3, 3, -3],
                          rotate: [0, 2, -2, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                        className={`absolute top-4 right-4 w-14 h-14 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/40`}
                      >
                        <Sparkles className="h-7 w-7 text-white" />
                      </motion.div>
                      
                      {/* Premium Service Indicator */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.9, 1, 0.9]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                        className="absolute bottom-4 left-4 px-4 py-2 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/60"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 bg-gradient-to-r ${service.color} rounded-full animate-pulse`}></div>
                          <span className="text-sm font-bold text-gray-800">🏆 Premium Service</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      
                      {/* Learn More Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-2 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group`}
                      >
                        <span>Learn More</span>
                        <Star className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>      {/* Success Stories Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Success{' '}
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Stories
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our team members have grown their careers and achieved their goals with Internexis.              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              
              {/* Left Side - Success Animation */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}                className="relative"
              >
                <div className="relative">                  <div className="w-full h-[500px] rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center shadow-[0_20px_50px_rgba(234,88,12,0.2)] hover:shadow-[0_25px_60px_rgba(234,88,12,0.3)] overflow-hidden relative p-8 transition-all duration-500">
                    
                    {/* Beautiful Freepik Success Achievement Image */}
                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}                    >                      <img
                        src="https://images.unsplash.com/photo-1660795738644-19c4d1de4a88?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Success and Career Achievement"
                        className="w-full h-full object-cover rounded-2xl border-2 border-yellow-100/50"
                        loading="lazy"
                        style={{ 
                          objectFit: 'cover',
                          objectPosition: 'center',
                          filter: 'brightness(1.05) contrast(1.05)',
                          maxHeight: 480
                        }}
                      />
                      
                      {/* Success Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/20 to-transparent rounded-3xl" />
                    </motion.div>
                    
                    {/* Achievement Celebration Elements */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.15, 1]
                      }}                      transition={{ duration: 8, repeat: Infinity }}
                      className="absolute top-12 right-12 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-xl z-10"
                    >
                      <Crown className="h-10 w-10 text-white" />
                    </motion.div>

                    <motion.div
                      animate={{ 
                        y: [-8, 8, -8],
                        x: [-3, 3, -3],
                        rotate: [0, 5, -5, 0]
                      }}                      transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                      className="absolute bottom-12 left-12 w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl flex items-center justify-center shadow-xl z-10"
                    >
                      <Star className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    {/* Success Metrics Badge */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                      }}                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                      className="absolute top-12 left-12 px-5 py-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 z-10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-base font-bold text-gray-800">🎯 Goals Achieved</span>
                      </div>
                    </motion.div>                  </div>
                  
                  <div className="absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                    <Award className="h-12 w-12 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Statistics */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"              >
                {[
                  {
                    number: "95%",
                    label: "Career Advancement",
                    description: "Of our team members receive promotions within their first year"
                  },
                  {
                    number: "4.9/5",
                    label: "Satisfaction Rating",
                    description: "Average rating from our team members across all departments"
                  },
                  {
                    number: "500+",
                    label: "Skills Learned",
                    description: "Different technical and soft skills acquired by our team"
                  },
                  {
                    number: "50+",
                    label: "Success Stories",
                    description: "Amazing career transformations and achievements documented"
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-2xl font-bold text-white">{stat.number.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-gray-900 mb-1">{stat.number}</div>
                      <div className="text-lg font-bold text-gray-700 mb-2">{stat.label}</div>
                      <p className="text-gray-600 leading-relaxed">{stat.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section (Optional) */}
      <footer className="py-10 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Internexis. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareerPage;
