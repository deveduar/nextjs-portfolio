"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";
import { 
  IoMoonOutline, 
  IoSunnyOutline, 
  IoColorPaletteOutline, 
  IoClose,
  IoChevronForward
} from "react-icons/io5";
import { getThemePalette, getSchemeAccentHex, ColorSchemeName } from "@/lib/themes";

const ThemeSwitch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const colorDropdownRef = useRef<HTMLDivElement>(null);

  const {
    darkMode,
    mode,
    toggleDarkMode,
    themeName,
    themeFamily,
    setThemeName,
    setThemeFamily,
    familyThemes,
    colorScheme,
    setColorScheme,
    availableColorSchemes,
  } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutsideColor = (event: MouseEvent) => {
      if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target as Node)) {
        setColorDropdownOpen(false);
      }
    };
    if (colorDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideColor);
    }
    return () => document.removeEventListener("mousedown", handleClickOutsideColor);
  }, [colorDropdownOpen]);

  const basePalette = getThemePalette(themeName, mode);
  const currentSchemeOption = availableColorSchemes.find(s => s.id === colorScheme) || availableColorSchemes[0];

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
        title="Theme Settings"
      >
        <IoColorPaletteOutline size={18} />
      </button>

      {isOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100] sm:inset-auto sm:right-4 sm:top-14 sm:mt-2">
          {/* Mobile Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 sm:hidden animate-overlayFadeIn"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer / Popover Container */}
          <div 
            ref={popoverRef}
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border border-border/70 bg-background shadow-theme animate-slideUp sm:static sm:w-80 sm:rounded-xl sm:border-border sm:animate-none sm:fade-in sm:zoom-in-95 flex flex-col custom-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-border/70 p-4 shrink-0 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <IoColorPaletteOutline className="text-accent" />
                Theme Settings
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1.5 text-muted hover:bg-surface hover:text-foreground transition-colors"
                aria-label="Cerrar ajustes"
              >
                <IoClose size={18} />
              </button>
            </div>

            <div className="p-4 space-y-5">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted">Appearance</span>
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
                >
                  {darkMode ? <IoSunnyOutline size={14} /> : <IoMoonOutline size={14} />}
                  <span className="text-[11px] font-semibold">
                    {darkMode ? "Light" : "Dark"}
                  </span>
                </button>
              </div>

              {/* Theme Family Selector */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted">Family</span>
                <div className="flex p-1 bg-surface-muted border border-border rounded-lg">
                  {(["dracula", "catppuccin"] as const).map((family) => {
                    const active = themeFamily === family;
                    return (
                      <button
                        key={family}
                        type="button"
                        onClick={() => setThemeFamily(family)}
                        className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                          active
                            ? "bg-accent text-accent-foreground shadow-sm"
                            : "text-muted hover:text-foreground hover:bg-surface/50"
                        }`}
                      >
                        {family === "dracula" ? "Dracula" : "Catppuccin"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Individual Theme Selector (Only mostly for Catppuccin variants typically) */}
              {familyThemes.length > 1 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted">Variant</span>
                  <div className="flex flex-wrap gap-2">
                    {familyThemes.map((theme) => {
                      const active = theme.id === themeName;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setThemeName(theme.id)}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                            active
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border/50 bg-surface hover:border-border hover:bg-surface-alt text-muted"
                          }`}
                        >
                          {theme.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Color Dropdown */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted">Color Accent</span>
                
                <div className="relative" ref={colorDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
                    className="flex w-full items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground transition-all hover:bg-surface-alt focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3.5 w-3.5 rounded-full shadow-sm"
                        style={{ backgroundColor: getSchemeAccentHex(basePalette, currentSchemeOption.id) }}
                      />
                      <span className="font-medium text-xs">{currentSchemeOption.label}</span>
                    </div>
                    <IoChevronForward className={`text-muted transition-transform ${colorDropdownOpen ? 'rotate-90' : ''}`} size={14} />
                  </button>

                  <div
                    className={`absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 max-h-48 overflow-y-auto rounded-lg border border-border/20 bg-surface shadow-soft transition-all custom-scrollbar origin-top ${
                      colorDropdownOpen ? "scale-y-100 opacity-100 pointer-events-auto" : "scale-y-95 opacity-0 pointer-events-none"
                    }`}
                  >
                    <ul role="listbox" className="p-1">
                      {availableColorSchemes.map((option) => {
                        const optionHex = getSchemeAccentHex(basePalette, option.id);
                        return (
                          <li key={option.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setColorScheme(option.id);
                                setColorDropdownOpen(false);
                              }}
                              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                                option.id === colorScheme
                                  ? "bg-accent/10 text-foreground font-semibold"
                                  : "text-muted hover:bg-surface-alt hover:text-foreground"
                              }`}
                            >
                              <div 
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: optionHex }}
                              />
                              <span>{option.label}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ThemeSwitch;
