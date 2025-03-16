"use client"
import React from "react";
import Link from "next/link";
import Typewriter from 'typewriter-effect';
import SocialIcons from "./socialIcons";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/data/icons";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
      {/* Panel principal con título y subtítulo */}
      <div className="col-span-3 md:col-span-3  rounded-xl m-4 space-y-6">
      <h3 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 dark:text-white">
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
        <p className="text-2xl text-gray-900 dark:text-white">{subtitle}</p>
      </div>

      {/* Panel derecho con iconos y botones */}
      <div className="col-span-3 md:col-span-2 grid grid-cols-2 gap-4">
        {/* Iconos sociales en fila */}
        <div className="col-span-2 grid grid-cols-3 gap-2 md:gap-4">
          
          <Link 
            href="http://www.linkedin.com/in/deveduar" 
            target="_blank" 
            className="bg-white dark:bg-gray-800 rounded-xl hover:scale-105 transition-all duration-300 p-3 md:p-0 flex items-center justify-center md:aspect-square md:h-auto "
          >
            <FaLinkedin className="
            w-5 h-5 md:w-8 md:h-8
            
            text-gray-900 dark:text-white" />
          </Link>
        

          <Link 
            href="https://twitter.com/deveduar" 
            target="_blank" 
            className="bg-white dark:bg-gray-800 rounded-xl p-2 md:p-4 flex items-center justify-center hover:scale-105 transition-all duration-300 md:aspect-square md:h-auto"
          >
            <FaTwitter className="w-5 h-5 md:w-8 md:h-8 text-gray-900 dark:text-white" />
          </Link>
          <Link 
            href="https://github.com/deveduar" 
            target="_blank" 
            className="bg-white dark:bg-gray-800 rounded-xl p-2 md:p-4 flex items-center justify-center hover:scale-105 transition-all duration-300 md:aspect-square  md:h-auto"
          >
            <FaGithub className="w-5 h-5 md:w-8 md:h-8 text-gray-900 dark:text-white" />
          </Link>
        </div>

        {/* Botones de acción */}
        <Link
          href="/projectView"
          className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-center font-bold hover:scale-105 transition-all duration-300 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          View My Work
        </Link>
        <Link 
          href="/contactView" 
          className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4 flex items-center justify-center font-bold hover:scale-105 transition-all duration-300 text-gray-900 dark:text-white"
        >
          Let&#39;s Connect
        </Link>
      </div>
   


      {/* Subtítulo */}
      {/* <div className="col-span-2 md:col-span-4 bg-white dark:bg-gray-800 rounded-xl p-6">
        <p className="text-2xl text-gray-900 dark:text-white">{subtitle}</p>
      </div> */}



    </div>
  );
};

export default Hero;