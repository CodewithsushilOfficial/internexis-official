import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Users, 
  Target, 
  Heart, 
  BookOpen, 
  MessageCircle, 
  Search, 
  CheckCircle, 
  Award, 
  Globe, 
  Zap, 
  Shield, 
  ArrowRight, 
  Star,
  Clock,
  Code,
  Smartphone,
  Brain,
  Database,
  Palette,
  ArrowLeft,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutMentorshipPage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    document.title = 'About Mentorship Program - Internexis Technologies';
  }, []);

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Explore Mentors',
      description: 'Browse through our diverse pool of mentors based on your interests and career goals. Filter by technology, experience level, and availability.',
      icon: Search,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: '02',
      title: 'Choose & Connect',
      description: 'Select your preferred mentor and reach out directly via WhatsApp for instant communication or book a structured Google Meet session.',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      step: '03',
      title: 'Get Mentored',
      description: 'Engage in meaningful conversations, ask questions, get project feedback, prepare for interviews, and receive career guidance.',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '04',
      title: 'Grow & Learn',
      description: 'Apply the knowledge gained, work on recommended projects, build your portfolio, and track your progress with continuous support.',
      icon: Target,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const menteesBenefits = [
    {
      icon: Users,
      title: '1:1 Doubt Solving',
      description: 'Get personalized attention from industry experts who understand your specific challenges and provide tailored solutions.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      title: 'Resume & Project Reviews',
      description: 'Receive professional feedback on your resume, projects, and portfolio to make them industry-ready and impressive.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Career Guidance & Mock Interviews',
      description: 'Get career roadmaps, interview preparation, and mock interview sessions to boost your confidence and success rate.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Direct Access to Industry Professionals',
      description: 'Connect directly with working professionals from top companies who share real-world insights and experiences.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Award,
      title: 'Mentorship Certificate',
      description: 'Receive official recognition of your learning journey and commitment to professional development.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Globe,
      title: 'Flexible Communication',
      description: 'Communicate in your preferred language (Hindi/English) with convenient WhatsApp and Google Meet integration.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const mentorsBenefits = [
    {
      icon: Award,
      title: 'Official Recognition by Internexis',
      description: 'Get featured on our website, social media, and marketing materials as a recognized industry expert.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: CheckCircle,
      title: 'Certificate of Contribution',
      description: 'Receive official certification acknowledging your valuable contribution to the tech community.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Personal Branding & Networking',
      description: 'Build your professional brand, expand your network, and establish yourself as a thought leader.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MessageCircle,
      title: 'Host Workshops & Webinars',
      description: 'Opportunity to conduct workshops, webinars, and group sessions to reach a broader audience.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Give Back to Community',
      description: 'Make a meaningful impact by sharing your knowledge and helping the next generation succeed.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Star,
      title: 'Professional Growth',
      description: 'Enhance your leadership, communication, and teaching skills while staying connected with emerging technologies.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const whoIsThisFor = [
    {
      title: 'Students & Beginners',
      description: 'Perfect for students starting their tech journey who need guidance, doubt resolution, and career direction.',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Career Changers',
      description: 'Ideal for professionals looking to transition into tech or switch between different technology domains.',
      icon: Target,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Aspiring Developers',
      description: 'Great for those learning programming, web development, mobile apps, or any other technical skills.',
      icon: Code,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Experienced Professionals',
      description: 'Valuable for experienced professionals who want to mentor others and give back to the community.',
      icon: Users,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const whyChooseReasons = [
    {
      icon: Zap,
      title: 'Learn from professionals in real-time',
      description: 'Get instant feedback and guidance from working professionals who understand current industry standards.'
    },
    {
      icon: Heart,
      title: '100% human-to-human mentorship',
      description: 'No bots, no automated responses - just genuine human connections and personalized guidance.'
    },
    {
      icon: Target,
      title: 'Domain-based matching with experts',
      description: 'Connect with mentors who specialize in your specific area of interest or career goal.'
    },
    {
      icon: Globe,
      title: 'Hindi + English communication supported',
      description: 'Communicate comfortably in your preferred language with mentors who understand your context.'
    },
    {
      icon: MessageCircle,
      title: 'Built-in contact & scheduling features',
      description: 'Seamless integration with WhatsApp and Google Meet for easy communication and scheduling.'
    },
    {
      icon: Shield,
      title: 'Verified mentor profiles',
      description: 'All mentors are verified professionals with proven industry experience and expertise.'
    }
  ];

  const domains = [
    { name: 'Web Development', icon: Code, mentors: 15, color: 'from-blue-500 to-cyan-500' },
    { name: 'App Development', icon: Smartphone, mentors: 12, color: 'from-green-500 to-emerald-500' },
    { name: 'AI/ML', icon: Brain, mentors: 8, color: 'from-purple-500 to-pink-500' },
    { name: 'Data Science', icon: Database, mentors: 10, color: 'from-orange-500 to-red-500' },
    { name: 'UI/UX Design', icon: Palette, mentors: 6, color: 'from-pink-500 to-rose-500' },
    { name: 'Cybersecurity', icon: Shield, mentors: 5, color: 'from-gray-500 to-slate-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Link 
            to="/mentorship"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Mentorship Home
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🌱 What is Internexis Mentorship?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Internexis Mentorship is a student-focused platform that enables personalized one-on-one connections 
              between learners and experienced professionals. From beginner-level guidance to advanced project support, 
              our mentors are ready to walk with you on your tech journey.
            </p>
          </motion.div>

          {/* Who is this for */}
          <section className="mb-20">
            <div data-aos="fade-up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                🔍 Who is this for?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whoIsThisFor.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-6`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="mb-20">
            <div data-aos="fade-up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ⚙️ How This Platform Works
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Available Domains */}
          <section className="mb-20">
            <div data-aos="fade-up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                💻 Available Domains
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Connect with mentors across various technology domains
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {domains.map((domain, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${domain.color} rounded-full flex items-center justify-center mb-4`}>
                    <domain.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{domain.name}</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold">{domain.mentors}+ Mentors</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Benefits for Students */}
          <section className="mb-20">
            <div data-aos="fade-up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ✅ Benefits for Students (Mentees)
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menteesBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mb-4`}>
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Benefits for Mentors */}
          <section className="mb-20">
            <div data-aos="fade-up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🧑‍🏫 Benefits for Mentors
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentorsBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mb-4`}>
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Why Choose Internexis */}
          <section className="mb-20">
            <div data-aos="fade-up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                🙋‍♂️ Why Choose Internexis Mentorship?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyChooseReasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <reason.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{reason.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Success Metrics */}
          <section className="mb-20">
            <div data-aos="fade-up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                📊 Our Impact
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: '500+', label: 'Active Mentees', icon: Users },
                { number: '50+', label: 'Expert Mentors', icon: Award },
                { number: '95%', label: 'Success Rate', icon: CheckCircle },
                { number: '1000+', label: 'Sessions Completed', icon: Clock },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <metric.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{metric.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-20">
            <div data-aos="fade-up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📬 Get in Touch
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Have questions about our mentorship program? We're here to help!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Email Support</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">help.internexis@gmail.com</p>
                <a
                  href="mailto:help.internexis@gmail.com"
                  className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  Send Email
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">WhatsApp</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Quick support via WhatsApp</p>
                <a
                  href="https://wa.me/your-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 transition-colors font-medium"
                >
                  Chat Now
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Website</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Visit our main website</p>
                <a
                  href="https://www.internexis-technologies.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 transition-colors font-medium"
                >
                  Visit Website
                </a>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/30 dark:border-gray-700/30 shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ready to Start Your Mentorship Journey?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Whether you're looking for guidance or want to share your knowledge, we're here to connect you with the right people.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/mentorship/mentors"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Find a Mentor
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
                <Link
                  to="/mentorship/apply"
                  className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-600 dark:border-purple-400 flex items-center justify-center"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Become a Mentor
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutMentorshipPage;
