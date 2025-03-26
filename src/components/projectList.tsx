"use client";

import React, { useState } from 'react'
import Card from "@/components/card";
import { IoSearchOutline } from "react-icons/io5";
import { useReadmes } from '@/hooks/useReadmes';
import SearchInput from "@/components/searchInput";

interface ProjectListProps {
  projects: Array<{
    id: number;
    title: string;
    description: string;
    detailedDescription: string;
    imageSrc: string;
    links: Array<{ href: string; label: string }>;
    technologies: string[];
  }>;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {





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
    <div className="w-full flex flex-wrap gap-4 md:gap-4 pt-4 -mb-12 sm:-mb-12 md:pb-12" data-aos="fade-up">
    {projects.map((project) => (
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
  );
};

export default ProjectList;