import { MentorshipSection, FeatureCards, TestimonialCarousel, BecomeMenteeCTA } from './index';

// This file is just to test imports are working correctly
export const testMentorshipImport = () => {
  console.log('Mentorship components imported successfully!');
  return MentorshipSection;
};

// Test individual component imports
export const testIndividualImports = () => {
  console.log('Individual components imported successfully!');
  return {
    FeatureCards,
    TestimonialCarousel,
    BecomeMenteeCTA
  };
};
