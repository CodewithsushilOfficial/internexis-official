import React, { createContext, useContext, useState, ReactNode } from "react";

interface FAQContextType {
  isFAQOpen: boolean;
  openFAQ: () => void;
  closeFAQ: () => void;
}

const FAQContext = createContext<FAQContextType | undefined>(undefined);

export const useFAQ = () => {
  const context = useContext(FAQContext);
  if (!context) {
    throw new Error("useFAQ must be used within a FAQProvider");
  }
  return context;
};

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
