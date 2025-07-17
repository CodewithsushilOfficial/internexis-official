import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Layout Components
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'

// Pages
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ServicesPage from './pages/Services'
import CoursesPage from './pages/Courses'
import InternshipPage from './pages/Internship'
import CampusAmbassadorPage from './pages/CampusAmbassador'
import CareerPage from './pages/Career'
import ContactPage from './pages/Contact'
import MentorshipPage from './pages/Mentorship'
import AdminPage from './pages/Admin'

// Course Pages
import WebDevelopmentCourse from './pages/Courses/WebDevelopment'
import AndroidDevelopmentCourse from './pages/Courses/AndroidDevelopment'
import PythonDjangoCourse from './pages/Courses/PythonDjango'
import AIMlCourse from './pages/Courses/AIML'
import DataScienceCourse from './pages/Courses/DataScience'
import CyberSecurityCourse from './pages/Courses/CyberSecurity'
import DSACourse from './pages/Courses/DSA'
import UIUXCourse from './pages/Courses/UIUX'

// Mentorship Pages
import MentorshipLanding from './pages/Mentorship/index'
import MentorsList from './pages/Mentorship/mentors'
import MentorProfile from './pages/Mentorship/mentor-profile'
import MentorshipSuccess from './pages/Mentorship/success'
import MentorshipApply from './pages/Mentorship/apply'
import MentorshipAbout from './pages/Mentorship/about'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-16">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/internship" element={<InternshipPage />} />
          <Route path="/campus-ambassador" element={<CampusAmbassadorPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-login" element={<AdminPage />} />

          {/* Course Pages */}
          <Route path="/courses/web-development" element={<WebDevelopmentCourse />} />
          <Route path="/courses/android-development" element={<AndroidDevelopmentCourse />} />
          <Route path="/courses/python-django" element={<PythonDjangoCourse />} />
          <Route path="/courses/ai-ml" element={<AIMlCourse />} />
          <Route path="/courses/data-science" element={<DataScienceCourse />} />
          <Route path="/courses/cybersecurity" element={<CyberSecurityCourse />} />
          <Route path="/courses/dsa" element={<DSACourse />} />
          <Route path="/courses/ui-ux" element={<UIUXCourse />} />

          {/* Mentorship Pages */}
          <Route path="/mentorship" element={<MentorshipLanding />} />
          <Route path="/mentorship/mentors" element={<MentorsList />} />
          <Route path="/mentorship/mentor/:id" element={<MentorProfile />} />
          <Route path="/mentorship/success" element={<MentorshipSuccess />} />
          <Route path="/mentorship/apply" element={<MentorshipApply />} />
          <Route path="/mentorship/about" element={<MentorshipAbout />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}

export default App