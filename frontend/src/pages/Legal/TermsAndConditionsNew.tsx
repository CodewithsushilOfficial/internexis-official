// src/components/TermsAndConditionsNew.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const TermsAndConditions: React.FC = () => {
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

        <section
          className="py-16 md:py-24 bg-gray-50"
          id="terms-and-conditions"
        >
          <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              📜 Terms and Conditions – Internexis
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to the Internexis Internship Program! These terms and
              conditions outline the rules and regulations for your
              participation in our internship program. Please review them
              carefully before applying.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              1. Acceptance of Internship Offer
            </h3>
            <p className="text-gray-700 mb-4">
              Upon receiving an internship offer letter from Internexis, it is
              important that you confirm your acceptance or decline within the
              specified timeframe. If no response is received, we will assume
              your acceptance by default.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              2. Internship Duration
            </h3>
            <p className="text-gray-700 mb-4">
              The internship will have a specific duration as outlined in the
              offer letter. This defines the period during which you will be
              engaged in the internship program.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              3. Responsibilities
            </h3>
            <p className="text-gray-700 mb-4">
              As an intern at Internexis, you are expected to actively
              participate in the tasks and responsibilities assigned to you
              during the internship. This could involve various projects,
              assignments, or collaborative efforts.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              4. Confidentiality
            </h3>
            <p className="text-gray-700 mb-4">
              Any confidential information shared with you during the internship
              must be treated with the utmost confidentiality. This information
              should not be disclosed to third parties without proper
              authorization.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              5. Termination
            </h3>
            <p className="text-gray-700 mb-4">
              Internexis reserves the right to terminate the internship if an
              intern fails to comply with these terms or engages in conduct
              deemed detrimental to the organization.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              6. Certificates and Letters of Recommendation (LOR)
            </h3>
            <p className="text-gray-700 mb-4">
              Upon successful completion of the internship program, interns may
              receive certificates and a Letter of Recommendation (LOR),
              provided specific criteria are met.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              7. Stipend or Payment
            </h3>
            <p className="text-gray-700 mb-4">
              Interns who successfully clear the interview round will be
              eligible for a stipend, subject to the company’s policies.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              8. No Guarantee of Full-Time Employment
            </h3>
            <p className="text-gray-700 mb-4">
              Participation in the Internexis Internship Program does not
              guarantee a full-time job offer upon completion of the internship.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              9. Updates to This Policy
            </h3>
            <p className="text-gray-700 mb-4">
              We may update this Terms and Conditions document from time to
              time. Changes will be posted on this page with an updated revision
              date.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              📩 Need Help?
            </h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about our Terms and Conditions, feel
              free to contact us at: <br />
              <strong>help.internexis@gmail.com</strong>
            </p>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
              <p className="text-sm text-blue-800 mb-0">
                <strong>Last Updated:</strong>{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
