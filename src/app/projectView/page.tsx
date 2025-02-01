import Card from "@/components/card";
import { projects } from "@/data/projects";
// SVG variables

export default function ProjectsView() {
    return (
      <div id="projects" className="flex flex-col  rounded-xl sm:items-center lg:items-start md:items-start  ">
      <h2 className="text-4xl font-bold text-black dark:text-white flex text-center sm:text-center lg:text-left">Projects</h2> 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 w-full ">
        {projects.slice().reverse().map((project) => (
          <Card
            id={project.id}
            key={project.id}
            title={project.title}
            description={project.description}
            imageSrc={project.imageSrc}
            detailedDescription={project.detailedDescription}
            links={project.links}
            technologies={project.technologies}
          />
        ))}
      </div>
    </div>
    );
  }
  