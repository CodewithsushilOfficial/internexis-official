import React, { useState, ReactNode } from "react";
import { FAQContext } from "./faq-context";

interface FAQProviderProps {
  children: ReactNode;
}

export const FAQProvider: React.FC<FAQProviderProps> = ({ children }) => {
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  const openFAQ = () => setIsFAQOpen(true);
  const closeFAQ = () => setIsFAQOpen(false);

  return (
    <FAQContext.Provider value={{ isFAQOpen, openFAQ, closeFAQ }}>
      {children}
    </FAQContext.Provider>
  );
};
