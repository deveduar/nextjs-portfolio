"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import {
  applyColorScheme,
  colorSchemeOptions,
  ColorSchemeName,
  defaultThemeName,
  getThemePalette,
  hexToRgbChannels,
  ThemeFamily,
  ThemeName,
  ThemeMode,
  themeOptions,
} from "@/lib/themes";

interface ThemeContextProps {
  themeName: ThemeName;
  themeFamily: ThemeFamily;
  mode: ThemeMode;
  setThemeName: (themeName: ThemeName) => void;
  setThemeFamily: (themeFamily: ThemeFamily) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  palette: ReturnType<typeof getThemePalette>;
  familyThemes: Array<{ id: ThemeName; label: string; family: ThemeFamily }>;
  colorScheme: ColorSchemeName;
  setColorScheme: (colorScheme: ColorSchemeName) => void;
  availableColorSchemes: Array<{ id: ColorSchemeName; label: string }>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>(defaultThemeName);
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>("default");

  useEffect(() => {
    const savedThemeName = localStorage.getItem("theme-name") as ThemeName | null;
    const savedThemeFamily = localStorage.getItem("theme-family") as ThemeFamily | null;
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode | null;
    const savedColorScheme = localStorage.getItem("theme-color-scheme") as ColorSchemeName | null;
    const legacyMode = localStorage.getItem("theme");
    const storedMode: ThemeMode = savedMode === "dark" || savedMode === "light"
      ? savedMode
      : legacyMode === "dark" || legacyMode === "light"
        ? legacyMode
        : "dark";

    setMode(storedMode);
    if (savedColorScheme && colorSchemeOptions.some((scheme) => scheme.id === savedColorScheme)) {
      setColorScheme(savedColorScheme);
    }
    const validThemeName = savedThemeName && themeOptions.some((theme) => theme.id === savedThemeName);

    if (validThemeName) {
      setThemeName(savedThemeName);
      return;
    }

    if (savedThemeFamily === "dracula" || savedThemeFamily === "catppuccin") {
      const firstThemeInFamily = themeOptions.find((theme) => theme.family === savedThemeFamily);
      if (firstThemeInFamily) {
        setThemeName(firstThemeInFamily.id);
        return;
      }
      return;
    }

    setThemeName(defaultThemeName);
  }, []);

  const basePalette = useMemo(() => getThemePalette(themeName, mode), [themeName, mode]);
  const palette = useMemo(() => applyColorScheme(basePalette, colorScheme), [basePalette, colorScheme]);
  const themeFamily = palette.family;
  const familyThemes = useMemo(
    () => themeOptions.filter((theme) => theme.family === themeFamily),
    [themeFamily]
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const rootClassList = root.classList;

    root.dataset.themeName = themeName;
    root.dataset.themeFamily = themeFamily;
    root.dataset.themeMode = mode;
    root.dataset.themeColorScheme = colorScheme;

    rootClassList.toggle("dark", mode === "dark");
    rootClassList.toggle("light", mode === "light");

    Object.entries(palette.colors).forEach(([token, value]) => {
      root.style.setProperty(`--color-${token}`, hexToRgbChannels(value));
    });

    root.style.colorScheme = mode;

    localStorage.setItem("theme-name", themeName);
    localStorage.setItem("theme-family", themeFamily);
    localStorage.setItem("theme-mode", mode);
    localStorage.setItem("theme", mode);
    localStorage.setItem("theme-color-scheme", colorScheme);
  }, [colorScheme, mode, palette, themeFamily, themeName]);

  const setThemeFamily = (family: ThemeFamily) => {
    const firstThemeInFamily = themeOptions.find((theme) => theme.family === family);
    if (firstThemeInFamily) {
      setThemeName(firstThemeInFamily.id);
    }
  };

  const toggleMode = () => {
    setMode((previousMode) => (previousMode === "dark" ? "light" : "dark"));
  };

  const toggleDarkMode = toggleMode;
  const darkMode = mode === "dark";

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        themeFamily,
        mode,
        setThemeName,
        setThemeFamily,
        setMode,
        toggleMode,
        darkMode,
        toggleDarkMode,
        palette,
        familyThemes,
        colorScheme,
        setColorScheme,
        availableColorSchemes: colorSchemeOptions,
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
