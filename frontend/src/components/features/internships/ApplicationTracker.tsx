import React, { useState } from "react";
import {
  Search,
  Loader2,
  Clock,
  AlertCircle,
  CheckCircle,
  FileSearch,
  Mail,
} from "lucide-react";
import { useTheme } from "../../../lib/hooks/use-theme";

// Create a sample status type for demonstration
type ApplicationStatus =
  | "pending"
  | "reviewing"
  | "approved"
  | "rejected"
  | null;

export const ApplicationTracker: React.FC = () => {
  const [reference, setReference] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<ApplicationStatus>(null);
  const [hasSearched, setHasSearched] = useState(false);
  // Using theme context for dark mode support
  useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo logic - in real app, this would be an API call
      if (reference.includes("approved")) {
        setStatus("approved");
      } else if (reference.includes("rejected")) {
        setStatus("rejected");
      } else if (reference.includes("review")) {
        setStatus("reviewing");
      } else {
        setStatus("pending");
      }
      setHasSearched(true);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusDisplay = () => {
    if (!hasSearched) return null;

    const statusConfig = {
      pending: {
        icon: <Clock className="h-8 w-8 text-amber-500" />,
        title: "Application Pending",
        desc: "Your application has been received and is waiting for review.",
        color:
          "bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700",
        step: 1,
      },
      reviewing: {
        icon: <FileSearch className="h-8 w-8 text-blue-500" />,
        title: "Under Review",
        desc: "Our team is currently reviewing your application.",
        color:
          "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700",
        step: 2,
      },
      approved: {
        icon: <CheckCircle className="h-8 w-8 text-green-500" />,
        title: "Application Approved",
        desc: "Congratulations! Your application has been approved.",
        color:
          "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-700",
        step: 3,
      },
      rejected: {
        icon: <AlertCircle className="h-8 w-8 text-red-500" />,
        title: "Application Rejected",
        desc: "We're sorry, but your application wasn't selected at this time.",
        color:
          "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-700",
        step: 3,
      },
    };

    const currentStatus = statusConfig[status!];

    // Status steps data
    const steps = [
      { name: "Submitted", icon: <Mail />, step: 1 },
      { name: "Under Review", icon: <FileSearch />, step: 2 },
      {
        name: "Decision",
        icon: status === "approved" ? <CheckCircle /> : <AlertCircle />,
        step: 3,
      },
    ];

    return (
      <div
        className={`mt-8 p-6 rounded-lg border ${currentStatus.color}`}
        style={{ animation: "fadeIn 0.5s ease-out forwards" }}
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md">
            {currentStatus.icon}
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl dark:text-gray-100">
              {currentStatus.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {currentStatus.desc}
            </p>
          </div>
        </div>

        {/* Application Timeline */}
        <div className="mt-6 mb-4">
          <div className="relative flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = currentStatus.step >= step.step;
              const isRejected = status === "rejected" && step.step === 3;

              return (
                <React.Fragment key={index}>
                  {/* Progress Line */}
                  {index > 0 && (
                    <div
                      className={`absolute h-1 ${
                        isActive
                          ? isRejected
                            ? "bg-red-400"
                            : "bg-blue-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      style={{
                        left: `${(index * 100) / (steps.length - 1) - 100 / (steps.length - 1)}%`,
                        right: `${100 - (index * 100) / (steps.length - 1)}%`,
                        zIndex: 0,
                      }}
                    />
                  )}

                  {/* Step Circle */}
                  <div className="z-10 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive
                          ? isRejected && step.step === 3
                            ? "bg-red-500 text-white"
                            : "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      } shadow-md transition-colors duration-300`}
                    >
                      {step.icon}
                    </div>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        isActive
                          ? isRejected && step.step === 3
                            ? "text-red-500 dark:text-red-400"
                            : "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {step.name}
                    </p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="mt-6 space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Reference ID:
            </span>
            <span className="font-medium dark:text-gray-200">{reference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Last Updated:
            </span>
            <span className="font-medium dark:text-gray-200">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-200">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
              Track Your Application
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
              Stay updated on your application progress with real-time status
              tracking
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Email or Reference ID"
                  className="w-full pl-12 px-4 py-4 rounded-lg border border-gray-300 dark:border-gray-600 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                            focus:border-blue-500 dark:focus:border-blue-400 outline-none
                            placeholder:text-gray-500 dark:placeholder:text-gray-400
                            transition-colors duration-200"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 dark:bg-blue-500 text-white py-4 rounded-lg 
                          font-medium hover:bg-blue-700 dark:hover:bg-blue-600 
                          transition-colors flex items-center justify-center gap-2
                          disabled:opacity-70 text-base shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Checking Status...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Track Application
                  </>
                )}
              </button>
            </form>

            {getStatusDisplay()}

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
                Quick Help
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <div className="min-w-[20px] mr-2">•</div>
                  <span>
                    Reference ID can be found in your confirmation email
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[20px] mr-2">•</div>
                  <span>
                    Status updates are typically processed within 24-48 hours
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[20px] mr-2">•</div>
                  <span>
                    For immediate assistance, please use the chat support
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[20px] mr-2">•</div>
                  <span>
                    Type "approved", "rejected", or "review" in your search to
                    see different statuses for demo purposes
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
