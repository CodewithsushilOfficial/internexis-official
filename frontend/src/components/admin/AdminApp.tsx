import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import DigitalSolutionsManager from './DigitalSolutionsManager';
import HackathonEventsManager from './HackathonEventsManager';
import WorkWithUsManager from './WorkWithUsManager';
import MentorshipManager from './MentorshipManager';
import CareerGuidanceManager from './CareerGuidanceManager';
import FreelanceProjectsManager from './FreelanceProjectsManager';

const AdminApp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('adminToken');
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (token || adminLoggedIn) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // If trying to access protected route without auth, redirect to login
      if (location.pathname !== '/admin') {
        navigate('/admin');
      }
    }
    setLoading(false);
  }, [navigate, location.pathname]);
  useEffect(() => {
    // Update current section based on URL - only if authenticated
    if (isAuthenticated) {
      const path = location.pathname;
      if (path === '/admin' || path === '/admin/dashboard') {
        setCurrentSection('dashboard');
      } else if (path.includes('/admin/')) {
        const section = path.replace('/admin/', '');
        setCurrentSection(section);
      }
    }
  }, [location, isAuthenticated]);
  const handleLogin = (token: string) => {
    localStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
    navigate('/admin/dashboard');
    // Dispatch custom event to update footer
    window.dispatchEvent(new Event('adminAuthChanged'));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setCurrentSection('dashboard');
    navigate('/admin');
    // Dispatch custom event to update footer
    window.dispatchEvent(new Event('adminAuthChanged'));
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    navigate(`/admin/${section}`);
  };
  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'digital-solutions':
        return <DigitalSolutionsManager />;
      case 'internship-opportunities':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Internship Opportunities</h1>
            <p className="text-gray-600">Internship opportunities management coming soon...</p>
          </div>
        );
      case 'job-opportunities':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Job Opportunities</h1>
            <p className="text-gray-600">Job opportunities management coming soon...</p>
          </div>
        );      case 'hackathon-events':
        return <HackathonEventsManager />;
      case 'work-with-us':
        return <WorkWithUsManager />;
      case 'mentorship':
        return <MentorshipManager />;
      case 'career-guidance':
        return <CareerGuidanceManager />;
      case 'freelance-projects':
        return <FreelanceProjectsManager />;
      default:
        return <AdminDashboard onNavigate={handleNavigate} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminLayout
      currentSection={currentSection}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {renderCurrentSection()}
    </AdminLayout>
  );
};

export default AdminApp;
