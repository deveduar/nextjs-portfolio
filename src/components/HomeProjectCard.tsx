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
}

const HomeProjectCard: React.FC<HomeProjectCardProps> = ({ project }) => {
  const demoLink = project.links.find((link) =>
    link.label.toLowerCase().includes('demo') ||
    link.label.toLowerCase().includes('live')
  );

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-xl overflow-hidden">
      <div className="relative w-full h-48 md:h-64 lg:h-72">
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        {demoLink && (
          <div className="absolute top-3 right-3 z-10">
            <Badge label={demoLink.label} href={demoLink.href} />
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 space-y-4">
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white">
            {project.title}
          </h2>
          <p className="mt-2 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <TechTags
            technologies={project.technologies}
            limit={8}
            colorful={true}
            overlayStyle={false}
            className="flex-wrap gap-2"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {project.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              >
                <span>{link.label}</span>
                <span className="text-slate-500 dark:text-slate-400">
                  {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? (
                    <BiLinkExternal className="h-4 w-4" />
                  ) : (
                    <FaGithub className="h-4 w-4" />
                  )}
                </span>
              </Link>
            ))}
          </div>

          <Link
            href={`/project/${slugify(project.title)}`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
            <BiLinkExternal className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeProjectCard;