import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  ArrowPathIcon,
  ExclamationTriangleIcon 
} from "@heroicons/react/24/outline";
import axios from "axios";

interface OTPVerificationProps {
  email: string;
  onVerified: (token: string) => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ 
  email, 
  onVerified, 
  onBack 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only digits allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && !loading) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setError('');
      handleVerifyOtp(pastedData);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (otpValue?: string) => {
    const otpToVerify = otpValue || otp.join('');
    
    if (otpToVerify.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.post(
        `${API_URL}/api/admin/verify-otp`,
        {
          email,
          otp: otpToVerify
        }
      );

      if (response.data.success) {
        const token = response.data.data.token;
        localStorage.setItem("adminToken", token);
        onVerified(token);
      } else {
        setError(response.data.message || "OTP verification failed");
        // Clear OTP fields on error
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error: unknown) {
      console.error("OTP verification error:", error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "OTP verification failed. Please try again.";
      setError(errorMessage);
      // Clear OTP fields on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setResendLoading(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.post(
        `${API_URL}/api/admin/resend-otp`,
        { email }
      );

      if (response.data.success) {
        setTimeLeft(300); // Reset timer
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        // You might want to show a success message here
      } else {
        setError(response.data.message || "Failed to resend OTP");
      }
    } catch (error: unknown) {
      console.error("Resend OTP error:", error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to resend OTP. Please try again.";
      setError(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <ShieldCheckIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Verify Your Identity
          </h1>
          <p className="text-gray-600 text-sm">
            We've sent a 6-digit code to
          </p>
          <p className="text-gray-800 font-medium">{email}</p>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <div className="flex justify-center space-x-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => inputRefs.current[index] = el}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                maxLength={1}
                disabled={loading}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
            <ClockIcon className="w-4 h-4 mr-2" />
            {timeLeft > 0 ? (
              <span>Code expires in {formatTime(timeLeft)}</span>
            ) : (
              <span className="text-red-600">Code has expired</span>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm"
          >
            <ExclamationTriangleIcon className="w-5 h-5 mr-2 flex-shrink-0" />
            {error}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Verify Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleVerifyOtp()}
            disabled={loading || otp.join('').length !== 6}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                Verifying...
              </div>
            ) : (
              "Verify OTP"
            )}
          </motion.button>

          {/* Resend Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleResendOtp}
            disabled={!canResend || resendLoading}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {resendLoading ? (
              <div className="flex items-center justify-center">
                <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </div>
            ) : canResend ? (
              "Resend OTP"
            ) : (
              `Resend in ${formatTime(timeLeft)}`
            )}
          </motion.button>

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="w-full text-gray-600 py-2 px-4 rounded-xl font-medium hover:text-gray-800 hover:bg-gray-50 focus:outline-none transition-colors"
          >
            ← Back to Login
          </motion.button>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            🔒 For security reasons, never share this code with anyone.
            Internexis staff will never ask for your OTP.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
