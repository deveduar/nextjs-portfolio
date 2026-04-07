"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import {
  defaultThemeFamily,
  getThemePalette,
  hexToRgbChannels,
  ThemeFamily,
  ThemeMode,
} from "@/lib/themes";

interface ThemeContextProps {
  themeFamily: ThemeFamily;
  mode: ThemeMode;
  setThemeFamily: (themeFamily: ThemeFamily) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  palette: ReturnType<typeof getThemePalette>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeFamily, setThemeFamily] = useState<ThemeFamily>(defaultThemeFamily);
  const [mode, setMode] = useState<ThemeMode | null>(null);

  useEffect(() => {
    const savedThemeFamily = localStorage.getItem("theme-family") as ThemeFamily | null;
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode | null;
    const legacyMode = localStorage.getItem("theme");

    const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    if (savedThemeFamily === "dracula" || savedThemeFamily === "catppuccin") {
      setThemeFamily(savedThemeFamily);
    }

    if (savedMode === "dark" || savedMode === "light") {
      setMode(savedMode);
      return;
    }

    if (legacyMode === "dark" || legacyMode === "light") {
      setMode(legacyMode);
      return;
    }

    setMode(systemMode);
  }, []);

  const palette = useMemo(() => getThemePalette(themeFamily, mode ?? "dark"), [themeFamily, mode]);

  useEffect(() => {
    if (!mode) {
      return;
    }

    const root = window.document.documentElement;
    const rootClassList = root.classList;

    root.dataset.themeFamily = themeFamily;
    root.dataset.themeMode = mode;

    rootClassList.toggle("dark", mode === "dark");
    rootClassList.toggle("light", mode === "light");

    Object.entries(palette.colors).forEach(([token, value]) => {
      root.style.setProperty(`--color-${token}`, hexToRgbChannels(value));
    });

    root.style.colorScheme = mode;

    localStorage.setItem("theme-family", themeFamily);
    localStorage.setItem("theme-mode", mode);
    localStorage.setItem("theme", mode);
  }, [mode, palette, themeFamily]);

  const toggleMode = () => {
    setMode((previousMode) => (previousMode === "dark" ? "light" : "dark"));
  };

  const toggleDarkMode = toggleMode;
  const darkMode = mode === "dark";

  if (mode === null) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        themeFamily,
        mode,
        setThemeFamily,
        setMode,
        toggleMode,
        darkMode,
        toggleDarkMode,
        palette,
      }}
    >
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
