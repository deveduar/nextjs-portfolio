import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/data/icons";

const Footer: React.FC = () => {
  return (
    <footer id="contact" className=" flex items-end justify-center mt-auto ">
      <div className="w-full bg-gray-100 border-gray-200 dark:bg-gray-950 px-2 md:px-12 lg:px-50 xl:px-60">
        <div className=" py-5  justify-between">
          {/* <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
            <div className="col-span-full lg:col-span-1 flex justify-center lg:justify-start">
              <div className="flex items-center">
                <Image src="/images/pc-1.png" alt="Logo" className="h-10 me-5" width={50} height={50} />
                <Link href="#" className="flex-none text-3xl font-semibold text-white" aria-label="logo">
                  Deveduar
                </Link>
              </div>
            </div>
          </div> */}

          <div className="mt-2 sm:mt-2 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center text-center sm:text-left">
            <div className="flex justify-center sm:justify-between items-center w-full sm:w-auto">
              <p className="text-lg  dark:text-gray-400 text-gray-900">
                Personal portfolio developed by <Link href="/" className="dark:text-gray-300 hover:none text-gray-900 font-bold">deveduar</Link> - 2025.
              </p>
            </div>

            <div className="flex justify-center space-x-3 mt-4 sm:mt-0">
            <Link href="http://www.linkedin.com/in/deveduar" target="_blank" className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary transition-all duration-300">
            {LinkedInIcon}
              </Link>
              <Link href="https://x.com/deveduar" target="_blank" className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary transition-all duration-300">
               {TwitterIcon}
              </Link>
              <Link href="https://github.com/deveduar" target="_blank" className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary transition-all duration-300">
                {GitHubIcon}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
