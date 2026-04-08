"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSwipeDownToClose } from "@/hooks/useSwipeDownToClose";
import { useTheme } from "../context/ThemeContext";
import { 
  IoMoonOutline, 
  IoSunnyOutline, 
  IoColorPaletteOutline, 
  IoClose
} from "react-icons/io5";
import { getThemePalette, getSchemeAccentHex, ColorSchemeName } from "@/lib/themes";

const ThemeSwitch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const headerRef = useSwipeDownToClose(() => setIsOpen(false), popoverRef, isOpen);

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
    // Solo deshabilitamos el scroll del body en móviles (cuando es un Drawer inferior)
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const basePalette = getThemePalette(themeName, mode);
  const showVariants = themeFamily === "catppuccin" && mode === "dark";

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
            data-prevent-snap="true"
            className="absolute bottom-0 left-0 right-0 h-[360px] rounded-t-2xl border border-border/70 bg-background shadow-theme animate-slideUp sm:static sm:w-80 sm:h-[350px] sm:rounded-xl sm:border-border sm:animate-none sm:fade-in sm:zoom-in-95 flex flex-col overflow-hidden"
          >
            <div ref={headerRef} className="flex items-center justify-between border-b border-border/70 p-4 shrink-0 bg-background/95 backdrop-blur-sm z-10 touch-none cursor-grab active:cursor-grabbing sm:cursor-default" title="Arrastra hacia abajo para cerrar">
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

            <div className="p-4 space-y-5 flex-1 overflow-y-auto overscroll-contain custom-scrollbar">
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

              {/* Individual Theme Selector */}
              {showVariants && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
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

              {/* Inline Color Selection */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-muted">Color Accent</span>
                <div className="flex flex-wrap gap-2">
                  {availableColorSchemes.map((option) => {
                    const optionHex = getSchemeAccentHex(basePalette, option.id);
                    const active = option.id === colorScheme;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        title={option.label}
                        onClick={() => setColorScheme(option.id)}
                        className={`h-6 w-6 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent/50 ${
                          active 
                            ? "scale-110 ring-2 ring-foreground/80 ring-offset-2 ring-offset-background shadow-md" 
                            : "hover:scale-110 hover:shadow-sm opacity-80 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: optionHex }}
                        aria-label={option.label}
                      />
                    );
                  })}
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
