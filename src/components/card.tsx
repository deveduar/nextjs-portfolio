"use client";
import React, { Component } from "react";
import Image from "next/image";
import Link from "next/link";
import TechTags from "@/components/techTags";
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

  const demoLink = links.find(link => 
    link.label.toLowerCase().includes('demo') || 
    link.label.toLowerCase().includes('live')
  );

  return (
    <Link href={`/project/${id}`} className="w-full border dark:border-gray-900 rounded-xl cursor-pointer transition-transform transform lg:hover:scale-105 hover:shadow-lg 
    grow basis-full min-w-[300px] max-w-full 
    md:basis-[calc(50%-1rem)] md:min-w-[calc(50%-1rem)] md:max-w-[calc(50%-1rem)]
    lg:basis-[calc(25%-1rem)] lg:min-w-[calc(25%-1rem)] lg:max-w-[calc(40%-1rem)]
    xl:basis-[calc(25%-1rem)] xl:min-w-[calc(25%-1rem)] xl:max-w-[calc(40%-1rem)]
    2xl:basis-[calc(25%-1rem)] 2xl:min-w-[calc(20%-1rem)] 2xl:max-w-[calc(40%-1rem)]">

<div className="flex flex-row md:flex-col h-full text-gray-800 dark:text-gray-200">
        {/* Imagen y contenido desktop */}
        <div className="hidden md:block w-full h-[140px] md:h-[190px] lg:h-[230px] rounded-xl overflow-hidden relative group">
          <Image
            className="object-cover w-full h-full absolute inset-0"
            src={imageSrc}
            alt={title}
            width={500}
            height={500}
          />
          <div className="hidden md:block absolute inset-0">
            <div className="absolute inset-0 
              bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90
              group-hover:bg-opacity-100 dark:group-hover:bg-opacity-100 
              transition-all duration-300">
              <div className="p-4 flex flex-col h-full justify-between">
                <div className="space-y-2 flex flex-col">
                  <div className="">
                  <div className="flex  ">
                  <h3 className="font-bold text-md  lg:line-clamp-2 flex-1">{title}</h3>
                  {demoLink && (
                    <div className="pb-1 ">
                    <Badge label={'Live'} href={demoLink.href} />
                    </div>
                  )}
                </div>
                    <p className="text-gray-800 dark:text-gray-300 text-xs md:text-sm line-clamp-3 lg:line-clamp-3 ">
                    {description}
                  </p>
                    <TechTags 
                    technologies={technologies} 
                    limit={4}
                    className="pt-2 flex-row flex-wrap"
                    overlayStyle={true}
                    showMore={true}
                    colorful={true} 
                  />

                  </div>
   
                </div>
                {/* {demoLink && (
                        <div className="hidden  lg:flex lg:justify-end mt-2">
                          <Badge label={''} href={demoLink.href} />
                        </div>
                )} */}
                {/* {demoLink && (
                  <div className="flex justify-end mt-2 lg:mt-0">
                    <Badge label={demoLink.label} href={demoLink.href} />
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>

        

        {/* Contenido para móvil */}
        <div className="w-full md:hidden relative h-[130px] rounded-xl overflow-hidden">
          <Image
            className="object-cover w-full h-full absolute inset-0"
            src={imageSrc}
            alt={title}
            width={500}
            height={500}
          />
          <div className="absolute inset-0 
            bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80
            group-hover:bg-opacity-90 dark:group-hover:bg-opacity-90 
            transition-all duration-300">
            <div className="p-4 flex flex-col h-full space-y-2">
              <div className="text-black dark:text-white">
                <div className="flex  ">
                  <h3 className="font-bold text-md truncate flex-1">{title}</h3>
                  {demoLink && (
                    <div className="pb-1">
                    <Badge label={'Live'} href={demoLink.href} />
                    </div>
                  )}
                </div>
                <p className="text-sm text-black dark:text-gray-300 line-clamp-2 flex-1">{description}</p>

              </div>
              <div>
                <TechTags 
                  technologies={technologies} 
                  limit={5} 
                  className="flex-wrap"
                  overlayStyle={true}
                  colorful={true}
                />
              </div>
            </div>
          </div>
        </div>
   
      </div>
    </Link>
  );
};

export default Card;
