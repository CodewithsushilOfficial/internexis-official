// src/components/PrivacyPolicy.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Users, Clock, Globe, Mail, MapPin } from "lucide-react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <section className="py-8 md:py-12" id="privacy">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                <Lock className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
              </div>
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">Internexis Technologies Pvt Ltd</h2>
                <p className="text-blue-100 text-lg">Effective Date: July 12, 2025</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  Internexis Technologies Pvt Ltd ("Internexis", "we", "us", or "our") values your privacy and data rights. 
                  This Privacy Policy explains how we collect, process, use, store, and protect your personal information when 
                  you interact with our digital platforms and services, including our website, mobile app, learning management 
                  system (LMS), internship programs, and any other offerings (collectively, the "Platform").
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 mb-8">
                  <p className="text-blue-800 font-medium mb-0">
                    By accessing or using our Platform, you consent to the practices outlined in this policy.
                  </p>
                </div>

                {/* Section 1: Information We Collect */}
                <div className="mb-10">
                  <h3 className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                    <Eye className="h-8 w-8 mr-3 text-blue-600" />
                    1. 📥 Information We Collect
                  </h3>
                  <p className="text-gray-700 mb-6">We may collect the following categories of information:</p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">1.1 Personal Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          "Full Name", "Email Address", "Phone Number", "College/University Name",
                          "Course or Stream", "Date of Birth", "Residential Address (when required for documentation)",
                          "Profile Photo (optional)", "Government-issued ID (only in rare verification cases)"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">1.2 Technical Data</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          "IP Address and Location", "Device Type and Operating System", "Browser Information",
                          "Pages Visited, Time Spent, Clicks", "Login Activity and Timestamps", "Referral Sources"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">1.3 Cookies & Tracking</h4>
                      <p className="text-gray-700">
                        We use cookies and similar technologies for performance monitoring, personalization, and marketing. 
                        You may control cookies in your browser settings.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2: How We Use Information */}
                <div className="mb-10">
                  <h3 className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                    <Users className="h-8 w-8 mr-3 text-blue-600" />
                    2. 🎯 How We Use Your Information
                  </h3>
                  <p className="text-gray-700 mb-6">Your data helps us deliver quality services and enhance your experience. We use your information for:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Internship/Training registration and management",
                      "Certificate generation and verification",
                      "Course enrollment and progress tracking",
                      "Communications (program updates, reminders, support)",
                      "Issuing invoices, receipts, and legal documents",
                      "Analyzing usage for service improvements",
                      "Ensuring platform security and compliance"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start bg-blue-50 p-4 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Data Security */}
                <div className="mb-10">
                  <h3 className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                    <Shield className="h-8 w-8 mr-3 text-blue-600" />
                    3. 🔐 Data Security
                  </h3>
                  <p className="text-gray-700 mb-6">We implement industry-grade security protocols to safeguard your data:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[
                      "SSL/TLS encryption for all transmitted data",
                      "Role-based access controls",
                      "Encrypted data storage where applicable",
                      "Two-Factor Authentication (2FA) for admin access",
                      "Periodic security audits and penetration testing"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start bg-green-50 p-4 rounded-lg">
                        <Shield className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> Despite our best efforts, no system is completely secure. You agree to use the Platform 
                      at your own risk and take precautions such as strong passwords.
                    </p>
                  </div>
                </div>

                {/* Section 4: Data Sharing */}
                <div className="mb-10">
                  <h3 className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                    <Users className="h-8 w-8 mr-3 text-blue-600" />
                    4. 🧩 Data Sharing and Disclosure
                  </h3>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                    <p className="text-red-800 font-semibold">
                      We do not sell or rent your personal information to third parties.
                    </p>
                  </div>
                  
                  <p className="text-gray-700 mb-4">However, we may share limited data:</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "With trusted third-party service providers (e.g., email services, analytics platforms, payment gateways)",
                      "For legal or regulatory requirements",
                      "With certificate-verification portals (only public details like your name and certificate ID)"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-800 text-sm">
                      All vendors are contractually obligated to maintain confidentiality.
                    </p>
                  </div>
                </div>

                {/* Section 5: Your Rights */}
                <div className="mb-10">
                  <h3 className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                    <Lock className="h-8 w-8 mr-3 text-blue-600" />
                    5. 📋 Your Rights
                  </h3>
                  <p className="text-gray-700 mb-6">You have full control over your data. You may:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[
                      "Request access to your data",
                      "Correct or update inaccurate data",
                      "Request deletion of your data (as per retention rules)",
                      "Withdraw consent for marketing emails",
                      "Request data export (in applicable jurisdictions)"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start bg-purple-50 p-4 rounded-lg">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-2"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-800">
                      To exercise these rights, email us at <a href="mailto:help.internexis@gmail.com" className="text-blue-600 hover:text-blue-800 font-medium">help.internexis@gmail.com</a>
                    </p>
                  </div>
                </div>

                {/* Section 6: Data Retention */}
                <div className="mb-10">
                  <h3 className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                    <Clock className="h-8 w-8 mr-3 text-blue-600" />
                    6. ⏳ Data Retention
                  </h3>
                  <p className="text-gray-700 mb-6">We retain your data based on purpose:</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-4 text-left font-semibold">Data Type</th>
                          <th className="border border-gray-300 p-4 text-left font-semibold">Retention Period</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Internship Records", "5 Years (Legal Compliance)"],
                          ["Certificate Data", "Lifetime (for verification)"],
                          ["Technical Logs", "12 Months"],
                          ["Support Queries", "Until resolved + 6 months"],
                          ["Marketing Opt-in Info", "Until Unsubscribed"]
                        ].map(([type, period], index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border border-gray-300 p-4 font-medium">{type}</td>
                            <td className="border border-gray-300 p-4">{period}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <p className="text-gray-700 mt-4">
                    Once data is no longer needed, it is securely deleted or anonymized.
                  </p>
                </div>

                {/* Section 7: Cross-Border Data Transfers */}
                <div className="mb-10">
                  <h3 className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                    <Globe className="h-8 w-8 mr-3 text-blue-600" />
                    7. 🌍 Cross-Border Data Transfers
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Some services we use (like hosting, analytics) may store data outside India. We ensure all international 
                    data transfers comply with relevant privacy laws (e.g., GDPR), using:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      "Standard contractual clauses",
                      "Secure encrypted infrastructure",
                      "Compliance assessments of service providers"
                    ].map((item, index) => (
                      <div key={index} className="bg-indigo-50 p-4 rounded-lg text-center">
                        <Globe className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                        <p className="text-gray-700 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional sections with similar styling... */}
                {/* Section 8: Children's Privacy */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8. 👶 Children's Privacy</h3>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-orange-800">
                      Our services are intended for individuals aged 16 and above. If you believe we have collected data 
                      from a minor, contact us immediately to have it removed.
                    </p>
                  </div>
                </div>

                {/* Section 9: App Permissions */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">9. 📱 App Permissions</h3>
                  <p className="text-gray-700 mb-4">For those using the Internexis mobile app:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                      <span className="text-gray-700">We may request camera, microphone, or storage access to enable features like live sessions or uploads.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                      <span className="text-gray-700">Permissions are optional and can be revoked through your device settings.</span>
                    </li>
                  </ul>
                </div>

                {/* Section 10: Communication Preferences */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">10. 📤 Communication Preferences</h3>
                  <p className="text-gray-700 mb-4">By registering on our platform, you consent to receive:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[
                      "Internship or course updates",
                      "Program reminders",
                      "Important announcements"
                    ].map((item, index) => (
                      <div key={index} className="bg-green-50 p-4 rounded-lg text-center">
                        <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-gray-700 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-800 text-sm">
                      You can unsubscribe from promotional emails anytime via the footer link or by emailing us at 
                      <a href="mailto:help.internexis@gmail.com" className="text-blue-600 hover:text-blue-800 font-medium"> help.internexis@gmail.com</a> with "Unsubscribe" in the subject.
                    </p>
                  </div>
                </div>

                {/* Section 11: Legal Basis */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">11. ⚖️ Legal Basis for Processing</h3>
                  <p className="text-gray-700 mb-4">We process your data based on:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ["Consent", "newsletter sign-up, form submission"],
                      ["Contract", "course/internship participation"],
                      ["Legitimate Interest", "platform security and improvements"],
                      ["Legal Obligation", "audits, law enforcement"]
                    ].map(([basis, description], index) => (
                      <div key={index} className="bg-blue-50 p-4 rounded-lg">
                        <p className="font-semibold text-blue-800">{basis}</p>
                        <p className="text-gray-700 text-sm">({description})</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 12: Policy Updates */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">12. 🔄 Policy Updates</h3>
                  <p className="text-gray-700 mb-4">We may update this Privacy Policy periodically to reflect:</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Legal changes",
                      "New services or features",
                      "Security enhancements"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 text-sm">
                      Changes will be posted with the "Last Updated" date. You are encouraged to review this page regularly.
                    </p>
                  </div>
                </div>

                {/* Section 13: Contact Us */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">13. 📞 Contact Us</h3>
                  <p className="text-gray-700 mb-6">
                    For any privacy-related queries, concerns, or data access requests, please reach out:
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl">
                    <h4 className="text-xl font-semibold mb-4">Internexis Technologies Pvt Ltd</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-blue-100">help.internexis@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 mr-3" />
                        <div>
                          <p className="font-medium">Website</p>
                          <p className="text-blue-100">www.internexis-technologies.in</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-blue-100">Operating in India (remote-first)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 14: Summary Table */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">14. 🧾 Summary Table of Data Use</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                          <th className="border border-gray-300 p-4 text-left font-semibold">Data Type</th>
                          <th className="border border-gray-300 p-4 text-left font-semibold">Use Case</th>
                          <th className="border border-gray-300 p-4 text-left font-semibold">Shared With</th>
                          <th className="border border-gray-300 p-4 text-left font-semibold">Retention</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Name, Email, Phone", "Registration, contact, certificates", "Internal staff, certificate API", "5 years or lifetime"],
                          ["IP Address, Device", "Analytics, security", "Google Analytics, log system", "12 months"],
                          ["College Information", "Internship validation", "Internal use only", "5 years"],
                          ["Uploaded Documents", "Verification, project submissions", "Not shared externally", "Duration of program + 1 year"],
                          ["Certificate Data", "Public validation", "Verification Tool", "Lifetime"]
                        ].map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="border border-gray-300 p-4 text-sm">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 15: Final Commitment */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">15. 🧠 Final Commitment</h3>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border border-green-200">
                    <p className="text-gray-800 text-lg leading-relaxed mb-4">
                      We are committed to respecting your privacy, building secure systems, and earning your trust every step of the way. 
                      Internexis Technologies believes in <strong>"Privacy by Design, Trust by Default"</strong> and will continue enhancing 
                      its privacy controls as we grow.
                    </p>
                    <p className="text-center text-xl font-semibold text-blue-800">
                      Thank you for choosing Internexis Technologies Pvt Ltd.
                    </p>
                  </div>
                </div>

                {/* Last Updated Footer */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Last Updated</span>
                  </div>
                  <p className="text-blue-100">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
