"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import Gallery from "@/components/gallery";
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import Badge from "@/components/badge";

interface ProjectDetailsProps {
  project: {
    id: number;
    repoId: string;
    title: string;
    description: string;
    detailedDescription: string;
    imageSrc: string;
    technologies: string[];
    links: {
      href: string;
      label: string;
    }[];
    gallery?: string[]; 
    features?: string[];
    readmeContent?: {
      [key: string]: any;
    };
  };
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {

  const demoLink = project.links.find(link => 
    link.label.toLowerCase().includes('demo') || 
    link.label.toLowerCase().includes('live')
  );

  return (
  <div className="">
    {/* image */}
    <div className=" rounded-t-xl overflow-hidden relative">
      <Image
        width={1200}
        height={800}
        src={project.imageSrc}
        alt="Project"
        className="object-cover h-40 w-30"
      />
      {demoLink && (
        <Badge label={demoLink.label} href={demoLink.href} />
      )}
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
      <div className="flex items-center gap-4 flex-wrap">
        {project.links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={`rounded-xl items-center gap-1 flex flex-row py-1 ${
              link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live')
                ? 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500'
                : 'hover:text-gray-800 dark:hover:text-gray-400 transition-all duration-3000'
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex-shrink-0 text-xs">
              {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') 
                ? <BiLinkExternal className="w-4 h-4" />
                : <FaGithub className="w-4 h-4" />
              }
            </div>
            <span className="text-xs font-medium whitespace-nowrap">{link.label}</span>
          </Link>
        ))}
      </div>
  
  {/* {project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live')) && (
      <Link
        href={project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))?.href || ''}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 flex items-center gap-1 "
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="text-xs scale-75 font-medium">
        <BiLinkExternal className="w-4 h-4" />
      </div>

        <span className="text-xs font-medium">{project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))?.label}</span>
      </Link>
    )} */}
      </div>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.detailedDescription}</p>
      <ul className="list-disc leading-relaxed list-inside space-y-2 ">
        {project.features?.map((feature, index) => (
          <li key={index} className="leading-relaxed text-base text-gray-600 dark:text-gray-300">{feature}</li>
        ))}
      </ul>
    
      {project.gallery && <Gallery images={project.gallery} />}

    </div>
  </div>
  );
};

export default ProjectDetails;
