"use client";
import Link from 'next/link';
import { IoChevronForward } from "react-icons/io5";
import { slugify } from '@/lib/slug';

interface RelatedProjectsProps {
  projects: Array<{
    id: number;
    title: string;
    description: string;
    technologies: string[];
  }>;
  currentProjectId: number;
}

const RelatedProjects: React.FC<RelatedProjectsProps> = ({ projects, currentProjectId }) => {
  if (!projects || projects.length === 0) {
    return null;
  }

  const displayProjects = projects.filter(p => p.id !== currentProjectId).slice(0, 4);

  return (
    <section className="space-y-3">
      <h4 className="text-lg font-semibold text-[var(--color-foreground)]">
        Related Projects
      </h4>
      <div className="space-y-2 border-l-2 border-[var(--color-border)] pl-4">
        {displayProjects.map((project) => (
          <Link
            key={project.id}
            href={`/project/${slugify(project.title)}`}
            className="block group"
          >
            <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] hover:bg-[var(--color-accent)]/10 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h5 className="text-sm font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
                    {project.title}
                  </h5>
                  <p className="text-xs text-[var(--color-muted-foreground)] mt-1 line-clamp-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-1.5 py-0.5 text-[10px] rounded bg-[var(--color-surface)] text-[var(--color-muted-foreground)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded bg-[var(--color-surface)] text-[var(--color-muted-foreground)]/70">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <IoChevronForward size={16} className="text-[var(--color-muted-foreground)] group-hover:text-[var(--color-accent)] shrink-0 mt-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;