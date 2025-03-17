"use client";
import React, {useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState, useRef, TouchEvent, MouseEvent } from 'react';
import { TbGripHorizontal } from "react-icons/tb";

interface ProjectListSimpleProps {
  projects: {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
    detailedDescription: string;
    technologies: string[];
    links: { href: string; label: string; svg: JSX.Element }[];
    gallery: string[];
    features?: string[];
  }[];
  variant?: 'detailed' | 'simple';
  onNext?: () => void;
  onPrev?: () => void;
}

const ProjectListSimple: React.FC<ProjectListSimpleProps> = ({ projects, variant = 'detailed', onNext, onPrev }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    setTouchStart(e.targetTouches[0].clientX);
  };


  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (cardRef.current) {
      const currentTouch = e.targetTouches[0].clientX;
      const diff = touchStart - currentTouch;
      let offset = -(currentIndex * 103) - (diff / cardRef.current.offsetWidth * 100);
      
      // Efecto loop
      if (offset > 0) {
        offset = -((projects.length - 1) * 103) + offset;
      } else if (offset < -(projects.length - 1) * 103) {
        offset = offset + (projects.length * 103);
      }
      
      cardRef.current.style.transform = `translateX(${offset}%)`;
    }
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (cardRef.current) {
      const diff = touchStart - touchEnd;
      if (Math.abs(diff) > 50) { // Reducido el umbral para hacer más sensible el deslizamiento
        if (diff > 0) {
          setCurrentIndex((prev) => (prev + 1) % projects.length);
        } else {
          setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
        }
      }
      cardRef.current.style.transform = `translateX(-${currentIndex * 103}%)`;
    }
  };

  const [isTransitioning, setIsTransitioning] = useState(true);

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsTransitioning(false);
    setTouchStart(e.clientX);
    setTouchEnd(e.clientX);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!isDragging || !cardRef.current) return;
  
    const diff = touchStart - e.clientX;
    const maxDrag = cardRef.current.offsetWidth;
    const limitedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);
  
    let offset = -(currentIndex * 103) - (limitedDiff / cardRef.current.offsetWidth * 100);
  
    // Bloquear movimiento del primer elemento hacia la derecha
    if (currentIndex === 0 && diff < 0) {
      offset = -(currentIndex * 103); // Restaurar al primer elemento si se mueve mucho hacia la derecha
    }
  
    // Bloquear movimiento del último elemento hacia la izquierda
    if (currentIndex === projects.length - 1 && diff > 0) {
      offset = -(currentIndex * 103); // Restaurar al último elemento si se mueve mucho hacia la izquierda
    }
  
    // Aplicar el desplazamiento
    cardRef.current.style.transform = `translateX(${offset}%)`;
  
    setTouchEnd(e.clientX);
  };
  
  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    if (!isDragging) return;
  
    setIsDragging(false);
    setIsTransitioning(true);
  
    const diff = touchStart - touchEnd;
    const threshold = 50; // Umbral mínimo para considerar el movimiento como "válido"
  
    // Si el movimiento fue suficientemente grande, actualizar el índice
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Movimiento hacia la izquierda
        setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1)); // No permitir ir más allá del último elemento
      } else {
        // Movimiento hacia la derecha
        setCurrentIndex((prev) => Math.max(prev - 1, 0)); // No permitir ir más allá del primer elemento
      }
    } else {
      // Restaurar a la posición original si el movimiento no fue suficiente
      // En el caso de que el primer o último elemento se haya movido en la dirección no permitida
      if (cardRef.current) {
        // Si estamos en el primer o último elemento y se mueve hacia la dirección no permitida
        if (currentIndex === 0 && touchStart < touchEnd) {
          // Si el primer elemento se mueve hacia la derecha
          cardRef.current.style.transition = "transform 300ms ease-in-out";
          cardRef.current.style.transform = `translateX(-${currentIndex * 103}%)`;
        } else if (currentIndex === projects.length - 1 && touchStart > touchEnd) {
          // Si el último elemento se mueve hacia la izquierda
          cardRef.current.style.transition = "transform 300ms ease-in-out";
          cardRef.current.style.transform = `translateX(-${currentIndex * 103}%)`;
        } else {
          // Si el movimiento es válido, se mantiene el índice y la animación
          cardRef.current.style.transition = "transform 300ms ease-in-out";
          cardRef.current.style.transform = `translateX(-${currentIndex * 103}%)`;
        }
      }
    }
  };
  
  
  
  
  
  // Efecto para reiniciar la posición cuando se alcanza el límite
  // useEffect(() => {
  //   if (!cardRef.current) return;
  
  //   if (currentIndex >= projects.length) {
  //     setTimeout(() => {
  //       setIsTransitioning(false);
  //       setCurrentIndex(0);
  //     }, 300);
  //   } else if (currentIndex < 0) {
  //     setTimeout(() => {
  //       setIsTransitioning(false);
  //       setCurrentIndex(projects.length - 1);
  //     }, 300);
  //   }
  // }, [currentIndex]);

  if (variant === 'simple') {
    return (
      <div className="p-3 md:p-0">
        <h4 className="text-sm text-gray-900 dark:text-gray-300 font-bold">Recent Projects</h4>
        <div className="flex flex-col">
          {projects.map((project) => (
            <Link 
              key={project.id}
              href={`/projects/${project.id}`}
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200
               text-gray-500 dark:text-gray-400"
            >
              <p className="text-sm">{project.title}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-xl">

<div 
        className="flex items-center w-full"
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ 
          userSelect: 'none',
          transform: `translateX(-${currentIndex * 103}%)`,
          transition: isTransitioning ? 'transform 300ms ease-in-out' : 'none',
          gap: '3%'
        }}
    >
      {/* Último elemento duplicado al principio */}
      {/* <div
          key={`${projects[projects.length - 1].id}-clone`}
          className="flex-shrink-0 w-full p-6 bg-white dark:bg-gray-800 rounded-xl"
        >
          <div className="flex flex-col w-full">
            <div className="flex-1">
              <div>
                <Link 
                  href={`/projects/${projects[projects.length - 1].id}`}
                  className="inline-block hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {projects[projects.length - 1].title}
                  </h4>
                </Link>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-2">
                    {projects[projects.length - 1].technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {projects[projects.length - 1].description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-3 text-black dark:text-white">
                  {projects[projects.length - 1].links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="rounded-xl items-center gap-3 flex flex-row py-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={`text-sm ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                        {link.svg}
                      </div>
                      <span className="text-sm font-medium dark:text-white whitespace-nowrap">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex-shrink-0 w-full p-6 bg-white dark:bg-gray-800 rounded-xl relative group"
        >
                       <div className="absolute left-1/2 -translate-x-1/2 top-2 text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <TbGripHorizontal className="w-5 h-5" />
            </div>
          <div className="flex flex-col w-full">
            <div className="flex-1">
              <div>

                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h4>
             
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-row gap-3 text-black dark:text-white">

                      {project.links.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.href}
                          className="rounded-xl items-center gap-1 flex flex-row py-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className={`text-xs scale-75  ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                            {link.svg}
                          </div>
                          <span className="text-sm font-medium dark:text-white whitespace-nowrap">{link.label}</span>
                        </Link>
                      ))}
                    </div>
                    <Link
                        href={`/projects/${project.id}`}
                        className="rounded-xl items-center gap-3 flex flex-row py-2 text-blue-600 dark:text-blue-400"
                        rel="noopener noreferrer"
                      >
                        <span className="text-sm font-medium whitespace-nowrap">View Details</span>
                      </Link>
                  </div>
                </div>
              </div>
          
          </div>
        ))}
              {/* Primer elemento duplicado al final */}
              {/* <div
          key={`${projects[0].id}-clone`}
          className="flex-shrink-0 w-full p-6 bg-white dark:bg-gray-800 rounded-xl"
        >
          <div className="flex flex-col w-full">
            <div className="flex-1">
              <div>
                <Link 
                  href={`/projects/${projects[0].id}`}
                  className="inline-block hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {projects[0].title}
                  </h4>
                </Link>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-2">
                    {projects[0].technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {projects[0].description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-3 text-black dark:text-white">
                  {projects[0].links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="rounded-xl items-center gap-3 flex flex-row py-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={`text-sm ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                        {link.svg}
                      </div>
                      <span className="text-sm font-medium dark:text-white whitespace-nowrap">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProjectListSimple;