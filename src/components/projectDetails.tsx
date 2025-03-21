"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import Gallery from "@/components/gallery";
import ProjectNavigation from '@/components/projectNavigation';
import { projects } from "@/data/projects";

interface ProjectDetailsProps {
  project: {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
    detailedDescription: string;
    technologies: string[];
    links: { href: string; label: string; svg: JSX.Element }[];
    gallery: string[]; 
    features?: string[]; 
  };
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {

  return (
    <div className=" text-black rounded-xl dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Panel 1 Información Principal - 2 columnas en md */}
        <div className="md:col-span-2 lg:col-span-3  bg-white dark:bg-gray-800  rounded-xl ">
          {/* image */}
          <div className=" rounded-t-xl overflow-hidden ">
            <Image
              width={1200}
              height={800}
              src={project.imageSrc}
              alt="Project"
              className="object-cover h-40 w-30"
            />
          </div>
          {/* content */}
          <div className="p-6 space-y-4">
            <div className='flex flex-row justify-between'>
            <h2 className="text-2xl font-bold">{project.title}</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <div key={index} className="flex gap-2">
                  <span className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{tech}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex flex-wrap gap-1">
          {project.links
            .filter(link => !link.label.toLowerCase().includes('demo') && !link.label.toLowerCase().includes('live'))
        
            .map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="rounded-xl items-center gap-1 flex flex-row py-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-xs scale-75">
                  {link.svg}
                </div>
                <span className="text-xs font-medium whitespace-nowrap">{link.label}</span>
              </Link>
            ))}
        </div>
        
        {project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live')) && (
            <Link
              href={project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))?.href || ''}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 flex items-center gap-1 "
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-xs scale-75 font-medium">
              {project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))?.svg}
              </div>
  
              <span className="text-xs font-medium">{project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))?.label}</span>
            </Link>
          )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.detailedDescription}</p>
            <ul className="list-disc leading-relaxed list-inside space-y-2 ">
              {project.features?.map((feature, index) => (
                <li key={index} className="leading-relaxed text-base text-gray-600 dark:text-gray-300">{feature}</li>
              ))}
            </ul>
         
          <Gallery images={project.gallery} />

          </div>
        </div>
        {/* Panel 2 Links - 1 columna */}
        <div className="md:col-span-1 lg:col-span-1 rounded-xl">
          {/* links 1 */}
        <ProjectNavigation currentId={project.id} projects={projects} variant="vertical" />
        {/* links 2 */}
        <div className="grid md:flex md:flex-col gap-4 mt-4 ">
            {project.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`p-4 rounded-xl hover:scale-105 mr-2transition-all duration-300 flex items-center gap-2 w-full 
                  ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live')
                    ? 'bg-blue-100 dark:bg-blue-900' 
                    : 'bg-white dark:bg-gray-800'}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`text-sm scale-125 flex-shrink-0 ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                  {link.svg}
                </div>
                <span className="text-sm font-medium dark:text-white truncate max-w-[150px]">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
        </div>
  
    </div>

    
  );
};

export default ProjectDetails;
