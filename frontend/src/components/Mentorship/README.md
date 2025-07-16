# Mentorship Section Components

This directory contains all the components for the Mentorship Program section of the Internexis website.

## Components

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
