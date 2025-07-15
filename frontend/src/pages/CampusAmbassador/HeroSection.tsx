import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900" />
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 3D Geometric Shapes */}
        <div className="absolute top-[15%] left-[10%] w-24 h-24 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl transform rotate-12 animate-float"></div>
        </div>
        <div className="absolute top-[30%] right-[15%] w-16 h-16 opacity-25">
          <div
            className="w-full h-full bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="absolute bottom-[20%] left-[20%] w-20 h-20 opacity-20">
          <div
            className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 transform rotate-45 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <div className="absolute top-[60%] right-[25%] w-14 h-14 opacity-30">
          <div
            className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg transform -rotate-12 animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Particle Effects */}
        <div className="absolute top-[25%] left-[60%] w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div
          className="absolute top-[45%] left-[15%] w-1 h-1 bg-blue-300 rounded-full opacity-80 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-[75%] right-[40%] w-1.5 h-1.5 bg-purple-300 rounded-full opacity-70 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse opacity-50"></div>{" "}
      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Main Content */}
          <div className="lg:w-1/2 text-center lg:text-left text-white">
            {/* Animated Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-lg rounded-full mb-8 border border-white/30 shadow-2xl">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-sm font-semibold text-white">
                  🎓 Applications Open 2025-26
                </span>
                <div className="ml-3 px-2 py-1 bg-red-500 rounded-full">
                  <span className="text-xs font-bold text-white">HOT</span>
                </div>
              </div>
            </div>

            {/* Dynamic Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight">
              <span className="block text-white drop-shadow-2xl">Become a</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                Campus
              </span>
              <span
                className="block bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-x"
                style={{ animationDelay: "0.5s" }}
              >
                Ambassador
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-2xl font-light">
              🚀 Lead the{" "}
              <span className="font-semibold text-cyan-300">
                tech revolution
              </span>{" "}
              at your university. Build your{" "}
              <span className="font-semibold text-pink-300">
                professional network
              </span>
              , gain real-world experience, and earn{" "}
              <span className="font-semibold text-yellow-300">
                exciting rewards
              </span>
              while helping peers discover amazing career opportunities!
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
              <button
                onClick={() =>
                  document
                    .getElementById("application-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center justify-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Apply Now - It's Free!
                </span>
              </button>

              <Link
                to="/apply-internship"
                className="group px-10 py-5 bg-white/10 backdrop-blur-lg text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center justify-center shadow-2xl"
              >
                <svg
                  className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Apply for Internship
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="group cursor-pointer">
                <div className="text-3xl font-black text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <div className="text-gray-300 text-sm font-medium">
                  Universities
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-3xl font-black text-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  ₹1L+
                </div>
                <div className="text-gray-300 text-sm font-medium">
                  Rewards Earned
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-3xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  2K+
                </div>
                <div className="text-gray-300 text-sm font-medium">
                  Ambassadors
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced 3D Card */}
          <div className="lg:w-1/2 relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl transform scale-110"></div>
            {/* Main Card - Reduced Size */}
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
              {/* Card Header - Compact */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl mb-3 shadow-2xl">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Program Highlights
                </h3>
                <p className="text-gray-300 text-xs">
                  Join India's fastest growing ambassador program
                </p>
              </div>
              {/* Compact Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="group text-center p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-white/10 hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-black text-cyan-400 mb-1">
                    500+
                  </div>
                  <div className="text-gray-300 text-xs font-medium">
                    Top Universities
                  </div>
                </div>
                <div className="group text-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-white/10 hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-black text-purple-400 mb-1">
                    ₹1L+
                  </div>
                  <div className="text-gray-300 text-xs font-medium">
                    Max Rewards
                  </div>
                </div>
                <div className="group text-center p-4 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-xl border border-white/10 hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-black text-pink-400 mb-1">
                    2K+
                  </div>
                  <div className="text-gray-300 text-xs font-medium">
                    Active Members
                  </div>
                </div>
                <div className="group text-center p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-white/10 hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-black text-yellow-400 mb-1">
                    24/7
                  </div>
                  <div className="text-gray-300 text-xs font-medium">
                    Live Support
                  </div>
                </div>
              </div>{" "}
              {/* Compact Benefits Preview */}
              <div className="space-y-3">
                <div className="flex items-center group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">
                      💰 Earn Up to ₹1L+ Rewards
                    </div>
                    <div className="text-gray-400 text-xs">
                      Cash + goodies + certificates
                    </div>
                  </div>
                </div>

                <div className="flex items-center group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">
                      🎯 Build Professional Network
                    </div>
                    <div className="text-gray-400 text-xs">
                      Connect with industry leaders
                    </div>
                  </div>
                </div>

                <div className="flex items-center group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">
                      🏆 Get Official Recognition
                    </div>
                    <div className="text-gray-400 text-xs">
                      Certificates + LinkedIn badges
                    </div>
                  </div>
                </div>
              </div>
              {/* CTA Button inside card */}
              <div className="mt-8 text-center">
                <button
                  onClick={() =>
                    document
                      .getElementById("benefits")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="relative flex items-center justify-center">
                    Explore All Benefits
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
