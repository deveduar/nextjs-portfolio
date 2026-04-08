"use client";
import ProjectList from "@/components/projectList";
import ProjectBreadcrumb from '@/components/projectBreadcrumb';

export default function ProjectsView() {

  return (
    <section 
      id="projects" 
      className="flex flex-col rounded-xl w-full px-2 sm:px-4 md:px-6 lg:px-44 pt-6 pb-6"
    >
      <ProjectBreadcrumb />
      <ProjectList searchFilter="" />
    </section>
  );
}