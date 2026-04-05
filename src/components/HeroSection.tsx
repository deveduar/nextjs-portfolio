"use client"
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub, FaChevronDown } from "react-icons/fa";
import TechMarquee from "./techMarquee";
import { useSearchContext } from "./navbar";

interface HeroSectionProps {
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
  };
  onScrollToProjects?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ socialLinks, onScrollToProjects }) => {
  const { openContactModal } = useSearchContext();

  const scrollToNext = () => {
    onScrollToProjects?.();
  };

  return (
    <section className="flex flex-col justify-between px-4 py-8 min-h-screen">
      <TechMarquee />
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to my portfolio.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Here you&apos;ll find a selection of projects focused on performance, scalability, and real-world reliability — from modern frontend applications to backend services and automated deployments.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Enjoy exploring!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button 
              onClick={openContactModal}
              className="bg-blue-200 dark:bg-blue-900 rounded-lg px-6 py-3 flex items-center justify-center font-medium hover:opacity-80 transition-opacity text-gray-900 dark:text-white text-sm"
            >
              Let&apos;s Connect
            </button>
            <Link
              href="/projects"
              className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-lg px-6 py-3 flex items-center justify-center font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white text-sm"
            >
              View My Work
            </Link>
          </div>

          <div className="flex gap-3">
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
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-8">
        <button 
          onClick={scrollToNext}
          className="p-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all animate-bounce"
        >
          <FaChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
