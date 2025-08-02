import React, { useState } from "react";

const AmbassadorTracker: React.FC = () => {
  const [referralCode, setReferralCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [referralStatus, setReferralStatus] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferralCode(e.target.value);
    setReferralStatus(null);
  };

  const handleCheckReferral = async () => {
    if (!referralCode.trim()) {
      setReferralStatus({
        valid: false,
        message: "Please enter a referral code",
      });
      return;
    }

    setIsValidating(true);

    try {
      // Simulate referral validation for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API delay

      // Mock referral codes for demo
      const validReferralCodes = [
        "AMB0001",
        "AMB0002",
        "AMB0003",
        "AMB001",
        "AMB002",
      ];

      if (validReferralCodes.includes(referralCode.toUpperCase())) {
        setReferralStatus({
          valid: true,
          message: `Valid referral code! It belongs to an active campus ambassador.`,
        });
      } else {
        setReferralStatus({
          valid: false,
          message: "Invalid referral code. Please check and try again.",
        });
      }
    } catch (error) {
      console.error("Error validating referral code:", error);
      setReferralStatus({
        valid: false,
        message: "Network error. Please try again later.",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Check Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Referral Status
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Already have a referral code? Check its validity or track your
              referral statistics.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-8">
              {/* Referral Code Checker */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Validate a Referral Code
                </h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={referralCode}
                    onChange={handleInputChange}
                    placeholder="Enter referral code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    onClick={handleCheckReferral}
                    disabled={isValidating}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {isValidating ? "Checking..." : "Check Validity"}
                  </button>
                </div>

                {referralStatus && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      referralStatus.valid
                        ? "bg-green-50 border border-green-200 text-green-700"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {referralStatus.message}
                  </div>
                )}
              </div>

              {/* Quick Apply Section */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Ready to apply for an internship?
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Use your referral code to get priority consideration
                    </p>
                  </div>
                  <a
                    href="/apply-internship"
                    className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbassadorTracker;
