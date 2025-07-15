import { Routes, Route } from "react-router-dom";
import { Hero } from "../pages/home/Hero";
import { About } from "../pages/about/About";
import { Programs } from "../pages/programs/Programs";
import { OurServices } from "../pages/home/OurServices";
// import { Pricing } from "../components/features/internships/Pricing";
// import { Certificates } from "../components/features/internships/Certificates";
import { Testimonials } from "../pages/home/Testimonials";
import { Contact } from "../pages/contact/Contact";
import { Partners } from "../pages/home/Partners";
import { TermsOfService } from "../components/features/legal/TermsOfService";
import { PrivacyPolicy } from "../components/features/legal/PrivacyPolicy";
import { RefundPolicy } from "../components/features/legal/RefundPolicy";
import { CookiePolicy } from "../components/features/legal/CookiePolicy";
import { TermsAndConditions } from "../components/features/legal/TermsAndConditionsNew";
import { MeetInternexis } from "../pages/about/MeetInternexis";
import { AllPrograms } from "../pages/programs/AllPrograms";
// import InternshipProjects from "../components/features/internships/InternshipProjects";
// import DomainDetails from "../components/features/internships/DomainDetails";
import CampusAmbassador from "../components/features/campus-ambassador/CampusAmbassador";
// import InternshipApplication from "../components/features/internships/InternshipApplication";
// import AdminDashboard from "../components/features/admin/AdminDashboard";
// import SimpleAdminLogin from "../components/features/admin/SimpleAdminLogin";
// import AdminApp from "../components/admin/AdminApp";
import CareerPage from "../components/features/careers/CareerPage";
import { UserPage } from "../pages";
import CampusAmbassadorApplication from "../pages/CampusAmbassadorApplication";
import CampusAmbassadorTestPage from "../pages/CampusAmbassadorTestPage";

// Service pages
// import DigitalSolutionsPage from "../components/features/services/DigitalSolutionsPage";
// import HackathonsPage from "../components/features/services/HackathonsPage";
// import WorkWithUsPage from "../components/features/services/WorkWithUsPage";
// import {
//   MentorshipPage,
//   CareerGuidancePage,
//   FreelanceProjectsPage,
//   CareerJobsPage,
// } from "../components/features/services/ServicePages";

export function AppRoutes() {
  return (
    <Routes>
      {/* Legal Pages */}
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      
      {/* About Pages */}
      <Route path="/meet-internexis" element={<MeetInternexis />} />
      
      {/* Program Pages */}
      <Route path="/all-programs" element={<AllPrograms />} />
      {/* TODO: Add back when components are created */}
      {/* <Route path="/internship-projects" element={<InternshipProjects />} />
      <Route path="/internship-projects/:domainSlug" element={<InternshipProjects />} />
      <Route path="/domain-details/:domainSlug" element={<DomainDetails />} /> */}
      
      {/* Service Pages - TODO: Add back when components are created */}
      {/* <Route path="/digital-solutions" element={<DigitalSolutionsPage />} />
      <Route path="/hackathons" element={<HackathonsPage />} />
      <Route path="/work-with-us" element={<WorkWithUsPage />} />
      <Route path="/mentorship" element={<MentorshipPage />} />
      <Route path="/career-guidance" element={<CareerGuidancePage />} />
      <Route path="/freelance-projects" element={<FreelanceProjectsPage />} />
      <Route path="/career-jobs" element={<CareerJobsPage />} /> */}
      
      {/* Campus Ambassador Program */}
      <Route path="/campus-ambassador" element={<CampusAmbassador />} />
      <Route path="/campus-ambassador-application" element={<CampusAmbassadorApplication />} />
      <Route path="/campus-ambassador-test" element={<CampusAmbassadorTestPage />} />
      {/* <Route path="/apply-internship" element={<InternshipApplication />} /> */}
      
      {/* Career Page */}
      <Route path="/careers" element={<CareerPage />} />
      
      {/* User Management */}
      <Route path="/users" element={<UserPage />} />
      <Route path="/user-page" element={<UserPage />} />
      
      {/* Admin Routes - TODO: Add back when components are created */}
      {/* <Route path="/admin" element={<AdminApp />} />
      <Route path="/admin/dashboard" element={<AdminApp />} />
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/admin-login" element={<SimpleAdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
      
      {/* Home Page */}
      <Route
        path="/"
        element={
          <main>
            <Hero />
            <OurServices />
            <About />
            <Programs />
            {/* TODO: Add back when components are created */}
            {/* <Pricing />
            <Certificates /> */}
            <Testimonials />
            <Contact />
            <Partners />
          </main>
        }
      />
    </Routes>
  );
}
