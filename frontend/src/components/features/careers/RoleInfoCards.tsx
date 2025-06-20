import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight,
  CheckCircle,
  Star,
  Award
} from 'lucide-react';

interface Opportunity {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  roles: string[];
  benefits: string[];
}

interface RoleInfoCardsProps {
  opportunities: Opportunity[];
}

const RoleInfoCards: React.FC<RoleInfoCardsProps> = ({ opportunities }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="opportunities" className="py-20 bg-white/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Perfect Role
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore diverse opportunities across different domains and find the role that matches your passion and skills.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/50"
          >
            {opportunities.map((opportunity, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === index
                    ? `bg-gradient-to-r ${opportunity.color} text-white shadow-lg transform scale-105`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <opportunity.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{opportunity.title}</span>
                <span className="sm:hidden">{opportunity.title.split(' ')[0]}</span>
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-br ${opportunities[activeTab].bgColor} rounded-3xl p-8 md:p-12 shadow-xl border border-white/50`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${opportunities[activeTab].color} rounded-2xl mb-8 shadow-lg`}>
                  {React.createElement(opportunities[activeTab].icon, { className: "h-10 w-10 text-white" })}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {opportunities[activeTab].title}
                </h3>
                
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {opportunities[activeTab].description}
                </p>

                {/* Available Roles */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Available Roles
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {opportunities[activeTab].roles.map((role, index) => (
                      <div
                        key={index}
                        className="bg-white/80 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 shadow-sm border border-white/50"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`px-8 py-4 bg-gradient-to-r ${opportunities[activeTab].color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2`}
                >
                  <span>Apply for This Role</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Right Content - Benefits */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="h-6 w-6 text-purple-500" />
                  What You'll Get
                </h4>
                
                <div className="space-y-4">
                  {opportunities[activeTab].benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${opportunities[activeTab].color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h5 className="text-lg font-bold text-gray-900 mb-1">{benefit}</h5>
                          <p className="text-gray-600 text-sm">
                            {getBenefitDescription(benefit)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats for this role type */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/50">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {getRoleStats(opportunities[activeTab].title).activeMembers}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Active Members</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/50">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {getRoleStats(opportunities[activeTab].title).satisfaction}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-16"
          >
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group cursor-pointer ${
                  activeTab === index ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
                onClick={() => setActiveTab(index)}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${opportunity.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <opportunity.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{opportunity.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{opportunity.description.substring(0, 60)}...</p>
                <div className="flex items-center text-sm text-blue-600 font-medium">
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Helper function to get benefit descriptions
const getBenefitDescription = (benefit: string): string => {
  const descriptions: Record<string, string> = {
    'Flexible Hours': 'Work around your schedule',
    'Real Projects': 'Gain hands-on experience',
    'Mentorship': 'Learn from industry experts',
    'Certificates': 'Earn recognized credentials',
    'Flexible Schedule': 'Choose your own hours',
    'Impact Lives': 'Make a meaningful difference',
    'Network Growth': 'Expand professional connections',
    'Recognition': 'Get acknowledged for your work',
    'Remote Work': 'Work from anywhere',
    'Competitive Pay': 'Fair compensation for your work',
    'Project Variety': 'Diverse and interesting projects',
    'Growth Opportunities': 'Advance your career',
    'Leadership Skills': 'Develop management abilities',
    'Networking': 'Build valuable connections',
    'Incentives': 'Earn rewards and bonuses',
    'Social Impact': 'Contribute to society',
    'Skill Development': 'Learn new technologies',
    'Community': 'Join a supportive group',
    'Experience': 'Build your resume'
  };
  return descriptions[benefit] || 'Great opportunity for growth';
};

// Helper function to get role-specific stats
const getRoleStats = (roleTitle: string) => {
  const stats: Record<string, { activeMembers: string; satisfaction: string }> = {
    'Student Team Members': { activeMembers: '150+', satisfaction: '98%' },
    'Mentors & Advisors': { activeMembers: '25+', satisfaction: '100%' },
    'Freelancers': { activeMembers: '80+', satisfaction: '96%' },
    'Campus Ambassadors': { activeMembers: '200+', satisfaction: '95%' },
    'Volunteers': { activeMembers: '300+', satisfaction: '97%' }
  };
  return stats[roleTitle] || { activeMembers: '50+', satisfaction: '95%' };
};

export default RoleInfoCards;
