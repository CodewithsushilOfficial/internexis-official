import { motion } from 'framer-motion';
import { 
  PuzzlePieceIcon, 
  CpuChipIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const modules = [
  {
    category: "Data Structures Fundamentals",
    icon: <PuzzlePieceIcon className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-500",
    topics: [
      {
        title: "Arrays & Strings",
        duration: "Week 1-2",
        description: "Array operations, string manipulation, two pointers"
      },
      {
        title: "Linked Lists",
        duration: "Week 3",
        description: "Singly, doubly, circular linked lists, operations"
      },
      {
        title: "Stacks & Queues",
        duration: "Week 4",
        description: "Implementation, applications, priority queues"
      },
      {
        title: "Hash Tables",
        duration: "Week 5",
        description: "Hashing, collision handling, applications"
      }
    ]
  },
  {
    category: "Advanced Data Structures",
    icon: <CpuChipIcon className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    topics: [
      {
        title: "Trees & Binary Search Trees",
        duration: "Week 6-7",
        description: "Binary trees, BST operations, tree traversals"
      },
      {
        title: "Heaps & Priority Queues",
        duration: "Week 8",
        description: "Min/max heaps, heap sort, priority applications"
      },
      {
        title: "Graphs",
        duration: "Week 9-10",
        description: "Graph representations, BFS, DFS, shortest paths"
      },
      {
        title: "Advanced Trees",
        duration: "Week 11",
        description: "AVL trees, Red-Black trees, Segment trees"
      }
    ]
  },
  {
    category: "Algorithms & Problem Solving",
    icon: <ChartBarIcon className="h-6 w-6" />,
    color: "from-green-500 to-teal-500",
    topics: [
      {
        title: "Sorting & Searching",
        duration: "Week 12",
        description: "Quick sort, merge sort, binary search variations"
      },
      {
        title: "Dynamic Programming",
        duration: "Week 13-14",
        description: "Memoization, tabulation, classic DP problems"
      },
      {
        title: "Greedy Algorithms",
        duration: "Week 15",
        description: "Greedy approach, interval scheduling, MST"
      },
      {
        title: "Backtracking & Recursion",
        duration: "Week 16",
        description: "N-Queens, Sudoku solver, permutations"
      }
    ]
  }
];

const projects = [
  {
    title: "Algorithm Visualizer",
    description: "Interactive tool to visualize sorting and searching algorithms",
    tech: ["JavaScript", "HTML5 Canvas", "Animation", "Algorithms"]
  },
  {
    title: "Competitive Programming Solutions",
    description: "500+ solved problems from LeetCode, HackerRank, Codeforces",
    tech: ["Problem Solving", "Optimization", "Time Complexity"]
  },
  {
    title: "Data Structure Library",
    description: "Custom implementation of all major data structures",
    tech: ["C++", "Java", "Python", "Generic Programming"]
  },
  {
    title: "Interview Preparation Kit",
    description: "Comprehensive guide with 200+ interview questions",
    tech: ["Interview Prep", "System Design", "Coding Practice"]
  }
];

export function DSA() {
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-6">
                <PuzzlePieceIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                DSA & Competitive
                <span className="block text-3xl md:text-4xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Programming
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Master data structures, algorithms, and competitive programming to ace technical interviews 
                and excel in problem-solving competitions.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 px-6 py-3 rounded-full font-bold text-xl">
                  Special Offer: ₹399 Only
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
                  2-3 Months • Beginner to Advanced
                </div>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
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
              Complete DSA Curriculum
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Practical Projects & Practice
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
                      className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 px-3 py-1 rounded-full text-sm"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Master Problem Solving?
          </h2>
          <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
            Master DSA and competitive programming to ace technical interviews and excel in your career.
          </p>
          <button
            onClick={handleBuyNow}
            className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            🚀 Enroll Now - ₹399
          </button>
        </div>
      </section>
    </div>
  );
}
