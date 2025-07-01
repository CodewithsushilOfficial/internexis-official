// Service data constants for Internexis platform
export interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  buttonText: string;
  href: string;
}

export const servicesData: ServiceData[] = [
  {
    id: 'internships',
    title: 'Internship Opportunities',
    description: 'Find and apply for internships that match your skills and career goals.',
    icon: '/assets/services/internships.svg',
    features: [
      'Curated internship listings',
      'Application tracking',
      'Company profiles',
      'Skill matching'
    ],
    buttonText: 'Explore Internships',
    href: '/internships'
  },
  {
    id: 'career-guidance',
    title: 'Career Guidance',
    description: 'Get personalized career advice and guidance from industry experts.',
    icon: '/assets/services/career-guidance.svg',
    features: [
      'One-on-one sessions',
      'Career path planning',
      'Resume review',
      'Interview preparation'
    ],
    buttonText: 'Get Guidance',
    href: '/career-guidance'
  },
  {
    id: 'mentorship',
    title: 'Expert Mentorship',
    description: 'Connect with experienced professionals for ongoing mentorship.',
    icon: '/assets/services/expert-mentorship.svg',
    features: [
      'Industry experts',
      'Personalized mentoring',
      'Regular check-ins',
      'Goal setting'
    ],
    buttonText: 'Find Mentors',
    href: '/mentorship'
  },
  {
    id: 'job-opportunities',
    title: 'Job Opportunities',
    description: 'Discover full-time and part-time job opportunities.',
    icon: '/assets/services/career-jobs.svg',
    features: [
      'Job matching',
      'Application assistance',
      'Salary insights',
      'Company reviews'
    ],
    buttonText: 'Browse Jobs',
    href: '/jobs'
  },
  {
    id: 'digital-solutions',
    title: 'Digital Solutions',
    description: 'Custom digital solutions for your business needs.',
    icon: '/assets/services/digital-solutions.svg',
    features: [
      'Web development',
      'Mobile apps',
      'UI/UX design',
      'Digital marketing'
    ],
    buttonText: 'Learn More',
    href: '/digital-solutions'
  },
  {
    id: 'hackathons',
    title: 'Hackathon Events',
    description: 'Participate in exciting hackathons and coding competitions.',
    icon: '/assets/services/hackathons.svg',
    features: [
      'Regular events',
      'Team formation',
      'Prizes & recognition',
      'Skill development'
    ],
    buttonText: 'Join Events',
    href: '/hackathons'
  },
  {
    id: 'freelance',
    title: 'Freelance Projects',
    description: 'Find freelance opportunities and build your portfolio.',
    icon: '/assets/services/freelance.svg',
    features: [
      'Project matching',
      'Portfolio building',
      'Client management',
      'Payment protection'
    ],
    buttonText: 'Start Freelancing',
    href: '/freelance'
  },
  {
    id: 'ambassador',
    title: 'Campus Ambassador',
    description: 'Become a campus ambassador and represent Internexis.',
    icon: '/assets/services/ambassador.svg',
    features: [
      'Leadership opportunity',
      'Networking events',
      'Exclusive perks',
      'Recognition program'
    ],
    buttonText: 'Apply Now',
    href: '/campus-ambassador'
  }
];

export default servicesData;
