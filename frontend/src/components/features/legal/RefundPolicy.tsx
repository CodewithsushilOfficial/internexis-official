// src/components/RefundPolicy.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>

        {/* Refund Policy Section */}
        <section className="py-16 md:py-24 bg-gray-50" id="refund">
          <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              🚫 Cancellation & 💰 Refund Policy – Internexis
            </h2>

            <p className="text-gray-700 mb-4">
              We understand that plans can change, and at Internexis, we believe
              in being transparent and fair. That’s why we’ve created a simple,
              student-friendly Cancellation and Refund Policy to give you peace
              of mind before enrolling in any of our programs.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              🔄 Need to Cancel? No Worries!
            </h3>
            <p className="text-gray-700 mb-4">
              Life happens—we get it! If you need to cancel your internship
              enrollment, you can do so within 5 days of registration. Just
              reach out to us through our official support email or the contact
              form on our website.
            </p>
            <p className="text-gray-700 mb-4">
              We’ll make sure your request is reviewed quickly and fairly.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              💡 Am I Eligible for a Refund?
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>You request cancellation within 5 days of signing up.</li>
              <li>
                You haven’t started the internship, accessed course material, or
                joined live sessions.
              </li>
              <li>
                The request aligns with any program-specific terms (if
                applicable).
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              Each request is evaluated on a case-by-case basis to ensure fair
              handling.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              ⏱ How Fast Will I Get My Money Back?
            </h3>
            <p className="text-gray-700 mb-4">
              Once your cancellation is approved, our team will process your
              refund within 5-7 business days. The refund will be made to your
              original payment method, minus any minimal payment gateway charges
              (if applicable).
            </p>
            <p className="text-gray-700 mb-4">
              We keep it fast, fair, and transparent—always!
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              🚫 What’s Non-Refundable?
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>
                If you’ve already started your internship or accessed learning
                materials.
              </li>
              <li>
                Special discounted programs, early bird offers, and customized
                learning tracks.
              </li>
              <li>Government-verified certifications or processing charges.</li>
            </ul>
            <p className="text-gray-700 mb-4">
              We’ll always be upfront about what's refundable and what's not.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              🔄 Policy Updates
            </h3>
            <p className="text-gray-700 mb-4">
              We may revise this policy to keep up with changing needs or legal
              requirements. If we make significant changes, we’ll notify you via
              email or post updates clearly on our website.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
              📨 Need Help?
            </h3>
            <p className="text-gray-700 mb-4">
              Still have questions or want to request a refund? Our friendly
              team is just an email away!
            </p>
            <p className="text-gray-700 mb-4 font-semibold">
              📬 help.internexis@gmail.com
            </p>
            <p className="text-gray-700 mb-4">
              We're here to support your journey—every step of the way. 💼✨
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
