"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  detailedDescription: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  detailedDescription,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative max-w-sm rounded overflow-hidden shadow-lg bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        className="w-full"
        src={imageSrc}
        alt={title}
        width={800}
        height={500}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-200 text-base">{description}</p>
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-75 text-white flex items-center justify-center p-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p>{detailedDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
