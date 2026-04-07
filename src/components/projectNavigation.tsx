import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline, IoGridOutline } from "react-icons/io5";

interface ProjectNavigationProps {
  currentId: number;
  projects: Array<{
    id: number;
    title: string;
  }>;
  variant?: 'horizontal' | 'vertical';
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentId, projects, variant = 'horizontal' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const isVertical = variant === 'vertical';

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
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
        <div 
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className={`flex w-full ${isVertical ? 'md:flex-col ' : 'justify-between'} items-center gap-4 text-foreground ${isVertical ? '' : ''}`}>
        <Link
          href={`/project/${currentId < projects.length ? currentId + 1 : 1}`}
          className={`flex items-center gap-2 hover:scale-105 transition-all duration-300 ${isVertical ? 'w-full justify-start bg-surface/50 backdrop-blur-md border border-border/30 rounded-xl' : 'justify-end p-2 rounded-xl min-w-40 max-w-50 bg-surface/50 backdrop-blur-md border border-border/30'}`}
        >
          <IoArrowBackCircleOutline size={18} className="text-muted hover:text-accent transition-colors" />
          <span className={`text-sm font-medium truncate ${isVertical ? '' : 'min-w-32 max-w-40' }`}>
            {projects.find(p => p.id === (currentId < projects.length ? currentId + 1 : 1))?.title}
          </span>
        </Link>

        <Link
          href="/projects"
          className="p-2 rounded-lg text-muted hover:text-accent hover:bg-surface-alt transition-colors"
          title="Back to Projects"
        >
          <IoGridOutline size={16} />
        </Link>
        
        <Link
          href={`/project/${currentId > 1 ? currentId - 1 : projects.length}`}
          className={`flex items-center gap-2 hover:scale-105 transition-all duration-300 ${isVertical ? 'w-full justify-start bg-surface/50 backdrop-blur-md border border-border/30 rounded-xl' : ' justify-end p-2 rounded-xl min-w-40 max-w-50 bg-surface/50 backdrop-blur-md border border-border/30'}`}
        >
          <span className={`text-sm font-medium truncate ${isVertical ? '' : 'min-w-32 max-w-40 text-right' }`}>
            {projects.find(p => p.id === (currentId > 1 ? currentId - 1 : projects.length))?.title}
          </span>
          <IoArrowForwardCircleOutline size={18} className="text-muted hover:text-accent transition-colors" />
        </Link>
      </div>
    </>
  );
};

export default ProjectNavigation;