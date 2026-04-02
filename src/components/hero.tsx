"use client"
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import RecentProjectItem from '@/components/recentProjectItem';
import { useReadmes } from '@/hooks/useReadmes';
import ProfileInfo from "./profileInfo";
import TechMarquee from "./techMarquee";
import { useSearchContext } from "./navbar";
import profile from "@/data/profile";
import Typewriter from 'typewriter-effect';
import Image from "next/image";

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
    <div className="flex flex-col gap-4">
      <TechMarquee />
      
      {/* Welcome Text */}
      <div className="text-lg text-gray-600 dark:text-gray-300">
        <p className="leading-relaxed">
          Welcome to my portfolio.

          Here you&apos;ll find a selection of projects focused on performance, scalability, and real-world reliability — from modern frontend applications to backend services and automated deployments.

          Enjoy exploring!
        </p>
      </div>

      {/* Buttons and Social Icons */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex gap-2 flex-1 w-full sm:w-auto">
          <button 
            onClick={openContactModal}
            className="flex-1 sm:flex-none bg-blue-200 dark:bg-blue-900 rounded-lg px-6 py-3 flex items-center justify-center font-medium hover:opacity-80 transition-opacity text-gray-900 dark:text-white text-sm"
          >
            Let&apos;s Connect
          </button>
          <Link
            href="/projects"
            className="flex-1 sm:flex-none bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-lg px-6 py-3 flex items-center justify-center font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white text-sm"
          >
            View My Work
          </Link>
        </div>
        <div className="flex gap-2">
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

      {/* Bottom Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* About Me with ProfileInfo */}
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Image
                src="/images/profile.webp"
                width={48}
                height={48}
                alt="Profile"
                className="rounded-full"
              />
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  <Typewriter
                    options={{ autoStart: true, loop: true }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("Full Stack Developer")
                        .pauseFor(2000)
                        .deleteAll()
                        .pauseFor(500)
                        .typeString("System Administrator")
                        .pauseFor(2000)
                        .deleteAll()
                        .start();
                    }}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                        <div>
              {/* <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-300 mb-1">About</h4> */}
              <div className="space-y-1">
                {profile.description.map((paragraph, i) => (
                  <p key={i} className="text-xs leading-5 text-gray-600 dark:text-gray-400">{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 dark:text-gray-400">📍 Spain</span>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">Available for projects</span>
            </div>

            <div className="flex gap-1.5">
              <Link href={profile.socialLinks.linkedin} target="_blank" className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                <FaLinkedin className="w-3.5 h-3.5" />
              </Link>
              <Link href={profile.socialLinks.twitter} target="_blank" className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                <FaTwitter className="w-3.5 h-3.5" />
              </Link>
              <Link href={profile.socialLinks.github} target="_blank" className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                <FaGithub className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-300 mb-1">Experience</h4>
              <div className="space-y-1">
                {profile.workExperience.map((exp, i) => (
                  <div key={i} className="border-l-2 border-blue-500 dark:border-blue-400 pl-1.5">
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-200">{exp.title}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{exp.company} • {exp.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-300 mb-1">Education</h4>
              <div className="space-y-1">
                {profile.education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-purple-500 dark:border-purple-400 pl-1.5">
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-200">{edu.title}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{edu.institution} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-300 mb-1">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {profile.skills.programmingLanguages.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
                ))}
                {profile.skills.frontend.frameworks.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
                ))}
                {profile.skills.frontend.styles.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
                ))}
                {profile.skills.backend.frameworks.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
                ))}
                {profile.skills.backend.databases.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
                ))}
                {profile.skills.devOps.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
                ))}
              </div>
            </div>


          </div>
        </div>

        {/* Recent Projects */}
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 overflow-hidden">
          <div className="p-3 border-b border-gray-200/50 dark:border-gray-800 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Projects</h3>
            <Link href="/projects" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              See More
            </Link>
          </div>
          <div className="p-2 space-y-2 max-h-[350px] overflow-y-auto custom-scrollbar">
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
