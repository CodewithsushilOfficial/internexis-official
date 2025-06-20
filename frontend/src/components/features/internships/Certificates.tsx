import React, { useState } from 'react';
import { useTheme } from '../../../lib/hooks/use-theme';

export const Certificates: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'internship' | 'training' | 'evaluation'>('internship');
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const certificateImages = {
    internship: "https://iili.io/3whm6o7.jpg",
    training: "https://iili.io/3whm6o7.jpg",
    evaluation: "https://iili.io/3whm6o7.jpg"
  };

  // Tab colors for each certificate type
  const tabColors = {
    internship: {
      light: 'from-blue-500 to-indigo-600',
      dark: 'from-blue-600 to-indigo-800',
      border: 'border-indigo-500',
      text: isDarkMode ? 'text-indigo-300' : 'text-indigo-700',
      bg: isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-100',
      highlight: isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
    },
    training: {
      light: 'from-purple-500 to-pink-600',
      dark: 'from-purple-600 to-pink-800',
      border: 'border-pink-500',
      text: isDarkMode ? 'text-pink-300' : 'text-pink-700',
      bg: isDarkMode ? 'bg-pink-900/20' : 'bg-pink-100',
      highlight: isDarkMode ? 'text-pink-300' : 'text-pink-600'
    },
    evaluation: {
      light: 'from-teal-500 to-emerald-600',
      dark: 'from-teal-600 to-emerald-800',
      border: 'border-emerald-500',
      text: isDarkMode ? 'text-emerald-300' : 'text-emerald-700',
      bg: isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-100',
      highlight: isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
    }
  };

  const tabContent = {
    internship: {
      title: "Certificate of Internship",
      description: "Official recognition of your completed internship, verified by our partnered institutions. Includes a unique verification ID and digital signature for authenticity.",
      features: [
        "AICTE & Government Recognized",
        "Includes project details",
        "Digital verification system",
        "LinkedIn-optimized format"
      ]
    },
    training: {
      title: "Certificate of Training",
      description: "Awarded upon completion of the associated coursework and skill development portions of the program. Highlights your technical competencies.",
      features: [
        "Details specific skills acquired",
        "Training hours included",
        "Endorsed by industry partners",
        "Shareable as digital badge"
      ]
    },
    evaluation: {
      title: "Performance Evaluation",
      description: "Detailed assessment of your performance across various competencies and skills demonstrated during the internship period.",
      features: [
        "Personalized feedback",
        "Quantitative skill ratings",
        "Strengths and improvement areas",
        "Recommendations for growth"
      ]
    }
  };

  return (
    <section 
      className={`py-20 md:py-32 relative ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-white' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100'
      }`} 
      id="certificates"
    >
      {/* Enhanced decorative elements with more colors */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-3xl"></div>
        <div className="absolute top-60 left-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-teal-500/10 to-emerald-500/10 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className={`inline-block px-6 py-2 rounded-full text-sm font-semibold mb-4 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 text-indigo-300 border border-indigo-700/30' 
              : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border border-indigo-200'
          }`}>
            Recognized Certifications
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="relative inline-block">
              Certificate Samples
              <div className="absolute -bottom-2 left-0 w-full h-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -rotate-1"></div>
            </span>
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Internexis provides verified, downloadable, and industry-recognized certificates
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 w-full">
            <div className={`relative group overflow-hidden rounded-2xl ${
              isDarkMode 
                ? 'bg-gray-800/80 shadow-lg shadow-indigo-500/10' 
                : 'bg-white/90 shadow-xl shadow-blue-200/50'
            } transition-all duration-300 hover:shadow-2xl ${
              isDarkMode 
                ? `hover:shadow-${tabColors[activeTab].border}/20` 
                : `hover:shadow-${tabColors[activeTab].border}/30`
            } p-6 backdrop-blur-sm`}>
              {/* Animated gradient border */}
              <div className="absolute inset-0 p-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 animate-gradient-x"></div>
              
              <div className="absolute inset-[1px] rounded-2xl bg-white dark:bg-gray-800"></div>
              
              {/* Colorful glow effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr ${
                isDarkMode 
                  ? `from-${tabColors[activeTab].dark}/30 to-${tabColors[activeTab].dark}/10` 
                  : `from-${tabColors[activeTab].light}/20 to-${tabColors[activeTab].light}/5`
              } transition-opacity duration-500`}></div>
              
              <img 
                src={certificateImages[activeTab]} 
                alt={`${activeTab} certificate`} 
                className={`w-full h-auto rounded-lg ${
                  isDarkMode 
                    ? `border border-${tabColors[activeTab].border}/30` 
                    : `border border-${tabColors[activeTab].border}/20`
                } relative z-10 transform transition-transform duration-500 group-hover:scale-[1.02]`}
              />
            </div>
          </div>


          <div className="lg:w-1/2 w-full">
            <div className={`flex border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            } mb-8 overflow-x-auto no-scrollbar`}>
              {Object.keys(tabContent).map((tab) => (
                <button 
                  key={tab}
                  className={`py-4 px-6 border-b-2 font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab
                      ? isDarkMode 
                          ? `${tabColors[tab as keyof typeof tabColors].border} ${tabColors[tab as keyof typeof tabColors].highlight}` 
                          : `${tabColors[tab as keyof typeof tabColors].border} ${tabColors[tab as keyof typeof tabColors].highlight}`
                      : isDarkMode
                          ? 'border-transparent text-gray-400 hover:text-gray-200' 
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab as 'internship' | 'training' | 'evaluation')}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className={`${
              isDarkMode 
                ? 'bg-gray-800/80 border border-gray-700 backdrop-blur-sm' 
                : 'bg-white/90 border border-gray-100 backdrop-blur-sm'
            } p-8 rounded-2xl shadow-lg transition-all duration-300 relative`}>
              {/* Subtle colorful corner accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${
                isDarkMode 
                  ? `from-${tabColors[activeTab].dark}/20` 
                  : `from-${tabColors[activeTab].light}/10`
              } rounded-bl-[100px] rounded-tr-2xl z-0`}></div>

              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              } relative z-10`}>
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  isDarkMode 
                    ? tabColors[activeTab].dark
                    : tabColors[activeTab].light
                }`}>
                  {tabContent[activeTab].title}
                </span>
              </h3>
              <p className={`text-lg mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } relative z-10`}>
                {tabContent[activeTab].description}
              </p>

              <h4 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              } relative z-10`}>Key Features:</h4>
              <ul className="space-y-3 mb-8 relative z-10">
                {tabContent[activeTab].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`flex items-center justify-center w-7 h-7 rounded-full mr-3 mt-0.5 flex-shrink-0 ${
                      isDarkMode 
                        ? `${tabColors[activeTab].bg} ${tabColors[activeTab].highlight}` 
                        : `${tabColors[activeTab].bg} ${tabColors[activeTab].highlight}`
                    } relative group overflow-hidden`}>
                      {/* Animated pulse around checkmark */}
                      <span className={`absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-25 group-hover:animate-ping`}></span>
                      <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </span>
                    <span className={`text-lg ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={`${
                isDarkMode 
                  ? `bg-gray-900/90 border ${tabColors[activeTab].border}/30` 
                  : `${tabColors[activeTab].bg}/50 border ${tabColors[activeTab].border}/20`
              } p-5 rounded-xl relative z-10`}>
                <div className="flex items-start">
                  <div className={`mr-4 p-2.5 rounded-lg ${
                    isDarkMode ? `bg-${tabColors[activeTab].dark}/30` : `bg-${tabColors[activeTab].light}/20`
                  }`}>
                    <svg 
                      className={`w-7 h-7 ${tabColors[activeTab].highlight}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className={`font-bold text-lg mb-1 ${tabColors[activeTab].highlight}`}>
                      Verification System
                    </h5>
                    <p className={`${isDarkMode ? 'text-gray-300' : tabColors[activeTab].text}`}>
                      Each certificate includes a unique QR code and verification ID 
                      that employers can use to validate authenticity through our online portal.
                    </p>
                  </div>
                </div>
              </div>
              
              <button className={`mt-8 px-8 py-3.5 rounded-lg font-medium transition-all duration-300 
                bg-gradient-to-r ${
                  isDarkMode 
                    ? tabColors[activeTab].dark
                    : tabColors[activeTab].light
                } text-white relative group overflow-hidden z-10
                shadow-lg ${
                  isDarkMode 
                    ? `shadow-${tabColors[activeTab].dark}/20` 
                    : `shadow-${tabColors[activeTab].light}/30`
                } hover:shadow-xl transform hover:-translate-y-0.5`}>
                {/* Animated shine effect */}
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative z-10 flex items-center">
                  View Sample Certificate
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};