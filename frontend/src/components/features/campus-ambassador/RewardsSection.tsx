import React from 'react';

const RewardsSection: React.FC = () => {  const rewardTiers = [
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
  const howItWorksSteps = [
    {
      step: 1,
      title: 'Share Your Magic Link',
      description: 'Get your personalized referral link and share with your network across social media, WhatsApp, and campus groups.',
      icon: '🔗',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: 2,
      title: 'Friends Join & Succeed',
      description: 'When your friends register using your link and successfully complete milestones, you earn points towards rewards.',
      icon: '👥',
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: 3,
      title: 'Unlock Amazing Rewards',
      description: 'Get verified rewards sent directly to your account - cash, goodies, certificates, and exclusive opportunities!',
      icon: '🎁',
      color: 'from-yellow-500 to-orange-500'
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

  return (    <div className="py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-[25%] left-[15%] w-80 h-80 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[60%] left-[70%] w-72 h-72 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-full mb-6 border border-white/20">
            <span className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              🏆 Rewards & Recognition Program
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="block text-gray-900">Earn While You</span>
            <span className="block bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Make Impact!
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Join our <span className="font-semibold text-orange-600">exclusive rewards program</span> and earn amazing cash prizes, 
            premium merchandise, and once-in-a-lifetime opportunities as you grow your network!
          </p>
          
          {/* Live Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-600">₹10L+</div>
              <div className="text-gray-500 text-sm font-medium">Total Rewards Given</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-600">2K+</div>
              <div className="text-gray-500 text-sm font-medium">Rewarded Ambassadors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-red-600">₹50K</div>
              <div className="text-gray-500 text-sm font-medium">Highest Individual Earning</div>
            </div>
          </div>
        </div>

        {/* Enhanced Reward Tiers */}
        <div className="mb-32">
          <h3 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-16">
            🎯 Referral Reward Tiers
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rewardTiers.map((tier, index) => (
              <div 
                key={index}
                className={`group relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border-2 overflow-hidden ${
                  tier.featured ? 'border-yellow-400 ring-4 ring-yellow-400/20' : 'border-gray-200/50 hover:border-white'
                }`}
              >
                {/* Featured Badge */}
                {tier.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                  {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Tier Badge */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${tier.color} rounded-2xl text-white text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {tier.icon}
                  </div>
                  
                  {/* Tier Name */}
                  <h4 className="text-2xl font-black text-gray-900 mb-2">
                    {tier.tier} Tier
                  </h4>
                  
                  {/* Referral Count */}
                  <div className="text-4xl font-black text-gray-700 mb-4">
                    {tier.referrals}
                  </div>
                  <div className="text-gray-500 text-sm mb-6">Successful Referrals</div>
                  
                  {/* Cash Reward */}
                  <div className={`text-3xl font-black bg-gradient-to-r ${tier.color} bg-clip-text text-transparent mb-4`}>
                    {tier.cashReward}
                  </div>
                  
                  {/* Extra Perks */}
                  <div className="text-gray-600 text-sm leading-relaxed mb-6">
                    {tier.extraPerks}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className={`h-2 bg-gradient-to-r ${tier.color} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(100, (index + 1) * 25)}%` }}
                    />
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full opacity-60 group-hover:scale-150 transition-transform duration-300"></div>
                <div className="absolute bottom-4 right-4 w-1 h-1 bg-white rounded-full opacity-40 group-hover:scale-200 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-32">
          <h3 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-16">
            🚀 How It Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div 
                key={index}
                className="group relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border border-gray-200/50 hover:border-white overflow-hidden"
              >                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Step Number */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl text-white text-2xl font-black shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-6xl mb-4 group-hover:animate-bounce">
                    {step.icon}
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
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
                className="group relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border border-gray-200/50 hover:border-white overflow-hidden"
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${bonus.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="text-6xl mb-4 group-hover:animate-pulse">
                    {bonus.icon}
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {bonus.title}
                  </h4>
                  
                  {/* Reward */}
                  <div className={`text-2xl font-black bg-gradient-to-r ${bonus.color} bg-clip-text text-transparent mb-3`}>
                    {bonus.reward}
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm">
                    {bonus.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-red-600/20 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 rounded-3xl p-12 text-white shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            {/* Floating Money Icons */}
            <div className="absolute top-8 right-8 text-4xl animate-bounce">💰</div>
            <div className="absolute bottom-8 left-8 text-4xl animate-bounce" style={{animationDelay: '1s'}}>🎁</div>
            <div className="absolute top-1/2 left-8 text-4xl animate-bounce" style={{animationDelay: '2s'}}>🏆</div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Ready to Start
                <span className="block text-yellow-300">Earning Big?</span>
              </h3>
              
              <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of successful ambassadors who are earning substantial rewards while building their professional network. 
                Your earning journey starts today!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button 
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-12 py-6 bg-white text-orange-600 font-black rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden text-lg"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-orange-600/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="relative flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Start Earning Now!
                  </span>
                </button>
                
                <div className="flex items-center text-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-black">₹2,000</div>
                    <div className="text-sm opacity-80">Average Monthly Earning</div>
                  </div>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
                <div className="flex items-center text-gray-200">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Instant Payments</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">No Hidden Fees</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Verified Rewards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsSection;
