import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Clock, User, Mail, Phone, CreditCard, CheckCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: {
    id: string;
    name: string;
    image: string;
    domain: string;
    price: number;
  };
}

interface BookingData {
  topic: string;
  date: string;
  time: string;
  email: string;
  whatsapp: string;
  sessionPack: {
    sessions: number;
    price: number;
    discount: number;
  };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, mentor }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    topic: '',
    date: '',
    time: '',
    email: '',
    whatsapp: '',
    sessionPack: {
      sessions: 1,
      price: 60,
      discount: 0
    }
  });

  const sessionPackages = [
    {
      sessions: 1,
      price: 60,
      discount: 0,
      tagline: 'Try it out',
      popular: false
    },
    {
      sessions: 5,
      price: 250,
      discount: 50,
      tagline: 'Most Popular',
      popular: true
    },
    {
      sessions: 10,
      price: 480,
      discount: 120,
      tagline: 'Best Value',
      popular: false
    }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const steps = [
    { number: 1, title: 'Session Topic', description: 'What do you want to learn?' },
    { number: 2, title: 'Date & Time', description: 'Choose your preferred slot' },
    { number: 3, title: 'Contact Info', description: 'Your details for confirmation' },
    { number: 4, title: 'Session Pack', description: 'Choose your package' },
    { number: 5, title: 'Payment', description: 'Complete your booking' }
  ];

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store booking data in localStorage for demo
      localStorage.setItem('lastBooking', JSON.stringify({
        ...bookingData,
        mentor: mentor,
        bookingId: `BK${Date.now()}`,
        status: 'confirmed'
      }));
      
      toast.success('Booking confirmed! Check your email for details.');
      onClose();
      
      // Redirect to success page (you can implement routing here)
      window.location.href = '/mentorship/success';
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return bookingData.topic.trim().length > 0;
      case 2:
        return bookingData.date && bookingData.time;
      case 3:
        return bookingData.email && bookingData.whatsapp;
      case 4:
        return bookingData.sessionPack.sessions > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const resetModal = () => {
    setCurrentStep(1);
    setBookingData({
      topic: '',
      date: '',
      time: '',
      email: '',
      whatsapp: '',
      sessionPack: {
        sessions: 1,
        price: 60,
        discount: 0
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      resetModal();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center mb-4">
              <img 
                src={mentor.image} 
                alt={mentor.name}
                className="w-12 h-12 rounded-full border-2 border-white/30 mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{mentor.name}</h2>
                <p className="text-purple-100">{mentor.domain}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= step.number 
                      ? 'bg-white text-purple-600' 
                      : 'bg-white/20 text-white'
                  }`}>
                    {currentStep > step.number ? <CheckCircle className="h-4 w-4" /> : step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-1 mx-2 ${
                      currentStep > step.number ? 'bg-white' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-sm text-center">
              <span className="font-medium">{steps[currentStep - 1].title}</span>
              <span className="text-purple-100 ml-2">{steps[currentStep - 1].description}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: Session Topic */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    What would you like to learn in this session?
                  </h3>
                  <textarea
                    value={bookingData.topic}
                    onChange={(e) => setBookingData(prev => ({ ...prev, topic: e.target.value }))}
                    placeholder="e.g., React fundamentals, Career guidance, Code review, Project help..."
                    className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none"
                    rows={4}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Be specific about what you want to cover so the mentor can prepare accordingly.
                  </p>
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Choose your preferred date and time
                  </h3>
                  
                  {/* Date Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Date
                    </label>
                    <div className="grid grid-cols-7 gap-2 max-h-32 overflow-y-auto">
                      {generateDates().map((date, index) => (
                        <button
                          key={index}
                          onClick={() => setBookingData(prev => ({ ...prev, date: date.toISOString().split('T')[0] }))}
                          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                            bookingData.date === date.toISOString().split('T')[0]
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <div className="text-xs">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                          <div>{date.getDate()}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time, index) => (
                        <button
                          key={index}
                          onClick={() => setBookingData(prev => ({ ...prev, time }))}
                          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                            bookingData.time === time
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact Info */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Your contact information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Mail className="h-4 w-4 inline mr-1" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Phone className="h-4 w-4 inline mr-1" />
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={bookingData.whatsapp}
                        onChange={(e) => setBookingData(prev => ({ ...prev, whatsapp: e.target.value }))}
                        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    Meeting details will be sent to your email and WhatsApp.
                  </p>
                </motion.div>
              )}

              {/* Step 4: Session Pack */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Choose your session package
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sessionPackages.map((pack, index) => (
                      <div
                        key={index}
                        onClick={() => setBookingData(prev => ({ ...prev, sessionPack: pack }))}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          bookingData.sessionPack.sessions === pack.sessions
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                        }`}
                      >
                        {pack.popular && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full">
                            Most Popular
                          </div>
                        )}
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                            {pack.sessions} Session{pack.sessions > 1 ? 's' : ''}
                          </div>
                          <div className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">
                            ₹{pack.price}
                          </div>
                          {pack.discount > 0 && (
                            <div className="text-sm text-green-600 dark:text-green-400 mb-2">
                              Save ₹{pack.discount}
                            </div>
                          )}
                          <div className="text-sm text-gray-500">
                            {pack.tagline}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 5: Payment */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Booking Summary
                  </h3>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Mentor:</span>
                        <span className="font-medium text-gray-800 dark:text-white">{mentor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Date & Time:</span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Sessions:</span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          {bookingData.sessionPack.sessions} session{bookingData.sessionPack.sessions > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Topic:</span>
                        <span className="font-medium text-gray-800 dark:text-white text-right max-w-xs">
                          {bookingData.topic}
                        </span>
                      </div>
                      <hr className="border-gray-200 dark:border-gray-600" />
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-800 dark:text-white">Total:</span>
                        <span className="text-purple-600 dark:text-purple-400">₹{bookingData.sessionPack.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500 mb-4">
                    This is a demo. In production, payment gateway would be integrated here.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-xl font-medium transition-colors ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>

            <div className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </div>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center px-6 py-2 rounded-xl font-medium transition-colors ${
                  isStepValid()
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Confirm Booking
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
