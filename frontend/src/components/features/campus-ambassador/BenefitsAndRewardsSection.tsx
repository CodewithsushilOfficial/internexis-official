import React from 'react';

// Advanced custom CSS animations and effects
const customStyles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes pulse-glow {
    0%, 100% { 
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
      transform: scale(1);
    }
    50% { 
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
      transform: scale(1.02);
    }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes slideUp {
    from { 
      opacity: 0; 
      transform: translateY(50px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  @keyframes borderGlow {
    0%, 100% { 
      border-color: rgba(59, 130, 246, 0.3);
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
    }
    50% { 
      border-color: rgba(147, 51, 234, 0.5);
      box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
    }
  }

  .animate-blob { animation: blob 7s infinite; }
  .animate-float { animation: float 4s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .animate-shimmer { 
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
  .animate-heartbeat { animation: heartbeat 2s ease-in-out infinite; }
  .animate-borderGlow { animation: borderGlow 3s ease-in-out infinite; }
  
  .glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .hover-lift:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 15px 35px -12px rgba(0, 0, 0, 0.15);
  }
`;

const BenefitsAndRewardsSection: React.FC = () => {
  // Inject custom styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const benefits = [
    {
      icon: '💰',
      title: 'Real Income While Studying',
      description: 'Earn ₹1,500 for just 10 students (₹1000 course × 15%). Turn your campus connections into consistent income stream.',
      highlight: 'Earn While You Learn',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: '🏆',
      title: 'Resume-Worthy Leadership',
      description: 'Build exceptional experience as Campus Ambassador + Marketer + Influencer. Stand out in job applications.',
      highlight: 'Triple Role Experience',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🌐',
      title: 'Networking & Recognition',
      description: 'Connect with tech leaders, HRs, fellow ambassadors. Get LinkedIn shoutouts and industry exposure.',
      highlight: 'Professional Network',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: '🎓',
      title: 'Certificates & Events',
      description: 'Receive internship certificates, attend exclusive events, and gain access to premium resources.',
      highlight: 'Exclusive Benefits',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '🎁',
      title: 'Gifts, Swags & LORs',
      description: 'Top performers receive amazing gifts, branded merchandise, and Letter of Recommendations.',
      highlight: 'Premium Rewards',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: '🚀',
      title: 'Unlimited Earning Potential',
      description: 'No caps on referrals, no complex milestones. Your earnings grow directly with your efforts.',
      highlight: 'No Limits',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  const earningExamples = [
    { referrals: 10, earnings: 150 },
    { referrals: 20, earnings: 300 },
    { referrals: 30, earnings: 450 },
    { referrals: 40, earnings: 600 },
    { referrals: 50, earnings: 750 },
    { referrals: 75, earnings: 1125 },
    { referrals: 100, earnings: 1500 },
    { referrals: 200, earnings: 3000 },
    { referrals: 400, earnings: 6000 },
    { referrals: 650, earnings: 10000 }
  ];

  const howItWorks = [
    {
      step: '1',
      icon: '🔐',
      title: 'Get Your Link',
      description: 'Get your personal referral link after joining as Campus Ambassador.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      step: '2',
      icon: '📤',
      title: 'Share & Promote',
      description: 'Share it with friends, classmates, college groups, clubs & social media.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      step: '3',
      icon: '✅',
      title: 'Earn 15% Commission',
      description: 'Earn 15% of each successful paid registration made through your link.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '4',
      icon: '💰',
      title: 'Get Paid Monthly',
      description: 'Receive earnings monthly via UPI or bank transfer – hassle-free.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const rewardTiers = [
    {
      referrals: '25+',
      cashReward: '₹1,000',
      extraPerks: 'Digital Certificate + LinkedIn Badge',
      color: 'from-emerald-500 to-teal-500',
      icon: '🌟',
      tier: 'Bronze'
    },
    {
      referrals: '50+',
      cashReward: '₹2,500',
      extraPerks: 'Premium Goodies + Certificate',
      color: 'from-blue-500 to-cyan-500',
      icon: '💎',
      tier: 'Silver'
    },
    {
      referrals: '100+',
      cashReward: '₹5,000',
      extraPerks: 'Exclusive Merchandise + Hoodie',
      color: 'from-purple-500 to-indigo-500',
      icon: '👑',
      tier: 'Gold',
      featured: true
    },
    {
      referrals: '200+',
      cashReward: '₹10,000',
      extraPerks: 'VIP Event Invitation + Mentorship',
      color: 'from-pink-500 to-rose-500',
      icon: '🏆',
      tier: 'Platinum'
    }
  ];

  const bonusRewards = [
    {
      title: 'Monthly Top Performer',
      reward: '₹5,000 Bonus',
      description: 'Highest referrals each month',
      icon: '🥇',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      title: 'University Champion',
      reward: 'MacBook Pro',
      description: 'Top ambassador in your university',
      icon: '💻',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'National Winner',
      reward: '₹50,000 + Trip',
      description: 'Best ambassador nationwide',
      icon: '🌍',
      color: 'from-purple-500 to-pink-500'
    }
  ];
  return (
    <div id="benefits" className="py-20 relative overflow-hidden min-h-screen">
      {/* Enhanced Multi-Layer Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-50/30 to-yellow-50/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[50%] left-[50%] w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Hero Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-8 py-4 glass-effect rounded-full mb-8 border shadow-lg hover-lift">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              💸 Refer & Earn with Internexis – Turn Your Influence into Income! 🚀
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="block text-gray-900 hover:text-blue-600 transition-colors duration-500">📢 Share Opportunities.</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              💼 Empower Careers.
            </span>
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              💰 Earn for Every Impact.
            </span>
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Are you a student who loves to help others?
            </p>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Do you have a network of ambitious peers?
            </p>
            <p className="text-xl md:text-2xl text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold">
              💥 Then it's time to monetize your influence and become a Changemaker on your campus!
            </p>
          </div>
        </div>        {/* Enhanced Flat Commission Highlight */}
        <div className="mb-16 animate-slideUp" style={{animationDelay: '0.6s'}}>
          <div className="relative hover-lift">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-3xl blur-3xl animate-pulse-glow"></div>
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-10 text-white shadow-2xl overflow-hidden animate-borderGlow">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-float"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24 animate-float" style={{animationDelay: '2s'}}></div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-6 animate-heartbeat">
                  🪙 What You Earn – Flat 15% Per Referral
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <div className="glass-effect rounded-2xl p-6 border border-white/20 hover-lift animate-slideUp" style={{animationDelay: '0.8s'}}>
                    <div className="text-2xl font-bold mb-2 animate-heartbeat">✅ No Milestones Needed</div>
                    <p className="text-lg text-emerald-100">Start earning from your first referral</p>
                  </div>
                  <div className="glass-effect rounded-2xl p-6 border border-white/20 hover-lift animate-slideUp" style={{animationDelay: '1s'}}>
                    <div className="text-2xl font-bold mb-2 animate-heartbeat" style={{animationDelay: '0.5s'}}>✅ No Limits on Referrals</div>
                    <p className="text-lg text-emerald-100">Invite unlimited friends and earn more</p>
                  </div>
                  <div className="glass-effect rounded-2xl p-6 border border-white/20 hover-lift animate-slideUp" style={{animationDelay: '1.2s'}}>
                    <div className="text-2xl font-bold mb-2 animate-heartbeat" style={{animationDelay: '1s'}}>✅ Earnings Grow With You</div>
                    <p className="text-lg text-emerald-100">Your income scales with your network</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Earning Examples Table */}
        <div className="mb-16 animate-slideUp" style={{animationDelay: '1.4s'}}>
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 animate-heartbeat">
              🪙 Example Earnings Based on Referrals
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-float">
              See how much you can earn with our simple 15% flat commission structure ✨
            </p>
          </div>

          <div className="overflow-x-auto hover-lift">
            <div className="min-w-full glass-effect rounded-3xl shadow-2xl overflow-hidden border animate-borderGlow">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
                    <th className="px-8 py-6 text-left text-lg font-bold">
                      🎯 Referral Milestone
                    </th>
                    <th className="px-8 py-6 text-left text-lg font-bold">
                      💰 Total Earnings (₹)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {earningExamples.map((example, index) => (
                    <tr 
                      key={index} 
                      className={`${index % 2 === 0 ? 'bg-gray-50/80' : 'bg-white/80'} hover:bg-gradient-to-r hover:from-blue-50/90 hover:to-purple-50/90 group hover:scale-[1.02] hover:shadow-xl transform transition-all duration-300 hover-lift`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="px-8 py-6 whitespace-nowrap text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {example.referrals} Referrals
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm animate-bounce">
                          🎯
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-lg font-bold text-green-600 group-hover:text-green-700 transition-colors">
                        <span className="group-hover:animate-pulse">₹{example.earnings.toLocaleString()}</span>
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm animate-bounce" style={{animationDelay: '0.2s'}}>
                          💰
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>        {/* Enhanced Why Join Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
              💼 Why You Should Join?
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 border border-white/30 overflow-hidden hover-lift"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="mb-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span>{benefit.icon}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-800 mb-4 leading-relaxed text-sm group-hover:text-gray-900 transition-colors font-medium">
                    {benefit.description}
                  </p>

                  <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${benefit.color} rounded-full shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    <span className="text-xs font-bold text-white drop-shadow-sm">
                      {benefit.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced How It Works Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
              🔗 How It Works
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Four simple steps to start earning with your referrals! 🚀
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border hover-lift group">
                  <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br ${step.color} rounded-lg text-white text-sm font-bold mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span>{step.step}</span>
                  </div>
                  <div className="text-2xl mb-3">
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                    {step.description}
                  </p>
                </div>
                
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Reward Tiers Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              🎯 Referral Reward Tiers
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock amazing rewards as you reach each milestone!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rewardTiers.map((tier, index) => (
              <div 
                key={index}
                className={`group relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border-2 overflow-hidden hover-lift ${
                  tier.featured ? 'border-yellow-400 ring-4 ring-yellow-400/20' : 'border-gray-200/50 hover:border-white'
                }`}
              >
                {tier.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10 text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${tier.color} rounded-2xl text-white text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {tier.icon}
                  </div>
                  
                  <h4 className="text-2xl font-black text-gray-900 mb-2">
                    {tier.tier} Tier
                  </h4>
                  
                  <div className="text-4xl font-black text-gray-700 mb-4">
                    {tier.referrals}
                  </div>
                  <div className="text-gray-500 text-sm mb-6">Successful Referrals</div>
                  
                  <div className={`text-3xl font-black bg-gradient-to-r ${tier.color} bg-clip-text text-transparent mb-4`}>
                    {tier.cashReward}
                  </div>
                  
                  <div className="text-gray-600 text-sm leading-relaxed mb-6">
                    {tier.extraPerks}
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className={`h-2 bg-gradient-to-r ${tier.color} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(100, (index + 1) * 25)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Rewards Section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-16">
            🎁 Exclusive Bonus Rewards
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bonusRewards.map((bonus, index) => (
              <div 
                key={index}
                className="group relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border border-gray-200/50 hover:border-white overflow-hidden hover-lift"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${bonus.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4 group-hover:animate-pulse">
                    {bonus.icon}
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {bonus.title}
                  </h4>
                  
                  <div className={`text-2xl font-black bg-gradient-to-r ${bonus.color} bg-clip-text text-transparent mb-3`}>
                    {bonus.reward}
                  </div>
                  
                  <p className="text-gray-600 text-sm">
                    {bonus.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border-l-4 border-yellow-500 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">🛡️</span>
              Terms & Conditions (Simplified)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-yellow-600 mr-3 mt-1 text-lg">•</span>
                  <span className="text-base">Only paid, genuine signups through your unique link are counted.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-600 mr-3 mt-1 text-lg">•</span>
                  <span className="text-base">No referral caps – invite as many as you want!</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-600 mr-3 mt-1 text-lg">•</span>
                  <span className="text-base">No fake/spam entries – quality over quantity.</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-yellow-600 mr-3 mt-1 text-lg">•</span>
                  <span className="text-base">Payouts are sent monthly after verification.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-600 mr-3 mt-1 text-lg">•</span>
                  <span className="text-base">Internexis reserves the right to review accounts for fairness.</span>
                </div>
              </div>            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsAndRewardsSection;
