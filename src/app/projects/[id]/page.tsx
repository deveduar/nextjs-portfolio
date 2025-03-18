import { notFound } from 'next/navigation';
import ProjectDetails from '@/components/projectDetails';
import { projects } from '@/data/projects'; 
import Card from "@/components/card";
import About from "@/components/about";
import Link from 'next/link';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";

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
    <section className="w-full mx-auto ">
          {/* Navegación entre proyectos */}
          <div className="flex justify-between items-center p-4 rounded-xl mb-6 text-black dark:text-white">
            <Link
              href={`/projects/${projectId < projects.length ? projectId + 1 : 1}`}
              className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
            >
              <IoArrowBackCircleOutline size={24} />
              <span className="text-sm font-medium">
                {projects.find(p => p.id === (projectId < projects.length ? projectId + 1 : 1))?.title}
              </span>
            </Link>
            
            <Link
              href={`/projects/${projectId > 1 ? projectId - 1 : projects.length}`}
              className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
            >
              <span className="text-sm font-medium">
                {projects.find(p => p.id === (projectId > 1 ? projectId - 1 : projects.length))?.title}
              </span>
              <IoArrowForwardCircleOutline size={24} />
            </Link>
          </div>
      <ProjectDetails project={project} />
      <div id="projects" className="  py-4 space-y-2 rounded-xl ">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-4 ">Related Projects</h1>
        <div className="w-full flex flex-wrap gap-6 md:gap-6  -mb-12  sm:-mb-12 md:pb-12 ">
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
