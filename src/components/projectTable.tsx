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
          <tr className="border-b border-border/30">
            <th className="px-4 py-3 text-left font-semibold text-foreground border-r border-border/20">Project</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground hidden md:table-cell border-r border-border/20">Description</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground border-r border-border/20">Technologies</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground hidden sm:table-cell border-r border-border/20">Date</th>
            <th className="px-4 py-3 text-right font-semibold text-foreground">Links</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr 
              key={project.id}
              className="border-b border-border/20 hover:bg-surface/40 transition-colors"
            >
              <td className="px-4 py-3 border-r border-border/10">
                <Link
                  href={`/project/${slugify(project.title)}`}
                  className="font-medium text-foreground hover:text-accent transition-colors"
                >
                  {project.title}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell max-w-[300px] border-r border-border/10">
                <span className="line-clamp-1">{project.description}</span>
              </td>
              <td className="px-4 py-3 border-r border-border/10">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-[10px] rounded bg-surface-alt text-muted-foreground font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-[10px] rounded bg-surface-alt text-muted-foreground/70 font-medium">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell text-xs border-r border-border/10">
                {project.date ? new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  {project.links.slice(0, 2).map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded hover:bg-surface-alt text-muted-foreground hover:text-foreground transition-colors"
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