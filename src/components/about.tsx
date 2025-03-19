"use client"
import React, { useEffect, useRef } from "react";
import StackIcon from "tech-stack-icons";
import Image from "next/image";
import { FaTrophy, FaCode, FaUsers } from "react-icons/fa";
import Typewriter from 'typewriter-effect';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

interface AboutProps {
  technologies: string[];
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

const About: React.FC<AboutProps> = ({ technologies, profile }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let animationFrameId: number;

    if (marquee) {
      const scrollMarquee = () => {
        if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
          marquee.scrollLeft = 0;
        } else {
          marquee.scrollLeft += 1;
        }
        animationFrameId = requestAnimationFrame(scrollMarquee);
      };

      animationFrameId = requestAnimationFrame(scrollMarquee);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (

    <div className="w-full grid grid-cols-4 md:grid-cols-6 gap-4" data-aos="zoom-in">
      {/* Panel Principal */}
      <div className="col-span-4 md:col-span-6 bg-white dark:bg-gray-800 rounded-xl p-6">
        <div className="flex flex-col gap-4">

        <div className="flex flex-row gap-4 ">
            <div className="flex  flex-row  gap-4 w-full">
              <div className="flex items-center  gap-4">
                <Image
                  src="/images/profile.jpeg"
                  width={80}
                  height={80}
                  alt="Profile Picture"
                  className="rounded-full shadow-lg"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{profile.specialty}</p>
                </div>
              </div>
           </div>
          <div className=" rounded-full lg:rounded-s-full  marquee relative overflow-hidden whitespace-nowrap w-16 h-16 sm:w-full sm:h-full" ref={marqueeRef}>
              <div className="inline-flex items-center animate-marquee  ">
                <StackIcon name="nextjs" className="w-16 h-16 md:w-20 md:h-20 mx-2 dark:invert" />
                <StackIcon name="reactjs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="typescript" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="js" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="css3" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="tailwindcss" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="sass" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="python" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="nodejs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="html5" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="github" className="w-16 h-16 md:w-20 md:h-20 mx-2 dark:invert" />
                <StackIcon name="mysql" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="postgresql" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="mongodb" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="vuejs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />

                {/* Duplicated icons for continuous effect */}
                <StackIcon name="nextjs" className="w-16 h-16 md:w-20 md:h-20 mx-2 dark:invert" />
                <StackIcon name="reactjs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="typescript" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="js" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="css3" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="tailwindcss" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="sass" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="python" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="nodejs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="html5" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="github" className="w-16 h-16 md:w-20 md:h-20 mx-2 dark:invert" />
                <StackIcon name="mysql" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="postgresql" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="mongodb" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
                <StackIcon name="vuejs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
              </div>
            </div>
          </div>



          <div className="space-y-2 text-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-300">My Resume</h3>
            {profile.description.map((paragraph, index) => (
              <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
                    {/* Social Links */}
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
          {/* Experience and Education section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Experience */}
              <div className="space-y-2">
                <h3 className="text-md font-bold mb-4 text-gray-900 dark:text-gray-300">Experience</h3>
                {profile.workExperience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-300">{exp.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{exp.company}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{exp.period}</p>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="space-y-2">
                <h3 className="text-md font-bold mb-4 text-gray-900 dark:text-gray-300">Education</h3>
                {profile.education.slice(0, 3).map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-300">{edu.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{edu.institution}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <h3 className="text-md font-bold mb-4 text-gray-900 dark:text-gray-300">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Programming Languages */}
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

              {/* Frontend */}
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

              {/* Backend */}
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

              {/* DevOps & Tools */}
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

  
          {/* <div className="flex gap-4">
            <Link
              href="/projectsView"
              className="bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-1.5 flex items-center justify-center gap-1 font-medium hover:scale-105 transition-all duration-300"
            >
              <span className="text-xs font-medium text-gray-900 dark:text-white">View Work</span>
            </Link>
            <Link 
              href="/contactView" 
              className="bg-blue-200 dark:bg-blue-900 rounded-xl px-3 py-1.5 flex items-center justify-center gap-1 font-medium hover:scale-105 transition-all duration-300"
            >
              <span className="text-xs font-medium text-gray-900 dark:text-white">Contact</span>
            </Link>
          </div> */}

          
        </div>
      </div>


      {/* Panel de Tecnologías */}
      {/* <div className="col-span-4 md:col-span-6 bg-white dark:bg-gray-800 rounded-xl p-6">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div> */}
        {/* Tech Stack Animated Section */}
      {/* <div className="col-span-4 md:col-span-6 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
        <div className="marquee relative overflow-hidden whitespace-nowrap py-6" ref={marqueeRef}>
            <div className="inline-flex items-center animate-marquee">
              <StackIcon name="nextjs" className="w-16 h-16 md:w-20 md:h-20 mx-4 dark:invert" />
              <StackIcon name="reactjs" className="w-16 h-16 md:w-20 md:h-20 mx-4 " />
              <StackIcon name="typescript" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="js" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="css3" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="tailwindcss" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="sass" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="python" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="nodejs" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="html5" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="github" className="w-16 h-16 md:w-20 md:h-20 mx-4 dark:invert" />
              <StackIcon name="mysql" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="postgresql" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="mongodb" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="vuejs" className="w-16 h-16 md:w-20 md:h-20 mx-4" />




              <StackIcon name="nextjs" className="w-16 h-16 md:w-20 md:h-20 mx-4 dark:invert" />
              <StackIcon name="reactjs" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="typescript" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="js" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="css3" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="tailwindcss" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="sass" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="python" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="nodejs" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="html5" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="github" className="w-16 h-16 md:w-20 md:h-20 mx-4 dark:invert" />
              <StackIcon name="mysql" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="postgresql" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="mongodb" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
              <StackIcon name="vuejs" className="w-16 h-16 md:w-20 md:h-20 mx-4" />
            </div>
          </div>
      </div> */}
      </div>
  );
};

export default About;
