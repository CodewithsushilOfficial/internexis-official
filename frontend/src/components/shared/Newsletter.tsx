import React, { useState } from 'react';
import { Send, Bell } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-16 bg-blue-600">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Bell className="h-12 w-12 text-white/90 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Latest Opportunities
          </h2>
          <p className="text-blue-100 mb-8">
            Get exclusive internship alerts, industry insights, and career tips delivered to your inbox
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                Subscribe
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>

          {status === 'success' && (
            <p className="mt-4 text-sm text-blue-100">
              Thanks for subscribing! Check your email for confirmation.
            </p>
          )}

          <p className="mt-6 text-sm text-blue-100">
            By subscribing, you agree to receive updates from Internexis.
            You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};