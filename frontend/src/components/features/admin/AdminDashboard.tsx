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
  RefreshCw,
  Trash2,
  Download,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Target
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';
import { adminService, type DashboardApplication } from '../../../lib/services';
import ExportMenu from './ExportMenu';
import type { ApplicationCollection, ApplicationData as ExportApplicationData } from '../../../lib/utils/exportUtils';

// Enhanced Dashboard Interfaces
interface DashboardStats {
  totalApplications: number;
  campusAmbassadors: number;
  careerApplications: number;
  internshipApplications: number;
  pendingApplications: number;
  thisMonthApplications: number;
  conversionRate?: number;
  averageResponseTime?: number;
  topPerformingPositions?: Array<{ name: string; applications: number }>;
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
    skills?: string[];
    location?: string;
    graduation?: string;
  }>;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface ChartData {
  monthly: Array<{ month: string; applications: number; type: string }>;
  statusDistribution: Array<{ name: string; value: number; color: string }>;
  topColleges: Array<{ name: string; count: number }>;
  applicationTrends: Array<{ date: string; ambassadors: number; careers: number; internships: number }>;
}

const AdminDashboard: React.FC = () => {
  // State Management
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  
  // Data States
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    campusAmbassadors: 0,
    careerApplications: 0,
    internshipApplications: 0,
    pendingApplications: 0,
    thisMonthApplications: 0,
    conversionRate: 0,
    averageResponseTime: 0
  });
  
  const [recentApplications, setRecentApplications] = useState<DashboardApplication[]>([]);
  const [applicationData, setApplicationData] = useState<ApplicationData>({ applications: [] });
  const [chartData, setChartData] = useState<ChartData>({
    monthly: [],
    statusDistribution: [],
    topColleges: [],
    applicationTrends: []
  });
  
  // Loading and Error States
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  
  // Export State
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [allApplicationsData, setAllApplicationsData] = useState<ApplicationCollection>({
    ambassadors: [],
    careers: [],
    internships: []
  });
  
  // Navigation
  const navigate = useNavigate();
  
  // Admin info from localStorage
  const adminEmail = localStorage.getItem('adminEmail') || 'help.internexis@gmail.com';
  const adminRole = localStorage.getItem('adminRole') || 'admin';

  // Fetch application data
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
        limit: 50,
        ...(statusFilter && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm }),
        ...(dateFilter && { dateFilter })
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
    }  }, [activeTab, searchTerm, statusFilter, dateFilter]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all dashboard data
      const [statsResult, recentResult] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getRecentApplications(10)
      ]);

      if (statsResult.success) {
        setStats(statsResult.data);
      }

      if (recentResult.success) {
        setRecentApplications(recentResult.data);
      }

      // Generate chart data
      generateChartData();
    } catch (err: unknown) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Fetch application data when tab changes
  useEffect(() => {
    if (activeTab !== 'overview') {
      fetchApplicationData();
    }
  }, [activeTab, searchTerm, statusFilter, dateFilter, fetchApplicationData]);

  const generateChartData = () => {
    // Generate sample chart data (replace with real API data)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyData = months.map(month => ({
      month,
      applications: Math.floor(Math.random() * 100) + 20,
      type: 'total'
    }));

    const statusData = [
      { name: 'Pending', value: 45, color: '#fbbf24' },
      { name: 'Reviewed', value: 30, color: '#3b82f6' },
      { name: 'Accepted', value: 20, color: '#10b981' },
      { name: 'Rejected', value: 5, color: '#ef4444' }
    ];

    const trendsData = months.map(month => ({
      date: month,
      ambassadors: Math.floor(Math.random() * 30) + 10,
      careers: Math.floor(Math.random() * 40) + 15,
      internships: Math.floor(Math.random() * 35) + 12
    }));

    const collegeData = [
      { name: 'IIT Delhi', count: 25 },
      { name: 'IIT Mumbai', count: 22 },
      { name: 'NIT Karnataka', count: 18 },
      { name: 'BITS Pilani', count: 15 },
      { name: 'VIT University', count: 12 }
    ];

    setChartData({
      monthly: monthlyData,
      statusDistribution: statusData,
      topColleges: collegeData,
      applicationTrends: trendsData
    });
  };

  const handleLogout = () => {
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
      fetchApplicationData();
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to update status:', err);
      setError('Failed to update application status.');
    }
  };

  const deleteApplication = async (id: string, applicantName: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the application from ${applicantName}?\n\nThis action cannot be undone.`
    );
    
    if (!isConfirmed) return;

    try {
      setDeleteLoading(id);
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

      const result = await adminService.deleteApplication(type, id);
      
      if (result.success) {
        setError(null);
        await Promise.all([
          fetchApplicationData(),
          fetchDashboardData()
        ]);
      } else {
        setError(result.message || 'Failed to delete application');
      }
    } catch (err: unknown) {
      console.error('Failed to delete application:', err);
      setError('Failed to delete application. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleBulkAction = async (action: 'accept' | 'reject' | 'delete') => {
    if (selectedApplications.length === 0) return;

    const confirmMessage = action === 'delete' 
      ? `Delete ${selectedApplications.length} selected applications?`
      : `${action === 'accept' ? 'Accept' : 'Reject'} ${selectedApplications.length} selected applications?`;

    if (!window.confirm(confirmMessage)) return;

    try {
      setBulkActionLoading(true);
      
      for (const id of selectedApplications) {
        if (action === 'delete') {
          await deleteApplication(id, 'Selected Application');
        } else {
          await updateApplicationStatus(id, action === 'accept' ? 'accepted' : 'rejected');
        }
      }
      
      setSelectedApplications([]);
      await fetchApplicationData();
      await fetchDashboardData();
    } catch (err) {
      console.error('Bulk action failed:', err);
      setError('Failed to perform bulk action.');
    } finally {
      setBulkActionLoading(false);
    }  };  // Helper function to convert applications to ApplicationData format
  const convertToApplicationData = (apps: unknown[]): ExportApplicationData[] => {
    return apps.map((app) => {
      const appData = app as Record<string, unknown>;
      return {
        id: (appData.id || appData._id) as string,
        name: appData.name as string,
        email: appData.email as string,
        phone: appData.phone as string,
        status: appData.status as string,
        submittedAt: appData.submittedAt as string,
        college: appData.college as string,
        position: appData.position as string,
        experience: appData.experience as string,
        domain: appData.domain as string,
        duration: appData.duration as string,
        resumeLink: appData.resumeLink as string,
        whyYouWantToJoin: appData.whyYouWantToJoin as string,
        year: appData.year as string,
        skills: appData.skills as string[],
        location: appData.location as string,
        graduation: appData.graduation as string
      };
    });
  };

  // Fetch all applications for export
  const fetchAllApplicationsData = useCallback(async () => {
    try {
      const [ambassadorResult, careerResult, internshipResult] = await Promise.all([
        adminService.getApplicationsByType('ambassador', { page: 1, limit: 1000 }),
        adminService.getApplicationsByType('career', { page: 1, limit: 1000 }),
        adminService.getApplicationsByType('internship', { page: 1, limit: 1000 })
      ]);      const allData: ApplicationCollection = {
        ambassadors: ambassadorResult.success ? convertToApplicationData(ambassadorResult.data.applications) : [],
        careers: careerResult.success ? convertToApplicationData(careerResult.data.applications) : [],
        internships: internshipResult.success ? convertToApplicationData(internshipResult.data.applications) : []
      };

      setAllApplicationsData(allData);
    } catch (error) {
      console.error('Failed to fetch all applications data:', error);
    }
  }, []);

  // Enhanced export data function
  const handleExportClick = async () => {
    // Fetch all data first
    await fetchAllApplicationsData();
    setShowExportMenu(true);  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shortlisted': return 'bg-green-100 text-green-800 border-green-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'hired': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Enhanced Stat Card Component
  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    change, 
    trend = 'up',
    subtitle 
  }: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    value: number | string;
    change?: number;
    trend?: 'up' | 'down';
    subtitle?: string;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full transform translate-x-16 -translate-y-16"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
            <Icon className="w-8 h-8 text-white" />
          </div>
          {change && (
            <div className={`flex items-center text-sm font-medium ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
              {change > 0 ? '+' : ''}{change}%
            </div>
          )}
        </div>
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  // Chart Components
  const StatusChart = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={chartData.statusDistribution}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {chartData.statusDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );

  const TrendsChart = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData.applicationTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="ambassadors" 
            stackId="1" 
            stroke="#3b82f6" 
            fill="#3b82f6" 
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="careers" 
            stackId="1" 
            stroke="#10b981" 
            fill="#10b981" 
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="internships" 
            stackId="1" 
            stroke="#8b5cf6" 
            fill="#8b5cf6" 
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
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
                  {stats.pendingApplications > 99 ? '99+' : stats.pendingApplications}
                </span>
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-600">
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
        {/* Enhanced Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp, count: null },
                { id: 'campus-ambassadors', label: 'Campus Ambassadors', icon: Users, count: stats.campusAmbassadors },
                { id: 'careers', label: 'Career Applications', icon: Briefcase, count: stats.careerApplications },
                { id: 'internships', label: 'Internships', icon: GraduationCap, count: stats.internshipApplications }
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
                  {tab.count !== null && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      activeTab === tab.id 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
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
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4"
              >
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <div className="text-red-600">
                    <p className="font-medium">Error loading dashboard</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                  <button
                    onClick={fetchDashboardData}
                    className="ml-auto px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </motion.div>
            )}

            {/* Enhanced Stats Grid */}
            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    icon={Activity}
                    title="Total Applications"
                    value={stats.totalApplications}
                    change={15}
                    subtitle="All time applications"
                  />
                  <StatCard
                    icon={Users}
                    title="Campus Ambassadors"
                    value={stats.campusAmbassadors}
                    change={8}
                    subtitle="Active ambassadors"
                  />
                  <StatCard
                    icon={Briefcase}
                    title="Career Applications"
                    value={stats.careerApplications}
                    change={12}
                    subtitle="Job applications"
                  />
                  <StatCard
                    icon={GraduationCap}
                    title="Internship Applications"
                    value={stats.internshipApplications}
                    change={20}
                    subtitle="Internship seekers"
                  />
                </div>

                {/* Additional Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    icon={Clock}
                    title="Pending Applications"
                    value={stats.pendingApplications}
                    subtitle="Awaiting review"
                  />
                  <StatCard
                    icon={Target}
                    title="This Month"
                    value={stats.thisMonthApplications}
                    change={25}
                    subtitle="New applications"
                  />
                  <StatCard
                    icon={CheckCircle}
                    title="Conversion Rate"
                    value={`${stats.conversionRate || 65}%`}
                    change={5}
                    subtitle="Application to hire"
                  />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <StatusChart />
                  <TrendsChart />
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                        <p className="text-gray-600 text-sm">Latest submissions from candidates</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={fetchDashboardData}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Refresh</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {recentApplications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No applications found</p>
                      </div>
                    ) : (
                      recentApplications.map((application, index) => (
                        <motion.div 
                          key={application.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-6 hover:bg-gray-50 transition-colors"
                        >
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
                                  <span className="text-sm font-medium text-gray-700 capitalize">
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
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Application Management Tabs */}
        {activeTab !== 'overview' && (
          <div className="space-y-6">
            {/* Enhanced Filter and Search Bar */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by name, email, or college..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 flex-wrap">
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
                  
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                    <button
                    onClick={handleExportClick}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  
                  <button
                    onClick={fetchApplicationData}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>
              
              {/* Bulk Actions */}
              {selectedApplications.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {selectedApplications.length} application(s) selected
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleBulkAction('accept')}
                        disabled={bulkActionLoading}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        Accept Selected
                      </button>
                      <button
                        onClick={() => handleBulkAction('reject')}
                        disabled={bulkActionLoading}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        Reject Selected
                      </button>
                      <button
                        onClick={() => handleBulkAction('delete')}
                        disabled={bulkActionLoading}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
                      >
                        Delete Selected
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
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
                      {applicationData.pagination?.totalItems || applicationData.applications.length} total applications
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
                  <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedApplications(applicationData.applications.map(app => app.id || app._id!));
                              } else {
                                setSelectedApplications([]);
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </th>
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
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applicationData.applications.map((application, index) => {
                        const applicationId = application.id || application._id;
                        return (
                          <motion.tr 
                            key={applicationId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedApplications.includes(applicationId!)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedApplications([...selectedApplications, applicationId!]);
                                  } else {
                                    setSelectedApplications(selectedApplications.filter(id => id !== applicationId));
                                  }
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
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
                                  {application.skills && (
                                    <div className="text-xs text-gray-500">
                                      Skills: {Array.isArray(application.skills) 
                                        ? application.skills.slice(0, 3).join(', ') 
                                        : application.skills}
                                    </div>
                                  )}
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
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)} cursor-pointer`}
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
                                <button 
                                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                
                                {activeTab === 'careers' && application.resumeLink && (
                                  <a
                                    href={application.resumeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                    title="View Resume"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                                
                                <button
                                  onClick={() => deleteApplication(applicationId!, application.name)}
                                  className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={deleteLoading === applicationId}
                                  title={deleteLoading === applicationId ? 'Deleting...' : `Delete application from ${application.name}`}
                                >
                                  {deleteLoading === applicationId ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>          </div>
        )}
      </div>

      {/* Export Menu */}
      <ExportMenu        applications={convertToApplicationData(applicationData.applications as unknown[])}
        currentTab={activeTab}
        stats={{
          totalApplications: stats.totalApplications,
          campusAmbassadors: stats.campusAmbassadors,
          careerApplications: stats.careerApplications,
          internshipApplications: stats.internshipApplications,
          pendingApplications: stats.pendingApplications,
          thisMonthApplications: stats.thisMonthApplications
        }}
        allApplications={allApplicationsData}
        isVisible={showExportMenu}
        onClose={() => setShowExportMenu(false)}
      />
    </div>
  );
};

export default AdminDashboard;
