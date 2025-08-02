import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppWithProviders } from "./app-with-providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
);
