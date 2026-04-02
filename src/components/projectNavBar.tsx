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
    <div className="sticky bottom-0 z-20 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between px-3 py-2 max-w-7xl mx-auto">
        <Link
          href={`/project/${slugify(prevProject.title)}`}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
        >
          <IoArrowBack size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline truncate max-w-[120px]">{prevProject.title}</span>
        </Link>
        
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {currentIndex + 1} / {sortedProjects.length}
        </span>
        
        <Link
          href={`/project/${slugify(nextProject.title)}`}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
        >
          <span className="hidden sm:inline truncate max-w-[120px]">{nextProject.title}</span>
          <IoArrowForward size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectNavBar;