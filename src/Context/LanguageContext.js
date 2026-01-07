import { createContext } from "react";
import { getInitialLanguage } from "../utils/language";

export const LanguageContext = createContext(getInitialLanguage());