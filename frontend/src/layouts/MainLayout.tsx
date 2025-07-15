import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LiveChatButton } from "../components/ui/live-chat-button";
import { FAQPopup } from "../components/ui/FAQPopup";
import { useFAQ } from "../hooks/use-faq";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { isFAQOpen, closeFAQ } = useFAQ();

  return (
    <div className="font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <LiveChatButton />}
      
      {children}
      
      {!isAdminRoute && <Footer />}
      <FAQPopup isOpen={isFAQOpen} onClose={closeFAQ} />
    </div>
  );
}
