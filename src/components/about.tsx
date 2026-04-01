"use client"
import React from "react";
import Typewriter from 'typewriter-effect';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import profile from "@/data/profile";

export default function About() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Image
          src="/images/profile.webp"
          width={80}
          height={80}
          alt="Profile Picture"
          className="rounded-full shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {profile.name}
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

      <div className="flex gap-2">
        <Link 
          href={profile.socialLinks.linkedin}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="w-5 h-5 text-gray-900 dark:text-white" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">LinkedIn</span>
        </Link>
        <Link 
          href={profile.socialLinks.twitter}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="w-5 h-5 text-gray-900 dark:text-white" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Twitter</span>
        </Link>
        <Link 
          href={profile.socialLinks.github}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="w-5 h-5 text-gray-900 dark:text-white" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">GitHub</span>
        </Link>
      </div>

      <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>📍 Spain</span>
        <span>💼 Available for projects</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-300">About Me</h3>
        {profile.description.map((paragraph, index) => (
          <p key={index} className="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-300">Experience</h3>
          {profile.workExperience.map((exp, index) => (
            <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-300">{exp.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{exp.company}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{exp.period}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-300">Education</h3>
          {profile.education.slice(0, 3).map((edu, index) => (
            <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-300">{edu.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-300">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {profile.skills.programmingLanguages.map((lang, index) => (
            <span key={index} className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
              {lang}
            </span>
          ))}
          {[...profile.skills.frontend.frameworks, ...profile.skills.frontend.styles].map((tech, index) => (
            <span key={index} className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
              {tech}
            </span>
          ))}
          {[...profile.skills.backend.frameworks, ...profile.skills.backend.databases].map((tech, index) => (
            <span key={index} className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
              {tech}
            </span>
          ))}
          {[...profile.skills.devOps].slice(0, 6).map((tech, index) => (
            <span key={index} className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
