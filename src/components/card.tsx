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
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative max-w-sm rounded overflow-hidden shadow-lg dark:bg-gray-900 bg-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          className="object-cover"
          src={imageSrc}
          alt={title}
          width={400}
          height={200}
        />
        {/* Overlay permanente a la derecha */}
        <div className="absolute top-0 right-5 h-1/3 w-16 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-2">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target="_blank"
              className="inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-primary transition-all duration-300 p-2"
            >
              {link.svg}
            </Link>
          ))}
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 transition-all duration-300 ease-in-out ${
            isHovered ? 'h-1/2' : 'h-1/4'
          }`}
        >
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-base">{description}</p>
          <p className="mt-4 text-sm">{detailedDescription}</p>
          <div className="flex justify-center space-x-3 mt-2">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                className="inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-primary transition-all duration-300"
              >
                {link.svg}
              </Link>
            ))}
          </div>
          {/* {isHovered && (
            <p className="mt-4 text-sm">{detailedDescription}</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Card;
