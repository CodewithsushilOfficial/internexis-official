import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/pages/home/Hero";
import { LiveChatButton } from "./components/ui/live-chat-button";
import { About } from "./components/pages/about/About";
import { Programs } from "./components/pages/programs/Programs";
import { OurServices } from "./components/pages/home/OurServices";
import { Pricing } from "./components/features/internships/Pricing";
import { Certificates } from "./components/features/internships/Certificates";
import { Testimonials } from "./components/pages/home/Testimonials";
import { FAQ } from "./components/shared/FAQ";
import { Contact } from "./components/pages/contact/Contact";
import { Partners } from "./components/pages/home/Partners";
import { Footer } from "./components/layout/Footer";
import { TermsOfService } from "./components/features/legal/TermsOfService";
import { PrivacyPolicy } from "./components/features/legal/PrivacyPolicy";
import { RefundPolicy } from "./components/features/legal/RefundPolicy";
import { CookiePolicy } from "./components/features/legal/CookiePolicy";
import { TermsAndConditions } from "./components/features/legal/TermsAndConditionsNew";
import { MeetInternexis } from "./components/pages/about/MeetInternexis";
import { AllPrograms } from "./components/pages/programs/AllPrograms";
import InternshipProjects from "./components/features/internships/InternshipProjects";
import DomainDetails from "./components/features/internships/DomainDetails";
import CampusAmbassador from "./components/features/campus-ambassador/CampusAmbassador";
import InternshipApplication from "./components/features/internships/InternshipApplication";
import AdminDashboard from "./components/features/admin/AdminDashboard";
import SimpleAdminLogin from "./components/features/admin/SimpleAdminLogin";
import AdminApp from "./components/admin/AdminApp";
import CareerPage from "./components/features/careers/CareerPage";
import { UserPage } from "./pages";
import CampusAmbassadorApplication from "./pages/CampusAmbassadorApplication";
import CampusAmbassadorTestPage from "./pages/CampusAmbassadorTestPage";

// Service pages
import DigitalSolutionsPage from "./components/features/services/DigitalSolutionsPage";
import HackathonsPage from "./components/features/services/HackathonsPage";
import WorkWithUsPage from "./components/features/services/WorkWithUsPage";
import {
  MentorshipPage,
  CareerGuidancePage,
  FreelanceProjectsPage,
  CareerJobsPage,
} from "./components/features/services/ServicePages";

// Component to conditionally render navbar based on route
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div className="font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <LiveChatButton />}

      <Routes>
        {/* Routes for the different pages */}
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
        />{" "}
        <Route path="/meet-internexis" element={<MeetInternexis />} />
        {/* Routes for program pages */}
        <Route path="/all-programs" element={<AllPrograms />} />
        <Route path="/internship-projects" element={<InternshipProjects />} />
        <Route
          path="/internship-projects/:domainSlug"
          element={<InternshipProjects />}
        />{" "}
        <Route path="/domain-details/:domainSlug" element={<DomainDetails />} />
        {/* Service Routes */}
        <Route path="/digital-solutions" element={<DigitalSolutionsPage />} />
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/work-with-us" element={<WorkWithUsPage />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/career-guidance" element={<CareerGuidancePage />} />
        <Route path="/freelance-projects" element={<FreelanceProjectsPage />} />
        <Route path="/career-jobs" element={<CareerJobsPage />} />
        {/* Campus Ambassador Program Routes */}
        <Route path="/campus-ambassador" element={<CampusAmbassador />} />
        <Route
          path="/campus-ambassador-application"
          element={<CampusAmbassadorApplication />}
        />
        <Route
          path="/campus-ambassador-test"
          element={<CampusAmbassadorTestPage />}
        />
        <Route path="/apply-internship" element={<InternshipApplication />} />
        {/* Career Page Route */}
        <Route path="/careers" element={<CareerPage />} />
        {/* User Management Route */}
        <Route path="/users" element={<UserPage />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminApp />} />
        <Route path="/admin/dashboard" element={<AdminApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/admin-login" element={<SimpleAdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-page" element={<UserPage />} />
        {/* Home route with multiple sections */}
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <OurServices />
              <About />
              <Programs />
              <Pricing />
              <Certificates />
              <Testimonials />
              <FAQ />
              <Contact />
              <Partners />
            </main>
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
