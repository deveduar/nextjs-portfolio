"use client";
import Link from 'next/link';
import { IoLink } from "react-icons/io5";
import { slugify } from '@/lib/slug';

interface ProjectTableProps {
  projects: Array<{
    id: number;
    title: string;
    description: string;
    technologies: string[];
    links: Array<{ href: string; label: string }>;
    date?: string;
  }>;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Project</th>
            <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 hidden md:table-cell">Description</th>
            <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Technologies</th>
            <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 hidden sm:table-cell">Date</th>
            <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Links</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr 
              key={project.id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
            >
              <td className="py-3 px-4">
                <Link
                  href={`/project/${slugify(project.title)}`}
                  className="font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {project.title}
                </Link>
              </td>
              <td className="py-3 px-4 text-slate-500 dark:text-slate-400 hidden md:table-cell max-w-[300px]">
                <span className="line-clamp-1">{project.description}</span>
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 dark:bg-gray-800 text-slate-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-slate-500 dark:text-slate-400 hidden sm:table-cell text-xs">
                {project.date ? new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end gap-2">
                  {project.links.slice(0, 2).map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                      <IoLink size={14} />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;