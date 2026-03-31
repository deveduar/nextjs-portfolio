import React from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative z-30 flex items-end justify-center mt-auto">
      <div className="w-full bg-white/50 dark:bg-gray-950/50 border-t border-gray-200/50 dark:border-gray-800 px-2 md:px-12 lg:px-50 xl:px-60 backdrop-blur-sm">
        <div className="flex justify-between items-center py-3">
          <p className="text-sm dark:text-gray-400 text-gray-900">
            Personal portfolio developed by <Link href="/" className="dark:text-gray-300 hover:none text-gray-900 font-bold">deveduar</Link> - 2025.
          </p>

          <div className="flex space-x-3">
            <Link href="http://www.linkedin.com/in/deveduar" target="_blank" className="size-8 inline-flex justify-center items-center rounded-lg border-transparent">
              <FaLinkedin className="w-4 h-4 text-gray-900 dark:text-gray-400 transition-all duration-300 hover:scale-125 hover:text-blue-500" />
            </Link>
            <Link href="https://x.com/deveduar" target="_blank" className="size-8 inline-flex justify-center items-center rounded-lg border-transparent">
              <FaTwitter className="w-4 h-4 text-gray-900 dark:text-gray-400 transition-all duration-300 hover:scale-125 hover:text-blue-400" />
            </Link>
            <Link href="https://github.com/deveduar" target="_blank" className="size-8 inline-flex justify-center items-center rounded-lg border-transparent">
              <FaGithub className="w-4 h-4 text-gray-900 dark:text-gray-400 transition-all duration-300 hover:scale-125 hover:text-gray-600 dark:hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;