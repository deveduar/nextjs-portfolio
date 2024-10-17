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
    <div className=" text-gray-900  dark:text-white py-5 space-y-2 rounded-xl lg:mx-16 ">
      <div className="container flex flex-col md:px-12 px-6">
        {/* Sección de la imagen visible solo en pantallas pequeñas */}
        {/* <div className="lg:hidden">
          <Image className="rounded-full mx-auto mb-6" src={imageSrc} alt={title} height={200} width={200} priority={false} />
        </div> */}

        {/* Sección del texto */}
        <div className="flex flex-col  ">
          <h3 className="text-4xl md:text-5xl font-bold mb-1 text-center whitespace-nowrap">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter.typeString(title)
                  .callFunction(() => {
                    // console.log('String typed out!');
                  })
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
          <div className=" w-full">
          <p className="text-xl md:text-2xl mb-2 mt-4 ">{subtitle}</p>
          <div className="flex flex-col md:flex-row  space-y-4 md:space-y-0  py-4 justify-between">
            
            <div className="flex items-center justify-center">
              <Link
                href="#projects"
                className="inline-flex dark:bg-gray-200 dark:hover:bg-gray-400 bg-gray-800 hover:bg-gray-500 dark:text-gray-900 text-white font-bold py-2 px-4 rounded-full"
              >
                View My Work
              </Link>
            </div>
            <div className="flex justify-center space-x-3 mt-4 sm:mt-0">
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
    </div>
  );
};

export default Hero;
