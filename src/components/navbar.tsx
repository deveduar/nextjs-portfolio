"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ThemeSwitch from "./themeswitch";
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("navbar-default");
      const button = document.querySelector("[data-collapse-toggle]");

      if (menu && !menu.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  return (
    <nav className="bg-gray-100 dark:bg-gray-950 px-2 md:px-12 lg:px-50 xl:px-60">
      <div className="w-full  flex flex-wrap items-center justify-between  py-6 relative">
        <div className="flex items-center md:space-x-8 lg:space-x-72 xl:space-x-96 px-4">
          <Link href="/" passHref className="flex items-center space-x-3 rtl:space-x-reverse ">
            <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white">Deveduar Portfolio</span>
          </Link>

        </div>

        <div className="flex items-center space-x-3">
        <div
            className={`${
              isOpen ? "block animate-menuSlideDown" : "hidden"
            } z-20 absolute top-16 left-0 right-0 md:static md:block md:w-auto`}
            id="navbar-default"
          >
               <ul className="font-medium flex flex-col p-3 md:p-0 mt-2 md:mt-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:border-0 bg-gray-100 bg-opacity-90 md:bg-transparent dark:bg-gray-950 rounded-b-xl dark:bg-opacity-90 md:dark:bg-transparent dark:border-gray-700 backdrop-blur-sm shadow-lg md:shadow-none">
        <li>
          <Link 
            href="/" 
            className={`block py-2 px-3 rounded md:p-0 transition-colors
              ${pathname === '/' 
                ? 'text-blue-600 dark:text-blue-400 hover:cursor-default' 
                : 'text-gray-900 dark:text-white hover:bg-gray-300 md:hover:bg-transparent md:hover:text-blue-900  md:dark:hover:text-gray-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
              }`}
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            href="/projects" 
            className={`block py-2 px-3 rounded md:p-0 transition-colors
              ${pathname === '/projects' 
                ? 'text-blue-600 dark:text-blue-400 hover:cursor-default' 
                : 'text-gray-900 dark:text-white hover:bg-gray-300 md:hover:bg-transparent md:hover:text-blue-900  md:dark:hover:text-gray-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
              }`}
            onClick={closeMenu}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link 
            href="/aboutView" 
            className={`block py-2 px-3 rounded md:p-0 transition-colors
              ${pathname === '/aboutView' 
                ? 'text-blue-600 dark:text-blue-400 hover:cursor-default' 
                : 'text-gray-900 dark:text-white hover:bg-gray-300 md:hover:bg-transparent md:hover:text-blue-900  md:dark:hover:text-gray-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
              }`}
            onClick={closeMenu}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            href="/contactView" 
            className={`block py-2 px-3 rounded md:p-0 transition-colors
              ${pathname === '/contactView' 
                ? 'text-blue-600 dark:text-blue-400 hover:cursor-default' 
                : 'text-gray-900 dark:text-white hover:bg-gray-300 md:hover:bg-transparent md:hover:text-blue-900  md:dark:hover:text-gray-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
              }`}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </li>
      </ul>
          </div>


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
          <span className="py-2 px-3 text-gray-900 rounded  md:border-0  dark:text-white   dark:hover:text-white  transform transition-transform duration-300 hover:scale-110">
            <ThemeSwitch />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
