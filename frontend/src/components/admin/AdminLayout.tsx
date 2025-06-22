import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ComputerDesktopIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onNavigate: (section: string) => void;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  currentSection, 
  onNavigate, 
  onLogout 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    {
      name: 'Dashboard',
      href: 'dashboard',
      icon: HomeIcon,
      current: currentSection === 'dashboard'
    },
    {
      name: 'Digital Solutions',
      href: 'digital-solutions',
      icon: ComputerDesktopIcon,
      current: currentSection === 'digital-solutions'
    },
    {
      name: 'Internship Opportunities',
      href: 'internship-opportunities',
      icon: AcademicCapIcon,
      current: currentSection === 'internship-opportunities'
    },
    {
      name: 'Job Opportunities',
      href: 'job-opportunities',
      icon: BriefcaseIcon,
      current: currentSection === 'job-opportunities'
    },
    {
      name: 'Hackathons & Events',
      href: 'hackathon-events',
      icon: CalendarIcon,
      current: currentSection === 'hackathon-events'
    },
    {
      name: 'Work With Us',
      href: 'work-with-us',
      icon: UserGroupIcon,
      current: currentSection === 'work-with-us'
    },
    {
      name: 'Mentorship',
      href: 'mentorship',
      icon: UserGroupIcon,
      current: currentSection === 'mentorship'
    },
    {
      name: 'Career Guidance',
      href: 'career-guidance',
      icon: DocumentTextIcon,
      current: currentSection === 'career-guidance'
    },
    {
      name: 'Freelance Projects',
      href: 'freelance-projects',
      icon: ChartBarIcon,
      current: currentSection === 'freelance-projects'
    }
  ];

  const handleNavigation = (href: string) => {
    onNavigate(href);
    setSidebarOpen(false);
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? 'bg-white' : 'bg-gray-900'}`}>
      {/* Logo */}
      <div className={`flex items-center justify-between h-16 px-4 ${mobile ? 'border-b border-gray-200' : ''}`}>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-lg ${mobile ? 'bg-indigo-600' : 'bg-indigo-500'} flex items-center justify-center`}>
            <span className="text-white font-bold text-sm">I</span>
          </div>
          <span className={`ml-2 text-lg font-semibold ${mobile ? 'text-gray-900' : 'text-white'}`}>
            Internexis Admin
          </span>
        </div>
        {mobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigationItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavigation(item.href)}
            className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              item.current
                ? mobile
                  ? 'bg-indigo-50 border-r-2 border-indigo-500 text-indigo-700'
                  : 'bg-gray-800 text-white'
                : mobile
                ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon
              className={`mr-3 h-5 w-5 ${
                item.current
                  ? mobile
                    ? 'text-indigo-500'
                    : 'text-gray-300'
                  : mobile
                  ? 'text-gray-400'
                  : 'text-gray-400 group-hover:text-gray-300'
              }`}
            />
            {item.name}
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className={`px-2 py-4 border-t ${mobile ? 'border-gray-200' : 'border-gray-700'}`}>
        <button
          onClick={onLogout}
          className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            mobile
              ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <ArrowRightOnRectangleIcon
            className={`mr-3 h-5 w-5 ${mobile ? 'text-gray-400' : 'text-gray-400 group-hover:text-gray-300'}`}
          />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden"
            >
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-col flex-1 lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
                <h1 className="ml-4 text-lg font-medium text-gray-900 capitalize lg:ml-0">
                  {currentSection.replace('-', ' ')}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                  <BellIcon className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                  <CogIcon className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
