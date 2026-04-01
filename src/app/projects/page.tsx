"use client";
import ProjectList from "@/components/projectList";
import ProjectBreadcrumb from '@/components/projectBreadcrumb';

export default function ProjectsView() {

  return (
    <section 
      id="projects" 
      className="flex flex-col rounded-xl"
    >
      <ProjectBreadcrumb />
      <ProjectList searchFilter="" />
    </section>
  );
}