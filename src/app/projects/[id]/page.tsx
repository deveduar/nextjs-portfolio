import { notFound } from 'next/navigation';
import ProjectDetails from '@/components/projectDetails';
import { projects } from '@/data/projects'; 
import Card from "@/components/card";
import About from "@/components/about";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  const { id } = params;

  // Buscar el proyecto correspondiente al ID
  const projectId = parseInt(id);
  const project = projects.find((proj) => proj.id === projectId);


  if (!project) {
    return notFound(); 
  }

  return (
    <section className="w-full mx-auto pt-6">
      <ProjectDetails project={project} />
      <div id="projects" className="  py-4 space-y-2 rounded-xl ">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-4 ">Related Projects</h1>
        <div className="w-full flex flex-wrap gap-6 md:gap-6  -mb-12  sm:-mb-12 md:pb-12 px-4">
        {projects
          .filter((proj) => proj.id !== projectId)
          .slice()
          .reverse()
          .map((project) => (
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
      {/* <About></About> */}
    </section>
  );
};

export default ProjectPage;
