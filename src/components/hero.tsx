"use client"
import React from "react";
import Link from "next/link";
import Typewriter from 'typewriter-effect';
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import Image from "next/image";
import ProjectListSimple from '@/components/projectListSimple';
import { projects } from "@/data/projects";

interface HeroProps {
  name: string;
  specialty: string;
  description: string[];
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

const Hero: React.FC<HeroProps> = ({ name, specialty, description, socialLinks }) => {

  const recentProjects = projects.slice(-4).reverse();

  return (
    <div className="w-full grid grid-cols-4 md:grid-cols-6 gap-4">
      {/* Panel principal con título y subtítulo */}
      <div className="col-span-4 md:col-span-4 rounded-xl bg-white dark:bg-gray-800 p-6">
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/images/profile.jpeg"
                alt="Profile Avatar"
                width={80}
                height={80}
                className="rounded-full shadow-lg"
                priority
              />
                    <div className="flex flex-col text-left">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Hey, I am {name}
                    </h2>
                  <p className="  dark:text-gray- text-gray-500 dark:text-gray-400">
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
                  </p>
                </div>
    
              </div>
              <div className="space-y-4 text-md">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Welcome to my portfolio! I&#39;m a Full Stack Developer with over 5 years of experience crafting innovative and functional web applications. Here, you&#39;ll find some of my key projects and insights into my approach to clean code and efficient solutions. Enjoy exploring!
              </p>
            </div>
            {/* Social Links */}
            <div className="flex gap-2 flex-row justify-start items-center">
              <Link 
                href={socialLinks.linkedin}
                className=" rounded-xl  flex items-center justify-center gap-1 hover:scale-105 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-xs scale-75">
                  <FaLinkedin className="w-5 h-5 text-gray-900 dark:text-white" />
                </div>
                <span className="text-xs font-medium text-gray-900 dark:text-white">LinkedIn</span>
              </Link>
              <Link 
                href={socialLinks.twitter}
                className="rounded-xl  flex items-center justify-center gap-1 hover:scale-105 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-xs scale-75">
                  <FaTwitter className="w-5 h-5 text-gray-900 dark:text-white" />
                </div>
                <span className="text-xs font-medium text-gray-900 dark:text-white">Twitter</span>
              </Link>
              <Link 
                href={socialLinks.github}
                className="rounded-xl  flex items-center justify-center gap-1 hover:scale-105 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-xs scale-75">
                  <FaGithub className="w-5 h-5 text-gray-900 dark:text-white" />
                </div>
                <span className="text-xs font-medium text-gray-900 dark:text-white">GitHub</span>
              </Link>
            </div>
            <div className="flex gap-4 md:justify-start">
              <span className="text-sm text-gray-500 dark:text-gray-400">📍 Spain</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">💼 Available for projects</span>
            </div>
          </div>
          
          {/* Botón movido al final con margin-top auto */}
        <div className="flex pt-4">
            <Link 
              href="/aboutView"
              className="self-start inline-flex items-center px-4 py-2 bg-blue-200 dark:bg-blue-900 text-gray-900 dark:text-white rounded-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
            >
              More About Me
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Panel derecho con iconos y botones */}
      <div className="col-span-4 md:col-span-2 flex flex-col gap-4 ">
  
        {/* Iconos sociales en fila */}
        <div className="grid grid-cols-3 gap-4">
          
          <Link 
            href={socialLinks.linkedin}
            target="_blank" 
            className="bg-white dark:bg-gray-800 rounded-xl hover:scale-105 transition-all duration-300 p-3 md:p-0 flex items-center justify-center md:aspect-square md:h-auto "
          >
            <FaLinkedin className="
            w-5 h-5 md:w-8 md:h-8
            
            text-gray-900 dark:text-white" />
          </Link>
          <Link 
            href={socialLinks.twitter}
            target="_blank" 
            className="bg-white dark:bg-gray-800 rounded-xl p-2 md:p-4 flex items-center justify-center hover:scale-105 transition-all duration-300 md:aspect-square md:h-auto"
          >
            <FaTwitter className="w-5 h-5 md:w-8 md:h-8 text-gray-900 dark:text-white" />
          </Link>
          <Link 
            href={socialLinks.github}
            target="_blank" 
            className="bg-white dark:bg-gray-800 rounded-xl p-2 md:p-4 flex items-center justify-center hover:scale-105 transition-all duration-300 md:aspect-square  md:h-auto"
          >
            <FaGithub className="w-5 h-5 md:w-8 md:h-8 text-gray-900 dark:text-white" />
          </Link>
        </div>

        {/* Botones de acción */}
        <Link 
          href="/contactView" 
          className="bg-blue-200 dark:bg-blue-900 rounded-xl p-4 flex items-center justify-center font-bold hover:scale-105 transition-all duration-300 text-gray-900 dark:text-white"
        >
          Let&#39;s Connect
        </Link>
        <Link
          href="/projectsView"
          className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-center font-bold hover:scale-105 transition-all duration-300 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          View My Work
        </Link>

        {/* <Link 
           href="http://www.linkedin.com/in/deveduar" 
           target="_blank" 
           className="bg-white dark:bg-gray-800 rounded-xl  md:p-3 flex md:aspect-auto gap-6   hover:scale-105 transition-all duration-300 "
          >
             <ProjectListSimple 
             projects={recentProjects} variant="simple" 
   
             />
          </Link> */}
                <div className="rounded-xl  h-full">
          <ProjectListSimple 
            projects={recentProjects} 
            variant="simple" 
          />
        </div>
  
          
      </div>
    </div>
  );
};

export default Hero;