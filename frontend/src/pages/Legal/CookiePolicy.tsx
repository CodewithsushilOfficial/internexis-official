// src/components/CookiePolicy.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Settings, Target, Lock, RefreshCw, Mail, Globe, CheckCircle } from "lucide-react";

export const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-all duration-300 hover:translate-x-[-4px]"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>

        <section className="py-8 md:py-12" id="cookie-policy">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 mb-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  🍪 Cookie Policy
                </h1>
                <p className="text-xl text-blue-600 font-semibold">
                  Internexis Technologies Pvt Ltd
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
                <p className="text-gray-700 text-lg leading-relaxed">
                  At Internexis, we value your privacy and are committed to being transparent about how we use cookies and similar tracking technologies. This Cookie Policy outlines what cookies are, how we use them on our website and services, and how you can manage your cookie preferences.
                </p>
              </div>
            </div>

            {/* Section 1: What Are Cookies */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  🔍 1. What Are Cookies?
                </h2>
              </div>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Cookies are small data files stored on your browser, computer, or mobile device when you visit a website. They enable websites to recognize your device, remember your preferences, and provide a smoother, more personalized experience.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                In addition to cookies, we may also use other tracking technologies such as pixels, tags, and local storage.
              </p>
            </div>

            {/* Section 2: How We Use Cookies */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Settings className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  🛠 2. How We Use Cookies
                </h2>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                We use cookies and similar technologies for several key purposes:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">Session Management</h3>
                  </div>
                  <p className="text-green-700">To remember your login session and form submissions.</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center mb-3">
                    <Eye className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-800">Analytics & Insights</h3>
                  </div>
                  <p className="text-blue-700">To monitor website traffic, usage trends, and page performance using tools like Google Analytics.</p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                  <div className="flex items-center mb-3">
                    <Settings className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="font-semibold text-purple-800">Enhanced Functionality</h3>
                  </div>
                  <p className="text-purple-700">To support real-time features like chat support, form autofill, and personalized dashboards.</p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                  <div className="flex items-center mb-3">
                    <Target className="h-5 w-5 text-orange-600 mr-2" />
                    <h3 className="font-semibold text-orange-800">Marketing & Personalization</h3>
                  </div>
                  <p className="text-orange-700">To offer tailored content, promotions, and ads based on your interests or previous interactions.</p>
                </div>
              </div>
              
              <div className="mt-6 bg-red-50 p-6 rounded-xl border border-red-100">
                <div className="flex items-center mb-3">
                  <Lock className="h-5 w-5 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-800">Security & Fraud Prevention</h3>
                </div>
                <p className="text-red-700">To protect your session and detect suspicious activities.</p>
              </div>
            </div>

            {/* Section 3: Types of Cookies */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  🍪 3. Types of Cookies We Use
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 p-4 text-left font-semibold text-gray-900">Type</th>
                      <th className="border border-gray-200 p-4 text-left font-semibold text-gray-900">Purpose</th>
                      <th className="border border-gray-200 p-4 text-left font-semibold text-gray-900">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4 font-medium text-blue-700">Essential Cookies</td>
                      <td className="border border-gray-200 p-4 text-gray-700">Required for core site functionality and secure access.</td>
                      <td className="border border-gray-200 p-4 text-gray-600">Login session, form submission, authentication</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4 font-medium text-green-700">Performance Cookies</td>
                      <td className="border border-gray-200 p-4 text-gray-700">Help us understand how users interact with our website.</td>
                      <td className="border border-gray-200 p-4 text-gray-600">Google Analytics, page speed trackers</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4 font-medium text-purple-700">Functionality Cookies</td>
                      <td className="border border-gray-200 p-4 text-gray-700">Enable personalization based on your choices.</td>
                      <td className="border border-gray-200 p-4 text-gray-600">Remembering language, theme, or region</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4 font-medium text-orange-700">Marketing Cookies</td>
                      <td className="border border-gray-200 p-4 text-gray-700">Track browsing behavior to deliver personalized ads.</td>
                      <td className="border border-gray-200 p-4 text-gray-600">Google Ads, Facebook Pixel</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4 font-medium text-red-700">Third-Party Cookies</td>
                      <td className="border border-gray-200 p-4 text-gray-700">Set by services integrated into our platform.</td>
                      <td className="border border-gray-200 p-4 text-gray-600">YouTube embeds, chatbots, Razorpay, LinkedIn insights</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <p className="text-yellow-800">
                  <strong>Note:</strong> We may also use cookie-like technologies in our emails and newsletters to understand open rates and engagement.
                </p>
              </div>
            </div>

            {/* Section 4: Managing Cookies */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Settings className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  ⚙️ 4. Managing & Controlling Cookies
                </h2>
              </div>
              
              <p className="text-gray-700 mb-6 text-lg">You can control how cookies are used via:</p>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center mb-3">
                    <Globe className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-800">Browser Settings</h3>
                  </div>
                  <p className="text-blue-700">
                    You can block or delete cookies through your browser's security/privacy settings. Instructions vary by browser (Chrome, Firefox, Safari, Edge, etc.).
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">In-App Cookie Banners</h3>
                  </div>
                  <p className="text-green-700">
                    On your first visit, our website shows a cookie consent banner allowing you to accept, reject, or customize cookie categories.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                  <div className="flex items-center mb-3">
                    <Eye className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="font-semibold text-purple-800">Opting Out of Analytics</h3>
                  </div>
                  <p className="text-purple-700">
                    To opt out of Google Analytics tracking, you can use{" "}
                    <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                      this browser add-on
                    </a>.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <p className="text-yellow-800">
                  <strong>Note:</strong> Disabling certain cookies may limit some features or functionality on the Internexis platform.
                </p>
              </div>
            </div>

            {/* Section 5: Policy Updates */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <RefreshCw className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  🔄 5. Policy Updates
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 text-lg">
                  We may revise this Cookie Policy to reflect changes in legal requirements, technology, or our services.
                </p>
                <p className="text-gray-700 text-lg">
                  The latest version will always be available on this page.
                </p>
                <p className="text-gray-700 text-lg">
                  In case of significant updates, we will notify you via email or an in-platform notification.
                </p>
              </div>
              
              <div className="mt-6 bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-blue-800 font-semibold">Effective Date: July 16, 2025</p>
                    <p className="text-blue-700">Version: 1.0</p>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-12 rounded-2xl shadow-xl text-white">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  📩 Have Questions?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  We're happy to help!
                </p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <p className="text-lg mb-6 text-center text-blue-100">
                  If you have any questions about our Cookie Policy or your data privacy:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center mb-3">
                      <Mail className="h-5 w-5 text-blue-200 mr-2" />
                      <h3 className="font-semibold text-blue-100">Email</h3>
                    </div>
                    <p className="text-white font-medium">help.internexis@gmail.com</p>
                  </div>
                  
                  <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center mb-3">
                      <Globe className="h-5 w-5 text-blue-200 mr-2" />
                      <h3 className="font-semibold text-blue-100">Website</h3>
                    </div>
                    <p className="text-white font-medium">www.internexis-technologies.in</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                    <p className="text-lg mb-2">
                      <CheckCircle className="inline h-5 w-5 mr-2 text-green-300" />
                      Your privacy is our priority. Thank you for trusting Internexis.
                    </p>
                    <p className="text-blue-200 font-medium">
                      – Team Internexis Technologies Pvt Ltd
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
