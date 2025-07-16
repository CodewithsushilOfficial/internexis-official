import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Clock, 
  Languages, 
  Award, 
  BookOpen, 
  Users, 
  CheckCircle, 
  ArrowLeft,
  MessageCircle,
  ExternalLink,
  Calendar,
  Code,
  Heart
} from 'lucide-react';
import BookingModal from '../../components/Mentorship/BookingModal';
import TestimonialCard from '../../components/Mentorship/TestimonialCard';

interface Mentor {
  id: string;
  name: string;
  image: string;
  domain: string;
  stack: string[];
  rating: number;
  reviewCount: number;
  experience: string;
  available: boolean;
  languages: string[];
  price: number;
  location: string;
  bio: string;
  sessionsCompleted: number;
  company: string;
  linkedin: string;
  github?: string;
  achievements: string[];
  skills: string[];
  availability: string[];
  expertise: string[];
  testimonials: Array<{
    studentName: string;
    quote: string;
    image: string;
    college: string;
    course: string;
    stars: number;
    sessionsCompleted: number;
  }>;
}

const MentorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In a real app, this would fetch mentor data from API
    // For demo, we'll use mock data
    const mockMentor: Mentor = {
      id: id || '1',
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9a8e299?w=300&h=300&fit=crop&crop=face',
      domain: 'Full Stack Development',
      stack: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      rating: 4.9,
      reviewCount: 127,
      experience: '5+ years',
      available: true,
      languages: ['English', 'Hindi', 'Tamil'],
      price: 60,
      location: 'Bangalore, India',
      bio: 'Experienced Full Stack Developer with 5+ years at top tech companies. Passionate about mentoring and helping developers grow their careers. Specialized in React, Node.js, and cloud technologies.',
      sessionsCompleted: 234,
      company: 'Google',
      linkedin: 'https://linkedin.com/in/priyasharma',
      github: 'https://github.com/priyasharma',
      achievements: [
        'Senior Software Engineer at Google',
        'React Core Contributor',
        'Tech Speaker at 15+ conferences',
        'Mentored 200+ developers'
      ],
      skills: [
        'React & Redux',
        'Node.js & Express',
        'MongoDB & PostgreSQL',
        'AWS & Docker',
        'System Design',
        'Career Guidance'
      ],
      availability: [
        'Monday - Friday: 7 PM - 10 PM IST',
        'Saturday: 2 PM - 8 PM IST',
        'Sunday: 10 AM - 6 PM IST'
      ],
      expertise: [
        'Full Stack Web Development',
        'React.js & Modern Frontend',
        'Backend Development',
        'Cloud & DevOps',
        'System Design',
        'Career Guidance'
      ],
      testimonials: [
        {
          studentName: 'Rahul Kumar',
          quote: 'Priya helped me land my dream job at Microsoft. Her guidance on system design and React best practices was invaluable!',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          college: 'IIT Delhi',
          course: 'Computer Science',
          stars: 5,
          sessionsCompleted: 8
        },
        {
          studentName: 'Anita Patel',
          quote: 'Amazing mentor! She breaks down complex concepts into simple terms. My React skills improved dramatically after just 3 sessions.',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          college: 'NIT Surat',
          course: 'Information Technology',
          stars: 5,
          sessionsCompleted: 5
        }
      ]
    };

    setMentor(mockMentor);
    document.title = `${mockMentor.name} - Mentor Profile | Internexis`;
  }, [id]);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading mentor profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/mentorship/mentors"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Mentors
          </Link>

          {/* Mentor Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl mb-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="relative">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white/30 dark:border-gray-600/30"
                />
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                  mentor.available ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {mentor.name}
                  </h1>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    mentor.available 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {mentor.available ? 'Available' : 'Busy'}
                  </div>
                </div>

                <p className="text-xl text-purple-600 dark:text-purple-400 font-semibold mb-2">
                  {mentor.domain} • {mentor.company}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(mentor.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {mentor.rating} ({mentor.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mentor.location}
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {mentor.experience}
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-1" />
                    {mentor.sessionsCompleted} sessions
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {mentor.bio}
                </p>

                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    ₹{mentor.price}<span className="text-base font-normal text-gray-500"> / 30 min</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    {mentor.github && (
                      <a
                        href={mentor.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors"
                      >
                        <Code className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  disabled={!mentor.available}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    mentor.available
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                >
                  <Calendar className="h-5 w-5 inline mr-2" />
                  {mentor.available ? 'Book Session' : 'Unavailable'}
                </button>
                
                <button className="px-8 py-3 bg-white/20 dark:bg-gray-800/20 text-gray-800 dark:text-white rounded-full font-semibold border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 transform hover:scale-105">
                  <MessageCircle className="h-5 w-5 inline mr-2" />
                  Send Message
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpen },
              { id: 'skills', label: 'Skills & Expertise', icon: Code },
              { id: 'testimonials', label: 'Testimonials', icon: Heart },
              { id: 'availability', label: 'Availability', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/20 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Key Achievements
                  </h3>
                  <ul className="space-y-3">
                    {mentor.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <Languages className="h-5 w-5 mr-2" />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-8">
                <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {mentor.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 text-center"
                      >
                        <span className="text-gray-800 dark:text-white font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Areas of Expertise
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mentor.expertise.map((area, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    What Students Say
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Real feedback from students who've worked with {mentor.name}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mentor.testimonials.map((testimonial, index) => (
                    <TestimonialCard
                      key={index}
                      {...testimonial}
                      mentorName={mentor.name}
                      domain={mentor.domain}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Available Hours (IST)
                </h3>
                <div className="space-y-3">
                  {mentor.availability.map((slot, index) => (
                    <div key={index} className="flex items-center">
                      <Clock className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{slot}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Note:</strong> Times are flexible and can be adjusted based on mutual availability. 
                    Sessions are typically 30 minutes long but can be extended as needed.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        mentor={{
          id: mentor.id,
          name: mentor.name,
          image: mentor.image,
          domain: mentor.domain,
          price: mentor.price
        }}
      />
    </div>
  );
};

export default MentorProfilePage;
