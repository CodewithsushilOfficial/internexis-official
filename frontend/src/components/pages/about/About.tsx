import React from 'react';
import { Award, Globe, BookOpen, Lightbulb, Clock, GraduationCap, TrendingUp } from 'lucide-react';
import { useTheme } from '../../../lib/hooks/use-theme';

export const About: React.FC = () => {
  // We're using the theme through Tailwind's dark mode classes
  useTheme();
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden transition-colors duration-300 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950" id="about">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-32 -top-32 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute right-0 top-1/3 w-72 h-72 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute left-1/4 bottom-0 w-96 h-96 bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16" data-aos="fade-up">
          <span className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4 inline-block">ABOUT US</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
            Internexis – Where Internships Meet Innovation
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mx-auto mb-6"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="md:w-1/2 relative" data-aos="fade-right">
            <div className="absolute -z-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-800/30 dark:to-blue-900/30 rounded-full blur-3xl opacity-70 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              <img 
                src="https://images.pexels.com/photos/3184393/pexels-photo-3184393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Students working on computers" 
                className="w-full h-auto object-cover"
              />
              {/* Color overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 dark:opacity-70"></div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 transform translate-y-[-20px]" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center transform transition-transform hover:-translate-y-1 hover:shadow-xl">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mb-3">
                  <Award className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <p className="text-center text-sm font-medium text-gray-900 dark:text-gray-100">Certified</p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center transform transition-transform hover:-translate-y-1 hover:shadow-xl">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 mb-3">
                  <Globe className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <p className="text-center text-sm font-medium text-gray-900 dark:text-gray-100">Virtual</p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center transform transition-transform hover:-translate-y-1 hover:shadow-xl">
                <div className="rounded-full bg-teal-100 dark:bg-teal-900/30 p-3 mb-3">
                  <BookOpen className="text-teal-600 dark:text-teal-400" size={20} />
                </div>
                <p className="text-center text-sm font-medium text-gray-900 dark:text-gray-100">Practical</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2" data-aos="fade-left">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              At Internexis, we're redefining internships for the modern student. As an AICTE-authorized, ISO-certified, and Govt. of Technical Education-supported platform, we offer virtual, project-based internships at a fraction of traditional costs — starting at just ₹99.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              We help you go beyond certificates by providing real-world experience, project mentorship, and career-ready skills.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div 
                className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-xl group transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-lg h-10 w-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="text-white" size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Real Projects</h3>
                <p className="text-gray-700 dark:text-gray-300">Work on actual projects that build your portfolio and experience.</p>
              </div>
              
              <div 
                className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-xl group transition-all duration-300 hover:border-purple-500 dark:hover:border-purple-400"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 rounded-lg h-10 w-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="text-white" size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Flexible Learning</h3>
                <p className="text-gray-700 dark:text-gray-300">Complete internships at your own pace, from anywhere.</p>
              </div>
              
              <div 
                className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-xl group transition-all duration-300 hover:border-teal-500 dark:hover:border-teal-400"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 rounded-lg h-10 w-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="text-white" size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Expert Mentorship</h3>
                <p className="text-gray-700 dark:text-gray-300">Get guidance from industry professionals throughout your journey.</p>
              </div>
              
              <div 
                className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-xl group transition-all duration-300 hover:border-amber-500 dark:hover:border-amber-400"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 rounded-lg h-10 w-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Career Growth</h3>
                <p className="text-gray-700 dark:text-gray-300">Top performers receive job referrals and career opportunities.</p>
              </div>
            </div>
            
            <div className="mt-8 text-center md:text-left" data-aos="fade-up">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50">
                Join Internexis Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};