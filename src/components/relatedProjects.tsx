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
      <h4 className="text-lg font-semibold text-foreground">
        Related Projects
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displayProjects.map((project) => (
          <Link
            key={project.id}
            href={`/project/${slugify(project.title)}`}
            className="block group"
          >
            <div className="p-4 rounded-xl border border-border bg-surface hover:bg-surface-alt hover:border-accent/30 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h5 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h5>
                  <p className="text-xs text-muted mt-1 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-1.5 py-0.5 text-[10px] rounded bg-surface-alt text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded bg-surface-alt text-muted/70">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <IoChevronForward size={16} className="text-muted group-hover:text-accent shrink-0 mt-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;