import React from "react";
import { Check, Sparkles, Crown, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../../lib/hooks/use-theme";

interface PricingTier {
  id: number;
  duration: string;
  price: number;
  features: {
    text: string;
    included: boolean;
  }[];
  recommended?: boolean;
  color?: string;
  tagline?: string;
}

export const Pricing: React.FC = () => {
  // Using Theme hook for Tailwind's dark mode
  useTheme();

  const pricingTiers: PricingTier[] = [
    {
      id: 1,
      duration: "1 Month",
      price: 99,
      tagline: "Quick start",
      color: "blue",
      features: [
        { text: "1 Major Project", included: true },
        { text: "5 Minor Project", included: true },
        { text: "E-Certificate", included: true },
        { text: "Video Tutorials Provides", included: true },
        { text: "Basic Mentor Support", included: true },
        { text: "Resume Tips", included: false },
        { text: "Portfolio Building", included: false },
        { text: "Evaluation Report", included: false },
        { text: "Goodies Chance", included: false },
      ],
    },
    {
      id: 2,
      duration: "2 Months",
      price: 199,
      recommended: true,
      tagline: "Best value",
      color: "purple",
      features: [
        { text: "3 Major Projects", included: true },
        { text: "5 Minor Project", included: true },
        { text: "E-Certificate", included: true },
        { text: "Video Tutorials Provides", included: true },
        { text: "Extended Mentor Support", included: true },
        { text: "Resume Tips", included: true },
        { text: "Basic Portfolio Help", included: true },
        { text: "Evaluation Report", included: false },
        { text: "Goodies Chance", included: false },
      ],
    },
    {
      id: 3,
      duration: "3 Months",
      price: 499,
      tagline: "Complete package",
      color: "accent",
      features: [
        { text: "5 Major Projects", included: true },
        { text: "5 Minor Project", included: true },
        { text: "E-Certificate", included: true },
        { text: "Video Tutorials Provides", included: true },
        { text: "Premium Mentor Support", included: true },
        { text: "Resume Tips", included: true },
        { text: "Full Portfolio Building", included: true },
        { text: "Evaluation Report", included: true },
        { text: "Goodies Chance", included: true },
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300"
      id="pricing"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-400/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-purple-400/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>

        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Internship Packages
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Affordable, flexible options to fit your learning goals
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              // Simple animation without state management
              className={`
                relative backdrop-blur-sm rounded-2xl overflow-hidden
                ${
                  tier.recommended
                    ? "ring-2 ring-purple-500 dark:ring-purple-400 shadow-xl shadow-purple-500/10 dark:shadow-purple-400/10"
                    : "border border-gray-200 dark:border-gray-700 shadow-lg"
                }
                ${
                  tier.color === "blue"
                    ? "bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20"
                    : tier.color === "purple"
                      ? "bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20"
                      : "bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-amber-900/20"
                }
                transition-all duration-300
              `}
            >
              {tier.recommended && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 text-white py-2 text-center font-medium text-sm flex items-center justify-center gap-2">
                  <Crown size={14} className="animate-pulse" />
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${tier.recommended ? "pt-12" : "pt-8"}`}>
                {/* Tier tagline */}
                {tier.tagline && (
                  <span
                    className={`
                    text-xs font-semibold uppercase tracking-wider mb-2 inline-block
                    ${
                      tier.color === "blue"
                        ? "text-blue-600 dark:text-blue-400"
                        : tier.color === "purple"
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-accent-600 dark:text-accent-400"
                    }
                  `}
                  >
                    {tier.tagline}
                  </span>
                )}

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {tier.duration}
                </h3>

                <div className="flex items-baseline mb-6">
                  <span
                    className={`
                    text-4xl font-bold
                    ${
                      tier.color === "blue"
                        ? "text-blue-600 dark:text-blue-400"
                        : tier.color === "purple"
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-accent-600 dark:text-accent-400"
                    }
                  `}
                  >
                    ₹{tier.price}
                  </span>
                  <span className="ml-1 text-gray-600 dark:text-gray-400">
                    one-time
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      {feature.included ? (
                        <span
                          className={`
                          p-1 rounded-full mr-3 flex-shrink-0
                          ${
                            tier.color === "blue"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                              : tier.color === "purple"
                                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                          }
                        `}
                        >
                          <Check size={14} />
                        </span>
                      ) : (
                        <span className="p-1 rounded-full mr-3 flex-shrink-0 bg-gray-100 dark:bg-gray-800 text-gray-400">
                          <X size={14} />
                        </span>
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-gray-800 dark:text-gray-200"
                            : "text-gray-400 dark:text-gray-500"
                        }
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.a
                  href="#apply"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    block w-full py-3 text-center rounded-xl font-medium transition-all duration-300
                    ${
                      tier.color === "blue"
                        ? tier.recommended
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
                          : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-500 dark:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        : tier.color === "purple"
                          ? tier.recommended
                            ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
                            : "bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border border-purple-500 dark:border-purple-500/50 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                          : tier.recommended
                            ? "bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30"
                            : "bg-white dark:bg-gray-800 text-accent-600 dark:text-accent-400 border border-accent-500 dark:border-accent-500/50 hover:bg-accent-50 dark:hover:bg-accent-900/30"
                    }
                  `}
                >
                  {tier.recommended ? (
                    <div className="flex items-center justify-center gap-2">
                      <span>Select Plan</span>
                      <Sparkles size={16} className="animate-pulse" />
                    </div>
                  ) : (
                    "Select Plan"
                  )}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 max-w-3xl mx-auto text-center backdrop-blur-sm bg-gradient-to-br from-blue-50/90 to-purple-50/90 dark:from-blue-900/30 dark:to-purple-900/30 p-8 rounded-xl border border-blue-100/50 dark:border-blue-700/30 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Need a Custom Package?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We offer tailored solutions for universities, colleges, and student
            groups. Contact us for special group rates and custom program
            durations.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/20 transition-all duration-300"
          >
            Contact for Details
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
