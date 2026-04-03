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
    <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="px-3 py-2 text-left font-semibold text-slate-900 dark:text-white">Project</th>
            <th className="px-3 py-2 text-left font-semibold text-slate-900 dark:text-white hidden md:table-cell">Description</th>
            <th className="px-3 py-2 text-left font-semibold text-slate-900 dark:text-white">Technologies</th>
            <th className="px-3 py-2 text-left font-semibold text-slate-900 dark:text-white hidden sm:table-cell">Date</th>
            <th className="px-3 py-2 text-right font-semibold text-slate-900 dark:text-white">Links</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr 
              key={project.id}
              className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <td className="px-3 py-2">
                <Link
                  href={`/project/${slugify(project.title)}`}
                  className="font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {project.title}
                </Link>
              </td>
              <td className="px-3 py-2 text-slate-500 dark:text-slate-400 hidden md:table-cell max-w-[300px]">
                <span className="line-clamp-1">{project.description}</span>
              </td>
              <td className="px-3 py-2">
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
              <td className="px-3 py-2 text-slate-500 dark:text-slate-400 hidden sm:table-cell text-xs">
                {project.date ? new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
              </td>
              <td className="px-3 py-2 text-right">
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
    );
  };

export default ProjectTable;