import React from 'react';

const Responsibilities: React.FC = () => {
  const responsibilities = [
    {
      category: 'Promotion & Outreach',
      icon: '📢',
      tasks: [
        'Share internship opportunities on social media platforms',
        'Distribute promotional materials in your university',
        'Organize info sessions and workshops about Internexis',
        'Create engaging content about tech careers and internships'
      ],
      timeCommitment: '3-5 hours/week'
    },
    {
      category: 'Student Engagement',
      icon: '👥',
      tasks: [
        'Help students understand our internship programs',
        'Assist with application processes and queries',
        'Mentor junior students interested in tech careers',
        'Build and maintain a network of tech-interested students'
      ],
      timeCommitment: '2-4 hours/week'
    },
    {
      category: 'Event Management',
      icon: '🎪',
      tasks: [
        'Organize campus events and tech meetups',
        'Coordinate with university placement cells',
        'Host coding competitions and hackathons',
        'Facilitate guest lectures and industry talks'
      ],
      timeCommitment: '4-6 hours/month'
    },
    {
      category: 'Reporting & Feedback',
      icon: '📊',
      tasks: [
        'Submit monthly activity reports to Internexis team',
        'Collect student feedback and suggestions',
        'Track referral metrics and success rates',
        'Participate in ambassador meetings and training sessions'
      ],
      timeCommitment: '1-2 hours/week'
    }
  ];

  const requirements = [
    {
      icon: '🎓',
      title: 'Academic Standing',
      description: 'Currently enrolled in 2nd year or above in any technical course'
    },
    {
      icon: '💬',
      title: 'Communication Skills',
      description: 'Excellent verbal and written communication abilities'
    },
    {
      icon: '🌐',
      title: 'Social Media Presence',
      description: 'Active on LinkedIn, Instagram, or other professional platforms'
    },
    {
      icon: '⚡',
      title: 'Leadership Experience',
      description: 'Previous experience in clubs, societies, or leadership roles (preferred)'
    },
    {
      icon: '⏰',
      title: 'Time Commitment',
      description: 'Ability to dedicate 5-10 hours per week for ambassador activities'
    },
    {
      icon: '🤝',
      title: 'Team Player',
      description: 'Collaborative mindset and willingness to work with diverse teams'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Responsibilities Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your 
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Responsibilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As a Campus Ambassador, you'll engage in meaningful activities that build your skills while helping fellow students.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {responsibilities.map((responsibility, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{responsibility.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{responsibility.category}</h3>
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mt-2">
                      {responsibility.timeCommitment}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {responsibility.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What We're 
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Looking For</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We seek passionate, motivated students who are ready to make a positive impact in their university community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requirements.map((requirement, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 hover:border-purple-200 transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {requirement.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {requirement.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {requirement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Think You're the Perfect Fit?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join our community of ambitious students who are shaping the future of tech education.
            </p>
            <button 
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Your Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Responsibilities;