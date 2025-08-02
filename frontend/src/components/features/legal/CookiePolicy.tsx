// src/components/CookiePolicy.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const CookiePolicy: React.FC = () => {
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

        <section className="py-16 md:py-24 bg-gray-50" id="cookie-policy">
          <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              🍪 Cookie Policy – Internexis
            </h2>
            <p className="text-gray-700 mb-4">
              At Internexis, we use cookies to improve your browsing experience,
              personalize content, and analyze site traffic. This Cookie Policy
              explains how and why we use cookies on our platform.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              1. What Are Cookies?
            </h3>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your device when
              you visit a website. They help the site remember your preferences
              and improve your experience.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              2. How We Use Cookies
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>To remember your login session and preferences</li>
              <li>To analyze traffic using tools like Google Analytics</li>
              <li>
                To enhance functionality (e.g., chat support, form autofill)
              </li>
              <li>To personalize content and offers</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              3. Types of Cookies We Use
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>
                <strong>Essential Cookies:</strong> Required for core
                functionality like logins and security.
              </li>
              <li>
                <strong>Performance Cookies:</strong> Help us understand how
                users interact with our website.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> Remember user
                preferences for a more personalized experience.
              </li>
              <li>
                <strong>Third-Party Cookies:</strong> Set by services like
                Google, YouTube, or chatbots for analytics or integrations.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              4. Managing Cookies
            </h3>
            <p className="text-gray-700 mb-4">
              You can manage or disable cookies anytime through your browser
              settings. Please note that disabling cookies may affect some site
              features.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              5. Updates to This Policy
            </h3>
            <p className="text-gray-700 mb-4">
              We may update this Cookie Policy from time to time. Changes will
              be posted on this page with an updated revision date.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              📩 Need Help?
            </h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about how we use cookies, feel free to
              contact us at: <br />
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
