import { motion } from 'framer-motion';
import { 
  PaintBrushIcon, 
  SwatchIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

const modules = [
  {
    category: "UI/UX Design Fundamentals",
    icon: <PaintBrushIcon className="h-6 w-6" />,
    color: "from-teal-500 to-green-500",
    topics: [
      {
        title: "Design Principles",
        duration: "Week 1-2",
        description: "Color theory, typography, layout, visual hierarchy"
      },
      {
        title: "User Research",
        duration: "Week 3",
        description: "User personas, user journey mapping, research methods"
      },
      {
        title: "Information Architecture",
        duration: "Week 4",
        description: "Site mapping, user flows, navigation design"
      }
    ]
  },
  {
    category: "Figma Design Mastery",
    icon: <SwatchIcon className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    topics: [
      {
        title: "Figma Basics",
        duration: "Week 5",
        description: "Interface, tools, layers, components"
      },
      {
        title: "Wireframing & Prototyping",
        duration: "Week 6-7",
        description: "Low-fi wireframes, high-fi prototypes, interactions"
      },
      {
        title: "Design Systems",
        duration: "Week 8",
        description: "Component libraries, style guides, consistency"
      }
    ]
  },
  {
    category: "Mobile & Web Design",
    icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
    color: "from-blue-500 to-purple-500",
    topics: [
      {
        title: "Responsive Web Design",
        duration: "Week 9",
        description: "Breakpoints, grid systems, mobile-first approach"
      },
      {
        title: "Mobile App Design",
        duration: "Week 10-11",
        description: "iOS/Android guidelines, touch interactions"
      },
      {
        title: "Portfolio Creation",
        duration: "Week 12",
        description: "Behance portfolio, case studies, presentation"
      }
    ]
  }
];

const projects = [
  {
    title: "E-commerce Mobile App",
    description: "Complete mobile app design with user research and prototyping",
    tech: ["Figma", "User Research", "Prototyping", "Mobile Design"]
  },
  {
    title: "SaaS Dashboard Design",
    description: "Complex dashboard with data visualization and user experience",
    tech: ["Dashboard Design", "Data Viz", "UX Research", "Figma"]
  },
  {
    title: "Brand Identity Design",
    description: "Complete brand identity with logo, colors, and style guide",
    tech: ["Branding", "Logo Design", "Style Guide", "Brand Guidelines"]
  },
  {
    title: "Portfolio Website",
    description: "Professional portfolio website showcasing design projects",
    tech: ["Portfolio Design", "Web Design", "Case Studies", "Presentation"]
  }
];

export function UIUX() {
  const handleBuyNow = () => {
    alert('Redirecting to payment gateway...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-green-600 rounded-2xl mb-6">
                <PaintBrushIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                UI/UX Design
                <span className="block text-3xl md:text-4xl bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                  Master Course
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Create stunning user interfaces and exceptional user experiences with Figma, design systems, 
                and user research. Launch your design career.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-6 py-3 rounded-full font-bold text-xl">
                  Special Offer: ₹399 Only
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
                  2-3 Months • Beginner to Advanced
                </div>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-teal-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
              >
                🚀 Buy Now - ₹399
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Complete UI/UX Design Curriculum
            </h2>
          </div>

          <div className="space-y-8">
            {modules.map((module, moduleIndex) => (
              <motion.div
                key={moduleIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: moduleIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${module.color} p-6`}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      {module.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{module.category}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {module.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{topic.title}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{topic.duration}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{topic.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Design Portfolio Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Become a UI/UX Designer?
          </h2>
          <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
            Master UI/UX design and create amazing user experiences that users love.
          </p>
          <button
            onClick={handleBuyNow}
            className="bg-white text-teal-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            🚀 Enroll Now - ₹399
          </button>
        </div>
      </section>
    </div>
  );
}
