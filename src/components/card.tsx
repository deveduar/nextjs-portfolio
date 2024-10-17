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
  links?: LinkProps[];
  topRightLinks?: LinkProps[];
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  imageSrc,
  detailedDescription,
  links = [],
  topRightLinks = [],
  
}) => {
  return (
    
<div className="">
  {/* Imagen */}
  <Link href={`/projects/${id}`}  className=" max-w-sm w-full rounded-xl overflow-hidden shadow-lg  transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col cursor-pointer h-40 
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
      <div className="font-bold text-xl mb-2 text-black dark:text-white">{title}</div>
      <p className="text-base text-black dark:text-gray-300">{description}</p>
    </div>
  </div>
</div>
  );
};

export default Card;
