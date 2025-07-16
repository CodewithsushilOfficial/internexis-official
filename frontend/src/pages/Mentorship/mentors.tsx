import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  MessageCircle, 
  Calendar, 
  Star, 
  MapPin, 
  Code, 
  Smartphone, 
  Brain, 
  Database, 
  Palette, 
  Shield,
  Search,
  Award,
  Clock,
  Users,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Mentor {
  id: number;
  name: string;
  designation: string;
  company: string;
  image: string;
  techStack: string[];
  domain: string;
  experience: string;
  rating: number;
  totalSessions: number;
  location: string;
  bio: string;
  languages: string[];
  availability: string;
  whatsapp: string;
  meetingLink: string;
}

const MentorsPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    document.title = 'Our Mentors - Internexis Technologies';
    
    // Sample mentor data
    const sampleMentors: Mentor[] = [
      {
        id: 1,
        name: 'Sakshi Jain',
        designation: 'Frontend Engineer',
        company: 'Infosys',
        image: '/api/placeholder/150/150',
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
        domain: 'Web Development',
        experience: '3+ years',
        rating: 4.8,
        totalSessions: 150,
        location: 'Bangalore, India',
        bio: 'Passionate frontend developer with expertise in modern React ecosystems. Love mentoring aspiring developers.',
        languages: ['Hindi', 'English'],
        availability: 'Weekends',
        whatsapp: 'https://wa.me/1234567890',
        meetingLink: 'https://calendly.com/sakshi-mentor'
      },
      {
        id: 2,
        name: 'Rahul Sharma',
        designation: 'Full Stack Developer',
        company: 'TCS',
        image: '/api/placeholder/150/150',
        techStack: ['Node.js', 'MongoDB', 'Express', 'React'],
        domain: 'Web Development',
        experience: '4+ years',
        rating: 4.9,
        totalSessions: 200,
        location: 'Mumbai, India',
        bio: 'MERN stack expert with strong problem-solving skills. Helping students build real-world projects.',
        languages: ['Hindi', 'English'],
        availability: 'Evenings',
        whatsapp: 'https://wa.me/1234567891',
        meetingLink: 'https://calendly.com/rahul-mentor'
      },
      {
        id: 3,
        name: 'Priya Patel',
        designation: 'Mobile App Developer',
        company: 'Wipro',
        image: '/api/placeholder/150/150',
        techStack: ['Flutter', 'Dart', 'Firebase', 'Android'],
        domain: 'App Development',
        experience: '3+ years',
        rating: 4.7,
        totalSessions: 120,
        location: 'Pune, India',
        bio: 'Flutter enthusiast with experience in cross-platform development. Passionate about mobile UX.',
        languages: ['Hindi', 'English', 'Gujarati'],
        availability: 'Flexible',
        whatsapp: 'https://wa.me/1234567892',
        meetingLink: 'https://calendly.com/priya-mentor'
      },
      {
        id: 4,
        name: 'Arjun Gupta',
        designation: 'Data Scientist',
        company: 'Amazon',
        image: '/api/placeholder/150/150',
        techStack: ['Python', 'Machine Learning', 'TensorFlow', 'AWS'],
        domain: 'AI/ML',
        experience: '5+ years',
        rating: 4.9,
        totalSessions: 180,
        location: 'Hyderabad, India',
        bio: 'ML Engineer with deep expertise in NLP and Computer Vision. Love teaching complex concepts simply.',
        languages: ['Hindi', 'English'],
        availability: 'Weekends',
        whatsapp: 'https://wa.me/1234567893',
        meetingLink: 'https://calendly.com/arjun-mentor'
      },
      {
        id: 5,
        name: 'Sneha Reddy',
        designation: 'UI/UX Designer',
        company: 'Zomato',
        image: '/api/placeholder/150/150',
        techStack: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        domain: 'UI/UX Design',
        experience: '4+ years',
        rating: 4.8,
        totalSessions: 140,
        location: 'Delhi, India',
        bio: 'Product designer with focus on user-centered design. Helping students build stunning interfaces.',
        languages: ['Hindi', 'English', 'Telugu'],
        availability: 'Evenings',
        whatsapp: 'https://wa.me/1234567894',
        meetingLink: 'https://calendly.com/sneha-mentor'
      },
      {
        id: 6,
        name: 'Vikram Singh',
        designation: 'Cybersecurity Analyst',
        company: 'Deloitte',
        image: '/api/placeholder/150/150',
        techStack: ['Ethical Hacking', 'Network Security', 'Python', 'Kali Linux'],
        domain: 'Cybersecurity',
        experience: '6+ years',
        rating: 4.9,
        totalSessions: 90,
        location: 'Chennai, India',
        bio: 'Cybersecurity expert with hands-on experience in penetration testing and security audits.',
        languages: ['Hindi', 'English'],
        availability: 'Weekends',
        whatsapp: 'https://wa.me/1234567895',
        meetingLink: 'https://calendly.com/vikram-mentor'
      }
    ];

    setMentors(sampleMentors);
    setFilteredMentors(sampleMentors);
  }, []);

  useEffect(() => {
    let filtered = mentors;

    if (selectedDomain !== 'All') {
      filtered = filtered.filter(mentor => mentor.domain === selectedDomain);
    }

    if (searchQuery) {
      filtered = filtered.filter(mentor => 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
        mentor.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMentors(filtered);
  }, [selectedDomain, searchQuery, mentors]);

  const domains = ['All', 'Web Development', 'App Development', 'AI/ML', 'Data Science', 'UI/UX Design', 'Cybersecurity'];

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'Web Development': return Code;
      case 'App Development': return Smartphone;
      case 'AI/ML': return Brain;
      case 'Data Science': return Database;
      case 'UI/UX Design': return Palette;
      case 'Cybersecurity': return Shield;
      default: return Code;
    }
  };

  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'Web Development': return 'from-blue-500 to-cyan-500';
      case 'App Development': return 'from-green-500 to-emerald-500';
      case 'AI/ML': return 'from-purple-500 to-pink-500';
      case 'Data Science': return 'from-orange-500 to-red-500';
      case 'UI/UX Design': return 'from-pink-500 to-rose-500';
      case 'Cybersecurity': return 'from-gray-500 to-slate-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Link 
            to="/mentorship"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Mentorship Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              👨‍🏫 Our Expert Mentors
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connect with industry professionals who are passionate about sharing their knowledge and helping you grow.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="relative z-10 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search mentors, skills, or companies..."
                className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-full border border-white/30 dark:border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Domain Filter */}
            <div className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedDomain === domain
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="relative z-10 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Showing {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''} 
              {selectedDomain !== 'All' && ` in ${selectedDomain}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor, index) => {
              const DomainIcon = getDomainIcon(mentor.domain);
              return (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  {/* Mentor Image & Basic Info */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white/30 dark:border-gray-700/30"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r ${getDomainColor(mentor.domain)} rounded-full flex items-center justify-center`}>
                        <DomainIcon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                      👩‍💻 {mentor.name}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium mb-1">
                      💼 {mentor.designation}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      🏢 {mentor.company}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {mentor.rating}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {mentor.totalSessions} sessions
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      🛠️ Tech Stack:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {mentor.bio}
                    </p>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {mentor.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Available: {mentor.availability}
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      {mentor.experience} experience
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={mentor.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-center py-3 px-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <span className="flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        📱 WhatsApp
                      </span>
                    </a>
                    <a
                      href={mentor.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-center py-3 px-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <span className="flex items-center justify-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        📅 Book Meet
                      </span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredMentors.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                No mentors found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSelectedDomain('All');
                  setSearchQuery('');
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/30 dark:border-gray-700/30 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Want to Become a Mentor?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Share your knowledge and help shape the next generation of tech professionals.
            </p>
            <Link
              to="/mentorship/apply"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Apply as a Mentor
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
