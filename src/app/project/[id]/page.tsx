"use client";

import { notFound } from 'next/navigation';
import ProjectDetails from '@/components/projectDetails';

import Card from "@/components/card";
import About from "@/components/about";
import Link from 'next/link';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import ProjectNavigation from '@/components/projectNavigation'
// import { readmes } from '@/data/readmes';
import { useReadmes } from '@/hooks/useReadmes';
import { BiLinkExternal } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import Breadcrumb from '@/components/breadcrumb';
import ProjectList from "@/components/projectList";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  const { readmes, loading, error } = useReadmes();
  const { id } = params;
  const projectId = parseInt(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading projects: {error}
      </div>
    );
  }

  const project = readmes.find((proj) => proj.id === projectId);

  if (!project) {
    return notFound();
  }

  return (
    <div className="w-full mx-auto  text-black  dark:text-white">
      <Breadcrumb projectTitle={project.title} />
      <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {/* Panel 1 Información Principal - 2 columnas en md */}
        <div className="md:col-span-2 lg:col-span-3  bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90  rounded-xl">
        <ProjectDetails project={project} />
        <div className="flex flex-col px-2 pb-4">
          <ProjectNavigation currentId={project.id} projects={readmes} variant="horizontal" />
        </div>
        </div>

        {/* Panel 2 Links - 1 columna */}
        {/* <div className="md:col-span-1 lg:col-span-1 rounded-xl">
          <ProjectNavigation currentId={project.id} projects={readmes} variant="vertical" />
          <div className="grid md:flex md:flex-col gap-4 mt-4 ">
            {project.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`p-4 rounded-xl hover:scale-105 mr-2transition-all duration-300 flex items-center gap-2 w-full 
                  ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live')
                    ? 'bg-blue-100 dark:bg-blue-900' 
                    : 'bg-white dark:bg-gray-800'}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`text-sm scale-125 flex-shrink-0 ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                  {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') 
                    ? <BiLinkExternal className="w-4 h-4" />
                    : <FaGithub className="w-4 h-4" />
                  }
                </div>
                <span className="text-sm font-medium dark:text-white truncate max-w-[150px]">{link.label}</span>
              </Link>
            ))}
          </div>
        </div> */}
      </section>
      {/* related */}
       <section id="related-projects" className="  py-4 space-y-2 rounded-xl ">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-4 ">Related Projects</h1>
        <div className="w-full flex flex-wrap gap-6 md:gap-6  -mb-12  sm:-mb-12 md:pb-12 ">
        <ProjectList 
          projects={readmes.filter((proj) => proj.id !== projectId)} 
        />
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
