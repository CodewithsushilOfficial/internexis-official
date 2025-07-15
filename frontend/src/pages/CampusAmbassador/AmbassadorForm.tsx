import React, { useState, useEffect } from "react";
import {
  campusAmbassadorService,
  CampusAmbassadorFormData,
} from "../../services";

const AmbassadorForm: React.FC = () => {
  // Add CSS animations to the document head
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }
      
      @keyframes blob {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .animate-float-delayed {
        animation: float-delayed 8s ease-in-out infinite;
        animation-delay: 2s;
      }
      
      .animate-blob {
        animation: blob 7s infinite;
      }
      
      .animation-delay-2000 {
        animation-delay: 2s;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const [formData, setFormData] = useState<CampusAmbassadorFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    course: "",
    yearOfStudy: "",
    cgpa: "",
    linkedinUrl: "",
    portfolioUrl: "",
    skills: [],
    experience: "",
    motivation: "",
    whyInternexis: "",
    availabilityHours: "",
    startDate: "",
    referralSource: "",
    additionalInfo: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Handle skills as an array
    if (name === "skills") {
      const skillsArray = value
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);
      setFormData((prev) => ({
        ...prev,
        [name]: skillsArray,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);
    // Basic form validation
    const requiredFields = {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone number",
      university: "University",
      motivation: "Why you want to be a Campus Ambassador",
    };

    const missingFields: string[] = [];

    Object.entries(requiredFields).forEach(([field, label]) => {
      const value = formData[field as keyof typeof formData];
      if (!value || (typeof value === "string" && !value.trim())) {
        missingFields.push(label);
      }
    });

    if (missingFields.length > 0) {
      setMessage({
        type: "error",
        text: `Please fill in the following required fields: ${missingFields.join(", ")}`,
      });
      setIsSubmitting(false);
      return;
    }

    console.log("Form data being submitted:", formData);

    try {
      const result = await campusAmbassadorService.submitApplication(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: `Thank you for registering! Your application has been submitted successfully. Welcome to the Internexis Ambassador Program!`,
        });

        // Reset form on success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          university: "",
          course: "",
          yearOfStudy: "",
          cgpa: "",
          linkedinUrl: "",
          portfolioUrl: "",
          skills: [],
          experience: "",
          motivation: "",
          whyInternexis: "",
          availabilityHours: "",
          startDate: "",
          referralSource: "",
          additionalInfo: "",
        });
      } else {
        setMessage({
          type: "error",
          text: "Failed to submit application. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);

      // Extract detailed error information
      let errorMessage = "Failed to submit application. Please try again.";

      if (error && typeof error === "object" && "message" in error) {
        errorMessage = error.message as string;
      }

      if (
        error &&
        typeof error === "object" &&
        "errors" in error &&
        Array.isArray(error.errors)
      ) {
        const errors = error.errors as string[];
        if (errors.length > 0) {
          errorMessage = errors.join(", ");
        }
      }

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="ambassador-form"
      className="py-20 relative overflow-hidden min-h-screen"
    >
      {/* Hero Background with University Campus Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/85 to-pink-900/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1920&q=80"
          alt="University Campus"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-400/20 rounded-full blur-lg animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-pink-400/15 rounded-full blur-2xl animate-blob" />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-cyan-400/20 rounded-full blur-lg animate-float animation-delay-2000" />
      </div>

      <div className="relative z-30 max-w-4xl mx-auto px-6">
        {" "}
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 mb-8 shadow-2xl animate-float">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full animate-pulse opacity-75"></div>
            <svg
              className="relative w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 leading-tight">
            Ambassador Application
          </h1>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
            Join our exclusive Campus Ambassador Program and become the face of{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold">
              Internexis
            </span>{" "}
            at your university
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>{" "}
        {/* Message Display */}
        {message && (
          <div
            className={`mb-10 p-8 rounded-2xl shadow-2xl border-2 transform transition-all duration-500 ${
              message.type === "success"
                ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 text-green-100 scale-105"
                : "bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/50 text-red-100"
            }`}
          >
            <div className="flex items-center justify-center">
              {message.type === "success" ? (
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 animate-pulse">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      🎉 Congratulations!
                    </h3>
                    <p className="text-lg font-medium">{message.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <svg
                    className="w-8 h-8 mr-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-lg font-medium">{message.text}</p>
                </div>
              )}
            </div>
          </div>
        )}{" "}
        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-400/10 to-red-400/10 rounded-full blur-lg"></div>

          <form
            onSubmit={handleSubmit}
            className="relative p-8 md:p-12 space-y-10"
          >
            {/* Personal Information Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {" "}
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="your.email@university.edu"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
            {/* Academic Information Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                Academic Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-white/90 font-medium">
                    University/College
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your university or college name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">
                    Course/Major
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., Computer Science, Business"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">
                    Year of Study
                  </label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" className="bg-gray-800">
                      Select Year
                    </option>
                    <option value="1st Year" className="bg-gray-800">
                      1st Year
                    </option>
                    <option value="2nd Year" className="bg-gray-800">
                      2nd Year
                    </option>
                    <option value="3rd Year" className="bg-gray-800">
                      3rd Year
                    </option>
                    <option value="4th Year" className="bg-gray-800">
                      4th Year
                    </option>
                    <option value="Graduate" className="bg-gray-800">
                      Graduate
                    </option>
                    <option value="Post Graduate" className="bg-gray-800">
                      Post Graduate
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">
                    CGPA/GPA
                  </label>
                  <input
                    type="text"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., 3.7/4.0 or 8.5/10.0"
                  />
                </div>
              </div>
            </div>
            {/* Skills & Experience Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                Skills & Experience
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={
                      Array.isArray(formData.skills)
                        ? formData.skills.join(", ")
                        : ""
                    }
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., Social Media Marketing, Event Management, Communication (comma-separated)"
                  />
                  <p className="text-white/60 text-sm">
                    Separate skills with commas
                  </p>
                </div>
              </div>
            </div>
            {/* Motivation Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                Motivation & Commitment
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">
                    Why do you want to be a Campus Ambassador?
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    placeholder="Share your motivation and what drives you to represent Internexis..."
                  />
                </div>
              </div>
            </div>
            {/* Additional Information Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">5</span>
                </div>
                Additional Information
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">
                    How did you hear about us?
                  </label>
                  <select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" className="bg-gray-800">
                      Select Source
                    </option>
                    <option value="Social Media" className="bg-gray-800">
                      Social Media
                    </option>
                    <option
                      value="University Career Fair"
                      className="bg-gray-800"
                    >
                      University Career Fair
                    </option>
                    <option value="Friend Referral" className="bg-gray-800">
                      Friend Referral
                    </option>
                    <option value="Online Search" className="bg-gray-800">
                      Online Search
                    </option>
                    <option value="Email Newsletter" className="bg-gray-800">
                      Email Newsletter
                    </option>
                    <option value="Other" className="bg-gray-800">
                      Other
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    placeholder="Any additional information you'd like to share? (optional)"
                  />
                </div>
              </div>
            </div>{" "}
            {/* Submit Button */}
            <div className="text-center pt-10">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`relative px-16 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden group ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 hover:shadow-3xl transform hover:scale-105 hover:-rotate-1"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-6 w-6 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting Application...
                    </>
                  ) : (
                    <>🚀 Submit Application</>
                  )}
                </span>
              </button>

              <p className="mt-6 text-white/80 text-base font-medium">
                ✨ Your information is secure and will be processed within 24-48
                hours
              </p>
              <div className="mt-4 flex justify-center space-x-4 text-white/60 text-sm">
                <span>🔒 Secure</span>
                <span>⚡ Fast Processing</span>
                <span>📱 Mobile Friendly</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AmbassadorForm;
