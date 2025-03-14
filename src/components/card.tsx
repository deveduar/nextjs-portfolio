"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LinkProps {
  href: string;
  label: string;
  svg: JSX.Element;
}

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  detailedDescription: string;
  technologies: string[];
  links?: LinkProps[];
  topRightLinks?: LinkProps[];
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  imageSrc,
  technologies,
  detailedDescription,
  links = [],
  topRightLinks = [],
  
}) => {
  return (
    
<div className=" w-full border  dark:border-gray-900 rounded-xl cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800 grow basis-[380px] min-w-[380px] max-w-[800px] lg:basis-[300px] lg:min-w-[300px] lg:max-w-[500px] xl:basis-[300px] xl:min-w-[300px] xl:max-w-[400px] ">
  {/* Imagen */}
  <Link href={`/projects/${id}`}  className="rounded-t-xl overflow-hidden  flex flex-col  h-40 
  " >
    <Image
      className="object-cover object-top w-full h-full"
      src={imageSrc}
      alt={title}
      width={300}
      height={300}
    />
  </Link>
  
  {/* Información */}
  <div className="p-2 flex flex-col">
    <div className=" text-black dark:text-white">
      <div className="font-bold text-xl mb-2 text-black dark:text-white truncate">{title}</div>
      <p className="text-base text-black dark:text-gray-300 line-clamp-2 break-words">{description}</p>
    </div>
        {/* Tecnologías */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 px-2 py-1 rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

  </div>
</div>
  );
};

export default Card;
