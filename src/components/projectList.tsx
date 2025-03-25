"use client";

import React, { useState } from 'react'
import Card from "@/components/card";
import { IoSearchOutline } from "react-icons/io5";
import { useReadmes } from '@/hooks/useReadmes';
import SearchInput from "@/components/searchInput";

const ProjectList: React.FC = () => {

  const { readmes, loading, error } = useReadmes();
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading projects: {error}</div>;
  }

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const filteredProjects = readmes.filter(project => {
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
      <SearchInput 
        value={searchTerm}
        onChange={setSearchTerm}
      />
    <div className="w-full flex flex-wrap gap-4 md:gap-4 pt-4 -mb-12 sm:-mb-12 md:pb-12" data-aos="fade-up">
        {filteredProjects.slice().map((project) => (
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