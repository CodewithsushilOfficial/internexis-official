import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: "Is this a certified internship?",
      answer: "Yes! Internexis internships are recognized by AICTE, ISO, and other educational bodies. Our certificates include verification IDs that can be validated by employers."
    },
    {
      question: "What do I need to apply?",
      answer: "Just basic knowledge in your domain and a willingness to learn. Each program has specific prerequisites, but generally, you need fundamental programming knowledge for tech internships."
    },
    {
      question: "Can I do it remotely?",
      answer: "Yes. All internships are completely virtual and flexible. You can work from anywhere with a reliable internet connection and complete tasks at your own pace within the provided deadlines."
    },
    {
      question: "Do I get support during the internship?",
      answer: "Absolutely — you'll have mentor support and peer collaboration throughout your journey. Our mentors provide regular feedback, code reviews, and are available for scheduled consultations."
    },
    {
      question: "How many hours per week should I commit?",
      answer: "We recommend 8-10 hours per week for optimal learning and project completion, but the schedule is flexible to accommodate your studies or other commitments."
    },
    {
      question: "Will this help me get a job?",
      answer: "Yes! Our internships are designed to build job-ready skills and provide portfolio-worthy projects. Top performers also receive job referrals to our industry partners."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900" id="faq">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Find answers to common questions about our internship programs
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="flex justify-between items-center w-full text-left p-6 focus:outline-none group hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4 transition-transform duration-300">
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-12 max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Still have questions?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Reach out to our support team and we'll get back to you as soon as possible.
          </p>
          <motion.a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};