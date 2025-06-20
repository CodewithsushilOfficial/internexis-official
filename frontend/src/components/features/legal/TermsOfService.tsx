import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Link 
          to="/" 
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
        
        <section className="py-16 md:py-24 bg-gray-50" id="terms">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Terms of Service
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Please read these terms carefully before using our platform
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
            <div className="prose prose-lg max-w-none">
              <p>
                Welcome to Internexis ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website 
                <a href="https://www.internexis-technologies.in" className="text-blue-600 hover:underline">www.internexis-technologies.in</a> and the virtual internship services we provide. 
                By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. 
                If you do not agree, please do not use our services.
              </p>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">1. Eligibility</h3>
              <p>To use Internexis, you must:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Be at least 16 years old.</li>
                <li>Be a student, graduate, or professional interested in skill development or career training.</li>
                <li>Provide accurate information during registration.</li>
              </ul>
              <p>We reserve the right to verify your identity and academic status before or during the internship.</p>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">2. Services Provided</h3>
              <p>Internexis offers virtual internship programs in the following domains:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Web Development (Frontend, Backend, Full Stack)</li>
                <li>Android App Development</li>
                <li>Artificial Intelligence & Machine Learning</li>
                <li>Programming Languages (C, C++, Java, JavaScript, Python, PHP, React)</li>
              </ul>
              <p>Each internship program includes:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Online training and learning materials</li>
                <li>Real-world or industry-inspired projects</li>
                <li>Certificate of Training & Certificate of Internship</li>
                <li>Evaluation report (for multi-month programs)</li>
                <li>Mentorship and support during the internship</li>
                <li>Possible rewards or full-time job recommendations for top performers</li>
              </ul>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">3. Registration & Account Responsibility</h3>
              <p>To access internship programs, users must create an account. You agree to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Provide true, current, and complete information.</li>
                <li>Maintain the confidentiality of your account login credentials.</li>
                <li>Accept responsibility for all activities under your account.</li>
              </ul>
              <p>We reserve the right to suspend or terminate your account if information provided is inaccurate or violates our code of conduct.</p>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">4. Payments & Refund Policy</h3>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">4.1 Fees</h4>
              <p>All internship programs are prepaid and priced as follows:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>1 Month – ₹199</li>
                <li>2 Months – ₹299</li>
                <li>5 Months – ₹599</li>
              </ul>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">4.2 Refunds</h4>
              <p>All fees are <strong>non-refundable</strong>, except in cases where Internexis cancels the internship or fails to deliver the service.</p>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">5. Internship Code of Conduct</h3>
              <p>By enrolling, you agree to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Complete assignments and projects in a timely manner.</li>
                <li>Maintain academic honesty — no plagiarism or copied submissions.</li>
                <li>Respect mentors, peers, and support staff.</li>
                <li>Use respectful language in all communications.</li>
              </ul>
              <p>Violation of this code may result in termination of your access and forfeiture of certificates without refund.</p>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">6. Certification Policy</h3>
              <p>Certificates are issued only when:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>All required projects and tasks are completed.</li>
                <li>You pass evaluation criteria set by the program.</li>
                <li>Any assessments are submitted before deadlines.</li>
              </ul>
              <p>Certificates include a unique verification ID and can be verified through our portal.</p>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">7. Intellectual Property</h3>
              <p>
                All content on the Internexis platform — including courses, images, logos, designs, code samples, and illustrations — is the property of Internexis or its partners and is protected under copyright law. Unauthorized reproduction or distribution is strictly prohibited.
              </p>
              <p>You may not:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Share, resell, or distribute course materials.</li>
                <li>Submit Internexis projects as your original work elsewhere without disclosure.</li>
              </ul>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">8. Privacy Policy</h3>
              <p>
                Your data privacy is important to us. We collect personal information only to facilitate your internship experience. Data is not shared with third parties without consent. Please read our <a href="#privacy" className="text-blue-600 hover:underline">Privacy Policy</a> for full details.
              </p>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">9. Limitation of Liability</h3>
              <p>Internexis is not responsible for:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Loss of data or content.</li>
                <li>Delays in service delivery due to external factors.</li>
                <li>Misuse of the platform by users.</li>
              </ul>
              <p>We do not guarantee job placement. Our platform is meant for learning and skill-building, not guaranteed employment.</p>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">10. Changes to Services or Terms</h3>
              <p>We reserve the right to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Modify or discontinue any service or program.</li>
                <li>Update these Terms at any time. Changes will be posted on this page.</li>
              </ul>
              <p>By continuing to use the service after changes, you agree to the updated terms.</p>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">11. Governing Law</h3>
              <p>These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts located in India.</p>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">12. Contact Us</h3>
              <p>For any questions or legal concerns related to these Terms of Service:</p>
              <ul className="list-none pl-0 mb-6">
                <li className="flex items-center mb-2">
                  <span className="mr-2">📧</span> <strong>Email:</strong> <a href="mailto:help.internexis@gmail.com" className="text-blue-600 hover:underline ml-1">help.internexis@gmail.com</a>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">🌐</span> <strong>Website:</strong> <a href="https://www.internexis-technologies.in" className="text-blue-600 hover:underline ml-1">www.internexis-technologies.in</a>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🏢</span> <strong>Address:</strong> <span className="ml-1">Virtual HQ – India</span>
                </li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-8">
                <p className="text-sm text-blue-800 mb-0">
                  <strong>Last Updated:</strong> These Terms of Service were last updated on {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
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