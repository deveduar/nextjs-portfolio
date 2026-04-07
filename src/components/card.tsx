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

  return (
    <Link 
      href={`/project/${slugify(title)}`} 
      className="group flex h-64 w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border/70 bg-surface transition-all hover:border-accent/45 hover:shadow-theme
      grow basis-full min-w-[280px] max-w-full 
      md:basis-[calc(50%-1rem)] md:min-w-[calc(50%-1rem)] md:max-w-[calc(50%-1rem)]
      lg:basis-[calc(33%-1rem)] lg:min-w-[calc(33%-1rem)] lg:max-w-[calc(33%-1rem)]
      xl:basis-[calc(25%-1rem)] xl:min-w-[calc(25%-1rem)] xl:max-w-[calc(25%-1rem)]"
    >
      <div className="relative h-28 w-full overflow-hidden flex-shrink-0">
        <Image
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          src={imageSrc}
          alt={title}
          width={500}
          height={200}
        />
        
        {demoLink && (
          <div className="absolute top-2 right-2">
            <Badge label="Live" href={demoLink.href} />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-surface/95 p-3 backdrop-blur-sm">
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground">{title}</h3>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col bg-surface p-3">
        <p className="mb-2 line-clamp-2 text-xs text-muted">
          {description}
        </p>
        <div className="flex flex-wrap gap-1 mt-auto">
          {technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="rounded bg-surface-alt px-1.5 py-0.5 text-[10px] text-muted"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="rounded bg-surface-alt px-1.5 py-0.5 text-[10px] text-muted/70">
              +{technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
