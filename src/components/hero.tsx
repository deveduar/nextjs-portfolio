"use client"
import React from "react";
import Link from "next/link";
import Typewriter from 'typewriter-effect';
import SocialIcons from "./socialIcons";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/data/icons";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-4">
      {/* Panel principal con título y subtítulo */}
      <div className="col-span-3 md:col-span-3  rounded-xl space-y-3   p-6">

      <h2 className="text-3xl md:text-4xl  font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      <h3 className="text-xl md:text-xl  text-gray-900 dark:text-gray-300">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                // .typeString(title)
                // .pauseFor(2500)
                // .deleteAll()
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

        {/* <p className="text-lg text-gray-900 dark:text-gray-300">{subtitle}</p> */}
      </div>

      {/* Panel derecho con iconos y botones */}
      <div className="col-span-3 md:col-span-2 flex flex-col gap-4">
        {/* Iconos sociales en fila */}
        <div className="grid grid-cols-3 gap-4">
          
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
   
      <div className="col-span-3 md:col-span-5 bg-white dark:bg-gray-900 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <Image
              src="/images/profile.jpeg"
              alt="Profile Avatar"
              width={120}
              height={120}
              className="rounded-full border-2 dark:bg-gray-950 border-white dark:border-gray-950 shadow-lg"
              priority
            />
          </div>
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Eduardo Gomez</h3>
            <p className="text-gray-600 dark:text-gray-300">Full Stack Developer & System Administrator</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Passionate about creating efficient and scalable solutions. 
              Experienced in web development and system administration with 
              a focus on modern technologies.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <span className="text-sm text-gray-500 dark:text-gray-400">📍 Spain</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">💼 Available for projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtítulo */}
      {/* <div className="col-span-2 md:col-span-4 bg-white dark:bg-gray-800 rounded-xl p-6">
        <p className="text-2xl text-gray-900 dark:text-white">{subtitle}</p>
      </div> */}



    </div>
  );
};

export default Hero;