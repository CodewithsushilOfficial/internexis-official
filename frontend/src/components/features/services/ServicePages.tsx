import React from "react";
import { motion } from "framer-motion";
import { UserCheck, Target, TrendingUp } from "lucide-react";

export const MentorshipPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full mb-8">
              <UserCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-white dark:via-indigo-400 dark:to-blue-400 mb-6">
              🧑‍🏫 Mentorship
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              One-on-one guidance from industry mentors and professionals
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export const CareerGuidancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-8">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-white dark:via-purple-400 dark:to-pink-400 mb-6">
              📈 Career Guidance
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Resume reviews, interview prep, and career path planning
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export const FreelanceProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-8">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-red-600 to-pink-600 bg-clip-text text-transparent dark:from-white dark:via-red-400 dark:to-pink-400 mb-6">
              🛠️ Freelance Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Gain freelance experience through client-assigned real-world
              projects
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export const CareerJobsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-green-600 rounded-full mb-8">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-teal-600 to-green-600 bg-clip-text text-transparent dark:from-white dark:via-teal-400 dark:to-green-400 mb-6">
              💼 Career & Jobs
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find jobs, internships, and off-campus drives relevant to your
              domain
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
