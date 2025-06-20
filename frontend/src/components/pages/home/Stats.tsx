import React, { useRef } from 'react';
import { Users, Award, School, FileCheck, Star } from 'lucide-react';
import CountUp from 'react-countup';
import { motion, useInView } from 'framer-motion';

export const Stats: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-primary-500 dark:text-primary-400" />,
      value: 15000,
      label: "Students Trained",
      suffix: "+"
    },
    {
      icon: <FileCheck className="h-8 w-8 text-accent-500 dark:text-accent-400" />,
      value: 12000,
      label: "Projects Certified",
      suffix: "+"
    },
    {
      icon: <School className="h-8 w-8 text-secondary-500 dark:text-secondary-400" />,
      value: 500,
      label: "Partner Colleges",
      suffix: "+"
    },
    {
      icon: <Award className="h-8 w-8 text-green-500 dark:text-green-400" />,
      value: 95,
      label: "Placement Rate",
      suffix: "%"
    }
  ];

  // Generate string of stars for decorative elements
  const generateStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <div 
          key={index}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            animation: `pulse ${Math.random() * 3 + 2}s infinite alternate`
          }}
        />
      ));
  };

  return (
    <section className="py-24 relative bg-gradient-to-br from-blue-50/70 to-white dark:from-gray-900 dark:to-gray-800/90" ref={ref}>
      {/* Enhanced Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary-500/10 dark:bg-primary-400/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-secondary-500/10 dark:bg-secondary-400/10 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-accent-500/10 dark:bg-accent-400/10 blur-2xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 rounded-full bg-green-500/10 dark:bg-green-400/10 blur-2xl animate-pulse" style={{ animationDuration: '7s' }} />
        
        {/* Enhanced Grid pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-[length:40px_40px] opacity-[0.02] dark:opacity-[0.03]"></div>
        
        {/* Stars decorative elements */}
        <div className="hidden lg:block absolute inset-0">
          {generateStars(40)}
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-primary-100/80 dark:from-primary-900/30 dark:to-primary-800/20 border border-primary-100 dark:border-primary-700/30 text-primary-600 dark:text-primary-300 text-sm font-medium mb-5 shadow-sm"
          >
            <Star size={16} className="text-primary-500 dark:text-primary-400" />
            <span>By the Numbers</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-5 text-gray-900 dark:text-white"
          >
            Our Impact in <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500">Numbers</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Years of dedication to tech education and career development have yielded remarkable results
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="text-center p-8 rounded-3xl bg-white/90 dark:bg-gray-800/90 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/80 dark:border-gray-700/80 relative z-10 h-full flex flex-col justify-between hover:-translate-y-2 backdrop-blur-sm">
                {/* Enhanced Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 dark:group-hover:from-primary-400/15 dark:group-hover:to-secondary-400/15 transition-all duration-500 z-0"></div>
                
                {/* Decorative corner accents */}
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary-300 dark:border-primary-600 rounded-tr-md opacity-60"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary-300 dark:border-primary-600 rounded-bl-md opacity-60"></div>
                
                <div>
                  <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 mb-6 shadow-md group-hover:shadow-lg transition-all border border-gray-200/50 dark:border-gray-600/30">
                    {stat.icon}
                  </div>
                  
                  <div className="text-5xl font-extrabold mb-2 text-gray-900 dark:text-white flex justify-center items-end">
                    {isInView && (
                      <CountUp 
                        end={stat.value} 
                        duration={2.5} 
                        separator="," 
                        suffix={stat.suffix}
                        useEasing
                        className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-500 dark:from-primary-400 dark:to-secondary-300"
                      />
                    )}
                  </div>
                </div>
                
                <div className="text-gray-600 dark:text-gray-300 mt-3 text-lg font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};