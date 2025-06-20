import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import App from './App';
import { ThemeProvider } from './components/ui/theme-provider';

// Initialize AOS
export function AppWithProviders() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <App />
    </ThemeProvider>
  );
}
