import ProjectList
 from "@/components/projectList";

export default function ProjectsView() {
    return (
      <section id="projects" className="flex flex-col pt-6 rounded-xl ">
      {/* <h2 className="text-4xl font-bold text-black dark:text-white flex text-center sm:text-center lg:text-left pb-6">Projects</h2>  */}
      <ProjectList />
    </section>
    );
  }
  