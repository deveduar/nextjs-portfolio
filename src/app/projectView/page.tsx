import ProjectList
 from "@/components/projectList";

export default function ProjectsView() {
    return (
      <section id="projects" className="flex flex-col  rounded-xl  px-2 md:px-12 lg:px-20 ">
      <h2 className="text-4xl font-bold text-black dark:text-white flex text-center sm:text-center lg:text-left pb-6">Projects</h2> 
      <ProjectList />
    </section>
    );
  }
  