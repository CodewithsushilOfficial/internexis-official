import React from "react";

const UserPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            User Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Welcome to your Internexis user dashboard. This page is under
            development.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We're working on bringing you an amazing user experience. Stay
              tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserPage };
export default UserPage;
