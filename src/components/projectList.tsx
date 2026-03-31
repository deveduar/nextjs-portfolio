"use client";

import React from 'react'
import Card from "@/components/card";
import { useReadmes } from '@/hooks/useReadmes';

interface ProjectListProps {
  projects?: Array<{
    id: number;
    title: string;
    description: string;
    detailedDescription: string;
    imageSrc: string;
    links: Array<{ href: string; label: string }>;
    technologies: string[];
  }>;
  searchFilter?: string;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, searchFilter = '' }) => {
  const { readmes, loading, error } = useReadmes();

  const normalizeText = (text: string) => 
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let displayProjects = projects || readmes;

  if (searchFilter.trim()) {
    displayProjects = readmes.filter(project => {
      const searchContent = normalizeText(`
        ${project.title} 
        ${project.description} 
        ${project.technologies.join(' ')}
      `);
      return searchContent.includes(normalizeText(searchFilter));
    });
  }

  if (loading) {
    return (
      <div className="w-full flex flex-wrap gap-4 md:gap-4 pt-4">
        {Array(3).fill(null).map((_, index) => (
          <div key={`placeholder-${index}`} className="grow basis-full min-w-[300px] max-w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(25%-1rem)] opacity-0" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading projects: {error}</div>;
  }

  const placeholders = Array(3).fill(null).map((_, index) => (
    <div key={`placeholder-${index}`} className="grow basis-full min-w-[300px] max-w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(25%-1rem)] opacity-0" />
  ));

  return (
    <div className="w-full flex flex-wrap gap-4 md:gap-4 pt-4 -mb-12 sm:-mb-12 md:pb-12" data-aos="fade-up">
      {displayProjects.map((project) => (
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