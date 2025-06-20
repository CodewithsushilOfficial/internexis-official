import React, { useState, useEffect } from 'react';

// Custom CSS animations for enhanced styling
const animationStyles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
  
  .animation-delay-200 {
    animation-delay: 0.2s;
    opacity: 0;
  }
  
  .animation-delay-400 {
    animation-delay: 0.4s;
    opacity: 0;
  }
`;

// Inject styles
if (typeof document !== 'undefined' && !document.querySelector('#image-slider-styles')) {
  const style = document.createElement('style');
  style.id = 'image-slider-styles';
  style.textContent = animationStyles;
  document.head.appendChild(style);
}

const ImageSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);  const slides = [
    {
      title: 'University Leaders',
      subtitle: 'Connect with ambitious students from top universities',
      overlay: 'from-blue-600/70 to-purple-600/50',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      imageAlt: 'University students collaborating and learning together'
    },
    {
      title: 'Team Collaboration',
      subtitle: 'Build strong networks and professional relationships',
      overlay: 'from-purple-600/70 to-pink-600/50',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      imageAlt: 'Team of diverse students working together on projects'
    },
    {
      title: 'Tech Innovation',
      subtitle: 'Lead technology initiatives at your campus',
      overlay: 'from-cyan-600/70 to-blue-600/50',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      imageAlt: 'Students working with modern technology and laptops'
    },
    {
      title: 'Professional Growth',
      subtitle: 'Develop skills that matter in your career',
      overlay: 'from-green-600/70 to-teal-600/50',
      image: 'https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849826_1280.jpg',
      imageAlt: 'Professional young person in business attire representing growth'
    },
    {
      title: 'Success Stories',
      subtitle: 'Join successful ambassadors making a difference',
      overlay: 'from-yellow-600/70 to-orange-600/50',
      image: 'https://cdn.pixabay.com/photo/2024/01/30/12/59/women-8541959_1280.jpg',
      imageAlt: 'Successful diverse students celebrating achievements'
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      
      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full mb-6 border border-white/20">
          <span className="text-lg font-bold text-white">
            🎯 Campus Ambassador Experience
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          See the <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Impact</span>
        </h2>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover how our ambassadors are making a difference in their universities and communities
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
          
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
            >              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="w-full h-full object-cover object-center transition-transform duration-[10000ms] hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.overlay}`} />
              
              {/* Additional dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30" />
              
              {/* Animated particles */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="absolute bottom-10 right-10 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
              </div>
                {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="max-w-4xl px-6 transform transition-all duration-1000 ease-out">
                  <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl animate-fade-in-up">
                    {slide.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed drop-shadow-lg animate-fade-in-up animation-delay-200">
                    {slide.subtitle}
                  </p>
                  
                  {/* Decorative Elements */}
                  <div className="flex justify-center mt-8 space-x-4 animate-fade-in-up animation-delay-400">
                    <div className="w-16 h-1 bg-white/40 rounded-full backdrop-blur-sm"></div>
                    <div className="w-8 h-1 bg-white/60 rounded-full backdrop-blur-sm"></div>
                    <div className="w-4 h-1 bg-white/80 rounded-full backdrop-blur-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 group shadow-lg"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 group shadow-lg"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 group shadow-lg"
          >
            {isPlaying ? (
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full scale-125 shadow-lg'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full hover:scale-110'
              }`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center mt-6">
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="relative z-10 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group cursor-pointer">
              <div className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-gray-400 text-sm font-medium">Universities Covered</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-black text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                2K+
              </div>
              <div className="text-gray-400 text-sm font-medium">Active Ambassadors</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-black text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-gray-400 text-sm font-medium">Students Reached</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-black text-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                ₹10L+
              </div>
              <div className="text-gray-400 text-sm font-medium">Rewards Distributed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
