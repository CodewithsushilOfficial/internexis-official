# Mentorship Section Components

This directory contains all the components for the Mentorship Program section of the Internexis website.

## Original Components

### 1. MentorshipSection.tsx
The main container component that orchestrates the entire mentorship section.

**Features:**
- Animated background with gradient blurred shapes
- Responsive design for all screen sizes
- Dark/light mode support
- Scroll-based animations using AOS

### 2. FeatureCards.tsx
Displays three key benefits of the mentorship program in interactive cards.

**Features:**
- Glassmorphism design with backdrop blur
- Hover animations and scaling effects
- Gradient overlays on hover
- Staggered entrance animations

### 3. TestimonialCarousel.tsx
An interactive carousel showcasing mentee testimonials.

**Features:**
- Auto-playing carousel with pause on hover
- Manual navigation with prev/next buttons
- Dot indicators for direct navigation
- Progress bar showing current position
- Smooth transitions using Framer Motion

### 4. BecomeMenteeCTA.tsx
Call-to-action component encouraging users to join the mentorship program.

**Features:**
- Animated statistics display
- Interactive CTA button with hover effects
- Gradient backgrounds and glowing effects
- Feature checkmarks highlighting benefits

## Premium Mentorship Components (July 2025 Update)

### 1. MentorCard.tsx
Display card for individual mentors with detailed information and booking options.

**Features:**
- Rating stars display with exact decimals
- Tech stack tags with dynamic rendering
- Availability badge (Available/Busy)
- Profile view and booking buttons
- Hover animations with gradient overlays
- Responsive layout for all devices

### 2. BookingModal.tsx
Multi-step booking process for mentorship sessions.

**Features:**
- 5-step booking flow with progress indicator
- Session topic selection with validation
- Date and time picker with availability
- Contact information collection
- Session package selection with pricing
- Payment simulation with success handling
- Responsive design for mobile booking

### 3. SessionPackageCard.tsx
Price cards for different session packages with discount calculations.

**Features:**
- 1/5/10 session package options
- Price display (₹60, ₹250, ₹480)
- Discount badges for multi-session packages
- Feature list with checkmarks
- Popular package highlighting
- Hover effects and animations

### 4. TestimonialCard.tsx
Card to display student testimonials and success stories.

**Features:**
- Star rating display
- Student information with college/course
- Session count tracking
- Quote display with formatting
- Mentor attribution

## Usage

```jsx
import { MentorshipSection } from './components/Mentorship';

function App() {
  return (
    <div>
      <MentorshipSection />
    </div>
  );
}
```

## Styling

All components use:
- **Tailwind CSS** for responsive design and utility classes
- **Glassmorphism** with backdrop-blur for modern card effects
- **Gradient backgrounds** for visual appeal
- **Custom animations** using Framer Motion and AOS
- **Dark/light mode** compatibility

## Dependencies

- React
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- AOS (for scroll animations)
- React Hot Toast (for notifications)
- Lucide Icons (for consistent iconography)

## Premium Mentorship System (July 2025 Update)

### Overview

The Premium Mentorship System is a comprehensive solution that allows users to book personalized mentoring sessions with industry experts at ₹60/30-minute. This feature enables students to connect with experienced professionals for guidance, career advice, and skill development.

### Features

- **Mentor Listings**: Browse through curated industry experts with filtering by domain, rating, language, and availability
- **Mentor Profiles**: View detailed profiles with experience, skills, specialties, and testimonials
- **Booking System**: Multi-step booking process with different session packages
- **Payment Integration**: Simple payment flow for session bookings (currently simulated)
- **Testimonials**: Real user feedback from previous mentorship sessions
- **Responsive Design**: Fully responsive across all devices with optimized UI/UX

### Pages

- **`index.tsx`**: Main mentorship landing page with premium features and pricing
- **`mentors.tsx`**: Mentor listing page with search and filtering functionality
- **`mentor-profile.tsx`**: Detailed individual mentor profile pages
- **`success.tsx`**: Booking confirmation page with next steps
- **`apply.tsx`**: Form for becoming a mentor (existing)
- **`about.tsx`**: Information about the mentorship program (existing)

### User Flow

1. User visits `/mentorship` to see premium mentorship pricing and features
2. User browses mentors at `/mentorship/mentors` with filtering options
3. User selects a mentor to view detailed profile at `/mentorship/mentor/:id`
4. User books a session through the booking modal
5. User completes payment and arrives at `/mentorship/success` confirmation page

### Pricing Model

- Single Session: ₹60 (30-minute)
- 5-Session Package: ₹250 (₹50/session, 16% discount)
- 10-Session Package: ₹480 (₹48/session, 20% discount)

### Future Enhancements

- Real payment gateway integration (Razorpay/Stripe)
- Calendar integration for mentor availability
- Video call integration for sessions
- Rating and review system after sessions
- Session history and note-taking features

---

Developed by Internexis Technologies | Updated July 2025

## Responsive Design

- **Mobile (sm)**: Single column layout, stacked cards
- **Tablet (md)**: Two column layout for features
- **Desktop (lg)**: Three column layout for optimal viewing

## Customization

To customize the content:

1. **Testimonials**: Edit the `testimonials` array in `TestimonialCarousel.tsx`
2. **Features**: Modify the `features` array in `FeatureCards.tsx`
3. **Colors**: Update the Tailwind gradient classes throughout the components
4. **Animations**: Adjust Framer Motion and AOS settings in respective components

## Animation Details

- **Entrance**: Fade-up animations for section reveals
- **Hover**: Scale and glow effects on interactive elements
- **Carousel**: Smooth slide transitions with progress indicators
- **CTA**: Button animations with icon movement and scaling

## Theme Support

All components automatically adapt to:
- Light mode: Bright backgrounds with dark text
- Dark mode: Dark backgrounds with light text
- Gradient overlays maintain consistency across themes
