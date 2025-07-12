import React from "react";
import {
  Globe,
  Users,
  BookOpen,
  Wrench,
  BarChart3,
  ArrowRight,
  Check,
  Sparkles,
  Target,
  Award,
  Shield,
  Rocket,
  Brain,
  Star,
  TrendingUp,
} from "lucide-react";

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce [animation-delay:0s]" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400/20 rounded-full animate-bounce [animation-delay:0.5s]" />
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-teal-400/20 rounded-full animate-bounce [animation-delay:1s]" />
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-orange-400/20 rounded-full animate-bounce [animation-delay:1.5s]" />
      </div>
      {/* Who We Are Section with Hero Image */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                WHO WE ARE
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Internexis Technologies
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 mx-auto mb-8 rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed pl-8">
                  Internexis Technologies is a <span className="font-bold text-blue-600 dark:text-blue-400">self-independent platform</span> built with a vision to empower the next generation of innovators, developers, and leaders. We are a community-driven tech ecosystem offering real-world internships, practical training, and career mentorship to students and professionals across the country.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-teal-500 rounded-full" />
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed pl-8">
                  Our platform is designed, developed, and managed entirely by a team of passionate educators, developers, and entrepreneurs, <span className="font-bold text-purple-600 dark:text-purple-400">without relying on third-party systems</span>. We believe in learning by doing through
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {" "}
                    Web Development
                  </span>
                  ,
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    {" "}
                    AI/ML
                  </span>
                  ,
                  <span className="font-bold text-teal-600 dark:text-teal-400">
                    {" "}
                    Cybersecurity
                  </span>
                  ,
                  <span className="font-bold text-orange-600 dark:text-orange-400">
                    {" "}
                    UI/UX Design
                  </span>
                  , and more.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    1000+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Students Trained
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Self-Independent
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* 3D Card Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl transform rotate-3 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-3xl transform -rotate-2 scale-102" />

              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm transform hover:scale-105 transition-all duration-500">
                {/* Hero Video */}
                <div className="relative mb-6">
                  <video
                    src="https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/L4dfL70N59xASoar34.mp4?Expires=1752415488&Signature=A-r9O7eixiaqDXtj8bgcG8-9irkxWQsrDvQzpa4L-RexOxA89SpY8kT3ATJPzEc-~J~uBO~TnyjLWlNzWH6XlKHVkqTxAtNiD8~ohzheC8vQd5xohxozgo-WC~KhwBFJNzD2x55CFrI~1Ao6L94m6kbPy-ezxbEEnOSmhOitXgDJbBjBxwSlqTSxZ~o79c1f3dxQRdJny3-IAA79dcuOvWQlT68qXTydz1hHSWQVWwJGwQqSWM5rebNXypgpcuRrXuQvUxthWBOKqTllMpwmpOkQK-AyLXUXcW5xTXHyd3P5i-6BXezRFJKj5rcKJWxjABzL6D4o7iZu3-syKhTu7Q__&Key-Pair-Id=K2YEDJLVZ3XRI#t=0.001"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-[99%] h-80 object-cover rounded-2xl shadow-lg mx-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-2xl" />
                </div>

                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Global Impact
                    </h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                  Empowering learners across India with self-built resources, expert guidance, and meaningful opportunities through our 100% online and flexible learning platform.
                </p>

                {/* Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Self-Independent
                      </span>
                      <span className="text-blue-600 dark:text-blue-400">
                        100%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Career-Ready Skills
                      </span>
                      <span className="text-purple-600 dark:text-purple-400">
                        100%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-teal-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Digital Solutions with Enhanced Design */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
              <Rocket className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                OUR SOLUTIONS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Internexis Technologies
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Advantage 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 transform group-hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-3xl" />
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">⭐</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Self-Independent & Original
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Not a franchise or affiliate — we're a self-built, self-driven platform rooted in originality, vision, and value creation.
                  </p>

                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    <span className="mr-2">100% Original</span>
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Advantage 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 transform group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-3xl" />

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🎓</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Real Internship Experience
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Gain hands-on knowledge through live projects, weekly tasks, and career-focused guidance — just like working in a real tech company.
                  </p>

                  <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                    <span className="mr-2">Real Experience</span>
                    <Target className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Advantage 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-green-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 transform group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-500/10 to-green-500/10 rounded-bl-3xl" />

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🏆</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      ISO & Recognized Certification
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Boost your portfolio with government & industry-recognized certificates — perfect for resumes, LinkedIn, and placements.
                  </p>

                  <div className="flex items-center text-teal-600 dark:text-teal-400 font-semibold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    <span className="mr-2">Certified</span>
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Advantage 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 transform group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-bl-3xl" />

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">�</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Affordable & Accessible
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Top-tier tech learning available to all — without burning a hole in your pocket. Quality education at affordable prices.
                  </p>

                  <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                    <span className="mr-2">Affordable</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Advantage 5 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 transform group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-bl-3xl" />

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Globe className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🌐</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      100% Online & Flexible
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Study from anywhere in India with live sessions, recorded lectures, and mentor guidance — your learning, your time.
                  </p>

                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    <span className="mr-2">Flexible</span>
                    <Rocket className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Advantage 6 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 transform group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-bl-3xl" />

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Brain className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🧠</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Career-Ready Skills
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Skills that matter in the job market: React, Python, MongoDB, AI, Freelancing, GitHub, Deployment, and more.
                  </p>

                  <div className="flex items-center text-pink-600 dark:text-pink-400 font-semibold group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                    <span className="mr-2">Job-Ready</span>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Our Commitment with 3D Effects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80"
            alt="Technology Background"
            className="w-full h-full object-cover opacity-5 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-blue-50/95 dark:from-gray-900/95 dark:to-blue-950/95" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
              <Rocket className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                YOUR BENEFITS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How Internexis is
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Beneficial for You
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Commitment 1 */}
            <div className="group text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500" />

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 transform group-hover:-translate-y-4 transition-all duration-500 overflow-hidden">
                {/* Benefit Video */}
                <div className="relative">
                  <video
                    src="https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/gih0laK9mjW35VN74a.mp4?Expires=1752411571&Signature=gUH8887mSmMAc8VqEMNs9bhQJ-UjXl~vMcO3vi3ECjIQWxsXb0ipFn~sgSh~xW5AeFrIi1n0w3BBC-I2BCXwAEpDeEdjM1GBCQINAE8doGgPdCiA7XWxgYxljEm81JCt2kQLrWbAi4ouCl4xxEtDTo8wLuZ~tDHAlo0L4FWcQEzZivcHQKKaA-ChKwvByAkV7y3ZEH6koQjdsOo7lHSYuo49~dyZEjFJz1tCl7IMlwGCpsc32d94yu0gTCAztiJKEEebvUYaTmnHYS-oqqYc2IFpaEKfl~Y8MFM~glBgaRU~oKJN2qWMTDFKRqlh-tRx1f7bx8hce529UqaqVsT3tg__&Key-Pair-Id=K2YEDJLVZ3XRI#t=0.001"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent" />
                </div>

                <div className="p-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Launch Your Career Early
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  Get certified internships and projects you can proudly add to your resume and GitHub. Build a strong foundation with real-world experience.
                </p>

                {/* Achievement Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/40 dark:hover:to-purple-800/40 transition-all duration-300 transform hover:scale-110 cursor-pointer">
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Career Acceleration
                  </span>
                </div>
                </div>
              </div>
            </div>

            {/* Commitment 2 */}
            <div className="group text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500" />

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 transform group-hover:-translate-y-4 transition-all duration-500 overflow-hidden">
                {/* Benefit Video */}
                <div className="relative">
                  <video
                    src="https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/o44ZQK2H2Pl4NihT00.mp4?Expires=1752412243&Signature=c~W5Neb101ZUWwPt4p~ehHpwbPDittdeYgoVb~cZc75jqaoMZyr0Xdi~BwNUOHpcbf36LYWNuGqIpH2n-hV8ahXg94gD2lcda2IKPRTTqM90x-VMgYy-ERX8LWfmUex2eq5HTrg4dn-TBuMPWeOSKpCiKONjsGo-S9qCaNLQ21AyYs8SnZ4aWnrn1YUmUod5LYfqZx0dDelkrzWVxLS3fksMQJrikGNuv4qsMc7MMVNkoV6ZfkgqKcw9BT5QAx43vazJql4dLtyX61Tvbr~Zk-yUpP~tezodvdrUcQj7413G4MDOArTR8kYOOd7Z-i1K3HNQKemSGh4MrJUXqvQoTQ__&Key-Pair-Id=K2YEDJLVZ3XRI#t=0.001"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent" />
                </div>

                <div className="p-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Placement-Ready Profiles
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 cursor-pointer">
                  Resume help, interview prep, and referral guidance to help you crack top roles. We prepare you for success in the competitive job market.
                </p>

                {/* Achievement Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/40 dark:hover:to-pink-800/40 transition-all duration-300 transform hover:scale-110 cursor-pointer">
                  <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Placement Support
                  </span>
                </div>
                </div>
              </div>
            </div>

            {/* Commitment 3 */}
            <div className="group text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-green-500/5 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500" />

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 transform group-hover:-translate-y-4 transition-all duration-500 overflow-hidden">
                {/* Benefit Video */}
                <div className="relative">
                  <video
                    src="https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/zSuxtsSY2lV59R8efW.mp4?Expires=1752412450&Signature=VrMyNBc3kFnOWly9goopyGOZbGHxZFjuOFxC2NUV~VwKA0SL8msoUpKAjYI1dJ5zSUrug2hfMfMulagsEwIXrE6JPa-UtRYtXtgUg4zuQVJCGzg-9Q77vpLg3w2eQwt1n5Lscadk7p3zLoZgZ1EfLZrGp~bPUuB8nGqeS6kCTG40li4mv0iJCU1aa8E5Wy4nsjFyb6c3iJBj9neTC3C44cN1WKaSOk7K00VHRqsXqIHuuzNHhhQDt1KY9UY6ULTalsmXdKsmQCVjiBEjbQigP~5E6rySI3ZmOOKEyTcH20liKb~~rhJDZFNzAkG6GA1FOBunoaNdv4UDHL3XQrxn4Q__&Key-Pair-Id=K2YEDJLVZ3XRI#t=0.001"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-500/30 to-transparent" />
                </div>

                <div className="p-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Lifetime Learning Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 cursor-pointer">
                  Once you're in, you get access to recorded sessions, resources, and community updates — for life. Your learning journey never stops.
                </p>

                {/* Achievement Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-full hover:from-teal-200 hover:to-emerald-200 dark:hover:from-teal-800/40 dark:hover:to-emerald-800/40 transition-all duration-300 transform hover:scale-110 cursor-pointer">
                  <span className="text-sm font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                    Lifetime Access
                  </span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Your Journey Starts Here with Timeline Design */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
              <Rocket className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                YOUR JOURNEY
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Your Success Journey
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Starts Here
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 rounded-full hidden md:block" />

            <div className="space-y-16">
              {/* Journey Step 1 */}
              <div className="relative flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 md:pr-12 text-center md:text-right">
                  <div className="relative inline-block mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80"
                      alt="Learning Environment"
                      className="w-80 h-48 object-cover rounded-2xl shadow-xl border-4 border-white dark:border-gray-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-2xl" />
                  </div>
                </div>
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full items-center justify-center shadow-2xl border-4 border-white dark:border-gray-800 z-10 hidden md:flex">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>

                <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <span className="text-4xl mr-4">📘</span>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Learn
                    </h3>
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Comprehensive internships combined with expert mentorship to
                    build foundational knowledge and industry-relevant skills
                    through structured learning paths and real-world projects.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                      Mentorship
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                      ISO Certified
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                      Live Projects
                    </span>
                  </div>
                </div>
              </div>

              {/* Journey Step 2 */}
              <div className="relative flex flex-col md:flex-row-reverse items-center gap-12">
                <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                  <div className="relative inline-block mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80"
                      alt="Building Projects"
                      className="w-80 h-48 object-cover rounded-2xl shadow-xl border-4 border-white dark:border-gray-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl" />
                  </div>
                </div>
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full items-center justify-center shadow-2xl border-4 border-white dark:border-gray-800 z-10 hidden md:flex">
                  <Wrench className="w-10 h-10 text-white" />
                </div>

                <div className="md:w-1/2 md:pr-12 text-center md:text-right">
                  <div className="flex items-center justify-center md:justify-end mb-4">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mr-4">
                      Build
                    </h3>
                    <span className="text-4xl">🛠️</span>
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Work on real-world projects that matter, creating a compelling
                    portfolio while gaining hands-on experience with
                    cutting-edge technologies like React, Python, AI/ML, and industry best practices.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                      Real Projects
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                      GitHub Portfolio
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                      AI/ML
                    </span>
                  </div>
                </div>
              </div>

              {/* Journey Step 3 */}
              <div className="relative flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 md:pr-12 text-center md:text-right">
                  <div className="relative inline-block mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=500&q=80"
                      alt="Business Growth"
                      className="w-80 h-48 object-cover rounded-2xl shadow-xl border-4 border-white dark:border-gray-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent rounded-2xl" />
                  </div>
                </div>
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full items-center justify-center shadow-2xl border-4 border-white dark:border-gray-800 z-10 hidden md:flex">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>

                <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <span className="text-4xl mr-4">📈</span>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Grow
                    </h3>
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Build a personal brand and become a confident, skilled professional through our growth-focused environment and lifetime learning support with community updates.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm font-medium">
                      Personal Brand
                    </span>
                    <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm font-medium">
                      Professional Growth
                    </span>
                    <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm font-medium">
                      Community
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </section>
    </div>
  );
};
