"use client"
import Link from 'next/link';
import Image from "next/image";
import Gallery from "@/components/gallery";
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import Badge from "@/components/badge";
import TechTags from "@/components/techTags";
import ProjectReadmeContent from "@/components/projectReadmeContent";

interface ProjectDetailsProps {
  project: {
    id: number;
    repoId: string;
    title: string;
    description: string;
    detailedDescription: string;
    imageSrc: string;
    technologies: string[];
    links: {
      href: string;
      label: string;
    }[];
    gallery?: string[]; 
    features?: string[];
    readmeContent?: {
      [key: string]: any;
    };
  };
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const demoLink = project.links.find((link) =>
    link.label.toLowerCase().includes('demo') ||
    link.label.toLowerCase().includes('live')
  );

  return (
    <section className="bg-[var(--color-surface-muted)] -mx-2 px-2 md:-mx-12 md:px-12 lg:-mx-50 lg:px-50 xl:-mx-60 xl:px-60">
      <div className="py-4">
        <div className="flex flex-col gap-4">
          {project.imageSrc && (
            <div className="relative w-full h-32 md:h-48 lg:h-56 rounded-xl overflow-hidden">
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
          )}

          <div className="flex items-start gap-4">
            <div className="min-w-0">
              <h1 className="text-3xl font-semibold text-[var(--color-foreground)]">
                {project.title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
                {project.description}
              </p>
            </div>
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

          <div className="flex flex-wrap gap-2">
            {project.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-foreground)] transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-alt)]"
              >
                <span>{link.label}</span>
                <span className="text-[var(--color-muted-foreground)]">
                  {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? (
                    <BiLinkExternal className="h-4 w-4" />
                  ) : (
                    <FaGithub className="h-4 w-4" />
                  )}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {project.gallery && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-[var(--color-foreground)]">Images</h4>
            <div className="mt-3">
              <Gallery images={project.gallery} />
            </div>
          </div>
        )}

        <div className="mt-6">
          <ProjectReadmeContent readmeContent={project.readmeContent} />
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
