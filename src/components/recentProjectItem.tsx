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
      <div className="rounded-lg border border-border/70 bg-surface p-2 transition-colors hover:bg-surface-alt">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h5 className="line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
              {project.title}
            </h5>
            <p className="mt-0.5 line-clamp-1 text-xs text-muted">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="rounded bg-surface-alt px-1 py-0.5 text-[10px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <IoChevronForward size={14} className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-accent" />
        </div>
      </div>
    </Link>
  );
};

export default RecentProjectItem;
