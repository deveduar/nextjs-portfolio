"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import Gallery from "@/components/gallery";
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import Badge from "@/components/badge";
import TechTags from "@/components/techTags";
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
    <div className="rounded-t-xl overflow-hidden relative">
          <Image
            width={1200}
            height={800}
            src={project.imageSrc}
            alt="Project"
            className="object-cover h-36 "
          />
          <div className="absolute inset-0 
            bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90
            hover:bg-opacity-90 dark:hover:bg-opacity-90 
            transition-all duration-300">
            {/* Badge en esquina superior derecha */}
            {demoLink && (
              <div className="absolute top-2 right-2">
                <Badge label={demoLink.label} href={demoLink.href} />
              </div>
            )}
            {/* Contenido en la parte inferior */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{project.title}</h2>
              <TechTags 
                technologies={project.technologies} 
                limit={6}
                colorful={true}
                overlayStyle={true}
                className='flex-wrap'
              />
            </div>
          </div>
        </div>
    {/* content */}
    <div className="p-6 space-y-4">
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
