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
  title: string;
  description: string;
  imageSrc: string;
  detailedDescription: string;
  links?: LinkProps[];
  topRightLinks?: LinkProps[];
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  detailedDescription,
  links = [],
  topRightLinks = [],
}) => {
  return (
    <div className="max-w-sm w-full h-96 rounded overflow-hidden shadow-lg dark:bg-gray-950 bg-gray-900 transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col relative">
      {/* Imagen */}
      <div className="relative w-full h-40 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-300 transform hover:scale-110 hover:-translate-y-1/1">
          <Image
            className="object-cover object-top w-full h-full fill"
            src={imageSrc}
            alt={title}
           width={300}
           height={300}
          />
        </div>
      </div>

      {/* Información */}
      <div className="w-full p-4 flex flex-col flex-grow z-10">
        <div className="flex-grow text-gray-200">
          <div className="font-bold text-xl mb-2 text-gray-200 dark:text-white text-center">{title}</div>
          <p className="text-base text-gray-300 dark:text-gray-300">{description}</p>

          {detailedDescription && (
            <p className="mt-4 text-sm text-gray-200 dark:text-gray-300">{detailedDescription}</p>
          )}
        </div>

        <div className="mt-auto flex justify-center space-x-3 pt-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target="_blank"
              className="inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white dark:text-gray-200 hover:bg-primary transition-all duration-300"
            >
              {link.svg}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
