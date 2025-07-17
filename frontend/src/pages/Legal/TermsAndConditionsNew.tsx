// src/components/TermsAndConditionsNew.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Clock, User, Shield, X, Award, DollarSign, AlertTriangle, RefreshCw, Mail, Globe, Instagram, Linkedin } from "lucide-react";

export const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-all duration-300 hover:translate-x-1 group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                📜 Terms & Conditions
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                Internexis Internship Program
              </h2>
              <p className="text-lg text-gray-600 mb-4">Internexis Technologies Pvt Ltd</p>
              <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                <span className="text-sm font-medium text-blue-800">
                  Last Updated: July 16, 2025
                </span>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold mb-2">Welcome to Internexis! 🚀</h3>
              <p className="text-blue-100 leading-relaxed">
                By enrolling in or participating in any internship opportunity provided by Internexis, you agree to the following Terms and Conditions, which ensure a fair, respectful, and productive experience for all stakeholders. Please read these terms carefully before accepting your offer or commencing your internship.
              </p>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">1. ✅ Acceptance of Internship Offer</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>Upon receiving your Internexis Internship Offer Letter, you must confirm your acceptance within the timeframe mentioned in the offer (typically 3–5 days).</p>
                    <p>No response within the given time will be considered as an implicit acceptance of the internship role.</p>
                    <p>Once accepted, the intern agrees to abide by all rules, responsibilities, and expectations outlined herein.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">2. ⏳ Internship Duration</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>The internship tenure will be clearly mentioned in your offer letter or onboarding communication.</p>
                    <p>Interns are expected to be active and available during this period.</p>
                    <p>Extensions or early terminations may occur based on mutual agreement or performance issues.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">3. 🧑‍💻 Roles, Responsibilities & Expectations</h3>
                  <p className="text-gray-700 mb-4">Interns are expected to:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Actively participate in assigned tasks, training modules, meetings, or projects.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Maintain professionalism, punctuality, and regular communication with the mentor or supervisor.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Submit assigned deliverables within specified deadlines.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Abide by the company's remote work protocols, when applicable.
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-amber-800 font-medium">
                      Failure to fulfill assigned responsibilities may result in the withholding of completion certificates or termination.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">4. 🔐 Confidentiality & Intellectual Property</h3>
                  <p className="text-gray-700 mb-4">During your internship, you may have access to confidential, proprietary, or strategic information related to Internexis.</p>
                  <p className="text-gray-700 mb-4">You agree to:</p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Not disclose, share, or misuse any confidential information.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Not replicate or distribute any source code, design assets, internal documents, or project data.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Respect all copyrights, trademarks, and intellectual property owned by Internexis.
                    </li>
                  </ul>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium">
                      Breach of confidentiality may result in legal consequences and immediate termination.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">5. ❌ Grounds for Termination</h3>
                  <p className="text-gray-700 mb-4">Internexis reserves the right to terminate your internship under the following circumstances:</p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Violation of terms and policies mentioned herein.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Misconduct, harassment, or unprofessional behavior.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Plagiarism, cheating in assignments, or data misuse.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Prolonged absenteeism or non-performance without valid reason.
                    </li>
                  </ul>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium">
                      Terminated interns will not be eligible for certificates, stipends, or Letters of Recommendation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">6. 📄 Completion Certificates & Letters of Recommendation (LOR)</h3>
                  <p className="text-gray-700 mb-4">Interns will be eligible to receive a Certificate of Completion and/or Letter of Recommendation only if:</p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      The full duration of the internship is completed.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      All assigned tasks/projects are submitted satisfactorily.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Conduct and communication remain professional throughout the internship.
                    </li>
                  </ul>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 font-medium">
                      These documents will be digitally issued within 7–10 business days of completion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">7. 💸 Stipend Policy (If Applicable)</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>Stipends are only applicable to selected internships where it is explicitly mentioned.</p>
                    <p>Only those who successfully clear the interview round and fulfill performance criteria are eligible.</p>
                    <p>The amount, mode, and timeline of payment are subject to company discretion and may vary across domains.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">8. 🚫 No Guarantee of Full-Time Employment</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>Participation in the Internexis Internship Program does not imply or guarantee a full-time job offer.</p>
                    <p>However, outstanding performers may be considered for future roles or opportunities based on business requirements.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">9. 🔄 Modifications to Terms</h3>
                  <p className="text-gray-700 mb-4">Internexis may update or modify these terms at any time to reflect:</p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Legal, regulatory, or compliance changes
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Platform, policy, or program updates
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Operational improvements
                    </li>
                  </ul>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-800 font-medium">
                      Any major changes will be communicated via email or published on our official website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 mt-12 text-white">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">📩 Need Support?</h3>
              <p className="text-xl text-blue-100 mb-8">
                If you have any questions, feedback, or need help understanding these terms, feel free to contact us:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                <Mail className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h4 className="font-semibold mb-2">Email</h4>
                <p className="text-blue-100 text-sm">help.internexis@gmail.com</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                <Globe className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h4 className="font-semibold mb-2">Website</h4>
                <p className="text-blue-100 text-sm">www.internexis-technologies.in</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                <Instagram className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h4 className="font-semibold mb-2">Instagram</h4>
                <p className="text-blue-100 text-sm">@internexis_technologies</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                <Linkedin className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h4 className="font-semibold mb-2">LinkedIn</h4>
                <p className="text-blue-100 text-sm">Internexis Technologies Pvt Ltd</p>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mt-8 text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold text-blue-600">Internexis</span> is committed to empowering future professionals through real-world exposure, ethical practices, and mentorship. Let's build the future together! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
