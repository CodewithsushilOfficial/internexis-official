import React, { useEffect } from 'react';
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
  ChevronRight
} from 'lucide-react';

const MentorshipIndexPage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    document.title = 'Mentorship Platform - Internexis Technologies';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join Internexis Mentorship Platform - Connect with industry experts for personalized guidance in tech, career development, and skill building.');
    }
  }, []);

  const mentorDomains = [
    { icon: Code, name: 'Web Development', count: '15+ Mentors', color: 'from-blue-500 to-cyan-500' },
    { icon: Smartphone, name: 'App Development', count: '12+ Mentors', color: 'from-green-500 to-emerald-500' },
    { icon: Brain, name: 'AI/ML', count: '8+ Mentors', color: 'from-purple-500 to-pink-500' },
    { icon: Database, name: 'Data Science', count: '10+ Mentors', color: 'from-orange-500 to-red-500' },
    { icon: Palette, name: 'UI/UX Design', count: '6+ Mentors', color: 'from-pink-500 to-rose-500' },
    { icon: Shield, name: 'Cybersecurity', count: '5+ Mentors', color: 'from-gray-500 to-slate-500' },
  ];

  const benefits = [
    { icon: Users, title: '1:1 Doubt Solving', desc: 'Get personalized attention and clear your doubts instantly' },
    { icon: BookOpen, title: 'Resume & Project Reviews', desc: 'Professional feedback on your resume and projects' },
    { icon: Target, title: 'Career Guidance', desc: 'Mock interviews and career roadmap planning' },
    { icon: Zap, title: 'Industry Professionals', desc: 'Direct access to experts from top companies' },
    { icon: Award, title: 'Mentorship Certificate', desc: 'Official recognition of your learning journey' },
    { icon: Globe, title: 'Flexible Communication', desc: 'Hindi + English support with WhatsApp & Meet integration' },
  ];

  const howItWorks = [
    { step: '01', title: 'Explore Mentors', desc: 'Browse profiles based on your interest (Web, App, AI, etc.)', icon: Search },
    { step: '02', title: 'Choose & Connect', desc: 'Reach out via WhatsApp or book a Google Meet slot', icon: MessageCircle },
    { step: '03', title: 'Get Mentored', desc: 'Ask doubts, get help on projects, or prepare for interviews', icon: Users },
    { step: '04', title: 'Grow & Learn', desc: 'Apply what you learn, build your skills, and track progress', icon: Target },
  ];

  const faqs = [
    { q: 'Is this mentorship free?', a: 'Yes, connecting with a mentor is free. If any mentor charges for advanced sessions, it will be informed transparently.' },
    { q: 'How many times can I contact a mentor?', a: 'You can contact anytime, but we recommend respectful, scheduled learning.' },
    { q: 'Can I become a mentor if I\'m a fresher?', a: 'If you\'ve strong domain knowledge and communication skills, yes!' },
    { q: 'Will I get a certificate?', a: 'Yes! Both mentees and mentors can receive certificates (launching soon).' },
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
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              🎓 Empowering Future Tech Leaders
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
              Through Mentorship
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              At Internexis, we believe that the right guidance can transform learning. Our mentorship program 
              connects aspiring students with real-world tech experts — for knowledge, clarity, career growth, and confidence.
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
                🔍 Explore Mentors
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/mentorship/apply"
              className="group bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-600 dark:border-purple-400"
            >
              <span className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                🙋‍♂️ Apply as a Mentor
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/mentorship/about"
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                📖 Learn How It Works
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mentor Domains Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🤝 Meet the Experts Guiding You
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover mentors from top domains like Web Development, App Development, AI/ML, Data Science, UI/UX Design, and more.
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

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white/10 dark:bg-gray-800/10">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ⚙️ How Internexis Mentorship Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🌟 Benefits of Mentorship
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the advantages of joining our mentorship program as a student or mentor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🙋‍♂️ Why Choose Internexis Mentorship?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Learn from professionals in real-time', color: 'from-yellow-500 to-orange-500' },
              { icon: Heart, title: '100% human-to-human mentorship (no bots)', color: 'from-red-500 to-pink-500' },
              { icon: Target, title: 'Domain-based matching with experts', color: 'from-blue-500 to-cyan-500' },
              { icon: Globe, title: 'Hindi + English communication supported', color: 'from-green-500 to-emerald-500' },
              { icon: MessageCircle, title: 'Built-in contact & scheduling features', color: 'from-purple-500 to-pink-500' },
              { icon: Calendar, title: 'WhatsApp + Google Meet integration', color: 'from-indigo-500 to-purple-500' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 group"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ❓ Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-xl"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 pl-7">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <div data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              📬 Support & Contact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Need Help? Have Questions?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl"
            >
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Email Support</h3>
              <p className="text-gray-600 dark:text-gray-300">help.internexis@gmail.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl"
            >
              <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">WhatsApp Support</h3>
              <a href="https://wa.me/your-number" className="text-green-600 hover:text-green-700 transition-colors">
                Click to Chat
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/30 dark:border-gray-700/30 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of students who have transformed their careers through our mentorship program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/mentorship/mentors"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Find Your Mentor
              </Link>
              <Link
                to="/mentorship/apply"
                className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-600 dark:border-purple-400"
              >
                Become a Mentor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MentorshipIndexPage;
