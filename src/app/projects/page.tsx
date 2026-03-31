"use client";
import ProjectList from "@/components/projectList";
import ProjectBreadcrumb from '@/components/projectBreadcrumb';
import { useSearchContext } from '@/components/navbar';

export default function ProjectsView() {
  const { searchValue } = useSearchContext();

  return (
    <section 
      id="projects" 
      className="flex flex-col rounded-xl"
    >
      <ProjectBreadcrumb />
      <ProjectList searchFilter={searchValue} />
    </section>
  );
}