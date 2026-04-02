"use client"
import React from "react";
import Typewriter from 'typewriter-effect';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import profile from "@/data/profile";

export default function About() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex gap-3 shrink-0 md:w-auto">
          <Image
            src="/images/profile.webp"
            width={48}
            height={48}
            alt="Profile Picture"
            className="rounded-full shadow-lg mt-0.5"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {profile.name}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Full Stack Developer")
                    .pauseFor(2000)
                    .deleteAll()
                    .pauseFor(500)
                    .typeString("System Administrator")
                    .pauseFor(2000)
                    .deleteAll()
                    .pauseFor(500)
                    .start();
                }}
              />
            </p>
          </div>
        </div>
        <div className="flex-1 md:ml-4 text-xs text-gray-600 dark:text-gray-300 leading-5">
          {profile.description[0]}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Link 
          href={profile.socialLinks.linkedin}
          className="flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="w-3.5 h-3.5 text-gray-900 dark:text-white" />
          <span className="text-xs font-medium text-gray-900 dark:text-white">LinkedIn</span>
        </Link>
        <Link 
          href={profile.socialLinks.twitter}
          className="flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="w-3.5 h-3.5 text-gray-900 dark:text-white" />
          <span className="text-xs font-medium text-gray-900 dark:text-white">Twitter</span>
        </Link>
        <Link 
          href={profile.socialLinks.github}
          className="flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="w-3.5 h-3.5 text-gray-900 dark:text-white" />
          <span className="text-xs font-medium text-gray-900 dark:text-white">GitHub</span>
        </Link>
        <span className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
          📍 Spain
        </span>
        <span className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
          💼 Available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-gray-900 dark:text-gray-300">Experience</h3>
          {profile.workExperience.slice(0, 2).map((exp, index) => (
            <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-2.5">
              <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-300">{exp.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{exp.company}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">{exp.period}</p>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-gray-900 dark:text-gray-300">Education</h3>
          {profile.education.slice(0, 2).map((edu, index) => (
            <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-2.5">
              <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-300">{edu.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{edu.institution}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 dark:text-gray-300">Skills</h3>
        <div className="flex flex-wrap gap-1">
          {profile.skills.programmingLanguages.slice(0, 4).map((lang, index) => (
            <span key={index} className="px-1.5 py-0.5 text-[10px] bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
              {lang}
            </span>
          ))}
          {[...profile.skills.frontend.frameworks, ...profile.skills.frontend.styles].slice(0, 4).map((tech, index) => (
            <span key={index} className="px-1.5 py-0.5 text-[10px] bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
              {tech}
            </span>
          ))}
          {[...profile.skills.backend.frameworks, ...profile.skills.backend.databases].slice(0, 4).map((tech, index) => (
            <span key={index} className="px-1.5 py-0.5 text-[10px] bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
              {tech}
            </span>
          ))}
          {[...profile.skills.devOps].slice(0, 3).map((tech, index) => (
            <span key={index} className="px-1.5 py-0.5 text-[10px] bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
