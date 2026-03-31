"use client";
import ProjectList from "@/components/projectList";
import { useSearchContext } from '@/components/navbar';

export default function ProjectsView() {
  const { searchValue } = useSearchContext();

  return (
    <section 
      id="projects" 
      className="flex flex-col rounded-xl"
    >
      <ProjectList searchFilter={searchValue} />
    </section>
  );
}