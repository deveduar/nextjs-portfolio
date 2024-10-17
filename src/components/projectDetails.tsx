import React from 'react';
import Link from 'next/link'; // Asegúrate de importar Link correctamente

interface ProjectDetailsProps {
  project: {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
    detailedDescription: string;
    technologies: string[];
    links: { href: string; label: string; svg: JSX.Element }[];
    gallery: string[]; 
  };
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <div className="mt-4 p-4 text-black rounded-xl dark:text-white">
          {/* Título del proyecto */}
      <div
        className="w-full h-64 bg-center bg-no-repeat bg-cover flex justify-end overflow-hidden bg-slate-50 rounded-xl"
        style={{
          backgroundImage: `url(${project.imageSrc})`,
        }}
      ></div>


    <h2 className="text-3xl font-bold mt-4 px-4">{project.title}</h2>

      {/* Descripción detallada del proyecto */}
      <p className="mt-4 text-base leading-normal px-4">{project.description}</p>
      <p className="mt-2 text-base leading-normal px-4">{project.detailedDescription}</p>



      {/* Tecnologías utilizadas */}
      <h3 className="text-lg font-bold leading-tight tracking-tight dark:text-white px-4 pb-2 pt-4">
        Technologies Used
      </h3>
      <div className="flex gap-3 flex-wrap px-4">
        {project.technologies.map((tech, index) => (
          <div key={index} className="flex h-8 items-center justify-center rounded-xl bg-gray-700 px-4">
            <a className="text-sm font-medium text-white">{tech}</a>
          </div>
        ))}
      </div>

      {/* Enlaces del proyecto */}
      <h3 className="text-lg font-bold leading-tight tracking-tight dark:text-white px-4 pt-4">Links</h3>
      <div className="mt-4 px-4">
        {project.links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="mr-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent dark:text-white hover:bg-primary transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.svg} {link.label}
          </Link>
        ))}
      </div>
            {/* Galería de imágenes */}
            <h3 className="text-lg font-bold leading-tight tracking-tight dark:text-white px-4 pb-2 pt-4">Project Images</h3>
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery.map((image, index) => (
            <div key={index} className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                />
            </div>
            ))}
        </div>
    </div>
  );
};

export default ProjectDetails;
