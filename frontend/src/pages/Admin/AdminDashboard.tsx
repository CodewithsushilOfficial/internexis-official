import React from "react";

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              User Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage user accounts and permissions
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Content Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage website content and updates
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Analytics
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              View website analytics and metrics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
