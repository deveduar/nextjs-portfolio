"use client";

import { notFound } from 'next/navigation';
import ProjectDetails from '@/components/projectDetails';
import { useReadmes } from '@/hooks/useReadmes';
import ProjectNavBar from '@/components/projectNavBar';
import ProjectBreadcrumb from '@/components/projectBreadcrumb';
import RelatedProjects from '@/components/relatedProjects';
import { slugify } from '@/lib/slug';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  const { readmes, loading, error } = useReadmes();
  const { slug } = params;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading projects: {error}
      </div>
    );
  }

  const project = readmes.find((proj) => slugify(proj.title) === slug);

  if (!project) {
    return notFound();
  }

  return (
    <div className="text-[var(--color-foreground)] bg-surface-muted min-h-screen pt-6 pb-6 px-2 sm:px-4 md:px-6 lg:px-44">
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <ProjectBreadcrumb projectTitle={project.title} />
        <div className="w-full pt-4">
          <section className="grid grid-cols-1 gap-4">
            <ProjectDetails project={project} />
          </section>
          <section className="py-4">
            <RelatedProjects projects={readmes} currentProjectId={project.id} />
          </section>
        </div>
        <div className="mt-4 w-full">
          <ProjectNavBar 
            project={project} 
            projects={readmes} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
