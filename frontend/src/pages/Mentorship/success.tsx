import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, User, MessageCircle, Mail, Phone, ArrowRight, Home, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookingDetails {
  bookingId: string;
  mentor: {
    name: string;
    image: string;
    domain: string;
  };
  topic: string;
  date: string;
  time: string;
  email: string;
  whatsapp: string;
  sessionPack: {
    sessions: number;
    price: number;
  };
  status: string;
}

const BookingSuccessPage: React.FC = () => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    // Get booking details from localStorage
    const lastBooking = localStorage.getItem('lastBooking');
    if (lastBooking) {
      setBookingDetails(JSON.parse(lastBooking));
    }

    document.title = 'Booking Confirmed - Internexis Mentorship';
  }, []);

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            No booking details found
          </h1>
          <Link 
            to="/mentorship" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Go back to Mentorship
          </Link>
        </div>
      </div>
    );
  }

  const whatsappLink = `https://wa.me/91${bookingDetails.whatsapp.replace(/\D/g, '')}?text=Hi! I have booked a mentorship session with ${bookingDetails.mentor.name}. Booking ID: ${bookingDetails.bookingId}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🎉 Booking Confirmed!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your mentorship session has been successfully booked. Get ready for an amazing learning experience!
            </p>
          </motion.div>

          {/* Booking Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Booking Details
              </h2>
              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-2 rounded-full font-semibold">
                #{bookingDetails.bookingId}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mentor Info */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <img 
                    src={bookingDetails.mentor.image} 
                    alt={bookingDetails.mentor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/30 dark:border-gray-600/30 mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {bookingDetails.mentor.name}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">
                      {bookingDetails.mentor.domain}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">Session Date</div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {new Date(bookingDetails.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">Session Time</div>
                      <div className="text-gray-600 dark:text-gray-400">{bookingDetails.time}</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MessageCircle className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">Session Topic</div>
                      <div className="text-gray-600 dark:text-gray-400">{bookingDetails.topic}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment & Contact Info */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 dark:text-gray-400">Package</span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {bookingDetails.sessionPack.sessions} Session{bookingDetails.sessionPack.sessions > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Paid</span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      ₹{bookingDetails.sessionPack.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">Email</div>
                      <div className="text-gray-600 dark:text-gray-400">{bookingDetails.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">WhatsApp</div>
                      <div className="text-gray-600 dark:text-gray-400">{bookingDetails.whatsapp}</div>
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Message on WhatsApp
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-3xl p-8 border border-blue-500/20 dark:border-purple-500/20 shadow-xl mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              📋 What's Next?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Mail,
                  title: 'Check Your Email',
                  description: 'You\'ll receive a confirmation email with meeting details and preparation tips.',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: MessageCircle,
                  title: 'WhatsApp Reminder',
                  description: 'We\'ll send you a WhatsApp reminder 30 minutes before your session.',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: User,
                  title: 'Prepare Questions',
                  description: 'Come prepared with specific questions to maximize your session value.',
                  color: 'from-purple-500 to-pink-500'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/mentorship"
              className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Book Another Session
            </Link>
            
            <Link
              to="/"
              className="flex items-center justify-center bg-white/20 dark:bg-gray-800/20 text-gray-800 dark:text-white px-8 py-3 rounded-full font-semibold border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 transform hover:scale-105"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
