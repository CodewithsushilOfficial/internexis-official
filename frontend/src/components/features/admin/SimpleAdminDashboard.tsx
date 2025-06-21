import React, { useState, useEffect, useCallback } from 'react';
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
  ArrowLeft,
  Loader2,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { adminService, type DashboardApplication } from '../../../lib/services';

// Dashboard state interfaces
interface DashboardStats {
  totalApplications: number;
  campusAmbassadors: number;
  careerApplications: number;
  internshipApplications: number;
  pendingApplications: number;
  thisMonthApplications: number;
}

interface ApplicationData {
  applications: Array<{
    id?: string;
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    status: string;
    submittedAt: string;
    college?: string;
    position?: string;
    experience?: string;
    domain?: string;
    duration?: string;
    resumeLink?: string;
    whyYouWantToJoin?: string;
  }>;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const SimpleAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    campusAmbassadors: 0,
    careerApplications: 0,
    internshipApplications: 0,
    pendingApplications: 0,
    thisMonthApplications: 0
  });
  const [recentApplications, setRecentApplications] = useState<DashboardApplication[]>([]);
  const [applicationData, setApplicationData] = useState<ApplicationData>({ applications: [] });
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // Get admin info from localStorage
  const adminEmail = localStorage.getItem('adminEmail') || 'help.internexis@gmail.com';
  const adminRole = localStorage.getItem('adminRole') || 'admin';

  const fetchApplicationData = useCallback(async () => {
    try {
      setDataLoading(true);
      setError(null);

      let type: 'ambassador' | 'career' | 'internship';
      switch (activeTab) {
        case 'campus-ambassadors':
          type = 'ambassador';
          break;
        case 'careers':
          type = 'career';
          break;
        case 'internships':
          type = 'internship';
          break;
        default:
          return;
      }

      const params = {
        page: 1,
        limit: 20,
        ...(statusFilter && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm })
      };

      const result = await adminService.getApplicationsByType(type, params);
      
      if (result.success) {
        setApplicationData(result.data);
      }
    } catch (err: unknown) {
      console.error('Failed to fetch application data:', err);
      setError('Failed to load application data.');
    } finally {
      setDataLoading(false);
    }
  }, [activeTab, searchTerm, statusFilter]);

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch application data when tab changes
  useEffect(() => {
    if (activeTab !== 'overview') {
      fetchApplicationData();
    }
  }, [activeTab, searchTerm, statusFilter, fetchApplicationData]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both stats and recent applications
      const [statsResult, recentResult] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getRecentApplications(5)
      ]);

      if (statsResult.success) {
        setStats(statsResult.data);
      }

      if (recentResult.success) {
        setRecentApplications(recentResult.data);
      }    } catch (err: unknown) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear all admin authentication data
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminRole');
    navigate('/admin-login');
  };

  const updateApplicationStatus = async (id: string, newStatus: string) => {
    try {
      let type: 'ambassador' | 'career' | 'internship';
      switch (activeTab) {
        case 'campus-ambassadors':
          type = 'ambassador';
          break;
        case 'careers':
          type = 'career';
          break;
        case 'internships':
          type = 'internship';
          break;
        default:
          return;
      }

      await adminService.updateApplicationStatus(type, id, newStatus);
      // Refresh the data after update
      fetchApplicationData();
      fetchDashboardData(); // Update stats as well
    } catch (err) {
      console.error('Failed to update status:', err);
      setError('Failed to update application status.');
    }
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
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Welcome, {adminEmail} ({adminRole})
                </p>
              </div>
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
        </div>        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading dashboard data...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="text-red-600">
                    <p className="font-medium">Error loading dashboard</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                  <button
                    onClick={fetchDashboardData}
                    className="ml-auto px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Stats Grid */}
            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    icon={Users}
                    title="Total Applications"
                    value={stats.totalApplications}
                    change={stats.thisMonthApplications}
                  />
                  <StatCard
                    icon={Users}
                    title="Campus Ambassadors"
                    value={stats.campusAmbassadors}
                  />
                  <StatCard
                    icon={Briefcase}
                    title="Career Applications"
                    value={stats.careerApplications}
                  />
                  <StatCard
                    icon={GraduationCap}
                    title="Internship Applications"
                    value={stats.internshipApplications}
                  />
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                        <p className="text-gray-600 text-sm">Latest submissions from candidates</p>
                      </div>
                      <button 
                        onClick={fetchDashboardData}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Refresh
                      </button>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {recentApplications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No applications found</p>
                      </div>
                    ) : (
                      recentApplications.map((application) => (
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
                                    {new Date(application.submittedAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 mt-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    {application.type}
                                  </span>
                                  {application.college && (
                                    <span className="text-sm text-gray-500">
                                      • {application.college}
                                    </span>
                                  )}
                                  {application.position && (
                                    <span className="text-sm text-gray-500">
                                      • {application.position}
                                    </span>
                                  )}
                                  {application.domain && (
                                    <span className="text-sm text-gray-500">
                                      • {application.domain}
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
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}        {/* Other Tabs */}
        {activeTab !== 'overview' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    {activeTab === 'careers' && (
                      <>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="hired">Hired</option>
                      </>
                    )}
                    {activeTab === 'internships' && (
                      <option value="completed">Completed</option>
                    )}
                  </select>
                  <button
                    onClick={fetchApplicationData}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {activeTab === 'campus-ambassadors' && 'Campus Ambassador Applications'}
                      {activeTab === 'careers' && 'Career Applications'}
                      {activeTab === 'internships' && 'Internship Applications'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {applicationData.pagination?.totalItems || 0} total applications
                    </p>
                  </div>
                </div>
              </div>

              {dataLoading ? (
                <div className="p-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-600">Loading applications...</p>
                </div>
              ) : applicationData.applications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No applications found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applicant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        {activeTab === 'campus-ambassadors' && (
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            College
                          </th>
                        )}
                        {activeTab === 'careers' && (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Position
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Experience
                            </th>
                          </>
                        )}
                        {activeTab === 'internships' && (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Domain
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              College
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Duration
                            </th>
                          </>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">                      {applicationData.applications.map((application) => {
                        const applicationId = application.id || application._id;
                        return (
                        <tr key={applicationId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                  {application.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {application.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{application.email}</div>
                            <div className="text-sm text-gray-500">{application.phone}</div>
                          </td>
                          {activeTab === 'campus-ambassadors' && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {application.college}
                            </td>
                          )}
                          {activeTab === 'careers' && (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {application.position}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {application.experience}
                              </td>
                            </>
                          )}
                          {activeTab === 'internships' && (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {application.domain}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {application.college}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {application.duration}
                              </td>
                            </>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={application.status}
                              onChange={(e) => applicationId && updateApplicationStatus(applicationId, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                              {activeTab === 'careers' && (
                                <>
                                  <option value="shortlisted">Shortlisted</option>
                                  <option value="interviewed">Interviewed</option>
                                  <option value="hired">Hired</option>
                                </>
                              )}
                              {activeTab === 'internships' && (
                                <option value="completed">Completed</option>
                              )}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(application.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              {activeTab === 'careers' && application.resumeLink && (
                                <a
                                  href={application.resumeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleAdminDashboard;
