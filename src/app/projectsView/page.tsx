import ProjectList
 from "@/components/projectList";
 import ProjectListSimple from '@/components/projectListSimple';
 import { projects } from "@/data/projects";

export default function ProjectsView() {

  const recentProjects = projects.slice(-4).reverse();

    return (
      <section id="projects" className="flex flex-col  rounded-xl gap-4">
    <ProjectListSimple 
      projects={recentProjects} 
      variant="detailed" // o "simple"
    />
      {/* <h2 className="text-4xl font-bold text-black dark:text-white flex text-center sm:text-center lg:text-left pb-6">Projects</h2>  */}
      <ProjectList />
    </section>
    );
  }
  