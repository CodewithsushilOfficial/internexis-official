import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  GraduationCap, 
  TrendingUp,
  Search,
  Bell,
  Settings,
  LogOut,
  Eye,
  Mail,
  Calendar,
  ArrowLeft
} from 'lucide-react';

// Mock data for demonstration
const mockStats = {
  totalApplications: 147,
  campusAmbassadors: 23,
  careerApplications: 89,
  internshipApplications: 35,
  pendingApplications: 42,
  thisMonthApplications: 28
};

const mockRecentApplications = [
  {
    id: '1',
    name: 'Arjun Patel',
    email: 'arjun.patel@example.com',
    type: 'Campus Ambassador',
    status: 'Pending',
    submittedAt: '2024-03-15',
    university: 'IIT Delhi'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    type: 'Career Application',
    status: 'Reviewed',
    submittedAt: '2024-03-14',
    role: 'Frontend Developer'
  },
  {
    id: '3',
    name: 'Rohan Kumar',
    email: 'rohan.kumar@example.com',
    type: 'Internship',
    status: 'Shortlisted',
    submittedAt: '2024-03-13',
    university: 'BITS Pilani'
  }
];

const SimpleAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shortlisted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const StatCard = ({ icon: Icon, title, value, change }: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    value: number;
    change?: number;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className="text-green-600 text-sm mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{change} this month
            </p>
          )}
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </motion.div>
  );
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Website</span>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-6 h-6" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'campus-ambassadors', label: 'Campus Ambassadors', icon: Users },
                { id: 'careers', label: 'Career Applications', icon: Briefcase },
                { id: 'internships', label: 'Internships', icon: GraduationCap }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Users}
                title="Total Applications"
                value={mockStats.totalApplications}
                change={mockStats.thisMonthApplications}
              />
              <StatCard
                icon={Users}
                title="Campus Ambassadors"
                value={mockStats.campusAmbassadors}
              />
              <StatCard
                icon={Briefcase}
                title="Career Applications"
                value={mockStats.careerApplications}
              />
              <StatCard
                icon={GraduationCap}
                title="Internship Applications"
                value={mockStats.internshipApplications}
              />
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                <p className="text-gray-600 text-sm">Latest submissions from candidates</p>
              </div>
              <div className="divide-y divide-gray-200">
                {mockRecentApplications.map((application) => (
                  <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {application.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{application.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {application.email}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {application.submittedAt}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-sm font-medium text-gray-700">
                              {application.type}
                            </span>
                            {application.university && (
                              <span className="text-sm text-gray-500">
                                • {application.university}
                              </span>
                            )}
                            {application.role && (
                              <span className="text-sm text-gray-500">
                                • {application.role}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="text-gray-400">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {activeTab === 'campus-ambassadors' && 'Campus Ambassador Applications'}
                {activeTab === 'careers' && 'Career Applications'}
                {activeTab === 'internships' && 'Internship Applications'}
              </h3>              <p className="text-gray-500">
                This is a frontend demo. Connect to a backend API to show real application data.<br />
                <span className="text-sm mt-2 block">
                  💡 Admin credentials can be configured in the frontend .env file (VITE_ADMIN_USERNAME & VITE_ADMIN_PASSWORD)
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleAdminDashboard;
