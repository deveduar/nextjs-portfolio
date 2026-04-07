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
          <tr className="border-b border-[var(--color-border)]">
            <th className="px-3 py-2 text-left font-semibold text-[var(--color-foreground)]">Project</th>
            <th className="px-3 py-2 text-left font-semibold text-[var(--color-foreground)] hidden md:table-cell">Description</th>
            <th className="px-3 py-2 text-left font-semibold text-[var(--color-foreground)]">Technologies</th>
            <th className="px-3 py-2 text-left font-semibold text-[var(--color-foreground)] hidden sm:table-cell">Date</th>
            <th className="px-3 py-2 text-right font-semibold text-[var(--color-foreground)]">Links</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr 
              key={project.id}
              className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-surface)]/50 transition-colors"
            >
              <td className="px-3 py-2">
                <Link
                  href={`/project/${slugify(project.title)}`}
                  className="font-medium text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {project.title}
                </Link>
              </td>
              <td className="px-3 py-2 text-[var(--color-muted-foreground)] hidden md:table-cell max-w-[300px]">
                <span className="line-clamp-1">{project.description}</span>
              </td>
              <td className="px-3 py-2">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 text-[10px] rounded bg-[var(--color-surface-alt)] text-[var(--color-muted-foreground)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] rounded bg-[var(--color-surface-alt)] text-[var(--color-muted-foreground)]/70">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-3 py-2 text-[var(--color-muted-foreground)] hidden sm:table-cell text-xs">
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
                      className="p-1 rounded hover:bg-[var(--color-surface-alt)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
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