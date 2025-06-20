import React from 'react';
import AmbassadorForm from '../components/features/campus-ambassador/AmbassadorForm';

const CampusAmbassadorTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Campus Ambassador Application
            </h1>
          </div>
        </div>
      </div>      {/* Content */}
      <div className="py-8">
        <AmbassadorForm />
      </div>
    </div>
  );
};

export default CampusAmbassadorTestPage;
