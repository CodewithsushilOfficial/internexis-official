import React, { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Phone, Instagram, Linkedin, Twitter, SendHorizontal, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Contact: React.FC = () => {
  // Not using theme at the moment
  // Removed unused theme variable
  
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });
  }, []);
  
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Web3Forms API configuration
    const formElement = form.current as HTMLFormElement;
    const formData = new FormData(formElement);
    
    // Add access key to form data
    formData.append('access_key', '3964ead3-fbb7-43bb-89f0-c3a8980b0cf4');
    
    // Send form data to Web3Forms API
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      const data = await response.json();
      
      if (data.success) {
        console.log('Form submitted successfully');
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent successfully!'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        console.error('Form submission failed:', data);
        setSubmitStatus({
          success: false,
          message: 'Failed to send message. Please try again later.'
        });
      }
    })
    .catch((error) => {
      console.error('Failed to send form:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 relative overflow-hidden" id="contact">
      {/* Background elements */}      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-200 dark:bg-pink-700/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -right-24 w-72 h-72 bg-blue-200 dark:bg-blue-700/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/2 w-56 h-56 bg-purple-200 dark:bg-purple-700/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(10px, -10px) scale(1.05); }
            50% { transform: translate(0, 20px) scale(0.95); }
            75% { transform: translate(-10px, -10px) scale(1.05); }
          }
          .animate-blob {
            animation: blob 10s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600 dark:from-purple-400 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-violet-500 dark:from-purple-400 dark:via-blue-400 dark:to-violet-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300" data-aos="fade-up" data-aos-delay="200">
            Have questions or want to collaborate? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-indigo-100 dark:border-indigo-900 shadow-lg shadow-indigo-100/20 dark:shadow-indigo-900/20 transform transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200/30 dark:hover:shadow-indigo-800/30 hover:-translate-y-1"
            data-aos="fade-right"
          >
            <form ref={form} className="space-y-6" onSubmit={handleSubmit} action="https://api.web3forms.com/submit" method="POST">
              <motion.div variants={itemVariants} className="relative">                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Full Name
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-indigo-200 dark:border-indigo-800 rounded-xl focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-300 bg-indigo-50/30 dark:bg-indigo-900/30 placeholder:text-gray-400 dark:placeholder:text-gray-600 dark:text-white" 
                    placeholder="Your name" 
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative">                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Email Address
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-indigo-200 dark:border-indigo-800 rounded-xl focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-300 bg-indigo-50/30 dark:bg-indigo-900/30 placeholder:text-gray-400 dark:placeholder:text-gray-600 dark:text-white" 
                    placeholder="your.email@example.com" 
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative">                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Subject
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-indigo-200 dark:border-indigo-800 rounded-xl focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-300 bg-indigo-50/30 dark:bg-indigo-900/30 placeholder:text-gray-400 dark:placeholder:text-gray-600 dark:text-white" 
                    placeholder="How can we help?" 
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative">                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Message
                </label>
                <div className="relative">
                  <textarea 
                    id="message" 
                    name="message"
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-indigo-200 dark:border-indigo-800 rounded-xl focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-300 bg-indigo-50/30 dark:bg-indigo-900/30 placeholder:text-gray-400 dark:placeholder:text-gray-600 dark:text-white" 
                    placeholder="Your message here..." 
                    required
                  ></textarea>
                </div>
              </motion.div>
              
              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isSubmitting}                className={`w-full font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white shadow-lg shadow-purple-500/30 dark:shadow-purple-800/30 hover:shadow-xl hover:shadow-purple-500/40 dark:hover:shadow-purple-800/40'
                }`}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <span>Send Message</span>
                    <SendHorizontal className="h-5 w-5" />
                  </>
                )}
              </motion.button>
              
              {submitStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}                  className={`mt-4 p-4 rounded-xl flex items-center ${
                    submitStatus.success 
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800' 
                      : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                  }`}
                >                  <div className={`p-2 rounded-full mr-3 ${
                    submitStatus.success ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'
                  }`}>
                    {submitStatus.success ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  {submitStatus.message}
                </motion.div>
              )}
              
              {/* Hidden fields for Web3Forms */}
              <input type="hidden" name="access_key" value="3964ead3-fbb7-43bb-89f0-c3a8980b0cf4" />
              <input type="hidden" name="redirect" value="https://web3forms.com/success" />
              <input type="hidden" name="to_email" value="help.internexis@gmail.com" />
            </form>
          </motion.div>

          <div className="space-y-8" data-aos="fade-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-violet-600 to-blue-600 dark:from-violet-700 dark:to-blue-800 text-white rounded-2xl p-8 shadow-lg shadow-blue-600/20 dark:shadow-blue-900/30 transform transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30 dark:hover:shadow-blue-900/40 hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <MessageCircle className="mr-2 h-6 w-6" />
                Connect With Us
              </h3>
              <div className="space-y-6">                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start group"
                >
                  <div className="p-3 bg-white/10 rounded-lg mr-4 group-hover:bg-white/20 transition-all duration-300">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-white/80">Email</p>
                    <a 
                      href="mailto:help.internexis@gmail.com" 
                      className="text-white group-hover:underline transition-all duration-300"
                    >
                      help.internexis@gmail.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start group"
                >
                  <div className="p-3 bg-white/10 rounded-lg mr-4 group-hover:bg-white/20 transition-all duration-300">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-white/80">Phone</p>
                    <a 
                      href="tel:+919214267778" 
                      className="text-white group-hover:underline transition-all duration-300"
                    >
                      +91 9214 267 778
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start group"
                >
                  <div className="p-3 bg-white/10 rounded-lg mr-4 group-hover:bg-white/20 transition-all duration-300">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-white/80">Location</p>
                    <p className="text-white">Virtual HQ – India</p>
                  </div>
                </motion.div>
              </div>                <div className="mt-8 border-t border-white/20 pt-6">
                <p className="font-medium mb-4 text-white/90">Follow Us</p>
                <div className="flex space-x-4">
                  <motion.a 
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.instagram.com/internexis_technologies" 
                    className="text-white bg-white/10 dark:bg-white/5 p-3 rounded-lg hover:bg-white/20 dark:hover:bg-white/15 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-5 w-5" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.linkedin.com/company/internexis-technologies-pvt-ltd/" 
                    className="text-white bg-white/10 dark:bg-white/5 p-3 rounded-lg hover:bg-white/20 dark:hover:bg-white/15 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://x.com/interneexi26846" 
                    className="text-white bg-white/10 dark:bg-white/5 p-3 rounded-lg hover:bg-white/20 dark:hover:bg-white/15 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900 shadow-lg shadow-indigo-100/20 dark:shadow-indigo-900/20 transform transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200/30 dark:hover:shadow-indigo-800/30 hover:-translate-y-1"
            >              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Working Hours</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our support team is available during the following hours:
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors duration-300">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Monday - Friday:</span>
                  <span className="text-indigo-700 dark:text-indigo-300 font-medium">9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors duration-300">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Saturday:</span>
                  <span className="text-indigo-700 dark:text-indigo-300 font-medium">10:00 AM - 2:00 PM IST</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors duration-300">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Sunday:</span>
                  <span className="text-indigo-700 dark:text-indigo-300 font-medium">Closed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};