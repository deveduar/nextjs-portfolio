"use client";
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from 'react';

interface ProjectListSimpleProps {
  projects: {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
    detailedDescription: string;
    technologies: string[];
    links: { href: string; label: string; svg: JSX.Element }[];
    gallery: string[];
    features?: string[];
  }[];
  variant?: 'detailed' | 'simple';
  onNext?: () => void;
  onPrev?: () => void;
}

const ProjectListSimple: React.FC<ProjectListSimpleProps> = ({ projects, variant = 'detailed', onNext, onPrev }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    onNext?.();
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    onPrev?.();
  };

  if (variant === 'simple') {
    return (
      <div className="p-3 md:p-0">
        <h4 className="text-sm text-gray-900 dark:text-gray-300 font-bold">Recent Projects</h4>
        <div className="flex flex-col">
          {projects.map((project) => (
            <Link 
              key={project.id}
              href={`/projects/${project.id}`}
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200
               text-gray-500 dark:text-gray-400"
            >
              <p className="text-sm">{project.title}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="relative flex items-center rounded-xl w-full bg-white dark:bg-gray-800 hover:scale-[1.02] transition-all duration-300 ">
      {/* Botón izquierdo */}
      <button 
        onClick={prevProject}
        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors mx-4"
      >
        <FaArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Card principal */}
      <div className="w-full py-6 ">
        <div className="flex flex-col h-full">
          <div className="flex-1 ">
            <div className="">
              
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {currentProject.title}
              </h4>
              <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2">
              {currentProject.technologies.slice(0, 3).map((tech) => (
                <span 
                  key={tech}
                  className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {currentProject.description}
              </p>
            </div>

            <div className="flex justify-between items-center ">
              <div className=" flex flex-row gap-3 text-black dark:text-white">
                {currentProject.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={` rounded-xl  items-center gap-3 flex flex-row py-2
                      ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live')
                        ? '' 
                        : ''}
                      ${index === 0 ? 'row-span-2' : ''}
                      ${index === 1 ? 'col-span-1' : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={`  text-sm ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                      {link.svg}
                    </div>
                    <span className="text-sm font-medium  dark:text-white whitespace-nowrap">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

  
        </div>
      </div>
            {/* Botón derecho */}
            <button 
        onClick={nextProject}
        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors mx-4"
      >
        <FaArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default ProjectListSimple;