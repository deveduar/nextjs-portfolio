"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Typewriter from 'typewriter-effect';
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/data/icons";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}




const Hero: React.FC<HeroProps> = ({ title, subtitle, imageSrc }) => {
  return (
 
        <div className="w-full  flex flex-col text-gray-900 dark:text-white bg-white dark:bg-gray-800 md:h-64 justify-center  rounded-xl px-4 ">
          {/* Sección del texto */}
          <div className="flex flex-col px-2 ">
            <h3 className="text-3xl md:text-4xl lg:text-4xl font-bold whitespace-nowrap text-left py-6 md:py-0">
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(title)
                    .pauseFor(2500)
                    .deleteAll()
                    .typeString("Full Stack Developer")
                    .pauseFor(1000)
                    .deleteAll()
                    .pauseFor(2500)
                    .typeString("System Administrator")
                    .pauseFor(2500)
                    .start();
                }}
              />
            </h3>
            <div className="w-full ">
              <p className="text-2xl  md:text-2xl lg:text-2xl mt-1 ">{subtitle}</p>
              <div className="flex flex-col md:flex-row space-y-4  pt-8 pb-3 md:pb-0 justify-between">
                <div className="flex items-center justify-center">
                  <Link
                    href="/projectView"
                    className="inline-flex dark:bg-gray-200 dark:hover:bg-gray-400 bg-gray-800 hover:bg-gray-500 dark:text-gray-900 text-white font-bold py-2 px-4 rounded-full"
                  >
                    View My Work
                  </Link>
                  <Link href="/contactView" className="font-bold inline-flex py-2 px-4 bg-yellow-500 text-gray-900 rounded-full hover:bg-yellow-600 transition-all duration-300 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500 ml-4">
                    Let’s Connect
                  </Link>
                </div>
                <div className="flex justify-center space-x-3 mt-4  ">
                  <Link href="http://www.linkedin.com/in/deveduar" target="_blank" className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary transition-all duration-300">
                    {LinkedInIcon}
                  </Link>
                  <Link href="https://twitter.com/deveduar" target="_blank" className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary transition-all duration-300">
                    {TwitterIcon}
                  </Link>
                  <Link href="https://github.com/deveduar" target="_blank" className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary transition-all duration-300">
                    {GitHubIcon}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Hero;
