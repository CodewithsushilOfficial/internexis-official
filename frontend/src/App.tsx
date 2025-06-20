import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/pages/home/Hero';
import { LiveChatButton } from './components/ui/live-chat-button';
import { About } from './components/pages/about/About';
import { Programs } from './components/pages/programs/Programs';
import { WhyChoose } from './components/pages/home/WhyChoose';
import { Stats } from './components/pages/home/Stats';
import { Pricing } from './components/features/internships/Pricing';
import { ApplicationTracker } from './components/features/internships/ApplicationTracker';
import { Certificates } from './components/features/internships/Certificates';
import { Testimonials } from './components/pages/home/Testimonials';
import { FAQ } from './components/shared/FAQ';
import { Contact } from './components/pages/contact/Contact';
import { Partners } from './components/pages/home/Partners';
import { Footer } from './components/layout/Footer';
import { TermsOfService } from './components/features/legal/TermsOfService';
import { PrivacyPolicy } from './components/features/legal/PrivacyPolicy';
import { RefundPolicy } from './components/features/legal/RefundPolicy';
import { CookiePolicy } from './components/features/legal/CookiePolicy';
import { TermsAndConditions } from './components/features/legal/TermsAndConditionsNew';
import { MeetInternexis } from './components/pages/about/MeetInternexis';
import { AllPrograms } from './components/pages/programs/AllPrograms';
import InternshipProjects from './components/features/internships/InternshipProjects';
import CampusAmbassador from './components/features/campus-ambassador/CampusAmbassador';
import InternshipApplication from './components/features/internships/InternshipApplication';
import SimpleAdminDashboard from './components/features/admin/SimpleAdminDashboard';
import SimpleAdminLogin from './components/features/admin/SimpleAdminLogin';
import CareerPage from './components/features/careers/CareerPage';
import { UserPage } from './pages';
import CampusAmbassadorApplication from './pages/CampusAmbassadorApplication';
import CampusAmbassadorTestPage from './pages/CampusAmbassadorTestPage';

function App() {
  return (
    <Router>
      <div className="font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Navbar />
        <LiveChatButton />

        <Routes>
          {/* Routes for the different pages */}
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/meet-internexis" element={<MeetInternexis />} />
          
          {/* Routes for program pages */}          <Route path="/all-programs" element={<AllPrograms />} />
          <Route path="/internship-projects" element={<InternshipProjects />} />
          <Route path="/internship-projects/:domainSlug" element={<InternshipProjects />} />            {/* Campus Ambassador Program Routes */}
          <Route path="/campus-ambassador" element={<CampusAmbassador />} />
          <Route path="/campus-ambassador-application" element={<CampusAmbassadorApplication />} />
          <Route path="/campus-ambassador-test" element={<CampusAmbassadorTestPage />} />
          <Route path="/apply-internship" element={<InternshipApplication />} />
            {/* Career Page Route */}
          <Route path="/careers" element={<CareerPage />} />
            {/* User Management Route */}
          <Route path="/users" element={<UserPage />} />          {/* Admin Routes */}
          <Route path="/admin" element={<SimpleAdminLogin />} />
          <Route path="/admin-login" element={<SimpleAdminLogin />} />
          <Route path="/admin-dashboard" element={<SimpleAdminDashboard />} />
          <Route path="/user-page" element={<UserPage />} />

          {/* Home route with multiple sections */}
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <About />
                <Programs />
                <WhyChoose />
                <Stats />
                <Pricing />
                <ApplicationTracker />
                <Certificates />
                <Testimonials />
                <FAQ />
                <Contact />
                <Partners />
              </main>
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
