import React from 'react'
import { motion } from 'framer-motion'
import { 
  AcademicCapIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CogIcon,
  ChartBarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: AcademicCapIcon,
      title: 'Premium Courses',
      description: 'Industry-relevant courses designed by experts to enhance your skills and knowledge.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BriefcaseIcon,
      title: 'Virtual Internships',
      description: 'Gain real-world experience through our comprehensive virtual internship programs.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Mentorship',
      description: 'Get personalized guidance from industry professionals and experienced mentors.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: CogIcon,
      title: 'Technical Services',
      description: 'Professional web development, app development, and digital solutions for businesses.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: ChartBarIcon,
      title: 'Career Growth',
      description: 'Track your progress and accelerate your career with our comprehensive programs.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Certified Programs',
      description: 'Earn industry-recognized certificates that validate your skills and expertise.',
      color: 'from-red-500 to-red-600'
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Internexis Technologies?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We provide comprehensive solutions for students, professionals, and businesses 
            to achieve their goals and accelerate growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl mb-6`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection