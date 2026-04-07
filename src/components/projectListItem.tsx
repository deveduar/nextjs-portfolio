"use client";
import Link from 'next/link';
import { IoChevronForward } from "react-icons/io5";
import { slugify } from '@/lib/slug';

interface ProjectListItemProps {
  project: {
    id: number;
    title: string;
    description: string;
    imageSrc?: string;
    technologies: string[];
    links?: Array<{ href: string; label: string }>;
  };
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project }) => {
  const demoLink = project.links?.find(link => 
    link.label.toLowerCase().includes('demo') || 
    link.label.toLowerCase().includes('live')
  );

  return (
    <Link
      href={`/project/${slugify(project.title)}`}
      className="block group"
    >
      <div className="rounded-xl border border-border/70 bg-surface-muted p-3 transition-all hover:border-accent/45">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h5 className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
              {project.title}
            </h5>
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="rounded bg-surface-alt px-2 py-1 text-[10px] text-muted-foreground font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="rounded bg-surface-alt px-2 py-1 text-[10px] text-muted-foreground/70 font-medium">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {demoLink && (
              <span className="text-[10px] text-accent font-medium">Live</span>
            )}
            <IoChevronForward size={16} className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectListItem;
