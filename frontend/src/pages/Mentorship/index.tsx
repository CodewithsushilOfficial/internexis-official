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
import TestimonialCard from '../../components/Mentorship/TestimonialCard';

const MentorshipIndexPage: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              🚀 Premium Mentorship
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
              Starting at <span className="text-purple-600 dark:text-purple-400">₹60/30min</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Get personalized 1-on-1 guidance from industry experts. Book sessions with top developers, designers, and tech professionals to accelerate your career growth.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              to="/mentorship/mentors"
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Browse Mentors
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/mentorship/apply"
              className="group bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-600 dark:border-purple-400"
            >
              <span className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Become a Mentor
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Users, number: '50+', label: 'Expert Mentors' },
              { icon: BookOpen, number: '500+', label: 'Sessions Completed' },
              { icon: TrendingUp, number: '95%', label: 'Success Rate' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Testimonials Carousel */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              💬 Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from students who transformed their careers through our mentorship program
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${activeTestimonial * 100}%` }}
                transition={{ duration: 0.5 }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-4xl mx-auto">
                      <TestimonialCard {...testimonial} />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeTestimonial === index
                      ? 'bg-purple-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Domains */}
      <section className="py-20 px-4 bg-white/10 dark:bg-gray-800/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              🎯 Expertise Areas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find mentors across various technology domains and specializations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentorDomains.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${domain.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <domain.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{domain.name}</h3>
                <p className="text-purple-600 dark:text-purple-400 font-semibold">{domain.count}</p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4">
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
