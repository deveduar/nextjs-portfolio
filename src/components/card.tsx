"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/badge";

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
  id,
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
      href={`/project/${id}`} 
      className="group w-full border border-gray-200/50 dark:border-gray-800 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 
      grow basis-full min-w-[280px] max-w-full 
      md:basis-[calc(50%-1rem)] md:min-w-[calc(50%-1rem)] md:max-w-[calc(50%-1rem)]
      lg:basis-[calc(33%-1rem)] lg:min-w-[calc(33%-1rem)] lg:max-w-[calc(33%-1rem)]
      xl:basis-[calc(25%-1rem)] xl:min-w-[calc(25%-1rem)] xl:max-w-[calc(25%-1rem)]"
    >
      <div className="relative h-28 w-full overflow-hidden">
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
        
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1">{title}</h3>
        </div>
      </div>
      
      <div className="p-3 bg-white dark:bg-gray-900">
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-1">
          {technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 dark:bg-gray-800 text-slate-400">
              +{technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;