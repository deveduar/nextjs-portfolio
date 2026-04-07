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
      <div className="rounded-lg border border-[var(--color-border)]/70 bg-[var(--color-surface)] p-2 transition-colors hover:bg-[var(--color-surface-alt)]">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h5 className="line-clamp-1 text-sm font-semibold text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]">
              {project.title}
            </h5>
            <p className="mt-0.5 line-clamp-1 text-xs text-[var(--color-muted-foreground)]">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="rounded bg-[var(--color-surface-alt)] px-1 py-0.5 text-[10px] text-[var(--color-muted-foreground)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <IoChevronForward size={14} className="mt-0.5 shrink-0 text-[var(--color-muted-foreground)] transition-colors group-hover:text-[var(--color-accent)]" />
        </div>
      </div>
    </Link>
  );
};

export default RecentProjectItem;
