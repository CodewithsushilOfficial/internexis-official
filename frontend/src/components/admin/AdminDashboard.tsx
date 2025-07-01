import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  UserGroupIcon,
  BriefcaseIcon,
  CalendarIcon,
  DocumentTextIcon,
  ComputerDesktopIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

interface AdminDashboardProps {
  onNavigate: (section: string) => void;
}

interface DashboardStats {
  totalInternships: number;
  totalJobs: number;
  totalMentors: number;
  totalProjects: number;
  totalEvents: number;
  totalApplications: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalInternships: 0,
    totalJobs: 0,
    totalMentors: 0,
    totalProjects: 0,
    totalEvents: 0,
    totalApplications: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // You can implement API calls to fetch real stats here
      // For now, using mock data
      setStats({
        totalInternships: 25,
        totalJobs: 15,
        totalMentors: 12,
        totalProjects: 18,
        totalEvents: 8,
        totalApplications: 156,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setLoading(false);
    }
  };

  const navigationCards = [
    {
      title: "Digital Solutions",
      description: "Manage digital services and solutions",
      icon: ComputerDesktopIcon,
      color: "bg-blue-500",
      section: "digital-solutions",
      count: 12,
    },
    {
      title: "Internship Opportunities",
      description: "Add and manage internship listings",
      icon: AcademicCapIcon,
      color: "bg-green-500",
      section: "internship-opportunities",
      count: stats.totalInternships,
    },
    {
      title: "Job Opportunities",
      description: "Manage job listings and career opportunities",
      icon: BriefcaseIcon,
      color: "bg-purple-500",
      section: "job-opportunities",
      count: stats.totalJobs,
    },
    {
      title: "Hackathons & Events",
      description: "Manage tech events and hackathons",
      icon: CalendarIcon,
      color: "bg-red-500",
      section: "hackathon-events",
      count: stats.totalEvents,
    },
    {
      title: "Work With Us",
      description: "Manage team openings and collaborations",
      icon: UserGroupIcon,
      color: "bg-indigo-500",
      section: "work-with-us",
      count: 8,
    },
    {
      title: "Mentorship",
      description: "Manage mentor profiles and sessions",
      icon: UserGroupIcon,
      color: "bg-yellow-500",
      section: "mentorship",
      count: stats.totalMentors,
    },
    {
      title: "Career Guidance",
      description: "Manage guidance content and resources",
      icon: DocumentTextIcon,
      color: "bg-teal-500",
      section: "career-guidance",
      count: 24,
    },
    {
      title: "Freelance Projects",
      description: "Track and showcase project portfolio",
      icon: ChartBarIcon,
      color: "bg-orange-500",
      section: "freelance-projects",
      count: stats.totalProjects,
    },
  ];

  const statsCards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: DocumentTextIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Opportunities",
      value: stats.totalInternships + stats.totalJobs,
      icon: BriefcaseIcon,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Mentors",
      value: stats.totalMentors,
      icon: UserGroupIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Ongoing Projects",
      value: stats.totalProjects,
      icon: ChartBarIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage all your services and monitor platform performance
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Add Internship",
                section: "internship-opportunities",
                action: "add",
              },
              { label: "Add Job", section: "job-opportunities", action: "add" },
              {
                label: "Add Event",
                section: "hackathon-events",
                action: "add",
              },
              { label: "Add Mentor", section: "mentorship", action: "add" },
            ].map((action, index) => (
              <button
                key={index}
                onClick={() =>
                  onNavigate(`${action.section}?action=${action.action}`)
                }
                className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <PlusIcon className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Service Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {navigationCards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => onNavigate(card.section)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${card.color} p-3 rounded-lg`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                      {card.count}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Manage</span>
                    <div className="flex space-x-2">
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                      <PencilIcon className="h-4 w-4 text-gray-400" />
                      <AdjustmentsHorizontalIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="space-y-4">
              {[
                {
                  action: "New internship application",
                  time: "2 minutes ago",
                  type: "application",
                },
                {
                  action: "Job posting updated",
                  time: "1 hour ago",
                  type: "update",
                },
                {
                  action: "New mentor registered",
                  time: "3 hours ago",
                  type: "registration",
                },
                {
                  action: "Event deadline approaching",
                  time: "5 hours ago",
                  type: "reminder",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "application"
                          ? "bg-blue-500"
                          : activity.type === "update"
                            ? "bg-green-500"
                            : activity.type === "registration"
                              ? "bg-purple-500"
                              : "bg-orange-500"
                      }`}
                    ></div>
                    <span className="text-gray-900">{activity.action}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
