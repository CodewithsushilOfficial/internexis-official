// src/components/RefundPolicy.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Clock, Mail, Globe, Instagram, Linkedin } from "lucide-react";

export const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-all duration-300 hover:translate-x-1 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-blue-100"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl">🚫💰</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cancellation & Refund Policy
          </h1>
          <p className="text-xl text-gray-600 mb-2">Internexis Technologies Pvt Ltd</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {/* Introduction Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Internexis, we understand that sometimes plans change—and that's okay! We're committed to offering a transparent, fair, and student-first cancellation and refund experience across all our services, including <span className="font-semibold text-blue-600">Internships</span>, <span className="font-semibold text-purple-600">Courses</span>, and <span className="font-semibold text-green-600">Mentorship Programs</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Need to Cancel Section */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Need to Cancel? No Worries!</h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Life is unpredictable, and we totally understand! You can request a cancellation within <span className="font-semibold text-blue-600">5 days of registration</span>, provided you haven't accessed any learning materials or joined live sessions.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">To initiate a cancellation, simply:</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Email us at <span className="font-semibold text-blue-600">help.internexis@gmail.com</span></span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Or use the contact form on our official website</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg">
              We aim to process and review every request quickly, respectfully, and fairly.
            </p>
          </div>

          {/* Eligibility Section */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">💡</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Am I Eligible for a Refund?</h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              To be eligible for a refund, you must meet all of the following criteria:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">The refund request is submitted within <span className="font-semibold">5 calendar days</span> of purchase/registration.</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-gray-700">You have not:</span>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-600">
                    <li>Accessed or downloaded any internship/training/course materials.</li>
                    <li>Attended or participated in any live mentorship sessions, classes, or workshops.</li>
                    <li>Received any personalized support, project assignments, or onboarding resources.</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">The request doesn't conflict with any program-specific terms (if applicable).</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-blue-800 font-medium">
                <strong>Note:</strong> Refunds are assessed on a case-by-case basis, ensuring fair treatment for every learner.
              </p>
            </div>
          </div>

          {/* Refund Timeline Section */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How Long Will My Refund Take?</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold text-green-600">1</span>
                </div>
                <p className="text-gray-700">Once your refund request is approved, we initiate the refund within <span className="font-semibold text-purple-600">5–7 business days</span>.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold text-blue-600">2</span>
                </div>
                <p className="text-gray-700">Refunds will be credited via your original payment method (UPI, Card, Net Banking, etc.).</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold text-yellow-600">3</span>
                </div>
                <p className="text-gray-700">Any minimal transaction or gateway charges (as per Razorpay or banking partner) will be deducted.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-100 mt-6">
              <p className="text-gray-800 font-medium text-center">
                We believe in being fast, fair, and transparent—always. ⚡
              </p>
            </div>
          </div>

          {/* Non-Refundable Section */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What's Non-Refundable?</h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Some items and scenarios fall outside our refund policy:
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">If you've started your internship, training, or mentorship program.</span>
              </div>
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">If you've accessed premium learning materials, project work, quizzes, or videos.</span>
              </div>
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">If the program was part of a discounted bundle, special promotion, or early bird offer.</span>
              </div>
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">If you've received government-authorized certifications, official registration IDs, or internship offer letters.</span>
              </div>
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">If you're requesting a refund after 5 days of enrollment.</span>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <p className="text-red-800 font-medium">
                These limitations help us maintain quality, resource planning, and a fair experience for all.
              </p>
            </div>
          </div>

          {/* Policy Updates Section */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Policy Updates</h2>
            </div>
            <p className="text-gray-700 mb-4 text-lg">
              We may update this policy from time to time to reflect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Legal or regulatory changes</li>
              <li>Platform or payment updates (e.g., Razorpay)</li>
              <li>Or user experience improvements</li>
            </ul>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <p className="text-indigo-800 font-medium">
                All updates will be clearly communicated via email and/or posted on our official website.
              </p>
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-lg text-white mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <span className="text-3xl">📨</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Need Support?</h2>
              <p className="text-blue-100 text-lg">Got a question or want to talk to our support team?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-200" />
                    <span>help.internexis@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-blue-200" />
                    <span>https://www.internexis-technologies.in</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Instagram className="h-5 w-5 text-pink-200" />
                    <span>@internexis_technologies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="h-5 w-5 text-blue-200" />
                    <span>Internexis Technologies Pvt Ltd</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-blue-100 text-lg">
                We're here to support your journey, every step of the way. <span className="text-2xl">🌟</span>
              </p>
            </div>
          </div>

          {/* Footer Information */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-600 font-medium">
                  <strong>Last Updated:</strong> July 16, 2025
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-600 font-medium">
                  <strong>Effective For:</strong> All internship, course, and mentorship registrations made via Internexis and Razorpay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
