"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const ThemeSwitch: React.FC = () => {
  const { darkMode, toggleDarkMode, themeFamily, setThemeFamily } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-full border border-border bg-surface-muted p-1">
        {(["dracula", "catppuccin"] as const).map((family) => {
          const active = themeFamily === family;

          return (
            <button
              key={family}
              type="button"
              onClick={() => setThemeFamily(family)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                active
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted hover:bg-surface hover:text-foreground"
              }`}
              aria-pressed={active}
            >
              <span className="hidden sm:inline">{family === "dracula" ? "Dracula" : "Catppuccin"}</span>
              <span className="sm:hidden">{family === "dracula" ? "D" : "C"}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={toggleDarkMode}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-foreground transition-colors hover:bg-surface-alt"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <IoSunnyOutline className="h-4 w-4" /> : <IoMoonOutline className="h-4 w-4" />}
        <span className="hidden sm:inline text-xs font-medium">
          {darkMode ? "Dark" : "Light"}
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitch;
