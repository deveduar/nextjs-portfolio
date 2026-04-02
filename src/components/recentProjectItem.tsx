"use client";
import Link from 'next/link';
import { IoChevronForward } from "react-icons/io5";
import { slugify } from '@/lib/slug';

interface RecentProjectItemProps {
  project: {
    id: number;
    title: string;
    description: string;
    technologies: string[];
  };
}

const RecentProjectItem: React.FC<RecentProjectItemProps> = ({ project }) => {
  return (
    <Link
      href={`/project/${slugify(project.title)}`}
      className="block group"
    >
      <div className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200/50 dark:border-gray-800 transition-colors">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h5 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
              {project.title}
            </h5>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-1 py-0.5 text-[10px] rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <IoChevronForward size={14} className="text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 shrink-0 mt-0.5" />
        </div>
      </div>
    </Link>
  );
};

export default RecentProjectItem;