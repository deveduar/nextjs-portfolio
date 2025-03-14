import React from 'react'
import Card from "@/components/card";
import { projects } from "@/data/projects";

const ProjectList: React.FC = () => {
  const placeholders = Array(3).fill(null).map((_, index) => (
    <div key={`placeholder-${index}`} className="w-[380px] grow basis-[380px] min-w-[380px] max-w-[800px] lg:basis-[300px] lg:min-w-[300px] lg:max-w-[500px] xl:basis-[300px] xl:min-w-[300px] xl:max-w-[400px]  opacity-0" />
  ));

  return (
    <div className="w-full flex flex-wrap gap-6 md:gap-6 pt-6 sm:-mb-12 md:pb-12">
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
      {placeholders}
    </div>
  );
};

export default ProjectList;