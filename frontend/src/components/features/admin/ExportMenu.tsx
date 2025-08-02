import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileSpreadsheet,
  FileText,
  ChevronDown,
  Users,
  Briefcase,
  GraduationCap,
  BarChart3,
  CheckCircle,
  X,
} from "lucide-react";
import {
  ExportManager,
  type ApplicationData,
  type DashboardStats,
  type ApplicationCollection,
} from "../../../lib/utils/exportUtils";

interface ExportMenuProps {
  applications: ApplicationData[];
  currentTab: string;
  stats?: DashboardStats;
  allApplications?: ApplicationCollection;
  isVisible: boolean;
  onClose: () => void;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({
  applications,
  currentTab,
  stats,
  allApplications,
  isVisible,
  onClose,
}) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const handleExport = async (
    type: "current-xlsx" | "current-csv" | "all-xlsx" | "summary",
  ) => {
    setIsExporting(type);
    setExportSuccess(null);

    try {
      switch (type) {
        case "current-xlsx":
          ExportManager.exportToExcel(applications, currentTab);
          setExportSuccess("Excel file downloaded successfully!");
          break;
        case "current-csv":
          ExportManager.exportToCSV(applications, currentTab);
          setExportSuccess("CSV file downloaded successfully!");
          break;
        case "all-xlsx":
          if (allApplications) {
            ExportManager.exportAllToExcel(
              allApplications.ambassadors,
              allApplications.careers,
              allApplications.internships,
            );
            setExportSuccess("All data exported successfully!");
          }
          break;
        case "summary":
          if (stats && allApplications) {
            ExportManager.exportSummaryReport(stats, allApplications);
            setExportSuccess("Summary report downloaded successfully!");
          }
          break;
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    } finally {
      setIsExporting(null);
      setTimeout(() => setExportSuccess(null), 3000);
    }
  };

  const getTabDisplayName = (tab: string) => {
    switch (tab) {
      case "campus-ambassadors":
        return "Campus Ambassadors";
      case "careers":
        return "Career Applications";
      case "internships":
        return "Internship Applications";
      default:
        return "Applications";
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "campus-ambassadors":
        return Users;
      case "careers":
        return Briefcase;
      case "internships":
        return GraduationCap;
      default:
        return FileText;
    }
  };

  const TabIcon = getTabIcon(currentTab);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Export Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Export Data
                  </h3>
                  <p className="text-sm text-gray-600">
                    Download your data in various formats
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {exportSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800">
                    {exportSuccess}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Export Options */}
            <div className="p-6 space-y-4">
              {/* Current Data Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                  <TabIcon className="w-4 h-4" />
                  <span>Current Data ({getTabDisplayName(currentTab)})</span>
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleExport("current-xlsx")}
                    disabled={
                      isExporting === "current-xlsx" ||
                      applications.length === 0
                    }
                    className="w-full p-3 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet className="w-5 h-5 text-green-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">
                          Excel Format (.xlsx)
                        </div>
                        <div className="text-xs text-gray-600">
                          {applications.length} records • Formatted & styled
                        </div>
                      </div>
                    </div>
                    {isExporting === "current-xlsx" ? (
                      <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                    )}
                  </button>

                  <button
                    onClick={() => handleExport("current-csv")}
                    disabled={
                      isExporting === "current-csv" || applications.length === 0
                    }
                    className="w-full p-3 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">
                          CSV Format (.csv)
                        </div>
                        <div className="text-xs text-gray-600">
                          {applications.length} records • Comma separated
                        </div>
                      </div>
                    </div>
                    {isExporting === "current-csv" ? (
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* All Data Section */}
              {allApplications && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Complete Database
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleExport("all-xlsx")}
                      disabled={isExporting === "all-xlsx"}
                      className="w-full p-3 flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-200 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <div className="flex items-center space-x-3">
                        <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                        <div className="text-left">
                          <div className="font-medium text-gray-900">
                            All Applications (Excel)
                          </div>
                          <div className="text-xs text-gray-600">
                            {allApplications.ambassadors.length +
                              allApplications.careers.length +
                              allApplications.internships.length}{" "}
                            total records • Multiple sheets
                          </div>
                        </div>
                      </div>
                      {isExporting === "all-xlsx" ? (
                        <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      )}
                    </button>

                    {stats && (
                      <button
                        onClick={() => handleExport("summary")}
                        disabled={isExporting === "summary"}
                        className="w-full p-3 flex items-center justify-between bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border border-orange-200 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        <div className="flex items-center space-x-3">
                          <BarChart3 className="w-5 h-5 text-orange-600" />
                          <div className="text-left">
                            <div className="font-medium text-gray-900">
                              Summary Report
                            </div>
                            <div className="text-xs text-gray-600">
                              Statistics + data • Executive overview
                            </div>
                          </div>
                        </div>
                        {isExporting === "summary" ? (
                          <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {applications.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No data available to export</p>
                  <p className="text-xs">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 rounded-b-2xl">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>All exports include timestamps</span>
                <span>Data as of {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExportMenu;
