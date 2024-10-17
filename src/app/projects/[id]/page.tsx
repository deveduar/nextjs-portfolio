import { notFound } from 'next/navigation'; // Importa si quieres manejar proyectos que no existan
import ProjectDetails from '@/components/projectDetails';
import { projects } from '@/data/projects'; 
import Card from "@/components/card";


interface ProjectPageProps {
  params: {
    id: string;
  };
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  const { id } = params;

  // Buscar el proyecto correspondiente al ID
  const project = projects.find((proj) => proj.id === parseInt(id));

  if (!project) {
    return notFound(); // O manejar un 404 de forma personalizada si el proyecto no existe
  }

  return (
    <div className="container mx-auto py-6">
      <ProjectDetails project={project} />
      <div id="projects" className="  py-4 space-y-2 rounded-xl px-3 md:px-2 lg:px-4">
        <h2 className="text-lg font-bold text-black dark:text-white mb-4 ml-4">Related Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-1 justify-items-center sm:px-2 md:px-4 lg:px-4">
        {projects.map((project) => (
            <Card
              id={project.id}
              key={project.id}
              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              detailedDescription={project.detailedDescription}
              links={project.links}
          
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
