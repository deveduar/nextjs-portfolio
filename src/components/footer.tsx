import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="dark:bg-gray-900 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left flex items-center px-5">
          <p className="mr-2">Developed by </p>
          <Link
            href="/"
            passHref
            className="text-blue-400 hover:text-blue-600 mr-2"
          >
            @deveduar
          </Link>
        </div>
        <div className="flex space-x-4 px-12">
          <Link
            href="https://github.com/deveduar"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Image
              src="/icons/github.svg"
              alt="GitHub"
              width={24}
              height={24}
              className="filter invert dark:invert-1"
            />
          </Link>
          <Link
            href="https://twitter.com/deveduar"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Image
              src="/icons/twitter.svg"
              alt="Twitter"
              width={24}
              height={24}
              className="filter invert dark:invert-1"
            />
          </Link>
          <Link
            href="http://www.linkedin.com/in/deveduar"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white "
          >
            <Image
              src="/icons/linkedin.svg"
              alt="LinkedIn"
              width={24}
              height={24}
              className="filter invert dark:invert-1"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
