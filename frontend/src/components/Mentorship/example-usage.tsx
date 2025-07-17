import React from 'react';
import { MentorshipSection } from '@components/Mentorship';

// Example of how to use the Mentorship section in your app
const App: React.FC = () => {
  return (
    <div>
      {/* Your existing components */}
      <nav>Your Navigation</nav>
      
      {/* Mentorship Section */}
      <MentorshipSection />
      
      {/* Your other sections */}
      <footer>Your Footer</footer>
    </div>
  );
};

// Alternative: Using individual components
import { 
  FeatureCards, 
  TestimonialCarousel, 
  BecomeMenteeCTA 
} from '@components/Mentorship';

export const buildCustomMentorshipPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Custom header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Custom Mentorship Section
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Build your own layout using individual components
          </p>
        </div>
      </section>

      {/* Individual components */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Features</h2>
          <FeatureCards />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Mentees Say</h2>
          <TestimonialCarousel />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <BecomeMenteeCTA />
        </div>
      </section>
    </div>
  );
};

export default App;
