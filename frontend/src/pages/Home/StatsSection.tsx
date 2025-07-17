import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

const StatsSection: React.FC = () => {
  const stats = [
    {
      number: 10000,
      suffix: '+',
      label: 'Students Trained',
      description: 'Across various programs and courses'
    },
    {
      number: 50,
      suffix: '+',
      label: 'Expert Mentors',
      description: 'Industry professionals guiding students'
    },
    {
      number: 95,
      suffix: '%',
      label: 'Success Rate',
      description: 'Students achieving their career goals'
    },
    {
      number: 100,
      suffix: '+',
      label: 'Partner Companies',
      description: 'Hiring our trained professionals'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of successful students and professionals who have transformed 
            their careers with Internexis Technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-2">
                <CountUp
                  end={stat.number}
                  duration={2.5}
                  separator=","
                  suffix={stat.suffix}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection