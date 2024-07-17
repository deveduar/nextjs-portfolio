"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

const ThemeSwitch: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={toggleDarkMode} />
        <div className="w-6 h-6 "></div>
        <Image
          src={darkMode ? "/images/sun-medium.svg" : "/images/moon.svg"}
          alt={darkMode ? "Moon icon" : "Sun icon"}
          className="w-6 h-6 absolute   pointer-events-none"
          width={10}
          height={10}
        />
      </label>
    </div>
  );
};

export default ThemeSwitch;
