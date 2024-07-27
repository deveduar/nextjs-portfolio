"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThemeSwitch from "./themeswitch";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const menu = document.getElementById("navbar-default");
    const button = document.querySelector("[data-collapse-toggle]");

    if (menu && !menu.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 "> 
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 lg:px-24 relative">
        <div className="flex items-center md:space-x-8 lg:space-x-72 xl:space-x-96">
          <Link href="/" passHref className="flex items-center space-x-3 rtl:space-x-reverse pr-20">
            <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white">Deveduar</span>
          </Link>
          <div className={`${isOpen ? "block" : "hidden"} absolute top-16 left-0 right-0 bg-white bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 md:static md:block md:w-auto md:bg-transparent dark:md:bg-transparent transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`} id="navbar-default">
            
            <ul className="font-medium flex flex-col p-3 md:p-0 mt-2 md:mt-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:border-0 bg-gray-50 bg-opacity-90 md:bg-transparent dark:bg-gray-800 dark:bg-opacity-90 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <Link href="/" passHref className="block py-2 px-3 text-gray-800 rounded md:bg-transparent md:text-gray-900 md:p-0 dark:text-white" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="#projects" passHref className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-300 md:hover:bg-transparent md:border-0 md:hover:text-blue-900 md:p-0 dark:text-white md:dark:hover:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={closeMenu}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#about" passHref className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-300 md:hover:bg-transparent md:border-0 md:hover:gray-900 md:p-0 dark:text-white md:dark:hover:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" passHref className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-300 md:hover:bg-transparent md:border-0 md:hover:text-blue-900 md:p-0 dark:text-white md:dark:hover:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={closeMenu}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center space-x-3 ml-auto"> 
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <span className="py-2 px-3 text-gray-900 rounded  md:border-0 md:p-0 dark:text-white   dark:hover:text-white  transform transition-transform duration-300 hover:scale-105">
            <ThemeSwitch />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
