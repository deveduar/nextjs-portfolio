"use client";
import Link from 'next/link';
import { IoChevronForward, IoListOutline, IoGridOutline, IoTabletPortraitOutline } from "react-icons/io5";
import { slugify } from '@/lib/slug';

interface ProjectListItemProps {
  project: {
    id: number;
    title: string;
    description: string;
    technologies: string[];
  };
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project }) => {
  return (
    <Link
      href={`/project/${slugify(project.title)}`}
      className="block group"
    >
      <div className="p-3 rounded-xl bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200/50 dark:border-gray-800 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h5 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 dark:bg-gray-800 text-slate-400 dark:text-slate-500">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
          <IoChevronForward size={16} className="text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 shrink-0 mt-1" />
        </div>
      </div>
    </Link>
  );
};

export default ProjectListItem;