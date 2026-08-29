"use client";
import { createContext, useContext, useEffect, useState } from "react";
type Language = "es" | "en";
const LanguageContext = createContext({
  language: "es" as Language,
  toggle: () => {},
});
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");
  useEffect(() => {
    const saved = localStorage.getItem("cf-language");
    const timer = window.setTimeout(() => {
      if (saved === "en") {
        setLanguage("en");
        document.documentElement.lang = "en";
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const toggle = () =>
    setLanguage((current) => {
      const next = current === "es" ? "en" : "es";
      localStorage.setItem("cf-language", next);
      document.documentElement.lang = next;
      return next;
    });
  return (
    <LanguageContext.Provider value={{ language, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => useContext(LanguageContext);
