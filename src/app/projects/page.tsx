"use client";
import { useState } from 'react';
import ProjectList from "@/components/projectList";
import Breadcrumb from '@/components/breadcrumb';
import { useReadmes } from '@/hooks/useReadmes';
import SearchInput from "@/components/searchInput";

export default function ProjectsView() {

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

  return (
    <section 
      id="projects" 
      className="flex flex-col rounded-xl "
      
    >
          {/* <h2 className="text-3xl font-bold text-gray-900 dark:text-white px-4 py-6" data-aos="fade-right">
        Projects
    </h2> */}
     <Breadcrumb  />
     <div className='flex flex-col'>
        <SearchInput 
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <ProjectList projects={filteredProjects} />
      </div>
    </section>
  );
}