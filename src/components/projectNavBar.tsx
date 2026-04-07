"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoArrowBack, IoArrowForward, IoGridOutline } from "react-icons/io5";
import { slugify } from '@/lib/slug';

interface Project {
  id: number;
  title: string;
  date?: string;
}

interface ProjectNavBarProps {
  project: Project;
  projects: Project[];
}

const ProjectNavBar: React.FC<ProjectNavBarProps> = ({ 
  project, 
  projects,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentId = project.id;

  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
  const currentIndex = sortedProjects.findIndex(p => p.id === currentId);
  
  const prevProject = currentIndex > 0 ? sortedProjects[currentIndex - 1] : sortedProjects[sortedProjects.length - 1];
  const nextProject = currentIndex < sortedProjects.length - 1 ? sortedProjects[currentIndex + 1] : sortedProjects[0];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollable = documentHeight - windowHeight;
      
      if (scrollable > 0) {
        const progress = (scrollTop / scrollable) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 z-40 bg-transparent">
        <div 
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <div className="bg-surface/95 backdrop-blur-md border-t border-border/30 w-full">
        <div className="flex items-center justify-between px-3 py-2 max-w-full">
          <Link
            href={`/project/${slugify(prevProject.title)}`}
            className="flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors duration-300 group"
          >
            <IoArrowBack size={16} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
            <span className="hidden sm:inline truncate max-w-[120px]">{prevProject.title}</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link
              href="/projects"
              className="p-1.5 rounded-md text-muted hover:text-accent hover:bg-surface-alt transition-colors"
              title="Back to Projects"
            >
              <IoGridOutline size={14} />
            </Link>
            <span className="text-xs text-muted/60 font-mono px-2">
              {currentIndex + 1}/{sortedProjects.length}
            </span>
          </div>
          
          <Link
            href={`/project/${slugify(nextProject.title)}`}
            className="flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors duration-300 group"
          >
            <span className="hidden sm:inline truncate max-w-[120px]">{nextProject.title}</span>
            <IoArrowForward size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProjectNavBar;