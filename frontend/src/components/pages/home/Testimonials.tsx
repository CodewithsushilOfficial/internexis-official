import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  university: string;
  quote: string;
  image: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export const Testimonials: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Aarav Gupta",
      role: "Web Development Intern",
      university: "BCA Student, Delhi University",
      quote: "Internexis gave me real-world experience and helped me land my first client! The project-based approach taught me more than classroom lectures ever did.",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    },
    {
      id: 2,
      name: "Neha Verma",
      role: "Android Development Intern",
      university: "B.Tech CSE, IIIT Bhopal",
      quote: "The ₹199 internship was more valuable than my college semester! I built a functional app that now sits proudly on my portfolio and helped me secure interviews.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    },
    {
      id: 3,
      name: "Rajan Sharma",
      role: "Machine Learning Intern",
      university: "M.Tech, NIT Rourkela",
      quote: "The mentorship was incredible. My supervisor guided me through implementing a real ML model that solved an actual business problem. Totally worth it!",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Data Science Intern",
      university: "B.Tech, VIT Vellore",
      quote: "The data science program helped me transition from a complete beginner to someone who can confidently work with real datasets and derive meaningful insights.",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    },
    {
      id: 5,
      name: "Vihaan Singh",
      role: "UI/UX Design Intern",
      university: "BDes, NID Ahmedabad",
      quote: "As a design student, I appreciated how the internship connected design theory with practical implementation. My portfolio now showcases real products I designed.",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    }
  ];

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < rating ? "currentColor" : "none"}
        className={i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} 
      />
    ));
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800" id="testimonials">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary-500/5 dark:bg-primary-500/10 blur-3xl"/>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-secondary-500/5 dark:bg-secondary-500/10 blur-3xl"/>
        
        {/* Quote marks decoration */}
        <div className="absolute top-10 left-10 text-gray-200 dark:text-gray-800 opacity-20">
          <Quote size={120} strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-10 right-10 text-gray-200 dark:text-gray-800 opacity-20 transform rotate-180">
          <Quote size={120} strokeWidth={0.5} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-50 dark:bg-secondary-900/30 border border-secondary-100 dark:border-secondary-700/30 text-secondary-600 dark:text-secondary-300 text-sm font-medium mb-4"
            data-aos="fade-up"
          >
            <Star size={16} className="text-secondary-500 dark:text-secondary-400" />
            <span>Success Stories</span>
          </div>
          
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            What Our <span className="text-secondary-500 dark:text-secondary-400">Students</span> Say
          </h2>
          
          <p 
            className="text-lg text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Real feedback from students who transformed their careers through our internships
          </p>
        </div>

        <div className="relative mt-16 px-4" data-aos="fade-up" data-aos-delay="300">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onInit={(swiper) => {
              // @ts-expect-error - Swiper types incomplete
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error - Swiper types incomplete 
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="testimonial-swiper !pb-14"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 dark:border-gray-700">
                    <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-3">
                        {renderStars(testimonial.rating)}
                      </div>
                      <blockquote className="relative">
                        <div className="text-gray-700 dark:text-gray-300 mb-3 font-medium">
                          "{testimonial.quote}"
                        </div>
                      </blockquote>
                    </div>
                    
                    <div className="p-6 pt-4 mt-auto">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary-500/20">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                          <div className="text-sm flex flex-col">
                            <span className="text-primary-500 dark:text-primary-400">{testimonial.role}</span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs">{testimonial.university}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              ref={prevRef}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              ref={nextRef}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Additional CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors shadow-md hover:shadow-lg shadow-primary-500/20"
          >
            Start Your Journey
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-white dark:fill-gray-900" preserveAspectRatio="none">
          <path d="M0,64L60,64C120,64,240,64,360,69.3C480,75,600,85,720,90.7C840,96,960,96,1080,88C1200,80,1320,64,1380,56L1440,48L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};