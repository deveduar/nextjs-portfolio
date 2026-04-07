"use client";
import Link from 'next/link';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
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
  const currentId = project.id;

  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
  const currentIndex = sortedProjects.findIndex(p => p.id === currentId);
  
  const prevProject = currentIndex > 0 ? sortedProjects[currentIndex - 1] : sortedProjects[sortedProjects.length - 1];
  const nextProject = currentIndex < sortedProjects.length - 1 ? sortedProjects[currentIndex + 1] : sortedProjects[0];

  return (
    <div className="sticky bottom-0 z-20 bg-[var(--color-surface)]/95 backdrop-blur-md border-t border-[var(--color-border)]/50">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <Link
          href={`/project/${slugify(prevProject.title)}`}
          className="flex items-center gap-3 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] transition-colors duration-300 group"
        >
          <IoArrowBack size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="hidden sm:inline truncate max-w-[150px]">{prevProject.title}</span>
        </Link>
        
        <span className="text-xs text-[var(--color-muted-foreground)]/60 font-mono">
          {currentIndex + 1} / {sortedProjects.length}
        </span>
        
        <Link
          href={`/project/${slugify(nextProject.title)}`}
          className="flex items-center gap-3 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] transition-colors duration-300 group"
        >
          <span className="hidden sm:inline truncate max-w-[150px]">{nextProject.title}</span>
          <IoArrowForward size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectNavBar;