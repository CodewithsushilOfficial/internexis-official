import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Users, 
  BookOpen, 
  UserPlus, 
  Search, 
  MessageCircle, 
  Calendar,
  Award,
  Heart,
  Target,
  CheckCircle,
  Globe,
  Mail,
  ArrowRight,
  Zap,
  Shield,
  Code,
  Smartphone,
  Brain,
  Palette,
  Database,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Languages,
  DollarSign,
  Video,
  BookmarkPlus,
  TrendingUp,
  Plus,
  Minus
} from 'lucide-react';
import MentorCard from '../../components/Mentorship/MentorCard';
import BookingModal from '../../components/Mentorship/BookingModal';
import SessionPackageCard from '../../components/Mentorship/SessionPackageCard';
import MentorshipTimeline from '../../components/Mentorship/MentorshipTimeline';

const MentorshipIndexPage: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    document.title = 'Premium Mentorship Platform - Internexis Technologies';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get personalized mentorship from industry experts at just ₹60/30min. Book 1-on-1 sessions with top developers, designers, and tech professionals.');
    }
  }, []);

  const mockMentors = [
    {
      id: '1',
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9a8e299?w=300&h=300&fit=crop&crop=face',
      domain: 'Full Stack Development',
      stack: ['React', 'Node.js', 'MongoDB', 'AWS'],
      rating: 4.9,
      reviewCount: 127,
      experience: '5+ years',
      available: true,
      languages: ['English', 'Hindi', 'Tamil'],
      price: 60,
      location: 'Bangalore, India',
      bio: 'Experienced Full Stack Developer with 5+ years at top tech companies. Passionate about mentoring and helping developers grow their careers.',
      sessionsCompleted: 234
    },
    {
      id: '2',
      name: 'Arjun Patel',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      domain: 'AI/ML Engineering',
      stack: ['Python', 'TensorFlow', 'PyTorch', 'AWS'],
      rating: 4.8,
      reviewCount: 89,
      experience: '4+ years',
      available: true,
      languages: ['English', 'Hindi', 'Gujarati'],
      price: 60,
      location: 'Mumbai, India',
      bio: 'AI/ML Engineer at Microsoft with expertise in deep learning and computer vision. Love teaching complex ML concepts in simple terms.',
      sessionsCompleted: 156
    },
    {
      id: '3',
      name: 'Sneha Reddy',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      domain: 'UI/UX Design',
      stack: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
      rating: 4.7,
      reviewCount: 143,
      experience: '3+ years',
      available: false,
      languages: ['English', 'Telugu', 'Hindi'],
      price: 60,
      location: 'Hyderabad, India',
      bio: 'Senior UX Designer at Flipkart. Specialized in mobile app design and user research. Helped 100+ designers improve their portfolios.',
      sessionsCompleted: 189
    }
  ];

  const sessionPackages = [
    {
      sessions: 1,
      price: 60,
      discount: 0,
      tagline: 'Try it out',
      popular: false,
      features: [
        '30-minute 1-on-1 session',
        'Screen sharing & code review',
        'Personalized guidance',
        'Session recording (optional)'
      ]
    },
    {
      sessions: 5,
      price: 250,
      discount: 50,
      tagline: 'Most Popular',
      popular: true,
      features: [
        '5 sessions (30 mins each)',
        'Priority booking',
        'Extended 45-min sessions',
        'Career roadmap planning',
        'Direct WhatsApp support'
      ]
    },
    {
      sessions: 10,
      price: 480,
      discount: 120,
      tagline: 'Best Value',
      popular: false,
      features: [
        '10 sessions (30 mins each)',
        'Flexible scheduling',
        'Project-based mentoring',
        'Portfolio/resume review',
        'Job referral assistance',
        'Lifetime community access'
      ]
    }
  ];

  const testimonials = [
    {
      studentName: 'Rahul Kumar',
      quote: 'Amazing experience! My mentor helped me land a job at Google. The guidance was spot-on and worth every rupee.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      college: 'IIT Delhi',
      course: 'Computer Science',
      stars: 5,
      mentorName: 'Priya Sharma',
      domain: 'Full Stack Development',
      sessionsCompleted: 8
    },
    {
      studentName: 'Anita Patel',
      quote: 'The AI/ML sessions were incredibly detailed. I went from zero to building my first neural network in just 5 sessions!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      college: 'NIT Surat',
      course: 'Information Technology',
      stars: 5,
      mentorName: 'Arjun Patel',
      domain: 'AI/ML Engineering',
      sessionsCompleted: 5
    },
    {
      studentName: 'Vikram Singh',
      quote: 'Best investment for my career! The mentor helped me redesign my portfolio and I got 3 job offers within a month.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      college: 'Delhi University',
      course: 'Design',
      stars: 5,
      mentorName: 'Sneha Reddy',
      domain: 'UI/UX Design',
      sessionsCompleted: 12
    }
  ];

  const handleBookNow = (mentorId: string) => {
    const mentor = mockMentors.find(m => m.id === mentorId);
    if (mentor) {
      setSelectedMentor(mentor);
      setIsBookingModalOpen(true);
    }
  };

  const handlePackageSelect = () => {
    // For demo purposes, we'll just show a message
    console.log('Package selected - would redirect to mentor selection');
  };

  const mentorDomains = [
    { icon: Code, name: 'Web Development', count: '15+ Mentors', color: 'from-blue-500 to-cyan-500' },
    { icon: Smartphone, name: 'App Development', count: '12+ Mentors', color: 'from-green-500 to-emerald-500' },
    { icon: Brain, name: 'AI/ML', count: '8+ Mentors', color: 'from-purple-500 to-pink-500' },
    { icon: Database, name: 'Data Science', count: '10+ Mentors', color: 'from-orange-500 to-red-500' },
    { icon: Palette, name: 'UI/UX Design', count: '6+ Mentors', color: 'from-pink-500 to-rose-500' },
    { icon: Shield, name: 'Cybersecurity', count: '4+ Mentors', color: 'from-red-500 to-orange-500' }
  ];

  const faqs = [
    {
      question: 'How does the mentorship work?',
      answer: 'Book a 30-minute 1-on-1 video call with your chosen mentor. Sessions include screen sharing, code review, and personalized guidance based on your goals.'
    },
    {
      question: 'What if I need to reschedule?',
      answer: 'You can reschedule up to 2 hours before the session. We understand that schedules can change and offer flexible rescheduling options.'
    },
    {
      question: 'Are session recordings available?',
      answer: 'Yes! With mentor consent, sessions can be recorded for your future reference. This helps you revisit key concepts and action items.'
    },
    {
      question: 'What if I\'m not satisfied?',
      answer: 'We offer a 100% money-back guarantee if you\'re not satisfied with your first session. Your success is our priority.'
    },
    {
      question: 'Can I get job referrals?',
      answer: 'Many of our mentors work at top tech companies and can provide referrals for qualified candidates who complete multiple sessions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  🚀 Premium Mentorship
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200">
                  Starting at <span className="text-purple-600 dark:text-purple-400">₹60/30min</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Get personalized 1-on-1 guidance from industry experts. Book sessions with top developers, designers, and tech professionals to accelerate your career growth.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/mentorship/mentors"
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Mentors
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/mentorship/apply"
                  className="group bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-600 dark:border-purple-400"
                >
                  <span className="flex items-center justify-center">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Become a Mentor
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                  alt="Mentorship Session"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl"></div>
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">1000+</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Sessions Completed</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">4.9/5</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Average Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Hero Banner Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=300&fit=crop"
              alt="Team Collaboration"
              className="w-full h-64 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/60 to-pink-600/60 rounded-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  🚀 Join 1000+ Successful Students
                </h3>
                <p className="text-lg opacity-90">
                  Transform your career with industry-expert mentorship
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Mentorship Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              🎯 Why Mentorship?
            </h2>
            <p className="text-xl md:text-2xl text-purple-600 dark:text-purple-400 font-semibold mb-8 italic">
              "Kabhi-kabhi sirf padhai kaafi nahi hoti... sahi guidance zaroori hoti hai!"
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Internexis Mentorship Program aapko connect karta hai industry experts, startup founders, aur seasoned developers se – jo aapko direction denge, support karenge aur industry-ready banayenge.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Personalized Guidance
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Industry experts se direct connect hoke apne career goals achieve karo with tailored roadmaps and strategies.
              </p>
              <div className="mt-6">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop"
                  alt="Personalized Guidance"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Real Industry Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Current trends, job market insights, aur practical skills jo actually industry mein demand mein hain - sab kuch first-hand experience ke saath.
              </p>
              <div className="mt-6">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop"
                  alt="Industry Insights"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Network Building
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Top companies ke professionals se connection banao, referrals paao, aur apka professional network expand karo.
              </p>
              <div className="mt-6">
                <img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop"
                  alt="Network Building"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.9/5</div>
              <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">90%</div>
              <div className="text-gray-600 dark:text-gray-400">Job Success Rate</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mentorship Timeline */}
      <MentorshipTimeline />

      {/* Featured Mentors Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ⭐ Featured Mentors
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet our top-rated mentors who are ready to guide you on your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {mockMentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <MentorCard
                  {...mentor}
                  onBookNow={handleBookNow}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/mentorship/mentors"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View All Mentors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mentor Domains Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-slate-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              🎯 Mentorship Domains
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose from diverse domains and get mentored by industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentorDomains.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${domain.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <domain.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                  {domain.name}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-semibold mb-4">
                  {domain.count}
                </p>
                <div className="flex items-center text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  <span>Explore mentors</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Session Packages Pricing */}
      <section className="py-20 px-4 bg-white/10 dark:bg-gray-800/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              💰 Session Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the perfect package for your learning needs. All sessions are 30 minutes of focused mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {sessionPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SessionPackageCard
                  {...pkg}
                  onClick={handlePackageSelect}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full px-6 py-3 border border-purple-500/30">
              <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">
                100% Money-back guarantee on your first session
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              💬 Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from students who transformed their careers through our mentorship program
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.studentName}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {testimonial.studentName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {testimonial.college} • {testimonial.course}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mentored by <span className="font-semibold text-purple-600 dark:text-purple-400">{testimonial.mentorName}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {testimonial.domain} • {testimonial.sessionsCompleted} sessions
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Success Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">85%</h3>
              <p className="text-gray-600 dark:text-gray-400">Job Placement Rate</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">40%</h3>
              <p className="text-gray-600 dark:text-gray-400">Salary Increase</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">4.9/5</h3>
              <p className="text-gray-600 dark:text-gray-400">Satisfaction Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-white/10 dark:bg-gray-800/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ❓ Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about our mentorship program
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors rounded-2xl"
                >
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <Minus className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <Plus className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have accelerated their learning with our expert mentors
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mentorship/mentors"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Calendar className="h-5 w-5 inline mr-2" />
              Book Your First Session
            </Link>
            <Link
              to="/mentorship/apply"
              className="bg-purple-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-700"
            >
              <UserPlus className="h-5 w-5 inline mr-2" />
              Apply as Mentor
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedMentor && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          mentor={selectedMentor}
        />
      )}
    </div>
  );
};

export default MentorshipIndexPage;
