import {
  BrowserRouter as Router,
  Routes,
  Route,
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
import { Contact } from "./components/pages/contact/Contact";
import { Partners } from "./components/pages/home/Partners";
import { Footer } from "./components/layout/Footer";
import { FAQPopup } from "./components/ui/FAQPopup";
import { FAQProvider, useFAQ } from "./lib/hooks/use-faq";
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
import CareerPage from "./components/features/careers/CareerPage";

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
  const { isFAQOpen, closeFAQ } = useFAQ();
  
  return (
    <div className="font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Navbar />
      <LiveChatButton />

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
        <Route path="/apply-internship" element={<InternshipApplication />} />
        {/* Career Page Route */}
        <Route path="/careers" element={<CareerPage />} />
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
              <Contact />
              <Partners />
            </main>
          }
        />
      </Routes>

      <Footer />
      <FAQPopup isOpen={isFAQOpen} onClose={closeFAQ} />
    </div>
  );
}

function App() {
  return (
    <FAQProvider>
      <Router>
        <AppLayout />
      </Router>
    </FAQProvider>
  );
}

export default App;
