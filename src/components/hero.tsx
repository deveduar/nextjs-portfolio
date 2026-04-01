"use client"
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub, FaUser } from "react-icons/fa";
import RecentProjectItem from '@/components/recentProjectItem';
import { useReadmes } from '@/hooks/useReadmes';
import ProfileInfo from "./profileInfo";
import TechMarquee from "./techMarquee";
import { useSearchContext } from "./navbar";

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
  const { openContactModal } = useSearchContext();

  const recentProjects = loading ? [] : [...readmes]
    .sort((a, b) => b.id - a.id)
    .slice(-4)
    .reverse();

  if (error) {
    console.error('Error loading projects:', error);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
      <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-center">
        <ProfileInfo name={name} specialty={specialty} />
        
        <div className="text-lg text-gray-600 dark:text-gray-300">
          <p className="leading-relaxed">
            Welcome to my portfolio.

            Here you&apos;ll find a selection of projects focused on performance, scalability, and real-world reliability — from modern frontend applications to backend services and automated deployments.

            Enjoy exploring!
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Link 
            href={socialLinks.linkedin}
            target="_blank" 
            className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-xl p-3 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FaLinkedin className="w-5 h-5 text-gray-900 dark:text-white" />
          </Link>
          <Link 
            href={socialLinks.twitter}
            target="_blank" 
            className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-xl p-3 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FaTwitter className="w-5 h-5 text-gray-900 dark:text-white" />
          </Link>
          <Link 
            href={socialLinks.github}
            target="_blank" 
            className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-xl p-3 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FaGithub className="w-5 h-5 text-gray-900 dark:text-white" />
          </Link>
          <Link 
            href="/about"
            className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-xl p-3 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FaUser className="w-5 h-5 text-gray-900 dark:text-white" />
          </Link>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={openContactModal}
            className="flex-1 bg-blue-200 dark:bg-blue-900 rounded-lg px-4 py-3 flex items-center justify-center font-medium hover:opacity-80 transition-opacity text-gray-900 dark:text-white text-sm"
          >
            Let&apos;s Connect
          </button>
          <Link
            href="/projects"
            className="flex-1 bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-lg px-4 py-3 flex items-center justify-center font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white text-sm"
          >
            View My Work
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <TechMarquee />
        
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 overflow-hidden flex-1">
          <div className="p-3 border-b border-gray-200/50 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Projects</h3>
          </div>
          <div className="p-2 space-y-2 max-h-[350px] lg:max-h-[400px] overflow-y-auto custom-scrollbar">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <RecentProjectItem key={project.id} project={project} />
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-4">
                No projects to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
