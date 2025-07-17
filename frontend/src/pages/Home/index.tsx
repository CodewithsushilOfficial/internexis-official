import React from 'react'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import StatsSection from './StatsSection'
import TestimonialsSection from './TestimonialsSection'
import CTASection from './CTASection'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}

export default HomePage