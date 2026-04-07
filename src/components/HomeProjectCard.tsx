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
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch">
        
        {/* Sección de texto */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <h2 className="mb-2 line-clamp-1 text-xl font-bold tracking-tight text-foreground sm:mb-3 sm:line-clamp-2 sm:text-2xl md:text-2xl lg:text-3xl">
            {project.title}
          </h2>
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted sm:mb-4 sm:line-clamp-3 sm:text-base">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            <TechTags
              technologies={project.technologies}
              limit={4}
              colorful={true}
              overlayStyle={false}
              className="flex-wrap gap-1.5 text-sm sm:text-xs"
            />
          </div>

          {/* Enlaces */}
          <div className="flex flex-wrap items-center gap-3">
            {project.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
              >
                <span className="flex items-center gap-1">
                  {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? (
                    <BiLinkExternal className="h-4 w-4" />
                  ) : (
                    <FaGithub className="h-4 w-4" />
                  )}
                  <span className="underline underline-offset-2">{link.label}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Details button - solo visible en desktop */}
          {isProjectSection && (
            <div className="hidden sm:block mt-4">
              <Link
                href={`/project/${slugify(project.title)}`}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                View Project Details
                <BiLinkExternal className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Imagen */}
        <div className="w-full sm:w-2/5 md:w-1/2 lg:w-[45%] min-w-0 flex items-center">
          <div className="group relative h-[200px] max-h-[55vh] w-full overflow-hidden rounded-xl border border-border/70 shadow-theme sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              className="object-contain sm:object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {demoLink && (
              <div className="absolute top-3 right-3 z-10">
                <Badge label={demoLink.label} href={demoLink.href} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details button en mobile */}
      {isProjectSection && (
        <div className="sm:hidden px-4 pt-4">
          <Link
            href={`/project/${slugify(project.title)}`}
            className="flex items-center justify-center gap-2 rounded-lg bg-accent py-3.5 text-base font-medium text-accent-foreground"
          >
            View Project Details
            <BiLinkExternal className="h-5 w-5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeProjectCard;
