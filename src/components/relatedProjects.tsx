"use client";
import Link from 'next/link';
import { IoChevronForward } from "react-icons/io5";

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
      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
        Related Projects
      </h4>
      <div className="space-y-2 border-l-2 border-slate-200 dark:border-slate-700 pl-4">
        {displayProjects.map((project) => (
          <Link
            key={project.id}
            href={`/project/${project.id}`}
            className="block group"
          >
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h5 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-1.5 py-0.5 text-[10px] rounded bg-slate-200 dark:bg-gray-700 text-slate-600 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded bg-slate-200 dark:bg-gray-700 text-slate-500 dark:text-slate-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <IoChevronForward size={16} className="text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 shrink-0 mt-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;