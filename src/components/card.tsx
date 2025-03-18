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
    <Link href={`/projects/${id}`} className="w-full border  dark:border-gray-900 rounded-xl cursor-pointer transition-transform transform lg:hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800 
    grow 
    basis-full min-w-[300px] max-w-full 
    
    md:basis-[calc(50%-1rem)] md:min-w-[calc(50%-1rem)] md:max-w-[calc(50%-1rem)]
    
    lg:basis-[calc(25%-1rem)] lg:min-w-[calc(25%-1rem)] lg:max-w-[calc(40%-1rem)]
    
    xl:basis-[calc(25%-1rem)] xl:min-w-[calc(25%-1rem)] xl:max-w-[calc(40%-1rem)]
    
    2xl:basis-[calc(25%-1rem)] 2xl:min-w-[calc(20%-1rem)] 2xl:max-w-[calc(40%-1rem)]
    ">

  {/* Imagen */}
  <div  className="rounded-t-xl overflow-hidden  flex flex-col   
  " >
    <Image
      className="object-cover 
     w-full h-20
    
      "
      src={imageSrc}
      alt={title}
      width={300}
      height={200}
    />
  </div>
  
  {/* Información */}
  <div className="p-2 flex flex-col">
    <div className=" text-black dark:text-white ">
      <h3 className="font-bold text-md  text-black dark:text-white truncate">{title}</h3>

      <p className="text-xs text-black dark:text-gray-300 line-clamp-2 break-words h-12">{description}</p>
    </div>


  </div>
        {/* Tecnologías */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 p-2">
            {technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 text-xs text-gray-900 dark:text-gray-100 px-2 py-1 rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

</Link>
  );
};

export default Card;
