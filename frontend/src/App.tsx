import { BrowserRouter as Router } from "react-router-dom";
import { FAQProvider } from "./hooks/use-faq";
import { MainLayout } from "./layouts/MainLayout";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <FAQProvider>
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </FAQProvider>
  );
}

export default App;
