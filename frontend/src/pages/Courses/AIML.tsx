import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
  CpuChipIcon,
  ChartBarIcon,
  BeakerIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

const modules = [
  {
    category: "Python for AI Fundamentals",
    icon: <CodeBracketIcon className="h-6 w-6" />,
    color: "from-blue-500 to-purple-500",
    topics: [
      {
        title: "Python Programming Essentials",
        duration: "Week 1",
        description: "Variables, functions, control structures, OOP concepts"
      },
      {
        title: "Data Structures & Algorithms",
        duration: "Week 2",
        description: "Lists, dictionaries, sets, basic algorithms"
      },
      {
        title: "File Handling & Libraries",
        duration: "Week 3",
        description: "File operations, package management, virtual environments"
      }
    ]
  },
  {
    category: "Data Science Libraries",
    icon: <ChartBarIcon className="h-6 w-6" />,
    color: "from-green-500 to-blue-500",
    topics: [
      {
        title: "NumPy for Numerical Computing",
        duration: "Week 4",
        description: "Arrays, mathematical operations, broadcasting"
      },
      {
        title: "Pandas for Data Manipulation",
        duration: "Week 5",
        description: "DataFrames, data cleaning, analysis, visualization"
      },
      {
        title: "Matplotlib & Seaborn",
        duration: "Week 6",
        description: "Data visualization, plotting, statistical charts"
      }
    ]
  },
  {
    category: "Machine Learning Fundamentals",
    icon: <CpuChipIcon className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    topics: [
      {
        title: "Supervised Learning",
        duration: "Week 7-8",
        description: "Linear/Logistic regression, Decision trees, SVM"
      },
      {
        title: "Unsupervised Learning",
        duration: "Week 9",
        description: "K-means clustering, PCA, Association rules"
      },
      {
        title: "Model Evaluation & Validation",
        duration: "Week 10",
        description: "Cross-validation, metrics, hyperparameter tuning"
      }
    ]
  },
  {
    category: "Advanced AI Topics",
    icon: <BeakerIcon className="h-6 w-6" />,
    color: "from-orange-500 to-red-500",
    topics: [
      {
        title: "Deep Learning Basics",
        duration: "Week 11",
        description: "Neural networks, TensorFlow/Keras introduction"
      },
      {
        title: "Natural Language Processing",
        duration: "Week 12",
        description: "Text processing, sentiment analysis, word embeddings"
      },
      {
        title: "Computer Vision",
        duration: "Week 13",
        description: "Image processing, CNN basics, object detection"
      }
    ]
  }
];

const projects = [
  {
    title: "House Price Prediction",
    description: "ML model to predict house prices using regression techniques",
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"]
  },
  {
    title: "Customer Segmentation",
    description: "K-means clustering for customer behavior analysis",
    tech: ["K-means", "PCA", "Data Visualization"]
  },
  {
    title: "Spam Email Detection",
    description: "NLP-based spam filter using text classification",
    tech: ["NLP", "Classification", "Feature Engineering"]
  },
  {
    title: "Stock Price Predictor",
    description: "Time series analysis and prediction using LSTM",
    tech: ["Deep Learning", "LSTM", "Time Series"]
  }
];

const features = [
  {
    icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    title: "Hands-on Projects",
    description: "Build real ML models with industry datasets"
  },
  {
    icon: <ClockIcon className="h-6 w-6 text-blue-500" />,
    title: "Self-Paced Learning",
    description: "Learn at your own speed with lifetime access"
  },
  {
    icon: <AcademicCapIcon className="h-6 w-6 text-purple-500" />,
    title: "Industry Certificate",
    description: "Recognized certification in AI/ML"
  },
  {
    icon: <UserGroupIcon className="h-6 w-6 text-orange-500" />,
    title: "Expert Mentorship",
    description: "Learn from industry AI practitioners"
  }
];

const tools = [
  { name: "Python", desc: "Primary programming language" },
  { name: "Jupyter", desc: "Interactive development environment" },
  { name: "TensorFlow", desc: "Deep learning framework" },
  { name: "Scikit-learn", desc: "Machine learning library" },
  { name: "Pandas", desc: "Data manipulation library" },
  { name: "NumPy", desc: "Numerical computing library" },
  { name: "Matplotlib", desc: "Data visualization library" },
  { name: "Seaborn", desc: "Statistical visualization" }
];

export function AIML() {
  const handleBuyNow = () => {
    // Integration with Razorpay will be implemented here
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl mb-6">
                <CpuChipIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                AI & Machine Learning
                <span className="block text-3xl md:text-4xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Master Course
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Dive deep into artificial intelligence and machine learning with Python. Build intelligent 
                systems and launch your career in the most exciting field of technology.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 px-6 py-3 rounded-full font-bold text-xl">
                  Special Offer: ₹399 Only
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
                  3-4 Months • Intermediate to Advanced
                </div>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-pink-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105"
              >
                🚀 Buy Now - ₹399
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What You'll Master
              </h2>
              <div className="space-y-4">
                {[
                  "Master Python programming for AI and data science",
                  "Build predictive models using machine learning",
                  "Implement deep learning with TensorFlow/Keras",
                  "Work with real-world datasets and preprocessing",
                  "Create intelligent systems for classification and regression",
                  "Develop NLP applications and text analysis tools",
                  "Build computer vision applications",
                  "Deploy ML models for production use"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircleIcon className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Features</h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    {feature.icon}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Complete AI/ML Curriculum
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From Python fundamentals to advanced deep learning, master all aspects of AI and machine learning
            </p>
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
                      <p className="text-white/80">
                        {module.topics.length} Modules • {module.topics.length} Weeks
                      </p>
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

      {/* Tools & Technologies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tools & Technologies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Master industry-standard tools used by AI professionals worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2">{tool.name}</div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              AI/ML Projects Portfolio
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Build real-world AI applications that solve actual problems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 px-3 py-1 rounded-full text-sm"
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

      {/* Career Outcomes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Career Opportunities
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Machine Learning Engineer",
                salary: "₹8-25 LPA",
                description: "Build and deploy ML models in production"
              },
              {
                title: "Data Scientist",
                salary: "₹6-20 LPA",
                description: "Extract insights from data using AI/ML"
              },
              {
                title: "AI Research Scientist",
                salary: "₹12-30 LPA",
                description: "Develop cutting-edge AI algorithms"
              }
            ].map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-6 text-center"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{career.title}</h3>
                <p className="text-pink-600 dark:text-pink-400 font-semibold mb-3">{career.salary}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{career.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 to-rose-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Enter the AI Revolution?
          </h2>
          <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
            Join the future of technology with our comprehensive AI and Machine Learning course. 
            Build intelligent systems and launch your AI career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBuyNow}
              className="bg-white text-pink-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              🚀 Enroll Now - ₹399
            </button>
            <button className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300">
              💬 WhatsApp Support
            </button>
          </div>
          <div className="mt-8 flex justify-center space-x-8 text-pink-100">
            <div className="text-center">
              <div className="font-bold text-2xl">🤖</div>
              <div className="text-sm">AI Projects</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">📊</div>
              <div className="text-sm">Real Datasets</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">🎯</div>
              <div className="text-sm">Industry Ready</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">💼</div>
              <div className="text-sm">Career Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
