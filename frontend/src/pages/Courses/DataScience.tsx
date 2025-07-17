import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  BeakerIcon,
  TableCellsIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';

const modules = [
  {
    category: "Data Analysis Fundamentals",
    icon: <TableCellsIcon className="h-6 w-6" />,
    color: "from-indigo-500 to-purple-500",
    topics: [
      {
        title: "Python for Data Science",
        duration: "Week 1-2",
        description: "NumPy, Pandas basics, data structures"
      },
      {
        title: "Data Cleaning & Preprocessing",
        duration: "Week 3-4",
        description: "Handling missing data, outliers, data transformation"
      },
      {
        title: "Exploratory Data Analysis",
        duration: "Week 5-6",
        description: "Statistical analysis, data profiling, insights"
      }
    ]
  },
  {
    category: "Data Visualization",
    icon: <ChartBarIcon className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    topics: [
      {
        title: "Matplotlib & Seaborn",
        duration: "Week 7-8",
        description: "Static visualizations, statistical plots"
      },
      {
        title: "Interactive Dashboards",
        duration: "Week 9-10",
        description: "Plotly, Dash, Streamlit applications"
      },
      {
        title: "Advanced Visualization",
        duration: "Week 11",
        description: "Geospatial data, time series, custom plots"
      }
    ]
  },
  {
    category: "Statistical Analysis & ML",
    icon: <BeakerIcon className="h-6 w-6" />,
    color: "from-green-500 to-teal-500",
    topics: [
      {
        title: "Descriptive Statistics",
        duration: "Week 12",
        description: "Mean, median, correlation, probability"
      },
      {
        title: "Inferential Statistics",
        duration: "Week 13",
        description: "Hypothesis testing, confidence intervals"
      },
      {
        title: "Machine Learning Basics",
        duration: "Week 14-15",
        description: "Regression, classification, clustering"
      }
    ]
  },
  {
    category: "Database & Business Intelligence",
    icon: <PresentationChartLineIcon className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    topics: [
      {
        title: "SQL for Data Analysis",
        duration: "Week 16",
        description: "Complex queries, joins, window functions"
      },
      {
        title: "Business Intelligence Tools",
        duration: "Week 17",
        description: "Tableau, Power BI fundamentals"
      },
      {
        title: "Final Capstone Project",
        duration: "Week 18",
        description: "End-to-end data science project"
      }
    ]
  }
];

const projects = [
  {
    title: "Sales Analytics Dashboard",
    description: "Interactive dashboard analyzing sales performance with KPIs and trends",
    tech: ["Python", "Plotly", "Streamlit", "SQL"]
  },
  {
    title: "Customer Segmentation Analysis",
    description: "Machine learning model to segment customers based on behavior",
    tech: ["Pandas", "Scikit-learn", "Clustering", "Visualization"]
  },
  {
    title: "Stock Market Predictor",
    description: "Time series analysis and prediction of stock prices",
    tech: ["Time Series", "ARIMA", "Prophet", "Financial Data"]
  },
  {
    title: "Healthcare Data Analysis",
    description: "Medical data analysis with statistical insights and predictions",
    tech: ["Statistical Analysis", "Healthcare Data", "Hypothesis Testing"]
  }
];

export function DataScience() {
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6">
                <ChartBarIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Data Science & Analytics
                <span className="block text-3xl md:text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Complete Course
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Master data analysis, visualization, and statistical modeling with Python. 
                Transform raw data into actionable insights and launch your data science career.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-6 py-3 rounded-full font-bold text-xl">
                  Special Offer: ₹399 Only
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
                  3-4 Months • Beginner to Advanced
                </div>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
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
              Complete Data Science Curriculum
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
              Industry Projects
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
                      className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Become a Data Scientist?
          </h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Master data science and analytics to make data-driven decisions that impact business success.
          </p>
          <button
            onClick={handleBuyNow}
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            🚀 Enroll Now - ₹399
          </button>
        </div>
      </section>
    </div>
  );
}
