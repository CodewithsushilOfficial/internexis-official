// Static data for testimonials, stats, and other content
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  testimonial: string;
  rating: number;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'Tech Corp',
    image: '/assets/testimonials/sarah.jpg',
    testimonial: 'Internexis helped me land my dream internship and provided excellent mentorship throughout the process.',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Data Scientist',
    company: 'Data Solutions Inc',
    image: '/assets/testimonials/michael.jpg',
    testimonial: 'The career guidance I received was invaluable in shaping my professional journey.',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    company: 'Design Studio',
    image: '/assets/testimonials/emily.jpg',
    testimonial: 'Amazing platform with great opportunities and supportive community.',
    rating: 5
  }
];

export const stats: Stat[] = [
  {
    id: '1',
    label: 'Students Placed',
    value: '1000+',
    icon: '👥'
  },
  {
    id: '2',
    label: 'Partner Companies',
    value: '500+',
    icon: '🏢'
  },
  {
    id: '3',
    label: 'Success Rate',
    value: '95%',
    icon: '📈'
  },
  {
    id: '4',
    label: 'Years Experience',
    value: '5+',
    icon: '⭐'
  }
];

export const partners: Partner[] = [
  {
    id: '1',
    name: 'Tech Corp',
    logo: '/assets/partners/tech-corp.png',
    website: 'https://techcorp.com'
  },
  {
    id: '2',
    name: 'Innovation Labs',
    logo: '/assets/partners/innovation-labs.png',
    website: 'https://innovationlabs.com'
  },
  {
    id: '3',
    name: 'StartupXYZ',
    logo: '/assets/partners/startup-xyz.png',
    website: 'https://startupxyz.com'
  }
];
