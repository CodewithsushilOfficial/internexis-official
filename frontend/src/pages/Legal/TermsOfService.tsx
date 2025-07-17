import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Users, GraduationCap, CreditCard, BookOpen, Award, Lock, FileText, AlertTriangle, RefreshCw, Scale, Mail } from "lucide-react";

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-all duration-300 hover:bg-blue-50 p-3 rounded-lg w-fit"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>

        <section className="py-16 md:py-24" id="terms">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12 md:mb-16">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  📜 Terms of Service
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 inline-block">
                  <p className="text-lg text-gray-700 mb-2">
                    <strong>Effective Date:</strong> July 16, 2025
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong>Last Updated:</strong> July 16, 2025
                  </p>
                </div>
              </div>

              {/* Introduction */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700">
                    Welcome to <strong>Internexis Technologies Pvt Ltd</strong> ("Internexis," "we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website{" "}
                    <a
                      href="https://www.internexis-technologies.in"
                      className="text-blue-600 hover:text-blue-800 transition-colors font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.internexis-technologies.in
                    </a>, and all related products, services, and programs including internships, courses, mentorships, and career resources.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
                    <p className="text-blue-800 mb-0">
                      <strong>⚠️ Important:</strong> By using our platform, you agree to be legally bound by these Terms. If you do not agree, please discontinue use of the platform immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 1: Eligibility */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">1. 🔒 Eligibility</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p>To register and access Internexis services, you must:</p>
                  <ul className="list-none pl-0 space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <span>Be 16 years or older.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <span>Be a student, recent graduate, or professional pursuing skill development.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <span>Provide true, accurate, and complete information during registration.</span>
                    </li>
                  </ul>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-6">
                    <p className="text-yellow-800 mb-0">
                      <strong>Note:</strong> We reserve the right to verify your identity, enrollment status, or educational background before or during any program.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Services Offered */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <GraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">2. 🎓 Services Offered</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p>Internexis provides remote/virtual internship and learning programs in domains such as:</p>
                  <div className="grid md:grid-cols-2 gap-4 my-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">💻 Web Development</h4>
                      <p className="text-sm text-blue-700">Frontend, Backend, MERN Full Stack</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">📱 Android App Development</h4>
                      <p className="text-sm text-green-700">Mobile application development</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">🤖 AI & Machine Learning</h4>
                      <p className="text-sm text-purple-700">Artificial Intelligence & ML</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-2">⚡ Core Programming</h4>
                      <p className="text-sm text-orange-700">C, C++, Java, JavaScript, Python, PHP, React, etc.</p>
                    </div>
                  </div>
                  <p><strong>Each program typically includes:</strong></p>
                  <ul className="list-none pl-0 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">🎯</span>
                      <span>Online training modules & materials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">💼</span>
                      <span>Real-world or simulated project work</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">👨‍🏫</span>
                      <span>Live mentorship and chat support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">🏆</span>
                      <span>Certificates (Training, Internship, Completion)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">📊</span>
                      <span>Performance reports for multi-month programs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">🌟</span>
                      <span><strong>Bonus:</strong> Recognition, rewards, and hiring recommendations for top performers</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Registration & Account Usage */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">3. 👤 Registration & Account Usage</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p>To participate in our programs, you are required to:</p>
                  <ul className="list-none pl-0 space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">🔐</span>
                      <span>Create an account using valid credentials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">🔒</span>
                      <span>Keep your login details confidential</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">🚫</span>
                      <span>Avoid sharing your access with others</span>
                    </li>
                  </ul>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-6">
                    <p className="text-red-800 mb-0">
                      <strong>⚠️ Important:</strong> You agree to be fully responsible for any actions under your account. We may suspend or terminate your account for any misrepresentation or policy violation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4: Payments & Refund Policy */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">4. 💳 Payments & Refund Policy</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">4.1 Pricing (as per program duration):</h4>
                  <div className="grid md:grid-cols-3 gap-4 my-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">₹199</div>
                      <div className="text-blue-800 font-semibold">1 Month Internship</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">₹299</div>
                      <div className="text-green-800 font-semibold">2 Months Internship</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">₹599</div>
                      <div className="text-purple-800 font-semibold">5 Months Internship</div>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">4.2 Refund Policy:</h4>
                  <p>Fees are <strong>non-refundable</strong>, except in the following cases:</p>
                  <ul className="list-none pl-0 space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-3 mt-1">❌</span>
                      <span>Internexis cancels the program or fails to deliver services.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-3 mt-1">✅</span>
                      <span>You qualify under our Cancellation & Refund Policy.</span>
                    </li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
                    <p className="text-blue-800 mb-0">
                      <strong>💡 Note:</strong> Any refund processed will exclude Razorpay gateway charges and will be returned within 5–7 business days to the original payment method.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5: Internship Code of Conduct */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">5. 📘 Internship Code of Conduct</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p>By enrolling in any program, you agree to:</p>
                  <ul className="list-none pl-0 space-y-3">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-3 mt-1">⏰</span>
                      <span>Submit assigned tasks and projects by deadlines</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-3 mt-1">🚫</span>
                      <span>Avoid plagiarism or copying of any kind</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-3 mt-1">🤝</span>
                      <span>Communicate respectfully with mentors, peers, and staff</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-3 mt-1">⚖️</span>
                      <span>Refrain from misusing platform features or impersonating others</span>
                    </li>
                  </ul>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-6">
                    <p className="text-red-800 mb-0">
                      <strong>⚠️ Warning:</strong> Violations may result in removal from the program without refund or issuance of any certificate.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 6: Certification Policy */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">6. 🏅 Certification Policy</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p>Certificates (Training & Internship) are awarded only if you:</p>
                  <ul className="list-none pl-0 space-y-3">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-3 mt-1">✅</span>
                      <span>Successfully complete all assigned work</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-3 mt-1">🎯</span>
                      <span>Attend sessions (if applicable) and meet performance benchmarks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-3 mt-1">📝</span>
                      <span>Pass any required assessments or evaluations</span>
                    </li>
                  </ul>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
                    <p className="text-green-800 mb-0">
                      <strong>🔒 Security:</strong> All certificates contain a unique verification ID that can be authenticated via our certificate verification portal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 7: Intellectual Property Rights */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-red-100 p-3 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">7. 📚 Intellectual Property Rights</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p>All materials, designs, code, and content provided through Internexis are:</p>
                  <ul className="list-none pl-0 space-y-3">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-3 mt-1">©️</span>
                      <span>The intellectual property of Internexis Technologies Pvt Ltd or its licensors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-3 mt-1">🇮🇳</span>
                      <span>Protected by Indian copyright and intellectual property laws</span>
                    </li>
                  </ul>
                  <p className="mt-6 font-semibold">You agree not to:</p>
                  <ul className="list-none pl-0 space-y-3">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-3 mt-1">❌</span>
                      <span>Reproduce, distribute, sell, or share our learning content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-3 mt-1">⚠️</span>
                      <span>Use Internexis projects as your own for public or academic submissions without acknowledgment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-3 mt-1">🔧</span>
                      <span>Copy or reverse-engineer any system or tool used by the platform</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 8: Privacy Policy */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">8. 🔐 Privacy Policy</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p>We respect your privacy. Personal information collected (name, email, academic details, etc.) is used solely to:</p>
                  <ul className="list-none pl-0 space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">🎓</span>
                      <span>Facilitate your learning experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">📊</span>
                      <span>Track your progress</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">🏆</span>
                      <span>Provide support and certificates</span>
                    </li>
                  </ul>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
                    <p className="text-green-800 mb-0">
                      <strong>🔒 Data Protection:</strong> No data is sold or shared with third parties without your express consent. For full details, please read our Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 9: Limitation of Liability */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">9. ⚖️ Limitation of Liability</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p>Internexis is not liable for:</p>
                  <ul className="list-none pl-0 space-y-3">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-3 mt-1">💥</span>
                      <span>Any indirect, incidental, or consequential damages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-3 mt-1">💾</span>
                      <span>Data loss or platform inaccessibility due to external server issues</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-3 mt-1">👥</span>
                      <span>Misuse of the platform by other users</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-3 mt-1">💼</span>
                      <span>Employment outcomes (we do not guarantee job placements)</span>
                    </li>
                  </ul>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mt-6">
                    <p className="text-orange-800 mb-0">
                      <strong>⚠️ Disclaimer:</strong> Use of our services is at your own discretion and risk.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 10: Changes to Services or Terms */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <RefreshCw className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">10. 🔄 Changes to Services or Terms</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p>Internexis reserves the right to:</p>
                  <ul className="list-none pl-0 space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">📚</span>
                      <span>Modify or discontinue any internship or course offering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">📝</span>
                      <span>Update these Terms at any time without prior notice</span>
                    </li>
                  </ul>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mt-6">
                    <p className="text-purple-800 mb-0">
                      <strong>📬 Updates:</strong> Changes will be posted on this page and/or emailed to registered users. Continued use of the platform constitutes acceptance of the revised Terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 11: Governing Law */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Scale className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">11. 🏛 Governing Law</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <ul className="list-none pl-0 space-y-3 mb-0">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1">🇮🇳</span>
                        <span>These Terms are governed by the laws of the <strong>Republic of India</strong>.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1">⚖️</span>
                        <span>Any disputes shall be resolved in the jurisdiction of the competent courts in India.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 12: Contact Us */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">12. 📬 Contact Us</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p>If you have any questions, concerns, or require legal clarification:</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">📧</span>
                        <strong className="text-blue-900">Email</strong>
                      </div>
                      <a
                        href="mailto:help.internexis@gmail.com"
                        className="text-blue-600 hover:text-blue-800 transition-colors font-semibold"
                      >
                        help.internexis@gmail.com
                      </a>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">🌐</span>
                        <strong className="text-green-900">Website</strong>
                      </div>
                      <a
                        href="https://www.internexis-technologies.in"
                        className="text-green-600 hover:text-green-800 transition-colors font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        www.internexis-technologies.in
                      </a>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mt-4">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">🏢</span>
                      <strong className="text-purple-900">Registered Address</strong>
                    </div>
                    <span className="text-purple-700">Virtual HQ – India</span>
                  </div>
                </div>
              </div>

              {/* Final Notice */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 md:p-8 rounded-xl text-white text-center shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Thank You for Reading!</h3>
                <p className="text-lg mb-4">
                  This Terms of Service agreement outlines your legal rights and responsibilities while using our platform. 
                  We encourage you to read them carefully before proceeding.
                </p>
                <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <p className="mb-0 font-semibold">
                    📅 These Terms were last updated on July 16, 2025
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
