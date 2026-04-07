"use client";

import React, { useState, useMemo } from 'react'
import Card from "@/components/card";
import { useReadmes } from '@/hooks/useReadmes';
import ViewSwitcher from './viewSwitcher';
import SortDropdown from './sortDropdown';
import ProjectListItem from './projectListItem';
import ProjectTable from './projectTable';
import { IoSearchOutline, IoClose } from "react-icons/io5";

type ViewMode = 'list' | 'grid' | 'table';
type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';

interface ProjectListProps {
  searchFilter?: string;
}

const ProjectList: React.FC<ProjectListProps> = ({ searchFilter = '' }) => {
  const { readmes, loading, error } = useReadmes();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [localSearch, setLocalSearch] = useState('');

  const activeSearch = searchFilter || localSearch;

  const normalizeText = (text: string) => 
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const filteredAndSortedProjects = useMemo(() => {
    let projects = readmes;

    if (activeSearch.trim()) {
      projects = readmes.filter(project => {
        const searchContent = normalizeText(`
          ${project.title} 
          ${project.description} 
          ${project.technologies.join(' ')}
        `);
        return searchContent.includes(normalizeText(activeSearch));
      });
    }

    return [...projects].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        default:
          return 0;
      }
    });
  }, [readmes, activeSearch, sortOption]);

  const handleClearSearch = () => {
    setLocalSearch('');
  };

  if (loading) {
    return (
      <div className="w-full flex flex-wrap gap-4 md:gap-4 pt-4">
        {Array(3).fill(null).map((_, index) => (
          <div key={`placeholder-${index}`} className="grow basis-full min-w-[300px] max-w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(25%-1rem)] bg-[var(--color-surface)]/10" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-[var(--color-danger)]">Error loading projects: {error}</div>;
  }

  const placeholders = Array(3).fill(null).map((_, index) => (
    <div key={`placeholder-${index}`} className="grow basis-full min-w-[300px] max-w-full md:basis-[calc(50%-1rem)] lg:basis-[calc(25%-1rem)] bg-[var(--color-surface)]/10" />
  ));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]/50">
        <div className="relative w-full sm:max-w-xs">
          <IoSearchOutline className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]" size={14} />
          <input
            type="text"
            placeholder="Search projects..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 rounded-lg bg-[var(--color-surface)] 
              border border-[var(--color-border)]/30
              text-[var(--color-foreground)] text-xs
              placeholder:text-[var(--color-muted-foreground)]
              focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30
              transition-all duration-300"
          />
          {localSearch && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              <IoClose size={12} />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-sm text-[var(--color-muted-foreground)] whitespace-nowrap">
            {filteredAndSortedProjects.length} project{filteredAndSortedProjects.length !== 1 ? 's' : ''}
          </span>
          <SortDropdown 
            currentSort={sortOption} 
            onSortChange={setSortOption} 
          />
          <ViewSwitcher 
            currentView={viewMode} 
            onViewChange={setViewMode} 
          />
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="space-y-2 ">
          {filteredAndSortedProjects.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="w-full flex flex-wrap gap-4 md:gap-4 -mb-12 sm:-mb-12 md:pb-12">
          {filteredAndSortedProjects.map((project) => (
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
      )}

      {viewMode === 'table' && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-x-auto custom-scrollbar">
          <div className="min-w-full">
            <ProjectTable projects={filteredAndSortedProjects} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;