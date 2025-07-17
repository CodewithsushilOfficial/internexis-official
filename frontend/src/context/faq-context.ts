import { createContext } from "react";
import { FAQContextType } from "@constants/faq";

export const FAQContext = createContext<FAQContextType | undefined>(undefined);
