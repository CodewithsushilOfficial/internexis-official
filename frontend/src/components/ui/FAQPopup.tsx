import React, { useState } from "react";
import { ChevronDown, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../hooks/use-theme";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FAQPopup: React.FC<FAQPopupProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const faqItems: FAQItem[] = [
    {
      question: "Is this a certified internship?",
      answer:
        "Yes! Internexis internships are recognized by AICTE, ISO, and other educational bodies. Our certificates include verification IDs that can be validated by employers.",
    },
    {
      question: "What do I need to apply?",
      answer:
        "Just basic knowledge in your domain and a willingness to learn. Each program has specific prerequisites, but generally, you need fundamental programming knowledge for tech internships.",
    },
    {
      question: "Can I do it remotely?",
      answer:
        "Yes. All internships are completely virtual and flexible. You can work from anywhere with a reliable internet connection and complete tasks at your own pace within the provided deadlines.",
    },
    {
      question: "Do I get support during the internship?",
      answer:
        "Absolutely — you'll have mentor support and peer collaboration throughout your journey. Our mentors provide regular feedback, code reviews, and are available for scheduled consultations.",
    },
    {
      question: "How many hours per week should I commit?",
      answer:
        "We recommend 8-10 hours per week for optimal learning and project completion, but the schedule is flexible to accommodate your studies or other commitments.",
    },
    {
      question: "Will this help me get a job?",
      answer:
        "Yes! Our internships are designed to build job-ready skills and provide portfolio-worthy projects. Top performers also receive job referrals to our industry partners.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900"
                  : "bg-gradient-to-br from-white via-gray-50 to-blue-50"
              } backdrop-blur-xl border ${
                isDarkMode ? "border-gray-700/50" : "border-white/50"
              } shadow-2xl overflow-hidden`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="relative p-8 pb-6">
                <button
                  onClick={onClose}
                  className={`absolute top-6 right-6 p-2 rounded-full ${
                    isDarkMode
                      ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      : "bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 hover:text-gray-900"
                  } transition-all duration-200 backdrop-blur-sm border ${
                    isDarkMode ? "border-gray-700/30" : "border-gray-200/30"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2
                    className={`text-4xl md:text-5xl font-bold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                      Frequently Asked
                    </span>{" "}
                    Questions
                  </h2>
                  <p
                    className={`text-lg ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Find answers to common questions about our internship programs
                  </p>
                </motion.div>
              </div>

              {/* FAQ Content */}
              <div className="px-8 pb-8 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className={`rounded-2xl border ${
                        isDarkMode
                          ? "bg-gray-800/60 border-gray-700/50"
                          : "bg-white/60 border-gray-200/50"
                      } backdrop-blur-sm shadow-lg overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <button
                        className={`w-full px-6 py-5 text-left flex items-center justify-between ${
                          isDarkMode
                            ? "hover:bg-gray-700/30"
                            : "hover:bg-gray-50/50"
                        } transition-colors duration-200`}
                        onClick={() => toggleAccordion(index)}
                      >
                        <h3
                          className={`text-lg font-semibold pr-4 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex-shrink-0 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div
                              className={`px-6 pb-5 ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              } leading-relaxed`}
                            >
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Section */}
                <motion.div
                  className={`mt-8 p-6 rounded-2xl ${
                    isDarkMode
                      ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20"
                      : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50"
                  } backdrop-blur-sm`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`p-3 rounded-full ${
                          isDarkMode
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <MessageCircle className="w-6 h-6" />
                      </div>
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Still have questions?
                    </h3>
                    <p
                      className={`mb-4 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Reach out to our support team and we'll get back to you as
                      soon as possible.
                    </p>
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onClose();
                        // Scroll to contact section
                        const contactSection = document.getElementById("contact");
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      Contact Us
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
