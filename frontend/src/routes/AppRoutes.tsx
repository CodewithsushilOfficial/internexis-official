import { Routes, Route } from "react-router-dom";
import { HeroSection } from "@components/Home/HeroSection";
import { About } from "@pages/about/About";
import { Internship, AllPrograms } from "@pages/Internship";
import { OurServices } from "@components/Home/OurServices";
import { Testimonials } from "@components/Home/Testimonials";
import { Contact } from "@pages/Contact/Contact";
import { Partners } from "@components/Home/Partners";
import { Services } from "@pages/Services/Services";
import { TermsOfService } from "@pages/Legal/TermsOfService";
import { PrivacyPolicy } from "@pages/Legal/PrivacyPolicy";
import { RefundPolicy } from "@pages/Legal/RefundPolicy";
import { CookiePolicy } from "@pages/Legal/CookiePolicy";
import { TermsAndConditions } from "@pages/Legal/TermsAndConditionsNew";
import { MeetInternexis } from "@pages/about/MeetInternexis";
import { Ambassador } from "@pages/CampusAmbassador/Ambassador";
import { Career } from "@pages/Career/Career";
import { UserPage } from "@pages/index";
import { CampusAmbassadorApplication } from "@pages/CampusAmbassador/CampusAmbassadorApplication";
import { CampusAmbassadorTestPage } from "@pages/CampusAmbassador/CampusAmbassadorTestPage";

// Course imports
import { Courses } from "@pages/Courses";
import { WebDevelopment } from "@pages/Courses/WebDevelopment";
import { AndroidDevelopment } from "@pages/Courses/AndroidDevelopment";
import { AIML } from "@pages/Courses/AIML";
import { PythonDjango } from "@pages/Courses/PythonDjango";
import { DataScience } from "@pages/Courses/DataScience";
import { CyberSecurity } from "@pages/Courses/CyberSecurity";
import { DSA } from "@pages/Courses/DSA";
import { UIUX } from "@pages/Courses/UIUX";

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
      
      {/* Services Page */}
      <Route path="/services" element={<Services />} />
      
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
      <Route path="/campus-ambassador" element={<Ambassador />} />
      <Route path="/campus-ambassador-application" element={<CampusAmbassadorApplication />} />
      <Route path="/campus-ambassador-test" element={<CampusAmbassadorTestPage />} />
      
      {/* Course Routes */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/web-development" element={<WebDevelopment />} />
      <Route path="/courses/android-development" element={<AndroidDevelopment />} />
      <Route path="/courses/ai-ml" element={<AIML />} />
      <Route path="/courses/python-django" element={<PythonDjango />} />
      <Route path="/courses/data-science" element={<DataScience />} />
      <Route path="/courses/cybersecurity" element={<CyberSecurity />} />
      <Route path="/courses/dsa" element={<DSA />} />
      <Route path="/courses/ui-ux" element={<UIUX />} />
      
      {/* Career Page */}
      <Route path="/careers" element={<Career />} />
      
      {/* Contact Page */}
      <Route path="/contact" element={<Contact />} />
      
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
            <HeroSection />
            <OurServices />
            <About />
            <Internship />
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
