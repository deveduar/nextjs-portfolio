"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import Badge from "@/components/badge";
import TechTags from "@/components/techTags";
import { slugify } from "@/lib/slug";

interface Project {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  technologies: string[];
  links: {
    href: string;
    label: string;
  }[];
}

interface HomeProjectCardProps {
  project: Project;
  isProjectSection?: boolean;
}

const HomeProjectCard: React.FC<HomeProjectCardProps> = ({ project, isProjectSection = true }) => {
  const demoLink = project.links.find((link) =>
    link.label.toLowerCase().includes('demo') ||
    link.label.toLowerCase().includes('live')
  );

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Layout responsive: texto e imagen en línea para desktop, apilados para móvil */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 items-stretch h-full max-h-[calc(100vh-120px)]">
        
        {/* Sección de texto - primero en mobile, izquierda en desktop */}
        <div className="flex-1 flex flex-col justify-center min-w-0 py-2 overflow-hidden">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 line-clamp-2">
            {project.title}
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-3 line-clamp-3 lg:line-clamp-4 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 mb-3">
            <TechTags
              technologies={project.technologies}
              limit={4}
              colorful={true}
              overlayStyle={false}
              className="flex-wrap gap-1 text-xs"
            />
          </div>

          {/* Enlaces */}
          <div className="flex flex-wrap items-center gap-2">
            {project.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span className="flex items-center gap-1">
                  {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? (
                    <BiLinkExternal className="h-3 w-3" />
                  ) : (
                    <FaGithub className="h-3 w-3" />
                  )}
                  <span className="underline underline-offset-2">{link.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Imagen - abajo en mobile, derecha en desktop */}
        <div className="w-full md:flex-1 md:w-auto md:max-w-[45%] lg:max-w-[50%] min-w-0">
          <div className="relative w-full h-full min-h-[250px] md:min-h-0 rounded-lg overflow-hidden shadow-md group">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              className="object-contain md:object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {demoLink && (
              <div className="absolute top-2 right-2 z-10">
                <Badge label={demoLink.label} href={demoLink.href} />
              </div>
            )}
            {/* Details en imagen - solo visible en desktop */}
            <Link
              href={`/project/${slugify(project.title)}`}
              className="hidden md:inline-flex absolute bottom-2 right-2 items-center gap-1 text-xs font-medium text-white bg-blue-600/90 hover:bg-blue-600 px-2.5 py-1.5 rounded-md backdrop-blur-sm transition-all hover:scale-105"
            >
              Details
              <BiLinkExternal className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Details en footer de la sección - solo visible en mobile */}
      {isProjectSection && (
        <div className="md:hidden mt-4">
          <Link
            href={`/project/${slugify(project.title)}`}
            className="flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-600 py-3 rounded-lg"
          >
            View Project Details
            <BiLinkExternal className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeProjectCard;