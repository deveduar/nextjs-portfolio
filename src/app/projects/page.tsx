"use client";
import ProjectList from "@/components/projectList";
import ProjectBreadcrumb from '@/components/projectBreadcrumb';

export default function ProjectsView() {

  return (
    <section 
      id="projects" 
      className="flex flex-col rounded-xl max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto w-full px-3 sm:px-4"
    >
      <ProjectBreadcrumb />
      <ProjectList searchFilter="" />
    </section>
  );
}