"use client";

import React, { useState } from 'react'
import Card from "@/components/card";
import { projects } from "@/data/projects";
import { IoSearchOutline } from "react-icons/io5";

const ProjectList: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const filteredProjects = projects.filter(project => {
    const searchContent = normalizeText(`
      ${project.title} 
      ${project.description} 
      ${project.technologies.join(' ')}
    `);
    
    return searchContent.includes(normalizeText(searchTerm));
  });

  const placeholders = Array(3).fill(null).map((_, index) => (
    <div key={`placeholder-${index}`} className=" grow 
    basis-full min-w-[300px] max-w-full 
    
    md:basis-[calc(50%-1rem)] md:min-w-[calc(50%-1rem)] md:max-w-[calc(50%-1rem)]
    
    lg:basis-[calc(25%-1rem)] lg:min-w-[calc(25%-1rem)] lg:max-w-[calc(40%-1rem)]
    
    xl:basis-[calc(25%-1rem)] xl:min-w-[calc(25%-1rem)] xl:max-w-[calc(40%-1rem)]
    
    2xl:basis-[calc(25%-1rem)] 2xl:min-w-[calc(20%-1rem)] 2xl:max-w-[calc(40%-1rem)]  
    opacity-0" />
  ));

  return (
    <div className='flex flex-col'>
    <div className="relative w-full max-w-xl  ">
      <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        placeholder="Search projects by title, description or technology..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
          transition-all duration-300"
      />
    </div>
    <div className="w-full flex flex-wrap gap-4 md:gap-4 pt-4 -mb-12 sm:-mb-12 md:pb-12">
        {filteredProjects.slice().reverse().map((project) => (
          <Card
            id={project.id}
            key={project.id}
            title={project.title}
            description={project.description}
            imageSrc={project.imageSrc}
            detailedDescription={project.detailedDescription}
            links={project.links}
            technologies={project.technologies}
          />
        ))}
        {placeholders}
    </div>
    </div>
  );
};

export default ProjectList;