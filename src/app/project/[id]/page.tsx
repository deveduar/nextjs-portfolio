"use client";

import { notFound } from 'next/navigation';
import ProjectDetails from '@/components/projectDetails';
import { useReadmes } from '@/hooks/useReadmes';
import ProjectNavBar from '@/components/projectNavBar';
import RelatedProjects from '@/components/relatedProjects';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  const { readmes, loading, error } = useReadmes();
  const { id } = params;
  const projectId = parseInt(id);

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

  const project = readmes.find((proj) => proj.id === projectId);

  if (!project) {
    return notFound();
  }

  return (
    <div className="w-full mx-auto text-black dark:text-white pb-16">
      <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        <ProjectDetails project={project} />
      </section>
      <section className="py-4">
        <RelatedProjects projects={readmes} currentProjectId={projectId} />
      </section>
      <ProjectNavBar 
        project={project} 
        projects={readmes} 
      />
    </div>
  );
};

export default ProjectPage;
