"use client"
import React from "react";
import Link from "next/link";
import Typewriter from 'typewriter-effect';
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import Image from "next/image";
import ProjectListSimple from '@/components/projectListSimple';
import { useReadmes } from '@/hooks/useReadmes';

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
  const { readmes, loading, error } = useReadmes();

  const recentProjects = loading ? [] : [...readmes]
    .sort((a, b) => b.id - a.id)
    .slice(-4)
    .reverse();

  if (error) {
    console.error('Error loading projects:', error);
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <div className="rounded-xl bg-white dark:bg-gray-800 p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/images/profile.webp"
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
                <p className="text-gray-500 dark:text-gray-400">
                  <Typewriter
                    options={{
                      autoStart: true,
                      loop: true,
                    }}
                    onInit={(typewriter) => {
                      typewriter
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
            <div className="space-y-4 sm:text-sm md:text-md">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Welcome to my portfolio! I&apos;m a Full Stack Developer with over 5 years of experience crafting innovative and functional web applications. Here, you&apos;ll find some of my key projects and insights into my approach to efficient solutions. Enjoy exploring!
              </p>
            </div>
            <div className="flex gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">📍 Spain</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">💼 Available for projects</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Link 
            href={socialLinks.linkedin}
            target="_blank" 
            className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center justify-center hover:scale-105 transition-all duration-300"
          >
            <FaLinkedin className="w-5 h-5 text-gray-900 dark:text-white" />
          </Link>
          <Link 
            href={socialLinks.twitter}
            target="_blank" 
            className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center justify-center hover:scale-105 transition-all duration-300"
          >
            <FaTwitter className="w-5 h-5 text-gray-900 dark:text-white" />
          </Link>
          <Link 
            href={socialLinks.github}
            target="_blank" 
            className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center justify-center hover:scale-105 transition-all duration-300"
          >
            <FaGithub className="w-5 h-5 text-gray-900 dark:text-white" />
          </Link>
        </div>

        <div className="flex gap-2">
          <Link 
            href="/contactView" 
            className="flex-1 bg-blue-200 dark:bg-blue-900 rounded-lg px-4 py-3 flex items-center justify-center font-medium hover:scale-105 transition-all duration-300 text-gray-900 dark:text-white text-sm"
          >
            Let&apos;s Connect
          </Link>
          <Link
            href="/projects"
            className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 flex items-center justify-center font-medium hover:scale-105 transition-all duration-300 text-gray-900 dark:text-white text-sm"
          >
            View My Work
          </Link>
        </div>
      </div>

      <div className="min-h-[300px]">
        {recentProjects.length > 0 ? (
          <ProjectListSimple 
            projects={recentProjects} 
            variant="simple" 
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
            No projects to display
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;