"use client"
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub, FaChevronUp } from "react-icons/fa";
import profile from "@/data/profile";
import Typewriter from 'typewriter-effect';
import Image from "next/image";

interface AboutSectionProps {
  scrollToTopRef?: React.RefObject<HTMLDivElement>;
  onScrollToTop?: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ scrollToTopRef, onScrollToTop }) => {
  
  const scrollToTop = () => {
    onScrollToTop?.();
  };

  return (
    <section className="flex flex-col px-4 py-8 min-h-screen snap-start">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">About</h2>
        <button 
          onClick={scrollToTop}
          className="p-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 shadow hover:shadow-md transition-all"
        >
          <FaChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Image
              src="/images/profile.webp"
              width={56}
              height={56}
              alt="Profile"
              className="rounded-full"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{profile.name}</h2>
              <p className="text-sm text-blue-600 dark:text-blue-400">
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

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            {profile.description.map((paragraph, i) => (
              <p key={i} className="text-sm leading-6 text-gray-600 dark:text-gray-400">{paragraph}</p>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">📍 Spain</span>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Available for projects</span>
          </div>

          <div className="flex gap-2">
            <Link href={profile.socialLinks.linkedin} target="_blank" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
              <FaLinkedin className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </Link>
            <Link href={profile.socialLinks.twitter} target="_blank" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
              <FaTwitter className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </Link>
            <Link href={profile.socialLinks.github} target="_blank" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
              <FaGithub className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </Link>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-300 mb-2">Experience</h3>
            <div className="space-y-2">
              {profile.workExperience.map((exp, i) => (
                <div key={i} className="border-l-2 border-blue-500 dark:border-blue-400 pl-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{exp.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{exp.company} • {exp.period}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-300 mb-2">Education</h3>
            <div className="space-y-2">
              {profile.education.map((edu, i) => (
                <div key={i} className="border-l-2 border-purple-500 dark:border-purple-400 pl-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{edu.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{edu.institution} • {edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-300 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.programmingLanguages.map((s, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
              ))}
              {profile.skills.frontend.frameworks.map((s, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
              ))}
              {profile.skills.frontend.styles.map((s, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
              ))}
              {profile.skills.backend.frameworks.map((s, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
              ))}
              {profile.skills.backend.databases.map((s, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
              ))}
              {profile.skills.devOps.map((s, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;