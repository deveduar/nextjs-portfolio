"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/badge";
import { slugify } from "@/lib/slug";

interface LinkProps {
  href: string;
  label: string;
}

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  detailedDescription: string;
  technologies: string[];
  links?: LinkProps[];
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  technologies,
  links = [],
}) => {

  const demoLink = links.find(link => 
    link.label.toLowerCase().includes('demo') || 
    link.label.toLowerCase().includes('live')
  );

  const githubLink = links.find(link => 
    link.label.toLowerCase().includes('github') || 
    link.label.toLowerCase().includes('repo')
  );

  const hasImage = imageSrc && imageSrc.trim() !== '';

  return (
    <Link 
      href={`/project/${slugify(title)}`} 
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border/70 bg-surface-muted transition-all hover:border-accent/45 hover:shadow-[0_0_20px_var(--color-accent)]/15
      grow basis-full min-w-[280px] max-w-full 
      md:basis-[calc(50%-1rem)] md:min-w-[calc(50%-1rem)] md:max-w-[calc(50%-1rem)]
      lg:basis-[calc(33%-1rem)] lg:min-w-[calc(33%-1rem)] lg:max-w-[calc(33%-1rem)]
      xl:basis-[calc(25%-1rem)] xl:min-w-[calc(25%-1rem)] xl:max-w-[calc(25%-1rem)]"
    >
      {hasImage && (
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <Image
            className="absolute inset-0 w-full h-full object-cover animate-imageReveal"
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-surface-muted/90" />
          {demoLink && (
            <div className="absolute top-2 right-2">
              <Badge label="Live" href={demoLink.href} />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <h3 className="line-clamp-1 text-sm font-semibold text-foreground">{title}</h3>
          </div>
        </div>
      )}
      
      <div className="flex flex-1 flex-col p-3 bg-surface-muted relative z-0">
        <h3 className="line-clamp-1 text-sm font-semibold text-foreground">{title}</h3>
        <p className="mb-3 line-clamp-2 text-xs text-muted-foreground leading-relaxed mt-1">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="rounded bg-surface-alt px-2 py-1 text-[10px] text-muted-foreground font-medium"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="rounded bg-surface-alt px-2 py-1 text-[10px] text-muted-foreground/70 font-medium">
              +{technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {(demoLink || githubLink) && (
        <div className="flex items-center gap-2 px-3 pb-3 pt-0 mt-auto relative z-0">
          {demoLink && (
            <span className="text-[10px] text-accent font-medium">Live Demo</span>
          )}
          {githubLink && (
            <span className="text-[10px] text-muted-foreground">GitHub</span>
          )}
        </div>
      )}
    </Link>
  );
};

export default Card;
