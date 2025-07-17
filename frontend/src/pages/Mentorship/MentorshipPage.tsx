import React, { useEffect } from 'react';
import MentorshipIndexPage from './index.tsx';

const MentorshipPage: React.FC = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Mentorship Platform - Internexis Technologies';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join Internexis Technologies Mentorship Platform for personalized guidance, industry insights, and career development. Connect with expert mentors from top companies.');
    }
  }, []);

  return <MentorshipIndexPage />;
};

export default MentorshipPage;
