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
    <div className="w-full max-w-4xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-xl overflow-hidden shadow-lg">
      <div className="relative w-full aspect-[16/9] max-h-[40vh]">
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

      <div className="p-4 md:p-5">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
            {project.title}
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-1">
            {project.description}
          </p>
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap gap-1.5">
            <TechTags
              technologies={project.technologies}
              limit={5}
              colorful={true}
              overlayStyle={false}
              className="flex-wrap gap-1 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
            <div className="flex flex-wrap gap-1.5">
              {project.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                >
                  <span>{link.label}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? (
                      <BiLinkExternal className="h-3 w-3" />
                    ) : (
                      <FaGithub className="h-3 w-3" />
                    )}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href={`/project/${slugify(project.title)}`}
              className="inline-flex items-center gap-1 rounded-lg bg-blue-600 text-white px-3 py-1.5 text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              Details
              <BiLinkExternal className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProjectCard;