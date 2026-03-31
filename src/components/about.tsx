"use client"
import React from "react";
import { FaTrophy, FaCode, FaUsers } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import ProfileHeader from "./profileHeader";

interface AboutProps {
  profile: {
    name: string;
    specialty: string;
    description: string[];
    workExperience: Array<{
      title: string;
      company: string;
      period: string;
      responsibilities?: string[];
    }>;
    education: Array<{
      title: string;
      institution: string;
      year: number;
    }>;
    skills: {
      programmingLanguages: string[];
      frontend: {
        frameworks: string[];
        styles: string[];
        uiux: string[];
        tools: string[];
      };
      backend: {
        frameworks: string[];
        apis: string[];
        databases: string[];
        others: string[];
      };
      devOps: string[];
      testing: string[];
      methodologies: string[];
      architectures: string[];
    };
    languages: string[];
    socialLinks: {
      linkedin: string;
      twitter: string;
      github: string;
    };
  };
}

const About: React.FC<AboutProps> = ({ profile }) => {

  return (
    <div className="flex flex-col gap-4">
      <ProfileHeader name={profile.name} specialty={profile.specialty} />

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-300">My Resume</h3>
          {profile.description.map((paragraph, index) => (
            <p key={index} className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>
              <div className="flex gap-2 flex-row justify-start items-center">
        <Link 
          href={profile.socialLinks.linkedin}
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
          href={profile.socialLinks.twitter}
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
          href={profile.socialLinks.github}
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
      <div className="flex gap-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">📍 Spain</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">💼 Available for projects</span>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-300">Experience</h3>
            {profile.workExperience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-300">{exp.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{exp.company}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{exp.period}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
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
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-300">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-300">Programming</h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills.programmingLanguages.map((lang, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-300">Frontend</h4>
            <div className="flex flex-wrap gap-2">
              {[...profile.skills.frontend.frameworks, ...profile.skills.frontend.styles].map((tech, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-300">Backend</h4>
            <div className="flex flex-wrap gap-2">
              {[...profile.skills.backend.frameworks, ...profile.skills.backend.databases].map((tech, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-300">DevOps & Tools</h4>
            <div className="flex flex-wrap gap-2">
              {[...profile.skills.devOps, ...profile.skills.methodologies].slice(0, 8).map((tech, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-700 dark:text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
