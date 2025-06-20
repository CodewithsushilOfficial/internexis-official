import React, { useState } from 'react';
import HeroSection from './HeroSection';
import ImageSlider from './ImageSlider';
import BenefitsSection from './BenefitsSection';
import RewardsSection from './RewardsSection';
import Responsibilities from './Responsibilities';
import AmbassadorForm from './AmbassadorForm';
import AmbassadorHeader from './AmbassadorHeader';
import AmbassadorTracker from './AmbassadorTracker';

const CampusAmbassador: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'apply' | 'track'>('apply');
  
  return (
    <div className="min-h-screen">
      <AmbassadorHeader />
      <HeroSection />
      <ImageSlider />
      <BenefitsSection />
      <RewardsSection />
      <Responsibilities />
      
      {/* Tab Navigation */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2 p-1 bg-white rounded-lg shadow">
                <button
                  onClick={() => setCurrentTab('apply')}
                  className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                    currentTab === 'apply'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Apply as Ambassador
                </button>
                <button
                  onClick={() => setCurrentTab('track')}
                  className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                    currentTab === 'track'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Track Referrals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* Content Based on Tab */}
      {currentTab === 'apply' ? <AmbassadorForm /> : <AmbassadorTracker />}
    </div>
  );
};

export default CampusAmbassador;