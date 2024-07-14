"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      setDarkMode(true); // Modo oscuro por defecto si no hay tema guardado
    }
  }, []);

  useEffect(() => {
    if (darkMode !== null) {
      const bodyClass = window.document.body.classList;
      if (darkMode) {
        bodyClass.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        bodyClass.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  if (darkMode === null) {
    return null; // Renderiza un loader o nada hasta que se cargue el tema
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};