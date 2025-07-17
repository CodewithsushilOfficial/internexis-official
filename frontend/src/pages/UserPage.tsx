import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Award, 
  Clock, 
  Target, 
  Bell,
  Settings,
  HelpCircle,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Star,
  ChevronRight,
  Download,
  Share
} from "lucide-react";

interface UserStats {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface Course {
  id: number;
  title: string;
  progress: number;
  duration: string;
  status: "completed" | "in-progress" | "upcoming";
  thumbnail: string;
  instructor: string;
  rating: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  type: "certificate" | "milestone" | "skill";
}

export const UserPage: React.FC = () => {
  const userStats: UserStats[] = [
    {
      label: "Courses Completed",
      value: "12",
      icon: <BookOpen className="w-6 h-6" />,
      color: "blue"
    },
    {
      label: "Certificates Earned",
      value: "8",
      icon: <Award className="w-6 h-6" />,
      color: "green"
    },
    {
      label: "Total Hours",
      value: "156",
      icon: <Clock className="w-6 h-6" />,
      color: "purple"
    },
    {
      label: "Skills Mastered",
      value: "24",
      icon: <Target className="w-6 h-6" />,
      color: "orange"
    }
  ];

  const courses: Course[] = [
    {
      id: 1,
      title: "Full Stack Web Development",
      progress: 85,
      duration: "12 weeks",
      status: "in-progress",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      instructor: "John Doe",
      rating: 4.8
    },
    {
      id: 2,
      title: "React.js Fundamentals",
      progress: 100,
      duration: "8 weeks",
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      instructor: "Jane Smith",
      rating: 4.9
    },
    {
      id: 3,
      title: "Python for Data Science",
      progress: 60,
      duration: "10 weeks",
      status: "in-progress",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      instructor: "Dr. Michael Johnson",
      rating: 4.7
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      progress: 0,
      duration: "6 weeks",
      status: "upcoming",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      instructor: "Sarah Wilson",
      rating: 4.6
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "JavaScript Master",
      description: "Completed advanced JavaScript course with 95% score",
      icon: <Award className="w-5 h-5" />,
      date: "2 weeks ago",
      type: "certificate"
    },
    {
      id: 2,
      title: "100 Hours Learned",
      description: "Reached 100 hours of total learning time",
      icon: <Clock className="w-5 h-5" />,
      date: "1 month ago",
      type: "milestone"
    },
    {
      id: 3,
      title: "React Specialist",
      description: "Mastered React.js framework and its ecosystem",
      icon: <Star className="w-5 h-5" />,
      date: "2 months ago",
      type: "skill"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case "certificate":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "milestone":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
      case "skill":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full border-4 border-blue-500"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Alex Johnson
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Full Stack Developer Student
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    alex.johnson@email.com
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    +1 (555) 123-4567
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    New York, USA
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Edit3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {userStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  My Courses
                </h2>
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-xl object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                          {course.status.replace("-", " ")}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        By {course.instructor} • {course.duration}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {course.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Achievements & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Recent Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Recent Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${getAchievementColor(achievement.type)}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {achievement.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-3" />
                    Browse Courses
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                  <div className="flex items-center">
                    <Download className="w-5 h-5 mr-3" />
                    Download Certificates
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                  <div className="flex items-center">
                    <Share className="w-5 h-5 mr-3" />
                    Share Progress
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                  <div className="flex items-center">
                    <HelpCircle className="w-5 h-5 mr-3" />
                    Get Support
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
