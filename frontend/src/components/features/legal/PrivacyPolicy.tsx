// src/components/PrivacyPolicy.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const PrivacyPolicy: React.FC = () => {
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

        <section className="py-16 md:py-24 bg-gray-50" id="privacy">
          <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Privacy Policy
            </h2>
            <p className="text-gray-700 mb-4">
              Internexis values your privacy. This Privacy Policy explains how
              we collect, use, and protect your personal information when you
              use our platform.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              1. Information We Collect
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Personal info: name, email, contact number, college, etc.</li>
              <li>
                Login & usage data: IP address, browser type, pages visited, and
                time spent.
              </li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              2. How We Use Information
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>
                To provide internship training, track performance, and issue
                certificates.
              </li>
              <li>To contact you with program updates and support.</li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              3. Data Security
            </h3>
            <p className="text-gray-700 mb-4">
              We implement strong technical and organizational measures to
              protect your data from unauthorized access or disclosure.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              4. Third-Party Sharing
            </h3>
            <p className="text-gray-700 mb-4">
              We do not sell or rent your personal data. Limited data may be
              shared with partners for certificate verification or support
              purposes.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              5. Your Rights
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>You may request access to or deletion of your data.</li>
              <li>You can unsubscribe from marketing emails anytime.</li>
            </ul>
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
