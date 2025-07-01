import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const LiveChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors duration-300 shadow-primary-500/30"
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat support"
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="bg-primary-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium">Chat Support</h3>
                    <div className="flex items-center text-xs text-primary-100">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                      Online
                    </div>
                  </div>
                </div>
                <button
                  onClick={toggleChat}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                  A
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[85%]">
                  <p className="text-gray-800 dark:text-gray-200 text-sm">
                    Hi there! 👋 Welcome to Internexis Technologies. How can I
                    assist you today?
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    10:32 AM
                  </span>
                </div>
              </div>
            </div>

            {/* Chat input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3">
              <form className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-200 dark:border-gray-600 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
