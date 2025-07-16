import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Search,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import MentorCard from '../../components/Mentorship/MentorCard';
import BookingModal from '../../components/Mentorship/BookingModal';

interface Mentor {
  id: string;
  name: string;
  designation: string;
  company: string;
  image: string;
  stack: string[];
  domain: string;
  experience: string;
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  location: string;
  bio: string;
  languages: string[];
  availability: string;
  price: number;
  available: boolean;
  whatsapp: string;
  meetingLink: string;
  specialties: string[];
  linkedin: string;
  github?: string;
}

const MentorsPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Mock data for mentors
  const mockMentors: Mentor[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      designation: 'Senior Software Engineer',
      company: 'Google',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9a8e299?w=300&h=300&fit=crop&crop=face',
      stack: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      domain: 'Web Development',
      experience: '5+ years',
      rating: 4.9,
      reviewCount: 127,
      sessionsCompleted: 234,
      location: 'Bangalore, India',
      bio: 'Experienced Full Stack Developer with 5+ years at top tech companies. Passionate about mentoring and helping developers grow their careers.',
      languages: ['English', 'Hindi', 'Tamil'],
      availability: 'Weekends',
      price: 60,
      available: true,
      whatsapp: '+91 9876543210',
      meetingLink: 'https://meet.google.com/priya-sharma',
      specialties: ['React.js', 'System Design', 'Career Guidance'],
      linkedin: 'https://linkedin.com/in/priyasharma',
      github: 'https://github.com/priyasharma'
    },
    {
      id: '2',
      name: 'Arjun Patel',
      designation: 'AI/ML Engineer',
      company: 'Microsoft',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      stack: ['Python', 'TensorFlow', 'PyTorch', 'AWS', 'Scikit-learn'],
      domain: 'AI/ML',
      experience: '4+ years',
      rating: 4.8,
      reviewCount: 89,
      sessionsCompleted: 156,
      location: 'Mumbai, India',
      bio: 'AI/ML Engineer at Microsoft with expertise in deep learning and computer vision. Love teaching complex ML concepts in simple terms.',
      languages: ['English', 'Hindi', 'Gujarati'],
      availability: 'Weekday evenings',
      price: 60,
      available: true,
      whatsapp: '+91 9876543211',
      meetingLink: 'https://meet.google.com/arjun-patel',
      specialties: ['Deep Learning', 'Computer Vision', 'NLP'],
      linkedin: 'https://linkedin.com/in/arjunpatel',
      github: 'https://github.com/arjunpatel'
    },
    {
      id: '3',
      name: 'Sneha Reddy',
      designation: 'Senior UX Designer',
      company: 'Flipkart',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      stack: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Framer'],
      domain: 'UI/UX Design',
      experience: '3+ years',
      rating: 4.7,
      reviewCount: 143,
      sessionsCompleted: 189,
      location: 'Hyderabad, India',
      bio: 'Senior UX Designer at Flipkart. Specialized in mobile app design and user research. Helped 100+ designers improve their portfolios.',
      languages: ['English', 'Telugu', 'Hindi'],
      availability: 'Flexible hours',
      price: 60,
      available: false,
      whatsapp: '+91 9876543212',
      meetingLink: 'https://meet.google.com/sneha-reddy',
      specialties: ['Mobile UX', 'User Research', 'Design Systems'],
      linkedin: 'https://linkedin.com/in/snehareddy'
    },
    {
      id: '4',
      name: 'Rohit Kumar',
      designation: 'Data Scientist',
      company: 'Amazon',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      stack: ['Python', 'R', 'SQL', 'Tableau', 'Apache Spark'],
      domain: 'Data Science',
      experience: '6+ years',
      rating: 4.9,
      reviewCount: 98,
      sessionsCompleted: 267,
      location: 'Pune, India',
      bio: 'Data Scientist at Amazon with expertise in machine learning and statistical analysis. Passionate about turning data into actionable insights.',
      languages: ['English', 'Hindi', 'Marathi'],
      availability: 'Weekends',
      price: 60,
      available: true,
      whatsapp: '+91 9876543213',
      meetingLink: 'https://meet.google.com/rohit-kumar',
      specialties: ['Machine Learning', 'Statistical Analysis', 'Data Visualization'],
      linkedin: 'https://linkedin.com/in/rohitkumar',
      github: 'https://github.com/rohitkumar'
    },
    {
      id: '5',
      name: 'Kavya Nair',
      designation: 'Mobile App Developer',
      company: 'Swiggy',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9a8e299?w=300&h=300&fit=crop&crop=face',
      stack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      domain: 'App Development',
      experience: '4+ years',
      rating: 4.6,
      reviewCount: 76,
      sessionsCompleted: 134,
      location: 'Chennai, India',
      bio: 'Mobile App Developer at Swiggy with expertise in cross-platform development. Love creating seamless user experiences on mobile devices.',
      languages: ['English', 'Tamil', 'Malayalam'],
      availability: 'Weekday evenings',
      price: 60,
      available: true,
      whatsapp: '+91 9876543214',
      meetingLink: 'https://meet.google.com/kavya-nair',
      specialties: ['React Native', 'Flutter', 'Mobile UX'],
      linkedin: 'https://linkedin.com/in/kavyanair',
      github: 'https://github.com/kavyanair'
    },
    {
      id: '6',
      name: 'Vikram Singh',
      designation: 'Cybersecurity Specialist',
      company: 'Infosys',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      stack: ['Penetration Testing', 'Ethical Hacking', 'Security Auditing', 'CISSP', 'CEH'],
      domain: 'Cybersecurity',
      experience: '7+ years',
      rating: 4.8,
      reviewCount: 67,
      sessionsCompleted: 198,
      location: 'Delhi, India',
      bio: 'Cybersecurity Specialist at Infosys with expertise in penetration testing and security auditing. Passionate about making the digital world safer.',
      languages: ['English', 'Hindi', 'Punjabi'],
      availability: 'Flexible hours',
      price: 60,
      available: true,
      whatsapp: '+91 9876543215',
      meetingLink: 'https://meet.google.com/vikram-singh',
      specialties: ['Penetration Testing', 'Security Auditing', 'Ethical Hacking'],
      linkedin: 'https://linkedin.com/in/vikramsingh'
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    document.title = 'Find Your Perfect Mentor - Internexis Technologies';
    setMentors(mockMentors);
  }, []);

  const domains = ['All', 'Web Development', 'App Development', 'AI/ML', 'Data Science', 'UI/UX Design', 'Cybersecurity'];
  const languages = ['All', 'English', 'Hindi', 'Tamil', 'Telugu', 'Gujarati', 'Marathi', 'Malayalam', 'Punjabi'];
  const ratings = ['All', '4.5+', '4.0+', '3.5+'];
  const availabilities = ['All', 'Available', 'Busy'];

  // Filter and sort mentors
  const filteredAndSortedMentors = useMemo(() => {
    let filtered = mentors.filter(mentor => {
      const matchesDomain = selectedDomain === 'All' || mentor.domain === selectedDomain;
      const matchesLanguage = selectedLanguage === 'All' || mentor.languages.includes(selectedLanguage);
      const matchesRating = selectedRating === 'All' || mentor.rating >= parseFloat(selectedRating);
      const matchesAvailability = selectedAvailability === 'All' || 
        (selectedAvailability === 'Available' && mentor.available) ||
        (selectedAvailability === 'Busy' && !mentor.available);
      const matchesSearch = searchQuery === '' || 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.stack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
        mentor.company.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDomain && matchesLanguage && matchesRating && matchesAvailability && matchesSearch;
    });

    // Sort mentors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'sessions':
          return b.sessionsCompleted - a.sessionsCompleted;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [mentors, selectedDomain, selectedLanguage, selectedRating, selectedAvailability, searchQuery, sortBy]);

  const handleBookNow = (mentorId: string) => {
    const mentor = mentors.find(m => m.id === mentorId);
    if (mentor) {
      setSelectedMentor(mentor);
      setIsBookingModalOpen(true);
    }
  };

  const clearFilters = () => {
    setSelectedDomain('All');
    setSelectedLanguage('All');
    setSelectedRating('All');
    setSelectedAvailability('All');
    setSearchQuery('');
    setSortBy('rating');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🔍 Find Your Perfect Mentor
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Browse through our curated list of industry experts and find the perfect mentor for your learning journey.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-xl mb-8"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search mentors by name, technology, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              {/* Domain Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Domain</label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
                >
                  {domains.map(domain => (
                    <option key={domain} value={domain} className="bg-white dark:bg-gray-800">
                      {domain}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
                >
                  {languages.map(language => (
                    <option key={language} value={language} className="bg-white dark:bg-gray-800">
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
                >
                  {ratings.map(rating => (
                    <option key={rating} value={rating} className="bg-white dark:bg-gray-800">
                      {rating}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Availability</label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
                >
                  {availabilities.map(availability => (
                    <option key={availability} value={availability} className="bg-white dark:bg-gray-800">
                      {availability}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
                >
                  <option value="rating" className="bg-white dark:bg-gray-800">Rating</option>
                  <option value="experience" className="bg-white dark:bg-gray-800">Experience</option>
                  <option value="sessions" className="bg-white dark:bg-gray-800">Sessions</option>
                  <option value="name" className="bg-white dark:bg-gray-800">Name</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex justify-between items-center">
              <button
                onClick={clearFilters}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors"
              >
                Clear All Filters
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredAndSortedMentors.length} mentor{filteredAndSortedMentors.length !== 1 ? 's' : ''}
              </div>
            </div>
          </motion.div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedMentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <MentorCard
                  {...mentor}
                  onBookNow={handleBookNow}
                />
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredAndSortedMentors.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                No mentors found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your filters or search terms to find the perfect mentor for you.
              </p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Don't see what you're looking for?
              </h2>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Our mentorship program is constantly growing. Let us know what expertise you're seeking, and we'll help you find the right mentor.
              </p>
              <Link
                to="/mentorship/apply"
                className="inline-flex items-center bg-white text-purple-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Request a Mentor
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

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

export default MentorsPage;
