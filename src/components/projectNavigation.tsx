import Link from 'next/link';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";

interface ProjectNavigationProps {
  currentId: number;
  projects: Array<{
    id: number;
    title: string;
  }>;
  variant?: 'horizontal' | 'vertical';
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentId, projects, variant = 'horizontal' }) => {
  const isVertical = variant === 'vertical';
  
  return (
    <div className={`flex w-full ${isVertical ? 'md:flex-col ' : 'justify-between'} items-center gap-4  text-black dark:text-white ${isVertical ? '' : ''}`}>
        <Link
        href={`/project/${currentId < projects.length ? currentId + 1 : 1}`}
        className={`flex items-center gap-2 hover:scale-105 transition-all duration-300 ${isVertical ? 'w-full justify-start bg-white dark:bg-gray-800 p-4 rounded-xl' : 'justify-end  p-4 rounded-xl min-w-40 max-w-50'}`}
      >
        <IoArrowBackCircleOutline size={20} />
        <span className={`text-sm font-medium truncate ${isVertical ? '' : 'min-w-32 max-w-40' }`}>
          {projects.find(p => p.id === (currentId < projects.length ? currentId + 1 : 1))?.title}
        </span>
      </Link>
      
      <Link
        href={`/project/${currentId > 1 ? currentId - 1 : projects.length}`}
        className={`flex items-center gap-2 hover:scale-105 transition-all duration-300 ${isVertical ? 'w-full justify-start bg-white dark:bg-gray-800 p-4 rounded-xl' : ' justify-end  p-4 rounded-xl min-w-40 max-w-50'}`}
      >
        <span className={`text-sm font-medium truncate ${isVertical ? '' : 'min-w-32 max-w-40 text-right' }`}>
          {projects.find(p => p.id === (currentId > 1 ? currentId - 1 : projects.length))?.title}
        </span>
        <IoArrowForwardCircleOutline size={20} />

      </Link>
    </div>
  );
};

export default ProjectNavigation;