import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import App from "./App";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "react-hot-toast";

// Initialize AOS
export function AppWithProviders() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <App />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </ThemeProvider>
  );
}
