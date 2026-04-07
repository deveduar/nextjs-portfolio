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
      <div className="rounded-xl border border-border/70 bg-surface p-3 transition-colors hover:bg-surface-alt">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h5 className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
              {project.title}
            </h5>
            <p className="mt-1 line-clamp-1 text-xs text-muted">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="rounded bg-surface-alt px-1.5 py-0.5 text-[10px] text-muted"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="rounded bg-surface-alt px-1.5 py-0.5 text-[10px] text-muted/70">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
          <IoChevronForward size={16} className="mt-1 shrink-0 text-muted transition-colors group-hover:text-accent" />
        </div>
      </div>
    </Link>
  );
};

export default ProjectListItem;
